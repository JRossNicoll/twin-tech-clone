import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  pulseSpeed: number;
  pulseOffset: number;
}

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const particles: Particle[] = [];
    const count = 80;
    const connectionDist = 140;
    const mouseDist = 200;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.08,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    const draw = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update and draw particles
      particles.forEach((p) => {
        // Mouse repulsion
        const dmx = p.x - mx;
        const dmy = p.y - my;
        const mouseDst = Math.sqrt(dmx * dmx + dmy * dmy);
        if (mouseDst < mouseDist && mouseDst > 0) {
          const force = (1 - mouseDst / mouseDist) * 0.8;
          p.vx += (dmx / mouseDst) * force;
          p.vy += (dmy / mouseDst) * force;
        }

        // Damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Drift
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vy += (Math.random() - 0.5) * 0.02;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.5 + 0.5;
        const currentOpacity = p.opacity * (0.6 + pulse * 0.4);
        const currentSize = p.size * (0.8 + pulse * 0.2);

        // Glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize * 4);
        gradient.addColorStop(0, `hsla(25, 95%, 53%, ${currentOpacity * 0.3})`);
        gradient.addColorStop(1, `hsla(25, 95%, 53%, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(25, 95%, 60%, ${currentOpacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            const alpha = 0.06 * (1 - dist / connectionDist);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(25, 95%, 53%, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw mouse connections
      if (mx > 0 && my > 0) {
        particles.forEach((p) => {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseDist) {
            const alpha = 0.12 * (1 - dist / mouseDist);
            ctx.beginPath();
            ctx.moveTo(mx, my);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `hsla(25, 95%, 53%, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.7, pointerEvents: "auto" }}
    />
  );
};

export default ParticleField;