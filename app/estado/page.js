"use client";

import { useState } from "react";
import Link from "next/link";
import StarsBackground from "../components/StarsBackground";

const MENSAJES = {
  pendiente: "Tu carta todavía está en revisión.",
  aprobada: "¡Tu carta fue aprobada y ya está publicada!",
  rechazada: "Tu carta no fue aprobada para publicación.",
};

export default function Estado() {
  const [codigo, setCodigo] = useState("");
  const [buscando, setBuscando] = useState(false);
  const [resultado, setResultado] = useState(null); // { error } | { encontrada, estado, vistas }

  async function onSubmit(e) {
    e.preventDefault();
    setResultado(null);

    const limpio = codigo.trim();
    if (!limpio) {
      setResultado({ error: "Escribe tu código." });
      return;
    }

    setBuscando(true);
    try {
      const res = await fetch(
        `/api/estado?codigo=${encodeURIComponent(limpio)}`
      );
      const data = await res.json();
      if (!res.ok) {
        setResultado({ error: data.error || "Algo salió mal. Intenta de nuevo." });
      } else {
        setResultado(data);
      }
    } catch {
      setResultado({ error: "No se pudo consultar. Revisa tu conexión e intenta de nuevo." });
    } finally {
      setBuscando(false);
    }
  }

  return (
    <div className="page-shell">
      <StarsBackground />
      <div className="page-eyebrow">CARTAS PARA VENEZUELA</div>
      <div className="page-title">Consulta tu carta</div>
      <div className="page-sub">
        Escribe el código que recibiste al enviar tu carta para saber su
        estado y cuántas veces fue leída.
      </div>

      <form className="cv-form" onSubmit={onSubmit}>
        <div className="cv-field">
          <label htmlFor="codigo">Tu código</label>
          <input
            id="codigo"
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Ej. a1b2c3d4"
            maxLength={40}
          />
        </div>

        {resultado?.error && <div className="cv-msg err">{resultado.error}</div>}

        <button className="cv-submit" type="submit" disabled={buscando}>
          {buscando ? "BUSCANDO..." : "CONSULTAR →"}
        </button>
      </form>

      {resultado && !resultado.error && (
        <div className={resultado.encontrada ? "cv-msg ok" : "cv-msg err"}>
          {resultado.encontrada ? (
            <>
              {MENSAJES[resultado.estado] || "Estado desconocido."}
              {resultado.estado === "aprobada" && (
                <>
                  <br />
                  Ha sido mostrada {resultado.vistas}{" "}
                  {resultado.vistas === 1 ? "vez" : "veces"} a quienes visitan
                  la página.
                </>
              )}
            </>
          ) : (
            "No encontramos ninguna carta con ese código. Revísalo e intenta de nuevo."
          )}
        </div>
      )}

      <div className="footerlink">
        <Link href="/">Volver al inicio →</Link>
      </div>
    </div>
  );
}
