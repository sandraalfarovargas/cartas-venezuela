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
      return NextResponse.json({ step: "fetch", error: "No hay cartas aprobadas." }, { status: 404 });
    }

    const { data: inserted, error: insertError } = await supabase
      .from("cartas")
      .insert({
        texto: original.texto,
        firma: original.firma,
        pais: original.pais,
        estado: "aprobada",
        codigo: original.codigo,
        vistas: 0,
      })
      .select("id, codigo, estado, vistas")
      .single();

    if (insertError) {
      return NextResponse.json(
        {
          step: "insert",
          original,
          error: insertError.message || "sin mensaje",
          code: insertError.code || null,
          hint: insertError.hint || null,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, original, inserted });
  } catch (e) {
    return NextResponse.json(
      { step: "catch", error: String(e && e.message ? e.message : e) },
      { status: 500 }
    );
  }
}
