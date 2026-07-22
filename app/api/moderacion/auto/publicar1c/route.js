import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const CARTA = {
  texto: "Quiero que sepas que esta carta es la número cien de un grupo que escribimos pensando en cada persona distinta que la fuera a leer. A ti que llegaste hasta esta: que la vida vuelva a sentirse tuya, poco a poco, y que nunca te falte compañía en el camino.",
  firma: "Sandra",
  pais: "Venezuela",
};

export async function GET(request) {
  const params = request.nextUrl.searchParams;
  const token = params.get("token");
  if (!token || token !== process.env.AUTOMATION_TOKEN) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("cartas")
    .insert({ ...CARTA, estado: "aprobada" })
    .select("id");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ insertada: data[0].id });
}
