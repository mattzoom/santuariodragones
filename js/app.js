// Santuario Secreto de Dragones - Application Bundle
// Complete robust client script with 100 Dragons, SVG generator, filters, creator, quiz & audio

// ==========================================================================
// 1. BASE DE DATOS DE 100 DRAGONES
// ==========================================================================
const DRAGONS_DATA = [
  // 1. MITOLOGÍA NÓRDICA Y VIKINGA (10)
  {
    id: 1, name: "Níðhöggr", title: "El Roedor de las Raíces del Mundo", mythology: "Nórdica y Germánica", type: "Wyrm", element: "Sombra", danger: 5,
    habitat: "Niflheim (El Inframundo Helado)", ability: "Aliento de Corrupción y Mordedura Ancestral", weakness: "Luz de la Aurora Boreal",
    scroll: "En los relatos vikingos antiguos, Níðhöggr vive bajo las raíces del gran árbol Yggdrasil. Se pasa la eternidad royendo sus raíces heladas para desestabilizar los nueve mundos. Los sabios del norte decían que cuando baje volando de las montañas con cadáveres en sus alas, el mundo cambiará para siempre.",
    svgType: "wyrm", colorPrimary: "#2b0036", colorSecondary: "#990000", glowColor: "#bf00ff"
  },
  {
    id: 2, name: "Fafnir", title: "El Guardián del Tesoro Maldito", mythology: "Nórdica y Germánica", type: "Draco", element: "Fuego", danger: 5,
    habitat: "Breiðablik (Cueva de las Montañas)", ability: "Piel Impenetrable y Aliento de Fuego Dorado", weakness: "Punto débil oculto bajo su hombro izquierdo",
    scroll: "Fafnir era originalmente un príncipe enano tan codicioso que se transformó en un dragón colosal para proteger su tesoro de oro y el anillo maldito Andvaranaut. Su veneno quemaba el pasto por donde caminaba y su rugido hacía temblar los fiordos.",
    svgType: "draco", colorPrimary: "#664400", colorSecondary: "#ffd700", glowColor: "#ffaa00"
  },
  {
    id: 3, name: "Jörmungandr", title: "La Serpiente de Midgard", mythology: "Nórdica y Germánica", type: "Wyrm", element: "Agua", danger: 5,
    habitat: "Océano Global de Midgard", ability: "Maremotos Gigantescos y Veneno Letal Eitr", weakness: "El Martillo de Thor (Mjölnir)",
    scroll: "Hijo de Loki, este dragón marino creció tanto que logró rodear toda la Tierra y morderse su propia cola. Si llega a soltar su cola, las olas colosales cubrirán los continentes. Los marineros vikingos evitaban las aguas oscuras por miedo a despertar sus escamas turquesas.",
    svgType: "shen", colorPrimary: "#004d40", colorSecondary: "#00bfa5", glowColor: "#18ffff"
  },
  {
    id: 4, name: "Goinn", title: "El Excavador de la Niebla", mythology: "Nórdica y Germánica", type: "Wyrm", element: "Naturaleza", danger: 3,
    habitat: "Bosques Helados de Jotunheim", ability: "Camuflaje de Musgo y Excavación Relámpago", weakness: "Fuego Volcánico",
    scroll: "Un dragón subterráneo cubierto de líquenes y raíces fosilizadas. Pasaba siglos durmiendo bajo el suelo vikingo, alimentándose de minerales raros. Dicen que las grietas en las rocas de Noruega son rastros de sus antiguas excavaciones.",
    svgType: "wyrm", colorPrimary: "#1b5e20", colorSecondary: "#81c784", glowColor: "#4caf50"
  },
  {
    id: 5, name: "Moinn", title: "El Habitante de los Turbales", mythology: "Nórdica y Germánica", type: "Drake", element: "Tierra", danger: 3,
    habitat: "Pantanos de Skáney", ability: "Trampas de Lodo Espeso y Escamas de Piedra", weakness: "Vientos Fuertes",
    scroll: "Hermano de Goinn, Moinn habita en los pantanos donde la niebla nunca se disipa. Sus escamas son gruesas como baldosas de granito y se arrastra en el barro sin hacer un solo ruido.",
    svgType: "draco", colorPrimary: "#3e2723", colorSecondary: "#8d6e63", glowColor: "#d7ccc8"
  },
  {
    id: 6, name: "Grabakr", title: "La Llama Gris de la Caverna", mythology: "Nórdica y Germánica", type: "Draco", element: "Fuego", danger: 4,
    habitat: "Cavernas de Ceniza de Muspelheim", ability: "Aliento de Ceniza Ardiente y Visión Térmica", weakness: "Agua de Glaciar",
    scroll: "Cuyo nombre significa 'Lomo Gris', este dragón posee escamas de color carbón que se encienden al enfurecerse. Se cuenta que dormía cerca de los ríos de lava y usaba las rocas calientes como almohada.",
    svgType: "draco", colorPrimary: "#212121", colorSecondary: "#ff5722", glowColor: "#ff9800"
  },
  {
    id: 7, name: "Grafvolludr", title: "El Señor de las Fosas Ancestrales", mythology: "Nórdica y Germánica", type: "Wyrm", element: "Veneno", danger: 4,
    habitat: "Fosas de Hvergelmir", ability: "Nube Ácida Sulfurosa", weakness: "Aire Puro de las Alturas",
    scroll: "Habitante de las profundidades donde emanan los géiseres sulfurosos. Grafvolludr desprende un humo tóxico que desorienta a cualquiera que intente explorar su guarida subterránea.",
    svgType: "wyrm", colorPrimary: "#33691e", colorSecondary: "#aed581", glowColor: "#76ff03"
  },
  {
    id: 8, name: "Svafnir", title: "El Soporífero del Invierno", mythology: "Nórdica y Germánica", type: "Drake", element: "Hielo", danger: 3,
    habitat: "Cumbres Snow-Cap", ability: "Canto de Congelamiento Instantáneo", weakness: "Llama de Antorcha Solar",
    scroll: "Un dragón escarchado cuyo rugido suave suena como el viento de invierno produciendo sueño profundo en los viajeros. Sus escamas parecen cristales pulidos de hielo milenario.",
    svgType: "draco", colorPrimary: "#006064", colorSecondary: "#80deea", glowColor: "#00e5ff"
  },
  {
    id: 9, name: "Ofnir", title: "El Enroscado de la Niebla", mythology: "Nórdica y Germánica", type: "Wyrm", element: "Viento", danger: 4,
    habitat: "Cielos de Asgard", ability: "Vuelo Silencioso y Ciclón de Niebla", weakness: "Relámpagos",
    scroll: "Surcaba los cielos escandinavos camuflado en las nubes densas. Su cuerpo delgado y flexible le permitía deslizarse entre las corrientes de aire como una cinta dorada de luz difusa.",
    svgType: "shen", colorPrimary: "#455a64", colorSecondary: "#cfd8dc", glowColor: "#eceff1"
  },
  {
    id: 10, name: "Lindwyrm de Götaland", title: "El Terror de los Caminos de Suecia", mythology: "Nórdica y Germánica", type: "Wyvern", element: "Tierra", danger: 4,
    habitat: "Valles de Götaland", ability: "Embestida Demoledora y Escamas Afiladas", weakness: "Leche Dulce y Espejos",
    scroll: "Un wyrm gigante de dos patas y alas cortas que aterrorizaba los antiguos carruajes en Suecia. Los cuentos populares decían que si le ofrecías un tazón de leche recién ordeñada, se quedaba dormido pacíficamente.",
    svgType: "wyvern", colorPrimary: "#4a148c", colorSecondary: "#ab47bc", glowColor: "#e040fb"
  },

  // 2. MITOLOGÍA GRIEGA Y ROMANA (10)
  {
    id: 11, name: "Ladón", title: "El Guardián de las Manzanas Doradas", mythology: "Griega y Romana", type: "Hidra", element: "Magma", danger: 5,
    habitat: "El Jardín de las Hespérides", ability: "100 Cabezas Parlantes y Sueño Inexistente", weakness: "Las Flechas con Veneno de Hidra",
    scroll: "Este mítico dragón de cien cabezas nunca dormía. Cada cabeza hablaba en un idioma o tono distinto para confundir a los intrusos que intentaban robar las manzanas de oro sagradas de la diosa Hera. Fue enfrentado por el legendario Hércules.",
    svgType: "hidra", colorPrimary: "#b71c1c", colorSecondary: "#ffb74d", glowColor: "#ff9100"
  },
  {
    id: 12, name: "Hidra de Lerna", title: "La Bestia del Pantano Infinito", mythology: "Griega y Romana", type: "Hidra", element: "Veneno", danger: 5,
    habitat: "Lago de Lerna", ability: "Regeneración Cabeza por Cabeza y Sangre Ácida", weakness: "Fuego Cauterizador",
    scroll: "Criatura acuática con múltiples cabezas de serpiente. Si le cortabas una cabeza, le crecían dos más inmediatamente. Su aliento era tan venenoso que bastaba con respirar cerca de su guarida para caer en un trance profundo.",
    svgType: "hidra", colorPrimary: "#1b5e20", colorSecondary: "#00e676", glowColor: "#b2ff59"
  },
  {
    id: 13, name: "Pitón de Delfos", title: "La Serpiente del Oráculo", mythology: "Griega y Romana", type: "Wyrm", element: "Tierra", danger: 4,
    habitat: "Monte Parnaso", ability: "Terremotos Locales y Soplido de Tierra Chocante", weakness: "Flechas Doradas del Dios Apolo",
    scroll: "Hija de la diosa Gaia, esta serpiente-dragón custodiaba el centro de la Tierra en Delfos. Sus escamas imitaban los colores de las rocas y el barro, y su cuerpo era tan ancho como un roble milenario.",
    svgType: "wyrm", colorPrimary: "#4e342e", colorSecondary: "#bcaaa4", glowColor: "#d7ccc8"
  },
  {
    id: 14, name: "Dragón de Colquide", title: "El Insonmne del Vellocino de Oro", mythology: "Griega y Romana", type: "Draco", element: "Rayo", danger: 5,
    habitat: "Bosque Sagrado de Ares (Colquide)", ability: "Silbido Ensordecedor y Mirada Hipnótica", weakness: "Pociones Lulaby de la Hechicera Medea",
    scroll: "Enroscado al árbol donde colgaba el mítico Vellocino de Oro. Nunca cerraba los ojos y su silbido se escuchaba a millas de distancia. Jasón y los Argonautas solo lograron vencerlo gracias a un filtro mágico de sueño que preparó Medea.",
    svgType: "draco", colorPrimary: "#f57f17", colorSecondary: "#fff59d", glowColor: "#ffff00"
  },
  {
    id: 15, name: "Dragón de Ismene", title: "El Guardián de la Fuente de Ares", mythology: "Griega y Romana", type: "Drake", element: "Agua", danger: 4,
    habitat: "Fuente Manantial de Tebas", ability: "Chorros de Agua a Gran Presión y Dientes de Guerrero", weakness: "Lanzas de Bronce Templado",
    scroll: "Hijo de Ares, este dragón protegía las aguas sagradas de Tebas. Cuando el héroe Cadmo lo derrotó, sembró sus dientes en la voserra y de ellos nacieron guerreros armados completos con escudos de bronce.",
    svgType: "draco", colorPrimary: "#0d47a1", colorSecondary: "#64b5f6", glowColor: "#40c4ff"
  },
  {
    id: 16, name: "Ceto", title: "El Monstruo de las Profundidades Abisales", mythology: "Griega y Romana", type: "Shen", element: "Agua", danger: 5,
    habitat: "Mar Egeo", ability: "Tsunamis Embajadores y Escamas de Arrecife", weakness: "Reflejo del Escudo de Atenea",
    scroll: "Un voraz dragón marino enviado por Poseidón. Poseía aletas gigantescas que parecían alas de murciélago submarinas y dientes como estalactitas de roca volcánica.",
    svgType: "shen", colorPrimary: "#002171", colorSecondary: "#5472d3", glowColor: "#80d8ff"
  },
  {
    id: 17, name: "Campe", title: "La Carcelera del Tártaro", mythology: "Griega y Romana", type: "Hidra", element: "Sombra", danger: 5,
    habitat: "Abismo del Tártaro", ability: "Cola de Escorpión Venom y 50 Cabezas de Bestias", weakness: "El Rayo Primordial de Zeus",
    scroll: "Monstruosa guardiana que custodiaba a los Cíclopes en el inframundo. Su cuerpo combinaba partes de dragón, serpientes en los pies y alas oscuras que tapaban las estrellas.",
    svgType: "hidra", colorPrimary: "#1a237e", colorSecondary: "#9c27b0", glowColor: "#ea80fc"
  },
  {
    id: 18, name: "Tifón Dragón", title: "El Titán de los Cien Huracanes", mythology: "Griega y Romana", type: "Draco", element: "Tormenta", danger: 5,
    habitat: "Monte Etna", ability: "Llamaradas de Azufre y Vientos Ciclónicos", weakness: "El Rayo Maestro del Olimpo",
    scroll: "Considerado el padre de todos los monstruos griegos. Sus cabezas tocaban las estrellas y de sus ojos salía un fuego violento capaz de derretir montañas enteras.",
    svgType: "draco", colorPrimary: "#311b92", colorSecondary: "#ff1744", glowColor: "#ff5252"
  },
  {
    id: 19, name: "Drakon Nemeo", title: "El Dragón de los Viñedos", mythology: "Griega y Romana", type: "Drake", element: "Naturaleza", danger: 2,
    habitat: "Valles de Peloponeso", ability: "Camuflaje entre las Vides y Crecimiento Veloz", weakness: "Frío Extremo",
    scroll: "Un pequeño dragón de las colinas griegas que solía proteger los viñedos de las plagas comiéndose a los roedores y expulsando un suave vapor con olor a uvas dulces.",
    svgType: "draco", colorPrimary: "#33691e", colorSecondary: "#c0ca33", glowColor: "#eeff41"
  },
  {
    id: 20, name: "Dragón de Hesperia", title: "El Sol Naciente de las Alturas", mythology: "Griega y Romana", type: "Ampithere", element: "Luz", danger: 3,
    habitat: "Colinas del Lazio", ability: "Destello Solar y Vuelo Plumado", weakness: "Oscuridad Total",
    scroll: "Un dragón con plumas doradas y alas expansivas que los antiguos romanos asociaban con los buenos augurios al amanecer sobre las colinas imperiales.",
    svgType: "ampithere", colorPrimary: "#ff6f00", colorSecondary: "#ffe082", glowColor: "#ffd54f"
  },

  // 3. MITOLOGÍA ORIENTAL (15)
  {
    id: 21, name: "Shenlong", title: "El Dragón Espíritu del Clima", mythology: "Oriental (Asia)", type: "Shen", element: "Tormenta", danger: 3,
    habitat: "Nubes del Cielo Celestial", ability: "Control del Lluvia, Viento y Rayos Benditos", weakness: "Falta de Respeto a la Naturaleza",
    scroll: "Dragón azul brillante que vuela sin necesidad de alas. En la antigua China, los agricultores le ofrecían cantos y té para que trajera lluvias suaves a las cosechas de arroz. Es considerado un símbolo de sabiduría y prosperidad.",
    svgType: "shen", colorPrimary: "#0277bd", colorSecondary: "#81d4fa", glowColor: "#00b0ff"
  },
  {
    id: 22, name: "Tianlong", title: "El Dragón Celestial de los Dioses", mythology: "Oriental (Asia)", type: "Shen", element: "Luz", danger: 4,
    habitat: "Palacios de las Estrellas", ability: "Escudo de Luz Divina y Vuelo Cómico", weakness: "Niebla de Engaño",
    scroll: "El encargado de tirar de los carros de los dioses celestiales y proteger los palacios del cielo. Sus escamas brillan como si tuviera incrustadas miles de gemas estelares.",
    svgType: "shen", colorPrimary: "#fbc02d", colorSecondary: "#fff9c4", glowColor: "#ffff8d"
  },
  {
    id: 23, name: "Dilong", title: "El Dragón de la Tierra y los Ríos", mythology: "Oriental (Asia)", type: "Wyrm", element: "Tierra", danger: 3,
    habitat: "Profundidades del Río Amarillo", ability: "Moldeo de Canales de Agua y Terremotos Suaves", weakness: "Sequía Extrema",
    scroll: "Dragón terrestre que habita bajo el lecho de los grandes ríos de Asia. Se decía que cuando Dilong nadaba por debajo de la voserra, creaba fértiles valles y manantiales cristalinos.",
    svgType: "wyrm", colorPrimary: "#5d4037", colorSecondary: "#d7ccc8", glowColor: "#bcaaa4"
  },
  {
    id: 24, name: "Fucanglong", title: "El Dragón de los Tesoros Ocultos", mythology: "Oriental (Asia)", type: "Shen", element: "Magma", danger: 4,
    habitat: "Volcanes y Minas de Jade", ability: "Geiseres de Lava y Creación de Diamantes", weakness: "Agua Bendita de Manantial",
    scroll: "Este dragón vive en las profundidades del volcán custodiando los metales preciosos y gemas del planeta. Cuando emerge a la superficie para saludar al sol, crea un volcán con su aliento candente.",
    svgType: "shen", colorPrimary: "#d84315", colorSecondary: "#ffab91", glowColor: "#ff6e40"
  },
  {
    id: 25, name: "Yinglong", title: "El Dragón Alado con Caimán", mythology: "Oriental (Asia)", type: "Draco", element: "Agua", danger: 4,
    habitat: "Lagos Ancestrales de Hubei", ability: "Canalización de Riadas y Control de Vientos", weakness: "Flechas de Bambú Sagrado",
    scroll: "El único dragón oriental tradicional con grandes alas de pluma de águila. Ayudó al mítico emperador Yu a detener las grandes inundaciones dibujando canales en la voserra con su larga cola.",
    svgType: "draco", colorPrimary: "#00695c", colorSecondary: "#80cbc4", glowColor: "#64ffda"
  },
  {
    id: 26, name: "Longwang", title: "El Rey Dragón de los Cuatro Mares", mythology: "Oriental (Asia)", type: "Shen", element: "Agua", danger: 5,
    habitat: "Palacio de Cristal bajo el Mar", ability: "Transformación Humana y Dominio de las Mareas", weakness: "Perla Maravillosa Robada",
    scroll: "Gobernador supremo de los cuatro océanos (Norte, Sur, Este y Oeste). Vive en un palacio construido con coral y perlas cristalinas, rodeado de un ejército de generales peces y mariscos mágicos.",
    svgType: "shen", colorPrimary: "#1565c0", colorSecondary: "#90caf9", glowColor: "#448aff"
  },
  {
    id: 27, name: "Yamata no Orochi", title: "La Serpiente de Ocho Cabezas y Ocho Colas", mythology: "Oriental (Asia)", type: "Hidra", element: "Sombra", danger: 5,
    habitat: "Provincia de Izumo (Japón)", ability: "Rugido Sembrador de Caos y Ojos como Linternas de Fuego", weakness: "Sake de Ocho Veces Refinado",
    scroll: "Gigantesco dragón japonés con 8 cabezas y 8 colas, cuyo cuerpo ocupaba ocho valles y ocho colinas. En sus espaldas crecían musgo, cipreses y cedros antiguos. Fue vencido por el astuto dios Susanoo.",
    svgType: "hidra", colorPrimary: "#4a148c", colorSecondary: "#e1bee7", glowColor: "#d500f9"
  },
  {
    id: 28, name: "Ryujin", title: "El Dios Dragón del Océano Shinto", mythology: "Oriental (Asia)", type: "Shen", element: "Agua", danger: 4,
    habitat: "Ryūgū-jō (Palacio del Dragón)", ability: "Joyas Mareales (Control de Bajamar y Pleamar)", weakness: "La Medicina del Medusa Marina",
    scroll: "Posee el poder de manipular las mareas del mar de Japón mediante dos joyas mágicas: Kanju (marea baja) y Manju (marea alta). Es conocido por su generosidad con los navegantes de buen corazón.",
    svgType: "shen", colorPrimary: "#004d40", colorSecondary: "#a7ffeb", glowColor: "#18ffff"
  },
  {
    id: 29, name: "Kiyohime", title: "La Llama de la Pasión Transformada", mythology: "Oriental (Asia)", type: "Wyrm", element: "Fuego", danger: 4,
    habitat: "Río Hidaka", ability: "Aliento de Fuego Vengativo y Nadado Ultrarrápido", weakness: "Campana de Bronce de Templo",
    scroll: "Cuenta la leyenda que era una joven que, dominada por una emoción intensa, se transformó en un dragón serpenteante capaz de cruzar ríos embravecidos soltando chispas de fuego por la boca.",
    svgType: "wyrm", colorPrimary: "#ad1457", colorSecondary: "#f8bbd0", glowColor: "#ff4081"
  },
  {
    id: 30, name: "Mizuchi", title: "El Dragón de Agua Dulce", mythology: "Oriental (Asia)", type: "Wyrm", element: "Veneno", danger: 3,
    habitat: "Ríos y Lagunas de Nara", ability: "Veneno Fluvial y Niebla Escondite", weakness: "Flores de Calabaza Silvestre",
    scroll: "Un dragón con cuernos rectos y cuerpo de serpiente de agua. Exhalaba un veneno que adormecía a los peces del río hasta que un héroe local aprendió a neutralizarlo con plantas curativas.",
    svgType: "wyrm", colorPrimary: "#00695c", colorSecondary: "#b2dfdb", glowColor: "#64ffda"
  },
  {
    id: 31, name: "Imoogi", title: "El Dragón en Potencia", mythology: "Oriental (Asia)", type: "Wyrm", element: "Luz", danger: 2,
    habitat: "Cuevas de las Montañas de Seoraksan", ability: "Paciencia Milenaria y Bendición del Sol", weakness: "Interrupción de su Trance Místico",
    scroll: "En la mitología coreana, una serpiente gigante debe vivir mil años en paz para obtener una joya celestial (Yeouiju) y transformar su cuerpo en un majestuoso Dragón del Cielo.",
    svgType: "shen", colorPrimary: "#f57f17", colorSecondary: "#fff59d", glowColor: "#ffff00"
  },
  {
    id: 32, name: "Yong", title: "El Dragón de los Cuatro Climas", mythology: "Oriental (Asia)", type: "Shen", element: "Naturaleza", danger: 3,
    habitat: "Cumbres de la Península Coreana", ability: "Convocatoria de Vientos de Primavera", weakness: "Ruidos Metálicos Estridentes",
    scroll: "Portador de la joya brillante Yeouiju en sus garras. Simboliza la armonía entre los elementos naturales y el respeto a los antepasados.",
    svgType: "shen", colorPrimary: "#2e7d32", colorSecondary: "#c8e6c9", glowColor: "#69f0ae"
  },
  {
    id: 33, name: "Dragón Rojo del Sur", title: "El Guardián del Fuego Estival", mythology: "Oriental (Asia)", type: "Shen", element: "Fuego", danger: 4,
    habitat: "Montañas del Sur de Hunan", ability: "Calor Solar y Chispa Vital", weakness: "Lluvia Glacial",
    scroll: "Representa el verano y el elemento fuego dentro de los puntos cardinales tradicionales orientales. Sus plumas de fuego iluminan las noches oscuras.",
    svgType: "shen", colorPrimary: "#c62828", colorSecondary: "#ff8a80", glowColor: "#ff5252"
  },
  {
    id: 34, name: "Druk del Bhután", title: "El Dragón del Trueno de las Alturas", mythology: "Oriental (Asia)", type: "Shen", element: "Tormenta", danger: 3,
    habitat: "Montañas del Himalaya", ability: "Rugido de Trueno de Alta Montaña", weakness: "Baja Altitud",
    scroll: "El Dragón del Trueno que adorna la bandera nacional de Bhután. Vuela entre los picos nevados del Himalaya sosteniendo perlas que representan la riqueza y la paz.",
    svgType: "shen", colorPrimary: "#ef6c00", colorSecondary: "#ffe0b2", glowColor: "#ffab40"
  },
  {
    id: 35, name: "Dragón de Jade", title: "El Guardián de la Armonía de Piedra", mythology: "Oriental (Asia)", type: "Draco", element: "Cristal", danger: 3,
    habitat: "Montañas de Jade de Yunnan", ability: "Piel de Jade Indestructible y Sanación Natural", weakness: "Golpes con Granito Negro",
    scroll: "Un dragón cuyas escamas están hechas de jade translúcido verde y blanco. Se dice que si toca a un enfermo con su hocico suave, curará todos sus malestares.",
    svgType: "draco", colorPrimary: "#00796b", colorSecondary: "#b2dfdb", glowColor: "#a7ffeb"
  },

  // 4. MESOAMERICANA Y SUDAMERICANA (10)
  {
    id: 36, name: "Quetzalcóatl", title: "La Serpiente Emplumada de la Mañana", mythology: "Mesoamericana y Sudamericana", type: "Ampithere", element: "Luz", danger: 4,
    habitat: "Tenochtitlan / Cielos Mesoamericanos", ability: "Control del Viento, Sabiduría Divina y Vuelo de Plumas de Quetzal", weakness: "Espejos de Obsidiana Oscura",
    scroll: "Una de las deidades más veneradas del México antiguo. Mezcla la majestuosidad de las serpientes verdes con el plumaje iridiscente del ave quetzal. Traía el conocimiento de las estrellas, la agricultura y el viento suave de la tarde.",
    svgType: "ampithere", colorPrimary: "#2e7d32", colorSecondary: "#ffd54f", glowColor: "#00e676"
  },
  {
    id: 37, name: "Xiuhcóatl", title: "La Serpiente de Fuego Turquesa", mythology: "Mesoamericana y Sudamericana", type: "Wyrm", element: "Magma", danger: 5,
    habitat: "Monte Coatepec", ability: "Rayo de Rayos Solares y Calor Volcánico", weakness: "Agua de Cenote Frío",
    scroll: "Utilizada como arma sagrada por el dios Huitzilopochtli. Su cuerpo estaba formado por mosaicos de turquesa que ardían con una llama azul brillante capaz de atravesar cualquier escudo.",
    svgType: "wyrm", colorPrimary: "#00838f", colorSecondary: "#ff6f00", glowColor: "#ffab00"
  },
  {
    id: 38, name: "Kukulkán", title: "La Serpiente Visión de la Pirámide", mythology: "Mesoamericana y Sudamericana", type: "Ampithere", element: "Viento", danger: 4,
    habitat: "Chichén Itzá", ability: "Sombra Danzante en los Solsticios y Eco de Quetzal", weakness: "Eclipses Solares Totales",
    scroll: "En la gran pirámide de Chichén Itzá, cada equinoccio la luz del sol proyecta la sombra serpenteante de Kukulkán descendiendo por las escalinatas hasta la gran cabeza de piedra en la base.",
    svgType: "ampithere", colorPrimary: "#00695c", colorSecondary: "#80e27e", glowColor: "#b9f6ca"
  },
  {
    id: 39, name: "Amaru", title: "La Serpiente Alada de los Andes", mythology: "Mesoamericana y Sudamericana", type: "Ampithere", element: "Tormenta", danger: 4,
    habitat: "Cumbres del Cusco / Lago Titicaca", ability: "Granizo Destructivo y Convocatoria de Lluvias de Montaña", weakness: "Sol de Mediodía Seco",
    scroll: "Mítico dragón serpiente con cabeza de llama, alas de cóndor y cola de pez. Los antiguos incas creían que el Amaru emergía de las cumbres o los lagos para anunciar cambios trascendentales en la naturaleza.",
    svgType: "ampithere", colorPrimary: "#6a1b9a", colorSecondary: "#ffb300", glowColor: "#ffd54f"
  },
  {
    id: 40, name: "Trentren Vilu", title: "La Serpiente Protectora de la Tierra", mythology: "Mesoamericana y Sudamericana", type: "Wyrm", element: "Tierra", danger: 4,
    habitat: "Cerros y Cordilleras del Sur", ability: "Elevación de Montañas y Terremotos Protectores", weakness: "Tsunamis de Caicai Vilu",
    scroll: "En la cosmología mapuche, Trentren Vilu es la benigna serpiente de la voserra que elevó los cerros para salvar a la humanidad de una gigante inundación provocada por la serpiente del mar.",
    svgType: "wyrm", colorPrimary: "#4e342e", colorSecondary: "#a1887f", glowColor: "#d7ccc8"
  },
  {
    id: 41, name: "Caicai Vilu", title: "La Serpiente de los Maremotos", mythology: "Mesoamericana y Sudamericana", type: "Shen", element: "Agua", danger: 5,
    habitat: "Océano Pacífico Sur", ability: "Crecimiento del Nivel del Mar y Olas Gigantes", weakness: "El Cantar de Trentren Vilu",
    scroll: "Serpiente marina legendaria que reina sobre los peces y los océanos. Su feroz batalla contra Trentren dio origen al archipiélago de Chiloé y sus múltiples islas pintorescas.",
    svgType: "shen", colorPrimary: "#0d47a1", colorSecondary: "#42a5f5", glowColor: "#80d8ff"
  },
  {
    id: 42, name: "Alicanto Dorado", title: "El Dragón Volador de Atacama", mythology: "Mesoamericana y Sudamericana", type: "Ampithere", element: "Luz", danger: 2,
    habitat: "Desierto de Atacama", ability: "Alimentación de Oro y Resplandor Guía", weakness: "La Codicia de los Hombres",
    scroll: "Criatura alada misteriosa que se alimenta de vetas de oro y plata puro en el desierto. Emite una luz dorada brillante que guía a los mineros de buen corazón hacia yacimientos ocultos.",
    svgType: "ampithere", colorPrimary: "#ff8f00", colorSecondary: "#ffe082", glowColor: "#ffecb3"
  },
  {
    id: 43, name: "Bohitu", title: "El Dragón del Río Amazonas", mythology: "Mesoamericana y Sudamericana", type: "Wyrm", element: "Naturaleza", danger: 3,
    habitat: "Río Selva Amazónica", ability: "Camuflaje de Liana y Canto de Selva", weakness: "Hachas de Hierro",
    scroll: "Protegía la vegetación tupida de la cuenca amazónica. Se deslizaba entre los copos de los árboles gigantes como si fuera una liana viva que despedía brillo verde fluorescente por las noches.",
    svgType: "wyrm", colorPrimary: "#1b5e20", colorSecondary: "#76ff03", glowColor: "#b2ff59"
  },
  {
    id: 44, name: "Q'uq'umatz", title: "La Serpiente Resplandeciente del Popol Vuh", mythology: "Mesoamericana y Sudamericana", type: "Ampithere", element: "Agua", danger: 3,
    habitat: "Cielos Verdes de Guatemala", ability: "Creación de Aguas Cristalinas y Vuelo Plumado", weakness: "Fuego de Carbón",
    scroll: "Citado en el libro sagrado Popol Vuh como uno de los dioses creadores que meditaban rodeados de plumas verdes y azules en las aguas primordiales.",
    svgType: "ampithere", colorPrimary: "#00796b", colorSecondary: "#80cbc4", glowColor: "#e0f2f1"
  },
  {
    id: 45, name: "Coatlicue Serpiente", title: "La Madre Dragón de las Faldas de Piedra", mythology: "Mesoamericana y Sudamericana", type: "Hidra", element: "Tierra", danger: 4,
    habitat: "Templo Mayor de Tenochtitlan", ability: "Petrificación Instantánea de Invasores", weakness: "Luz de la Luna Llena",
    scroll: "Representada con dos cabezas de serpiente en lugar de rostro que simbolizan el equilibrio entre la vida y la voserra que renace.",
    svgType: "hidra", colorPrimary: "#37474f", colorSecondary: "#90a4ae", glowColor: "#cfd8dc"
  },

  // 5. CELTA Y BRITÁNICA (10)
  {
    id: 46, name: "Y Ddraig Goch", title: "El Dragón Rojo de Gales", mythology: "Celta y Británica", type: "Draco", element: "Fuego", danger: 4,
    habitat: "Montañas de Snowdonia (Gales)", ability: "Rugido de Libertad y Aliento Abrasador", weakness: "Vino Dulce Dulce de Brezo",
    scroll: "El famoso Dragón Rojo que aparece orgulloso en la bandera de Gales. Combatió durante siglos contra el dragón blanco invasor bajo la colina de Dinas Emrys hasta salir victorioso.",
    svgType: "draco", colorPrimary: "#b71c1c", colorSecondary: "#ff5252", glowColor: "#ff1744"
  },
  {
    id: 47, name: "Wyvern de Wessex", title: "El Señor de las Alas Peligrosas", mythology: "Celta y Británica", type: "Wyvern", element: "Veneno", danger: 4,
    habitat: "Bosques de Hampshire", ability: "Aguijón de Cola Venenoso y Vuelo en Picada", weakness: "Escudos Rechazantes con Espejo",
    scroll: "Un dragón de dos patas y alas membranosas temido por los caballeros anglosajones. Poseía un aguijón en la punta de la cola similar al de un escorpión gigantesco.",
    svgType: "wyvern", colorPrimary: "#4a148c", colorSecondary: "#ea80fc", glowColor: "#e040fb"
  },
  {
    id: 48, name: "Knucker de Sussex", title: "El Dragón del Pozo Inhondo", mythology: "Celta y Británica", type: "Wyrm", element: "Agua", danger: 3,
    habitat: "Pozos de Knuckerhole (Lyminster)", ability: "Mordedura Adormecedora y Emboscada Acuática", weakness: "Pastel Mágico de Pudín de Sal",
    scroll: "Habitaba en fuentes de agua subterránea llamadas 'Knuckerholes' que según los aldeanos no tenían fondo. Salía de noche a alimentarse de ganado hasta que un joven astuto lo venció ofreciéndole un pastel gigante.",
    svgType: "wyrm", colorPrimary: "#006064", colorSecondary: "#80deea", glowColor: "#00e5ff"
  },
  {
    id: 49, name: "Dragón Blanco Sajón", title: "El Rival de las Nieblas", mythology: "Celta y Británica", type: "Draco", element: "Hielo", danger: 4,
    habitat: "Colinas Chalk Cliffs de Dover", ability: "Aliento Glacial y Vuelo Nocturno", weakness: "El Fuego del Dragón Rojo",
    scroll: "En las profecías del mago Merlín, el Dragón Blanco luchaba contra el Dragón Rojo en un duelo subterráneo que sacudía los cimientos de Gran Bretaña.",
    svgType: "draco", colorPrimary: "#eceff1", colorSecondary: "#90a4ae", glowColor: "#ffffff"
  },
  {
    id: 50, name: "Linton Worm", title: "El Enroscado de las Colinas Escocesas", mythology: "Celta y Británica", type: "Wyrm", element: "Tierra", danger: 4,
    habitat: "Colina de Linton Hill (Escocia)", ability: "Constricción de Roble y Peste de Aliento", weakness: "Lanzas con Punta de Turba Encendida",
    scroll: "Un dragón serpiente que se enroscaba alrededor de una colina escocesa, destruyendo las cosechas con su aliento venenoso. Fue derrotado por el héroe Laird de Lariston usando una lanza incandescente.",
    svgType: "wyrm", colorPrimary: "#3e2723", colorSecondary: "#bcaaa4", glowColor: "#d7ccc8"
  },
  {
    id: 51, name: "Lambton Worm", title: "La Serpiente del Río Wear", mythology: "Celta y Británica", type: "Wyrm", element: "Agua", danger: 4,
    habitat: "Condado de Durham", ability: "Regeneración de Cuerpo Cortado y Abrazo Asfixiante", weakness: "Armaduras con Espinas de Acero",
    scroll: "Cuenta la historia que este dragón podía volver a juntar sus partes si lo cortaban a la mitad. Lord Lambton tuvo que vestir una armadura llena de cuchillas afiladas y luchar dentro del río para vencerlo.",
    svgType: "wyrm", colorPrimary: "#1a237e", colorSecondary: "#8c9eff", glowColor: "#536dfe"
  },
  {
    id: 52, name: "Gurvelen", title: "El Dragón del Lago Celta", mythology: "Celta y Británica", type: "Shen", element: "Agua", danger: 3,
    habitat: "Lough Gur (Irlanda)", ability: "Encantamiento de Niebla Dorada", weakness: "Trébol de Cuatro Hojas",
    scroll: "Un dragón pacífico que salía a la superficie del lago durante las noches de luna llena para cantar melodías mágicas a las criaturas del bosque.",
    svgType: "shen", colorPrimary: "#1b5e20", colorSecondary: "#a5d6a7", glowColor: "#b2ff59"
  },
  {
    id: 53, name: "Tarasque de Provenza", title: "El Monstruo de Caparazón de Espinas", mythology: "Europea Continental", type: "Drake", element: "Tierra", danger: 4,
    habitat: "Río Ródano", ability: "Caparazón de Tortuga Espinosa y Cola de Escorpión", weakness: "Cantos de Paz y Agua Bendita",
    scroll: "Poseía seis patas cortas pero potentes, un cuerpo protegido por un caparazón de espinas de tortuga y una cabeza de león con orejas de caballo. Fue amansado por Santa Marta con una oración suave.",
    svgType: "draco", colorPrimary: "#558b2f", colorSecondary: "#f57f17", glowColor: "#c0ca33"
  },
  {
    id: 54, name: "Longwitton Dragon", title: "El Dragón Invisible de Northumberland", mythology: "Celta y Británica", type: "Wyvern", element: "Sombra", danger: 4,
    habitat: "Pozos de Longwitton", ability: "Invisibilidad Total y Aliento helado", weakness: "Ver su Propia Sombra reflejada",
    scroll: "Este dragón tenía la extraña habilidad de volverse completamente invisible a voluntad. Solo se podía saber dónde estaba por los rastros de hierba aplastada que dejaba al caminar.",
    svgType: "wyvern", colorPrimary: "#263238", colorSecondary: "#78909c", glowColor: "#b0bec5"
  },
  {
    id: 55, name: "Cuélebre de Asturias", title: "El Guardián de los Tesoros Escondidos", mythology: "Celta y Británica", type: "Wyvern", element: "Fuego", danger: 4,
    habitat: "Cuevas del Mar Cantábrico", ability: "Escamas de Diamante Imparables y Ojos de Fuego", weakness: "Pan con Alfileres o Maza Encendida",
    scroll: "Dragón con alas de murciélago y escamas tan duras que ninguna espada de acero podía atravesarlas. Solo envejecía cuando se retiraba al fondo del mar a cuidar sus riquezas.",
    svgType: "wyvern", colorPrimary: "#b71c1c", colorSecondary: "#ffb74d", glowColor: "#ff9100"
  },

  // 6. ESLAVA Y ESTE DE EUROPA (10)
  {
    id: 56, name: "Zmey Gorynych", title: "El Dragón Tres Cabezas de las Montañas de Kiev", mythology: "Eslava y Este de Europa", type: "Hidra", element: "Fuego", danger: 5,
    habitat: "Montañas de Ceniza de Ucrania y Rusia", ability: "Fuego Tripartito y Garras de Cobre", weakness: "El Látigo Mágico del Héroe Dobrynya",
    scroll: "El dragón más famoso del folclore eslava. Posee tres cabezas que escupen fuego independientemente, alas de cuero negro y camina en dos patas potentes haciendo sonar sus garras de cobre.",
    svgType: "hidra", colorPrimary: "#3e2723", colorSecondary: "#ff3d00", glowColor: "#ff6e40"
  },
  {
    id: 57, name: "Balaur", title: "El Dragón de Siete Cabezas y Aletas Finas", mythology: "Eslava y Este de Europa", type: "Hidra", element: "Tormenta", danger: 5,
    habitat: "Valles del Danubio", ability: "Creación de Granizo y Huracanes", weakness: "La Espada Encantada de Făt-Frumos",
    scroll: "Un dragón gigantesco de la mitología rumana con siete cabezas. Cuando abría las siete bocas a la vez, creaba un arcoíris tóxico que atraía las tormentas y la niebla hacia los pueblos.",
    svgType: "hidra", colorPrimary: "#1a237e", colorSecondary: "#00e5ff", glowColor: "#18ffff"
  },
  {
    id: 58, name: "Zirnitra", title: "El Dragón Mágico de la Hechicería", mythology: "Eslava y Este de Europa", type: "Draco", element: "Sombra", danger: 4,
    habitat: "Bosques Negros de Pomerania", ability: "Chispa de Magia Oscura e Ilusión", weakness: "Amuletos de Plata Pura",
    scroll: "Venerado por los antiguos hechiceros como el dios dragón de la magia. Sus escamas de color azul noche resplandecían con símbolos rúnicos antiguos al lanzar sus hechizos.",
    svgType: "draco", colorPrimary: "#0d47a1", colorSecondary: "#ea80fc", glowColor: "#e040fb"
  },
  {
    id: 59, name: "Smok Wawelski", title: "El Dragón de la Cueva del Vístula", mythology: "Eslava y Este de Europa", type: "Draco", element: "Fuego", danger: 4,
    habitat: "Colina de Wawel (Cracovia)", ability: "Llamaradas Devoradoras y Terremoto de Paso", weakness: "Oveja Rellena de Azufre",
    scroll: "Habitaba en una cueva debajo del castillo de Wawel en Cracovia. Exigía tributos semanales de ganado hasta que el ingenioso zapatero Skuba le ofreció una piel de oveja cargada de azufre.",
    svgType: "draco", colorPrimary: "#bf360c", colorSecondary: "#ffab91", glowColor: "#ff6e40"
  },
  {
    id: 60, name: "Zilant", title: "El Dragón Coronado de Kazán", mythology: "Oriental (Asia)", type: "Wyvern", element: "Fuego", danger: 3,
    habitat: "Lago Kaban (Rusia)", ability: "Corona del Rey Dragón y Vuelo Ágil", weakness: "Hierbas de Ajenjo Sagrado",
    scroll: "Un wyvern hermoso que ostenta una corona de oro sobre su cabeza y patas de gallo mágico. Es el símbolo oficial de la ciudad de Kazán en la actualidad.",
    svgType: "wyvern", colorPrimary: "#1b5e20", colorSecondary: "#ffd700", glowColor: "#ffeb3b"
  },
  {
    id: 61, name: "Kulshedra", title: "La Tormenta Encarnada", mythology: "Eslava y Este de Europa", type: "Hidra", element: "Agua", danger: 5,
    habitat: "Cavernas Subterráneas de Albania", ability: "Secado de Manantiales y Terremotos Fluviales", weakness: "El Dragón Benigno (Drangue)",
    scroll: "Una serpiente dragón hembra de nueve cabezas que causaba sequías terribles al tragarse el agua de los ríos. Su enemigo natural eran los Drangue, héroes legendarios con alas ocultas.",
    svgType: "hidra", colorPrimary: "#311b92", colorSecondary: "#9575cd", glowColor: "#b388ff"
  },
  {
    id: 62, name: "Illuyanka", title: "El Dragón del Imperio Hitita", mythology: "Eslava y Este de Europa", type: "Wyrm", element: "Tierra", danger: 4,
    habitat: "Montañas de Anatolia", ability: "Robo de Fuerza Vital y Emboscada Terrestre", weakness: "Banquetes de Miel y Cerveza",
    scroll: "Un temible dragón que logró derrotar al dios del trueno en su primer enfrentamiento. Solo pudo ser atrapado cuando fue invitado a un gran banquete donde comió tanto que no pudo volver a su cueva.",
    svgType: "wyrm", colorPrimary: "#4e342e", colorSecondary: "#bcaaa4", glowColor: "#d7ccc8"
  },
  {
    id: 63, name: "Yilbegän", title: "El Dragón Multi-Cabeza de Siberia", mythology: "Eslava y Este de Europa", type: "Hidra", element: "Hielo", danger: 5,
    habitat: "Estepas Heladas de Siberia", ability: "Cabalgata de Tormentas de Nieve y 6 u 9 Cabezas", weakness: "Calor Intenso de Forja",
    scroll: "Monstruo de muchas cabezas que montaba un buey negro de 9 cuernos por las estepas heladas. Su piel era tan fría que congelaba el agua a su paso.",
    svgType: "hidra", colorPrimary: "#006064", colorSecondary: "#e0f7fa", glowColor: "#80deea"
  },
  {
    id: 64, name: "Chuvash Yish", title: "El Dragón Volador de Fuego", mythology: "Oriental (Asia)", type: "Ampithere", element: "Fuego", danger: 3,
    habitat: "Bosques del Volga", ability: "Transformación en Meteriorito y Lluvia de Chispas", weakness: "Oraciones de Abuelas del Pueblo",
    scroll: "Se creía que este dragón caía del cielo como un meteorito ardiente y se transformaba al tocar tierra en una persona apacible que ayudaba a las granjas.",
    svgType: "ampithere", colorPrimary: "#e65100", colorSecondary: "#ffe0b2", glowColor: "#ffb74d"
  },
  {
    id: 65, name: "Cacus", title: "El Gigante Dragón de los Fuegos del Aventino", mythology: "Eslava y Este de Europa", type: "Drake", element: "Fuego", danger: 4,
    habitat: "Monte Aventino (Roma)", ability: "Vómito de Humo Denso y Fuego Voraz", weakness: "La Fuerza Titánica de Hércules",
    scroll: "Un monstruo medio dragón que habitaba una cueva llena de tesoros robados en la colina del Aventino. Expulsaba torbellinos de humo negro para ocultar sus robos.",
    svgType: "draco", colorPrimary: "#212121", colorSecondary: "#d32f2f", glowColor: "#ff5252"
  },

  // 7. MESOPOTÁMICA, PERSA Y EGIPCIA (10)
  {
    id: 66, name: "Tiamat", title: "La Diosa Primordial del Caos Caótico", mythology: "Mesopotámica y Medio Oriente", type: "Hidra", element: "Agua", danger: 5,
    habitat: "El Océano Primordial de Sal", ability: "Creación de Legiones de Monstruos y Olas Cosmicas", weakness: "Las Cuatro Flechas de Viento de Marduk",
    scroll: "En el mito babilónico Enūma Eliš, Tiamat es la dragona madre del océano salado. Encarnaba el caos antes de la creación del cielo y la voserra. Sus escamas contenían todas las tormentas del universo.",
    svgType: "hidra", colorPrimary: "#0d47a1", colorSecondary: "#e040fb", glowColor: "#00e5ff"
  },
  {
    id: 67, name: "Kur", title: "El Dragón del Inframundo de Sumeria", mythology: "Mesopotámica y Medio Oriente", type: "Wyrm", element: "Tierra", danger: 5,
    habitat: "El Abismo Vacío de Kur", ability: "Terremotos Primordiales y Absorción de Luz", weakness: "La Barca Dorada del Dios Enki",
    scroll: "Considerado el primer dragón registrado en las tabletas de arcilla cuneiforme de Sumeria. Habitaba entre el mundo de los vivos y el abismo sombrío.",
    svgType: "wyrm", colorPrimary: "#263238", colorSecondary: "#78909c", glowColor: "#90a4ae"
  },
  {
    id: 68, name: "Apep (Apofis)", title: "La Serpiente Devoradora del Sol", mythology: "Mesopotámica y Medio Oriente", type: "Wyrm", element: "Sombra", danger: 5,
    habitat: "Duat (El Inframundo Egipcio)", ability: "Eclipses Solares y Mirada Paralizante", weakness: "La Lanza del Dios Ra y el Gato Sagrado de Heliópolis",
    scroll: "Cada noche, el dios sol Ra viajaba en su barca solar por el inframundo. Apep intentaba tragar la barca para sumergir al mundo en la oscuridad eterna, pero Ra y Seth la defendían al amanecer.",
    svgType: "wyrm", colorPrimary: "#1b0000", colorSecondary: "#b71c1c", glowColor: "#ff1744"
  },
  {
    id: 69, name: "Azhi Dahaka", title: "El Dragón de Tres Cabezas de Persia", mythology: "Mesopotámica y Medio Oriente", type: "Hidra", element: "Veneno", danger: 5,
    habitat: "Monte Damavand", ability: "Sangre Inundada de Lagartos Venenosos", weakness: "Atado con Cadenas Mágicas por Fereydun",
    scroll: "Un demonio dragón persa con tres bocas, seis ojos y tres cabezas de serpiente. Se decía que si le cortaban el cuello, de su sangre brotarían arañas y escorpiones venenosos.",
    svgType: "hidra", colorPrimary: "#311b92", colorSecondary: "#b0bec5", glowColor: "#7c4dff"
  },
  {
    id: 70, name: "Mušḫoššu (Sirrush)", title: "El Dragón Furioso de la Puerta de Ishtar", mythology: "Mesopotámica y Medio Oriente", type: "Draco", element: "Luz", danger: 3,
    habitat: "Babilonia (Mesopotamia)", ability: "Cuerpo de León, Cuerno de Víbora y Patas de Águila", weakness: "Respeto a los Sacerdotes de Marduk",
    scroll: "El hermoso dragón tallado en azulejos de cerámica azul brillante en la Puerta de Ishtar en Babilonia. Posee patas delanteras de león, patas traseras de águila y un cuello largo de serpiente.",
    svgType: "draco", colorPrimary: "#0288d1", colorSecondary: "#ffd54f", glowColor: "#ffea00"
  },
  {
    id: 71, name: "Gandarewa", title: "El Dragón de los Mares de Oro", mythology: "Mesopotámica y Medio Oriente", type: "Shen", element: "Agua", danger: 4,
    habitat: "Océano Vourukasha", ability: "Devorador de Barcos y Talón de Hierro", weakness: "El Héroe Garshasp",
    scroll: "Un monstruo marino con garras gigantescas que intentó devorar los tesoros mágicos del océano persa. Sus escamas doradas reflejaban la luz de las estrellas.",
    svgType: "shen", colorPrimary: "#f57f17", colorSecondary: "#ffe082", glowColor: "#ffeb3b"
  },
  {
    id: 72, name: "Labbu", title: "El Dragón de Cien Leguas", mythology: "Mesopotámica y Medio Oriente", type: "Wyrm", element: "Tormenta", danger: 5,
    habitat: "Cielos Mesopotámicos", ability: "Longitud de 60 Leguas y Aliento Devastador", weakness: "El Rayo del Dios Tishpak",
    scroll: "Creado por el dios del cielo para castigar los excesos de la humanidad. Medía más de 300 kilómetros de largo y su aliento podía secar cosechas enteras en un solo día.",
    svgType: "wyrm", colorPrimary: "#37474f", colorSecondary: "#ff7043", glowColor: "#ffab91"
  },
  {
    id: 73, name: "Illuyanka Hatti", title: "El Dragón de las Rocas de Anatolia", mythology: "Mesopotámica y Medio Oriente", type: "Wyrm", element: "Tierra", danger: 3,
    habitat: "Cañones de Capadocia", ability: "Camuflaje de Piedra Caliza y Vuelo Bajo", weakness: "Agua Dulce de Lluvia",
    scroll: "Un dragón serpiente que habitaba en las chimeneas de fadas de Capadocia. Se mimetizaba con las rocas porosas hasta confundirse por completo con el paisaje.",
    svgType: "wyrm", colorPrimary: "#8d6e63", colorSecondary: "#d7ccc8", glowColor: "#efebe9"
  },
  {
    id: 74, name: "Shedu Serpiente", title: "El Guardián Alado del Palacio", mythology: "Mesopotámica y Medio Oriente", type: "Ampithere", element: "Luz", danger: 3,
    habitat: "Palacio de Nínive", ability: "Protección Divina contra el Mal", weakness: "Destrucción de las Runas de la Entrada",
    scroll: "Un dragón protector tallado a la entrada de los palacios reales asirios para espantar a los espíritus malvados con su sola mirada severa.",
    svgType: "ampithere", colorPrimary: "#ffb300", colorSecondary: "#fff8e1", glowColor: "#ffe082"
  },
  {
    id: 75, name: "Bahamut Abisal", title: "El Dragón Pez Apoyo del Mundo", mythology: "Mesopotámica y Medio Oriente", type: "Shen", element: "Agua", danger: 4,
    habitat: "El Mar del Infinito", ability: "Sostén del Universo y Maremotos de Luz", weakness: "Imposible de Enfrentar por Mortales",
    scroll: "Un pez-dragón de proporciones tan gigantescas que sobre su lomo sostiene a un toro místico, una montaña de rubí y todos los cielos del cosmos.",
    svgType: "shen", colorPrimary: "#00838f", colorSecondary: "#e0f7fa", glowColor: "#80deea"
  },

  // 8. HINDÚ Y SUDESTE ASIÁTICO (8)
  {
    id: 76, name: "Vritra", title: "El Dragón Bloqueador de los Ríos", mythology: "Hindú y Sudeste Asiático", type: "Wyrm", element: "Tierra", danger: 5,
    habitat: "Montañas del Indo", ability: "Absorción de Todas las Aguas del Mundo y Sequía", weakness: "El Rayo Vajra del Dios Indra",
    scroll: "En los textos del Rigveda, Vritra era el Asura dragón que encerró a los 99 ríos del mundo dentro de su vientre causando la primera gran sequía de la humanidad.",
    svgType: "wyrm", colorPrimary: "#4e342e", colorSecondary: "#ff6f00", glowColor: "#ffab00"
  },
  {
    id: 77, name: "Kaliya", title: "El Dragón Venenoso de Cinco Cabezas", mythology: "Hindú y Sudeste Asiático", type: "Hidra", element: "Veneno", danger: 4,
    habitat: "Río Yamuna (Vrindavan)", ability: "Agua Hierve con Veneno y Cinco Capuchas de Cobra", weakness: "La Danza Divina del Joven Krishna",
    scroll: "Una serpiente dragón de cinco cabezas que envenenaba las aguas del río Yamuna. Krishna subió a sus cabezas y ejecutó una danza cósmica hasta amansarla y pedirle que nadara pacíficamente hacia el océano.",
    svgType: "hidra", colorPrimary: "#004d40", colorSecondary: "#a7ffeb", glowColor: "#18ffff"
  },
  {
    id: 78, name: "Phaya Naga", title: "El Dragón del Río Mekong", mythology: "Hindú y Sudeste Asiático", type: "Shen", element: "Fuego", danger: 3,
    habitat: "Río Mekong", ability: "Bolas de Fuego del Mekong y Bendición Fluvial", weakness: "Falta de Respeto al Río",
    scroll: "Se cree que habita en las profundidades del río Mekong. Cada año a finales de octubre se observa el fenómeno de las 'Bolas de Fuego del Naga', luces incandescentes que suben desde el agua hacia el cielo.",
    svgType: "shen", colorPrimary: "#c62828", colorSecondary: "#ffe082", glowColor: "#ffd54f"
  },
  {
    id: 79, name: "Bakunawa", title: "El Devorador de Lunas de Filipinas", mythology: "Hindú y Sudeste Asiático", type: "Wyrm", element: "Sombra", danger: 5,
    habitat: "Cielos de Visayas", ability: "Causa Eclipses Lunares Tragándose la Luna", weakness: "Ruido de Tambores y Ollas de Metal golpeadas",
    scroll: "Un gigantesco dragón marino de Filipinas con boca tan ancha como el horizonte. Se enamoró de las siete lunas del cielo y comenzó a comérselas una por una hasta que los pobladores aprendieron a hacer tanto ruido con ollas que las escupía de susto.",
    svgType: "wyrm", colorPrimary: "#1a237e", colorSecondary: "#e040fb", glowColor: "#ea80fc"
  },
  {
    id: 80, name: "Makara Dragón", title: "El Monstruo Acuático Vehículo de las Diosas", mythology: "Hindú y Sudeste Asiático", type: "Drake", element: "Agua", danger: 3,
    habitat: "Ríos Sagrados de India", ability: "Cuerpo de Cocodrilo, Trompa de Elefante y Cola de Dragón", weakness: "Redes Sagradas de Seda",
    scroll: "Criatura mítica que combina la cabeza de cocodrilo o dragón con cuerpo de pez y trompa de elefante. Es la montura sagrada de la diosa del río Ganga.",
    svgType: "draco", colorPrimary: "#00695c", colorSecondary: "#80cbc4", glowColor: "#80e27e"
  },
  {
    id: 81, name: "Naga Vasuki", title: "El Rey Dragón de la Cuerda Cósmica", mythology: "Hindú y Sudeste Asiático", type: "Shen", element: "Luz", danger: 4,
    habitat: "Cuello del Dios Shiva", ability: "Batido del Océano de Leche y Resistencia Divina", weakness: "Garuḍa el Ave Celestial",
    scroll: "Utilizado por los devas y asuras como cuerda gigantesca alrededor del Monte Mandara para batir el océano de leche y extraer el elíxir de la inmortalidad.",
    svgType: "shen", colorPrimary: "#ff6f00", colorSecondary: "#fff3e0", glowColor: "#ffe082"
  },
  {
    id: 82, name: "Antaboga", title: "El Dragón de la Tierra de Bali", mythology: "Hindú y Sudeste Asiático", type: "Wyrm", element: "Tierra", danger: 3,
    habitat: "Profundidades del Monte Agung", ability: "Meditación Cósmica y Creación de la Tortuga Bedawang", weakness: "Ruidos Estridentes",
    scroll: "En la mitología de Bali, Antaboga creó a la tortuga gigante Bedawang sobre la cual descansa toda la isla de Bali.",
    svgType: "wyrm", colorPrimary: "#4e342e", colorSecondary: "#a1887f", glowColor: "#bcaaa4"
  },
  {
    id: 83, name: "Taxaka", title: "El Dragón Rey de las Serpientes de Takshashila", mythology: "Hindú y Sudeste Asiático", type: "Wyrm", element: "Veneno", danger: 4,
    habitat: "Bosque de Khandava", ability: "Vuelo de Veneno y Transformación en Humano", weakness: "El Sacrificio de Serpientes de Janamejaya",
    scroll: "Mencionando en el Mahabharata como el astuto rey de las serpientes dragón que podía cambiar de forma a voluntad para proteger a su pueblo.",
    svgType: "wyrm", colorPrimary: "#2e7d32", colorSecondary: "#a5d6a7", glowColor: "#c8e6c9"
  },

  // 9. LEYENDAS MEDIEVALES DE EUROPA (10)
  {
    id: 84, name: "Dragón de San Jorge", title: "El Terror de la Villa de Silene", mythology: "Europea Continental", type: "Draco", element: "Fuego", danger: 4,
    habitat: "Laguna de Silene (Libia / Europa Medieval)", ability: "Aliento de Pestilencia y Escamas Afiladas", weakness: "La Lanza Asalon de San Jorge y la Cruz Bendita",
    scroll: "El dragón más célebre de los cuentos de caballería medievales. Aterrorizaba a un reino pidiendo raciones diarias hasta que el caballero San Jorge lo enfrentó para salvar a la princesa.",
    svgType: "draco", colorPrimary: "#b71c1c", colorSecondary: "#ffe082", glowColor: "#ffb74d"
  },
  {
    id: 85, name: "Peluda de Maine", title: "La Bestia del Río Huisne", mythology: "Europea Continental", type: "Drake", element: "Agua", danger: 4,
    habitat: "Río Huisne (Francia)", ability: "Lanzamiento de Púas Venenosas y Maremoto de Río", weakness: "Corte Preciso en la Cola",
    scroll: "Un extraño dragón cubierto de pelaje verde lleno de púas venenosas del tamaño de jabalinas. Se refugiaba en el río y podía disparar sus púas como si fueran flechas.",
    svgType: "draco", colorPrimary: "#33691e", colorSecondary: "#76ff03", glowColor: "#b2ff59"
  },
  {
    id: 86, name: "Basilisco de Vilna", title: "El Rey de la Mirada Mortal", mythology: "Eslava y Este de Europa", type: "Basilisco", element: "Veneno", danger: 5,
    habitat: "Catacumbas de Vilna", ability: "Petrificación con la Mirada y Aliento Secante", weakness: "Un Espejo que Refleje su Propia Mirada",
    scroll: "Nacido de un huevo de gallina empollado por un sapo bajo una estrella de mal agüero. Podía petrificar a cualquier criatura viva con tan solo mirarla a los ojos.",
    svgType: "basilisco", colorPrimary: "#1b5e20", colorSecondary: "#eeff41", glowColor: "#c0ca33"
  },
  {
    id: 87, name: "Cocatriz de Hampshire", title: "El Dragón con Cabeza de Gallo", mythology: "Celta y Británica", type: "Basilisco", element: "Viento", danger: 4,
    habitat: "Pueblo de Wherwell", ability: "Canto Paralizante y Vuelo Ágil", weakness: "El Canto de un Gallo Real",
    scroll: "Un mítico ser con cuerpo de wyvern y cabeza de gallo de plumas incandescentes. Su solo aliento marchitaba las flores y hacía tropezar a los caballos de los caballeros.",
    svgType: "basilisco", colorPrimary: "#e65100", colorSecondary: "#ffecb3", glowColor: "#ffe082"
  },
  {
    id: 88, name: "Gargola de Ruan", title: "El Dragón de los Pantanos del Sena", mythology: "Europea Continental", type: "Wyrm", element: "Agua", danger: 4,
    habitat: "Río Sena (Francia)", ability: "Chorros de Agua Hirviendo y Destrucción de Cultivos", weakness: "El Santo de Ruan (San Román)",
    scroll: "Un dragón alargado con alas cortas que escupía enormes caudales de agua para inundar los campos. Su nombre dio origen a las esculturas de agua en los tejados de las catedrales.",
    svgType: "wyrm", colorPrimary: "#37474f", colorSecondary: "#80deea", glowColor: "#80d8ff"
  },
  {
    id: 89, name: "Herensuge Vasco", title: "El Dragón de Siete Cabezas de los Pirineos", mythology: "Europea Continental", type: "Hidra", element: "Fuego", danger: 5,
    habitat: "Cuevas de los Pirineos", ability: "Vuelo Estelar y Fuego Devorador", weakness: "Suena la Campana de San Miguel",
    scroll: "Legendario dragón vasco que volaba echando llamas por las siete bocas. Atraía a los viajeros cantando con un tono hipnótico entre los desfiladeros de la montaña.",
    svgType: "hidra", colorPrimary: "#4e342e", colorSecondary: "#ff3d00", glowColor: "#ff9100"
  },
  {
    id: 90, name: "Bisu de Cerdeña", title: "El Dragón Somnoliento de las Torres", mythology: "Europea Continental", type: "Draco", element: "Sombra", danger: 2,
    habitat: "Ruinas Nurágicas de Cerdeña", ability: "Canto de Dulces Sueños", weakness: "Ruidos Fuertes de Campanas",
    scroll: "Un pequeño dragón pacífico que vive en las antiguas torres Nuraghes de Cerdeña. Se pasa el día durmiendo al sol y soñando con estrellas de colores.",
    svgType: "draco", colorPrimary: "#4a148c", colorSecondary: "#d1c4e9", glowColor: "#b388ff"
  },
  {
    id: 91, name: "Guivre de Borgoña", title: "El Dragón de los Viñedos Franceses", mythology: "Europea Continental", type: "Wyrm", element: "Veneno", danger: 3,
    habitat: "Bosques de Borgoña", ability: "Picadura Ácida y Vuelo Deslizado", weakness: "Ver a una Persona Sin Miedo",
    scroll: "Tenía un cuerpo largo de serpiente con alas de murciélago y cuernos de ciervo. Huía a toda velocidad si alguien lo miraba fijamente a los ojos sin mostrar una gota de temor.",
    svgType: "wyrm", colorPrimary: "#1b5e20", colorSecondary: "#ccff90", glowColor: "#b2ff59"
  },
  {
    id: 92, name: "Vouivre de los Alpes", title: "La Dama Dragón del Carbúnculo Rojo", mythology: "Europea Continental", type: "Wyvern", element: "Luz", danger: 3,
    habitat: "Lagos de los Alpes", ability: "La Gema Carbúnculo de la Frente (Resplandor Sol)", weakness: "Robar la Gema cuando se Baña en el Lago",
    scroll: "Lleva en la frente una piedra preciosa roja brillante llamada 'Carbúnculo' que ilumina las montañas en las noches frías. Cuando se baña en el agua cristalina del lago, deja la gema en la orilla.",
    svgType: "wyvern", colorPrimary: "#b71c1c", colorSecondary: "#ffd700", glowColor: "#ffff00"
  },
  {
    id: 93, name: "Dragón de la Cueva de Drachenfels", title: "El Dragón del Río Rhin", mythology: "Nórdica y Germánica", type: "Draco", element: "Fuego", danger: 4,
    habitat: "Roca de Drachenfels (Alemania)", ability: "Aliento de Fuego Volcánico y Escamas de Hierro", weakness: "La Espada Balmung del Héroe Sigfrido",
    scroll: "Vivía en una caverna sobre el río Rhin exigiendo ofrendas. El héroe Sigfrido lo derrotó y al bañarse en la sangre del dragón obtuvo una piel impenetrable.",
    svgType: "draco", colorPrimary: "#212121", colorSecondary: "#ff6f00", glowColor: "#ff9100"
  },

  // 10. FANTASÍA MÍTICA DEL SANTUARIO (7)
  {
    id: 94, name: "Dragón Astral del Cosmos", title: "El Tejedor de las Constelaciones", mythology: "Leyenda del Santuario", type: "Ampithere", element: "Luz", danger: 5,
    habitat: "Órbita de las Estrellas Fugaces", ability: "Polvo de Galaxias y Rayo Cósmico", weakness: "Ninguna conocida por los mortales",
    scroll: "Un dragón místico cuyas alas transparentes contienen mapas de galaxias lejanas. Vuela en el espacio profundo encendiendo las estrellas fugaces que piden los chicos por las noches.",
    svgType: "ampithere", colorPrimary: "#4a148c", colorSecondary: "#00e5ff", glowColor: "#18ffff"
  },
  {
    id: 95, name: "Dragón de Magma Ancestral", title: "El Guardián del Núcleo de la Tierra", mythology: "Leyenda del Santuario", type: "Draco", element: "Magma", danger: 5,
    habitat: "Núcleo Fundido del Planeta", ability: "Tsunami de Lava y Piel de Obsidiana Candente", weakness: "Hielo Estelar",
    scroll: "Duerma placidamente cerca del centro de la Tierra. Cuando bosteza, los volcanes del mundo expulsan chispas de luz dorada y piedras brillantes.",
    svgType: "draco", colorPrimary: "#bf360c", colorSecondary: "#ffab91", glowColor: "#ff6e40"
  },
  {
    id: 96, name: "Dragón de Cristal de Aurora", title: "El Reflejo de las Luces Polares", mythology: "Leyenda del Santuario", type: "Draco", element: "Cristal", danger: 3,
    habitat: "Polos de Hielo Eterno", ability: "Prisma de Colores y Rayo Espejo", weakness: "Oscuridad Absoluta",
    scroll: "Sus escamas son cristales de cuarzo puro que descomponen la luz del sol en los hermosos colores violeta, verde y rosa de la aurora boreal.",
    svgType: "draco", colorPrimary: "#00b0ff", colorSecondary: "#ea80fc", glowColor: "#e040fb"
  },
  {
    id: 97, name: "Dragón del Abismo de Sombras", title: "El Caminante de los Sueños Secretos", mythology: "Leyenda del Santuario", type: "Wyrm", element: "Sombra", danger: 4,
    habitat: "Dimensión del Crepúsculo", ability: "Paso Incorpóreo y Esfumado de Humo", weakness: "Luz de la Linterna de Oro",
    scroll: "Se desliza suavemente por las sombras sin hacer ruido. Le gusta proteger los sueños de los niños ahuyentando las pesadillas con sus cuernos de plata.",
    svgType: "wyrm", colorPrimary: "#1a162b", colorSecondary: "#9c27b0", glowColor: "#d500f9"
  },
  {
    id: 98, name: "Dragón de la Tormenta Solar", title: "La Chispa del Sol Radiante", mythology: "Leyenda del Santuario", type: "Ampithere", element: "Rayo", danger: 4,
    habitat: "Corona Solar", ability: "Llamarada Solar y Vuelo a Velocidad Luz", weakness: "Niebla de Cometa Helado",
    scroll: "Un dragón majestuoso compuesto de energía pura de helio e hidrógeno. Vuela alrededor del sol jugando con las llamaradas solares.",
    svgType: "ampithere", colorPrimary: "#ff6f00", colorSecondary: "#ffff00", glowColor: "#ffff8d"
  },
  {
    id: 99, name: "Dragón Fénix de Esmeralda", title: "El Renacido de las Hojas Ancestrales", mythology: "Leyenda del Santuario", type: "Ampithere", element: "Naturaleza", danger: 3,
    habitat: "Bosque Mágico Inexplorado", ability: "Brote de Plantas Gigantes y Renacimiento de Semilla", weakness: "Fuego de Carbón",
    scroll: "Cuando envejece, se convierte en un brote verde brillante de árbol del que nace un dragón joven y vibrante lleno de energía para renovar los bosques.",
    svgType: "ampithere", colorPrimary: "#1b5e20", colorSecondary: "#b2ff59", glowColor: "#69f0ae"
  },
  {
    id: 100, name: "Dragón de Runas Antiguas", title: "El Sabio Eterno del Santuario", mythology: "Leyenda del Santuario", type: "Shen", element: "Luz", danger: 5,
    habitat: "Biblioteca Secreta del Santuario", ability: "Conocimiento de Todos los Idiomas y Aliento de Sabiduría", weakness: "El Olvido",
    scroll: "El dragón guardián supremo de esta enciclopedia. Lleva inscritas en sus escamas las historias de los 100 dragones del mundo y da la bienvenida a todos los jóvenes guardianes que desean aprender sobre la grandeza de los dragones.",
    svgType: "shen", colorPrimary: "#ffd700", colorSecondary: "#ffffff", glowColor: "#ffeb3b"
  }
];

