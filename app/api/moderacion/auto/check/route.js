import { NextResponse } from "next/server";

// Ruta temporal de diagnóstico: no revela los valores reales, solo si coinciden.
export async function GET(request) {
  const token = request.nextUrl.searchParams.get("token") || "";
  const expected = process.env.AUTOMATION_TOKEN || "";
  return NextResponse.json({
    tokenRecibidoLargo: token.length,
    tokenEsperadoLargo: expected.length,
    coincide: token === expected,
    coincideSinEspacios: token.trim() === expected.trim(),
  });
}
