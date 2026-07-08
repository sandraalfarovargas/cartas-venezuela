import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

// Ruta temporal: busca cartas por coincidencia parcial en la firma o el texto. Se borra despues.
export async function GET(request) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token || token !== process.env.AUTOMATION_TOKEN) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const q = request.nextUrl.searchParams.get("q") || "";

  try {
    const supabase = getSupabaseAdmin();

    const byFirma = await supabase
      .from("cartas")
      .select("id, texto, firma, pais, estado, codigo, creada_en")
      .ilike("firma", `%${q}%`)
      .order("id", { ascending: true })
      .limit(10);

    const byTexto = await supabase
      .from("cartas")
      .select("id, texto, firma, pais, estado, codigo, creada_en")
      .ilike("texto", `%${q}%`)
      .order("id", { ascending: true })
      .limit(10);

    if (byFirma.error) {
      return NextResponse.json({ error: byFirma.error.message }, { status: 500 });
    }
    if (byTexto.error) {
      return NextResponse.json({ error: byTexto.error.message }, { status: 500 });
    }

    const map = new Map();
    for (const row of [...byFirma.data, ...byTexto.data]) {
      map.set(row.id, row);
    }

    return NextResponse.json({ data: Array.from(map.values()) });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
