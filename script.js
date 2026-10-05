(() => {
  const TOTAL_FRAMES = 300;
  const canvas = document.getElementById('animation-canvas');
  const ctx = canvas.getContext('2d', { alpha: false });

  // Ensure high quality image rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Start fresh from top on reload for best storytelling experience
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  const images = new Array(TOTAL_FRAMES + 1);
  let targetFrame = 1;
  let currentFrame = 1;
  let isAnimating = false;
  let lastRenderedFrame = -1;

  // Frame URL generator
  const getFrameUrl = (index) => {
    const padded = String(index).padStart(5, '0');
    return `frames/frame_${padded}.jpg`;
  };

  // Find nearest loaded frame if current target is still loading
  const getNearestLoadedFrame = (index) => {
    if (images[index] && images[index].complete && images[index].naturalWidth > 0) {
      return images[index];
    }
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = index - offset;
      if (prev >= 1 && images[prev] && images[prev].complete && images[prev].naturalWidth > 0) {
        return images[prev];
      }
      const next = index + offset;
      if (next <= TOTAL_FRAMES && images[next] && images[next].complete && images[next].naturalWidth > 0) {
        return images[next];
      }
    }
    return null;
  };

  // Canvas resize with High-DPI support
  let viewportWidth = window.innerWidth;
  let viewportHeight = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  const resize = () => {
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(viewportWidth * dpr);
    canvas.height = Math.round(viewportHeight * dpr);
    canvas.style.width = `${viewportWidth}px`;
    canvas.style.height = `${viewportHeight}px`;

    lastRenderedFrame = -1;
    drawFrame(Math.round(currentFrame));
  };

  window.addEventListener('resize', resize, { passive: true });

  // Draw specific frame maintaining aspect ratio centered
  const drawFrame = (frameIndex) => {
    const img = getNearestLoadedFrame(frameIndex);
    if (!img) return;

    const cw = canvas.width;
    const ch = canvas.height;

    // Fill background with image edge tone to ensure seamless borders
    ctx.fillStyle = '#08080a';
    ctx.fillRect(0, 0, cw, ch);

    const imgWidth = img.naturalWidth || 1280;
    const imgHeight = img.naturalHeight || 720;
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = cw / ch;

    let drawW, drawH, drawX, drawY;

    if (canvasRatio > imgRatio) {
      // Screen is wider than 16:9
      drawH = ch;
      drawW = Math.round(ch * imgRatio);
      drawX = Math.round((cw - drawW) / 2);
      drawY = 0;
    } else {
      // Screen is narrower/taller than 16:9
      drawW = cw;
      drawH = Math.round(cw / imgRatio);
      drawX = 0;
      drawY = Math.round((ch - drawH) / 2);
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    lastRenderedFrame = frameIndex;
  };

  // Smooth inertial interpolation loop
  const updateLoop = () => {
    const delta = targetFrame - currentFrame;

    if (Math.abs(delta) > 0.005) {
      // Smooth lerp damping
      currentFrame += delta * 0.16;
      const rounded = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(currentFrame)));
      if (rounded !== lastRenderedFrame) {
        drawFrame(rounded);
      }
      requestAnimationFrame(updateLoop);
    } else {
      currentFrame = targetFrame;
      const rounded = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(currentFrame)));
      drawFrame(rounded);
      isAnimating = false;
    }
  };

  const startAnimationLoop = () => {
    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(updateLoop);
    }
  };

  // Scroll handler
  const onScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, scrollTop / maxScroll));

    targetFrame = 1 + progress * (TOTAL_FRAMES - 1);
    startAnimationLoop();
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // Initial setup
  resize();

  // Load first frame immediately for instant first paint
  const firstImg = new Image();
  firstImg.src = getFrameUrl(1);
  images[1] = firstImg;
  firstImg.onload = () => {
    drawFrame(1);
  };

  // Preload all remaining frames in parallel
  const preloadAllFrames = () => {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      if (i === 1 && images[1]) continue;

      const img = new Image();
      img.src = getFrameUrl(i);
      images[i] = img;

      img.onload = () => {
        // If this newly loaded frame is the one currently needed, render it
        const currentTargetInt = Math.round(currentFrame);
        if (i === currentTargetInt && lastRenderedFrame !== i) {
          drawFrame(i);
        }
      };
    }
  };

  // Start preloading
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => preloadAllFrames());
  } else {
    setTimeout(preloadAllFrames, 10);
  }
})();
