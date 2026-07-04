import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

// Ruta temporal: cuenta cuantas cartas ya tienen codigo asignado. Se borra despues.
export async function GET(request) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token || token !== process.env.AUTOMATION_TOKEN) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  const { count: conCodigo, error: e1 } = await supabase
    .from("cartas")
    .select("id", { count: "exact", head: true })
    .not("codigo", "is", null);

  const { count: total, error: e2 } = await supabase
    .from("cartas")
    .select("id", { count: "exact", head: true });

  if (e1 || e2) {
    return NextResponse.json({ error: (e1 || e2).message }, { status: 500 });
  }

  return NextResponse.json({ conCodigo, total });
}
