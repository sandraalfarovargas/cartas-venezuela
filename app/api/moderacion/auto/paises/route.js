import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(request) {
  const params = request.nextUrl.searchParams;
  const token = params.get("token");
  if (!token || token !== process.env.AUTOMATION_TOKEN) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  const pageSize = 1000;
  let allRows = [];
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from("cartas")
      .select("pais, estado")
      .range(from, from + pageSize - 1);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    allRows = allRows.concat(data);
    if (data.length < pageSize) break;
    from += pageSize;
  }

  const conteo = {};
  const conteoAprobadas = {};
  for (const row of allRows) {
    const p = (row.pais || "").trim();
    if (!p) continue;
    conteo[p] = (conteo[p] || 0) + 1;
    if (row.estado === "aprobada") {
      conteoAprobadas[p] = (conteoAprobadas[p] || 0) + 1;
    }
  }

  return NextResponse.json({
    totalCartas: allRows.length,
    totalConPais: Object.values(conteo).reduce((a, b) => a + b, 0),
    paisesTodas: conteo,
    paisesAprobadas: conteoAprobadas,
  });
}
