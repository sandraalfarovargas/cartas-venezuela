import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const TRADUCCIONES = {
  1955: {
    texto:
      "Queridas familias,\n\nLes escribo desde Portugal con el corazón lleno de solidaridad. Aunque estemos lejos, el dolor que viven llegó hasta nosotros y nos hizo reflexionar sobre el verdadero valor de la vida, la familia y la esperanza.\n\nImagino el miedo, la tristeza y la incertidumbre que sintieron después del terremoto. Perder una casa, bienes materiales o incluso a personas que amamos es un dolor difícil de explicar. Sin embargo, creo que la fuerza que existe dentro de cada ser humano es mayor que cualquier desastre.\n\nQuiero que sepan que no están solos. Existen miles de personas en diferentes partes del mundo que piensan en ustedes, rezan por ustedes y desean que logren reconstruir sus vidas, paso a paso.\n\nNunca dejen que la esperanza desaparezca. Incluso después de la noche más oscura, el sol siempre vuelve a salir. Cada gesto de ayuda, cada abrazo y cada palabra de cariño representan un nuevo comienzo.\n\nDeseo que encuentren fuerza para continuar, coraje para enfrentar cada desafío y paz para volver a sonreír. Que el futuro les traiga días mejores y que nunca falten personas solidarias a su lado.",
    firma: "Reciban un abrazo lleno de cariño, respeto y esperanza. Con amistad, Marta Fernandes",
  },
  1956: {
    texto:
      "En este momento de dolor y angustia les escribo esta carta para enviarles coraje y apoyo. Son días difíciles, pero el amor es el sentimiento más fuerte del mundo. Aférrense a él, a la fe en días mejores, y confíen en la fuerza que guía sus corazones. No existen creencias equivocadas, solo fe en que después de la tormenta el sol vuelva a brillar.\nMucha fuerza y que el sol ilumine sus caminos.",
    firma: null,
  },
};

export async function GET(request) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token || token !== process.env.AUTOMATION_TOKEN) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");
  const item = TRADUCCIONES[id];
  if (!item) {
    return NextResponse.json({ error: "Id no encontrado." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("cartas")
    .update({ texto: item.texto, firma: item.firma, estado: "aprobada" })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id });
}