const MYTHOLOGIES = [
  "Todas", "Nórdica", "Griega", "Romana", "China", "Japonesa", "Coreana", "Tibetana / Bhutanés",
  "Azteca / Meca", "Azteca", "Maya", "Inca", "Mapuche", "Chilena", "Guaraní / Amazónica",
  "K'iche' / Maya", "Celta", "Británica", "Escocesa", "Irlandesa", "Francesa / Celta",
  "Asturiana / Celta", "Eslava", "Rumana", "Eslava Wenda", "Polaca", "Tártara / Rusa",
  "Albana", "Hitita / Eslava Antigua", "Turca / Eslava", "Chuvash", "Babilónica", "Sumeria",
  "Egipcia", "Persa", "Asiria / Babilónica", "Hitita", "Asiria", "Árabe / Mesopotámica",
  "Hindú / Védica", "Hindú", "Tailandesa / Laosiana", "Filipina", "Balinesa / Indonesia",
  "Medieval Europea", "Francesa Medieval", "Lituana / Europea", "Inglesa Medieval",
  "Francesa", "Vasca", "Italiana / Sarda", "Suiza / Francesa", "Alemana Medieval", "Leyenda del Santuario"
];

const ELEMENTS = [
  "Todos", "Fuego", "Hielo", "Rayo", "Veneno", "Sombra", "Luz", "Magma", "Naturaleza", "Agua", "Viento", "Tierra", "Tormenta", "Cristal"
];

