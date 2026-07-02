import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(request) {
  const params = request.nextUrl.searchParams;
  const token = params.get("token");
  if (!token || token !== process.env.AUTOMATION_TOKEN) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const limit = Math.min(Math.max(parseInt(params.get("limit") || "10", 10) || 10, 1), 50);
  const offset = Math.max(parseInt(params.get("offset") || "0", 10) || 0, 0);

  const supabase = getSupabaseAdmin();

  const { count, error: countError } = await supabase
    .from("cartas")
    .select("id", { count: "exact", head: true })
    .eq("estado", "aprobada");

  if (countError) {
    return NextResponse.json({ error: countError.message }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("cartas")
    .select("id, texto, firma, pais, creada_en")
    .eq("estado", "aprobada")
    .order("id", { ascending: true })
    .range(offset, offset + limit - 1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    total: count ?? 0,
    limit,
    offset,
    cartas: data,
  });
}
