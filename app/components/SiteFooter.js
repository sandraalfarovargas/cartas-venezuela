import Link from "next/link";

export default function SiteFooter() {
  return (
    <div className="site-footer">
      Página creada por{" "}
      <a
        href="https://www.linkedin.com/in/sandraalfarovargas/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Sandra Alfaro Vargas
      </a>
      <br />
      <Link href="/privacidad">Política de privacidad</Link>
    </div>
  );
}