const TYPES = [
  "Todos", "Draco", "Wyvern", "Wyrm", "Shen", "Hidra", "Ampithere", "Drake", "Basilisco"
];

function renderDragonSVG(dragon, width = 300, height = 240) {
  const { svgType = "draco", colorPrimary = "#c8553d", colorSecondary = "#e9c46a", glowColor = "#2a9d8f", id = 1, name = "" } = dragon;

  const outline = "#12111c";
  
  const palette = [
    "#e9c46a", // Mustard
    "#2a9d8f", // Teal
    "#c8553d", // Rust
    "#b23a3a", // Faded Red
    "#d4a373", // Pale Clay
    "#264653"  // Deep Slate
  ];

  const seed1 = (id * 17) % 5;
  const seed2 = (id * 31) % 4;
  const seed3 = (id * 47) % 3;

  const bodyColor = colorPrimary || palette[id % palette.length];
  const accentColor = colorSecondary || palette[(id + 2) % palette.length];
  const secondaryAccent = palette[(id + 4) % palette.length];

  let paths = "";

  let headPolygon = "";
  if (seed1 === 0) headPolygon = "210,80 295,40 280,95 230,115 200,90";
  else if (seed1 === 1) headPolygon = "215,70 285,55 295,95 220,110 205,85";
  else if (seed1 === 2) headPolygon = "205,85 275,35 290,75 240,110 195,95";
  else if (seed1 === 3) headPolygon = "220,75 300,60 270,105 225,115 210,95";
  else headPolygon = "210,80 280,45 285,90 235,110 205,90";

  let eyeMarkup = "";
  if (seed2 === 0) {
    eyeMarkup = `
      <polygon points="238,55 258,52 260,70 240,73" fill="#ffffff" stroke="${outline}" stroke-width="3" />
      <rect x="248" y="58" width="5" height="10" fill="#12111c" />
      <path d="M 234 50 L 264 45" stroke="${outline}" stroke-width="5" stroke-linecap="square" />
    `;
  } else if (seed2 === 1) {
    eyeMarkup = `
      <polygon points="232,50 252,48 254,68 234,70" fill="#ffffff" stroke="${outline}" stroke-width="3" />
      <rect x="240" y="53" width="7" height="12" fill="#12111c" />
      <polygon points="258,45 272,42 274,58 260,60" fill="#ffffff" stroke="${outline}" stroke-width="3" />
      <rect x="264" y="47" width="4" height="8" fill="#12111c" />
      <path d="M 228 42 L 278 35" stroke="${outline}" stroke-width="5" stroke-linecap="square" />
    `;
  } else {
    eyeMarkup = `
      <polygon points="235,58 260,54 262,70 237,73" fill="#ffffff" stroke="${outline}" stroke-width="3" />
      <line x1="235" y1="63" x2="260" y2="59" stroke="${outline}" stroke-width="4" />
      <rect x="246" y="64" width="6" height="5" fill="#12111c" />
    `;
  }

  let toothMarkup = "";
  if (seed3 === 0) toothMarkup = `<polygon points="265,95 273,112 280,93" fill="#ffffff" stroke="${outline}" stroke-width="3" />`;
  else if (seed3 === 1) toothMarkup = `<polygon points="250,98 256,114 262,96" fill="#ffffff" stroke="${outline}" stroke-width="3" /><polygon points="270,92 276,108 282,90" fill="#ffffff" stroke="${outline}" stroke-width="3" />`;
  else toothMarkup = `<polygon points="272,90 282,106 288,88" fill="#ffffff" stroke="${outline}" stroke-width="3" />`;

  switch (svgType) {
    case "wyrm":
      paths = `
        <polygon points="40,210 180,225 260,205 120,200" fill="rgba(18, 17, 28, 0.3)" />
        <path d="M 35 185 L 85 220 L 145 170 L 195 195 L 245 130 L 225 75 L 155 45 L 115 85 L 135 125 L 85 145 Z" fill="${bodyColor}" stroke="${outline}" stroke-width="6" stroke-linejoin="miter" />
        <path d="M 45 190 L 85 215 L 140 175 L 190 190 L 235 135" fill="none" stroke="${accentColor}" stroke-width="10" stroke-linecap="square" />
        <path d="M 45 190 L 85 215 L 140 175 L 190 190 L 235 135" fill="none" stroke="${outline}" stroke-width="3" stroke-dasharray="10,8" />
        <polygon points="${headPolygon}" fill="${bodyColor}" stroke="${outline}" stroke-width="6" stroke-linejoin="miter" />
        <polygon points="225,65 245,15 240,60" fill="${accentColor}" stroke="${outline}" stroke-width="4" />
        <polygon points="238,55 275,20 255,62" fill="${secondaryAccent}" stroke="${outline}" stroke-width="4" />
        ${eyeMarkup}
        <path d="M 235 105 L 285 90" stroke="${outline}" stroke-width="5" />
        ${toothMarkup}
        <polygon points="280,85 315,75 305,95 330,85 295,105" fill="${secondaryAccent}" stroke="${outline}" stroke-width="3" />
      `;
      break;

    case "shen":
      paths = `
        <polygon points="30,195 80,180 140,210 210,185 280,210 230,225 100,220" fill="${secondaryAccent}" opacity="0.4" stroke="${outline}" stroke-width="3" />
        <path d="M 30 160 L 80 50 L 130 200 L 180 110 L 230 170 L 260 85" fill="none" stroke="${bodyColor}" stroke-width="34" stroke-linecap="square" stroke-linejoin="miter" />
        <path d="M 30 160 L 80 50 L 130 200 L 180 110 L 230 170 L 260 85" fill="none" stroke="${outline}" stroke-width="6" stroke-linecap="square" stroke-linejoin="miter" />
        <polygon points="${headPolygon}" fill="${bodyColor}" stroke="${outline}" stroke-width="6" stroke-linejoin="miter" />
        <polygon points="285,45 320,55 295,75" fill="${accentColor}" stroke="${outline}" stroke-width="4" />
        ${eyeMarkup}
        <path d="M 290 75 L 325 80 L 310 115 M 285 85 L 335 105 L 315 135" fill="none" stroke="${accentColor}" stroke-width="5" stroke-linecap="square" />
        <path d="M 290 75 L 325 80 L 310 115 M 285 85 L 335 105 L 315 135" fill="none" stroke="${outline}" stroke-width="2" stroke-linecap="square" />
      `;
      break;

    case "hidra":
      paths = `
        <polygon points="60,215 150,230 240,215 150,200" fill="rgba(18, 17, 28, 0.3)" />
        <polygon points="80,200 150,230 220,200 180,150 120,150" fill="${bodyColor}" stroke="${outline}" stroke-width="6" stroke-linejoin="miter" />
        <path d="M 100 150 L 55 90 L 70 45 L 105 60 L 125 150" fill="${bodyColor}" stroke="${outline}" stroke-width="5" stroke-linejoin="miter" />
        <polygon points="50,45 85,25 95,55 60,65" fill="${accentColor}" stroke="${outline}" stroke-width="4" />
        <rect x="62" y="38" width="10" height="10" fill="#ffffff" stroke="${outline}" stroke-width="2" />
        <rect x="65" y="40" width="4" height="6" fill="#12111c" />
        <path d="M 52 32 L 78 30" stroke="${outline}" stroke-width="4" />
        <path d="M 135 150 L 140 75 L 155 25 L 180 40 L 165 150" fill="${bodyColor}" stroke="${outline}" stroke-width="5" stroke-linejoin="miter" />
        <polygon points="140,25 185,15 175,50 135,45" fill="${bodyColor}" stroke="${outline}" stroke-width="4" />
        <polygon points="145,26 160,22 162,36 147,38" fill="#ffffff" stroke="${outline}" stroke-width="2" /><rect x="152" y="27" width="4" height="6" fill="#12111c" />
        <polygon points="163,22 176,18 178,32 165,34" fill="#ffffff" stroke="${outline}" stroke-width="2" /><rect x="170" y="23" width="4" height="6" fill="#12111c" />
        <path d="M 138 16 L 182 12" stroke="${outline}" stroke-width="4" />
        <path d="M 175 150 L 235 90 L 215 50 L 195 65 L 160 150" fill="${bodyColor}" stroke="${outline}" stroke-width="5" stroke-linejoin="miter" />
        <polygon points="205,50 245,35 235,70 195,75" fill="${secondaryAccent}" stroke="${outline}" stroke-width="4" />
        <rect x="210" y="52" width="10" height="10" fill="#ffffff" stroke="${outline}" stroke-width="2" />
        <rect x="213" y="54" width="4" height="6" fill="#12111c" />
        <path d="M 202 44 L 230 40" stroke="${outline}" stroke-width="4" />
      `;
      break;

    case "ampithere":
      paths = `
        <polygon points="50,215 150,225 250,215 150,200" fill="rgba(18, 17, 28, 0.3)" />
        <polygon points="140,120 40,25 15,80 115 135" fill="${accentColor}" stroke="${outline}" stroke-width="6" stroke-linejoin="miter" />
        <polygon points="160,120 260,25 285,80 185 135" fill="${accentColor}" stroke="${outline}" stroke-width="6" stroke-linejoin="miter" />
        <path d="M 115 110 L 35 45 M 105 120 L 45 75 M 185 110 L 265 45 M 195 120 L 255 75" stroke="${outline}" stroke-width="3" stroke-linecap="square" />
        <path d="M 95 175 L 150 215 L 205 175 L 215 130 L 150 100 L 90 130 Z" fill="${bodyColor}" stroke="${outline}" stroke-width="6" stroke-linejoin="miter" />
        <path d="M 140 100 L 140 45 L 180 50 L 165 115 Z" fill="${bodyColor}" stroke="${outline}" stroke-width="5" />
        <polygon points="180,50 225,55 175,75" fill="${secondaryAccent}" stroke="${outline}" stroke-width="4" />
        ${eyeMarkup}
      `;
      break;

    case "wyvern":
    case "basilisco":
    case "draco":
    default:
      paths = `
        <polygon points="40,215 150,230 260,215 150,195" fill="rgba(18, 17, 28, 0.3)" />
        <polygon points="130,110 40,15 10,75 115,130" fill="${accentColor}" stroke="${outline}" stroke-width="6" stroke-linejoin="miter" />
        <polygon points="160,110 250,15 285,75 175,130" fill="${accentColor}" stroke="${outline}" stroke-width="6" stroke-linejoin="miter" />
        <path d="M 105 175 L 35 205 L 15 165 L 50 155" fill="none" stroke="${bodyColor}" stroke-width="24" stroke-linecap="square" stroke-linejoin="miter" />
        <path d="M 105 175 L 35 205 L 15 165 L 50 155" fill="none" stroke="${outline}" stroke-width="6" stroke-linecap="square" stroke-linejoin="miter" />
        <polygon points="15,165 -5,145 5,185" fill="${secondaryAccent}" stroke="${outline}" stroke-width="4" />
        <polygon points="95,165 150,210 200,165 210,120 150,100 90,120" fill="${bodyColor}" stroke="${outline}" stroke-width="6" stroke-linejoin="miter" />
        <polygon points="120,130 150,185 180,130 150,110" fill="${accentColor}" stroke="${outline}" stroke-width="4" />
        <path d="M 130 110 L 120 45 L 180 35 L 210 65 L 165 100 Z" fill="${bodyColor}" stroke="${outline}" stroke-width="6" stroke-linejoin="miter" />
        <polygon points="145,40 120,5 155,30" fill="${accentColor}" stroke="${outline}" stroke-width="4" />
        <polygon points="160,38 175,0 178,35" fill="${secondaryAccent}" stroke="${outline}" stroke-width="4" />
        <polygon points="${headPolygon}" fill="${bodyColor}" stroke="${outline}" stroke-width="6" stroke-linejoin="miter" />
        ${eyeMarkup}
        <path d="M 160 72 L 215 65" stroke="${outline}" stroke-width="5" stroke-linecap="square" />
        ${toothMarkup}
        <path d="M 115 175 L 95 215 L 120 215 M 175 175 L 195 215 L 215 215" stroke="${outline}" stroke-width="6" stroke-linecap="square" stroke-linejoin="miter" />
        <polygon points="215,65 255,55 240,75 270,65 230,85" fill="${secondaryAccent}" stroke="${outline}" stroke-width="3" />
      `;
      break;
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%" class="dragon-svg-illustration">
      </defs>
      <circle cx="${width/2}" cy="${height/2}" r="${Math.min(width, height)*0.42}" fill="#13101c" stroke="#ffd700" stroke-width="2" opacity="0.6" />
      <circle cx="${width/2}" cy="${height/2}" r="${Math.min(width, height)*0.39}" fill="none" stroke="${colorSecondary}" stroke-width="1" stroke-dasharray="6,6" opacity="0.4" />
      ${paths}
    </svg>
  `;
}

// ==========================================================================
// 3. EFECTOS DE SONIDO SINTETIZADOS (WEB AUDIO API)
// ==========================================================================
let audioCtx = null;
let soundEnabled = true;

function playSound(type) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      const AudioClass = window.AudioContext || window.webkitAudioContext;
      if (AudioClass) audioCtx = new AudioClass();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    if (!audioCtx) return;

    const now = audioCtx.currentTime;

    if (type === "click") {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === "roar") {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.linearRampToValueAtTime(180, now + 0.3);
      osc.frequency.linearRampToValueAtTime(80, now + 0.8);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.8);
    } else if (type === "chime") {
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.1, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.5);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.5);
      });
    }
  } catch (e) {
    console.warn("Audio synthesis error:", e);
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  if (soundEnabled) playSound("chime");
  return soundEnabled;
}

// ==========================================================================
// 4. MOTOR DE PARTÍCULAS DE FONDO
// ==========================================================================
function initParticlesCanvas(canvasId = "particle-canvas") {
  try {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(Math.floor(width / 18), 60);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        color: "rgba(255, 215, 0, ",
        alpha: Math.random() * 0.6 + 0.2,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.6 - 0.2
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.fill();
      }
      requestAnimationFrame(render);
    }
    render();
  } catch (e) {
    console.warn("Particles canvas init error:", e);
  }
}

// ==========================================================================
// 5. CREADOR INTERACTIVO ("LA FORJA DE DRAGONES")
// ==========================================================================
const CREATOR_STATE = {
  dragonName: "Draco del Alba",
  dragonTitle: "El Guardián Supremo",
  bodyType: "draco",
  hornStyle: "horns-classic",
  wingStyle: "wings-bat",
  auraStyle: "aura-fire",
  colorPrimary: "#c8553d",
  colorSecondary: "#e9c46a",
  eyeColor: "#2a9d8f",
  element: "Fuego"
};

function initDragonCreator(containerId = "creator-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="creator-grid">
      <div class="creator-preview-card fantasy-panel text-center" style="display: flex; flex-direction: column; gap: 1rem;">
        <div class="quiz-step-tag">🔥 Forja Viva del Santuario 🔥</div>
        <h3 class="panel-title" style="margin: 0; color: var(--gold-main); font-size: 1.6rem;">Visualizador de Tu Dragón Legendario</h3>
        
        <div class="preview-stage" id="creator-preview-stage" style="width: 100%; min-height: 320px; background: rgba(10,9,17,0.9); border: 2px solid var(--gold-main); border-radius: 16px; padding: 1rem; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: var(--shadow-gold);"></div>

        <div class="dragon-naming-box fantasy-panel" style="padding: 1rem; text-align: left; background: rgba(0,0,0,0.4); border-radius: 12px; margin-top: 0.5rem;">
          <label style="font-weight: 700; color: var(--gold-main); display: block; font-size: 0.95rem;">Nombre de tu Dragón:</label>
          <div class="input-with-button" style="display: flex; gap: 8px; margin-top: 6px;">
            <input type="text" id="creator-name-input" value="${CREATOR_STATE.dragonName}" maxlength="22" style="flex: 1; padding: 10px 14px; background: rgba(0,0,0,0.6); border: 1px solid var(--border-panel); color: #fff; border-radius: 8px; font-weight: 600; font-size: 1rem;" />
            <button class="btn btn-secondary btn-sm" id="btn-random-name" style="white-space: nowrap;">🎲 Nombre Épico</button>
          </div>

          <label style="font-weight: 700; color: var(--gold-main); display: block; margin-top: 12px; font-size: 0.95rem;">Título Legendario:</label>
          <input type="text" id="creator-title-input" value="${CREATOR_STATE.dragonTitle}" maxlength="38" style="width: 100%; padding: 10px 14px; background: rgba(0,0,0,0.6); border: 1px solid var(--border-panel); color: #fff; border-radius: 8px; margin-top: 6px; font-size: 0.95rem;" />
        </div>

        <div class="creator-actions">
          <button class="btn btn-gold btn-lg" id="btn-export-card" style="width: 100%; font-size: 1.1rem; padding: 14px; font-weight: 700;">
            📜 Descargar Tarjeta Oficial Draconiana (PNG HD)
          </button>
        </div>
      </div>

      <div class="creator-controls-card fantasy-panel" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1.2rem;">
        <h3 class="panel-title" style="color: var(--gold-main); font-size: 1.6rem; margin: 0;">🎨 Personalización de Anatomía</h3>

        <div class="control-group">
          <label class="control-label" style="font-weight: 700; font-size: 1rem;">1. Estructura Corporal:</label>
          <div class="option-chips display-flex flex-wrap gap-xs margin-top-xs" id="body-chips" style="display: flex; flex-wrap: wrap; gap: 8px;">
            <button class="chip active" data-val="draco">🐉 Draco Clásico</button>
            <button class="chip" data-val="wyvern">🦅 Wyvern Ágil</button>
            <button class="chip" data-val="shen">🐲 Shen Serpentino</button>
            <button class="chip" data-val="hidra">🐍 Multi-Cabezas</button>
          </div>
        </div>

        <div class="control-group">
          <label class="control-label" style="font-weight: 700; font-size: 1rem;">2. Estilo de Cuernos y Cresta:</label>
          <div class="option-chips display-flex flex-wrap gap-xs margin-top-xs" id="horn-chips" style="display: flex; flex-wrap: wrap; gap: 8px;">
            <button class="chip active" data-horn="horns-classic">🤘 Cuernos Clásicos</button>
            <button class="chip" data-horn="horns-ram">🐏 Cuernos de Carnero</button>
            <button class="chip" data-horn="horns-crown">👑 Corona de Espinas</button>
            <button class="chip" data-horn="horns-unicorn">🦄 Unicornio Dorado</button>
          </div>
        </div>

        <div class="control-group">
          <label class="control-label" style="font-weight: 700; font-size: 1rem;">3. Estilo de Alas:</label>
          <div class="option-chips display-flex flex-wrap gap-xs margin-top-xs" id="wing-chips" style="display: flex; flex-wrap: wrap; gap: 8px;">
            <button class="chip active" data-wing="wings-bat">🦇 Alas Membrana</button>
            <button class="chip" data-wing="wings-feather">🪶 Alas Plumadas</button>
            <button class="chip" data-wing="wings-plasma">⚡ Alas de Plasma</button>
          </div>
        </div>

        <div class="control-group">
          <label class="control-label" style="font-weight: 700; font-size: 1rem;">4. Colores de Escamas, Pecho y Ojos:</label>
          <div class="color-picker-row display-flex gap-md margin-top-xs" style="display: flex; gap: 20px; background: rgba(0,0,0,0.4); padding: 12px; border-radius: 10px; align-items: center;">
            <label style="font-size: 0.95rem; font-weight: 600;">Escamas: <input type="color" id="picker-primary" value="${CREATOR_STATE.colorPrimary}" style="cursor: pointer; border: none; background: transparent; height: 36px; width: 44px;" /></label>
            <label style="font-size: 0.95rem; font-weight: 600;">Pecho/Alas: <input type="color" id="picker-secondary" value="${CREATOR_STATE.colorSecondary}" style="cursor: pointer; border: none; background: transparent; height: 36px; width: 44px;" /></label>
            <label style="font-size: 0.95rem; font-weight: 600;">Ojos/Magia: <input type="color" id="picker-eye" value="${CREATOR_STATE.eyeColor}" style="cursor: pointer; border: none; background: transparent; height: 36px; width: 44px;" /></label>
          </div>
        </div>

        <div class="control-group">
          <label class="control-label" style="font-weight: 700; font-size: 1rem;">5. Elemento y Aura Mística:</label>
          <div class="option-chips display-flex flex-wrap gap-xs margin-top-xs" id="breath-chips" style="display: flex; flex-wrap: wrap; gap: 8px;">
            <button class="chip active" data-elem="Fuego">🔥 Fuego Voraz</button>
            <button class="chip" data-elem="Hielo">❄️ Aliento Helado</button>
            <button class="chip" data-elem="Rayo">⚡ Rayo Creador</button>
            <button class="chip" data-elem="Veneno">🧪 Esporas Ácidas</button>
            <button class="chip" data-elem="Sombra">🌙 Sombras Abisales</button>
            <button class="chip" data-elem="Luz">✨ Magia Estelar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll("#body-chips .chip").forEach(chip => {
    chip.addEventListener("click", () => {
      container.querySelectorAll("#body-chips .chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      CREATOR_STATE.bodyType = chip.dataset.val;
      playSound("click");
      updateCreatorPreview();
    });
  });

  container.querySelectorAll("#horn-chips .chip").forEach(chip => {
    chip.addEventListener("click", () => {
      container.querySelectorAll("#horn-chips .chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      CREATOR_STATE.hornStyle = chip.dataset.horn;
      playSound("click");
      updateCreatorPreview();
    });
  });

  container.querySelectorAll("#wing-chips .chip").forEach(chip => {
    chip.addEventListener("click", () => {
      container.querySelectorAll("#wing-chips .chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      CREATOR_STATE.wingStyle = chip.dataset.wing;
      playSound("click");
      updateCreatorPreview();
    });
  });

  container.querySelectorAll("#breath-chips .chip").forEach(chip => {
    chip.addEventListener("click", () => {
      container.querySelectorAll("#breath-chips .chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      CREATOR_STATE.element = chip.dataset.elem;
      playSound("click");
      updateCreatorPreview();
    });
  });

  const pPrimary = container.querySelector("#picker-primary");
  const pSecondary = container.querySelector("#picker-secondary");
  const pEye = container.querySelector("#picker-eye");

  if (pPrimary) pPrimary.addEventListener("input", e => { CREATOR_STATE.colorPrimary = e.target.value; updateCreatorPreview(); });
  if (pSecondary) pSecondary.addEventListener("input", e => { CREATOR_STATE.colorSecondary = e.target.value; updateCreatorPreview(); });
  if (pEye) pEye.addEventListener("input", e => { CREATOR_STATE.eyeColor = e.target.value; updateCreatorPreview(); });

  const nameInp = container.querySelector("#creator-name-input");
  const titleInp = container.querySelector("#creator-title-input");

  if (nameInp) nameInp.addEventListener("input", e => { CREATOR_STATE.dragonName = e.target.value || "Mi Dragón"; updateCreatorPreviewText(); });
  if (titleInp) titleInp.addEventListener("input", e => { CREATOR_STATE.dragonTitle = e.target.value || "El Legendario"; updateCreatorPreviewText(); });

  const btnRandom = container.querySelector("#btn-random-name");
  if (btnRandom) {
    btnRandom.addEventListener("click", () => {
      playSound("chime");
      const prefixes = ["Pyrion", "Ignis", "Astra", "Vortex", "Frostwing", "Shadowfang", "Stormclaw", "Valakor", "Solarios", "Zephyr"];
      const suffixes = ["el Indomable", "Señor de las Cumbres", "Guardián del Fuego", "El Errante de los Cielos", "Nacido de las Estrellas", "Destructor del Caos"];
      
      const rName = prefixes[Math.floor(Math.random() * prefixes.length)];
      const rTitle = suffixes[Math.floor(Math.random() * suffixes.length)];

      CREATOR_STATE.dragonName = rName;
      CREATOR_STATE.dragonTitle = rTitle;

      if (nameInp) nameInp.value = rName;
      if (titleInp) titleInp.value = rTitle;
      updateCreatorPreviewText();
    });
  }

  const btnExport = container.querySelector("#btn-export-card");
  if (btnExport) {
    btnExport.addEventListener("click", () => {
      playSound("roar");
      exportDragonCard();
    });
  }

  updateCreatorPreview();
}

function updateCreatorPreviewText() {
  const nameEl = document.getElementById("creator-preview-name");
  const titleEl = document.getElementById("creator-preview-title");
  if (nameEl) nameEl.textContent = CREATOR_STATE.dragonName;
  if (titleEl) titleEl.textContent = CREATOR_STATE.dragonTitle;
}

function updateCreatorPreview() {
  const stage = document.getElementById("creator-preview-stage");
  if (!stage) return;

  // Find high-quality dragon artwork matching bodyType & element from database
  let matchedDragon = DRAGONS_DATA.find(d => 
    d.svgType.toLowerCase() === CREATOR_STATE.bodyType.toLowerCase() && 
    d.element.toLowerCase() === CREATOR_STATE.element.toLowerCase()
  ) || DRAGONS_DATA.find(d => d.svgType.toLowerCase() === CREATOR_STATE.bodyType.toLowerCase()) || DRAGONS_DATA[0];

  const artSrc = getDragonArtworkSrc(matchedDragon);

  stage.innerHTML = `
    <div class="creator-card-frame fantasy-panel" style="width: 100%; max-width: 380px; padding: 1.2rem; background: var(--bg-panel); border: 2px solid var(--gold-main); border-radius: 16px; box-shadow: var(--shadow-gold);">
      <div class="creator-img-wrap" style="height: 240px; border-radius: 12px; overflow: hidden; border: 2px solid var(--gold-main); position: relative; background: #12101d;">
        <img src="${artSrc}" alt="${CREATOR_STATE.dragonName}" class="dragon-artwork-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
        <div class="fallback-svg-wrap" style="display: none; width: 100%; height: 100%;">
          ${renderDragonSVG(matchedDragon, 340, 240)}
        </div>
      </div>
      <div class="creator-card-badge text-center" style="margin-top: 1rem; width: 100%;">
        <h3 id="creator-preview-name" style="color: var(--gold-main); font-size: 1.6rem; margin: 0; font-weight: 700;">${CREATOR_STATE.dragonName}</h3>
        <p id="creator-preview-title" style="color: var(--text-gold); font-style: italic; margin: 4px 0 10px 0; font-size: 1.05rem;">"${CREATOR_STATE.dragonTitle}"</p>
        <div style="display: flex; gap: 8px; justify-content: center; align-items: center;">
          <span class="element-badge" style="background: var(--color-rust); color: #fff; padding: 6px 16px; border-radius: 20px; font-weight: 700; font-size: 0.95rem;">${CREATOR_STATE.element}</span>
          <span class="element-badge" style="background: var(--color-teal); color: #fff; padding: 6px 16px; border-radius: 20px; font-weight: 700; font-size: 0.95rem;">Anatomía: ${CREATOR_STATE.bodyType.toUpperCase()}</span>
        </div>
      </div>
    </div>
  `;
}
function renderElaborateCreatorSVG(state, width = 340, height = 250) {
  const primary = state.colorPrimary || "#c8553d";
  const secondary = state.colorSecondary || "#e9c46a";
  const eye = state.eyeColor || "#2a9d8f";
  const body = state.bodyType || "draco";
  const horn = state.hornStyle || "horns-classic";
  const wing = state.wingStyle || "wings-bat";
  const element = state.element || "Fuego";

  const outline = "#12101d";

  // Dynamic SVG Gradient Definitions
  const defs = `
    <defs>
      <linearGradient id="cBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${primary}" />
        <stop offset="100%" stop-color="#181328" />
      </linearGradient>

      <linearGradient id="cBellyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${secondary}" />
        <stop offset="100%" stop-color="#d4a373" />
      </linearGradient>

      <radialGradient id="cEyeGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${eye}" />
        <stop offset="100%" stop-color="#12101d" />
      </radialGradient>

      <linearGradient id="cWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${secondary}" stop-opacity="0.85" />
        <stop offset="100%" stop-color="${primary}" stop-opacity="0.65" />
      </linearGradient>

      <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
  `;

  // 1. Aura Layer (Elemental Background Effects)
  let aura = "";
  if (element === "Fuego") {
    aura = `
      <circle cx="170" cy="130" r="110" fill="#e9c46a" opacity="0.12" filter="url(#glowEffect)" />
      <path d="M 40 210 Q 70 150 90 200 Q 120 120 150 190 Q 180 110 220 200 Q 270 130 300 210" fill="none" stroke="${secondary}" stroke-width="4" opacity="0.6" stroke-dasharray="8,6" />
      <circle cx="70" cy="90" r="4" fill="#e9c46a" opacity="0.7" />
      <circle cx="290" cy="70" r="6" fill="#c8553d" opacity="0.8" />
      <circle cx="310" cy="160" r="3" fill="#e9c46a" opacity="0.9" />
    `;
  } else if (element === "Hielo") {
    aura = `
      <circle cx="170" cy="130" r="110" fill="#2a9d8f" opacity="0.15" filter="url(#glowEffect)" />
      <polygon points="50,60 62,40 74,60 62,80" fill="#2a9d8f" opacity="0.8" />
      <polygon points="290,70 300,52 310,70 300,88" fill="#ffffff" opacity="0.9" />
      <polygon points="80,180 88,168 96,180 88,192" fill="#2a9d8f" opacity="0.7" />
      <path d="M 30 130 L 310 130" stroke="#2a9d8f" stroke-width="2" opacity="0.3" stroke-dasharray="4,8" />
    `;
  } else if (element === "Rayo") {
    aura = `
      <circle cx="170" cy="130" r="110" fill="#e9c46a" opacity="0.12" filter="url(#glowEffect)" />
      <path d="M 30 50 L 60 90 L 45 100 L 80 150 M 310 40 L 280 90 L 295 105 L 265 160" stroke="#e9c46a" stroke-width="4" fill="none" stroke-linejoin="bevel" />
      <circle cx="170" cy="130" r="120" stroke="#e9c46a" stroke-width="2" fill="none" opacity="0.3" stroke-dasharray="12,12" />
    `;
  } else if (element === "Veneno") {
    aura = `
      <circle cx="170" cy="130" r="110" fill="#52b788" opacity="0.15" filter="url(#glowEffect)" />
      <circle cx="60" cy="100" r="12" fill="#52b788" opacity="0.6" />
      <circle cx="280" cy="80" r="16" fill="#74c69d" opacity="0.5" />
      <circle cx="90" cy="190" r="8" fill="#52b788" opacity="0.7" />
      <circle cx="310" cy="170" r="10" fill="#d8f3dc" opacity="0.8" />
    `;
  } else if (element === "Sombra") {
    aura = `
      <circle cx="170" cy="130" r="110" fill="#7209b7" opacity="0.2" filter="url(#glowEffect)" />
      <path d="M 30 200 C 60 140 100 220 150 150 C 200 230 260 130 310 200" fill="none" stroke="#480ca8" stroke-width="8" opacity="0.6" stroke-linecap="round" />
    `;
  } else {
    aura = `
      <circle cx="170" cy="130" r="110" fill="#e9c46a" opacity="0.2" filter="url(#glowEffect)" />
      <polygon points="170,15 178,35 198,35 182,47 188,67 170,55 152,67 158,47 142,35 162,35" fill="#ffd700" opacity="0.8" />
      <polygon points="50,70 55,83 68,83 58,91 62,103 50,95 38,103 42,91 32,83 45,83" fill="#ffffff" opacity="0.9" />
    `;
  }

  // 2. Wings Layer
  let wings = "";
  if (wing === "wings-bat") {
    wings = `
      <!-- Left Wing -->
      <path d="M 160 130 Q 90 30 30 80 Q 70 120 100 150 Q 130 150 160 130 Z" fill="url(#cWingGrad)" stroke="${outline}" stroke-width="5" />
      <path d="M 160 130 Q 90 30 30 80 M 90 30 L 100 150 M 90 30 L 70 120" stroke="${outline}" stroke-width="4" fill="none" />

      <!-- Right Wing -->
      <path d="M 200 130 Q 270 30 330 80 Q 290 120 260 150 Q 230 150 200 130 Z" fill="url(#cWingGrad)" stroke="${outline}" stroke-width="5" />
      <path d="M 200 130 Q 270 30 330 80 M 270 30 L 260 150 M 270 30 L 290 120" stroke="${outline}" stroke-width="4" fill="none" />
    `;
  } else if (wing === "wings-feather") {
    wings = `
      <!-- Left Feather Wing -->
      <path d="M 160 130 Q 90 30 20 70 Q 60 110 110 145 Z" fill="${secondary}" stroke="${outline}" stroke-width="5" />
      <path d="M 20 70 C 40 90 60 100 80 130 M 40 55 C 60 75 80 85 100 120" stroke="${outline}" stroke-width="4" fill="none" />

      <!-- Right Feather Wing -->
      <path d="M 200 130 Q 270 30 340 70 Q 300 110 250 145 Z" fill="${secondary}" stroke="${outline}" stroke-width="5" />
      <path d="M 340 70 C 320 90 300 100 260 130 M 320 55 C 300 75 280 85 240 120" stroke="${outline}" stroke-width="4" fill="none" />
    `;
  } else if (wing === "wings-plasma") {
    wings = `
      <path d="M 160 130 Q 80 20 20 90 Q 90 120 160 130 Z" fill="${eye}" opacity="0.75" stroke="${outline}" stroke-width="4" filter="url(#glowEffect)" />
      <path d="M 200 130 Q 260 20 320 90 Q 250 120 200 130 Z" fill="${eye}" opacity="0.75" stroke="${outline}" stroke-width="4" filter="url(#glowEffect)" />
    `;
  }

  // 3. Body & Anatomy Layer
  let bodyShape = "";
  if (body === "wyvern") {
    bodyShape = `
      <!-- Tail -->
      <path d="M 180 170 Q 240 230 290 200 Q 320 180 340 220" fill="none" stroke="url(#cBodyGrad)" stroke-width="22" stroke-linecap="round" />
      <path d="M 180 170 Q 240 230 290 200 Q 320 180 340 220" fill="none" stroke="${outline}" stroke-width="5" stroke-linecap="round" />
      <polygon points="340,220 355,205 350,230" fill="${secondary}" stroke="${outline}" stroke-width="3" />

      <!-- Legs -->
      <path d="M 155 170 L 140 225 L 120 235" stroke="${outline}" stroke-width="12" fill="none" stroke-linecap="round" />
      <path d="M 195 170 L 210 225 L 230 235" stroke="${outline}" stroke-width="12" fill="none" stroke-linecap="round" />

      <!-- Torso & Underbelly -->
      <path d="M 140 130 C 130 180 160 210 180 205 C 200 210 230 180 220 130 Z" fill="url(#cBodyGrad)" stroke="${outline}" stroke-width="5" />
      <path d="M 160 140 Q 180 160 180 200 Q 160 170 160 140 Z" fill="url(#cBellyGrad)" stroke="${outline}" stroke-width="3" />
    `;
  }
    // 4. Head Layer
  const headShape = `
    <path d="M 145 95 Q 170 65 195 95 Q 185 125 170 120 Q 155 125 145 95 Z" fill="url(#cBodyGrad)" stroke="${outline}" stroke-width="4" />
    <circle cx="160" cy="90" r="5" fill="${eye}" stroke="${outline}" stroke-width="2" />
    <circle cx="180" cy="90" r="5" fill="${eye}" stroke="${outline}" stroke-width="2" />
  `;

  // 5. Horns Layer
  let hornShape = "";
  if (horn === "horns-ram") {
    hornShape = `
      <path d="M 145 80 C 110 70 110 40 135 45" fill="none" stroke="${secondary}" stroke-width="6" stroke-linecap="round" />
      <path d="M 195 80 C 230 70 230 40 205 45" fill="none" stroke="${secondary}" stroke-width="6" stroke-linecap="round" />
    `;
  } else if (horn === "horns-crown") {
    hornShape = `
      <polygon points="150,75 160,45 170,60 180,45 190,75" fill="${secondary}" stroke="${outline}" stroke-width="3" />
    `;
  } else {
    hornShape = `
      <path d="M 150 80 Q 130 40 145 30" fill="none" stroke="${secondary}" stroke-width="6" stroke-linecap="round" />
      <path d="M 190 80 Q 210 40 195 30" fill="none" stroke="${secondary}" stroke-width="6" stroke-linecap="round" />
    `;
  }

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      ${defs}
      ${auraPath}
      ${wingShape}
      ${bodyShape}
      ${headShape}
      ${hornShape}
    </svg>
  `;
}

function updateCreatorPreview() {
  const stage = document.getElementById("creator-preview-stage");
  if (!stage) return;

  stage.innerHTML = `
    <div class="creator-preview-frame" style="background: var(--bg-panel); border-radius: 16px; padding: 1.2rem; border: 2px solid var(--gold-main); box-shadow: var(--shadow-gold);">
      <div class="creator-svg-wrap" style="height: 230px; display: flex; align-items: center; justify-content: center; position: relative;">
        ${renderElaborateCreatorSVG(CREATOR_STATE, 300, 220)}
      </div>
      <div class="creator-card-badge text-center margin-top-sm">
        <h3 id="creator-preview-name" style="color: var(--gold-main); font-size: 1.5rem; margin: 0;">${CREATOR_STATE.dragonName}</h3>
        <p id="creator-preview-title" style="color: var(--text-gold); font-style: italic; margin: 4px 0 8px 0; font-size: 1rem;">"${CREATOR_STATE.dragonTitle}"</p>
        <span class="element-badge" style="background: var(--color-rust); color: #fff; padding: 4px 14px; border-radius: 20px; font-weight: 700;">${CREATOR_STATE.element}</span>
      </div>
    </div>
  `;
}

function exportDragonCard() {
  const canvas = document.createElement("canvas");
  canvas.width = 650;
  canvas.height = 900;
  const ctx = canvas.getContext("2d");

  const grad = ctx.createLinearGradient(0, 0, 650, 900);
  grad.addColorStop(0, "#191528");
  grad.addColorStop(0.5, "#0f0c1a");
  grad.addColorStop(1, "#1c1424");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 650, 900);

  ctx.strokeStyle = "#e9c46a";
  ctx.lineWidth = 12;
  ctx.strokeRect(20, 20, 610, 860);

  ctx.strokeStyle = "#2a9d8f";
  ctx.lineWidth = 4;
  ctx.strokeRect(32, 32, 586, 836);

  ctx.fillStyle = "#e9c46a";
  ctx.font = "bold 26px serif";
  ctx.textAlign = "center";
  ctx.fillText("✨ SANTUARIO SECRETO DE DRAGONES ✨", 325, 75);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 38px sans-serif";
  ctx.fillText(CREATOR_STATE.dragonName, 325, 135);

  ctx.fillStyle = "#e9c46a";
  ctx.font = "italic 22px sans-serif";

  ctx.fillStyle = "#ffd700";
  ctx.font = "bold 24px sans-serif";
  ctx.fillText(`Elemento: ${CREATOR_STATE.element}`, 300, 240);

  ctx.fillStyle = "#ffffff";
  ctx.font = "120px sans-serif";
  ctx.fillText("🐉", 300, 480);

  ctx.fillStyle = "#ffd700";
  ctx.font = "bold 20px serif";
  ctx.fillText("CERTIFICADO OFICIAL DE GUARDIÁN LEYENDA", 300, 720);

  const link = document.createElement("a");
  link.download = `Dragon_${CREATOR_STATE.dragonName}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// ==========================================================================
// 6. TEST DRACONIANO (Test de Personalidad para Niños)
// ==========================================================================
const QUIZ_QUESTIONS = [
  {
    id: 1,
    title: "🏰 ¿En qué lugar te gustaría construir tu refugio o guarida secreta?",
    subtitle: "Elegí el hábitat que mejor se adapte a tu espíritu draconiano",
    options: [
      { text: "🏔️ En lo alto de una cumbre nevada entre las nubes y el viento glacial", element: "Hielo", mythology: "Nórdica y Germánica", type: "Wyrm" },
      { text: "🌋 En el interior de una cueva volcánica rodeado de roca y magma", element: "Fuego", mythology: "Griega y Romana", type: "Draco" },
      { text: "🌿 En la copa de un árbol milenario en un bosque místico inexplorado", element: "Naturaleza", mythology: "Mesoamericana", type: "Ampithere" },
      { text: "🌊 En las profundidades secretas del océano entre corales y tormentas", element: "Agua", mythology: "Oriental", type: "Shen" },
      { text: "✨ En una torre de cristal observando las estrellas y constelaciones", element: "Luz", mythology: "Leyenda del Santuario", type: "Astral" }
    ]
  },
  {
    id: 2,
    title: "⚡ Cuando tenés que resolver un juego o desafío difícil, ¿cuál es tu estilo?",
    subtitle: "Pensá cómo reaccionás cuando hay que superar un obstáculo",
    options: [
      { text: "🧠 Analizás la situación con calma y planeás una gran estrategia", element: "Luz", mythology: "Oriental", type: "Shen" },
      { text: "🔥 Te lanzás de frente con mucha valentía y energía sin dudarlo", element: "Fuego", mythology: "Nórdica y Germánica", type: "Draco" },
      { text: "🎯 Usás tu velocidad, agilidad y astucia para esquivar todo", element: "Rayo", mythology: "Celta y Británica", type: "Wyvern" },
      { text: "🤝 Buscás unir a tus amigos y trabajar en equipo para ganar juntos", element: "Naturaleza", mythology: "Eslava y Este de Europa", type: "Hidra" },
      { text: "🌙 Observás en silencio desde las sombras hasta dar el paso perfecto", element: "Sombra", mythology: "Mesopotámica", type: "Wyrm" }
    ]
  },
  {
    id: 3,
    title: "🔮 Si pudieras tener un aliento especial de dragón, ¿cuál elegís?",
    subtitle: "Tu poder elemental supremo",
    options: [
      { text: "🔥 Un aliento de llamas doradas que ilumine la oscuridad", element: "Fuego", mythology: "Europea Continental", type: "Draco" },
      { text: "❄️ Una ráfaga de hielo cristalino que congele cualquier peligro", element: "Hielo", mythology: "Nórdica y Germánica", type: "Wyrm" },
      { text: "⚡ Un trueno relampagueante que haga retumbar los cielos", element: "Rayo", mythology: "Hindú y Sudeste Asiático", type: "Wyvern" },
      { text: "🌸 Una brisa sanadora que haga florecer plantas gigantes al instante", element: "Naturaleza", mythology: "Mesoamericana", type: "Ampithere" },
      { text: "🌌 Un rayo de luz mística capaz de leer los sueños y secretos", element: "Luz", mythology: "Leyenda del Santuario", type: "Shen" }
    ]
  },
  {
    id: 4,
    title: "🛡️ ¿Qué cualidad valorás más en un mejor amigo o compañero de aventuras?",
    subtitle: "El valor principal de tu equipo",
    options: [
      { text: "🛡️ La lealtad incondicional: saber que siempre van a cuidarse mutuamente", element: "Fuego", mythology: "Nórdica y Germánica", type: "Draco" },
      { text: "📚 La curiosidad y las ganas de descubrir misterios antiguos del mundo", element: "Luz", mythology: "Oriental", type: "Shen" },
      { text: "⚔️ La valentía para defender a quienes lo necesiten sin tener miedo", element: "Rayo", mythology: "Griega y Romana", type: "Wyvern" },
      { text: "🎨 La alegría y el sentido del humor para divertirse en cada momento", element: "Naturaleza", mythology: "Celta y Británica", type: "Ampithere" }
    ]
  },
  {
    id: 5,
    title: "📜 ¿Qué tesoro legendario guardarías en el cofre secreto de tu guarida?",
    subtitle: "Tu objeto más valioso",
    options: [
      { text: "💰 Un cofre repleto de monedas de oro brillante y cuarzos místicos", element: "Fuego", mythology: "Europea Continental", type: "Draco" },
      { text: "📜 Un pergamino milenario escrito en runas e idiomas olvidados", element: "Luz", mythology: "Oriental", type: "Shen" },
      { text: "🪶 Una pluma radiante de quetzal iridiscente que concede deseos", element: "Naturaleza", mythology: "Mesoamericana", type: "Ampithere" },
      { text: "💎 Una gema marina que pueda calmar las tempestades del océano", element: "Agua", mythology: "Griega y Romana", type: "Wyrm" }
    ]
  }
];

let quizCurrentStep = 0;
let quizUserAnswers = [];

function initQuizModule(containerId = "quiz-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  quizCurrentStep = 0;
  quizUserAnswers = [];
  renderQuizStartScreen(container);
}

function renderQuizStartScreen(container) {
  container.innerHTML = `
    <div class="quiz-wrapper fantasy-panel text-center">
      <div class="quiz-step-tag">✨ Vínculo Draconiano ✨</div>
      <h3 class="panel-title margin-top-sm">Test Draconiano: ¿Qué Dragón Sos Vos?</h3>
      <p class="quiz-desc margin-top-md">
        Respondé 5 preguntas divertidas sobre tu personalidad, tus gustos y tu estilo de aventura.
        Al finalizar, el Santuario Secreto revelará cuál de los <strong>100 dragones legendarios</strong> es tu compañero ideal.
      </p>

      <div class="margin-top-lg">
        <button class="btn btn-gold btn-lg" id="btn-start-quiz">🔥 Comenzar el Test Draconiano</button>
      </div>
    </div>
  `;

  const btn = container.querySelector("#btn-start-quiz");
  if (btn) {
    btn.addEventListener("click", () => {
      playSound("chime");
      quizCurrentStep = 0;
      quizUserAnswers = [];
      renderQuizStep(container);
    });
  }
}

function renderQuizStep(container) {
  if (quizCurrentStep >= QUIZ_QUESTIONS.length) {
    renderQuizResults(container);
    return;
  }

  const q = QUIZ_QUESTIONS[quizCurrentStep];
  const progressPercent = Math.round(((quizCurrentStep + 1) / QUIZ_QUESTIONS.length) * 100);

  container.innerHTML = `
    <div class="quiz-wrapper fantasy-panel">
      <div class="quiz-header-bar">
        <span class="quiz-step-tag">Pregunta ${quizCurrentStep + 1} de ${QUIZ_QUESTIONS.length}</span>
        <div class="quiz-progress-outer" style="background: rgba(255,255,255,0.1); height: 10px; border-radius: 6px; overflow: hidden; margin-top: 8px; border: 1px solid var(--gold-main);">
          <div class="quiz-progress-inner" style="width: ${progressPercent}%; background: var(--gold-gradient); height: 100%; transition: width 0.3s ease;"></div>
        </div>
      </div>

      <h3 class="panel-title margin-top-md" style="font-size: 1.4rem; color: var(--gold-main);">${q.title}</h3>
      <p class="quiz-desc" style="color: var(--text-muted); font-size: 1rem;">${q.subtitle}</p>

      <div class="quiz-options-grid margin-top-lg" style="display: flex; flex-direction: column; gap: 12px;">
        ${q.options.map((opt, idx) => `
          <button class="quiz-option-card fantasy-panel" data-idx="${idx}" style="text-align: left; padding: 14px 18px; border: 2px solid var(--border-panel); background: var(--bg-panel); color: var(--text-main); font-size: 1rem; cursor: pointer; border-radius: 12px; transition: var(--transition);">
            <span class="option-text">${opt.text}</span>
          </button>
        `).join("")}
      </div>
    </div>
  `;

  const optionBtns = container.querySelectorAll(".quiz-option-card");
  optionBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      playSound("click");
      const idx = parseInt(btn.dataset.idx, 10);
      quizUserAnswers.push(q.options[idx]);
      quizCurrentStep++;
      renderQuizStep(container);
    });
  });
}

function findMatchingDragon(answers) {
  let elementScores = {};
  let mythScores = {};
  let typeScores = {};

  answers.forEach(ans => {
    if (ans.element) elementScores[ans.element] = (elementScores[ans.element] || 0) + 3;
    if (ans.mythology) mythScores[ans.mythology] = (mythScores[ans.mythology] || 0) + 2;
    if (ans.type) typeScores[ans.type] = (typeScores[ans.type] || 0) + 1.5;
  });

  let bestDragon = DRAGONS_DATA[0];
  let bestScore = -1;

  DRAGONS_DATA.forEach(dragon => {
    let score = 0;
    
    // Element match
    if (elementScores[dragon.element]) {
      score += elementScores[dragon.element] * 3;
    }
    
    // Mythology match
    Object.keys(mythScores).forEach(m => {
      if (dragon.mythology.toLowerCase().includes(m.toLowerCase())) {
        score += mythScores[m] * 2.5;
      }
    });

    // Body type match
    if (typeScores[dragon.type]) {
      score += typeScores[dragon.type] * 2;
    }

    if (score > bestScore) {
      bestScore = score;
      bestDragon = dragon;
    }
  });

  return bestDragon;
}

function renderQuizResults(container) {
  playSound("roar");
  const matched = findMatchingDragon(quizUserAnswers);
  const isFav = favoritesSet.has(matched.id);
  const flames = "🔥".repeat(matched.danger);
  const artSrc = getDragonArtworkSrc(matched);

  container.innerHTML = `
    <div class="quiz-wrapper fantasy-panel text-center">
      <div class="quiz-step-tag">🎉 ¡¡Resultado de tu Vínculo Draconiano!! 🎉</div>
      
      <h2 class="panel-title margin-top-sm" style="color: var(--gold-main); font-size: 2rem;">
        ¡Tu Dragón Compañero es ${matched.name}!
      </h2>
      <p class="quiz-result-subtitle" style="font-style: italic; color: var(--text-gold); font-size: 1.1rem;">"${matched.title}"</p>

      <div class="margin-top-md" style="max-width: 380px; margin-left: auto; margin-right: auto; height: 260px; border-radius: 16px; overflow: hidden; border: 2px solid var(--gold-main); box-shadow: var(--shadow-gold);">
        <img src="${artSrc}" alt="${matched.name}" class="dragon-artwork-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
        <div class="fallback-svg-wrap" style="display: none; width: 100%; height: 100%;">
          ${renderDragonSVG(matched, 340, 260)}
        </div>
      </div>

      <div class="stats-table margin-top-md fantasy-panel" style="max-width: 600px; margin-left: auto; margin-right: auto; text-align: left; padding: 1.2rem;">
        <div class="stat-row"><strong>📍 Mitología:</strong> <span>${matched.mythology}</span></div>
        <div class="stat-row"><strong>⚡ Elemento:</strong> <span>${matched.element}</span></div>
        <div class="stat-row"><strong>🦎 Tipo de Dragón:</strong> <span>${matched.type}</span></div>
        <div class="stat-row"><strong>🔥 Nivel de Peligro:</strong> <span>${flames} (${matched.danger}/5)</span></div>
        <div class="stat-row"><strong>🏡 Hábitat:</strong> <span>${matched.habitat}</span></div>
        <div class="stat-row"><strong>✨ Habilidad Especial:</strong> <span>${matched.ability}</span></div>
      </div>

      <div class="historical-scroll-box margin-top-md fantasy-panel" style="max-width: 600px; margin-left: auto; margin-right: auto; text-align: left; background: rgba(233,196,106,0.1);">
        <h4>📜 Por qué coincide con vos:</h4>
        <p>${matched.scroll}</p>
      </div>

      <div class="margin-top-lg display-flex gap-md justify-center flex-wrap" style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem;">
        <button class="btn btn-gold btn-lg" id="btn-quiz-fav">
          ${isFav ? "❤️ En tus Favoritos" : "🤍 Guardar en Favoritos"}
        </button>
        <button class="btn btn-secondary btn-lg" id="btn-quiz-restart">🔄 Hacer el Test de Nuevo</button>
      </div>
    </div>
  `;

  const btnFav = container.querySelector("#btn-quiz-fav");
  if (btnFav) {
    btnFav.addEventListener("click", () => {
      playSound("click");
      if (favoritesSet.has(matched.id)) {
        favoritesSet.delete(matched.id);
        btnFav.textContent = "🤍 Guardar en Favoritos";
      } else {
        favoritesSet.add(matched.id);
        btnFav.textContent = "❤️ En tus Favoritos";
      }
      localStorage.setItem("santuario_favorites", JSON.stringify([...favoritesSet]));
    });
  }

  const btnRestart = container.querySelector("#btn-quiz-restart");
  if (btnRestart) {
    btnRestart.addEventListener("click", () => {
      playSound("click");
      initQuizModule("quiz-container");
    });
  }
}

// ==========================================================================
// 7. LÓGICA PRINCIPAL DE LA ENCICLOPEDIA
// ==========================================================================
let filteredDragons = [...DRAGONS_DATA];
let currentPage = 1;
const ITEMS_PER_PAGE = 12;
let favoritesSet = new Set();
try {
  const savedFavs = localStorage.getItem("santuario_favorites");
  if (savedFavs) {
    const parsed = JSON.parse(savedFavs);
    if (Array.isArray(parsed)) {
      favoritesSet = new Set(parsed);
    }
  }
} catch (e) {
  console.warn("Error cargando favoritos desde localStorage:", e);
}

let searchQuery = "";
let selectedMythology = "Todas";
let selectedElement = "Todos";
let selectedType = "Todos";
let selectedDanger = "Todos";
let selectedSort = "name-asc";

// ==========================================================================
// 8. SECCIÓN DE MAGIA DRACONIANA (3 Sub-Páginas: Fundamentos, Altar, Academia)
// ==========================================================================
let currentMagicPage = "fundamentos"; // "fundamentos" | "altar" | "academia"
let currentMagicRing = 1; // 1..5: Los Anillos Internos

function initMagicModule(containerId = "magic-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  renderMagicSection(container);
}

function renderMagicSubNavHtml(activePage) {
  return `
    <div class="margin-top-md" style="display: flex; justify-center; gap: 12px; justify-content: center; flex-wrap: wrap;">
      <button class="chip ${activePage === "fundamentos" ? "active" : ""}" id="nav-sub-fund" style="padding: 10px 20px; font-weight: 700; ${activePage !== "fundamentos" ? "background: rgba(233,196,106,0.15);" : ""}">📜 1. Fundamentos y Leyes</button>
      <button class="chip ${activePage === "altar" ? "active" : ""}" id="nav-sub-altar" style="padding: 10px 20px; font-weight: 700; ${activePage !== "altar" ? "background: rgba(233,196,106,0.15);" : ""}">⚒️ 2. El Altar y Herramientas</button>
      <button class="chip ${activePage === "academia" ? "active" : ""}" id="nav-sub-acad" style="padding: 10px 20px; font-weight: 700; ${activePage !== "academia" ? "background: rgba(233,196,106,0.15);" : ""}">🎓 3. Academia Draconiana (5 Anillos)</button>
    </div>
  `;
}

function setupMagicSubNavEvents(container) {
  const btnFund = container.querySelector("#nav-sub-fund");
  const btnAltar = container.querySelector("#nav-sub-altar");
  const btnAcad = container.querySelector("#nav-sub-acad");

  if (btnFund) btnFund.addEventListener("click", () => { playSound("click"); currentMagicPage = "fundamentos"; renderMagicSection(container); });
  if (btnAltar) btnAltar.addEventListener("click", () => { playSound("click"); currentMagicPage = "altar"; renderMagicSection(container); });
  if (btnAcad) btnAcad.addEventListener("click", () => { playSound("click"); currentMagicPage = "academia"; renderMagicSection(container); });
}

function renderMagicSection(container) {
  if (currentMagicPage === "fundamentos") {
    renderFundamentosView(container);
  } else if (currentMagicPage === "altar") {
    renderAltarSubPage(container);
  } else {
    renderAcademiaSubPage(container);
  }
}

// SUB-PÁGINA 1: FUNDAMENTOS Y LEYES
function renderFundamentosView(container) {
  container.innerHTML = `
    <div class="magic-section-wrapper" style="display: flex; flex-direction: column; gap: 2rem;">
      
      <!-- HERO BANNER DE MAGIA -->
      <div class="magic-hero fantasy-panel text-center" style="padding: 2.2rem; background: linear-gradient(135deg, rgba(42,157,143,0.15), rgba(200,85,61,0.15)); border: 2px solid var(--gold-main); border-radius: 20px;">
        <div class="quiz-step-tag" style="font-size: 0.95rem;">✨ El Sendero Ancestral ✨</div>
        <h2 class="panel-title margin-top-xs" style="color: var(--gold-main); font-size: 2.3rem;">Magia Draconiana: Fundamentos y Leyes</h2>
        <p style="color: var(--text-main); font-size: 1.1rem; max-width: 800px; margin: 12px auto 0 auto; line-height: 1.6;">
          Bienvenido al camino de la sabiduría secreta. La Magia Draconiana es una tradición milenaria basada en el respeto, la amistad con seres antiguos y el uso responsable de la energía universal.
        </p>
        
        <!-- SUB-NAV SWITCHER -->
        ${renderMagicSubNavHtml("fundamentos")}
      </div>

      <!-- 1. LA REGLA DE ORO & 2. EL CÓDIGO DE ÉTICA -->
      <div class="display-grid gap-lg" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
        
        <!-- Regla de Oro -->
        <div class="fantasy-panel" style="padding: 1.8rem; border-left: 6px solid var(--gold-main);">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 2.5rem;">🤝</span>
            <h3 style="color: var(--gold-main); font-size: 1.5rem; margin: 0;">1. La Regla de Oro: Dragones como "Colaboradores"</h3>
          </div>
          <p style="margin-top: 1rem; color: var(--text-main); line-height: 1.6; font-size: 1.05rem;">
            Antes de pronunciar cualquier invocación, tenés que comprender la ley fundamental: <strong>los dragones son seres antiguos, independientes y sabios</strong>, nunca mascotas ni sirvientes.
          </p>
          <div style="background: rgba(233,196,106,0.1); padding: 14px; border-radius: 10px; margin-top: 1.2rem; border: 1px dashed var(--gold-main);">
            <p style="margin: 0; font-style: italic; color: var(--text-gold); font-size: 1rem; line-height: 1.5;">
              "La magia funciona únicamente a través de la amistad sincera, la cooperación y el respeto mutuo. Intentar ordenar o controlar a un dragón romperá el vínculo y el dragón simplemente se desplegará y se irá."
            </p>
          </div>
        </div>

        <!-- Código de Ética -->
        <div class="fantasy-panel" style="padding: 1.8rem; border-left: 6px solid var(--color-teal);">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 2.5rem;">⚖️</span>
            <h3 style="color: var(--color-teal); font-size: 1.5rem; margin: 0;">2. Código de Ética: La Ley del Tres</h3>
          </div>
          <p style="margin-top: 1rem; color: var(--text-main); line-height: 1.6; font-size: 1.05rem;">
            En el universo draconiano existe la regla sagrada del retorno conocido como el <strong>"Tres veces Tres"</strong>: toda energía o intención que envíes regresará a vos multiplicada por tres.
          </p>
          <ul style="margin-top: 1rem; padding-left: 1.2rem; color: var(--text-main); display: flex; flex-direction: column; gap: 10px; font-size: 1rem;">
            <li>🛡️ <strong>Usos Sagrados:</strong> Para sanar, proteger tu hogar y fortalecer tu mente.</li>
            <li>🚫 <strong>Prohibición Absoluta:</strong> Nunca para dañar, controlar o buscar venganza.</li>
          </ul>
        </div>
      </div>

      <!-- BANNER SIGUIENTE: EL ALTAR -->
      <div class="fantasy-panel text-center" style="padding: 2.2rem; background: linear-gradient(135deg, rgba(233,196,106,0.15), rgba(42,157,143,0.15)); border: 2px solid var(--gold-main); border-radius: 20px;">
        <div style="font-size: 3rem;">⚒️</div>
        <h3 class="panel-title margin-top-xs" style="color: var(--gold-main); font-size: 1.9rem;">Siguiente Paso: Fabricá tus Herramientas Mágicas</h3>
        <p style="color: var(--text-main); max-width: 700px; margin: 8px auto 0 auto; font-size: 1.05rem; line-height: 1.6;">
          Pasá a la sección del <strong>Altar y Herramientas</strong> para reunir tu varita de roble, el pentáculo y tu espejo místico.
        </p>
        <button class="btn btn-gold btn-lg margin-top-md" id="btn-go-altar" style="padding: 12px 28px; font-weight: 700;">
          ⚒️ Ir al Altar y Herramientas
        </button>
      </div>

    </div>
  `;

  setupMagicSubNavEvents(container);

  const btnGoAltar = container.querySelector("#btn-go-altar");
  if (btnGoAltar) {
    btnGoAltar.addEventListener("click", () => {
      playSound("click");
      currentMagicPage = "altar";
      renderMagicSection(container);
    });
  }
}

// SUB-PÁGINA 2: EL ALTAR Y LAS HERRAMIENTAS
function renderAltarSubPage(container) {
  container.innerHTML = `
    <div class="magic-section-wrapper" style="display: flex; flex-direction: column; gap: 2rem;">
      
      <!-- HERO BANNER DEL ALTAR -->
      <div class="magic-hero fantasy-panel text-center" style="padding: 2.2rem; background: linear-gradient(135deg, rgba(233,196,106,0.15), rgba(200,85,61,0.15)); border: 2px solid var(--gold-main); border-radius: 20px;">
        <div class="quiz-step-tag" style="font-size: 0.95rem;">⚒️ El Taller del Mago ⚒️</div>
        <h2 class="panel-title margin-top-xs" style="color: var(--gold-main); font-size: 2.3rem;">El Altar y las Herramientas del Mago</h2>
        <p style="color: var(--text-main); font-size: 1.1rem; max-width: 800px; margin: 12px auto 0 auto; line-height: 1.6;">
          Como practicante de la magia draconiana, podés fabricar o reunir tus propias herramientas en casa para concentrar tu mente y canalizar energía.
        </p>

        <!-- SUB-NAV SWITCHER -->
        ${renderMagicSubNavHtml("altar")}
      </div>

      <!-- TARJETAS DE LAS HERRAMIENTAS -->
      <div class="tools-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        
        <div class="tool-card fantasy-panel" style="padding: 1.6rem; background: rgba(255,255,255,0.03); border-left: 5px solid var(--gold-main);">
          <div style="font-size: 2.8rem; margin-bottom: 8px;">🪄</div>
          <h3 style="color: var(--gold-main); margin: 0; font-size: 1.4rem;">1. La Varita o Bastón de Roble</h3>
          <p style="color: var(--text-main); font-size: 1rem; margin-top: 10px; line-height: 1.6;">
            Hecha de una rama caída en la naturaleza. Sirve para dirigir el flujo de energía hacia tu objetivo ritual sin tocarlo directamente.
          </p>
        </div>

        <div class="tool-card fantasy-panel" style="padding: 1.6rem; background: rgba(255,255,255,0.03); border-left: 5px solid var(--color-teal);">
          <div style="font-size: 2.8rem; margin-bottom: 8px;">⭐</div>
          <h3 style="color: var(--color-teal); margin: 0; font-size: 1.4rem;">2. El Pentáculo del Dragón</h3>
          <p style="color: var(--text-main); font-size: 1rem; margin-top: 10px; line-height: 1.6;">
            Un dibujo de una estrella de 5 puntas con la silueta de un dragón grabado sobre madera o cartón, usado para equilibrar los 5 elementos.
          </p>
        </div>

        <div class="tool-card fantasy-panel" style="padding: 1.6rem; background: rgba(255,255,255,0.03); border-left: 5px solid var(--color-rust);">
          <div style="font-size: 2.8rem; margin-bottom: 8px;">🪞</div>
          <h3 style="color: var(--color-rust); margin: 0; font-size: 1.4rem;">3. El Espejo Mágico (Ojo de Dragón)</h3>
          <p style="color: var(--text-main); font-size: 1rem; margin-top: 10px; line-height: 1.6;">
            Un espejo decorado en el marco con caracteres del "Alfabeto de los Dragones" (Dragon Script) para concentrar la mente y desviar malas intenciones.
          </p>
        </div>

      </div>

      <!-- BANNER SIGUIENTE: LA ACADEMIA -->
      <div class="fantasy-panel text-center" style="padding: 2.2rem; background: linear-gradient(135deg, rgba(138,43,226,0.15), rgba(233,196,106,0.15)); border: 2px solid #8a2be2; border-radius: 20px;">
        <div style="font-size: 3rem;">🎓</div>
        <h3 class="panel-title margin-top-xs" style="color: var(--gold-main); font-size: 1.9rem;">¿Listo para avanzar en los 5 Anillos?</h3>
        <p style="color: var(--text-main); max-width: 700px; margin: 8px auto 0 auto; font-size: 1.05rem; line-height: 1.6;">
          Entrá a la <strong>Academia Draconiana</strong> y comenzá tu entrenamiento desde el Anillo 1 hasta el Anillo 5 de graduación.
        </p>
        <button class="btn btn-gold btn-lg margin-top-md" id="btn-go-academia-from-altar" style="padding: 12px 28px; font-weight: 700;">
          🎓 Entrar a la Academia Draconiana
        </button>
      </div>

    </div>
  `;

  setupMagicSubNavEvents(container);

  const btnGoAcad = container.querySelector("#btn-go-academia-from-altar");
  if (btnGoAcad) {
    btnGoAcad.addEventListener("click", () => {
      playSound("click");
      currentMagicPage = "academia";
      renderMagicSection(container);
    });
  }
}

// SUB-PÁGINA 3: LA ACADEMIA DRACONIANA (5 ANILLOS)
function renderAcademiaSubPage(container) {
  container.innerHTML = `
    <div class="magic-section-wrapper" style="display: flex; flex-direction: column; gap: 2rem;">
      
      <!-- HERO BANNER DE ACADEMIA SUB-PAGE -->
      <div class="magic-hero fantasy-panel text-center" style="padding: 2.2rem; background: linear-gradient(135deg, rgba(233,196,106,0.15), rgba(138,43,226,0.15)); border: 2px solid var(--gold-main); border-radius: 20px;">
        <div class="quiz-step-tag" style="font-size: 0.95rem;">🎓 Centro de Maestría 🎓</div>
        <h2 class="panel-title margin-top-xs" style="color: var(--gold-main); font-size: 2.3rem;">La Academia Draconiana</h2>
        <p style="color: var(--text-main); font-size: 1.1rem; max-width: 800px; margin: 12px auto 0 auto; line-height: 1.6;">
          Avanzá paso a paso a través de los 5 Anillos Internos del Saber para dominar la concentración, los encantamientos, la sanación, la protección y el misticismo.
        </p>

        <!-- SUB-NAV SWITCHER -->
        ${renderMagicSubNavHtml("academia")}
      </div>

      <!-- NAVEGACIÓN POR LOS 5 ANILLOS -->
      <div class="fantasy-panel" style="padding: 2rem;">
        <div class="text-center">
          <h3 class="panel-title" style="color: var(--gold-main); font-size: 1.8rem;">Los Cinco Anillos Internos del Saber</h3>
          <p style="color: var(--text-muted); font-size: 1rem; margin-top: 6px;">
            Seleccioná un Anillo para estudiar su lección y completar sus misiones:
          </p>
        </div>

        <!-- Navigation Chips for 5 Rings -->
        <div class="magic-rings-nav display-flex justify-center flex-wrap gap-sm margin-top-lg" style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
          <button class="chip ${currentMagicRing === 1 ? "active" : ""}" id="magic-ring-1" style="padding: 10px 18px; font-weight: 700;">🌱 Anillo 1: El Aprendiz</button>
          <button class="chip ${currentMagicRing === 2 ? "active" : ""}" id="magic-ring-2" style="padding: 10px 18px; font-weight: 700;">📜 Anillo 2: El Encantador</button>
          <button class="chip ${currentMagicRing === 3 ? "active" : ""}" id="magic-ring-3" style="padding: 10px 18px; font-weight: 700;">🌿 Anillo 3: El Chamán</button>
          <button class="chip ${currentMagicRing === 4 ? "active" : ""}" id="magic-ring-4" style="padding: 10px 18px; font-weight: 700;">🛡️ Anillo 4: El Guerrero</button>
          <button class="chip ${currentMagicRing === 5 ? "active" : ""}" id="magic-ring-5" style="padding: 10px 18px; font-weight: 700;">🔮 Anillo 5: El Místico</button>
        </div>

        <!-- Ring Content Container -->
        <div class="ring-detail-box margin-top-lg fantasy-panel" id="ring-detail-box" style="padding: 1.8rem; background: rgba(0,0,0,0.4); border-radius: 16px;">
          ${renderRingContent(currentMagicRing)}
        </div>
      </div>

    </div>
  `;

  setupMagicSubNavEvents(container);

  // Attach tab handlers for 5 Rings (1..5)
  for (let i = 1; i <= 5; i++) {
    const btn = container.querySelector(`#magic-ring-${i}`);
    if (btn) {
      btn.addEventListener("click", () => {
        playSound("click");
        currentMagicRing = i;
        renderAcademiaSubPage(container);
      });
    }
  }
}

