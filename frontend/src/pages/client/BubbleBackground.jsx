import React, { useEffect, useRef } from "react";

export default function BubbleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // buat 20 bola acak
    const balls = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 20 + Math.random() * 30,
      dx: (Math.random() - 0.5) * 1,
      dy: (Math.random() - 0.5) * 1,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`,
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);
      balls.forEach((b) => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();

        // gerakan bola
        b.x += b.dx;
        b.y += b.dy;

        // pantulan dari tepi layar
        if (b.x + b.r > width || b.x - b.r < 0) b.dx *= -1;
        if (b.y + b.r > height || b.y - b.r < 0) b.dy *= -1;
      });
      requestAnimationFrame(draw);
    }

    draw();

    // update ukuran kalau layar di-resize
    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{
        background: "radial-gradient(circle at center, #3a0078, #1b0033)",
      }}
    />
  );
}
