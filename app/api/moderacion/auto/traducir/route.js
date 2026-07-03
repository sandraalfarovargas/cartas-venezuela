import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

// Traducciones al español de cartas que llegaron en otro idioma.
// Endpoint temporal de un solo uso, protegido por el mismo token de automatización.
const TRADUCCIONES = {
  343: "No soy venezolana, pero todo el país está en mi corazón y en mis oraciones cada día ❤️ Lamento muchísimo la pérdida y el sufrimiento que tantos están viviendo. Que Venezuela renazca de las cenizas más fuerte que nunca ❤️",
  497: "El mundo lloró por ti. Yo lloré por ti. El dolor ahora puede parecer lo único real, pero créeme, hay tiempo para todo, y cuando menos lo esperes, todo se reconstruirá. Sigo pensando en ti con el corazón apretado por no estar ahí haciendo más. Vive tu duelo, pero no dejes de creer en el milagro de la vida: fuiste elegido para seguir adelante, así que tómate el tiempo que necesites, pero vuelve a vivir. Siente mi abrazo desde Brasil.",
  504: "Hola, saludos a los hermanos venezolanos en este momento tan difícil. Quiero que sepan que mi corazón y mis pensamientos están con ustedes. Aunque estemos a kilómetros de distancia, los sentimientos que sentimos nos alimentan y nos acercan. Sé el dolor que están sintiendo, sé que es un dolor enorme, que parece que nada tiene sentido, pero siéntanse amados, protegidos por buenas energías y amor. Les envío amor y solidaridad. Dios está contigo. ¡Todo saldrá bien!",
  645: "No soy bueno con las palabras, pero no puedo dejar de decir cuánto espero que todo esto pase y que todo se recupere. Esto va a pasar y vas a superarlo, eres fuerte, llevas en la sangre la valentía y el coraje, todo va a salir bien. La tormenta llegó, pero va a pasar.",
  797: "Quiero decirte que no estás solo en este momento tan doloroso. Quiero que pienses que es una etapa mala, y que va a pasar, sí... va a pasar. Sigo por redes sociales este momento tan difícil de sus vidas. Qué pueblo tan noble, tan solidario y sensible, tan golpeado pero que sigue luchando. No pierdan la esperanza. Cuánto dolor siento por ustedes. Todo va a estar bien. Dios los bendiga.",
  833: "Visité Venezuela por primera vez hace 4 semanas. Estuve en La Guaira, probé las arepas, fui a la playa, fui al Fortín y conocí a mucha gente ahí. Me sentí muy bienvenido como gringo y viví una de mis mejores experiencias. Amo Venezuela, amo La Guaira, y siento mucho no poder hacer más para ayudarlos. Se merecen mucho más y espero que las cosas mejoren pronto para ustedes. <3",
  1098: "Para ti, para todas y todos, porque somos hijas e hijos de esta tierra. Yo podría ser tú. Tú podrías ser yo. Somos parte de la humanidad. Estamos aquí para ayudar. Siempre puedes permitirte pedir ayuda. Vas a descubrir hermanas y hermanos de corazón. Otro día, tú ayudarás a otros. Te deseo todo el cariño y la protección del universo.",
  1209: "Soy mujer, soy hija y soy madre, lloro por todo lo que pasó y sigue pasando en Venezuela. Quiero decirte a ti que lees esto: mucho coraje, que ese coraje te ayude a ganar la fuerza para seguir adelante con tu vida, y que ayude también a quienes están contigo. Que vivas con coraje por todos los que se fueron, por todos los que están sufriendo. Que encuentres el coraje y la fuerza para recomenzar siempre. Besitos, de quien te escribe desde Portugal.",
  1306: "Quiero decirles que están en mis oraciones diarias, siento mucho todo el sufrimiento y a quienes ya no están, pero deseo de corazón que no pierdan la fe ni la esperanza. Gracias también a los voluntarios y profesionales que están trabajando sin descanso en los rescates. Que Dios los bendiga. Un fuerte abrazo,",
};

export async function GET(request) {
  const params = request.nextUrl.searchParams;
  const token = params.get("token");
  if (!token || token !== process.env.AUTOMATION_TOKEN) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const id = params.get("id");
  const texto = TRADUCCIONES[id];
  if (!id || !texto) {
    return NextResponse.json({ error: "id sin traducción disponible." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("cartas")
    .update({ texto, estado: "aprobada" })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id, texto });
}
