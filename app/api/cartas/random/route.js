import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const supabase = getSupabaseAdmin();

  // Usa una función de la base de datos (carta_aleatoria) para que sea
  // Postgres quien elija la fila al azar y solo nos devuelva esa una carta,
  // sin importar si hay 5 o 50,000 cartas guardadas.
  const { data, error } = await supabase.rpc("carta_aleatoria");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const carta = Array.isArray(data) ? data[0] : data;

  if (!carta) {
    return NextResponse.json({ carta: null });
  }

  return NextResponse.json({
    carta: { texto: carta.texto, firma: carta.firma },
  });
}
