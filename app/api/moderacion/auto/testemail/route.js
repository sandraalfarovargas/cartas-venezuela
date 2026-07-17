import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(request) {
  try {
    const params = request.nextUrl.searchParams;
    const token = params.get("token");
    if (!token || token !== process.env.AUTOMATION_TOKEN) {
      return NextResponse.json({ error: "No autorizado." }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("cartas")
      .insert({
        texto: "Carta de prueba para verificar que la columna email funciona correctamente antes de borrarla.",
        firma: "Prueba automática",
        pais: null,
        email: "prueba@cartasparavenezuela.com",
        estado: "rechazada",
      })
      .select("id, email, estado")
      .single();

    if (error) {
      return NextResponse.json({ ok: false, error: error.message, code: error.code || null }, { status: 500 });
    }

    // Borra inmediatamente la fila de prueba
    await supabase.from("cartas").delete().eq("id", data.id);

    return NextResponse.json({ ok: true, probado: data });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e && e.message ? e.message : e) }, { status: 500 });
  }
}
