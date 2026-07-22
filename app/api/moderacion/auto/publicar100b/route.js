import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const CARTAS = [
  { texto: "No sé tu nombre, pero sé que hoy es un día difícil. Quiero que sepas que aunque el suelo tembló, hay algo que no se movió: la gente que te quiere y que sigue aquí. Un paso, uno solo, es suficiente por hoy. Mañana damos el siguiente.", firma: "Renata", pais: "Colombia" },
  { texto: "Perder una casa duele. Perder a alguien duele más. No hay palabras que arreglen eso, y no voy a intentarlo. Solo quiero decirte que no estás solo en ese dolor, aunque a veces se sienta así. Aquí hay alguien pensando en ti, aunque no nos conozcamos.", firma: "Iván, un venezolano en Toronto", pais: "Canadá" },
  { texto: "A quien lea esto: eres más fuerte de lo que crees, aunque hoy no lo sientas así. El cansancio de sobrevivir también cuenta. Descansa sin culpa. Venezuela te necesita entero, no perfecto.", firma: "Una amiga desde Lima", pais: "Perú" },
  { texto: "Escribo esto sin saber quién lo va a leer, pero espero que sea alguien que hoy necesite un abrazo de lejos. Aquí va uno, fuerte y sincero. No estás solo.", firma: "J.M.", pais: "España" },
  { texto: "Sé que todavía hay días en los que cuesta hasta respirar. Está bien. No hay un plazo para sanar, ni una forma correcta de hacerlo. Solo sigue, a tu ritmo, con quienes te acompañan.", firma: "Valentina, venezolana en Argentina", pais: "Argentina" },
  { texto: "Hoy quiero recordarte algo simple: sigues aquí. Y eso ya es una forma de valentía. Lo que se cayó se puede levantar de nuevo, aunque tome tiempo.", firma: "Camila", pais: "México" },
  { texto: "No tengo una solución para tu dolor, pero tengo un abrazo guardado para cuando puedas recibirlo. Mientras tanto, aquí estoy, pensando en ti y en toda la gente que hoy la está pasando mal en Venezuela.", firma: "Desde Chile, con cariño", pais: "Chile" },
  { texto: "A los niños que hoy tienen miedo: va a estar bien. A los adultos que hoy no pueden ser fuertes: también va a estar bien no serlo. Todos merecen un descanso.", firma: "Una maestra venezolana en Perú", pais: "Perú" },
  { texto: "Escribo esta carta para alguien que quizás lo perdió todo menos las ganas de seguir. Eso ya es muchísimo. Aférrate a eso, y a la gente que te rodea. No caminas sola esta parte.", firma: "Andrea", pais: "Venezuela" },
  { texto: "No sé qué se siente sentir temblar la tierra bajo tus pies, pero sé lo que se siente querer a un país desde lejos y no poder hacer nada más que escribir. Así que aquí va: fuerza, Venezuela. Fuerza a cada uno de ustedes.", firma: "Un venezolano en Miami", pais: "Estados Unidos" },

  { texto: "Hay días que se sostienen solo con la costumbre de seguir respirando. Si hoy es uno de esos días, está bien. Nadie te está pidiendo más que eso.", firma: "Marisela", pais: "Venezuela" },
  { texto: "Quiero decirte algo que quizás nadie te ha dicho hoy: lo estás haciendo bien. Seguir de pie después de esto ya es un logro enorme, aunque no lo sientas así.", firma: "Gabriel, desde Barcelona", pais: "España" },
  { texto: "El miedo que sentiste ese día no se va de un momento a otro, y eso no te hace débil. Te hace humano. Date el tiempo que necesites.", firma: "Rosa", pais: "Ecuador" },
  { texto: "A veces ayudar es solo estar. No tengo consejos mágicos, solo la certeza de que hay más gente de la que imaginas pensando en ustedes desde lejos.", firma: "Pedro, un colombiano solidario", pais: "Colombia" },
  { texto: "Sé que hay noches en las que el silencio pesa más que el ruido del día. Si esta es una de esas noches, aquí va un abrazo que cruza el océano hasta ti.", firma: "Luciana", pais: "Uruguay" },
  { texto: "No voy a decirte que todo pasa por algo, porque no lo creo. Solo sé que lo que se rompe también se puede volver a construir, con paciencia y con ayuda.", firma: "Tomás", pais: "Chile" },
  { texto: "Si perdiste tu casa, no perdiste tu historia. Esa sigue siendo tuya, y nadie te la puede quitar. Desde aquí te acompaño mientras reconstruyes lo demás.", firma: "Daniela, venezolana en Madrid", pais: "España" },
  { texto: "Quisiera tener las palabras exactas para aliviar lo que sientes, pero no existen. Lo que sí tengo es la intención sincera de que sepas que no estás solo.", firma: "Mateo", pais: "Panamá" },
  { texto: "Hay una fuerza que se activa solo cuando todo lo demás falla. Confío en que la tienes, aunque hoy se sienta lejana. Ve despacio, sin apurarte a sanar.", firma: "Carolina", pais: "Costa Rica" },
  { texto: "Escribo desde un lugar donde no tembló la tierra, pero sí tembló el corazón al ver las noticias. Cuenten conmigo, aunque sea solo con estas palabras.", firma: "Felipe", pais: "Brasil" },

  { texto: "A quien esté leyendo esto en un momento difícil: respira. No tienes que resolverlo todo hoy. Un día a la vez, y esta noche, uno de esos días ya pasó.", firma: "Ismelda", pais: "Venezuela" },
  { texto: "Sé que hay pérdidas que no se explican con palabras. Solo quiero que sepas que este mensaje llegó hasta ti porque alguien, en algún lugar del mundo, se detuvo a pensar en tu dolor.", firma: "Alonso, desde República Dominicana", pais: "República Dominicana" },
  { texto: "El terremoto se llevó cosas que no se recuperan, pero no se llevó la capacidad de las personas de cuidarse entre sí. Aquí estamos, cuidándonos desde la distancia.", firma: "Verónica", pais: "Guatemala" },
  { texto: "No sé si esta carta te va a encontrar en un buen o mal momento, pero espero que en cualquiera de los dos sientas que alguien, sin conocerte, te desea lo mejor.", firma: "Sebastián", pais: "Honduras" },
  { texto: "Cuando todo se siente incierto, aferrarse a las pequeñas cosas ayuda: un café caliente, una llamada, un abrazo. Ojalá hoy tengas al menos una de esas cosas.", firma: "Ana Lucía", pais: "El Salvador" },
  { texto: "Le escribo a alguien que no conozco, pero que sé que hoy necesita leer que va a estar bien, aunque el camino sea largo. Aquí va esa certeza, prestada desde lejos.", firma: "Rodrigo", pais: "Nicaragua" },
  { texto: "No hace falta que finjas estar bien para que esta carta te sirva. Puedes estar mal y aun así merecer este abrazo. Aquí te lo mando, completo.", firma: "Ximena", pais: "Bolivia" },
  { texto: "Venezuela ha aprendido, a la fuerza, a levantarse muchas veces. Esta no será la excepción, aunque hoy el peso parezca enorme. Cuenta con quienes seguimos pendientes.", firma: "Emilio", pais: "Paraguay" },
  { texto: "Quiero que sepas que aunque estemos lejos, no estamos indiferentes. Cada noticia del terremoto se sintió también aquí, en el pecho.", firma: "Beatriz", pais: "Francia" },
  { texto: "A veces lo único que se puede hacer desde la distancia es escribir. Así que aquí está mi intento: que sepas que te acompaño, aunque sea con palabras nada más.", firma: "Nicolás", pais: "Italia" },

  { texto: "El dolor de perder un hogar no se mide en metros cuadrados, sino en recuerdos. Ojalá puedas conservar esos, aunque las paredes ya no estén.", firma: "Fernanda", pais: "Alemania" },
  { texto: "Hoy quiero decirte que está bien llorar frente a otros. La fortaleza no siempre se ve en la cara seria, a veces se ve en la lágrima que por fin sale.", firma: "Diego", pais: "Portugal" },
  { texto: "No sé si algún día leas esto, pero si lo haces: gracias por seguir aquí. Eso, en un momento como este, ya es un acto de resistencia.", firma: "Julia", pais: "Reino Unido" },
  { texto: "Escribo desde lejos, sin poder abrazarte de verdad, pero con la certeza de que estas palabras cruzarán la distancia hasta encontrarte en un buen momento.", firma: "Martín", pais: "Suiza" },
  { texto: "Quisiera poder devolverte lo que perdiste, pero solo puedo ofrecerte esto: la certeza de que a alguien, en algún lugar, le importa cómo estás hoy.", firma: "Paola", pais: "Países Bajos" },
  { texto: "Cuando la tierra tiembla, uno aprende rápido qué es lo que de verdad importa. Espero que puedas sostenerte en eso mientras se reconstruye lo demás.", firma: "Óscar", pais: "Bélgica" },
  { texto: "No sé cómo se sostiene un país después de algo así, pero sé que se sostiene con gente como tú, que sigue levantándose cada mañana.", firma: "Carla", pais: "Australia" },
  { texto: "Si hoy sientes que no puedes más, permítete no poder por un rato. Mañana puedes intentar de nuevo. Nadie te está cronometrando.", firma: "Adrián", pais: "Suecia" },
  { texto: "Escribí esta carta pensando en alguien que quizás no conozco, pero a quien igual le deseo, de corazón, un poco de paz en medio de todo esto.", firma: "Lorena", pais: "Irlanda" },
  { texto: "Venezuela está en el pensamiento de mucha gente que no conoce ni un rincón de ella, pero que igual siente el dolor de lo que pasó. Cuenten con eso.", firma: "Ricardo", pais: "Estados Unidos" },

  { texto: "No hace falta que entiendas todo lo que sientes ahora mismo. Solo permite que pase por ti, sin apurarlo ni esconderlo.", firma: "Manuela", pais: "Venezuela" },
  { texto: "Sé que hay quienes buscan todavía a sus seres queridos, y no hay palabras para eso. Solo quiero que sepan que su búsqueda también la acompañamos desde lejos, con el alma.", firma: "Álvaro", pais: "Colombia" },
  { texto: "Este mensaje es corto porque a veces lo mejor que se puede decir es poco: te queremos bien, Venezuela. Y seguimos aquí.", firma: "Silvana", pais: "Perú" },
  { texto: "Hay una parte de mí que también se quebró al ver las noticias del terremoto, aunque esté lejos. No es lo mismo, lo sé, pero quería que supieras que se sintió hasta aquí.", firma: "Enzo", pais: "Argentina" },
  { texto: "Escribo esto para alguien que quizás hoy no tiene ganas de leer nada. Está bien. Cuando quieras, esta carta va a seguir aquí, esperando.", firma: "Ingrid", pais: "México" },
  { texto: "No sé si el tiempo cura todo, pero sí sé que acompaña. Y en eso, aunque sea de lejos, quiero ser parte de tu proceso.", firma: "Bruno", pais: "Chile" },
  { texto: "A quien perdió su hogar: una casa se reconstruye con paredes nuevas, pero el hogar se reconstruye con la gente que se queda. Espero que tengas mucha de esa gente cerca.", firma: "Claudia", pais: "Ecuador" },
  { texto: "No tengo una fórmula para el consuelo, solo la intención honesta de que sepas que hay más manos tendidas de las que puedes ver ahora mismo.", firma: "Hernán", pais: "Panamá" },
  { texto: "Espero que quien lea esto tenga, aunque sea por un momento hoy, la sensación de estar acompañado y no solo. Esa es toda la intención de esta carta.", firma: "Miriam", pais: "Costa Rica" },
  { texto: "El terremoto pasó, pero la gente sigue. Y mientras la gente siga, Venezuela sigue. Fuerza, de verdad.", firma: "Tobías", pais: "Brasil" },

  { texto: "Quiero que sepas que no hace falta ser valiente todo el tiempo. También se puede ser valiente pidiendo ayuda cuando ya no se puede solo.", firma: "Norma", pais: "Venezuela" },
  { texto: "Si hoy no tienes fuerzas para nada más que respirar, ya es suficiente. Mañana el cuerpo y el alma encontrarán algo más que hacer.", firma: "Esteban", pais: "República Dominicana" },
  { texto: "Sé que la palabra 'reconstruir' pesa mucho cuando apenas se puede con el día. Ve poco a poco. Nadie espera que lo hagas todo de una vez.", firma: "Fabiola", pais: "Guatemala" },
  { texto: "Este mensaje viaja desde muy lejos, pero llega con la misma intención de siempre: que sepas que te acompañamos, aunque no podamos estar ahí físicamente.", firma: "Gonzalo", pais: "Honduras" },
  { texto: "A veces el consuelo más honesto es admitir que no hay consuelo suficiente para lo que se perdió. Aun así, aquí estamos, sin soluciones, pero con cariño.", firma: "Teresa", pais: "El Salvador" },
  { texto: "Ojalá encuentres, entre tanto desorden, algún momento de calma hoy. Aunque sea breve. Aunque sea pequeño. Cuenta.", firma: "Ariel", pais: "Nicaragua" },
  { texto: "No sé cómo se sostiene el ánimo después de perderlo todo, pero confío en que la gente que te rodea te está ayudando a sostenerlo. Y si no, aquí, desde lejos, sumo un poco también.", firma: "Delia", pais: "Bolivia" },
  { texto: "Quiero mandarte algo simple: un abrazo que no puedo dar en persona, pero que es tan real como cualquier otro.", firma: "Ignacio", pais: "Paraguay" },
  { texto: "Es válido sentir rabia, tristeza, cansancio, todo junto y a la vez. No hay una manera correcta de vivir esto. Solo la tuya, y esa está bien.", firma: "Camelia", pais: "Uruguay" },
  { texto: "Este es un mensaje corto para alguien que quizás necesita solo eso: algo corto y sincero que le recuerde que no está solo hoy.", firma: "Julián", pais: "España" },

  { texto: "Sé que a veces el mundo sigue girando afuera mientras adentro todo se detuvo. Tómate el tiempo que necesites para volver a moverte.", firma: "Adriana", pais: "Venezuela" },
  { texto: "No sé qué palabra usar que no suene vacía frente a lo que están viviendo. Así que solo diré esto: los pienso, de verdad.", firma: "Rafael", pais: "Colombia" },
  { texto: "Espero que en medio del caos hayas encontrado, aunque sea una vez, una mano que te ayudó a levantarte. Si no, aquí va la mía, aunque sea solo en palabras.", firma: "Lourdes", pais: "Perú" },
  { texto: "El terremoto movió la tierra, pero no movió la solidaridad de la gente. Esa sigue firme, y sigue llegando desde muchos lugares del mundo hacia ustedes.", firma: "Máximo", pais: "Argentina" },
  { texto: "Quiero que sepas que aunque no pueda arreglar nada de lo que pasó, sí puedo acompañarte en pensamiento mientras lo procesas.", firma: "Sofia", pais: "México" },
  { texto: "No hay una manera de prepararse para algo así. Lo que sí existe es la gente que se queda después, para ayudar a levantar lo que se pueda. Espero que tengas de esa gente cerca.", firma: "Leonardo", pais: "Chile" },
  { texto: "A quien haya perdido a alguien en el terremoto: lo siento profundamente. No hay palabras para esa pérdida, solo el deseo sincero de que encuentres paz poco a poco.", firma: "Marcela", pais: "Ecuador" },
  { texto: "Quiero mandarte fuerza, aunque sé que a veces esa palabra se siente vacía. La mando de todas formas, con toda la intención posible.", firma: "Joaquín", pais: "Panamá" },
  { texto: "Espero que quien lea esto tenga cerca a alguien que le prepare una comida caliente hoy. A veces el cuidado empieza por ahí.", firma: "Ivonne", pais: "Costa Rica" },
  { texto: "No sé si esta carta llegará a tiempo o tarde, pero llega con la misma intención: decirte que no estás solo, aunque el silencio a veces lo parezca.", firma: "Salvador", pais: "Brasil" },

  { texto: "Escribo esto pensando en las personas que hoy tienen que ser fuertes por otros, aunque por dentro estén rotas. Ustedes también merecen que las cuiden.", firma: "Ximena", pais: "Venezuela" },
  { texto: "El terremoto se llevó estructuras, pero no se llevó la memoria de lo vivido junto a quienes ya no están. Esa memoria sigue siendo de ustedes.", firma: "Andrés", pais: "República Dominicana" },
  { texto: "Espero que en algún momento del día de hoy sientas, aunque sea un segundo, algo parecido a la calma. Se lo merecen, todos.", firma: "Patricia", pais: "Guatemala" },
  { texto: "No tengo una respuesta a por qué pasan estas cosas, solo tengo la certeza de que después de esto, sigue habiendo gente dispuesta a ayudar a reconstruir.", firma: "Tomás", pais: "Honduras" },
  { texto: "Quiero que sepas que aunque estés lejos de mí y yo de ti, esta carta viaja con toda la intención de llegar a tu corazón en un buen momento.", firma: "Marisol", pais: "El Salvador" },
  { texto: "A quien esté cansado de ser fuerte: puedes soltar un poco hoy. El mundo no se va a caer más de lo que ya se cayó por eso.", firma: "Cristóbal", pais: "Nicaragua" },
  { texto: "Escribo desde un país donde no tembló la tierra, pero donde sí se sintió la noticia. Cuenten con nuestro cariño, aunque sea desde lejos.", firma: "Genoveva", pais: "Bolivia" },
  { texto: "Espero que puedas encontrar en tu gente lo que necesitas hoy: un abrazo, un silencio compartido, o solo compañía sin palabras.", firma: "Emiliano", pais: "Paraguay" },
  { texto: "No hay un manual para esto. Solo se puede ir, poco a poco, buscando maneras de seguir. Espero que encuentres las tuyas.", firma: "Alejandra", pais: "Uruguay" },
  { texto: "Quiero decirte que aunque no puedo cambiar lo que pasó, sí puedo sumar mi cariño a todo el que ya te están dando desde cerca y desde lejos.", firma: "Benjamín", pais: "España" },

  { texto: "Escribo esto para alguien que quizás está reconstruyendo su casa con las manos y su ánimo con lo que puede. Ambas cosas cuentan, y ambas merecen tiempo.", firma: "Yolanda", pais: "Venezuela" },
  { texto: "A veces todo lo que se puede hacer es acompañar en silencio. Así que aquí estoy, en silencio, pero presente.", firma: "Cristian", pais: "Colombia" },
  { texto: "Ojalá esta carta te encuentre en un momento en el que puedas sentir, aunque sea un poco, que las cosas van a mejorar.", firma: "Estefanía", pais: "Perú" },
  { texto: "No sé qué se necesita para reconstruir un país, pero sé que empieza por la gente que decide quedarse y ayudar. Gracias a todos los que lo están haciendo.", firma: "Maximiliano", pais: "Argentina" },
  { texto: "Quiero que sepas que aunque nunca nos conozcamos, hoy pensé en ti al escribir esto, deseando que estés bien o que al menos estés acompañado.", firma: "Renata", pais: "México" },

  { texto: "A quien todavía no encuentra las palabras para contar lo que vivió: no hace falta que las encuentres hoy. El silencio también cuenta como forma de procesar.", firma: "Wilfredo", pais: "Venezuela" },
  { texto: "Espero que entre tanto ruido de escombros y noticias, puedas encontrar un rincón de calma, aunque sea pequeño, para descansar la mente un rato.", firma: "Natalia", pais: "Colombia" },
  { texto: "El terremoto duró segundos, pero sus efectos se sienten en semanas y meses. Está bien que el proceso tome su tiempo, sin prisa por 'ya estar bien'.", firma: "Cristopher", pais: "Perú" },
  { texto: "Quiero mandarte un mensaje simple hoy: sigue firme, aunque sea apoyado en otros. Nadie tiene que sostenerse solo todo el tiempo.", firma: "Milagros", pais: "Argentina" },
  { texto: "A veces solo hace falta que alguien diga 'te veo, y veo lo difícil que ha sido esto para ti'. Así que aquí está: te veo.", firma: "Leonel", pais: "México" },
  { texto: "Ojalá el cariño que te mando desde lejos llegue con la misma fuerza con la que lo escribo. No puedo estar ahí, pero puedo pensar en ti con todo el corazón.", firma: "Antonella", pais: "Chile" },
  { texto: "Sé que reconstruir toma tiempo, ladrillo a ladrillo, día a día. Espero que tengas la paciencia y la compañía necesarias para ese proceso.", firma: "Gustavo", pais: "Ecuador" },
  { texto: "A quien haya perdido su trabajo o su forma de sostenerse tras el terremoto: eso también es una pérdida grande, y merece ser reconocida como tal.", firma: "Perla", pais: "Panamá" },
  { texto: "Espero que en medio de la reconstrucción también encuentres pequeños momentos de alegría. Se pueden sostener las dos cosas a la vez: el dolor y la alegría breve.", firma: "Aurelio", pais: "Costa Rica" },
  { texto: "No sé si esta carta cambiará algo, pero al menos quiero que sepas que hubo alguien, en un día cualquiera, que se detuvo a desearte lo mejor.", firma: "Constanza", pais: "Brasil" },
  { texto: "A quienes ayudan a otros mientras cargan su propio dolor: gracias. Ese tipo de fortaleza silenciosa también merece ser vista y agradecida.", firma: "Baltazar", pais: "Venezuela" },
  { texto: "Espero que puedas, aunque sea hoy, soltar por un momento la carga de tener que estar bien para los demás y simplemente estar como estás.", firma: "Fiorella", pais: "República Dominicana" },
  { texto: "El país se sostiene de a poco, con la gente que decide no rendirse. Gracias por ser parte de eso, aunque algunos días sea muy difícil serlo.", firma: "Ezequiel", pais: "Guatemala" },
  { texto: "Quiero que sepas que aunque las noticias dejen de hablar del terremoto en algún momento, aquí seguiremos pensando en ustedes.", firma: "Micaela", pais: "Honduras" },
];

export async function GET(request) {
  const params = request.nextUrl.searchParams;
  const token = params.get("token");
  if (!token || token !== process.env.AUTOMATION_TOKEN) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  const rows = CARTAS.map((c) => ({
    texto: c.texto,
    firma: c.firma || null,
    pais: c.pais || null,
    estado: "aprobada",
  }));

  const { data, error } = await supabase.from("cartas").insert(rows).select("id");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ insertadas: data.length, ids: data.map((d) => d.id) });
}
