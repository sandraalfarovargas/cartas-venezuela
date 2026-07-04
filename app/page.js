"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function sealSVG() {
  return (
    '<g>' +
    '<circle cx="100" cy="80" r="17" fill="#000" opacity=".18"/>' +
    '<circle cx="100" cy="79" r="16" fill="#7d1620"/>' +
    '<circle cx="100" cy="79" r="16" fill="#9e1b22" opacity=".5"/>' +
    '<path d="M100 88 C93 82.5 87.5 78 87.5 73 C87.5 69.5 91 67.8 93.8 70 C95.4 71.3 100 74.5 100 74.5 C100 74.5 104.6 71.3 106.2 70 C109 67.8 112.5 69.5 112.5 73 C112.5 78 107 82.5 100 88 Z" fill="#F2C94C"/>' +
    '<path d="M100 88 C93 82.5 87.5 78 87.5 73 C87.5 69.5 91 67.8 93.8 70 C95.4 71.3 100 74.5 100 74.5 C100 74.5 104.6 71.3 106.2 70 C109 67.8 112.5 69.5 112.5 73 C112.5 78 107 82.5 100 88 Z" fill="#E8B53A" opacity=".5"/>' +
    '<ellipse cx="95" cy="73" rx="5" ry="3" fill="#fff" opacity=".25"/>' +
    '</g>'
  );
}

function envSVG(top) {
  return (
    '<svg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="2" y="2" width="196" height="146" rx="6" fill="#EFE6CF" stroke="#cdbf9e" stroke-width="1.2"/>' +
    (top ? '<rect x="2" y="2" width="196" height="146" rx="6" fill="#000" opacity=".015"/>' : '') +
    '<path d="M2 8 L100 84 L198 8" fill="#E7DBBE" stroke="#cdbf9e" stroke-width="1.2"/>' +
    '<path d="M2 8 L100 84 L198 8" fill="#000" opacity=".05"/>' +
    (top ? sealSVG() : '') +
    '</svg>'
  );
}

export default function Home() {
  const deckRef = useRef(null);
  const canvasRef = useRef(null);

  const [count, setCount] = useState(null);
  const [revealOpen, setRevealOpen] = useState(false);
  const [scaleIn, setScaleIn] = useState(false);
  const [carta, setCarta] = useState(null);
  const [emptyState, setEmptyState] = useState(false);
  const [loading, setLoading] = useState(false);

  // Construye el mazo de sobres (igual que el diseño original)
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    deck.innerHTML = "";
    const layers = [
      { x: 14, y: 18, r: -5, o: 0.5 },
      { x: -12, y: 12, r: 4, o: 0.6 },
      { x: 7, y: 7, r: -2, o: 0.8 },
      { x: -4, y: 3, r: 2, o: 0.92 },
      { x: 0, y: 0, r: 0, o: 1 },
    ];
    layers.forEach((L, i) => {
      const top = i === layers.length - 1;
      const d = document.createElement("div");
      d.style.cssText = `position:absolute;left:0;top:0;width:200px;transform:translate(${L.x}px,${L.y}px) rotate(${L.r}deg);opacity:${L.o};filter:drop-shadow(0 6px 12px rgba(0,0,0,.35));transition:transform .2s ease;`;
      d.innerHTML = envSVG(top);
      deck.appendChild(d);
    });
    deck.onmouseenter = () => {
      deck.lastChild.style.transform = "translate(0,-10px) rotate(0deg)";
    };
    deck.onmouseleave = () => {
      deck.lastChild.style.transform = "translate(0,0) rotate(0deg)";
    };
  }, []);

  // Cielo estrellado animado
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

  // Contador real de cartas aprobadas
  useEffect(() => {
    fetch("/api/cartas/count")
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => setCount(0));
  }, []);

  // Anima la entrada de la carta cuando se abre
  useEffect(() => {
    if (revealOpen) {
      const id = requestAnimationFrame(() => setScaleIn(true));
      return () => cancelAnimationFrame(id);
    }
  }, [revealOpen]);

  async function drawRandom() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/cartas/random");
      const data = await res.json();
      if (!data.carta) {
        setEmptyState(true);
        setCarta(null);
      } else {
        setEmptyState(false);
        setCarta(data.carta);
      }
    } catch {
      setEmptyState(true);
      setCarta(null);
    } finally {
      setLoading(false);
      setScaleIn(false);
      setRevealOpen(true);
    }
  }

  function closeReveal() {
    setScaleIn(false);
    setTimeout(() => setRevealOpen(false), 250);
  }

  return (
    <>
      <canvas id="stars" ref={canvasRef}></canvas>

      <div className="wrap">
        <div className="eyebrow">CARTAS PARA VENEZUELA</div>
        <div className="title">Toma una carta</div>
        <div className="flag">
          <span style={{ background: "#E8C24A" }}></span>
          <span style={{ background: "#3258B0" }}></span>
          <span style={{ background: "#C8434F" }}></span>
        </div>
        <div className="sub">
          Respira. Piensa en lo que tu corazón necesita oír hoy. Toca el mazo
          y deja que una carta te encuentre.
        </div>
      </div>

      <div id="deckzone">
        <div
          id="deck"
          ref={deckRef}
          onClick={drawRandom}
          style={{ opacity: loading ? 0.7 : 1 }}
        ></div>
        <div id="count">
          {count === null
            ? ""
            : `${count} carta${count === 1 ? "" : "s"} escrita${
                count === 1 ? "" : "s"
              } con amor`}
        </div>
      </div>

      <div className="footerlink">
        <Link href="/escribir">Escribe una carta →</Link>
      </div>

      {revealOpen && (
        <div id="reveal" style={{ display: "flex" }}>
          <div
            id="revealCard"
            style={{ transform: scaleIn ? "scale(1)" : "scale(.9)" }}
          >
            <div className="topflag"></div>
            <div className="para-ti">PARA TI</div>
            {emptyState ? (
              <p className="emptystate">
                Todavía no hay cartas publicadas. Vuelve pronto, o sé tú quien
                escriba la primera.
              </p>
            ) : (
              <>
                <p id="msg">{carta?.texto}</p>
                <p id="sig">— {carta?.firma || "Anónimo"}</p>
              </>
            )}
            <button id="again" onClick={closeReveal}>
              TOMAR OTRA →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
