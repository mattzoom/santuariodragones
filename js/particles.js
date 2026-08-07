// Particle Background System for Santuario Secreto de Dragones
// Floating golden embers, fire sparks, and magical aura

export function initParticlesCanvas(canvasId = "particle-canvas") {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 15), 80);

  const colors = [
    "rgba(255, 215, 0, ",  // Gold
    "rgba(255, 120, 0, ",  // Warm orange flame
    "rgba(255, 60, 0, ",   // Deep fire red
    "rgba(0, 229, 255, "   // Mystical cyan glow
  ];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.7 + 0.2,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.8 - 0.2,
      pulse: Math.random() * 0.02 + 0.005,
      pulseDirection: 1
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.speedX;
      p.y += p.speedY;

      // Pulse alpha for flickering ember effect
      p.alpha += p.pulse * p.pulseDirection;
      if (p.alpha >= 0.95 || p.alpha <= 0.1) {
        p.pulseDirection *= -1;
      }

      // Reset when floating off screen top or sides
      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = p.color + p.alpha + ")";
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color + "1)";
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  render();
}
