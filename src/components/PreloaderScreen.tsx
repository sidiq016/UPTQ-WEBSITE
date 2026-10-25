import React, { useEffect, useRef, useState, useCallback } from 'react';

interface PreloaderScreenProps {
  brandLogoUrl?: string;
  brandTitle?: string;
  onComplete?: () => void;
}

/**
 * Clean, Professional 60/120fps GPU-composited Loading Screen for UPTQ UIN Bandung.
 * - Top: Logo UPTQ UIN Bandung
 * - Middle: "Ahlan Wasahlan Bi Khudurik"
 * - Bottom: Smooth 0% -> 100% percentage counter & progress bar (5 seconds duration)
 * - Entrance: Smoothly glides down from top to center
 * - Exit: Clean, minimal architectural split shutters gliding left and right
 */
export const PreloaderScreen: React.FC<PreloaderScreenProps> = ({
  brandLogoUrl,
  brandTitle = 'UPTQ UIN BANDUNG',
  onComplete,
}) => {
  const [phase, setPhase] = useState<'entering' | 'loading' | 'splitting' | 'done'>('entering');

  const percentRef = useRef<HTMLSpanElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  const progressValueRef = useRef<number>(0);
  const splitTriggeredRef = useRef<boolean>(false);

  const triggerSplitExit = useCallback(() => {
    if (splitTriggeredRef.current) return;
    splitTriggeredRef.current = true;
    setPhase('splitting');
    window.setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 860);
  }, [onComplete]);

  useEffect(() => {
    setPhase('entering');
    progressValueRef.current = 0;
    splitTriggeredRef.current = false;

    let rafId = 0;
    let splitDelayTimer: number | undefined;
    let lastTimestamp = performance.now();

    // Exact 5 Seconds (5,000 ms) for 0% -> 100% progression
    const DURATION_MS = 5000;

    const updateVisualRefs = (val01: number) => {
      const clamped = Math.min(1, Math.max(0, val01));
      const pctInt = Math.min(100, Math.floor(clamped * 100));

      if (percentRef.current) {
        percentRef.current.textContent = `${pctInt}%`;
      }
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${clamped})`;
      }
    };

    updateVisualRefs(0);

    const enterTimer = window.setTimeout(() => {
      setPhase((prev) => (prev === 'entering' ? 'loading' : prev));
    }, 1050);

    const tick = (now: number) => {
      const dt = Math.min(100, Math.max(0, now - lastTimestamp));
      lastTimestamp = now;

      if (document.visibilityState !== 'hidden') {
        progressValueRef.current = Math.min(1, progressValueRef.current + dt / DURATION_MS);
        updateVisualRefs(progressValueRef.current);
      }

      if (progressValueRef.current < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        updateVisualRefs(1);
        splitDelayTimer = window.setTimeout(() => {
          triggerSplitExit();
        }, 180);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(enterTimer);
      if (splitDelayTimer) clearTimeout(splitDelayTimer);
    };
  }, [triggerSplitExit]);

  if (phase === 'done') return null;

  return (
    <div
      className={`uptq-preloader-overlay ${phase === 'splitting' ? 'is-splitting' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Website UPTQ UIN Bandung"
    >
      {/* Clean Left Architectural Shutter */}
      <div className="uptq-preloader-half uptq-preloader-half-left" />

      {/* Clean Right Architectural Shutter */}
      <div className="uptq-preloader-half uptq-preloader-half-right" />

      {/* Center Content Stack (Descends from top to center, then cleanly retracts as shutters part) */}
      <div className="uptq-preloader-center-wrapper">
        <div className="uptq-preloader-center-stack">
          {/* 1. PALING ATAS: LOGO UPTQ UIN BANDUNG */}
          <div className="uptq-preloader-item uptq-preloader-logo-group">
            <div className="uptq-preloader-logo-ring">
              <div className="uptq-preloader-logo-emblem">
                {brandLogoUrl ? (
                  <img
                    src={brandLogoUrl}
                    alt={brandTitle}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="uptq-preloader-logo-arabic" aria-hidden="true">
                    ق
                  </span>
                )}
              </div>
            </div>
            <span className="uptq-preloader-brand-name">{brandTitle}</span>
          </div>

          {/* 2. DI BAWAH LOGO / DI ATAS PERSEN: TULISAN AHLAN WASAHLAN BI KHUDURIK */}
          <div className="uptq-preloader-item uptq-preloader-greeting-group">
            <h1 className="uptq-preloader-greeting-title">
              Ahlan Wasahlan Bi Khudurik
            </h1>
          </div>

          {/* 3. DI BAWAH TULISAN: ANIMASI PERSEN (0% - 100% SELAMA 5 DETIK) */}
          <div className="uptq-preloader-item uptq-preloader-percent-group">
            <div className="uptq-preloader-percent-readout">
              <span ref={percentRef} className="uptq-preloader-percent-number">
                0%
              </span>
            </div>

            <div className="uptq-preloader-progress-track">
              <div ref={barRef} className="uptq-preloader-progress-fill" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
