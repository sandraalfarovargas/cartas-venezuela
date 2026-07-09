import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(request) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token || token !== process.env.AUTOMATION_TOKEN) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const texto =
    "Querida hermana o hermano que lees esto, te abrazo y te sostengo. Te acaricio para limpiarte el rostro y aliviar la tensión que lo aprieta.\nMe gustaría poder estar ahí para ayudarte de manera concreta a limpiar, consolar y volver a empezar.\nQuisiera que hicieras tuya mi fuerza, no te dejes ir. Pienso en ti y te mando un rayo de amor.";

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("cartas")
    .update({ texto, estado: "aprobada" })
    .eq("id", 1974);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
