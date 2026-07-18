import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(request) {
  try {
    const params = request.nextUrl.searchParams;
    const token = params.get("token");
    if (!token || token !== process.env.AUTOMATION_TOKEN) {
      return NextResponse.json({ error: "No autorizado." }, { status: 401 });
    }
    const ids = (params.get("ids") || "")
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !Number.isNaN(n));

    if (!ids.length) {
      return NextResponse.json({ error: "Falta ids." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("cartas")
      .select("id, estado, creada_en")
      .in("id", ids)
      .order("id", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, cartas: data });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e && e.message ? e.message : e) }, { status: 500 });
  }
}
