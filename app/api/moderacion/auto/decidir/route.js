import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(request) {
  const params = request.nextUrl.searchParams;
  const token = params.get("token");
  if (!token || token !== process.env.AUTOMATION_TOKEN) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const id = params.get("id");
  const estado = params.get("estado");
  const textoB64 = params.get("texto_b64");

  if (!id || !["aprobada", "rechazada", "pendiente"].includes(estado)) {
    return NextResponse.json({ error: "Parámetros inválidos." }, { status: 400 });
  }

  const updateData = { estado };
  if (textoB64) {
    try {
      updateData.texto = Buffer.from(textoB64, "base64").toString("utf-8");
    } catch {
      return NextResponse.json({ error: "texto_b64 inválido." }, { status: 400 });
    }
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("cartas").update(updateData).eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id, estado });
}
