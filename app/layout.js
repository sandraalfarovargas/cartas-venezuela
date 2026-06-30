import "./globals.css";

export const metadata = {
  title: "Cartas para Venezuela",
  description:
    "Cartas anónimas de aliento para sobrevivientes del terremoto en Venezuela.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