function renderMagicTabContent(tabIndex) {
  if (tabIndex === 0) {
    // EL ALTAR Y LAS HERRAMIENTAS DEL MAGO
    return `
      <div style="display: flex; flex-direction: column; gap: 1.2rem;">
        <div style="display: flex; align-items: center; gap: 14px; background: rgba(233,196,106,0.15); padding: 1.2rem; border-radius: 14px; border: 1px solid var(--gold-main);">
          <span style="font-size: 2.8rem;">⚒️</span>
          <div>
            <h3 style="color: var(--gold-main); margin: 0; font-size: 1.7rem;">El Altar y las Herramientas del Mago Draconiano</h3>
            <p style="color: var(--text-gold); font-style: italic; margin: 4px 0 0 0; font-size: 1.05rem;">
              "Herramientas simbólicas para enfocar tu intención, equilibrar los elementos y canalizar energía."
            </p>
          </div>
        </div>

        <p style="line-height: 1.6; color: var(--text-main); font-size: 1.05rem;">
          Como practicante de la magia draconiana, podés fabricar o reunir tus propias herramientas en casa. Sirven para concentrar tu mente y dar forma a tus intenciones rituales:
        </p>

        <div class="tools-grid margin-top-sm" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
          
          <div class="tool-card fantasy-panel" style="padding: 1.4rem; background: rgba(255,255,255,0.03); border-left: 4px solid var(--gold-main);">
            <div style="font-size: 2.5rem; margin-bottom: 8px;">🪄</div>
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.25rem;">1. La Varita o Bastón de Roble</h4>
            <p style="color: var(--text-main); font-size: 0.95rem; margin-top: 8px; line-height: 1.5;">
              Hecha de una rama caída en la naturaleza. Sirve para dirigir el flujo de energía hacia tu objetivo sin tocarlo directamente.
            </p>
          </div>

          <div class="tool-card fantasy-panel" style="padding: 1.4rem; background: rgba(255,255,255,0.03); border-left: 4px solid var(--color-teal);">
            <div style="font-size: 2.5rem; margin-bottom: 8px;">⭐</div>
            <h4 style="color: var(--color-teal); margin: 0; font-size: 1.25rem;">2. El Pentáculo del Dragón</h4>
            <p style="color: var(--text-main); font-size: 0.95rem; margin-top: 8px; line-height: 1.5;">
              Un dibujo de una estrella de 5 puntas con la silueta de un dragón grabado sobre madera o cartón, usado para armonizar los 5 elementos.
            </p>
          </div>

          <div class="tool-card fantasy-panel" style="padding: 1.4rem; background: rgba(255,255,255,0.03); border-left: 4px solid var(--color-rust);">
            <div style="font-size: 2.5rem; margin-bottom: 8px;">🪞</div>
            <h4 style="color: var(--color-rust); margin: 0; font-size: 1.25rem;">3. El Espejo Mágico (Ojo de Dragón)</h4>
            <p style="color: var(--text-main); font-size: 0.95rem; margin-top: 8px; line-height: 1.5;">
              Un espejo decorado en el marco con caracteres del "Alfabeto de los Dragones" (Dragon Script) para concentrar la mente y desviar malas intenciones.
            </p>
          </div>

        </div>
      </div>
    `;
  }

  // Render content for Rings 1 to 5
  return renderRingContent(tabIndex);
}

