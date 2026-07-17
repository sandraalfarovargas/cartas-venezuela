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

    const { data: original, error: fetchError } = await supabase
      .from("cartas")
      .select("id, texto, firma, pais, codigo, estado")
      .eq("estado", "aprobada")
      .order("id", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (fetchError) {
      return NextResponse.json({ step: "fetch", error: fetchError.message }, { status: 500 });
    }
    if (!original) {
      return NextResponse.json({ step: "fetch", error: "sin cartas" }, { status: 404 });
    }

    const insertResult = await supabase
      .from("cartas")
      .insert({
        texto: original.texto,
        firma: original.firma,
        pais: original.pais,
        estado: "aprobada",
        codigo: original.codigo,
        vistas: 0,
      })
      .select("id, codigo, estado, vistas");

    return NextResponse.json({
      step: "insert-result",
      hasError: Boolean(insertResult.error),
      errorMessage: insertResult.error ? insertResult.error.message : null,
      errorCode: insertResult.error ? insertResult.error.code : null,
      data: insertResult.data,
    });
  } catch (e) {
    return NextResponse.json(
      { step: "catch", error: String(e && e.message ? e.message : e), stack: String(e && e.stack ? e.stack : "") },
      { status: 500 }
    );
  }
}
