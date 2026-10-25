import React, { useState, useEffect } from 'react';

const cutoutCache = new Map<string, string>();
const CACHE_VERSION = 'v4_4k_uhd_clean';

/**
 * Intelligently removes solid, gradient, or studio backgrounds (including residual blue/navy
 * radial studio halos from previously uploaded images), applies 4K Ultra-HD studio clarity
 * sharpening (unsharp mask + bicubic high-res scaling), decontaminates edge halos, and
 * auto-trims transparent padding so the human subject sits flush at the bottom.
 */
export async function removeImageBackgroundToCutout(src: string): Promise<string> {
  if (!src) return src;
  const cacheKey = `${CACHE_VERSION}:${src.slice(0, 120)}:${src.length}`;
  const cached = cutoutCache.get(cacheKey);
  if (cached) return cached;

  return new Promise((resolve) => {
    const img = new Image();
    if (!src.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }

    img.onload = () => {
      try {
        // Process at high resolution for crisp 4K studio quality
        const maxProcessDim = 1600;
        const naturalW = img.naturalWidth || img.width || 1200;
        const naturalH = img.naturalHeight || img.height || 1500;
        const scale = Math.min(1.5, maxProcessDim / Math.max(naturalW, naturalH));
        const w = Math.max(1, Math.round(naturalW * scale));
        const h = Math.max(1, Math.round(naturalH * scale));

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          resolve(src);
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, w, h);

        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;

        // 1. Collect background color samples from outer border AND from pixels immediately
        // adjacent to existing transparent regions (in case an earlier partial cutout left a blue halo)
        const seeds: Array<{ r: number; g: number; b: number }> = [];
        let blueDominantSeeds = 0;
        let totalSeedsSampled = 0;

        const addSeedSample = (r: number, g: number, b: number, a: number) => {
          if (a < 60) return;
          totalSeedsSampled++;
          if (b > r + 14 && b >= g - 16) {
            blueDominantSeeds++;
          }
          for (let i = 0; i < seeds.length; i++) {
            const s = seeds[i];
            if (Math.abs(s.r - r) + Math.abs(s.g - g) + Math.abs(s.b - b) < 20) {
              return;
            }
          }
          seeds.push({ r, g, b });
        };

        const sideLimitY = Math.floor(h * 0.9);
        for (let x = 0; x < w; x += Math.max(1, Math.floor(w / 50))) {
          const idx0 = (0 * w + x) * 4;
          addSeedSample(data[idx0], data[idx0 + 1], data[idx0 + 2], data[idx0 + 3]);
        }
        for (let y = 0; y < sideLimitY; y += Math.max(1, Math.floor(h / 50))) {
          const idxL = (y * w + 0) * 4;
          const idxR = (y * w + (w - 1)) * 4;
          addSeedSample(data[idxL], data[idxL + 1], data[idxL + 2], data[idxL + 3]);
          addSeedSample(data[idxR], data[idxR + 1], data[idxR + 2], data[idxR + 3]);
        }

        // Also scan along the first opaque pixel on each row from left, right, and top
        // (captures residual blue gradient halos on images whose outer corners were already transparent)
        for (let y = 0; y < sideLimitY; y += Math.max(1, Math.floor(h / 45))) {
          // From left
          for (let x = 0; x < Math.floor(w * 0.45); x++) {
            const idx = (y * w + x) * 4;
            if (data[idx + 3] >= 120) {
              addSeedSample(data[idx], data[idx + 1], data[idx + 2], data[idx + 3]);
              break;
            }
          }
          // From right
          for (let x = w - 1; x >= Math.floor(w * 0.55); x--) {
            const idx = (y * w + x) * 4;
            if (data[idx + 3] >= 120) {
              addSeedSample(data[idx], data[idx + 1], data[idx + 2], data[idx + 3]);
              break;
            }
          }
        }

        const isBlueStudioBackdrop =
          totalSeedsSampled > 0 && blueDominantSeeds / totalSeedsSampled > 0.35;

        const minSeedDist = (r: number, g: number, b: number): number => {
          let best = 999999;
          for (let i = 0; i < seeds.length; i++) {
            const s = seeds[i];
            const dr = r - s.r;
            const dg = g - s.g;
            const db = b - s.b;
            const d = dr * dr + dg * dg + db * db;
            if (d < best) best = d;
          }
          return Math.sqrt(best);
        };

        // Detect if a pixel belongs to a blue/navy/cyan studio backdrop
        const isStudioBlueGradientPixel = (r: number, g: number, b: number): boolean => {
          if (!isBlueStudioBackdrop) return false;
          const blueOverRed = b - r;
          const blueOverGreen = b - g;
          // Studio blue/cyan glow (skin, cream hijab, and orange blazer all have r >= b)
          if (blueOverRed >= 18 && blueOverGreen >= -22 && r < 160) {
            return true;
          }
          // Dark navy studio shadow
          if (r < 34 && g < 54 && b < 85 && b >= r + 6) {
            return true;
          }
          return false;
        };

        // 2. Flood-fill (BFS) from outer perimeter AND existing transparent pixels inward
        const visited = new Uint8Array(w * h);
        const bgMask = new Uint8Array(w * h);
        const queue = new Int32Array(w * h);
        let qHead = 0;
        let qTail = 0;

        const GLOBAL_TOLERANCE = 56;
        const GRADIENT_GLOBAL_TOLERANCE = 118;
        const STEP_TOLERANCE = 24;
        const SMOOTH_GRADIENT_STEP = 15;

        // First mark all existing transparent pixels as visited background and enqueue them
        for (let i = 0; i < w * h; i++) {
          if (data[i * 4 + 3] < 85) {
            visited[i] = 1;
            bgMask[i] = 1;
            queue[qTail++] = i;
          }
        }

        const tryEnqueueSeed = (x: number, y: number) => {
          const pos = y * w + x;
          if (visited[pos]) return;
          const idx = pos * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const d = seeds.length > 0 ? minSeedDist(r, g, b) : 999;
          if (d <= GLOBAL_TOLERANCE || isStudioBlueGradientPixel(r, g, b)) {
            visited[pos] = 1;
            bgMask[pos] = 1;
            queue[qTail++] = pos;
          }
        };

        for (let x = 0; x < w; x++) {
          tryEnqueueSeed(x, 0);
        }
        for (let y = 1; y < sideLimitY; y++) {
          tryEnqueueSeed(0, y);
          tryEnqueueSeed(w - 1, y);
        }

        const dx = [-1, 1, 0, 0, -1, 1, -1, 1];
        const dy = [0, 0, -1, 1, -1, -1, 1, 1];

        while (qHead < qTail) {
          const curr = queue[qHead++];
          const cx = curr % w;
          const cy = (curr - cx) / w;
          const cIdx = curr * 4;
          const cr = data[cIdx];
          const cg = data[cIdx + 1];
          const cb = data[cIdx + 2];
          const ca = data[cIdx + 3];

          for (let dir = 0; dir < 8; dir++) {
            const nx = cx + dx[dir];
            const ny = cy + dy[dir];
            if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
            const nPos = ny * w + nx;
            if (visited[nPos]) continue;

            const nIdx = nPos * 4;
            const nr = data[nIdx];
            const ng = data[nIdx + 1];
            const nb = data[nIdx + 2];
            const na = data[nIdx + 3];

            if (na < 85) {
              visited[nPos] = 1;
              bgMask[nPos] = 1;
              queue[qTail++] = nPos;
              continue;
            }

            // If stepping from a transparent pixel into an opaque boundary pixel, check if it's studio blue
            if (ca < 85) {
              if (isStudioBlueGradientPixel(nr, ng, nb)) {
                visited[nPos] = 1;
                bgMask[nPos] = 1;
                queue[qTail++] = nPos;
              }
              continue;
            }

            const stepDist = Math.sqrt(
              (nr - cr) * (nr - cr) + (ng - cg) * (ng - cg) + (nb - cb) * (nb - cb)
            );
            const seedDist = seeds.length > 0 ? minSeedDist(nr, ng, nb) : 999;

            const matchesSolidOrSoft =
              (stepDist <= STEP_TOLERANCE && seedDist <= GLOBAL_TOLERANCE) || seedDist <= 22;

            const matchesSmoothGradient =
              stepDist <= SMOOTH_GRADIENT_STEP && seedDist <= GRADIENT_GLOBAL_TOLERANCE;

            const matchesBlueBackdrop =
              isStudioBlueGradientPixel(nr, ng, nb) && stepDist <= 38;

            if (matchesSolidOrSoft || matchesSmoothGradient || matchesBlueBackdrop) {
              visited[nPos] = 1;
              bgMask[nPos] = 1;
              queue[qTail++] = nPos;
            }
          }
        }

        // 3. Erode 2px of residual blue/background fringe along the boundary
        const expandedBg = new Uint8Array(bgMask);
        for (let pass = 0; pass < 2; pass++) {
          for (let y = 1; y < h - 1; y++) {
            for (let x = 1; x < w - 1; x++) {
              const pos = y * w + x;
              if (expandedBg[pos]) continue;
              const idx = pos * 4;
              const r = data[idx];
              const g = data[idx + 1];
              const b = data[idx + 2];
              let bgNeighbors = 0;
              for (let dir = 0; dir < 8; dir++) {
                if (expandedBg[(y + dy[dir]) * w + (x + dx[dir])]) bgNeighbors++;
              }
              if (
                bgNeighbors >= 2 &&
                (isStudioBlueGradientPixel(r, g, b) ||
                  (isBlueStudioBackdrop && b > r + 8 && b >= g - 10))
              ) {
                expandedBg[pos] = 1;
              }
            }
          }
        }

        // 4. Multi-pass Gaussian Alpha Feathering for smooth, natural portrait edges
        const alphaBuf = new Float32Array(w * h);
        for (let i = 0; i < w * h; i++) {
          alphaBuf[i] = expandedBg[i] ? 0 : data[i * 4 + 3];
        }

        const tempAlpha = new Float32Array(w * h);
        tempAlpha.set(alphaBuf);

        for (let pass = 0; pass < 3; pass++) {
          const srcA = pass % 2 === 0 ? alphaBuf : tempAlpha;
          const dstA = pass % 2 === 0 ? tempAlpha : alphaBuf;
          for (let y = 1; y < h - 1; y++) {
            for (let x = 1; x < w - 1; x++) {
              const pos = y * w + x;
              const center = srcA[pos];
              let hasLow = false;
              let hasHigh = false;
              for (let dir = 0; dir < 8; dir++) {
                const nVal = srcA[(y + dy[dir]) * w + (x + dx[dir])];
                if (nVal < 60) hasLow = true;
                if (nVal > 190) hasHigh = true;
              }
              if (hasLow && hasHigh) {
                const sum =
                  center * 4 +
                  (srcA[pos - 1] + srcA[pos + 1] + srcA[pos - w] + srcA[pos + w]) * 2 +
                  (srcA[pos - w - 1] +
                    srcA[pos - w + 1] +
                    srcA[pos + w - 1] +
                    srcA[pos + w + 1]);
                dstA[pos] = sum / 16;
              } else {
                dstA[pos] = center;
              }
            }
          }
        }

        // 5. 4K UHD Unsharp Mask Clarity Enhancement on Foreground Subject + Edge Decontamination
        const rgbCopy = new Uint8ClampedArray(data);
        const sharpenAmount = 0.34; // Crisp studio 4K micro-detail without noise

        for (let y = 1; y < h - 1; y++) {
          for (let x = 1; x < w - 1; x++) {
            const pos = y * w + x;
            const a = tempAlpha[pos];
            const idx = pos * 4;
            if (a <= 4) {
              data[idx + 3] = 0;
              continue;
            }

            // Apply 5-tap unsharp mask on opaque interior subject pixels for 4K clarity
            if (a > 220) {
              const up = ((y - 1) * w + x) * 4;
              const dn = ((y + 1) * w + x) * 4;
              const lf = (y * w + (x - 1)) * 4;
              const rt = (y * w + (x + 1)) * 4;

              for (let c = 0; c < 3; c++) {
                const centerVal = rgbCopy[idx + c];
                const neighborAvg =
                  (rgbCopy[up + c] + rgbCopy[dn + c] + rgbCopy[lf + c] + rgbCopy[rt + c]) * 0.25;
                const diff = centerVal - neighborAvg;
                if (Math.abs(diff) > 2) {
                  data[idx + c] = Math.min(255, Math.max(0, Math.round(centerVal + diff * sharpenAmount)));
                }
              }
            } else if (isBlueStudioBackdrop) {
              // Decontaminate semi-transparent edge pixels so no blue fringe appears
              const r = data[idx];
              const g = data[idx + 1];
              const b = data[idx + 2];
              if (b > r && b > g) {
                data[idx + 2] = Math.round((r + g) * 0.48);
              }
            }

            data[idx + 3] = Math.round(a);
          }
        }

        // 6. Auto-crop transparent bounding box so the human object is properly framed
        // and its bottom waist crop sits flush at the very bottom of the canvas
        let minX = w;
        let maxX = 0;
        let minY = h;
        let maxY = 0;
        let foundOpaque = false;

        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const a = data[(y * w + x) * 4 + 3];
            if (a > 40) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
              foundOpaque = true;
            }
          }
        }

        if (foundOpaque && maxX > minX + 20 && maxY > minY + 20) {
          const padTop = Math.round((maxY - minY) * 0.025);
          const padSide = Math.round((maxX - minX) * 0.035);
          const cropX = Math.max(0, minX - padSide);
          const cropY = Math.max(0, minY - padTop);
          const cropW = Math.min(w - cropX, maxX - minX + padSide * 2);
          const cropH = Math.min(h - cropY, maxY - cropY + 1);

          ctx.putImageData(imageData, 0, 0);

          // Render final trimmed cutout at high-density 4K studio resolution (up to 2160px height)
          const targetH = Math.min(2160, Math.max(cropH, 1440));
          const upscaleFactor = targetH / cropH;
          const targetW = Math.max(1, Math.round(cropW * upscaleFactor));

          const trimmedCanvas = document.createElement('canvas');
          trimmedCanvas.width = targetW;
          trimmedCanvas.height = targetH;
          const trimmedCtx = trimmedCanvas.getContext('2d');
          if (trimmedCtx) {
            trimmedCtx.imageSmoothingEnabled = true;
            trimmedCtx.imageSmoothingQuality = 'high';
            trimmedCtx.drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, targetW, targetH);
            const resultUrl = trimmedCanvas.toDataURL('image/png');
            cutoutCache.set(cacheKey, resultUrl);
            resolve(resultUrl);
            return;
          }
        }

        ctx.putImageData(imageData, 0, 0);
        const resultUrl = canvas.toDataURL('image/png');
        cutoutCache.set(cacheKey, resultUrl);
        resolve(resultUrl);
      } catch {
        cutoutCache.set(cacheKey, src);
        resolve(src);
      }
    };

    img.onerror = () => {
      resolve(src);
    };

    img.src = src;
  });
}

interface Human3DSubjectProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Renders a 4K Ultra-HD, full, uncropped human portrait without any card/box background,
 * paired with a realistic 3D cast silhouette shadow and crisp studio micro-contrast.
 */
export const Human3DSubject: React.FC<Human3DSubjectProps> = ({
  src,
  alt,
  className = '',
}) => {
  const [cutoutUrl, setCutoutUrl] = useState<string>(src);

  useEffect(() => {
    let active = true;
    setCutoutUrl(src);
    removeImageBackgroundToCutout(src).then((processed) => {
      if (active) {
        setCutoutUrl(processed);
      }
    });
    return () => {
      active = false;
    };
  }, [src]);

  return (
    <div className={className}>
      {/* 3D Soft Cast Shadow Behind the Human Object */}
      <img
        src={cutoutUrl}
        alt=""
        aria-hidden="true"
        decoding="async"
        className="human-3d-silhouette-shadow"
      />
      {/* Main 4K UHD Cutout Human Subject */}
      <img
        src={cutoutUrl}
        alt={alt}
        decoding="async"
         fetchPriority="high"
        className="human-3d-main-img"
      />
    </div>
  );
};