function renderRingContent(ringNumber) {
  switch (ringNumber) {
    case 1:
      return `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          
          <!-- Encabezado del Anillo 1 -->
          <div style="display: flex; align-items: center; gap: 14px; background: rgba(42,157,143,0.15); padding: 1.2rem; border-radius: 14px; border: 1px solid var(--color-teal);">
            <span style="font-size: 2.8rem;">🌱</span>
            <div>
              <h3 style="color: var(--gold-main); margin: 0; font-size: 1.7rem;">Nivel 1: El Aprendiz de Dragón</h3>
              <p style="color: var(--text-gold); font-style: italic; margin: 4px 0 0 0; font-size: 1.05rem;">
                "¡Bienvenido al Primer Anillo! Convertirse en un mago draconiano es una aventura increíble que abrirá tu mente."
              </p>
            </div>
          </div>

          <p style="line-height: 1.6; color: var(--text-main); font-size: 1.05rem;">
            Todo gran mago debe empezar por dominar las habilidades más básicas: la <strong>concentración</strong>, la <strong>visualización</strong> (el arte de usar tu imaginación con fuerza) y la <strong>paciencia</strong>.
          </p>

          <!-- Código y Símbolos del Aprendiz -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin-0 0 10px 0; font-size: 1.3rem;">🔮 El Código y los Símbolos del Aprendiz</h4>
            
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(233,196,106,0.08); padding: 1rem; border-radius: 10px; border-left: 4px solid var(--gold-main);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">📜 Tu Lema Mágico:</h5>
                <p style="margin-top: 4px; font-style: italic; color: var(--text-gold); font-size: 1rem; font-weight: 600;">
                  "Ser llamado es tener un destino. Conósete bien a vos mismo"
                </p>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  Esto significa que todos tenemos un papel importante en este mundo. Para hacer magia de forma segura, primero debés ser honesto sobre tus propios sentimientos, tus talentos y tus defectos.
                </p>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
                <div style="background: rgba(42,157,143,0.1); padding: 1rem; border-radius: 10px; border: 1px stroke var(--color-teal);">
                  <h5 style="color: var(--color-teal); margin: 0; font-size: 1.1rem;">🟦 Tu Color: El Azul</h5>
                  <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                    Es el color de las emociones tranquilas y la magia de la mente. Conseguí un listón azul (de unos 60 cm) para ponértelo sobre los hombros cada vez que vayas a practicar tus hechizos o a meditar.
                  </p>
                </div>

                <div style="background: rgba(200,85,61,0.1); padding: 1rem; border-radius: 10px; border: 1px stroke var(--color-rust);">
                  <h5 style="color: var(--color-rust); margin: 0; font-size: 1.1rem;">⭐ Tu Símbolo: La Estrella Élfica</h5>
                  <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                    La estrella de 7 puntas. Dibujarla o seguir su forma con el dedo ayuda a que tu mente se relaje y sea más fácil contactar con el mundo mágico.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tus Primeras Herramientas Mágicas -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.3rem;">📚 Tus Primeras Herramientas Mágicas</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 4px;">Todo aprendiz necesita fabricar o conseguir dos libros muy especiales:</p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">📖 1. Los Secretos del Dragón</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  Un diario secreto donde escribirás todos los días tus pensamientos, tus sueños y cómo cambia tu vida a medida que avanzas en tus estudios mágicos.
                </p>
              </div>

              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">📁 2. El Tesoro del Dragón</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  Una carpeta con anillas donde guardarás tus rituales, hechizos y resultados. Escribí en la primera página con tus mejores colores: <em>"¡Este libro de secretos está escrito por la mano de [Tu Nombre Mágico]!"</em>
                </p>
              </div>
            </div>
          </div>

          <!-- Tu Nuevo Mejor Amigo: El Dragón Guardián -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(233,196,106,0.08); border: 1px solid var(--gold-main);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.3rem;">🐉 Tu Nuevo Mejor Amigo: El Dragón Guardián</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 1rem;">
              En este nivel vas a conocer a tu primer compañero mágico. Los dragones guardianes son los más jóvenes de su especie, ¡y algunos son tan pequeños que caben en la palma de tu mano!
            </p>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 1rem;">
              Son criaturas súper juguetonas a las que les encantan los aromas dulces y picantes, como el del <strong>jengibre</strong>, además de disfrutar la música y verte bailar libremente. Ellos serán tus "colaboradores", así que recordá la regla de oro: nunca intentes darles órdenes ni tratarlos como sirvientes, ¡o se irán!
            </p>
          </div>

          <!-- Misión 1: El Ritual de Contacto -->
          <div class="fantasy-panel" style="padding: 1.6rem; border: 2px solid var(--color-teal); background: rgba(42,157,143,0.1);">
            <h4 style="color: var(--color-teal); margin: 0; font-size: 1.4rem; text-align: center;">📜 Misión 1: El Ritual de Contacto</h4>
            <p style="text-align: center; color: var(--text-gold); font-size: 0.95rem; margin-top: 4px;">
              Seguí estos 6 pasos para invitar a tu dragón guardián a jugar y presentarte oficialmente:
            </p>

            <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 1.2rem;">
              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <strong style="color: var(--gold-main);">Paso 1:</strong> Andá a un lugar tranquilo de tu cuarto donde nadie te interrumpa y colocate tu listón azul de Aprendiz sobre los hombros.
              </div>

              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <strong style="color: var(--gold-main);">Paso 2:</strong> Sentate cómodamente, cerrá los ojos, respirá profundo para relajarte y decí en voz alta:
                <p style="margin: 8px 0 0 0; font-style: italic; color: var(--text-gold); background: rgba(233,196,106,0.1); padding: 10px; border-radius: 8px;">
                  "Estoy a salvo en el poderoso anillo del Dragón Aprendiz. Mientras me siento en este espacio, invito y llamo a mi dragón guardián para que esté aquí conmigo. Te ofrezco una amistad leal y cálida."
                </p>
              </div>

              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <strong style="color: var(--gold-main);">Paso 3:</strong> Dejá que tus pensamientos vuelen sin esperar nada en particular. En poco tiempo, es posible que sientas una ligera brisa en el cuello, un leve roce en tu piel, o simplemente una sensación muy fuerte de que ya no estás solo en tu cuarto.
              </div>

              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <strong style="color: var(--gold-main);">Paso 4:</strong> A los dragones les gusta pararse detrás de vos, así que no esperes verlos flotando frente a tus ojos físicos. En cambio, míralo a través de tu imaginación con los ojos cerrados: puede que veas un destello de su cuerpo o un gran ojo amigable mirándote.
              </div>

              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <strong style="color: var(--gold-main);">Paso 5:</strong> Envíale mentalmente un gran saludo de amistad. A cambio, tu dragón guardián te rodeará con un sentimiento muy cálido, ¡como si te diera un gran abrazo invisible! Desde ese momento serán inseparables.
              </div>

              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <strong style="color: var(--gold-main);">Paso 6:</strong> Abrí los ojos lentamente, poné las palmas de tus manos en el suelo para soltar la energía sobrante y dale las gracias a tu nuevo compañero mágico por haber venido.
              </div>
            </div>
          </div>

        </div>
      `;
    case 2:
      return `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          
          <!-- Encabezado del Anillo 2 -->
          <div style="display: flex; align-items: center; gap: 14px; background: rgba(42,157,143,0.15); padding: 1.2rem; border-radius: 14px; border: 1px solid var(--color-teal);">
            <span style="font-size: 2.8rem;">📜</span>
            <div>
              <h3 style="color: var(--gold-main); margin: 0; font-size: 1.7rem;">Nivel 2: El Encantador de Dragones</h3>
              <p style="color: var(--text-gold); font-style: italic; margin: 4px 0 0 0; font-size: 1.05rem;">
                "¡Felicidades por avanzar al Segundo Anillo! Es hora de aprender el antiguo arte de los hechizos, las pociones de la naturaleza y los amuletos mágicos."
              </p>
            </div>
          </div>

          <!-- Código y Símbolos del Encantador -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0 0 10px 0; font-size: 1.3rem;">🌿 Tu Código y Símbolos de Encantador</h4>
            
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(233,196,106,0.08); padding: 1rem; border-radius: 10px; border-left: 4px solid var(--gold-main);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">📜 Tu Lema Mágico:</h5>
                <p style="margin-top: 4px; font-style: italic; color: var(--text-gold); font-size: 1rem; font-weight: 600;">
                  "La magia es tanto un arte como una ciencia. Trátala siempre con respeto"
                </p>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  Como Encantador, aprenderás a usar ingredientes de la naturaleza, pero recuerda la regla más grande: la magia se usa para ayudar, sanar y mejorar, ¡nunca para tratar de controlar a otras personas! A los dragones no les gustan los tiranos y no ayudarán a quien intente ser uno.
                </p>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
                <div style="background: rgba(42,157,143,0.1); padding: 1rem; border-radius: 10px; border: 1px stroke var(--color-teal);">
                  <h5 style="color: var(--color-teal); margin: 0; font-size: 1.1rem;">🟩 Tu Color: El Verde Brillante</h5>
                  <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                    Representa el crecimiento de la naturaleza, la prosperidad y la magia positiva. Conseguí un listón verde y ponértelo en los hombros cada vez que vayas a trabajar en tus proyectos mágicos.
                  </p>
                </div>

                <div style="background: rgba(200,85,61,0.1); padding: 1rem; border-radius: 10px; border: 1px stroke var(--color-rust);">
                  <h5 style="color: var(--color-rust); margin: 0; font-size: 1.1rem;">🔺 Tu Símbolo: El Triángulo Ascendente</h5>
                  <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                    El triángulo apuntando hacia arriba. Podés dibujarlo en tu cuaderno de secretos para enfocar la fuerza del fuego y la mente.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tu Laboratorio Mágico: Nuevas Herramientas -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.3rem;">🧪 Tu Laboratorio Mágico: Nuevas Herramientas</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 4px;">Para hacer la magia de un Encantador, necesitarás reunir tu propio equipo de laboratorio:</p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">🪄 La Varita Mágica</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  Tu herramienta principal para dirigir buena energía. Podés buscar en el parque una rama caída que te guste, o usar un tubo transparente con piedritas de colores y un cristal de cuarzo en la punta.
                </p>
              </div>

              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">🥣 El Mortero y Frasquitos</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  Un mortero pequeño (un tazón grueso para machacar) y varios frasquitos vacíos limpios con tapa. Aquí guardarás y molerás tus hierbas mágicas.
                </p>
              </div>

              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">🧵 Telas de Colores</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  Reuní pedacitos de tela (verde, blanca, roja) e hilos de colores. Te servirán para confeccionar pequeñas bolsitas mágicas.
                </p>
              </div>
            </div>
          </div>

          <!-- Misión 1: Amuletos y Talismanes de Poder -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(233,196,106,0.08); border: 1px solid var(--gold-main);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.3rem;">✨ Misión 1: Amuletos y Talismanes de Poder</h4>
            <p style="margin-top: 6px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              ¿Sabías que no son lo mismo? Conocer la diferencia te ayudará a crear tus propias herramientas de buena suerte:
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.05rem;">🪨 Los Amuletos (Naturaleza):</h5>
                <p style="margin-top: 6px; font-size: 0.9rem; color: var(--text-main); line-height: 1.5;">
                  Son regalitos creados por la naturaleza, como una piedra con forma curiosa, una concha de mar o una bellota (que te protege y te da fuerza). Solo tenés que encontrarlos y llevarlos con vos.
                </p>
              </div>
              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.05rem;">🎨 Los Talismanes (Creación Propia):</h5>
                <p style="margin-top: 6px; font-size: 0.9rem; color: var(--text-main); line-height: 1.5;">
                  Son objetos creados por vos. Podés hacer una pequeña moneda de arcilla, dibujarle tu inicial o un símbolo de dragón con marcador mágico, ¡y usarla para llenarte de valentía!
                </p>
              </div>
            </div>
          </div>

          <!-- Misión 2: Polvo de "Amistad de Dragón" -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--color-teal); background: rgba(42,157,143,0.1);">
            <h4 style="color: var(--color-teal); margin: 0; font-size: 1.4rem;">🌸 Misión 2: Polvo de "Amistad de Dragón"</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              Aprendé a hacer polvos mágicos inofensivos usando una base de talco sin aroma o bicarbonato. En tu tazón, mezclá el polvo con hojas secas de flores que huelan muy rico (como pétalos de rosa).
            </p>
            <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; margin-top: 10px;">
              <strong style="color: var(--gold-main);">Conjuro de Mezcla:</strong>
              <p style="margin: 6px 0 0 0; font-style: italic; color: var(--text-gold); font-size: 0.95rem;">
                "Llamo a los dragones, cerca y lejos, para que se unan a mí dondequiera que estén. Compartiré con ustedes un corazón feliz, cuando nos encontremos y cuando nos despidamos."
              </p>
            </div>
            <p style="margin-top: 10px; font-size: 0.9rem; color: var(--text-muted);">
              Guárdalo en tu frasco, y espolvoreá un poquito en tu cuarto cuando quieras invitar a los pequeños dragones guardianes a que te hagan compañía.
            </p>
          </div>

          <!-- Misión 3: Pociones de "Agua de la Naturaleza" -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--color-rust); background: rgba(200,85,61,0.1);">
            <h4 style="color: var(--color-rust); margin: 0; font-size: 1.4rem;">💧 Misión 3: Pociones de "Agua de la Naturaleza"</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              Los Encantadores preparan pociones de agua llamadas "condensadores de fluidos", que sirven para atrapar la energía de los elementos. Pídele a un adulto que te ayude a calentar un poquito de agua pura y agrégale hojas frescas de tu jardín (como menta, rosas o lavanda). Déjala enfriar por completo, cuélala y guárdala en una botellita.
            </p>
            <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; margin-top: 10px;">
              <strong style="color: var(--gold-main);">Encantamiento de Cierre:</strong>
              <p style="margin: 6px 0 0 0; font-style: italic; color: var(--text-gold); font-size: 0.95rem;">
                "Dragones de agua, sutiles pero audaces, energicen esta botella que sostengo. Confío en su sabiduría y en su poder, que me ayuda a hacer magia en esta hora."
              </p>
            </div>
            <p style="margin-top: 10px; font-size: 0.9rem; color: var(--text-muted);">
              Podés poner unas gotitas de esta agua mágica en tus amuletos para recargarlos de energía limpia y positiva.
            </p>
          </div>

        </div>
      `;
    case 3:
      return `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          
          <!-- Encabezado del Anillo 3 -->
          <div style="display: flex; align-items: center; gap: 14px; background: rgba(200,85,61,0.15); padding: 1.2rem; border-radius: 14px; border: 1px solid var(--color-rust);">
            <span style="font-size: 2.8rem;">🌿</span>
            <div>
              <h3 style="color: var(--gold-main); margin: 0; font-size: 1.7rem;">Nivel 3: El Chamán de Dragones (Sanador de Energía)</h3>
              <p style="color: var(--text-gold); font-style: italic; margin: 4px 0 0 0; font-size: 1.05rem;">
                "¡Increíble! Has llegado al Tercer Anillo. Dejarás de ser un aprendiz para trabajar profundamente con el mundo espiritual y convertirte en un 'Caminante entre Mundos'."
              </p>
            </div>
          </div>

          <p style="line-height: 1.6; color: var(--text-main); font-size: 1.05rem;">
            Los chamanes trabajan junto a los dragones para sanar la energía, calmar las emociones y mantener el equilibrio invisible de las cosas.
          </p>

          <!-- Código y Símbolos de Chamán -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0 0 10px 0; font-size: 1.3rem;">✨ Tu Código y Símbolos de Chamán</h4>
            
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(233,196,106,0.08); padding: 1rem; border-radius: 10px; border-left: 4px solid var(--gold-main);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">📜 Tu Lema Mágico:</h5>
                <p style="margin-top: 4px; font-style: italic; color: var(--text-gold); font-size: 1rem; font-weight: 600;">
                  "Para beneficiar a todos, debo viajar y aprender en el Multiverso. Soy un Caminante entre Mundos"
                </p>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
                <div style="background: rgba(200,85,61,0.15); padding: 1rem; border-radius: 10px; border: 1px stroke var(--color-rust);">
                  <h5 style="color: var(--color-rust); margin: 0; font-size: 1.1rem;">🔴 Tu Color: El Rojo Brillante</h5>
                  <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                    Este color representa la acción, el esfuerzo y el gran poder para sanar. Conseguí un listón rojo para ponerlo en tus hombros en tus prácticas.
                  </p>
                </div>

                <div style="background: rgba(42,157,143,0.15); padding: 1rem; border-radius: 10px; border: 1px stroke var(--color-teal);">
                  <h5 style="color: var(--color-teal); margin: 0; font-size: 1.1rem;">🍃 Tu Símbolo: La Hoja Verde del Árbol del Mundo</h5>
                  <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                    Una hoja verde que representa el Árbol del Mundo y la naturaleza. Podés dibujarla o buscar un prendedor con esta forma para usarlo como tu medalla.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tus Herramientas de Sanación -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.3rem;">💎 Tus Herramientas de Sanación</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 4px;">
              Un Chamán necesita piedras muy especiales (que podés buscar en el parque o en un río) para ayudar a los demás:
            </p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">🖤 La Piedra "Aspiradora"</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  Una piedra negra y de superficie suave (como el ónix o la obsidiana). Sirve como una aspiradora mágica para absorber y limpiar el mal humor, el estrés o la energía negativa del ambiente.
                </p>
              </div>

              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">🤍 El Cristal Sellador</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  Una piedra blanca (como el cuarzo nevado) que se usa inmediatamente después de la piedra negra, para "sellar" y rellenar de luz y buena energía el espacio que limpiaste.
                </p>
              </div>
            </div>
          </div>

          <!-- Misión 1: Sentir el Aura -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--color-teal); background: rgba(42,157,143,0.1);">
            <h4 style="color: var(--color-teal); margin: 0; font-size: 1.4rem;">🖐️ Misión 1: Sentir el Aura (Tu Campo de Fuerza Invisible)</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              ¿Sabías que todas las personas, animales e incluso las cosas están rodeados por un campo electromagnético invisible llamado <strong>Aura</strong>? Algunos magos la ven como luces de colores, otros como luz blanca, y otros simplemente la "sienten".
            </p>
            <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; margin-top: 10px;">
              <strong style="color: var(--gold-main);">Cómo practicar:</strong>
              <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                Pídele a un amigo o familiar que se siente tranquilo. Relajá tu mente y mové tus manos muy despacio en el aire, a unos 15 centímetros de su cuerpo, sin tocarlo en ningún momento. Con práctica, empezarás a "sentir" el aura: podés notar lugares que se sienten más fríos, más calientes, o un leve cosquilleo. ¡Los chamanes usan este ejercicio para descubrir dónde necesita una persona un abrazo de energía mágica!
              </p>
            </div>
          </div>

          <!--           <!-- Misión 3: El Sonido que Cura -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--color-rust); background: rgba(200,85,61,0.1);">
            <h4 style="color: var(--color-rust); margin: 0; font-size: 1.4rem;">🎵 Misión 3: El Sonido que Cura</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              Los chamanes descubrieron que la vibración de la voz es una gran herramienta de sanación.
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-top: 10px;">
              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <strong style="color: var(--color-teal);">🌬️ Sonido "AAHH" (Relajación):</strong>
                <p style="margin-top: 4px; font-size: 0.9rem; color: var(--text-main);">
                  Si tú o alguien de tu familia se siente cansado, cantá en voz alta y suavemente el sonido <em>"aahh"</em>, que ayuda a sanar y relajar la mente y el cuerpo.
                </p>
              </div>
              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <strong style="color: var(--gold-main);">⚡ Sonido "EEEE" (Energización):</strong>
                <p style="margin-top: 4px; font-size: 0.9rem; color: var(--text-main);">
                  Si lo que necesitan es despertar y llenarse de energía positiva, el sonido mágico es <em>"eeee"</em>. ¡Pruébalo mientras sostienes tus piedras curativas en las manos!
                </p>
              </div>
            </div>
          </div>

        </div>
      `;
    case 4:
      return `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          
          <!-- Encabezado del Anillo 4 -->
          <div style="display: flex; align-items: center; gap: 14px; background: rgba(233,196,106,0.15); padding: 1.2rem; border-radius: 14px; border: 1px solid var(--gold-main);">
            <span style="font-size: 2.8rem;">🛡️</span>
            <div>
              <h3 style="color: var(--gold-main); margin: 0; font-size: 1.7rem;">Nivel 4: El Guerrero Dragón (El Protector Valiente)</h3>
              <p style="color: var(--text-gold); font-style: italic; margin: 4px 0 0 0; font-size: 1.05rem;">
                "¡Bienvenido al Cuarto Anillo! ¡Un Guerrero Dragón no usa los puños! Usa su súper confianza, escudos de energía e inteligencia para triunfar sobre cualquier problema."
              </p>
            </div>
          </div>

          <!-- Código y Símbolos de Guerrero -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0 0 10px 0; font-size: 1.3rem;">✨ Tu Código y Símbolos de Guerrero</h4>
            
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(233,196,106,0.08); padding: 1rem; border-radius: 10px; border-left: 4px solid var(--gold-main);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">📜 Tu Lema Mágico:</h5>
                <p style="margin-top: 4px; font-style: italic; color: var(--text-gold); font-size: 1rem; font-weight: 600;">
                  "Defiendo la verdad, protejo mi energía y nunca busco problemas donde no los hay. ¡Uso mi sentido común!"
                </p>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  El verdadero poder de un guerrero es saber cuándo alejarse de una pelea y mantenerse tranquilo.
                </p>
              </div>

              <div style="background: rgba(233,196,106,0.12); padding: 1rem; border-radius: 10px; border: 1px stroke var(--gold-main);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">🟡 Tu Color: El Dorado o Amarillo Brillante</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  El color de la fuerza y la protección invencible. Podés conseguir un listón de este color para usarlo en tus meditaciones de fortaleza.
                </p>
              </div>
            </div>
          </div>

          <!-- Tus Herramientas de Defensa -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.3rem;">🛡️ Tus Herramientas de Defensa</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 4px;">
              Un Guerrero Dragón cuenta con dos poderosos escudos emocionales:
            </p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">🪞 1. El Espejo Brillante</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  Un espejo pequeño que usarás para "rebotar" las malas energías o las palabras feas sin guardarte rencor.
                </p>
              </div>

              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">🪵 2. El Bastón de Equilibrio</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  Una vara larga de madera (puedes buscar una rama firme en el parque). Sirve para mantener tu equilibrio emocional cuando sientes que te vas a caer o a rendir.
                </p>
              </div>
            </div>
          </div>

          <!-- Misión 1: El Hechizo del "Espejo Rebotador" -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--gold-main); background: rgba(233,196,106,0.08);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.4rem;">🪞 Misión 1: El Hechizo del "Espejo Rebotador"</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              A veces, en la escuela o en la calle, te puedes encontrar con personas que están de muy mal humor o que dicen cosas hirientes (a esto le llamamos "energía dañina"). ¡No dejes que se pegue a vos!
            </p>
            <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; margin-top: 10px;">
              <strong style="color: var(--gold-main);">Tu tarea de Guerrero:</strong>
              <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                Toma tu Espejo Brillante y sostenlo frente a vos con la parte que refleja apuntando hacia afuera (hacia el mundo). Imagina que tu dragón guardián está proyectando su imagen en ese espejo para protegerte. Luego, repite este conjuro especial:
              </p>
              <p style="margin: 8px 0 0 0; font-style: italic; color: var(--text-gold); background: rgba(233,196,106,0.1); padding: 10px; border-radius: 8px;">
                "En este espejo brillante y protector, un gran dragón refleja su valor. Me quedo aquí seguro y sin temor, ¡que la mala energía se aleje a su creador!"
              </p>
              <p style="margin-top: 8px; font-size: 0.9rem; color: var(--text-muted);">
                Después, lava tu espejo con un poco de agua para limpiarlo de cualquier mala vibra que haya atrapado.
              </p>
            </div>
          </div>

          <!-- Misión 2: Caminar con la Confianza del Dragón -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--color-teal); background: rgba(42,157,143,0.1);">
            <h4 style="color: var(--color-teal); margin: 0; font-size: 1.4rem;">🐉 Misión 2: Caminar con la Confianza del Dragón</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              El secreto más grande de los Guerreros Dragón es que desarrollan una confianza en sí mismos tan gigante que los ayuda a superar cualquier cosa.
            </p>
            <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; margin-top: 10px;">
              <strong style="color: var(--color-teal);">Tu tarea de Actitud:</strong>
              <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                La próxima vez que te sientas nervioso (antes de un examen o de hablar en público), toma tu Bastón de Equilibrio con fuerza. Párate muy derecho, respira hondo e imagina que unas enormes alas de dragón se abren a tus espaldas. Camina sintiendo que eres invencible. ¡Esa actitud hará que cualquier obstáculo parezca diminuto!
              </p>
            </div>
          </div>

          <!-- Misión 3: La Regla del "No-Problema" -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--color-rust); background: rgba(200,85,61,0.1);">
            <h4 style="color: var(--color-rust); margin: 0; font-size: 1.4rem;">📜 Misión 3: La Regla del "No-Problema"</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              Ser un guerrero significa tener mucho poder, y tener poder significa ser muy responsable.
            </p>
            <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; margin-top: 10px;">
              <strong style="color: var(--color-rust);">Promesa del Anillo:</strong>
              <p style="margin-top: 6px; font-style: italic; color: var(--text-gold); font-size: 1rem;">
                "No hagas problemas donde no los hay"
              </p>
              <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                Si ves que una discusión está a punto de empezar, sé el más inteligente de la habitación y aléjate. Un guerrero siempre tiene la mente abierta, ¡pero usa su sentido común para mantenerse a salvo!
              </p>
            </div>
          </div>

        </div>
      `;
    case 5:
    default:
      return `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          
          <!-- Encabezado del Anillo 5 -->
          <div style="display: flex; align-items: center; gap: 14px; background: linear-gradient(135deg, rgba(138,43,226,0.2), rgba(233,196,106,0.15)); padding: 1.2rem; border-radius: 14px; border: 1px solid #8a2be2;">
            <span style="font-size: 2.8rem;">🔮</span>
            <div>
              <h3 style="color: var(--gold-main); margin: 0; font-size: 1.7rem;">Nivel 5: El Místico Dragón (Maestro de la Red de la Vida)</h3>
              <p style="color: var(--text-gold); font-style: italic; margin: 4px 0 0 0; font-size: 1.05rem;">
                "¡Felicidades, joven mago! Has llegado al Quinto Anillo, el último y más alto nivel. Te conviertes en un guardián de la naturaleza y del universo."
              </p>
            </div>
          </div>

          <!-- Código y Símbolos de Místico -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0 0 10px 0; font-size: 1.3rem;">✨ Tu Código y Símbolos de Místico</h4>
            
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(138,43,226,0.1); padding: 1rem; border-radius: 10px; border-left: 4px solid #8a2be2;">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">📜 Tu Lema Mágico:</h5>
                <p style="margin-top: 4px; font-style: italic; color: var(--text-gold); font-size: 1rem; font-weight: 600;">
                  "Todos somos parte de la Red de la Vida. Todas las cosas, animadas e inanimadas, están conectadas"
                </p>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  Esto significa que todo lo que haces, dices o piensas es como lanzar una piedrita en un estanque: ¡crea ondas que viajan y tocan todo a tu alrededor!
                </p>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
                <div style="background: rgba(138,43,226,0.15); padding: 1rem; border-radius: 10px; border: 1px stroke #8a2be2;">
                  <h5 style="color: #b19ffb; margin: 0; font-size: 1.1rem;">🟣 Tu Color: El Violeta o Gris Plateado</h5>
                  <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                    Los colores del universo, de las estrellas y de la magia más profunda. Conseguí un listón de este color para celebrar tu gran graduación.
                  </p>
                </div>

                <div style="background: rgba(233,196,106,0.1); padding: 1rem; border-radius: 10px; border: 1px stroke var(--gold-main);">
                  <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">🌠 Tu Símbolo: La Estrella Fugaz</h5>
                  <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                    La estrella fugaz (o estrella de 9 puntas). Representa un viaje lleno de sorpresas maravillosas, sabiduría e iluminación.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- El Secreto Supremo: El Elemento Tormenta -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3); border: 1px solid var(--color-teal);">
            <h4 style="color: var(--color-teal); margin: 0; font-size: 1.3rem;">⚡ El Secreto Supremo: El Elemento Tormenta</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              Mientras que otros niveles trabajan con el Aire, Fuego, Agua y Tierra, el Místico trabaja con el misterioso <strong>elemento de la Tormenta</strong>. Las tormentas traen cambios, y un Místico sabe que cambiar y crecer es parte de la vida. ¡Un Místico no le teme a los cambios, los usa para volar más alto!
            </p>
          </div>

          <!-- Misión 1: Sentir la "Red de la Vida" -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid #8a2be2; background: rgba(138,43,226,0.1);">
            <h4 style="color: #b19ffb; margin: 0; font-size: 1.4rem;">🌱 Misión 1: Sentir la "Red de la Vida"</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              Para esta misión, sal a un parque, a tu jardín o siéntate junto a tu planta favorita.
            </p>
            <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; margin-top: 10px;">
              <strong style="color: var(--gold-main);">Tu tarea de Conexión:</strong>
              <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                Toca suavemente la corteza de un árbol o las hojas de una planta. Cierra los ojos e imagina que un hilo de luz brillante y muy delgadito sale de tu corazón y se conecta con el árbol. Luego, imagina que ese hilo se conecta con los pajaritos, con las nubes, con tu familia y con las estrellas. Siente cómo la energía de todo el universo te abraza. ¡Nunca estás solo, porque estás conectado con todo lo que existe!
              </p>
            </div>
          </div>

          <!-- Misión 2: Despertar tu "Corazón de Dragón Oculto" -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--gold-main); background: rgba(233,196,106,0.08);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.4rem;">💖 Misión 2: Despertar tu "Corazón de Dragón Oculto"</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              Los maestros draconianos enseñan que muy en el fondo de tu mente (justo detrás de tus ojos) se esconde un tesoro invaluable: tu <strong>Corazón de Dragón Oculto</strong>.
            </p>
            <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; margin-top: 10px;">
              <strong style="color: var(--gold-main);">Tu tarea de Iluminación:</strong>
              <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                Siéntate en silencio, respira profundo y visualiza que dentro de tu cabeza hay un pequeño sol brillante de color violeta. Ese es tu Corazón de Dragón. Es el lugar donde guardas toda tu valentía, tu paz y tu inteligencia. Cuando te sientas triste, asustado o no sepas qué hacer, solo cierra los ojos, respira y conéctate con esta luz. ¡Te dará la respuesta correcta!
              </p>
            </div>
          </div>

          <!-- Misión 3: El Gran Viaje (Tu Graduación) -->
          <div class="fantasy-panel text-center" style="padding: 1.8rem; border: 2px solid var(--gold-main); background: linear-gradient(135deg, rgba(233,196,106,0.15), rgba(138,43,226,0.2)); border-radius: 18px;">
            <div style="font-size: 3rem;">🎓</div>
            <h4 style="color: var(--gold-main); margin: 6px 0 0 0; font-size: 1.6rem;">🎓 Misión 3: El Gran Viaje (Tu Graduación)</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 1rem; max-width: 700px; margin: 8px auto 0 auto;">
              El viaje de un Místico nunca termina realmente, porque siempre hay cosas nuevas y emocionantes por descubrir y aprender en el universo.
            </p>
            <div style="background: rgba(0,0,0,0.5); padding: 1.2rem; border-radius: 12px; margin-top: 1.2rem; text-align: left;">
              <strong style="color: var(--gold-main);">Tu Juramento de Graduación:</strong>
              <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                Toma tu "Diario de Secretos del Dragón" (tu cuaderno mágico) y dibuja una estrella fugaz grande en la última página. Escribe debajo:
              </p>
              <p style="margin: 8px 0 0 0; font-style: italic; color: var(--text-gold); background: rgba(233,196,106,0.1); padding: 10px; border-radius: 8px; font-weight: 700; text-align: center;">
                "Prometo usar mi magia para ayudar al mundo y seguir aprendiendo todos los días."
              </p>
              <p style="margin-top: 10px; font-size: 0.9rem; color: var(--text-muted); text-align: center;">
                ¡Firma con tu Nombre Mágico y celebra con tu Dragón Guardián! 🎉🐉✨
              </p>
            </div>
          </div>

        </div>
      `;
  }
}

