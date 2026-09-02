import Link from "next/link";

export default function SiteFooter() {
  return (
    <div className="site-footer">
      Creado por{" "}
      <a
        href="https://www.instagram.com/sanalfarovargas/"
        target="_blank"
        rel="noopener noreferrer"
      >
        @sanalfarovargas
      </a>{" "}
      y{" "}
      <a
        href="https://www.instagram.com/cartasquerencia/"
        target="_blank"
        rel="noopener noreferrer"
      >
        @cartasquerencia
      </a>
      <br />
      <Link href="/privacidad">Política de privacidad</Link>
    </div>
  );
}
