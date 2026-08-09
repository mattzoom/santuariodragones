export function initParticlesCanvas(canvasId = "particle-canvas") {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    canvas.style.display = "none";
    return;
  }

  function getParticleCount() {
    return window.innerWidth < 768 ? 18 : 40;
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  let particles = Array.from({ length: getParticleCount() }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2.2 + 0.8,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    alpha: Math.random() * 0.55 + 0.15
  }));

  let isAnimating = true;

  function animate() {
    if (!isAnimating) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(233, 196, 106, ${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  // Pause animation when tab is inactive to save battery and GPU
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      isAnimating = false;
    } else {
      if (!isAnimating) {
        isAnimating = true;
        animate();
      }
    }
  });

  animate();
}