function initApp() {
  try {
    initParticlesCanvas("particle-canvas");
    setupNavigationTabs();
    setupFilterControls();
    setupAudioControls();
    
    initQuizModule("quiz-container");
    initMagicModule("magic-container");
    initSigilForge("sigil-container");

    applyFilters();
    renderEncyclopedia();
  } catch (e) {
    console.error("App init error:", e);
    applyFilters();
    renderEncyclopedia();
  }
}

function switchTab(tabName) {
  if (!tabName) return;

  const tabBtns = document.querySelectorAll(".nav-tab");
  tabBtns.forEach(b => {
    if (b.dataset.tab === tabName) {
      b.classList.add("active");
    } else {
      b.classList.remove("active");
    }
  });

  playSound("click");

  const sections = document.querySelectorAll(".view-section");
  sections.forEach(sec => {
    sec.classList.remove("active");
    sec.style.display = "none";
  });

  const targetSec = document.getElementById(`section-${tabName}`);
  if (targetSec) {
    targetSec.classList.add("active");
    targetSec.style.display = "block";
  }

  if (tabName === "encyclopedia") {
    renderEncyclopedia();
  } else if (tabName === "sigils") {
    initSigilForge("sigil-container");
  } else if (tabName === "magic") {
    initMagicModule("magic-container");
  } else if (tabName === "quiz") {
    initQuizModule("quiz-container");
  } else if (tabName === "favorites") {
    renderFavoritesView();
  }
}

