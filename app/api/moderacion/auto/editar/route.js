import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

// Endpoint temporal de un solo uso: quita datos de contacto de un lote de
// cartas (y traduce/ajusta un par de ellas), protegido por el mismo token.
const CAMBIOS = {
  296: {
    texto:
      "Desde que ocurrió este suceso tan impredecible y terrible, mi corazón no ha dejado de pensar en ti.\nSe que la vida te duele, que ahora no ves el horizonte, no hay palabras para mitigar tú dolor pero que sepas que aquí en el universo hay alguien que piensa en ti, que ora por ti, que aunque no comparta tu nacionalidad me siento tú hermana, tú amiga, tu familia, te admiro porque si estás leyendo esto es porque has luchado con uñas y dientes por sobrevivir, y también porque talvez tú misión en este mundo apenas comienza, has vuelto a nacer, con mucho dolor si pero estás aquí, has que continuar viv@ valga la pena, que cada lágrima de tu pueblo valga la pena, que la lucha que hace años emprendieron valga la pena. Estás tú, Sigue latiendo tú corazón y eso significa algo, vive por ti y por quienes no lo lograron vive por todos. Te quiero no se tú nombre pero te quiero.",
    firma: "Andrea Sofía",
    estado: "aprobada",
  },
  534: {
    texto:
      "Hola, mi nombre es Paula te escribo desde Colombia y quiero que sepas que eres una persona muy valiente, un ser humano maravilloso y quiero que sepas que Dios tiene planes para ti y te va a llevar a lugares maravillosos que tal vez hoy no puedes ni imaginar. \nSoy mamá de dos niños pequeños, y no sé quienes componen tu familia o si perdiste a alguien en esta tragedia, pero quiero que sepas que cada una de las personas que han perdido su vida o que han sido víctimas de alguna manera me han dolido en mi corazón, he derramado lágrimas por tu país, por tus hermanos por tus niños por tus madres por cada una de las personas que perdió su vida, quiero que sepas que aún en la distancia todas estas personas nos duelen.\nSé que tienes mucho miedo, y que probablemente tengas muchas dudas más que certezas de cómo continuar a la vida después de toda esta tragedia, pero quiero que sepas que todo va a pasar, los días malos van a acabar, la noche terminará, y tu vida tendrá un valor y un propósito mayor al de antes de este suceso, ya que será un testimonio para muchos de valentía de esfuerzo y de propósito. Si tienes algo que quieras compartir con el mundo, no te quedes callado o callada, sal, y cuéntale al mundo, por lo que pasaste y como te convertiste en una persona mucho más poderosa de lo que eras\nQuisiera poder hacer mucho más, quiero que sepas que he sentido en mi corazón, un deseo ardiente de estar allá contigo de remover escombros con mis propias manos de ayudar de muchas más maneras a mis hermanos venezolanos, de buscar vida y esperanza, hasta el último Rincón de las cenizas. Lamentablemente en este momento no puedo hacerlo ya que como te conté tengo dos niños pequeños y dependemos de mi empleo, pero quiero que sepas y que confíes en que como yo muchas personas en el mundo entero nos estamos moviendo para darles la mano, estamos recolectando, no sólo alimentos medicinas, insumos médicos, sino buscando en las redes y por medios como este poder llegar y ser un abrazo que se siente en la distancia.\nEstás en mis oraciones tú y todos mis hermanos venezolanos y se que dentro de unos años veremos a Venezuela como una nación grande, poderosa llena del amor de Dios y que se ha levantado de manera impresionante ante los ojos de todo el mundo.\nRecibe mi abrazo cálido, recibe mi amor, recibe mis oraciones. Te bendigo a ti a tu casa a tu ciudad a tu país y a toda tu familia y espero que todos estén bien.",
    estado: "aprobada",
  },
  592: {
    texto:
      "Hola! \n\nEspero que esta carta te encuentre bien o bueno en lo posible, sé que no es fácil pasar lo que estás viviendo y entender el por qué o el para qué de esta situación tampoco. Hoy con mi corazón en la mano quiero decirte que oro por ti y todas las personas que se vieron afectadas en esta tragedia, le pido a Dios que los llene de fortaleza para pasar este mal momento que como Venezolanos están atravesando, no sé si estás en Venezuela o fuera de allí pero sé que el dolor de atravesar una situación como estas es igual desde cualquier lugar donde estés, aunque no lo creas te entiendo.. \n\nHace una semana (el 22 de junio) tuve la oportunidad de conocer tu lindo país y debo decir que es HERMOSO! Venezuela, su gente, su naturaleza, es única.. y aunque no soy venezolana esta tragedia la estoy sintiendo propia, le pido a Dios que levante el pueblo Venezolano triunfante, que todos esos corazones que se sienten tristes y agobiados, el Señor los abrace y les de consuelo, que los llene de ese entendimiento que solo se recibe de él.\n\nEn este momento solo puedo brindarte mis oraciones y espero que te ayuden a sentirte un poco mejor, a recibir mi abrazo a través de estas palabras y si, aunque suene muy cliché: las cosas van a mejorar, Dios está contigo y tu familia. Ánimo! \n\nVenezuela se ha levantado muchas veces y está no será la excepción. \n\nTe envío un abrazo fuerte y espero mis palabras te hagan sentir un poco mejor. \n\nCon cariño,",
    estado: "aprobada",
  },
  700: {
    texto:
      "Hola hoy es 02 de julio y aún sigo orando por Venezuela, Pero hoy quiero orar por ti para que Dios te dé la paz que sobrepasa todo entendimiento, que te de aliento de vida, fuerza para llevar esta situación tan dolorosa. Hoy eres tú y Dios juntos tomado de la mano. Eres llamado a resplandecer y tienes un propósito muy grande en esta tierra. Que Dios te abrace con amor eterno, con paz y con la fuerza que necesitas, que sea tu sustento y que te guarde bajo sus alas protectoras. Ánimo. Lo que sea que necesites tienes una hermana colombiana dispuesta a ayudarte. Dios nunca te dejará ni te abandonará.",
    estado: "aprobada",
  },
  835: {
    texto:
      "Hola,\n\nPrimero que nada quiero que respires hondo y que sientas lo afortunad@ que eres solo por respirar pues respirar significa que estas aqui, que aun vives y donde hay vida hay esperanza.\n\nSe que toda esta pesadilla es complicada y que esta constantemente revolviendote el pensamiento y las emociones pero lo importante es que sigues aqui.\n\nQuiero que sepas que entiendo tu dolor, sali de Venezuela hace mas de 25 anos y desde ese entonces nunca mas regrese, pero ver toda esa tragedia ha sido como si nunca hubiese salido de alli, al ver las imagenes sentia como si mi alma estuviera en ese local sintiendo el dolor de aquellos que lo estan viviendo de cerca. Es un sentimiento muy raro, siempre he amado y honrado a Venezuela, es mi tierra natal, mi madre, donde vivi los mejores anos de mi vida y a pesar de haberla visto sufrir tanto con tantos otros eventos este se siente diferente porque la veo masivamente herida. Pero con el pasar de los dias me he dado cuenta que talvez no sea una herida, talvez sea un desahogo, como si ella 'Venezuela' necesitara rugir bien alto para que la escucharan y se dieran cuenta de todo su sufrimiento. Como una madre que ya no aguanta mas dolor, como esa persona que esta llegando a su limite de tolerancia y necesita gritar bien alto para poder aliviar el dolor que no consigue explicar con palabras.\n\nY lo siento muchisimo por todas esas personas inocentes que no se merecian pasar por esto, que no merecen tanto sufrimiento, de verdad lo siento muchisimo, y pido que el alma de todos aquellos que no lograron escapar descanse en paz. \n\nPero ahora llego el momento de como buen/a Venezolan@ levantarse, sacudirse y seguir porque ahora le toca a mi tierra madre brillar, estoy segura que despues de todo esto los Venezolanos seran reconocidos por su esencia, por su luz, por su resiliencia y poder de ver siempre lo bueno mismo cuando el mundo se nos derrumba.\n\nRespira hondo, lleva tus manos al corazon, siente sus latidos y agradece, agradece por estar aqui, por tener la oportunidad de vivir un dia mas, abrazate y felicitate por ser valiente, resiliente, fuerte y mismo con ese dolor tan grande seguir en frente!\n\nQue el brillo, la fuerza y el poder de nuestra querida Venezuela resplandezca e ilumine el mundo entero!\n\nTe abrazo bien fuerte, \n\nDe corazon,\n\nTania",
    estado: "aprobada",
  },
  907: {
    texto:
      "No soy Venezolana, soy colombiana, mamá de Agus, esposa de Sigi, hija de elsa y eudoro, hermana de Jhon, Frank, Harold, Jhon F y dos mujeres más... nieta de Rosa (Que ya está en la paz del señor) y al ver todo lo que está ocurriendo no te imaginas como me ha dolido ver tu dolor por un celular... Un pinche aparato que no me deja tomar las manos y alzar ni una piedra, ni dar una brazo.. pero hoy hoy encontré esto y quisiera decirte que te amo.. Tu no me conoces pero te amo mucho... te amo porque tu dolor lo he sentido propio, te amo porque tu perdida la he sentido como mía, te amo porque desde que paso ese terrible terremoto no he dejado de orar por ti, de pensar en ti.. en todos. \n\nSoy mamá y como madre haría lo que sea por salvar a mi hijo, no me puedo imaginar las lagrimas de un Dios que ama hasta el extremo. Estos  días debido a esta tragedia me ha acercado más a Dios. \n\nDesde Colombia, mi más sincero abrazo... gracias por estar vivo, gracias por ser más fuerte de lo que crees que eres. Gracias por estar acá.... siempre que haya vida hay esperanza. Te amo",
    estado: "pendiente",
  },
  1051: {
    texto:
      "Querido(a) hermano(a),\nNo nos conocemos. Vivo en Brasil, en Salvador, Bahía. Soy enfermera y madre.\n\nHe estado siguiendo, aunque desde lejos, el dolor que están viviendo. Sé que las palabras no son capaces de aliviar un sufrimiento tan profundo, y lamentablemente no puedo estar ahí para ayudar como me gustaría.\nPero quiero que sepas que hay personas del otro lado del mundo orando por ti. Yo estoy orando por ti.\nOro para que Dios fortalezca tu corazón, sostenga tus pasos y te dé fuerzas para enfrentar cada nuevo día. Oro para que, incluso en medio de los escombros, encuentres esperanza.\nJesús conoce tu dolor. Él ve cada lágrima, escucha cada clamor y permanece a tu lado, incluso cuando todo parece perdido. Sostente firme de Sus manos. Él es fortaleza, consuelo, esperanza y vida.\nNo todo dolor dura para siempre. Cree que Dios sigue obrando, incluso cuando no logramos comprender sus caminos. Que Él restaure tu alma, calme tu corazón y te conceda paz en medio del caos.\nRecibe mi cariño, mis oraciones y mi solidaridad.\nQue Dios te bendiga a ti y a toda tu familia.\nCon amor, Gabriella, Salvador, Bahía – Brasil",
    firma: "Gabriella",
    estado: "aprobada",
  },
  1210: {
    texto:
      "En este momento, yo sé que no hay nada que yo hubo otra persona, podamos decir que le generen el consuelo que necesitan, lo que sí puedo asegurarles, es que no están solos latinoamérica, y el mundo está con ustedes. \n\nLa vida les ha tocado una y otra vez, de una forma tan fuerte, que se que al igual que yo has estado buscando una explicación a todo esto, pero quiero decirte que no pierdas la fe, que cuando el día está más oscuro es porque ya va a amanecer. \n\nSea fuerte, tu país te necesita más enfocado que nunca. Dispuesto a trabajar y a dar lo mejor de ti para reconstruir a Venezuela.\n\nEsos seres que ya no están mirando desde el cielo, y desde allí van a sentir orgullo de lo que te vas a convertir luego de todo este proceso, haz que valga la pena todo lo que han pasado, conviértete un mejor ser humano y ser la mejor versión de ti.\n\nTe abrazo en la distancia.",
    estado: "pendiente",
  },
  1251: {
    firma: null,
    estado: "aprobada",
  },
  1517: {
    texto:
      "Hola cómo estás espero que estés bien estés orando por tu salud por la salud de tu familia por la salud de cualquier persona que necesite. solo quería decirte que seas fuerte como lo venís haciendo estás haciendo muy bien, espero que estés orando como muchas personas lo están haciendo, yo sé que ahora no es la Venezuela que vos conocías te encantaría volver antes de todo este caos pero te aseguro de que después de todo este caos va a venir la felicidad va a venir color de nuevo solo tenés que tener fe porque la fe lo es todo.\nTe mando un saludo desde Argentina.",
    estado: "aprobada",
  },
  1569: {
    texto:
      "Hola me llamo Mabel vivo en Francia y soy Colombiana, desde el día del terremoto no he dejado de llorar pienso en todos y cada uno de ustedes, si hoy estás leyendo esta carta hay algo muy importante de lo que talvez no eres consiente. ESTAMOS VIVOS. Dios me puso aquí a escribirte por alguna razón y tú estás leyendo esto porque por hay algo muy especial para ti, sus planes son perfectos. \nAférrate a la vida, aférrate a la mucha fuerza que tienes en este momento (es normal que no sea la misma de antes) aquí en mis oraciones están cada uno de ustedes. Pienso en ustedes cada día y mis oraciones son sobretodo para que no pierdan la fé.",
    estado: "aprobada",
  },
};

export async function GET(request) {
  const params = request.nextUrl.searchParams;
  const token = params.get("token");
  if (!token || token !== process.env.AUTOMATION_TOKEN) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const id = params.get("id");
  const cambio = CAMBIOS[id];
  if (!id || !cambio) {
    return NextResponse.json({ error: "id sin cambio disponible." }, { status: 400 });
  }

  const updateData = {};
  if (cambio.texto !== undefined) updateData.texto = cambio.texto;
  if (cambio.firma !== undefined) updateData.firma = cambio.firma;
  if (cambio.estado !== undefined) updateData.estado = cambio.estado;

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("cartas").update(updateData).eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id, ...updateData });
}
