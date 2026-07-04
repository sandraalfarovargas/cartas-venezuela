import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

// Endpoint público (sin token): recibe un código corto y devuelve solo el
// estado y el número de veces mostrada. Nunca devuelve el texto ni datos
// de otras cartas.
export async function GET(request) {
  const codigo = (request.nextUrl.searchParams.get("codigo") || "")
    .trim()
    .toLowerCase();

  if (!codigo) {
    return NextResponse.json({ error: "Falta el código." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("cartas")
    .select("estado, vistas")
    .eq("codigo", codigo)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ encontrada: false });
  }

  return NextResponse.json({
    encontrada: true,
    estado: data.estado,
    vistas: data.vistas || 0,
  });
}
