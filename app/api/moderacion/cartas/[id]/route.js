import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { hasValidSession, SESSION_COOKIE } from "@/lib/session";

export async function PATCH(request, { params }) {
  const cookie = request.cookies.get(SESSION_COOKIE)?.value;
  if (!hasValidSession(cookie)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const estado = body?.estado;

  if (!["aprobada", "rechazada"].includes(estado)) {
    return NextResponse.json({ error: "Estado inválido." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("cartas").update({ estado }).eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