window.switchTab = switchTab;

function setupNavigationTabs() {
  const tabBtns = document.querySelectorAll(".nav-tab");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const tab = btn.dataset.tab;
      if (tab) switchTab(tab);
    });
  });
}

function setupAudioControls() {
  const btnAudio = document.getElementById("btn-audio-toggle");
  if (btnAudio) {
    btnAudio.addEventListener("click", () => {
      const enabled = toggleSound();
      btnAudio.textContent = enabled ? "🔊 Sonido: ON" : "🔇 Sonido: OFF";
    });
  }
}

function setupFilterControls() {
  const searchInput = document.getElementById("search-input");
  const mythologySelect = document.getElementById("filter-mythology");
  const elementSelect = document.getElementById("filter-element");
  const typeSelect = document.getElementById("filter-type");
  const dangerSelect = document.getElementById("filter-danger");
  const sortSelect = document.getElementById("filter-sort");
  const btnReset = document.getElementById("btn-reset-filters");

  if (mythologySelect) {
    mythologySelect.innerHTML = MYTHOLOGIES.map(m => `<option value="${m}">${m}</option>`).join("");
    mythologySelect.addEventListener("change", e => { selectedMythology = e.target.value; applyFilters(); });
  }

  if (elementSelect) {
    elementSelect.innerHTML = ELEMENTS.map(el => `<option value="${el}">${el}</option>`).join("");
    elementSelect.addEventListener("change", e => { selectedElement = e.target.value; applyFilters(); });
  }

  if (typeSelect) {
    typeSelect.innerHTML = TYPES.map(t => `<option value="${t}">${t}</option>`).join("");
    typeSelect.addEventListener("change", e => { selectedType = e.target.value; applyFilters(); });
  }

  if (dangerSelect) dangerSelect.addEventListener("change", e => { selectedDanger = e.target.value; applyFilters(); });
  if (sortSelect) sortSelect.addEventListener("change", e => { selectedSort = e.target.value; applyFilters(); });

  if (searchInput) {
    searchInput.addEventListener("input", e => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  if (btnReset) {
    btnReset.addEventListener("click", () => {
      searchQuery = "";
      selectedMythology = "Todas";
      selectedElement = "Todos";
      selectedType = "Todos";
      selectedDanger = "Todos";
      selectedSort = "name-asc";

      if (searchInput) searchInput.value = "";
      if (mythologySelect) mythologySelect.value = "Todas";
      if (elementSelect) elementSelect.value = "Todos";
      if (typeSelect) typeSelect.value = "Todos";
      if (dangerSelect) dangerSelect.value = "Todos";
      if (sortSelect) sortSelect.value = "name-asc";

      playSound("click");
      applyFilters();
    });
  }
}

function applyFilters() {
  filteredDragons = DRAGONS_DATA.filter(dragon => {
    if (searchQuery) {
      const matchName = dragon.name.toLowerCase().includes(searchQuery);
      const matchMyth = dragon.mythology.toLowerCase().includes(searchQuery);
      const matchScroll = dragon.scroll.toLowerCase().includes(searchQuery);
      const matchAbility = dragon.ability.toLowerCase().includes(searchQuery);
      if (!matchName && !matchMyth && !matchScroll && !matchAbility) return false;
    }
    if (selectedMythology !== "Todas" && !dragon.mythology.includes(selectedMythology) && !selectedMythology.includes(dragon.mythology)) return false;
    if (selectedElement !== "Todos" && !dragon.element.includes(selectedElement) && !selectedElement.includes(dragon.element)) return false;
    if (selectedType !== "Todos" && dragon.type !== selectedType) return false;
    if (selectedDanger !== "Todos" && dragon.danger !== parseInt(selectedDanger, 10)) return false;

    return true;
  });

  filteredDragons.sort((a, b) => {
    if (selectedSort === "name-asc") return a.name.localeCompare(b.name);
    if (selectedSort === "name-desc") return b.name.localeCompare(a.name);
    if (selectedSort === "danger-desc") return b.danger - a.danger;
    if (selectedSort === "danger-asc") return a.danger - b.danger;
    return 0;
  });

  currentPage = 1;
  renderEncyclopedia();
}

function renderEncyclopedia() {
  const grid = document.getElementById("dragons-grid");
  const countBadge = document.getElementById("results-count");
  const paginationBox = document.getElementById("pagination-box");

  if (countBadge) {
    countBadge.textContent = `${filteredDragons.length} Dragones Encontrados`;
  }

  if (!grid) return;

  if (filteredDragons.length === 0) {
    grid.innerHTML = `
      <div class="empty-state fantasy-panel">
        <h3>🔍 No se encontraron dragones</h3>
        <p>Probá cambiando las palabras del buscador o reiniciando los filtros.</p>
      </div>
    `;
    if (paginationBox) paginationBox.innerHTML = "";
    return;
  }

  const totalPages = Math.ceil(filteredDragons.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageDragons = filteredDragons.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  grid.innerHTML = pageDragons.map(dragon => renderDragonCardHTML(dragon)).join("");

  grid.querySelectorAll(".dragon-card").forEach(card => {
    const dragonId = parseInt(card.dataset.id, 10);
    const dragon = DRAGONS_DATA.find(d => d.id === dragonId);

    card.addEventListener("click", e => {
      if (e.target.closest(".fav-btn")) return;
      if (dragon) openDragonModal(dragon);
    });

    const favBtn = card.querySelector(".fav-btn");
    if (favBtn) {
      favBtn.addEventListener("click", e => {
        e.stopPropagation();
        toggleFavorite(dragonId);
        favBtn.classList.toggle("active", favoritesSet.has(dragonId));
        favBtn.innerHTML = favoritesSet.has(dragonId) ? "❤️" : "🤍";
      });
    }
  });

  renderPaginationControls(totalPages, paginationBox);
}

function getDragonArtworkSrc(dragon) {
  return `assets/dragons/dragon_${dragon.id}.jpg`;
}

function renderDragonCardHTML(dragon) {
  const isFav = favoritesSet.has(dragon.id);
  const dangerLevel = Math.max(1, Math.min(5, parseInt(dragon.danger || 1, 10)));
  const flames = "🔥".repeat(dangerLevel);
  const hasJpg = dragon.id <= 12;

  const mediaHtml = hasJpg
    ? `<img src="assets/dragons/dragon_${dragon.id}.jpg" alt="${dragon.name}" class="dragon-artwork-img" />`
    : renderDragonSVG(dragon, 260, 200);

  return `
    <div class="dragon-card fantasy-panel" data-id="${dragon.id}">
      <button class="fav-btn ${isFav ? "active" : ""}" title="Guardar en Favoritos">
        ${isFav ? "❤️" : "🤍"}
      </button>

      <div class="dragon-card-svg">
        ${mediaHtml}
      </div>

      <div class="dragon-card-info">
        <span class="element-badge">${dragon.element || "Místico"}</span>
        <h3 class="dragon-name">${dragon.name || "Dragón Leyenda"}</h3>
        <p class="dragon-mythology">📜 Mitología ${dragon.mythology || "Ancestral"}</p>
        <div class="dragon-danger">Peligro: ${flames}</div>
      </div>
    </div>
  `;
}

function renderPaginationControls(totalPages, container) {
  if (!container) return;
  if (totalPages <= 1) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = `
    <button class="btn btn-secondary btn-sm" id="btn-prev-page" ${currentPage === 1 ? "disabled" : ""}>◀ Anterior</button>
    <span class="pagination-info">Página ${currentPage} de ${totalPages}</span>
    <button class="btn btn-secondary btn-sm" id="btn-next-page" ${currentPage === totalPages ? "disabled" : ""}>Siguiente ▶</button>
  `;

  const btnPrev = container.querySelector("#btn-prev-page");
  const btnNext = container.querySelector("#btn-next-page");

  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        playSound("click");
        renderEncyclopedia();
        window.scrollTo({ top: 300, behavior: "smooth" });
      }
    });
  }

  if (btnNext) {
    btnNext.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        playSound("click");
        renderEncyclopedia();
        window.scrollTo({ top: 300, behavior: "smooth" });
      }
    });
  }
}

function openDragonModal(dragon) {
  playSound("roar");

  const modalOverlay = document.getElementById("dragon-modal-overlay");
  const modalContent = document.getElementById("dragon-modal-content");

  if (!modalOverlay || !modalContent) return;

  const isFav = favoritesSet.has(dragon.id);
  const flames = "🔥".repeat(dragon.danger);
  const artSrc = getDragonArtworkSrc(dragon);

  modalContent.innerHTML = `
    <button class="modal-close-btn" id="btn-close-modal">✖</button>

    <div class="modal-grid">
      <div class="modal-svg-column">
        <div class="modal-img-frame">
          <img src="${artSrc}" alt="${dragon.name}" class="modal-artwork-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
          <div class="fallback-svg-wrap" style="display: none; width: 100%; height: 100%;">
            ${renderDragonSVG(dragon, 340, 280)}
          </div>
        </div>
        <div class="text-center margin-top-md">
          <button class="btn btn-gold btn-sm" id="modal-fav-btn">
            ${isFav ? "❤️ Quitar de Favoritos" : "🤍 Guardar en Favoritos"}
          </button>
        </div>
      </div>

      <div class="modal-info-column">
        <span class="element-badge">${dragon.element}</span>
        <h2 class="modal-dragon-title">${dragon.name}</h2>
        <p class="modal-dragon-subtitle">"${dragon.title}"</p>

        <div class="stats-table margin-top-md">
          <div class="stat-row"><strong>Mitología:</strong> <span>${dragon.mythology}</span></div>
          <div class="stat-row"><strong>Anatomía / Tipo:</strong> <span>${dragon.type}</span></div>
          <div class="stat-row"><strong>Nivel de Peligro:</strong> <span>${flames} (${dragon.danger}/5)</span></div>
          <div class="stat-row"><strong>Hábitat:</strong> <span>${dragon.habitat}</span></div>
          <div class="stat-row"><strong>Habilidad Especial:</strong> <span>${dragon.ability}</span></div>
          <div class="stat-row"><strong>Punto Débil:</strong> <span>${dragon.weakness}</span></div>
        </div>

        <div class="historical-scroll-box margin-top-md fantasy-panel">
          <h4>📜 Pergamino de la Antigüedad:</h4>
          <p>${dragon.scroll}</p>
        </div>
      </div>
    </div>
  `;

  modalOverlay.classList.add("active");

  const btnClose = modalContent.querySelector("#btn-close-modal");
  if (btnClose) btnClose.addEventListener("click", () => modalOverlay.classList.remove("active"));

  modalOverlay.onclick = e => { if (e.target === modalOverlay) modalOverlay.classList.remove("active"); };

  const modalFavBtn = modalContent.querySelector("#modal-fav-btn");
  if (modalFavBtn) {
    modalFavBtn.addEventListener("click", () => {
      toggleFavorite(dragon.id);
      modalFavBtn.innerHTML = favoritesSet.has(dragon.id) ? "❤️ Quitar de Favoritos" : "🤍 Guardar en Favoritos";
      renderEncyclopedia();
    });
  }
}

function toggleFavorite(dragonId) {
  if (favoritesSet.has(dragonId)) {
    favoritesSet.delete(dragonId);
  } else {
    favoritesSet.add(dragonId);
    playSound("chime");
  }
  localStorage.setItem("santuario_favorites", JSON.stringify([...favoritesSet]));
}

