"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [cartas, setCartas] = useState(null);
  const [error, setError] = useState("");
  const [actuando, setActuando] = useState(null); // id de la carta en proceso

  const [nuevoTexto, setNuevoTexto] = useState("");
  const [nuevaFirma, setNuevaFirma] = useState("");
  const [nuevoPais, setNuevoPais] = useState("");
  const [nuevoEstado, setNuevoEstado] = useState("aprobada");
  const [agregando, setAgregando] = useState(false);
  const [mensajeNueva, setMensajeNueva] = useState(null);

  const router = useRouter();

  async function cargarPendientes() {
    setError("");
    try {
      const res = await fetch("/api/moderacion/pendientes");
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "No se pudo cargar.");
        return;
      }
      setCartas(data.cartas);
    } catch {
      setError("No se pudo conectar.");
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- carga inicial de datos al montar
    cargarPendientes();
  }, []);

  async function decidir(id, estado) {
    setActuando(id);
    setError("");
    try {
      const res = await fetch(`/api/moderacion/cartas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || `No se pudo guardar el cambio (código ${res.status}).`);
        return;
      }
      setCartas((prev) => prev.filter((c) => c.id !== id));
    } catch {
      setError("No se pudo conectar para guardar el cambio.");
    } finally {
      setActuando(null);
    }
  }

  async function agregarCarta(e) {
    e.preventDefault();
    if (!nuevoTexto.trim()) {
      setMensajeNueva({ error: "Escribe el texto de la carta." });
      return;
    }
    setAgregando(true);
    setMensajeNueva(null);
    try {
      const res = await fetch("/api/moderacion/nueva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          texto: nuevoTexto,
          firma: nuevaFirma,
          pais: nuevoPais,
          estado: nuevoEstado,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMensajeNueva({ error: data.error || "No se pudo guardar." });
      } else {
        setMensajeNueva({ ok: true });
        setNuevoTexto("");
        setNuevaFirma("");
        setNuevoPais("");
      }
    } catch {
      setMensajeNueva({ error: "No se pudo conectar." });
    } finally {
      setAgregando(false);
    }
  }

  async function salir() {
    await fetch("/api/moderacion/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
        <button className="mod-btn reject" onClick={salir}>
          CERRAR SESIÓN
        </button>
      </div>

      <div className="mod-panel">
        <div className="page-eyebrow" style={{ textAlign: "left" }}>
          PENDIENTES DE REVISIÓN
        </div>
        {error && <div className="cv-msg err" style={{ marginTop: 12 }}>{error}</div>}
        {cartas === null && !error && <div className="mod-empty">Cargando...</div>}
        {cartas?.length === 0 && (
          <div className="mod-empty">No hay cartas pendientes ahora mismo.</div>
        )}
        {cartas?.map((c) => (
          <div className="mod-letter" key={c.id}>
            <p className="msg">{c.texto}</p>
            <div className="meta">
              {c.firma || "Sin firma"} · {c.pais || "País no indicado"} ·{" "}
              {new Date(c.creada_en).toLocaleDateString("es")}
            </div>
            <div className="mod-actions">
              <button
                className="mod-btn approve"
                disabled={actuando === c.id}
                onClick={() => decidir(c.id, "aprobada")}
              >
                APROBAR
              </button>
              <button
                className="mod-btn reject"
                disabled={actuando === c.id}
                onClick={() => decidir(c.id, "rechazada")}
              >
                RECHAZAR
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mod-panel">
        <div className="page-eyebrow" style={{ textAlign: "left" }}>
          AÑADIR UNA CARTA
        </div>
        <form className="cv-form" onSubmit={agregarCarta}>
          <div className="cv-field">
            <label>Texto *</label>
            <textarea
              value={nuevoTexto}
              onChange={(e) => setNuevoTexto(e.target.value)}
              maxLength={4000}
            />
          </div>
          <div className="cv-field">
            <label>Firma (opcional)</label>
            <input
              type="text"
              value={nuevaFirma}
              onChange={(e) => setNuevaFirma(e.target.value)}
              maxLength={120}
            />
          </div>
          <div className="cv-field">
            <label>País (opcional)</label>
            <input
              type="text"
              value={nuevoPais}
              onChange={(e) => setNuevoPais(e.target.value)}
              maxLength={80}
            />
          </div>
          <div className="cv-field">
            <label>Estado al guardar</label>
            <select
              value={nuevoEstado}
              onChange={(e) => setNuevoEstado(e.target.value)}
              style={{ padding: 10, borderRadius: 6, border: "1px solid #cdbf9e" }}
            >
              <option value="aprobada">Aprobada (visible de inmediato)</option>
              <option value="pendiente">Pendiente (revisar después)</option>
            </select>
          </div>
          {mensajeNueva?.ok && <div className="cv-msg ok">Carta guardada.</div>}
          {mensajeNueva?.error && <div className="cv-msg err">{mensajeNueva.error}</div>}
          <button className="mod-btn add" type="submit" disabled={agregando}>
            {agregando ? "GUARDANDO..." : "GUARDAR CARTA"}
          </button>
        </form>
      </div>
    </div>
  );
}
