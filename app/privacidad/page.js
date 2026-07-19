import Link from "next/link";
import StarsBackground from "../components/StarsBackground";

export const metadata = {
  title: "Política de privacidad — Cartas para Venezuela",
};

export default function Privacidad() {
  return (
    <div className="page-shell">
      <StarsBackground />
      <div className="page-eyebrow">CARTAS PARA VENEZUELA</div>
      <div className="page-title">Política de privacidad</div>
      <div className="page-sub">
        Aquí explicamos, en lenguaje sencillo, qué datos recogemos, para qué
        los usamos y qué derechos tienes sobre ellos, conforme al Reglamento
        General de Protección de Datos (RGPD) de la Unión Europea.
      </div>

      <div className="cv-guidelines" style={{ textAlign: "left", maxWidth: 620 }}>
        <div className="cv-guidelines-title">RESPONSABLE DEL TRATAMIENTO</div>
        <p>
          Sandra Alfaro Vargas es la responsable de este proyecto y de los
          datos que se recogen a través de esta web.
          <br />
          Contacto: <a href="mailto:sandraalfarovargas@gmail.com">sandraalfarovargas@gmail.com</a>
        </p>
      </div>

      <div className="cv-guidelines" style={{ textAlign: "left", maxWidth: 620 }}>
        <div className="cv-guidelines-title">QUÉ DATOS RECOGEMOS Y PARA QUÉ</div>
        <ul>
          <li>
            <strong>El texto de tu carta, tu firma y tu país (opcionales):</strong>{" "}
            para publicarla de forma anónima en la web, si nos das tu permiso.
          </li>
          <li>
            <strong>Tu correo electrónico (obligatorio al escribir una carta):</strong>{" "}
            para enviarte tu código de seguimiento y, si lo autorizas,
            noticias de este y otros proyectos similares. Nunca se publica ni
            se comparte.
          </li>
          <li>
            <strong>Datos de navegación (solo si aceptas cookies):</strong>{" "}
            estadísticas anónimas de visitas mediante Google Analytics, para
            entender cómo se usa la web.
          </li>
        </ul>
      </div>

      <div className="cv-guidelines" style={{ textAlign: "left", maxWidth: 620 }}>
        <div className="cv-guidelines-title">BASE LEGAL</div>
        <p>
          Tratamos tus datos con tu consentimiento expreso, que nos das al
          marcar las casillas correspondientes al enviar tu carta o al
          aceptar las cookies de este sitio. Puedes retirar tu consentimiento
          en cualquier momento.
        </p>
      </div>

      <div className="cv-guidelines" style={{ textAlign: "left", maxWidth: 620 }}>
        <div className="cv-guidelines-title">CUÁNTO TIEMPO CONSERVAMOS TUS DATOS</div>
        <p>
          Conservamos tus datos mientras el proyecto esté activo. Puedes
          pedirnos en cualquier momento que eliminemos tu carta y/o tu correo
          electrónico, escribiendo a{" "}
          <a href="mailto:sandraalfarovargas@gmail.com">sandraalfarovargas@gmail.com</a>.
        </p>
      </div>

      <div className="cv-guidelines" style={{ textAlign: "left", maxWidth: 620 }}>
        <div className="cv-guidelines-title">CON QUIÉN COMPARTIMOS TUS DATOS</div>
        <p>
          No vendemos ni compartimos tus datos con terceros con fines
          publicitarios. Usamos proveedores de confianza para que la web
          funcione (alojamiento y base de datos) y, si aceptas cookies,
          Google Analytics para estadísticas de visitas. Estos proveedores
          pueden estar fuera de la Unión Europea y ofrecen garantías
          adecuadas de protección de datos (cláusulas contractuales tipo de
          la UE).
        </p>
      </div>

      <div className="cv-guidelines" style={{ textAlign: "left", maxWidth: 620 }}>
        <div className="cv-guidelines-title">TUS DERECHOS</div>
        <p>
          Puedes acceder a tus datos, corregirlos, pedir que los eliminemos,
          oponerte a su uso, pedir que limitemos su tratamiento o solicitar
          que te los entreguemos en un formato portable. También puedes
          retirar tu consentimiento en cualquier momento. Para ejercer
          cualquiera de estos derechos, escríbenos a{" "}
          <a href="mailto:sandraalfarovargas@gmail.com">sandraalfarovargas@gmail.com</a>.
          Si consideras que no hemos atendido tu solicitud correctamente,
          puedes presentar una reclamación ante la autoridad de protección de
          datos de tu país.
        </p>
      </div>

      <div className="cv-guidelines" style={{ textAlign: "left", maxWidth: 620 }}>
        <div className="cv-guidelines-title">COOKIES</div>
        <p>
          Esta web usa una cookie técnica necesaria para el funcionamiento
          del panel privado de moderación (no afecta a quienes visitan o
          escriben cartas). Si aceptas cookies en el aviso que aparece al
          entrar, también usaremos Google Analytics para saber cuántas
          personas visitan la web, de forma anónima. Puedes rechazarlas y
          seguir usando la web con normalidad.
        </p>
      </div>

      <div className="cv-guidelines" style={{ textAlign: "left", maxWidth: 620 }}>
        <div className="cv-guidelines-title">CAMBIOS A ESTA POLÍTICA</div>
        <p>
          Podemos actualizar esta política si cambian nuestras prácticas.
          Publicaremos cualquier cambio en esta misma página.
        </p>
      </div>

      <div className="footerlink">
        <Link href="/">Volver al inicio →</Link>
      </div>
    </div>
  );
}
