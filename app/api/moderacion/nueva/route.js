import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { hasValidSession, SESSION_COOKIE } from "@/lib/session";

export async function POST(request) {
  const cookie = request.cookies.get(SESSION_COOKIE)?.value;
  if (!hasValidSession(cookie)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const texto = (body?.texto || "").trim();
  const firma = (body?.firma || "").trim();
  const pais = (body?.pais || "").trim();
  const estado = body?.estado === "pendiente" ? "pendiente" : "aprobada";

  if (!texto) {
    return NextResponse.json(
      { error: "El texto de la carta es obligatorio." },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("cartas").insert({
    texto,
    firma: firma || null,
    pais: pais || null,
    estado,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
