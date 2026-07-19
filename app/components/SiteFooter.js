import Link from "next/link";

export default function SiteFooter() {
  return (
    <div className="site-footer">
      Creado por{" "}
      <a
        href="https://www.instagram.com/sandraalfarov"
        target="_blank"
        rel="noopener noreferrer"
      >
        @sandraalfarov
      </a>{" "}
      y{" "}
      <a
        href="https://www.instagram.com/querenciamail/"
        target="_blank"
        rel="noopener noreferrer"
      >
        @querenciamail
      </a>
      <br />
      <Link href="/privacidad">Política de privacidad</Link>
    </div>
  );
}
