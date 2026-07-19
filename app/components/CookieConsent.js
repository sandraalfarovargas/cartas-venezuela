"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

const CONSENT_KEY = "cv_cookie_consent"; // "aceptado" | "rechazado"
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function CookieConsent() {
  const [consent, setConsent] = useState(null); // null = todavía no sabemos
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(CONSENT_KEY) : null;
    if (saved === "aceptado" || saved === "rechazado") {
      setConsent(saved);
      setShowBanner(false);
    } else {
      setConsent(null);
      setShowBanner(true);
    }
  }, []);

  function aceptar() {
    localStorage.setItem(CONSENT_KEY, "aceptado");
    setConsent("aceptado");
    setShowBanner(false);
  }

  function rechazar() {
    localStorage.setItem(CONSENT_KEY, "rechazado");
    setConsent("rechazado");
    setShowBanner(false);
  }

  return (
    <>
      {consent === "aceptado" && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {showBanner && (
        <div className="cookie-banner">
          <div className="cookie-banner-text">
            Usamos cookies necesarias para que la web funcione y, si nos das
            permiso, cookies de estadísticas anónimas (Google Analytics) para
            entender cómo se usa el sitio. Más información en nuestra{" "}
            <Link href="/privacidad">política de privacidad</Link>.
          </div>
          <div className="cookie-banner-actions">
            <button className="cookie-btn reject" onClick={rechazar}>
              RECHAZAR
            </button>
            <button className="cookie-btn accept" onClick={aceptar}>
              ACEPTAR
            </button>
          </div>
        </div>
      )}
    </>
  );
}
