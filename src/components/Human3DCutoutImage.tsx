import React, { useEffect, useState, useRef } from 'react';
import { FilesetResolver, ImageSegmenter } from '@mediapipe/tasks-vision';

// Singleton MediaPipe ImageSegmenter & In-Memory Cutout Cache
let segmenterPromise: Promise<ImageSegmenter | null> | null = null;
const cutoutMemoryCache = new Map<string, string>();

async function getHumanSegmenter(): Promise<ImageSegmenter | null> {
  if (!segmenterPromise) {
    segmenterPromise = (async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm'
        );
        const segmenter = await ImageSegmenter.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite',
            delegate: 'GPU',
          },
          runningMode: 'IMAGE',
          outputCategoryMask: false,
          outputConfidenceMasks: true,
        });
        return segmenter;
      } catch {
        try {
          const vision = await FilesetResolver.forVisionTasks(
            'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm'
          );
          return await ImageSegmenter.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath:
                'https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite',
              delegate: 'CPU',
            },
            runningMode: 'IMAGE',
            outputCategoryMask: false,
            outputConfidenceMasks: true,
          });
        } catch {
          return null;
        }
      }
    })();
  }
  return segmenterPromise;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * Automatically removes the background around the human subject (Brand Ambassador)
 * and returns a transparent PNG DataURL so the person appears as a full 3D cutout.
 */
export async function processHumanCutoutImage(src: string): Promise<string> {
  if (!src) return src;
  if (cutoutMemoryCache.has(src)) {
    return cutoutMemoryCache.get(src)!;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = async () => {
      try {
        const maxDim = 960;
        const scale = Math.min(1, maxDim / Math.max(img.naturalWidth || 600, img.naturalHeight || 800));
        const width = Math.max(1, Math.round((img.naturalWidth || 600) * scale));
        const height = Math.max(1, Math.round((img.naturalHeight || 800) * scale));

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          resolve(src);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height);
        const pixels = imageData.data;

        // Check if image already has transparent background at the top corners
        const topLeftAlpha = pixels[3];
        const topRightAlpha = pixels[(width - 1) * 4 + 3];
        const topMidAlpha = pixels[Math.floor(width / 2) * 4 + 3];
        if (topLeftAlpha < 25 && topRightAlpha < 25 && topMidAlpha < 25) {
          cutoutMemoryCache.set(src, src);
          resolve(src);
          return;
        }

        const segmenter = await getHumanSegmenter();
        if (segmenter) {
          const result = segmenter.segment(canvas);
          const mask = result.confidenceMasks?.[0];
          if (mask) {
            const maskFloat = mask.getAsFloat32Array();
            for (let i = 0; i < maskFloat.length; i++) {
              const confidence = maskFloat[i];
              // Feather transition around the human silhouette for studio-grade 3D edge
              const alpha = smoothstep(0.35, 0.68, confidence);
              pixels[i * 4 + 3] = Math.round(pixels[i * 4 + 3] * alpha);
            }
            mask.close();
            ctx.putImageData(imageData, 0, 0);
            const cutoutDataUrl = canvas.toDataURL('image/png');
            cutoutMemoryCache.set(src, cutoutDataUrl);
            resolve(cutoutDataUrl);
            return;
          }
        }

        resolve(src);
      } catch {
        resolve(src);
      }
    };

    img.onerror = () => resolve(src);
    img.src = src;
  });
}

interface Human3DCutoutImageProps {
  src: string;
  alt: string;
  variant?: 'hero' | 'sejarah' | 'profil';
  isActiveSlide?: boolean;
  onClick?: () => void;
  title?: string;
}

export const Human3DCutoutImage: React.FC<Human3DCutoutImageProps> = ({
  src,
  alt,
  variant = 'hero',
  isActiveSlide = true,
  onClick,
  title,
}) => {
  const [cutoutSrc, setCutoutSrc] = useState<string>(() => cutoutMemoryCache.get(src) || src);
  const [tilt, setTilt] = useState<{ rotateX: number; rotateY: number }>({ rotateX: 0, rotateY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    if (cutoutMemoryCache.has(src)) {
      setCutoutSrc(cutoutMemoryCache.get(src)!);
      return;
    }
    setCutoutSrc(src);
    processHumanCutoutImage(src).then((processedUrl) => {
      if (isMounted) {
        setCutoutSrc(processedUrl);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [src]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: -y * 9,
      rotateY: x * 11,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  if (variant === 'hero') {
    return (
      <div
        ref={containerRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        title={title}
        className={`human-3d-hero-slide ${isActiveSlide ? 'active-slide' : ''}`}
        style={{
          transform: isActiveSlide
            ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(1)`
            : 'perspective(1000px) scale(0.94) translateY(14px)',
        }}
      >
        {/* 3D Cast Silhouette Shadow Directly Behind the Human Object */}
        <img
          src={cutoutSrc}
          alt=""
          aria-hidden="true"
          className="human-3d-silhouette-shadow"
        />
        {/* Main Full-Body/Half-Body Cutout Human Subject (No Background) */}
        <img
          src={cutoutSrc}
          alt={alt}
          className="human-3d-main-img"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`human-3d-section-stage human-3d-${variant}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
      }}
    >
      {/* Soft 3D Ambient Backlight & Depth Shadow */}
      <div className="human-3d-ambient-aura" aria-hidden="true" />
      {/* Realistic 3D Silhouette Cast Shadow Behind the Human Subject */}
      <img
        src={cutoutSrc}
        alt=""
        aria-hidden="true"
        className="human-3d-silhouette-shadow"
      />
      {/* Main Full Uncropped Human Cutout Subject */}
      <img
        src={cutoutSrc}
        alt={alt}
        className="human-3d-main-img"
      />
      {/* 3D Floating Floor Pedestal Shadow Underneath the Human Subject */}
      <div className="human-3d-floor-shadow" aria-hidden="true" />
    </div>
  );
};
