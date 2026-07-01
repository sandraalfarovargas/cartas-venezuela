import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e1730",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 90,
            left: 160,
            width: 4,
            height: 4,
            borderRadius: 999,
            background: "rgba(243,237,224,0.6)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 160,
            left: 980,
            width: 5,
            height: 5,
            borderRadius: 999,
            background: "rgba(243,237,224,0.5)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 480,
            left: 120,
            width: 3,
            height: 3,
            borderRadius: 999,
            background: "rgba(243,237,224,0.5)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 500,
            left: 1040,
            width: 4,
            height: 4,
            borderRadius: 999,
            background: "rgba(243,237,224,0.6)",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 8,
            color: "#CBA45B",
            fontFamily: "monospace",
          }}
        >
          CARTAS PARA VENEZUELA
        </div>

        <svg width="140" height="105" viewBox="0 0 200 150" style={{ marginTop: 34 }}>
          <rect x="2" y="2" width="196" height="146" rx="6" fill="#EFE6CF" stroke="#cdbf9e" strokeWidth="1.2" />
          <path d="M2 8 L100 84 L198 8" fill="#E7DBBE" stroke="#cdbf9e" strokeWidth="1.2" />
          <circle cx="100" cy="79" r="17" fill="#7d1620" />
          <circle cx="100" cy="79" r="17" fill="#9e1b22" opacity="0.5" />
          <path
            d="M100 88 C93 82.5 87.5 78 87.5 73 C87.5 69.5 91 67.8 93.8 70 C95.4 71.3 100 74.5 100 74.5 C100 74.5 104.6 71.3 106.2 70 C109 67.8 112.5 69.5 112.5 73 C112.5 78 107 82.5 100 88 Z"
            fill="#F2C94C"
          />
        </svg>

        <div
          style={{
            display: "flex",
            fontSize: 68,
            color: "#F3EDE0",
            fontFamily: "Georgia, serif",
            marginTop: 30,
          }}
        >
          Toma una carta
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "rgba(243,237,224,0.75)",
            fontFamily: "Georgia, serif",
            marginTop: 18,
            maxWidth: 780,
            textAlign: "center",
          }}
        >
          Cartas anónimas de aliento para sobrevivientes del terremoto en Venezuela
        </div>
      </div>
    ),
    { ...size }
  );
}
