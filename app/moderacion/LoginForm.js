"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setEnviando(true);
    try {
      const res = await fetch("/api/moderacion/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Contraseña incorrecta.");
        setEnviando(false);
        return;
      }
      router.refresh();
    } catch {
      setError("No se pudo conectar. Intenta de nuevo.");
      setEnviando(false);
    }
  }

  return (
    <form className="mod-login" onSubmit={onSubmit}>
      <div className="page-sub">Acceso privado. Introduce la contraseña.</div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        autoFocus
      />
      {error && <div className="cv-msg err" style={{ marginTop: 14 }}>{error}</div>}
      <button className="cv-submit" type="submit" disabled={enviando}>
        {enviando ? "ENTRANDO..." : "ENTRAR →"}
      </button>
    </form>
  );
}
