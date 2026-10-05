import React, { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 300;

interface BurgerCanvasProps {
  progress?: number;
  className?: string;
  isInteractive?: boolean;
  onFrameChange?: (frame: number) => void;
}

export const BurgerCanvas: React.FC<BurgerCanvasProps> = ({
  progress,
  className = '',
  isInteractive = true,
  onFrameChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const targetFrameRef = useRef<number>(1);
  const currentFrameRef = useRef<number>(1);
  const animFrameIdRef = useRef<number | null>(null);
  const lastRenderedFrameRef = useRef<number>(-1);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Helper to format frame URL
  const getFrameUrl = useCallback((index: number) => {
    const padded = String(index).padStart(5, '0');
    return `/frames/frame_${padded}.jpg`;
  }, []);

  // Retrieve nearest loaded frame to prevent any visual blanking/flicker
  const getNearestLoadedFrame = useCallback((index: number) => {
    const imgs = imagesRef.current;
    if (imgs[index] && imgs[index]?.complete && (imgs[index]?.naturalWidth ?? 0) > 0) {
      return imgs[index];
    }
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = index - offset;
      if (prev >= 1 && imgs[prev]?.complete && (imgs[prev]?.naturalWidth ?? 0) > 0) {
        return imgs[prev];
      }
      const next = index + offset;
      if (next <= TOTAL_FRAMES && imgs[next]?.complete && (imgs[next]?.naturalWidth ?? 0) > 0) {
        return imgs[next];
      }
    }
    return null;
  }, []);

  // Draw frame on canvas with Retina / High-DPI scaling and centered 16:9 aspect ratio
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = getNearestLoadedFrame(frameIndex);
    if (!img) return;

    const cw = canvas.width;
    const ch = canvas.height;

    // Background matching frame edge tone
    ctx.fillStyle = '#08080a';
    ctx.fillRect(0, 0, cw, ch);

    const imgW = img.naturalWidth || 1280;
    const imgH = img.naturalHeight || 720;
    const imgRatio = imgW / imgH;
    const canvasRatio = cw / ch;

    let drawW: number;
    let drawH: number;
    let drawX: number;
    let drawY: number;

    if (canvasRatio > imgRatio) {
      drawH = ch;
      drawW = Math.round(ch * imgRatio);
      drawX = Math.round((cw - drawW) / 2);
      drawY = 0;
    } else {
      drawW = cw;
      drawH = Math.round(cw / imgRatio);
      drawX = 0;
      drawY = Math.round((ch - drawH) / 2);
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    lastRenderedFrameRef.current = frameIndex;

    if (onFrameChange) {
      onFrameChange(frameIndex);
    }
  }, [getNearestLoadedFrame, onFrameChange]);

  // Inertial render loop using lerp damping
  const updateLoop = useCallback(() => {
    const delta = targetFrameRef.current - currentFrameRef.current;

    if (Math.abs(delta) > 0.005) {
      currentFrameRef.current += delta * 0.18;
      const rounded = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(currentFrameRef.current)));
      if (rounded !== lastRenderedFrameRef.current) {
        drawFrame(rounded);
      }
      animFrameIdRef.current = requestAnimationFrame(updateLoop);
    } else {
      currentFrameRef.current = targetFrameRef.current;
      const rounded = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(currentFrameRef.current)));
      drawFrame(rounded);
      animFrameIdRef.current = null;
    }
  }, [drawFrame]);

  const requestRender = useCallback(() => {
    if (!animFrameIdRef.current) {
      animFrameIdRef.current = requestAnimationFrame(updateLoop);
    }
  }, [updateLoop]);

  // Canvas resize handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const targetW = Math.round(rect.width * dpr);
      const targetH = Math.round(rect.height * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        lastRenderedFrameRef.current = -1;
        drawFrame(Math.round(currentFrameRef.current));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Preload all 300 frames
  useEffect(() => {
    imagesRef.current = new Array(TOTAL_FRAMES + 1);
    let loadedCount = 0;

    // Load first frame immediately for instant first paint
    const firstImg = new Image();
    firstImg.src = getFrameUrl(1);
    imagesRef.current[1] = firstImg;
    firstImg.onload = () => {
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
      drawFrame(1);
    };

    // Preload remaining frames
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      imagesRef.current[i] = img;

      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount >= TOTAL_FRAMES) {
          setIsLoaded(true);
        }
        // If this frame happens to be the active one, draw it
        if (Math.round(currentFrameRef.current) === i && lastRenderedFrameRef.current !== i) {
          drawFrame(i);
        }
      };
    }

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [getFrameUrl, drawFrame]);

  // Update target frame from prop if provided, or track window scroll automatically
  useEffect(() => {
    if (progress !== undefined) {
      const clamped = Math.min(1, Math.max(0, progress));
      targetFrameRef.current = 1 + clamped * (TOTAL_FRAMES - 1);
      requestRender();
      return;
    }

    const handleWindowScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      const p = Math.min(1, Math.max(0, scrollTop / maxScroll));
      targetFrameRef.current = 1 + p * (TOTAL_FRAMES - 1);
      requestRender();
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    handleWindowScroll();
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [progress, requestRender]);

  // Drag to scrub interaction on the canvas itself (extra tactile feedback)
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startFrameRef = useRef<number>(1);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isInteractive) return;
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startFrameRef.current = currentFrameRef.current;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !isInteractive) return;
    const deltaX = e.clientX - startXRef.current;
    // 5px drag = 1 frame scrub
    const frameDelta = deltaX / 4;
    const newFrame = Math.min(TOTAL_FRAMES, Math.max(1, startFrameRef.current + frameDelta));
    targetFrameRef.current = newFrame;
    requestRender();
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
      className={`select-none ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />

      {/* Subtle glowing loading bar if preloading takes more than a moment */}
      {!isLoaded && loadProgress < 95 && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-neutral-900 overflow-hidden pointer-events-none z-20">
          <div
            className="h-full bg-gradient-to-r from-orange-600 via-amber-500 to-orange-400 transition-all duration-150"
            style={{ width: `${loadProgress}%` }}
          />
        </div>
      )}
    </div>
  );
};
