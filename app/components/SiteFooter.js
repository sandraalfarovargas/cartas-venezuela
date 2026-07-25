import Link from "next/link";

export default function SiteFooter() {
  return (
    <div className="site-footer">
      Creado por{" "}
      <a
        href="https://www.instagram.com/soysandraalfaro/"
        target="_blank"
        rel="noopener noreferrer"
      >
        @soysandraalfaro
      </a>{" "}
      y{" "}
      <a
        href="https://www.instagram.com/cartasdequerencia/"
        target="_blank"
        rel="noopener noreferrer"
      >
        @cartasdequerencia
      </a>
      <br />
      <Link href="/privacidad">Política de privacidad</Link>
    </div>
  );
}
