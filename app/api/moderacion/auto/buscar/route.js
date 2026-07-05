import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

// Ruta temporal: busca cartas por coincidencia parcial en la firma. Se borra despues.
export async function GET(request) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token || token !== process.env.AUTOMATION_TOKEN) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const firma = request.nextUrl.searchParams.get("firma") || "";

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("cartas")
    .select("id, texto, firma, pais, estado, codigo, creada_en")
    .or(`firma.ilike.%${firma}%,texto.ilike.%${firma}%`)
    .order("id", { ascending: true })
    .limit(10);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
