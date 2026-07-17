import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const CARTAS = [
  { texto: "El silencio de tu casa hoy pesa distinto, pero no estás sola enfrentando ese peso. Cada objeto que falta, cada rincón vacío, también lo sostenemos contigo desde lejos. Vuelve a respirar hondo cuando puedas, y perdónate los días en que no lo logres.", firma: "Renata, una venezolana en Bogotá", pais: "Colombia" },
  { texto: "Hoy no tengo palabras sabias, solo un abrazo que viaja desde México. Sé que perdiste mucho, tal vez todo. No te pido que estés bien, solo que sepas que hay gente pensando en ti, y que Dios te acompañe en los días que faltan por venir.", firma: "Doña Carmen, desde Puebla", pais: "México" },
  { texto: "Se fue la casa, se fueron las cosas, pero no se fue quien fuiste antes de esto. Guarda ese pedazo tuyo, guárdalo como se guarda una semilla en invierno. Un día vas a volver a sembrar.", firma: "Iker, un venezolano en Barcelona", pais: "España" },
  { texto: "Mija, sé que ahora todo se ve gris. Yo también perdí mi casa hace muchos años, en otro país, por otra razón, y aprendí que el duelo no tiene horario. Llora cuando te toque llorar, ten fe cuando puedas, y cuando no puedas, está bien también. Aquí sigo pensando en ti.", firma: "Una abuela que te manda un abrazo", pais: "Colombia" },
  { texto: "Hola! Yo tengo 9 años y quiero decirte que si perdiste tu casa o tus juguetes, a mí también me daría mucha tristeza. Pero espero que encuentres a alguien que te dé un abrazo bien fuerte. Yo te mando uno desde aquí.", firma: "Valeria", pais: "Perú" },
  { texto: "Trabajé varios días ayudando en los rescates y todavía tengo grabadas las caras de la gente que lo perdió todo en segundos. No sé qué decirte que no suene vacío, pero quiero que sepas que no fuiste solo una noticia para nosotros. Que Dios te bendiga y te dé fuerzas para lo que sigue.", firma: "Marco, rescatista voluntario", pais: "Chile" },
  { texto: "No voy a decirte que todo pasa por algo, porque a veces las cosas simplemente pasan y duelen. Lo que sí sé, porque también perdí mi casa en un incendio hace años, es que el vacío se puede habitar poco a poco, sin apurarse. No tienes que reconstruir nada hoy. Solo respirar hoy ya es suficiente.", firma: "Guillermo", pais: "Uruguay" },
  { texto: "Cara mia, escribo desde Italia con el corazón apretado por lo que le pasó a tu gente. No conozco tu dolor de cerca, pero confío en que encontrarás, poco a poco, personas que te ayuden a cargar lo que hoy pesa tanto. Un abrazo grande desde aquí.", firma: "Lucia, Milán", pais: "Italia" },
  { texto: "Enseño a niños hace veinte años y he visto cómo un abrazo a tiempo puede sostener más que mil palabras. Hoy no tengo un abrazo para darte en persona, pero sí estas líneas: eres importante, tu historia no terminó, y mereces que te cuiden como cuidas tú a otros.", firma: "Profesora Ana", pais: "España" },
  { texto: "Trabajo acompañando a personas en duelo y algo que aprendí es que no hay una forma correcta de estar destrozado. Oro por ti y por los tuyos, sin pedirte que estés mejor todavía. Tómate el tiempo que tu cuerpo y tu alma necesiten.", firma: "Camila, psicóloga", pais: "Chile" },
  { texto: "No sé si perdiste una casa, un trabajo, o a alguien que amabas, pero sea lo que sea, mereces tiempo para llorarlo sin que nadie te apure a 'salir adelante'. Ese momento llegará solo, a su ritmo.", firma: "Fernanda", pais: "Argentina" },
  { texto: "Aquí en Costa Rica seguimos las noticias con el corazón encogido. No tengo forma de aliviar tu dolor, solo quiero que sepas que hay ojos, aunque lejanos, que no se despegan de lo que le pasa a tu gente.", firma: "Adrián", pais: "Costa Rica" },
  { texto: "Perder la casa donde creciste no es perder solo un techo, es perder un mapa de recuerdos. Toma tu tiempo para despedirte de ese mapa, y confía en que uno nuevo, distinto, se puede volver a dibujar.", firma: "Ximena", pais: "México" },
  { texto: "Hoy solo te escribo para decirte: existes, importas, y lo que te pasó no te define entero. Un abrazo desde Uruguay para quien lo necesite hoy.", firma: "Rodrigo", pais: "Uruguay" },
  { texto: "Trabajo en un hospital y he visto llegar a personas con historias como la tuya. Lo que más ayuda, según ellas, no son las palabras grandes sino la compañía pequeña: alguien que se queda un rato. Aquí me quedo un rato contigo, aunque sea por carta.", firma: "Enfermera Paola", pais: "Panamá" },
  { texto: "Que Dios te bendiga y te dé fuerzas para los días que vienen. No los que vienen bonitos, sino los que vienen difíciles, que también hay que atravesarlos.", firma: "Doña Rosa", pais: "El Salvador" },
  { texto: "Se me hace un nudo pensar en los niños que hoy duermen en un lugar que no es su cuarto. Ojalá alguien les cante, les abrace, y les recuerde que un cuarto se puede reconstruir, aunque tome tiempo.", firma: "Julieta", pais: "Bolivia" },
  { texto: "No soy poeta ni sé de consuelos, solo soy alguien que vio las noticias y no pudo seguir con su día sin escribirte. Espero que estés vivo, y si lo estás, que sigas estándolo con ganas.", firma: "Tomás", pais: "Paraguay" },
  { texto: "Ánimo no es la palabra correcta para lo que estás viviendo, lo sé. Solo quería decirte que aquí, en Guatemala, hay gente que reza por ustedes en silencio, sin pedir nada a cambio.", firma: "Marisol", pais: "Guatemala" },
  { texto: "El duelo por una casa perdida se parece al duelo por una persona: uno extraña los ruidos, los olores, hasta los defectos. Permítete extrañar todo eso sin apuro.", firma: "Sebastián", pais: "Honduras" },
  { texto: "Desde Portugal te mando una idea simple: que cada mañana que puedas levantarte, aunque sea con esfuerzo, ya es una forma de resistir. No hace falta más que eso por ahora.", firma: "Inês", pais: "Portugal" },
  { texto: "Ten fe, aunque hoy no la sientas del todo. A veces la fe no se siente, solo se sostiene, como quien carga algo pesado sin soltar.", firma: "Georgina", pais: "Nicaragua" },
  { texto: "Quiero que sepas que hubo un momento, viendo las noticias, en que dejé de ver un país lejano y empecé a ver personas con nombre, con historia, con dolor real. Ese dolor ya no me es indiferente.", firma: "Hugo", pais: "Bolivia" },
  { texto: "A los que perdieron una mascota en todo esto: sé que a veces ese dolor se minimiza frente a otros, pero no por eso duele menos. Ese compañero también merece ser llorado.", firma: "Daniela", pais: "Argentina" },
  { texto: "Confío en Dios y en la gente que sigue tendiendo la mano incluso después de que las noticias dejen de hablar de Venezuela. Espero ser parte de esa gente, aunque sea solo con estas palabras.", firma: "Ricardo", pais: "Perú" },
  { texto: "Se cayeron paredes, pero no se cayó la costumbre de abrazarse al final del día. Guarda esa costumbre. Todo lo demás se reconstruye después.", firma: "Nayeli", pais: "México" },
  { texto: "Escribo esto sin saber si te va a llegar, pero prefiero escribir de más a quedarme callada. Espero que dondequiera que estés, tengas un lugar seco, algo caliente para comer, y alguien cerca.", firma: "Carolina", pais: "Chile" },
  { texto: "No tengo una fórmula para el dolor, solo la certeza de que no eres el único despierto a esta hora pensando en lo que perdió. Aquí, en otro huso horario, alguien también está despierto pensando en ti.", firma: "Iván", pais: "España" },
  { texto: "Que la tierra tiemble no significa que tú también tengas que quedarte temblando para siempre. Puedes temblar hoy y mañana intentar sostenerte un poco más. Un pasito, nada más.", firma: "Renée", pais: "Francia" },
  { texto: "Desde Alemania, con torpeza en el idioma pero con el corazón claro: lo siento mucho. Ojalá algún día puedas contarme, si nos cruzamos, cómo lograste seguir adelante.", firma: "Klaus", pais: "Alemania" },
  { texto: "Oro por ti cada noche desde que vi las imágenes del terremoto. No sé tu nombre, pero Dios sí, y eso me basta para seguir orando.", firma: "Marta", pais: "Colombia" },
  { texto: "Hay pérdidas que no tienen nombre en ningún idioma. Si la tuya es una de esas, no te preocupes por explicarla. Aquí no hace falta explicar nada.", firma: "Andrés", pais: "Ecuador" },
  { texto: "Perdí a mi papá hace tres años, no en un terremoto, pero sé lo que es que el mundo siga girando mientras uno se queda parado en el mismo segundo. Ese segundo también pasa, aunque ahora no lo creas.", firma: "Lorena", pais: "Venezuela" },
  { texto: "Solo quiero decirte, sin adornos: siento mucho tu pérdida. No hace falta que te sientas fuerte por mí ni por nadie.", firma: "Pablo", pais: "Argentina" },
  { texto: "Si perdiste a alguien mayor, un abuelo, una abuela, quiero que sepas que sus historias no se perdieron con ellos. Alguien las escuchó, en algún momento, y esas historias siguen caminando en quien las recuerda.", firma: "Gabriela", pais: "República Dominicana" },
  { texto: "Dios te bendiga y te dé paciencia, no la paciencia de aguantar callado, sino la de darte permiso para sentir todo lo que sientas.", firma: "Doña Elvira", pais: "Honduras" },
  { texto: "No sé si crees en algo más grande que nosotros, y está bien si no. Lo que sí sé es que muchas personas, con o sin fe, están pensando en ti hoy.", firma: "Camilo", pais: "Chile" },
  { texto: "Cuando algo se derrumba de golpe, la mente tarda en creerlo. Date ese tiempo de no creerlo todavía, si lo necesitas. No hay apuro.", firma: "Valentina", pais: "Argentina" },
  { texto: "Vi que armaron albergues, que la gente se organizó rápido para ayudarse entre ustedes mismos. Eso también es parte de tu país: la gente que no espera a que otros resuelvan, sino que empieza por su cuenta.", firma: "Emiliano", pais: "Uruguay" },
  { texto: "Espero que si perdiste tu trabajo junto con todo lo demás, encuentres pronto una forma de sostenerte, aunque sea distinta a la que tenías antes.", firma: "Fabiola", pais: "Perú" },
  { texto: "Quiero mandarte algo que no sea una frase bonita: un compromiso. Voy a seguir donando lo que pueda, cuando pueda, aunque las noticias ya no hablen de esto en unas semanas.", firma: "Joaquín", pais: "Chile" },
  { texto: "A veces uno no necesita consuelo sino compañía silenciosa. Si es tu caso, imagina que estoy aquí sentada contigo, sin decir nada, solo acompañando.", firma: "Renata", pais: "Brasil" },
  { texto: "Confío en que Dios ve lo que la gente no alcanza a ver: el esfuerzo diario de seguir de pie aunque nadie lo note.", firma: "Yolanda", pais: "México" },
  { texto: "Si tienes hijos pequeños y no sabes qué decirles sobre lo que pasó, tal vez no hace falta decir mucho. A veces basta con abrazarlos más fuerte y más seguido estos días.", firma: "Marianela", pais: "Costa Rica" },
  { texto: "El terremoto duró segundos, pero el después dura mucho más. Ojalá tengas paciencia contigo mismo para ese después largo.", firma: "Bruno", pais: "Argentina" },
  { texto: "No sé qué se siente perder una casa, pero sé qué se siente empezar de cero en un país nuevo. Ese empezar de cero, aunque duela, también puede tener sus días buenos, con el tiempo.", firma: "Aisha, venezolana en Canadá", pais: "Canadá" },
  { texto: "Ten fe en que las manos que hoy te ayudan a levantar escombros son las mismas que después te van a ayudar a construir de nuevo.", firma: "Ignacio", pais: "Chile" },
  { texto: "Sé breve conmigo si quieres, no hace falta que me cuentes todo. Solo quería que supieras que aquí hay alguien leyendo, con atención, lo que sea que hayas necesitado escribir en tu propia carta.", firma: "Noelia", pais: "España" },
  { texto: "Si perdiste el negocio familiar, sé que no es solo dinero lo que se fue, es historia, esfuerzo de años, quizás de generaciones. Eso también merece ser llorado.", firma: "Rubén", pais: "Guatemala" },
  { texto: "Que la fuerza de tu gente, que ya he visto en videos ayudándose entre ruinas, también viva en ti cuando la necesites.", firma: "Sol", pais: "Argentina" },
  { texto: "No voy a decirte que Dios tiene un plan, porque a veces esa frase pesa más de lo que consuela. Solo te digo que aquí hay alguien deseando de corazón que encuentres paz, la que sea que necesites.", firma: "Camila", pais: "Chile" },
  { texto: "Perdón si mi carta llega tarde o nunca llega. Aun así, la escribí pensando en ti, y eso también cuenta para algo.", firma: "Diego", pais: "Colombia" },
  { texto: "Si tu duelo tiene enojo, no te lo guardes por miedo a parecer ingrato con quienes te ayudan. Se puede agradecer y estar furioso al mismo tiempo.", firma: "Antonella", pais: "Argentina" },
  { texto: "Espero que entre tanto ruido de excavadoras y ayuda humanitaria, también encuentres un rato de silencio para vos mismo, sin nadie preguntando cómo estás.", firma: "Nicolás", pais: "Uruguay" },
  { texto: "Dios te bendiga hoy y en los días que aún no imaginas, esos en los que quizás vuelvas a reír sin sentir culpa por hacerlo.", firma: "Doña Marta", pais: "Nicaragua" },
  { texto: "Escribo desde Australia, muy lejos, casi al otro lado del mundo. Aun así, esta carta llegó a existir porque tu dolor cruzó ese océano hasta mí.", firma: "Sarah", pais: "Australia" },
  { texto: "No sé si tu pérdida fue material o humana, o ambas. Sea cual sea, mereces que alguien te diga: lo siento, de verdad.", firma: "Martina", pais: "Chile" },
  { texto: "Si sobreviviste, no tienes que sentirte culpable por eso. A veces el cuerpo simplemente sobrevive, sin que sea mérito ni culpa de nadie.", firma: "Esteban", pais: "Colombia" },
  { texto: "Confío en que las manos que están reconstruyendo tu ciudad también van, sin saberlo, reconstruyendo algo en ti.", firma: "Paulina", pais: "México" },
  { texto: "Vi un video de un perro esperando entre los escombros a que alguien volviera. No sé si era tuyo, pero lloré por él como si lo conociera. Espero que quien sea que lo esperaba, lo haya encontrado.", firma: "Lucía", pais: "Argentina" },
  { texto: "No hace falta que me contestes esta carta ni ninguna. Solo quería dejar constancia de que alguien, en algún rincón del mundo, pensó en ti hoy.", firma: "Federico", pais: "España" },
  { texto: "El miedo a que vuelva a temblar es válido, aunque el suelo ya esté quieto. Dale tiempo a tu cuerpo para volver a confiar en el piso.", firma: "Rocío", pais: "Perú" },
  { texto: "Ten fe, no en que todo será fácil, sino en que no vas a estar cargando esto completamente solo todo el tiempo.", firma: "Manuel", pais: "Chile" },
  { texto: "Si perdiste a un hermano o hermana, sé que ese lugar en la familia no se llena con nadie más. Solo quiero que sepas que ese vacío también es visto, aunque sea desde lejos.", firma: "Ivonne", pais: "Ecuador" },
  { texto: "Aquí en Francia seguimos con atención lo que pasa allá. No puedo abrazarte de verdad, pero esta carta es lo más parecido que tengo para ofrecerte.", firma: "Camille", pais: "Francia" },
  { texto: "Que Dios te dé paciencia con la burocracia, con los trámites, con todo lo aburrido y agotador que viene después de una tragedia y que nadie te advierte.", firma: "Doña Silvia", pais: "Panamá" },
  { texto: "No sé si crees en la vida después de la muerte, pero si perdiste a alguien, espero que encuentres consuelo en la forma que sea que tú entiendas ese después.", firma: "Bruno", pais: "Italia" },
  { texto: "Espero que si perdiste tu escuela o tu trabajo, encuentres pronto otro lugar donde sentirte útil, aunque sea distinto al de antes.", firma: "Micaela", pais: "Argentina" },
  { texto: "El duelo colectivo, el de todo un país llorando junto, también pesa distinto. Ojalá encuentres en ese llanto compartido algo de compañía.", firma: "Tobías", pais: "Chile" },
  { texto: "No tengo una gran frase, solo la sinceridad de decir que esto que le pasó a tu país me dolió más de lo que esperaba, siendo alguien que nunca ha estado ahí.", firma: "Kevin", pais: "Estados Unidos" },
  { texto: "Confío en Dios y en que las personas que hoy te rodean, aunque sean desconocidas, se convertirán en parte importante de tu historia de recuperación.", firma: "Yesenia", pais: "Honduras" },
  { texto: "Si perdiste objetos que no tenían valor para nadie más que para ti, una carta, una foto vieja, un juguete, ese dolor también es real y también merece espacio.", firma: "Ariadna", pais: "México" },
  { texto: "No hay apuro para 'estar mejor'. Tómate el tiempo que la gente a tu alrededor no siempre entiende que necesitas.", firma: "Rafael", pais: "Colombia" },
  { texto: "Ten fe, no como quien espera un milagro, sino como quien confía que mañana va a tener otra oportunidad de intentarlo de nuevo.", firma: "Doña Fina", pais: "Bolivia" },
  { texto: "Escribo esto una semana después de las noticias, no porque haya dejado de importarme, sino porque a veces uno tarda en encontrar las palabras.", firma: "Santiago", pais: "Argentina" },
  { texto: "Si hoy solo lograste levantarte de la cama, ya hiciste lo suficiente por hoy.", firma: "Valeria", pais: "Chile" },
  { texto: "Dios te bendiga y te sostenga incluso en los días en que no tengas fuerzas para pedirle nada.", firma: "Doña Carmela", pais: "Guatemala" },
  { texto: "No sé cómo se cura un país entero, pero sé que empieza por curar a una persona a la vez. Espero ser, con esta carta, parte de tu curación aunque sea un poquito.", firma: "Emilio", pais: "Perú" },
  { texto: "Quiero que sepas que aunque el mundo siga hablando de otras noticias mañana, aquí seguirá habiendo alguien que no olvidó lo que te pasó.", firma: "Antonia", pais: "Chile" },
  { texto: "Si perdiste tu jardín, tus plantas, algo tan pequeño y tan tuyo, ese duelo también cuenta. No hace falta que sea una tragedia grande para doler.", firma: "Genoveva", pais: "España" },
  { texto: "Confío en que la misma tierra que tembló también va a sostenerte cuando decidas volver a caminar sobre ella.", firma: "Máximo", pais: "Argentina" },
  { texto: "No sé si esta carta te llega en un buen o mal momento, pero espero que sea, sea cuando sea, un pequeño respiro en medio de todo.", firma: "Regina", pais: "México" },
  { texto: "Si perdiste la fe en algo, en la vida, en la suerte, en lo que sea, no te apures a recuperarla. A veces perderla un tiempo también es parte del proceso.", firma: "Facundo", pais: "Uruguay" },
  { texto: "Ten fe en que, aunque hoy no lo veas, hay manos trabajando para que tu ciudad vuelva a tener calles seguras para caminar.", firma: "Doña Petra", pais: "El Salvador" },
  { texto: "Escribo esta carta sabiendo que probablemente nunca sabré si te llegó ni cómo estás. Aun así, prefiero escribirla que quedarme en silencio.", firma: "Gonzalo", pais: "Chile" },
  { texto: "Si tu dolor no cabe en palabras, no te preocupes por encontrar las correctas. A veces el silencio también dice mucho.", firma: "Bianca", pais: "Argentina" },
  { texto: "Que Dios te dé algo de calma en las noches, que suelen ser las horas más difíciles después de perder algo importante.", firma: "Doña Nidia", pais: "Costa Rica" },
  { texto: "No sé si en tu país se dice 'ánimo' o 'fuerza' o simplemente 'aquí estoy', pero sea cual sea la palabra, eso es lo que quiero decirte.", firma: "Cecilia", pais: "Ecuador" },
  { texto: "Confío en que las personas que te rodean hoy, vecinos, desconocidos, voluntarios, se van a quedar en tu memoria como parte de lo bueno que también pasó en medio de todo esto.", firma: "Iván", pais: "Bolivia" },
  { texto: "Si perdiste tu ciudad tal como la conocías, tal vez nunca vuelva a ser exactamente igual, pero eso no significa que no pueda volver a ser un hogar.", firma: "Lourdes", pais: "Panamá" },
  { texto: "Ten fe, no en que el dolor desaparezca rápido, sino en que no va a ser siempre tan pesado como lo es hoy.", firma: "Doña Amparo", pais: "República Dominicana" },
  { texto: "Escribo esto porque me enteré tarde de lo que pasó, y aunque llegue tarde a las noticias, no quiero llegar tarde a decirte que lo siento.", firma: "Matías", pais: "Chile" },
  { texto: "No tengo consejos, solo la certeza de que mereces que alguien, en algún lugar, esté pensando hoy en ti sin pedirte nada a cambio.", firma: "Ariana", pais: "Perú" },
  { texto: "Confío en Dios y en la gente que, aunque no conoce tu nombre, ya está trabajando para que tengas un techo esta noche.", firma: "Herminia", pais: "Nicaragua" },
  { texto: "Si perdiste tu trabajo de toda la vida, sé que reinventarse a cierta edad da miedo. Espero que encuentres, con tiempo, algo nuevo que también te dé sentido.", firma: "Osvaldo", pais: "Argentina" },
  { texto: "No sé si te sirva de algo, pero quiero que sepas que hay una persona en otro continente que aprendió a decir 'Venezuela' con más cuidado desde que supo tu historia.", firma: "Freya", pais: "Países Bajos" },
  { texto: "Que tengas paciencia con las personas que, queriendo ayudar, a veces dicen cosas que no ayudan tanto. Vienen con buena intención aunque no siempre acierten.", firma: "Doña Lucrecia", pais: "Honduras" },
  { texto: "Escribo esto para que sepas que, si un día decides contar tu historia completa, con lo feo y lo difícil incluido, alguien la va a querer escuchar.", firma: "Renzo", pais: "Perú" },
  { texto: "Ten fe, aunque sea la fe pequeña de quien solo cree que mañana amanecerá otra vez.", firma: "Doña Georgina", pais: "El Salvador" },
  { texto: "No sé qué más decir salvo esto: siento mucho lo que perdiste, y espero de corazón que lo que te quede, aunque parezca poco hoy, alcance para seguir.", firma: "Valentino", pais: "Chile" },
];

export async function GET(request) {
  try {
    const params = request.nextUrl.searchParams;
    const token = params.get("token");
    if (!token || token !== process.env.AUTOMATION_TOKEN) {
      return NextResponse.json({ error: "No autorizado." }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();

    const rows = CARTAS.map((c) => ({
      texto: c.texto,
      firma: c.firma,
      pais: c.pais,
      estado: "aprobada",
    }));

    const { data, error } = await supabase
      .from("cartas")
      .insert(rows)
      .select("id, codigo");

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message, code: error.code || null },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, insertadas: data.length, ids: data.map((d) => d.id) });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: String(e && e.message ? e.message : e) },
      { status: 500 }
    );
  }
}
