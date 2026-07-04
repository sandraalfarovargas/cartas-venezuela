import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

// Endpoint temporal: cuenta total de cartas por estado, sin importar cuál sea.
export async function GET(request) {
  const params = request.nextUrl.searchParams;
  const token = params.get("token");
  if (!token || token !== process.env.AUTOMATION_TOKEN) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  const { count: totalGeneral, error: e1 } = await supabase
    .from("cartas")
    .select("*", { count: "exact", head: true });

  const { count: aprobadas, error: e2 } = await supabase
    .from("cartas")
    .select("*", { count: "exact", head: true })
    .eq("estado", "aprobada");

  const { count: pendientes, error: e3 } = await supabase
    .from("cartas")
    .select("*", { count: "exact", head: true })
    .eq("estado", "pendiente");

  const { count: rechazadas, error: e4 } = await supabase
    .from("cartas")
    .select("*", { count: "exact", head: true })
    .eq("estado", "rechazada");

  if (e1 || e2 || e3 || e4) {
    return NextResponse.json(
      { error: (e1 || e2 || e3 || e4).message },
      { status: 500 }
    );
  }

  return NextResponse.json({ totalGeneral, aprobadas, pendientes, rechazadas });
}
