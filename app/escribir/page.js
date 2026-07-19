"use client";

import { useState } from "react";
import Link from "next/link";
import StarsBackground from "../components/StarsBackground";

export default function Escribir() {
  const [texto, setTexto] = useState("");
  const [firma, setFirma] = useState("");
  const [pais, setPais] = useState("");
  const [email, setEmail] = useState("");
  const [permiso, setPermiso] = useState(false);
  const [consentimientoDatos, setConsentimientoDatos] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState(null); // { ok: true, codigo } | { error: "..." }

  async function onSubmit(e) {
    e.preventDefault();
    setResultado(null);

    if (!texto.trim()) {
      setResultado({ error: "Escribe el texto de tu carta." });
      return;
    }
    if (texto.trim().length < 60) {
      setResultado({
        error: "Tu carta es muy corta — cuéntale un poco más a quien la reciba (mínimo 60 caracteres).",
      });
      return;
    }
    const emailLimpio = email.trim();
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpio);
    if (!emailValido) {
      setResultado({ error: "Escribe un correo electrónico válido." });
      return;
    }
    if (!consentimientoDatos) {
      setResultado({
        error: "Debes autorizar el uso de tu correo electrónico para continuar.",
      });
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
        body: JSON.stringify({ texto, firma, pais, email: emailLimpio, permiso }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResultado({ error: data.error || "Algo salió mal. Intenta de nuevo." });
      } else {
        setResultado({ ok: true, codigo: data.codigo || null });
        setTexto("");
        setFirma("");
        setPais("");
        setEmail("");
        setPermiso(false);
        setConsentimientoDatos(false);
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

      <div className="cv-guidelines">
        <div className="cv-guidelines-title">ANTES DE ESCRIBIR</div>
        <ul>
          <li>En español, para que cualquier persona en Venezuela pueda sentirse acompañada.</li>
          <li>Si mencionas tu fe, hazlo con prudencia.</li>
          <li>Sin proselitismo religioso, ni político.</li>
          <li>Sin dar datos de contacto (redes, teléfono, correo).</li>
          <li>Sin publicidad ni recaudaciones.</li>
        </ul>
        <p className="note">No tiene que ser perfecta. Solo sincera.</p>
      </div>

      {!texto && (
        <>
          <div className="example-label">ASÍ SE VERÁ TU CARTA PUBLICADA</div>
          <div className="example-card">
            <div className="topflag"></div>
            <div className="para-ti">PARA TI</div>
            <p className="msg">
              El terremoto te quitó el suelo bajo los pies, pero no las manos
              que te sostienen. Desde lejos seguimos pensando en ti. Llora lo
              que tengas que llorar, descansa lo que tengas que descansar: la
              misma tierra que tembló te vio nacer y te volverá a levantar.
            </p>
            <p className="sig">— Alguien que te manda fuerza desde lejos</p>
          </div>
        </>
      )}

      {resultado?.ok ? (
        <div className="cv-msg ok">
          Gracias. Tu carta quedó pendiente de revisión — en cuanto sea
          aprobada, podrá aparecer para que alguien la reciba.
          {resultado.codigo && (
            <>
              <br />
              <br />
              Guarda este código: <strong>{resultado.codigo}</strong>
              <br />
              Con él puedes consultar más adelante si tu carta fue aprobada
              y cuántas veces ha sido mostrada, en{" "}
              <Link href="/estado">cartasparavenezuela.com/estado</Link>.
            </>
          )}
          <br />
          <br />
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
              placeholder='Ej. "María, una venezolana en Madrid"'
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

          <div className="cv-field">
            <label htmlFor="email">Tu correo electrónico *</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              maxLength={200}
            />
          </div>

          <label className="cv-checkbox">
            <input
              type="checkbox"
              checked={consentimientoDatos}
              onChange={(e) => setConsentimientoDatos(e.target.checked)}
            />
            Me gustaría recibir noticias de este y otros proyectos de Sandra
            Alfaro y Querencia Mail. Tu correo nunca se publica ni se
            comparte, y puedes darte de baja cuando quieras. *
          </label>

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