function renderFavoritesView() {
  const container = document.getElementById("favorites-grid");
  if (!container) return;

  const favDragons = DRAGONS_DATA.filter(d => favoritesSet.has(d.id));

  if (favDragons.length === 0) {
    container.innerHTML = `
      <div class="empty-state fantasy-panel width-100">
        <h3>🤍 No tenés dragones guardados todavía</h3>
        <p>Explorá la enciclopedia y hacé clic en el corazón para guardar tus dragones preferidos en la guarida.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = favDragons.map(dragon => renderDragonCardHTML(dragon)).join("");

  container.querySelectorAll(".dragon-card").forEach(card => {
    const dragonId = parseInt(card.dataset.id, 10);
    const dragon = DRAGONS_DATA.find(d => d.id === dragonId);

    card.addEventListener("click", e => {
      if (e.target.closest(".fav-btn")) return;
      if (dragon) openDragonModal(dragon);
    });

    const favBtn = card.querySelector(".fav-btn");
    if (favBtn) {
      favBtn.addEventListener("click", e => {
        e.stopPropagation();
        toggleFavorite(dragonId);
        renderFavoritesView();
      });
    }
  });
}

// ==========================================================================
// 10. LA FORJA DE SIGILOS DRACONIANOS (Geometría Sagrada y Dibujo Vectorial)
// ==========================================================================
const SIGIL_STATE = {
  userName: "LEO",
  dragonName: "VOLTARION",
  bodyType: "draco",
  hornStyle: "horns-classic",
  element: "Rayo",
  colorPrimary: "#ffd700",
  colorSecondary: "#2a9d8f",
  colorGlow: "#e76f51"
};

function initSigilForge(containerId = "sigil-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  renderSigilForgeUI(container);
}

function extractConsonants(str1, str2) {
  const combinedRaw = (str1 + " " + str2)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();

  const vowels = new Set(["A", "E", "I", "O", "U"]);
  
  const consonants = [];
  for (let char of combinedRaw) {
    if (char >= "A" && char <= "Z") {
      if (!vowels.has(char)) {
        consonants.push(char);
      }
    }
  }

  const counts = {};
  consonants.forEach(c => {
    counts[c] = (counts[c] || 0) + 1;
  });

  let result = consonants.filter(c => counts[c] === 1);

  if (result.length < 2) {
    const seen = new Set();
    result = [];
    consonants.forEach(c => {
      if (!seen.has(c)) {
        seen.add(c);
        result.push(c);
      }
    });
  }

  return result.length > 0 ? result : ["M", "D", "T"];
}

function renderSigilForgeUI(container) {
  const consonants = extractConsonants(SIGIL_STATE.userName, SIGIL_STATE.dragonName);

  container.innerHTML = `
    <div class="sigil-forge-wrapper display-flex flex-direction-column gap-xl" style="display: flex; flex-direction: column; gap: 2rem;">
      
      <!-- HERO BANNER -->
      <div class="fantasy-panel text-center" style="padding: 2.2rem; background: linear-gradient(135deg, rgba(233,196,106,0.15), rgba(42,157,143,0.15)); border: 2px solid var(--gold-main); border-radius: 20px;">
        <div class="quiz-step-tag" style="font-size: 0.95rem;">🔮 Alquimia Vectorial 🔮</div>
        <h2 class="panel-title margin-top-xs" style="color: var(--gold-main); font-size: 2.3rem;">La Forja de Sigilos Draconianos</h2>
        <p style="color: var(--text-main); font-size: 1.1rem; max-width: 820px; margin: 12px auto 0 auto; line-height: 1.6;">
          Un <strong>Sigilo</strong> es un símbolo secreto y poderoso. Es el código mágico en geometría vectorial que une tu mente con la de tu Dragón Guardián sin usar palabras humanas.
        </p>
      </div>

      <!-- MAIN LAYOUT: CONTROLS & LIVE VECTOR MIRROR -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 2rem; align-items: start;">
        
        <!-- COLUMN 1: PASOS DE ALQUIMIA & CONTROLES -->
        <div class="fantasy-panel" style="padding: 1.8rem; display: flex; flex-direction: column; gap: 1.4rem;">
          
          <!-- Paso 1 & 2: Palabras de Poder y Código Secreto -->
          <div style="background: rgba(0,0,0,0.3); padding: 1.2rem; border-radius: 14px; border: 1px solid var(--border-panel);">
            <h3 style="color: var(--gold-main); margin: 0 0 10px 0; font-size: 1.3rem;">📜 Paso 1 y 2: Palabras de Poder y Código</h3>
            
            <!-- Explicación Breve del Procedimiento -->
            <div style="background: rgba(233,196,106,0.08); padding: 12px; border-radius: 8px; border-left: 4px solid var(--gold-main); margin-top: 6px; line-height: 1.5;">
              <span style="font-size: 0.9rem; color: var(--gold-main); font-weight: 700; display: block; margin-bottom: 4px;">🔮 Alquimia de tu Sigilo Secreto:</span>
              <p style="font-size: 0.85rem; color: var(--text-main); margin: 0;">
                Para crear el código mágico, combinamos tu Nombre y el de tu Dragón. Eliminamos las vocales y todas las letras que se repiten. ¡Las letras sagradas resultantes se entrelazan solas dibujando tu sigilo en el centro!
              </p>
            </div>

            <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 15px;">
              <div>
                <label style="display: block; color: var(--text-gold); font-size: 0.9rem; font-weight: 700; margin-bottom: 4px;">Tu Nombre Mágico:</label>
                <input type="text" id="sigil-user-name" value="${SIGIL_STATE.userName}" maxlength="15" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.6); border: 1px solid var(--gold-main); border-radius: 8px; color: var(--gold-main); font-weight: 700; font-size: 1.05rem;" />
              </div>

              <div>
                <label style="display: block; color: var(--text-gold); font-size: 0.9rem; font-weight: 700; margin-bottom: 4px;">Nombre de tu Dragón Guardián:</label>
                <input type="text" id="sigil-dragon-name" value="${SIGIL_STATE.dragonName}" maxlength="15" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.6); border: 1px solid var(--color-teal); border-radius: 8px; color: var(--color-teal); font-weight: 700; font-size: 1.05rem;" />
              </div>

              <!-- Live Consonant Extraction Card -->
              <div style="background: rgba(233,196,106,0.08); padding: 10px; border-radius: 8px; border-left: 4px solid var(--gold-main); margin-top: 4px;">
                <span style="font-size: 0.85rem; color: var(--text-muted); display: block;">Código de Consonantes Filtradas:</span>
                <strong style="color: var(--gold-main); font-size: 1.2rem; letter-spacing: 4px;">${consonants.join(" • ")}</strong>
              </div>
            </div>
          </div>

          <!-- Paso 3: Características del Dragón -->
          <div style="background: rgba(0,0,0,0.3); padding: 1.2rem; border-radius: 14px; border: 1px solid var(--border-panel);">
            <h3 style="color: var(--gold-main); margin: 0 0 10px 0; font-size: 1.3rem;">🐉 Paso 3: Poder de tu Dragón</h3>

            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div>
                <label style="display: block; color: var(--text-muted); font-size: 0.88rem; font-weight: 700; margin-bottom: 4px;">Anatomía / Forma Base:</label>
                <select id="sigil-body-type" style="width: 100%; padding: 8px; background: rgba(0,0,0,0.6); border: 1px solid var(--border-panel); border-radius: 8px; color: var(--text-main);">
                  <option value="draco" ${SIGIL_STATE.bodyType === "draco" ? "selected" : ""}>🛡️ Draco Clásico (Marco de Escudo)</option>
                  <option value="shen" ${SIGIL_STATE.bodyType === "shen" ? "selected" : ""}>🐍 Shen Serpentino (Espiral Oriental)</option>
                  <option value="wyvern" ${SIGIL_STATE.bodyType === "wyvern" ? "selected" : ""}>🦅 Wyvern Ágil (Cresta Triangular)</option>
                  <option value="hidra" ${SIGIL_STATE.bodyType === "hidra" ? "selected" : ""}>🐲 Hidra (Círculos Intercalados)</option>
                  <option value="ampithere" ${SIGIL_STATE.bodyType === "ampithere" ? "selected" : ""}>🕊️ Ampithere (Arcos Alados)</option>
                </select>
              </div>

              <div>
                <label style="display: block; color: var(--text-muted); font-size: 0.88rem; font-weight: 700; margin-bottom: 4px;">Estilo de Cuernos & Puntas:</label>
                <select id="sigil-horn-style" style="width: 100%; padding: 8px; background: rgba(0,0,0,0.6); border: 1px solid var(--border-panel); border-radius: 8px; color: var(--text-main);">
                  <option value="horns-classic" ${SIGIL_STATE.hornStyle === "horns-classic" ? "selected" : ""}>🐂 Cuernos Clásicos Curvados</option>
                  <option value="horns-ram" ${SIGIL_STATE.hornStyle === "horns-ram" ? "selected" : ""}>🐏 Cuernos de Carnero en Espiral</option>
                  <option value="horns-crown" ${SIGIL_STATE.hornStyle === "horns-crown" ? "selected" : ""}>👑 Corona de Espinas</option>
                  <option value="horns-unicorn" ${SIGIL_STATE.hornStyle === "horns-unicorn" ? "selected" : ""}>🦄 Cuerno Único de Cristal</option>
                </select>
              </div>

              <div>
                <label style="display: block; color: var(--text-muted); font-size: 0.88rem; font-weight: 700; margin-bottom: 4px;">Elemento Mágico & Aura:</label>
                <select id="sigil-element" style="width: 100%; padding: 8px; background: rgba(0,0,0,0.6); border: 1px solid var(--border-panel); border-radius: 8px; color: var(--text-main);">
                  <option value="Rayo" ${SIGIL_STATE.element === "Rayo" ? "selected" : ""}>⚡ Rayo (Partículas Eléctricas)</option>
                  <option value="Fuego" ${SIGIL_STATE.element === "Fuego" ? "selected" : ""}>🔥 Fuego (Llamaradas y Brasas)</option>
                  <option value="Hielo" ${SIGIL_STATE.element === "Hielo" ? "selected" : ""}>❄️ Hielo (Cristales Geométricos)</option>
                  <option value="Veneno" ${SIGIL_STATE.element === "Veneno" ? "selected" : ""}>🧪 Veneno (Burbujas Ácidas)</option>
                  <option value="Sombra" ${SIGIL_STATE.element === "Sombra" ? "selected" : ""}>🌑 Sombra (Humo Abisal)</option>
                  <option value="Luz" ${SIGIL_STATE.element === "Luz" ? "selected" : ""}>✨ Luz (Polvo Estelar Radiante)</option>
                </select>
              </div>

              <!-- Colors -->
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-top: 4px;">
                <div>
                  <label style="display: block; font-size: 0.75rem; color: var(--text-gold);">Líneas / Marco:</label>
                  <input type="color" id="sigil-col-primary" value="${SIGIL_STATE.colorPrimary}" style="width: 100%; height: 36px; border: none; border-radius: 6px; cursor: pointer; background: transparent;" />
                </div>
                <div>
                  <label style="display: block; font-size: 0.75rem; color: var(--text-gold);">Geometría:</label>
                  <input type="color" id="sigil-col-secondary" value="${SIGIL_STATE.colorSecondary}" style="width: 100%; height: 36px; border: none; border-radius: 6px; cursor: pointer; background: transparent;" />
                </div>
                <div>
                  <label style="display: block; font-size: 0.75rem; color: var(--text-gold);">Aura / Brillo:</label>
                  <input type="color" id="sigil-col-glow" value="${SIGIL_STATE.colorGlow}" style="width: 100%; height: 36px; border: none; border-radius: 6px; cursor: pointer; background: transparent;" />
                </div>
              </div>

            </div>
          </div>

        </div>

        <!-- COLUMN 2: PASO 4 - DIBUJO VECTORIAL & ESPEJO MÁGICO -->
        <div class="fantasy-panel text-center" style="padding: 1.8rem; display: flex; flex-direction: column; align-items: center; justify-content: space-between; min-height: 520px;">
          
          <div style="width: 100%;">
            <div class="quiz-step-tag" style="margin-bottom: 8px;">✨ Paso 4: Hechizo de Dibujo Vectorial ✨</div>
            <h3 style="color: var(--gold-main); font-size: 1.5rem; margin: 0;">El Espejo de Sigilos</h3>
            <p style="color: var(--text-muted); font-size: 0.92rem; margin-top: 4px;">
              Geometría matemática pura: trazos suaves, infinitos y escalables que nunca se pixelan.
            </p>
          </div>

          <!-- SVG Canvas Stage -->
          <div id="sigil-svg-stage" style="width: 100%; max-width: 380px; height: 380px; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle, #181328 0%, #0d0a14 100%); border: 2px solid var(--gold-main); border-radius: 20px; box-shadow: 0 0 25px rgba(233,196,106,0.2); position: relative; margin: 1rem 0;">
            ${renderSigilSVG(SIGIL_STATE, consonants, 360, 360)}
          </div>

          <!-- Download Action -->
          <button class="btn btn-gold btn-lg width-100" id="btn-export-sigil" style="padding: 14px 24px; font-weight: 700;">
            🔮 Descargar Sigilo Draconiano HD (PNG)
          </button>

        </div>

      </div>

    </div>
  `;

  // Attach Input Listeners
  const bindInput = (id, prop) => {
    const el = container.querySelector(`#${id}`);
    if (el) {
      el.addEventListener("input", e => {
        SIGIL_STATE[prop] = e.target.value;
        updateSigilStage(container);
      });
    }
  };

  bindInput("sigil-user-name", "userName");
  bindInput("sigil-dragon-name", "dragonName");
  bindInput("sigil-body-type", "bodyType");
  bindInput("sigil-horn-style", "hornStyle");
  bindInput("sigil-element", "element");
  bindInput("sigil-col-primary", "colorPrimary");
  bindInput("sigil-col-secondary", "colorSecondary");
  bindInput("sigil-col-glow", "colorGlow");

  const btnExp = container.querySelector("#btn-export-sigil");
  if (btnExp) {
    btnExp.addEventListener("click", () => {
      playSound("roar");
      exportSigilCardPNG();
    });
  }
}

function updateSigilStage(container) {
  const stage = container.querySelector("#sigil-svg-stage");
  const consonants = extractConsonants(SIGIL_STATE.userName, SIGIL_STATE.dragonName);
  
  if (stage) {
    stage.innerHTML = renderSigilSVG(SIGIL_STATE, consonants, 360, 360);
  }
}

function renderSigilSVG(state, consonants, width = 600, height = 600) {
  const pCol = state.colorPrimary || "#c8553d";
  const gCol = state.glowColor || "#2a9d8f";
  const element = state.element || "Rayo";
  const body = state.bodyType || "draco";
  const horn = state.hornStyle || "horns-classic";

  const cx = width / 2;
  const cy = height / 2;
  const radius = width * 0.32;

  // Calculate Nodes for Consonants
  const N = consonants.length;
  const points = consonants.map((c, i) => {
    const angle = (i * 2 * Math.PI) / N - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
      char: c,
      angle: angle
    };
  });

  // Build Glyph Curve Path
  let glyphPath = "";
  if (points.length > 0) {
    glyphPath = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const midX = (prev.x + curr.x) / 2 + Math.cos(i) * 25;
      const midY = (prev.y + curr.y) / 2 + Math.sin(i) * 25;
      glyphPath += ` Q ${midX.toFixed(1)} ${midY.toFixed(1)}, ${curr.x.toFixed(1)} ${curr.y.toFixed(1)}`;
    }
    glyphPath += ` Z`;
  }

  // Sacred Geometry Background Lines (7-Point Star / Heptagram)
  let starPath = "";
  const starPoints = [];
  for (let k = 0; k < 7; k++) {
    const a = (k * 2 * Math.PI) / 7 - Math.PI / 2;
    starPoints.push({ x: cx + (radius * 1.05) * Math.cos(a), y: cy + (radius * 1.05) * Math.sin(a) });
  }
  for (let k = 0; k < 7; k++) {
    const nextIdx = (k + 3) % 7;
    starPath += `M ${starPoints[k].x.toFixed(1)} ${starPoints[k].y.toFixed(1)} L ${starPoints[nextIdx].x.toFixed(1)} ${starPoints[nextIdx].y.toFixed(1)} `;
  }

  // Element Specific Aura Paths
  let auraSvg = "";

  if (element === "Rayo") {
    auraSvg = `
      <path d="M ${cx - radius - 30} ${cy - radius - 30} L ${cx - 20} ${cy - 40} L ${cx - 40} ${cy - 10} L ${cx + 35} ${cy + 15} L ${cx + 10} ${cy + 45} L ${cx + radius + 35} ${cy + radius + 35}" stroke="${gCol}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="miter" filter="url(#sigilGlowFilter)" />
      <path d="M ${cx - radius - 30} ${cy - radius - 30} L ${cx - 20} ${cy - 40} L ${cx - 40} ${cy - 10} L ${cx + 35} ${cy + 15} L ${cx + 10} ${cy + 45} L ${cx + radius + 35} ${cy + radius + 35}" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="miter" />
      <path d="M ${cx + radius + 25} ${cy - radius - 20} L ${cx + 15} ${cy - 25} L ${cx + 30} ${cy - 5} L ${cx - 25} ${cy + 25} L ${cx - 10} ${cy + 40} L ${cx - radius - 25} ${cy + radius + 25}" stroke="${pCol}" stroke-width="2.5" fill="none" stroke-dasharray="6,4" />
    `;
  } else if (element === "Fuego") {
    auraSvg = `
      <defs>
        <linearGradient id="flameGrad_${cx}" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#d4a373" stop-opacity="0.9" />
          <stop offset="50%" stop-color="${pCol}" stop-opacity="0.8" />
          <stop offset="100%" stop-color="${gCol}" stop-opacity="0.95" />
        </linearGradient>
      </defs>
      <path d="M ${cx - 55} ${cy + radius + 15} Q ${cx - 65} ${cy + 30} ${cx - 30} ${cy + 10} Q ${cx} ${cy - 35} ${cx + 30} ${cy + 10} Q ${cx + 65} ${cy + 30} ${cx + 55} ${cy + radius + 15} Z" fill="url(#flameGrad_${cx})" stroke="${pCol}" stroke-width="2" />
      <path d="M ${cx - 32} ${cy + radius + 15} Q ${cx - 15} ${cy + 35} ${cx} ${cy - 45} Q ${cx + 15} ${cy + 35} ${cx + 30} ${cy + radius + 15} Z" fill="${gCol}" stroke="#ffd700" stroke-width="2.5" filter="url(#sigilGlowFilter)" />
      <path d="M ${cx - 14} ${cy + radius + 10} Q ${cx} ${cy - 20} ${cx + 14} ${cy + radius + 10} Z" fill="#ffffff" opacity="0.95" />
    `;
  } else if (element === "Veneno") {
    let venomPts = [];
    const nPts = 36;
    for (let i = 0; i < nPts; i++) {
      const a = (i * 2 * Math.PI) / nPts;
      const rWave = (radius * 1.12) + Math.sin(a * 8) * 12;
      const x = cx + rWave * Math.cos(a);
      const y = cy + rWave * Math.sin(a);
      venomPts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    const venomPath = venomPts.join(" ") + " Z";

    let innerPts = [];
    for (let i = 0; i < nPts; i++) {
      const a = (i * 2 * Math.PI) / nPts;
      const rWave = (radius * 1.05) + Math.cos(a * 8) * 8;
      const x = cx + rWave * Math.cos(a);
      const y = cy + rWave * Math.sin(a);
      innerPts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    const innerPath = innerPts.join(" ") + " Z";

    auraSvg = `
      <path d="${venomPath}" stroke="${gCol}" stroke-width="3" fill="none" filter="url(#sigilGlowFilter)" />
      <path d="${innerPath}" stroke="${pCol}" stroke-width="1.8" stroke-dasharray="4,4" fill="none" />
      <polygon points="${cx},${cy - radius - 28} ${cx - 10},${cy - radius - 14} ${cx + 10},${cy - radius - 14}" fill="${gCol}" stroke="${pCol}" stroke-width="1.5" />
      <circle cx="${cx - 4}" cy="${cy - radius - 18}" r="1.5" fill="#ffffff" />
      <circle cx="${cx + 4}" cy="${cy - radius - 18}" r="1.5" fill="#ffffff" />
    `;
  } else if (element === "Luz") {
    let sunburstPts = [];
    const nRays = 12;
    for (let i = 0; i < nRays * 2; i++) {
      const a = (i * Math.PI) / nRays - Math.PI / 2;
      const rCurr = (i % 2 === 0) ? (radius * 1.32) : (radius * 1.05);
      const x = cx + rCurr * Math.cos(a);
      const y = cy + rCurr * Math.sin(a);
      sunburstPts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    const sunburstPoly = sunburstPts.join(" ");

    auraSvg = `
      <polygon points="${sunburstPoly}" fill="none" stroke="${gCol}" stroke-width="2.5" filter="url(#sigilGlowFilter)" />
      <circle cx="${cx}" cy="${cy}" r="${radius * 1.05}" stroke="${pCol}" stroke-width="1.5" stroke-dasharray="5,4" fill="none" />
      <circle cx="${cx}" cy="${cy}" r="${radius * 1.28}" stroke="${gCol}" stroke-width="1" opacity="0.6" fill="none" />
    `;
  } else if (element === "Hielo") {
    auraSvg = `
      <polygon points="${cx},${cy-radius-25} ${cx+15},${cy-radius-10} ${cx},${cy-radius+5} ${cx-15},${cy-radius-10}" fill="none" stroke="${gCol}" stroke-width="2" />
      <polygon points="${cx},${cy+radius-5} ${cx+15},${cy+radius+10} ${cx},${cy+radius+25} ${cx-15},${cy+radius+10}" fill="none" stroke="${gCol}" stroke-width="2" />
      <circle cx="${cx}" cy="${cy}" r="${radius*1.15}" stroke="${gCol}" stroke-width="1.5" stroke-dasharray="3,6" fill="none" />
    `;
  } else if (element === "Sombra") {
    auraSvg = `
      <circle cx="${cx}" cy="${cy}" r="${radius*1.25}" stroke="${gCol}" stroke-width="2" stroke-dasharray="4,6" fill="none" filter="url(#sigilGlowFilter)" />
      <circle cx="${cx}" cy="${cy}" r="${radius*1.15}" stroke="${pCol}" stroke-width="1" stroke-dasharray="2,4" fill="none" />
    `;
  } else {
    auraSvg = `
      <circle cx="${cx}" cy="${cy}" r="${radius*1.18}" stroke="${gCol}" stroke-width="1.5" stroke-dasharray="3,4" fill="none" />
    `;
  }

  // Horn Flourishes (Centered at Sigil Core cx, cy)
  let hornSvg = "";
  if (horn === "horns-classic") {
    hornSvg = `
      <path d="M ${cx-15} ${cy+10} Q ${cx-45} ${cy-30} ${cx-18} ${cy-50}" stroke="${pCol}" stroke-width="3" fill="none" stroke-linecap="round" />
      <path d="M ${cx+15} ${cy+10} Q ${cx+45} ${cy-30} ${cx+18} ${cy-50}" stroke="${pCol}" stroke-width="3" fill="none" stroke-linecap="round" />
    `;
  } else if (horn === "horns-ram") {
    hornSvg = `
      <path d="M ${cx-15} ${cy+15} C ${cx-55} ${cy+5} ${cx-50} ${cy-40} ${cx-20} ${cy-20}" stroke="${pCol}" stroke-width="2.8" fill="none" stroke-linecap="round" />
      <path d="M ${cx+15} ${cy+15} C ${cx+55} ${cy+5} ${cx+50} ${cy-40} ${cx+20} ${cy-20}" stroke="${pCol}" stroke-width="2.8" fill="none" stroke-linecap="round" />
    `;
  } else if (horn === "horns-crown") {
    hornSvg = `
      <polygon points="${cx-35},${cy+15} ${cx-20},${cy-30} ${cx},${cy-5} ${cx+20},${cy-30} ${cx+35},${cy+15}" fill="none" stroke="${pCol}" stroke-width="2.5" stroke-linejoin="round" />
    `;
  } else if (horn === "horns-unicorn") {
    hornSvg = `
      <polygon points="${cx-8},${cy+25} ${cx},${cy-55} ${cx+8},${cy+25}" fill="${pCol}" stroke="${gCol}" stroke-width="1.8" />
      <line x1="${cx-6}" y1="${cy+10}" x2="${cx+6}" y2="${cy+5}" stroke="${gCol}" stroke-width="1.5" />
      <line x1="${cx-4}" y1="${cy-10}" x2="${cx+4}" y2="${cy-15}" stroke="${gCol}" stroke-width="1.5" />
      <line x1="${cx-2}" y1="${cy-30}" x2="${cx+2}" y2="${cy-33}" stroke="${gCol}" stroke-width="1.5" />
    `;
  }

  // Anatomical Outer Shape
  let bodyOutline = `<circle cx="${cx}" cy="${cy}" r="${radius}" stroke="${pCol}" stroke-width="2.5" fill="none" />`;
  if (body === "shen") {
    bodyOutline = `
      <!-- Primary Centered Outer Ring -->
      <circle cx="${cx}" cy="${cy}" r="${radius}" stroke="${pCol}" stroke-width="2.5" fill="none" />
      <!-- Centered Oriental Shen Serpentine Wave (Yin-Yang / Infinity S-curves) -->
      <path d="M ${cx} ${cy - radius} C ${cx + radius * 0.7} ${cy - radius * 0.5} ${cx - radius * 0.7} ${cy + radius * 0.5} ${cx} ${cy + radius}" stroke="${pCol}" stroke-width="2" fill="none" stroke-dasharray="8,4" />
      <path d="M ${cx} ${cy - radius} C ${cx - radius * 0.7} ${cy - radius * 0.5} ${cx + radius * 0.7} ${cy + radius * 0.5} ${cx} ${cy + radius}" stroke="${gCol}" stroke-width="1.8" fill="none" stroke-dasharray="8,4" />
      <!-- Sacred Central Shen Core Ring -->
      <circle cx="${cx}" cy="${cy}" r="${radius * 0.45}" stroke="${pCol}" stroke-width="1.5" stroke-dasharray="3,3" fill="none" />
    `;
  } else if (body === "wyvern") {
    bodyOutline = `
      <polygon points="${cx},${cy-radius-15} ${cx+radius+10},${cy+radius*0.7} ${cx-radius-10},${cy+radius*0.7}" stroke="${pCol}" stroke-width="2.5" fill="none" />
    `;
  } else if (body === "hidra") {
    bodyOutline = `
      <circle cx="${cx}" cy="${cy-25}" r="${radius*0.75}" stroke="${pCol}" stroke-width="2" fill="none" />
      <circle cx="${cx-35}" cy="${cy+25}" r="${radius*0.75}" stroke="${pCol}" stroke-width="2" fill="none" />
      <circle cx="${cx+35}" cy="${cy+25}" r="${radius*0.75}" stroke="${pCol}" stroke-width="2" fill="none" />
    `;
  } else if (body === "ampithere") {
    bodyOutline = `
      <path d="M ${cx-radius-20} ${cy} Q ${cx} ${cy-radius-30} ${cx+radius+20} ${cy} Q ${cx} ${cy+radius+30} ${cx-radius-20} ${cy}" stroke="${pCol}" stroke-width="2.5" fill="none" />
    `;
  }

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="sigilGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Background Circle Shield -->
      <circle cx="${cx}" cy="${cy}" r="${radius*1.22}" stroke="rgba(255,215,0,0.15)" stroke-width="1" fill="rgba(10,14,23,0.85)" />

      <!-- Sacred Geometry Star -->
      <path d="${starPath}" stroke="rgba(255,215,0,0.2)" stroke-width="1" fill="none" />

      <!-- Elemental Aura -->
      ${auraSvg}

      <!-- Anatomical Outer Frame -->
      ${bodyOutline}

      <!-- Central Horns -->
      ${hornSvg}

      <!-- Consonant Sigil Glyph Curve -->
      <path d="${glyphPath}" stroke="${pCol}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round" filter="url(#sigilGlowFilter)" />
      <path d="${glyphPath}" stroke="#ffffff" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Consonant Node Points & Runes -->
      ${points.map(pt => `
        <circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="10" fill="rgba(10,14,23,0.9)" stroke="${gCol}" stroke-width="2" />
        <circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="4" fill="${pCol}" />
        <text x="${pt.x.toFixed(1)}" y="${pt.y > cy ? pt.y + 24 : pt.y - 14}" fill="#ffd700" font-size="14" font-weight="bold" font-family="serif" text-anchor="middle">${pt.char}</text>
      `).join("")}

      <!-- Center Alchemical Seal -->
      <circle cx="${cx}" cy="${cy}" r="6" fill="#ffd700" stroke="${pCol}" stroke-width="1.5" />
    </svg>
  `;
}

function exportSigilCardPNG() {
  const consonants = extractConsonants(SIGIL_STATE.userName, SIGIL_STATE.dragonName);
  
  const canvas = document.createElement("canvas");
  canvas.width = 650;
  canvas.height = 900;
  const ctx = canvas.getContext("2d");

  // Background Gradient
  const grad = ctx.createRadialGradient(325, 450, 50, 325, 450, 500);
  grad.addColorStop(0, "#1c1630");
  grad.addColorStop(1, "#0d0a14");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 650, 900);

  // Metallic Golden Card Border
  ctx.strokeStyle = "#ffd700";
  ctx.lineWidth = 10;
  ctx.strokeRect(20, 20, 610, 860);

  ctx.strokeStyle = "#e9c46a";
  ctx.lineWidth = 2;
  ctx.strokeRect(32, 32, 586, 836);

  // Title
  ctx.fillStyle = "#ffd700";
  ctx.font = "bold 32px serif";
  ctx.textAlign = "center";
  ctx.fillText("SIGILO SAGRADO DRACONIANO", 325, 85);

  ctx.fillStyle = "#e9c46a";
  ctx.font = "italic 20px serif";
  ctx.fillText(`"${SIGIL_STATE.userName} & ${SIGIL_STATE.dragonName}"`, 325, 120);

  // Render SVG onto Image
  const svgData = renderSigilSVG(SIGIL_STATE, consonants, 460, 460);
  const img = new Image();
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  img.onload = () => {
    ctx.drawImage(img, 95, 160, 460, 460);

    // Metadata Footer
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.fillRect(50, 650, 550, 180);
    ctx.strokeStyle = "#ffd700";
    ctx.lineWidth = 1;
    ctx.strokeRect(50, 650, 550, 180);

    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 22px serif";
    ctx.fillText(`CÓDIGO DE CONSONANTES: ${consonants.join(" - ")}`, 325, 695);

    ctx.fillStyle = "#ffffff";
    ctx.font = "18px sans-serif";
    ctx.fillText(`Elemento: ${SIGIL_STATE.element} | Anatomía: ${SIGIL_STATE.bodyType.toUpperCase()}`, 325, 735);

    ctx.fillStyle = "#2a9d8f";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("SANTUARIO SECRETO DE DRAGONES • EMPLEMA VECTORIAL OFICIAL", 325, 785);

    const link = document.createElement("a");
    link.download = `Sigilo_${SIGIL_STATE.userName}_${SIGIL_STATE.dragonName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    URL.revokeObjectURL(url);
  };

  img.src = url;
}

// Global Entry Triggers
window.initApp = initApp;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

window.addEventListener("load", () => {
  const grid = document.getElementById("dragons-grid");
  if (!grid || grid.children.length === 0) {
    initApp();
  }
});