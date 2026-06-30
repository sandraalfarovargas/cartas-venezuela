"use client";

import { useState } from "react";
import Link from "next/link";
import StarsBackground from "../components/StarsBackground";

export default function Escribir() {
  const [texto, setTexto] = useState("");
  const [firma, setFirma] = useState("");
  const [pais, setPais] = useState("");
  const [permiso, setPermiso] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState(null); // { ok: true } | { error: "..." }

  async function onSubmit(e) {
    e.preventDefault();
    setResultado(null);

    if (!texto.trim()) {
      setResultado({ error: "Escribe el texto de tu carta." });
      return;
    }
    if (!permiso) {
      setResultado({ error: "Debes aceptar el permiso de publicación." });
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch("/api/cartas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto, firma, pais, permiso }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResultado({ error: data.error || "Algo salió mal. Intenta de nuevo." });
      } else {
        setResultado({ ok: true });
        setTexto("");
        setFirma("");
        setPais("");
        setPermiso(false);
      }
    } catch {
      setResultado({ error: "No se pudo enviar. Revisa tu conexión e intenta de nuevo." });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="page-shell">
      <StarsBackground />
      <div className="page-eyebrow">CARTAS PARA VENEZUELA</div>
      <div className="page-title">Escribe una carta</div>
      <div className="page-sub">
        Tus palabras pueden ser el abrazo que alguien necesita hoy. Escribe
        como si le hablaras a una sola persona, con calma y cariño.
      </div>

      <div className="example-label">ASÍ SE VERÁ TU CARTA PUBLICADA</div>
      <div className="example-card">
        <div className="topflag"></div>
        <div className="para-ti">PARA TI</div>
        <p className="msg">
          No te conozco, pero hoy pienso en ti. Sé que el suelo se llevó
          cosas que no volverán. Llóralas todo lo que necesites. Y cuando
          puedas, recuerda: no estás sola en esta oscuridad.
        </p>
        <p className="sig">— Una venezolana en España</p>
      </div>

      {resultado?.ok ? (
        <div className="cv-msg ok">
          Gracias. Tu carta quedó pendiente de revisión — en cuanto sea
          aprobada, podrá aparecer para que alguien la reciba.{" "}
          <Link href="/">Volver al inicio →</Link>
        </div>
      ) : (
        <form className="cv-form" onSubmit={onSubmit}>
          <div className="cv-field">
            <label htmlFor="texto">Tu carta *</label>
            <textarea
              id="texto"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              maxLength={4000}
              placeholder="Escribe aquí tu mensaje de aliento..."
            />
          </div>

          <div className="cv-field">
            <label htmlFor="firma">Cómo quieres firmar (opcional)</label>
            <input
              id="firma"
              type="text"
              value={firma}
              onChange={(e) => setFirma(e.target.value)}
              placeholder='Ej. "Una venezolana en Madrid"'
              maxLength={120}
            />
          </div>

          <div className="cv-field">
            <label htmlFor="pais">País (opcional)</label>
            <input
              id="pais"
              type="text"
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              placeholder="Ej. España"
              maxLength={80}
            />
          </div>

          <label className="cv-checkbox">
            <input
              type="checkbox"
              checked={permiso}
              onChange={(e) => setPermiso(e.target.checked)}
            />
            Doy permiso para que esta carta sea publicada de forma anónima en
            Cartas para Venezuela, una vez sea revisada. *
          </label>

          {resultado?.error && <div className="cv-msg err">{resultado.error}</div>}

          <button className="cv-submit" type="submit" disabled={enviando}>
            {enviando ? "ENVIANDO..." : "ENVIAR CARTA →"}
          </button>
        </form>
      )}
    </div>
  );
}
