import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(request) {
  const params = request.nextUrl.searchParams;
  const token = params.get("token");
  if (!token || token !== process.env.AUTOMATION_TOKEN) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("cartas")
    .select("id, email, firma, pais, estado, creada_en")
    .not("email", "is", null)
    .order("id", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ total: data.length, cartas: data });
}
