import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { hasValidSession, SESSION_COOKIE } from "@/lib/session";

export async function GET(request) {
  const cookie = request.cookies.get(SESSION_COOKIE)?.value;
  if (!hasValidSession(cookie)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("cartas")
    .select("id, texto, firma, pais, creada_en")
    .eq("estado", "pendiente")
    .order("creada_en", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ cartas: data });
}
