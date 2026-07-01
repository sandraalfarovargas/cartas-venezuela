import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://cartasparavenezuela.com"),
  title: "Cartas para Venezuela",
  description:
    "Cartas anónimas de aliento para sobrevivientes del terremoto en Venezuela.",
  openGraph: {
    title: "Cartas para Venezuela",
    description:
      "Cartas anónimas de aliento para sobrevivientes del terremoto en Venezuela.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cartas para Venezuela",
    description:
      "Cartas anónimas de aliento para sobrevivientes del terremoto en Venezuela.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
