"use client";

import { useEffect, useRef } from "react";

export default function StarsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv.getContext("2d");
    let stars = [];
    let raf;
    function resize() {
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < 150; i++) {
        stars.push({
          x: Math.random() * cv.width,
          y: Math.random() * cv.height,
          r: Math.random() * 1.6 + 0.3,
          a: Math.random(),
          sp: Math.random() * 0.02 + 0.004,
        });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (const s of stars) {
        s.a += s.sp;
        const o = 0.3 + Math.abs(Math.sin(s.a)) * 0.6;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 6.3);
        ctx.fillStyle = `rgba(243,237,224,${o})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas id="stars" ref={canvasRef}></canvas>;
}
