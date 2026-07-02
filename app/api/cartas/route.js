import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const texto = (body.texto || "").trim();
  const firma = (body.firma || "").trim();
  const pais = (body.pais || "").trim();
  const permiso = Boolean(body.permiso);

  if (!texto) {
    return NextResponse.json(
      { error: "El texto de la carta es obligatorio." },
      { status: 400 }
    );
  }
  if (texto.length < 60) {
    return NextResponse.json(
      { error: "Tu carta es muy corta — cuéntale un poco más a quien la reciba (mínimo 60 caracteres)." },
      { status: 400 }
    );
  }
  if (texto.length > 4000) {
    return NextResponse.json(
      { error: "La carta es demasiado larga." },
      { status: 400 }
    );
  }
  if (!permiso) {
    return NextResponse.json(
      { error: "Debes aceptar el permiso de publicación." },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("cartas").insert({
    texto,
    firma: firma || null,
    pais: pais || null,
    estado: "pendiente",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
