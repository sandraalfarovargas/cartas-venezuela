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

    const { count: conEmail, error: e1 } = await supabase
      .from("cartas")
      .select("id", { count: "exact", head: true })
      .eq("estado", "aprobada")
      .not("email", "is", null);

    if (e1) return NextResponse.json({ error: e1.message }, { status: 500 });

    const { count: totalAprobadas, error: e2 } = await supabase
      .from("cartas")
      .select("id", { count: "exact", head: true })
      .eq("estado", "aprobada");

    if (e2) return NextResponse.json({ error: e2.message }, { status: 500 });

    const { data: ejemplos, error: e3 } = await supabase
      .from("cartas")
      .select("id, email")
      .eq("estado", "aprobada")
      .not("email", "is", null)
      .order("id", { ascending: true });

    if (e3) return NextResponse.json({ error: e3.message }, { status: 500 });

    return NextResponse.json({ conEmail, totalAprobadas, ejemplos });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e && e.message ? e.message : e) }, { status: 500 });
  }
}
