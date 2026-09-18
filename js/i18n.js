/**
 * ==============================================================================
 * SANTUARIO DE DRAGONES - SISTEMA DE INTERNACIONALIZACIÓN (i18n)
 * Módulo independiente y seguro (Zero-Risk):
 * - No altera las propiedades de los datos ni rompe los filtros internos.
 * - Conmuta dinámicamente textos de interfaz, selectores, labels y badges.
 * ==============================================================================
 */

(function() {
  const DICT = {
    es: {
      brand_name: "SANTUARIO DE DRAGONES",
      nav_encyclopedia: "📚 Enciclopedia",
      nav_arena: "⚔️ Arena",
      nav_magic: "✨ Magia Draconiana",
      nav_quiz: "🧪 Test Draconiano",
      nav_favorites: "❤️ Mis Favoritos",
      sound_on: "🔊 Sonido: ON",
      sound_off: "🔇 Sonido: OFF",
      lang_btn_text: "🌐 EN",
      lang_btn_title: "Cambiar a Inglés (Switch to English)",
      hero_title: "El Códice Secreto de los Dragones",
      hero_subtitle: "Te damos la bienvenida al Santuario Ancestral. Descubrí más de 100 criaturas de la historia y las mitologías del mundo.",
      
      // Filtros y Búsqueda
      search_placeholder: "🔍 Buscá por nombre, mitología, habilidad o pergamino histórico...",
      filter_mythology_label: "Mitología / Origen:",
      filter_element_label: "Elemento Principal:",
      filter_type_label: "Tipo de Cuerpo:",
      filter_danger_label: "Nivel de Peligro:",
      filter_sort_label: "Ordenar Por:",
      btn_reset_filters: "🔄 Reiniciar Filtros",
      results_count_suffix: "Dragones Registrados",
      results_found: "dragones encontrados",
      
      // Opciones de Ordenamiento
      sort_name_asc: "Nombre (A-Z)",
      sort_name_desc: "Nombre (Z-A)",
      sort_danger_desc: "Peligro (Mayor a Menor)",
      sort_danger_asc: "Peligro (Menor a Mayor)",
      
      // Peligro
      opt_all_danger: "Todos los Niveles",
      danger_prefix: "Peligro",

      // Modal de Dragón
      stat_mythology: "Mitología",
      stat_type: "Anatomía / Tipo",
      stat_danger: "Nivel de Peligro",
      stat_habitat: "Hábitat",
      stat_ability: "Habilidad Especial",
      stat_weakness: "Punto Débil",
      ancient_scroll_title: "Pergamino de la Antigüedad",
      fav_add: "🤍 Guardar en Favoritos",
      fav_remove: "❤️ Quitar de Favoritos",
      view_full_page: "📖 Ver Ficha Completa",
      // Ficha individual de Dragón
      stat_element: "Elemento",
      btn_back_encyclopedia: "⬅️ Volver a la Enciclopedia",
      combat_data_title: "Datos de Combate & Hábitat",
      btn_back_catalog: "📚 Volver al Catálogo de Dragones",
      dragon_badge_prefix: "Dragón",
      // Favoritos
      fav_hero_title: "❤️ Tu Guarida de Dragones Favoritos",
      fav_hero_desc: "Acá están custodiados los dragones que marcaste con el corazón durante tu travesía por la enciclopedia. Podés consultar sus fichas o eliminarlos cuando lo desees.",
      fav_loading: "Cargando tu guarida personal...",
      fav_explore_btn: "📚 Explorar la Enciclopedia",
      fav_empty_title: "🐉 No tenés dragones guardados todavía",
      fav_empty_desc: "Explorá la enciclopedia y hacé clic en el corazón para guardar tus dragones preferidos en la guarida.",
      // Test Draconiano
      quiz_hero_title: "Test Draconiano: ¿Qué Dragón Sos Vos?",
      quiz_hero_subtitle: "Descubrí qué criatura legendaria de los 100 dragones del Códice resuena con tu espíritu, tu temperamento y tu elemento protector.",
      quiz_intro_title: "⭐ Descubrí tu Guardián Espiritual Draconiano",
      quiz_intro_desc: "A lo largo de 5 dilemas sagrados, el Oráculo del Santuario evalúa tus instintos frente al peligro, tu hábitat predilecto, tu método de resolución de conflictos y tu afinidad elemental primordial (Fuego, Agua, Tierra, Viento, Luz o Sombra).",
      quiz_col1_title: "1. Tu Elemento Guía",
      quiz_col1_desc: "Sintonía con el calor del fuego, la fluidez del agua, la solidez de la tierra o el abismo de las sombras.",
      quiz_col2_title: "2. Hábitat Sagrado",
      quiz_col2_desc: "Cavernas con gemas ancestrales, volcanes ardientes, cielos tempestuosos o fosas abisales.",
      quiz_col3_title: "3. Vínculo del Códice",
      quiz_col3_desc: "Conexión directa con uno de los 100 dragones registrados, su pergamino histórico y sus habilidades únicas.",
      quiz_btn_start: "🔥 Comenzar el Test Draconiano",
      quiz_question_tag: "Pregunta",
      quiz_question_of: "de",
      quiz_result_congrats: "🎉 ¡Tu Dragón Interior es",
      quiz_btn_restart: "🔄 Hacer el Test de Nuevo",
      quiz_view_card_btn: "📖 Ver Ficha en el Códice",
      quiz_share_btn: "🔗 Compartir mi Dragón",
      // Arena de Dragones & Coliseo
      arena_tab_duel: "⚔️ Duelo 1 vs 1",
      arena_tab_tourney: "🏆 El Torneo (Modo Copa)",
      arena_tab_squad: "🛡️ Batalla 5 vs 5 (Escuadrones)",
      arena_hero_title: "La Gran Arena de Dragones",
      arena_hero_subtitle: "El campo sagrado de combate donde se miden el poder elemental, las estrategias míticas y el honor de las bestias más poderosas del Santuario.",
      arena_modes_title: "⚔️ Modos de Combate Disponibles",
      arena_mode1_title: "1. Duelo Rápido 1 vs 1",
      arena_mode1_desc: "Elegí tu campeón entre los 100 dragones del códice y enfréntate en combate singular por turnos contra un rival mítico. El cálculo de daño considera ataque, defensa y ventajas elementales.",
      arena_mode2_title: "2. El Torneo del Santuario (Roguelite)",
      arena_mode2_desc: "Elegí tu dragón y avanzá por 4 rondas eliminatorias (Octavos, Cuartos, Semifinal y Gran Final). Tras cada victoria elegís bendiciones draconianas y mejoras permanentes de atributos.",
      arena_mode3_title: "3. Guerra de Clanes 5 vs 5",
      arena_mode3_desc: "Armá tu escuadrón de 5 dragones y disputá combates por relevos por equipos hasta que caiga el último campeón del bando rival.",
      arena_affinity_title: "🔮 Tabla de Afinidades y Ventajas Elementales",
      arena_affinity_desc: "En la Arena, cada elemento tiene afinidades naturales que potencian el daño infligido:",
      arena_load_btn: "⚔️ Cargar Arena Interactiva",
      arena_duel_banner_title: "La Arena Ancestral: Duelo 1 vs 1",
      arena_duel_banner_desc: "¡Elegí a dos titanes del Santuario y presenciá un combate legendario por turnos con ventajas elementales y cálculo de daño épico!",
      arena_champion1: "🐲 Campeón 1",
      arena_champion2: "🐲 Campeón 2",
      arena_random: "🎲 Al Azar",
      arena_choose_dragon: "Elegir Dragón",
      arena_search_btn: "Buscar ▾",
      arena_hp_label: "Puntos de Salud (HP)",
      arena_fight_btn: "⚔️ ¡COMBATIR!",
      arena_new_battle: "🔄 Nuevo Combate",
      arena_log_title: "📜 Crónica Épica de la Batalla",
      arena_ready_combat: "Listo para el combate",
      arena_press_fight: 'Presioná "¡COMBATIR!" para dar inicio a los rugidos en la Arena...',
      arena_duel_victory_title: "¡VICTORIA EN EL DUELO SINGULAR!",
      arena_duel_winner_badge: "👑 Vencedor del Duelo",
      arena_duel_defeated_badge: "💀 Derrotado",
      arena_duel_again_btn: "⚔️ Disputar Otro Duelo",
      arena_round: "Asalto",
      arena_critical: "💥 ¡GOLPE CRÍTICO!",
      arena_tourney_title: "El Torneo del Santuario",
      arena_tourney_desc: "¡Elegí a tu dragón guardián y avanzá a través de 3 rondas eliminatorias consecutivas! Entre victoria y victoria podrás elegir Reliquias y Bendiciones Ancestrales para curarte y potenciar tus ataques.",
      arena_choose_champ: "Elegí a tu Campeón:",
      arena_choose_champ_btn: "Elegir Campeón",
      arena_squad_fighter_hp: "Salud del Combatiente",
      arena_squad_name_a: "Nombre de tu Clan...",
      arena_squad_name_b: "Nombre del Clan Rival...",
      arena_dragons_count: "Dragones",
      arena_squad_change_pos: "Cambiar pos.",
      arena_rival_label: "Rival",
      arena_squad_clash: "Choque #",
      arena_in_progress: "(Duelo en curso)",
      arena_fallen_in_combat: "¡ha caído en combate!",
      arena_sends_to_front: "envía al frente a",
      arena_strikes_with: "golpea con",
      arena_causing_dmg: "causando",
      arena_dmg_to: "de daño a",
      arena_start_tourney: "🏆 ¡INICIAR EL TORNEO!",
      arena_your_guardian: "🐲 Tu Guardián (Tú)",
      arena_your_hp: "Tu Salud (HP)",
      arena_opp_hp: "Salud Rival (HP)",
      arena_tourney_fight_btn: "⚔️ ¡LUCHAR!",
      arena_relic_victory_title: "✨ ¡VICTORIA DE RONDA! Elegí tu Bendición Ancestral:",
      arena_relic_victory_desc: "Los espíritus draconianos recompensan tu coraje. Escogé 1 bendición para fortalecerte antes de la siguiente batalla:",
      arena_tourney_log_title: "📜 Crónica del Torneo",
      arena_tourney_waiting: "Esperando orden de combate",
      arena_tourney_press: 'Presioná "¡LUCHAR!" para disputar la ronda...',
      arena_abandon_tourney: "🏳️ Abandonar Torneo",
      arena_boss_badge: "👑 JEFE FINAL",
      arena_cup_rival_badge: "Rival de Copa",
      arena_champ_supreme: "¡CAMPEÓN SUPREMO DEL SANTUARIO!",
      arena_champ_desc_prefix: "¡Tu dragón",
      arena_champ_desc_suffix: "ha triunfado en la arena y alzado la legendaria Copa Draconiana ante la multitud!",
      arena_relics_collected: "Reliquias Coleccionadas en esta hazaña:",
      arena_another_tourney: "🔄 Jugar Otro Torneo",
      arena_fallen_title: "¡CAÍDO EN LA ARENA ANCESTRAL!",
      arena_fallen_hero: "💀 Héroe Caído",
      arena_victorious_rival: "👑 Rival Victorioso",
      arena_rounds_cleared: "Rondas Superadas",
      arena_instance_reached: "Instancia Alcanzada",
      arena_active_blessings: "Bendiciones Activas",
      arena_retry_btn: "🔄 Reintentar con",
      arena_pick_other_btn: "🐲 Elegir Otro Dragón",
      arena_squad_banner_title: "Guerra de Clanes: 5 vs 5",
      arena_squad_banner_desc: "¡Confrontación definitiva de escuadrones! Combates por relevos donde cada bando lucha hasta que todos sus dragones caen.",
      arena_squad_team_a: "Legión Dracónica",
      arena_squad_team_b: "Horda Ancestral",
      arena_squad_start_btn: "⚔️ ¡INICIAR GUERRA DE CLANES!",
      arena_squad_log_title: "📜 Crónica de la Guerra 5v5",
      arena_squad_waiting: "Escuadrones en formación...",
      arena_squad_victory_title: "¡CLAN VENCEDOR DE LA ARENA 5v5!",
      arena_squad_survivors: "Sobrevivientes:",
      arena_squad_triumphant_clan: "👑 Clan Triunfador",
      arena_squad_defeated_clan: "💀 Clan Derrotado",
      arena_squad_another_war: "🔄 Disputar Otra Guerra de Clanes",
      arena_picker_title: "🔍 Seleccionar Dragón para el Combate",
      arena_picker_close: "✕ Cerrar",
      arena_picker_placeholder: "🔍 Escribí un nombre o mitología...",
      arena_picker_no_results: "No se encontraron dragones con esos criterios",
      // Forja de Sigilos Draconianos
      sigil_static_title: "🔮 Cómo Funciona la Forja de Sigilos",
      sigil_static_step1_title: "1. Extracción de Consonantes",
      sigil_static_step1_desc: "El sistema toma tu nombre y el de tu dragón, elimina vocales y letras repetidas, dejando la esencia fonética pura.",
      sigil_static_step2_title: "2. Coordenadas Radiales",
      sigil_static_step2_desc: "Cada consonante se mapea en un círculo alquímico de 360 grados, trazando curvas Bézier de energía concentrada.",
      sigil_static_step3_title: "3. Anatomía y Cuernos",
      sigil_static_step3_desc: "Podés elegir entre cuernos clásicos, de carnero, corona o cuerno espiral, y auras elementales en SVG puro.",
      sigil_tag: "🔮 Alquimia Vectorial 🔮",
      sigil_title: "La Forja de Sigilos Draconianos",
      sigil_desc: "Un <strong>Sigilo</strong> es un símbolo secreto y poderoso. Es el código mágico en geometría vectorial que une tu mente con la de tu Dragón Guardián sin usar palabras humanas.",
      sigil_step1_2_title: "📜 Paso 1 y 2: Palabras de Poder y Código",
      sigil_alchemy_notice_title: "🔮 Alquimia de tu Sigilo Secreto:",
      sigil_alchemy_notice_desc: "Combinamos tu Nombre y el de tu Dragón. Eliminamos las vocales y letras repetidas para obtener la matriz sagrada de consonantes.",
      sigil_lbl_user_name: "Tu Nombre Mágico:",
      sigil_lbl_dragon_name: "Nombre de tu Dragón Guardián:",
      sigil_step3_title: "🐉 Paso 3: Poder y Paleta Mágica",
      sigil_lbl_body: "Anatomía / Forma Base:",
      sigil_lbl_horns: "Estilo de Cuernos & Puntas:",
      sigil_lbl_element: "Elemento Mágico (Paleta Automática):",
      sigil_lbl_presets: "🎨 Paletas Temáticas Rápidas:",
      sigil_lbl_stroke: "Trazos / Marco:",
      sigil_lbl_geom: "Geometría:",
      sigil_lbl_glow: "Aura / Brillo:",
      sigil_decoder_title: "📜 Decodificador de Runas",
      sigil_resonance: "Resonancia:",
      sigil_step4_tag: "✨ Paso 4: Hechizo de Dibujo Vectorial ✨",
      sigil_mirror_title: "El Espejo de Sigilos",
      sigil_mirror_desc: "Geometría matemática pura: trazos suaves, infinitos y escalables que nunca se pixelan.",
      sigil_btn_animate: "✨ Revelación Vectorial",
      sigil_btn_consecrate: "🔥 Consagrar Sigilo",
      sigil_btn_export: "🔮 Descargar Sigilo Draconiano HD (PNG)",
      sigil_consecrated_alert_title: "📜 ¡SIGILO CONSAGRADO OFICIALMENTE!",
      sigil_consecrated_alert_desc: "Tu pacto sagrado con <strong>{dragon}</strong> ha sido sellado en la matriz alquímica.",
      // Magia Draconiana & Altar Sagrado
      magic_nav_foundations: "📜 1. Fundamentos",
      magic_nav_fundamentos: "📜 1. Fundamentos",
      magic_nav_altar: "⚒️ 2. El Altar",
      magic_nav_academy: "🎓 3. Academia (5 Anillos)",
      magic_nav_academia: "🎓 3. Academia (5 Anillos)",
      magic_nav_sigils: "🔮 4. Forja de Sigilos",
      magic_nav_sigilos: "🔮 4. Forja de Sigilos",
      altar_tool_wand: "✨ 1. Varita o Bastón",
      altar_tool_varita: "✨ 1. Varita o Bastón",
      altar_tool_pentacle: "⭐ 2. Pentáculo (5 Elementos)",
      altar_tool_pentaculo: "⭐ 2. Pentáculo (5 Elementos)",
      altar_tool_mirror: "👁️ 3. Espejo Mágico",
      altar_tool_espejo: "👁️ 3. Espejo Mágico",
      altar_tool_dragonscript: "📜 4. Dragon Script",
    },
    en: {
      brand_name: "DRAGON SANCTUARY",
      nav_encyclopedia: "📚 Encyclopedia",
      nav_arena: "⚔️ Arena",
      nav_magic: "✨ Draconian Magic",
      nav_quiz: "🧪 Draconian Quiz",
      nav_favorites: "❤️ My Favorites",
      sound_on: "🔊 Sound: ON",
      sound_off: "🔇 Sound: OFF",
      lang_btn_text: "🌐 ES",
      lang_btn_title: "Switch to Spanish (Cambiar a Español)",
      hero_title: "The Secret Dragon Codex",
      hero_subtitle: "Welcome to the Ancestral Sanctuary. Discover over 100 mythical creatures from world legends and lore.",
      
      // Search & Filters
      search_placeholder: "🔍 Search by name, mythology, ability or lore...",
      filter_mythology_label: "Mythology / Origin:",
      filter_element_label: "Primary Element:",
      filter_type_label: "Body Type:",
      filter_danger_label: "Danger Level:",
      filter_sort_label: "Sort By:",
      btn_reset_filters: "🔄 Reset Filters",
      results_count_suffix: "Registered Dragons",
      results_found: "dragons found",
      
      // Sort Options
      sort_name_asc: "Name (A-Z)",
      sort_name_desc: "Name (Z-A)",
      sort_danger_desc: "Danger (Highest to Lowest)",
      sort_danger_asc: "Danger (Lowest to Highest)",
      
      // Danger
      opt_all_danger: "All Levels",
      danger_prefix: "Danger",

      // Dragon Modal
      stat_mythology: "Mythology",
      stat_type: "Anatomy / Type",
      stat_danger: "Danger Level",
      stat_habitat: "Habitat",
      stat_ability: "Special Ability",
      stat_weakness: "Weakness",
      ancient_scroll_title: "Ancient Lore Scroll",
      fav_add: "🤍 Save to Favorites",
      fav_remove: "❤️ Remove from Favorites",
      view_full_page: "📖 View Full Page",
      // Standalone Dragon Detail Page
      stat_element: "Element",
      btn_back_encyclopedia: "⬅️ Back to Encyclopedia",
      combat_data_title: "Combat Data & Habitat",
      btn_back_catalog: "📚 Back to Dragon Catalog",
      dragon_badge_prefix: "Dragon",
      // Favorites
      fav_hero_title: "❤️ Your Favorite Dragons Lair",
      fav_hero_desc: "Here are safeguarded the dragons you marked with a heart during your journey through the encyclopedia. You can consult their scrolls or release them whenever you wish.",
      fav_loading: "Loading your personal lair...",
      fav_explore_btn: "📚 Explore the Encyclopedia",
      fav_empty_title: "🐉 No saved dragons yet",
      fav_empty_desc: "Explore the encyclopedia and click the heart icon to save your favorite dragons in your lair.",
      // Draconian Quiz
      quiz_hero_title: "Draconian Quiz: Which Dragon Are You?",
      quiz_hero_subtitle: "Discover which legendary creature from the Codex resonates with your spirit, temperament, and guardian element.",
      quiz_intro_title: "⭐ Discover Your Draconian Spirit Guardian",
      quiz_intro_desc: "Through 5 sacred dilemmas, the Sanctuary Oracle evaluates your instincts in the face of danger, your preferred habitat, conflict resolution, and primordial elemental affinity (Fire, Water, Earth, Wind, Light, or Shadow).",
      quiz_col1_title: "1. Your Guiding Element",
      quiz_col1_desc: "Attunement to the warmth of fire, the fluidity of water, the steadfastness of earth, or the shadows.",
      quiz_col2_title: "2. Sacred Habitat",
      quiz_col2_desc: "Caverns with ancient gems, blazing volcanoes, stormy skies, or abyssal ocean trenches.",
      quiz_col3_title: "3. Codex Bond",
      quiz_col3_desc: "Direct connection with one of the 100 registered dragons, their ancient lore, and unique powers.",
      quiz_btn_start: "🔥 Start the Draconian Quiz",
      quiz_question_tag: "Question",
      quiz_question_of: "of",
      quiz_result_congrats: "🎉 Your Inner Dragon is",
      quiz_btn_restart: "🔄 Take the Quiz Again",
      quiz_view_card_btn: "📖 View in Codex",
      quiz_share_btn: "🔗 Share My Dragon",
      // Dragon Arena & Colosseum
      arena_tab_duel: "⚔️ 1 vs 1 Duel",
      arena_tab_tourney: "🏆 The Tournament (Cup Mode)",
      arena_tab_squad: "🛡️ 5 vs 5 Battle (Squads)",
      arena_hero_title: "The Great Dragon Arena",
      arena_hero_subtitle: "The sacred battleground where elemental power, mythical strategies, and the honor of the Sanctuary's mightiest beasts are tested.",
      arena_modes_title: "⚔️ Available Combat Modes",
      arena_mode1_title: "1. Fast 1 vs 1 Duel",
      arena_mode1_desc: "Pick your champion from the codex's 100 dragons and face a mythical rival in turn-based single combat. Damage calculation considers attack, defense, and elemental advantages.",
      arena_mode2_title: "2. The Sanctuary Tournament (Roguelite)",
      arena_mode2_desc: "Choose your dragon and advance through knockout rounds. After each victory, choose draconian blessings and permanent attribute upgrades.",
      arena_mode3_title: "3. 5 vs 5 Clan War",
      arena_mode3_desc: "Build your 5-dragon squad and fight team relay battles until the enemy side's last champion falls.",
      arena_affinity_title: "🔮 Elemental Affinities & Advantages Table",
      arena_affinity_desc: "In the Arena, each element has natural affinities that boost dealt damage:",
      arena_load_btn: "⚔️ Load Interactive Arena",
      arena_duel_banner_title: "The Ancestral Arena: 1 vs 1 Duel",
      arena_duel_banner_desc: "Choose two titans of the Sanctuary and witness a legendary turn-based battle with elemental advantages and epic damage calculation!",
      arena_champion1: "🐲 Champion 1",
      arena_champion2: "🐲 Champion 2",
      arena_random: "🎲 Random",
      arena_choose_dragon: "Choose Dragon",
      arena_search_btn: "Search ▾",
      arena_hp_label: "Health Points (HP)",
      arena_fight_btn: "⚔️ FIGHT!",
      arena_new_battle: "🔄 New Battle",
      arena_log_title: "📜 Epic Battle Chronicle",
      arena_ready_combat: "Ready for combat",
      arena_press_fight: 'Press "FIGHT!" to unleash the roars in the Arena...',
      arena_duel_victory_title: "VICTORY IN SINGLE COMBAT!",
      arena_duel_winner_badge: "👑 Duel Winner",
      arena_duel_defeated_badge: "💀 Defeated",
      arena_duel_again_btn: "⚔️ Fight Another Duel",
      arena_round: "Round",
      arena_critical: "💥 CRITICAL HIT!",
      arena_tourney_title: "The Sanctuary Tournament",
      arena_tourney_desc: "Choose your guardian dragon and advance through 3 consecutive knockout rounds! Between victories, choose Ancestral Relics and Blessings to heal and empower your strikes.",
      arena_choose_champ: "Choose Your Champion:",
      arena_choose_champ_btn: "Choose Champion",
      arena_squad_fighter_hp: "Fighter Health (HP)",
      arena_squad_name_a: "Your Clan Name...",
      arena_squad_name_b: "Rival Clan Name...",
      arena_dragons_count: "Dragons",
      arena_squad_change_pos: "Change pos.",
      arena_rival_label: "Rival",
      arena_squad_clash: "Clash #",
      arena_in_progress: "(Duel in progress)",
      arena_fallen_in_combat: "has fallen in combat!",
      arena_sends_to_front: "sends forward",
      arena_strikes_with: "strikes with",
      arena_causing_dmg: "dealing",
      arena_dmg_to: "damage to",
      arena_start_tourney: "🏆 START THE TOURNAMENT!",
      arena_your_guardian: "🐲 Your Guardian (You)",
      arena_your_hp: "Your Health (HP)",
      arena_opp_hp: "Rival Health (HP)",
      arena_tourney_fight_btn: "⚔️ FIGHT!",
      arena_relic_victory_title: "✨ ROUND VICTORY! Choose Your Ancestral Blessing:",
      arena_relic_victory_desc: "The draconian spirits reward your courage. Pick 1 blessing to strengthen yourself before the next battle:",
      arena_tourney_log_title: "📜 Tournament Chronicle",
      arena_tourney_waiting: "Awaiting battle command",
      arena_tourney_press: 'Press "FIGHT!" to contest the round...',
      arena_abandon_tourney: "🏳️ Forfeit Tournament",
      arena_boss_badge: "👑 FINAL BOSS",
      arena_cup_rival_badge: "Cup Rival",
      arena_champ_supreme: "SUPREME SANCTUARY CHAMPION!",
      arena_champ_desc_prefix: "Your dragon",
      arena_champ_desc_suffix: "has triumphed in the arena and raised the legendary Draconian Cup before the crowd!",
      arena_relics_collected: "Relics Collected in this feat:",
      arena_another_tourney: "🔄 Play Another Tournament",
      arena_fallen_title: "FALLEN IN THE ANCESTRAL ARENA!",
      arena_fallen_hero: "💀 Fallen Hero",
      arena_victorious_rival: "👑 Victorious Rival",
      arena_rounds_cleared: "Rounds Cleared",
      arena_instance_reached: "Furthest Stage",
      arena_active_blessings: "Active Blessings",
      arena_retry_btn: "🔄 Retry with",
      arena_pick_other_btn: "🐲 Choose Another Dragon",
      arena_squad_banner_title: "Clan War: 5 vs 5",
      arena_squad_banner_desc: "The ultimate squad confrontation! Relay battles where each faction fights until all its dragons fall.",
      arena_squad_team_a: "Draconic Legion",
      arena_squad_team_b: "Ancestral Horde",
      arena_squad_start_btn: "⚔️ START CLAN WAR!",
      arena_squad_log_title: "📜 5v5 War Chronicle",
      arena_squad_waiting: "Squads forming lines...",
      arena_squad_victory_title: "5v5 ARENA VICTORIOUS CLAN!",
      arena_squad_survivors: "Survivors:",
      arena_squad_triumphant_clan: "👑 Triumphant Clan",
      arena_squad_defeated_clan: "💀 Defeated Clan",
      arena_squad_another_war: "🔄 Fight Another Clan War",
      arena_picker_title: "🔍 Select Dragon for Combat",
      arena_picker_close: "✕ Close",
      arena_picker_placeholder: "🔍 Type a name or mythology...",
      arena_picker_no_results: "No dragons found matching those criteria",
      // Draconian Sigil Forge
      sigil_static_title: "🔮 How the Sigil Forge Works",
      sigil_static_step1_title: "1. Consonant Extraction",
      sigil_static_step1_desc: "The system takes your name and your dragon's, removes vowels and repeating letters, leaving the pure phonetic essence.",
      sigil_static_step2_title: "2. Radial Coordinates",
      sigil_static_step2_desc: "Each consonant is mapped onto a 360-degree alchemical circle, tracing Bézier curves of concentrated energy.",
      sigil_static_step3_title: "3. Anatomy and Horns",
      sigil_static_step3_desc: "Choose between classic, ram, crown, or crystal horns, and elemental auras in pure vector SVG.",
      sigil_tag: "🔮 Vector Alchemy 🔮",
      sigil_title: "The Draconian Sigil Forge",
      sigil_desc: "A <strong>Sigil</strong> is a secret and powerful symbol. It is the magical code in vector geometry linking your mind to your Guardian Dragon without human words.",
      sigil_step1_2_title: "📜 Steps 1 & 2: Words of Power & Code",
      sigil_alchemy_notice_title: "🔮 Alchemy of Your Secret Sigil:",
      sigil_alchemy_notice_desc: "We combine your Name and your Dragon's. We remove vowels and repeating letters to obtain the sacred consonant matrix.",
      sigil_lbl_user_name: "Your Magical Name:",
      sigil_lbl_dragon_name: "Guardian Dragon's Name:",
      sigil_step3_title: "🐉 Step 3: Power & Magic Palette",
      sigil_lbl_body: "Anatomical Base Frame:",
      sigil_lbl_horns: "Horns Style & Crests:",
      sigil_lbl_element: "Magical Element (Auto Palette):",
      sigil_lbl_presets: "🎨 Quick Theme Palettes:",
      sigil_lbl_stroke: "Strokes / Frame:",
      sigil_lbl_geom: "Geometry:",
      sigil_lbl_glow: "Aura / Glow:",
      sigil_decoder_title: "📜 Rune Decoder",
      sigil_resonance: "Resonance:",
      sigil_step4_tag: "✨ Step 4: Vector Drawing Spell ✨",
      sigil_mirror_title: "The Mirror of Sigils",
      sigil_mirror_desc: "Pure mathematical geometry: smooth, infinite, and scalable strokes that never pixelate.",
      sigil_btn_animate: "✨ Vector Revelation",
      sigil_btn_consecrate: "🔥 Consecrate Sigil",
      sigil_btn_export: "🔮 Download HD Draconian Sigil (PNG)",
      sigil_consecrated_alert_title: "📜 SIGIL OFFICIALLY CONSECRATED!",
      sigil_consecrated_alert_desc: "Your sacred pact with <strong>{dragon}</strong> has been sealed into the alchemical matrix.",
      // Draconian Magic & Sacred Altar
      magic_nav_foundations: "📜 1. Foundations",
      magic_nav_fundamentos: "📜 1. Foundations",
      magic_nav_altar: "⚒️ 2. The Altar",
      magic_nav_academy: "🎓 3. Academy (5 Rings)",
      magic_nav_academia: "🎓 3. Academy (5 Rings)",
      magic_nav_sigils: "🔮 4. Sigil Forge",
      magic_nav_sigilos: "🔮 4. Sigil Forge",
      altar_tool_wand: "✨ 1. Wand or Staff",
      altar_tool_varita: "✨ 1. Wand or Staff",
      altar_tool_pentacle: "⭐ 2. Pentacle (5 Elements)",
      altar_tool_pentaculo: "⭐ 2. Pentacle (5 Elements)",
      altar_tool_mirror: "👁️ 3. Magic Mirror",
      altar_tool_espejo: "👁️ 3. Magic Mirror",
      altar_tool_dragonscript: "📜 4. Dragon Script",
    }
  };

  const ELEMENT_MAP = {
    "Todos": { es: "Todos los Elementos", en: "All Elements" },
    "Fuego": { es: "Fuego", en: "Fire" },
    "Agua": { es: "Agua", en: "Water" },
    "Tierra": { es: "Tierra", en: "Earth" },
    "Viento": { es: "Viento", en: "Wind" },
    "Tormenta": { es: "Tormenta", en: "Storm" },
    "Hielo": { es: "Hielo", en: "Ice" },
    "Magma": { es: "Magma", en: "Magma" },
    "Luz": { es: "Luz", en: "Light" },
    "Sombra": { es: "Sombra", en: "Shadow" },
    "Veneno": { es: "Veneno", en: "Poison" },
    "Naturaleza": { es: "Naturaleza", en: "Nature" },
    "Cristal": { es: "Cristal", en: "Crystal" },
    "Arcana": { es: "Arcana", en: "Arcane" },
    "Caos": { es: "Caos", en: "Chaos" },
    "Tiempo": { es: "Tiempo", en: "Time" },
    "Astral": { es: "Astral", en: "Astral" }
  };

  const MYTHOLOGY_MAP = {
    "Todas": { es: "Todas las Mitologías", en: "All Mythologies" },
    "Nórdica y Germánica": { es: "Nórdica y Germánica", en: "Norse & Germanic" },
    "Griega y Romana": { es: "Griega y Romana", en: "Greek & Roman" },
    "Oriental (Asia)": { es: "Oriental (Asia)", en: "Eastern (Asia)" },
    "Mesoamericana y Sudamericana": { es: "Mesoamericana y Sudamericana", en: "Mesoamerican & South American" },
    "Celta y Británica": { es: "Celta y Británica", en: "Celtic & British" },
    "Europea Continental": { es: "Europea Continental", en: "Continental European" },
    "Eslava y Este de Europa": { es: "Eslava y Este de Europa", en: "Slavic & Eastern European" },
    "Mesopotámica y Medio Oriente": { es: "Mesopotámica y Medio Oriente", en: "Mesopotamian & Middle Eastern" },
    "Hindú y Sudeste Asiático": { es: "Hindú y Sudeste Asiático", en: "Hindu & Southeast Asian" },
    "Leyenda del Santuario": { es: "Leyenda del Santuario", en: "Sanctuary Legend" }
  };

  const TYPE_MAP = {
    "Todos": { es: "Todos los Tipos de Cuerpo", en: "All Body Types" },
    "Dragón Europeo": { es: "Dragón Europeo", en: "European Dragon" },
    "Wyvern": { es: "Wyvern", en: "Wyvern" },
    "Wyrm": { es: "Wyrm", en: "Wyrm" },
    "Drake": { es: "Drake", en: "Drake" },
    "Shen": { es: "Shen", en: "Shen" },
    "Ampithere": { es: "Ampithere", en: "Amphipthere" },
    "Hidra": { es: "Hidra", en: "Hydra" },
    "Drakón": { es: "Drakón", en: "Drakon" },
    "Basilisco": { es: "Basilisco", en: "Basilisk" },
    "Otros": { es: "Otros", en: "Others" }
  };

  const I18N = {
    currentLang: "es",

    init: function() {
      const p = window.location.pathname;
      const urlParams = new URLSearchParams(window.location.search);
      if (p.startsWith("/en/") || p === "/en" || urlParams.get("lang") === "en") {
        this.currentLang = "en";
      } else if (urlParams.get("lang") === "es") {
        this.currentLang = "es";
      } else {
        const saved = localStorage.getItem("santuario_lang");
        this.currentLang = (saved === "en") ? "en" : "es";
      }
      this.applyTranslations();
      this.updateControls();

      // Sincronizar URL visible si la preferencia activa no coincide con la ruta actual
      if (typeof window !== "undefined" && window.history && window.history.replaceState) {
        let canonicalUrl = null;
        if (this.currentLang === "en" && !p.startsWith("/en/") && p !== "/en") {
          if (p === "/" || p === "/index.html" || p === "") {
            canonicalUrl = "/en/";
          } else if (p.includes("/dragon/")) {
            const match = p.match(/(?:\/en)?\/dragon\/([^\/]+)$/);
            if (match) canonicalUrl = "/en/dragon/" + match[1];
          } else {
            const cleanName = p.replace(/^\//, "");
            canonicalUrl = "/en/" + cleanName;
          }
        } else if (this.currentLang === "es" && (p.startsWith("/en/") || p === "/en")) {
          if (p === "/en/" || p === "/en/index.html" || p === "/en") {
            canonicalUrl = "/";
          } else if (p.includes("/en/dragon/")) {
            const match = p.match(/(?:\/en)?\/dragon\/([^\/]+)$/);
            if (match) canonicalUrl = "/dragon/" + match[1];
          } else {
            const cleanName = p.replace(/^\/en\//, "");
            canonicalUrl = "/" + cleanName;
          }
        }
        if (canonicalUrl && canonicalUrl !== p) {
          window.history.replaceState({ lang: this.currentLang }, "", canonicalUrl);
        }
      }

      // Sincronizar popstate al usar botones de Atrás / Adelante del navegador
      if (typeof window !== "undefined" && !window._i18nPopstateBound) {
        window._i18nPopstateBound = true;
        window.addEventListener("popstate", () => {
          const path = window.location.pathname;
          const params = new URLSearchParams(window.location.search);
          const targetLang = (path.startsWith("/en/") || path === "/en" || params.get("lang") === "en") ? "en" : "es";
          if (targetLang !== I18N.currentLang) {
            I18N.setLanguage(targetLang, false);
          }
        });
      }
    },

    t: function(key) {
      const lang = this.currentLang;
      if (DICT[lang] && DICT[lang][key]) {
        return DICT[lang][key];
      }
      return (DICT["es"] && DICT["es"][key]) || key;
    },

    translateElement: function(val) {
      const lang = this.currentLang;
      if (ELEMENT_MAP[val] && ELEMENT_MAP[val][lang]) {
        return ELEMENT_MAP[val][lang];
      }
      return val;
    },

    translateMythology: function(val) {
      const lang = this.currentLang;
      if (MYTHOLOGY_MAP[val] && MYTHOLOGY_MAP[val][lang]) {
        return MYTHOLOGY_MAP[val][lang];
      }
      return val;
    },

    translateType: function(val) {
      const lang = this.currentLang;
      if (TYPE_MAP[val] && TYPE_MAP[val][lang]) {
        return TYPE_MAP[val][lang];
      }
      return val;
    },

    setLanguage: function(lang, updateUrl = true) {
      this.currentLang = (lang === "en") ? "en" : "es";
      try {
        localStorage.setItem("santuario_lang", this.currentLang);
      } catch (e) {}
      this.applyTranslations();
      this.updateControls();

      // Sincronizar URL visible en la barra de direcciones del navegador
      if (updateUrl && typeof window !== "undefined" && window.history && window.history.pushState) {
        const p = window.location.pathname;
        const search = window.location.search;
        let newUrl = null;
        const isEn = (this.currentLang === "en");

        // 1. Fichas de Dragón: /dragon/X.html <--> /en/dragon/X.html
        if (p.includes("/dragon/")) {
          const match = p.match(/(?:\/en)?\/dragon\/([^\/]+)$/);
          if (match) {
            const slugFile = match[1];
            newUrl = isEn ? "/en/dragon/" + slugFile : "/dragon/" + slugFile;
          }
        }
        // 2. Enciclopedia / Home: / <--> /en/
        else if (p === "/" || p === "/index.html" || p === "/en/" || p === "/en/index.html" || p === "/en") {
          newUrl = isEn ? "/en/" : "/";
        }
        // 3. Páginas de sección (arena, magia, altar, academia, test, favoritos, etc.)
        else {
          const cleanName = p.replace(/^\/en\//, "").replace(/^\//, "");
          newUrl = isEn ? "/en/" + cleanName : "/" + cleanName;
        }

        // Limpiar parámetro ?lang= redundante si existe en la query string
        let extraParams = "";
        if (search) {
          const params = new URLSearchParams(search);
          params.delete("lang");
          const s = params.toString();
          if (s) extraParams = "?" + s;
        }

        if (newUrl) {
          const finalUrl = newUrl + extraParams;
          if (finalUrl !== (p + search)) {
            window.history.pushState({ lang: this.currentLang }, "", finalUrl);
          }
        }
      }
    },

    toggleLanguage: function() {
      this.setLanguage(this.currentLang === "es" ? "en" : "es");
    },

    applyTranslations: function() {
      const lang = this.currentLang;

      // 1. Traducir elementos con atributo data-i18n
      const nodes = document.querySelectorAll("[data-i18n]");
      nodes.forEach(node => {
        const key = node.getAttribute("data-i18n");
        if (key) {
          const text = this.t(key);
          if (node.tagName === "INPUT" || node.tagName === "TEXTAREA") {
            node.placeholder = text;
          } else if (node.hasAttribute("data-i18n-html") || text.includes("<")) {
            node.innerHTML = text;
          } else {
            node.textContent = text;
          }
        }
      });

      // 2. Traducir select de Mitología (sin cambiar los values internos)
      const mythSelect = document.getElementById("filter-mythology");
      if (mythSelect) {
        Array.from(mythSelect.options).forEach(opt => {
          opt.textContent = this.translateMythology(opt.value);
        });
      }

      // 3. Traducir select de Elemento
      const elemSelect = document.getElementById("filter-element");
      if (elemSelect) {
        Array.from(elemSelect.options).forEach(opt => {
          opt.textContent = this.translateElement(opt.value);
        });
      }

      // 4. Traducir select de Tipo de Cuerpo
      const typeSelect = document.getElementById("filter-type");
      if (typeSelect) {
        Array.from(typeSelect.options).forEach(opt => {
          opt.textContent = this.translateType(opt.value);
        });
      }

      // 5. Traducir select de Peligro
      const dangerSelect = document.getElementById("filter-danger");
      if (dangerSelect) {
        Array.from(dangerSelect.options).forEach(opt => {
          if (opt.value === "Todos") {
            opt.textContent = this.t("opt_all_danger");
          } else {
            const num = opt.value;
            const flames = "🔥".repeat(parseInt(num, 10));
            opt.textContent = `${flames} (${this.t("danger_prefix")} ${num})`;
          }
        });
      }

      // 6. Traducir select de Ordenamiento
      const sortSelect = document.getElementById("filter-sort");
      if (sortSelect) {
        Array.from(sortSelect.options).forEach(opt => {
          if (opt.value === "name-asc") opt.textContent = this.t("sort_name_asc");
          else if (opt.value === "name-desc") opt.textContent = this.t("sort_name_desc");
          else if (opt.value === "danger-desc") opt.textContent = this.t("sort_danger_desc");
          else if (opt.value === "danger-asc") opt.textContent = this.t("sort_danger_asc");
        });
      }

      // 7. Traducir badges de elementos en las tarjetas visibles
      document.querySelectorAll(".element-badge").forEach(badge => {
        const rawElem = badge.getAttribute("data-raw-element") || badge.textContent.trim();
        badge.setAttribute("data-raw-element", rawElem);
        badge.textContent = this.translateElement(rawElem);
      });

      // 7b. Traducir tags de mitología en tarjetas
      document.querySelectorAll(".mythology-tag").forEach(tag => {
        const rawMyth = tag.getAttribute("data-raw-myth") || tag.textContent.replace(/^🏛️\s*/, "").trim();
        tag.setAttribute("data-raw-myth", rawMyth);
        tag.textContent = `🏛️ ${this.translateMythology(rawMyth)}`;
      });

      // 7c. Traducir tooltips de favoritos
      document.querySelectorAll(".fav-btn").forEach(btn => {
        const isFav = btn.classList.contains("active");
        btn.title = isFav ? this.t("fav_remove") : this.t("fav_add");
      });

      // 7d. Traducir títulos en tarjetas del catálogo
      document.querySelectorAll(".dragon-card").forEach(card => {
        const id = card.getAttribute("data-id");
        const titleEl = card.querySelector(".dragon-title");
        if (id && titleEl) {
          const rawTitle = titleEl.getAttribute("data-raw-title") || titleEl.textContent.replace(/^"|"$/g, "");
          titleEl.setAttribute("data-raw-title", rawTitle);
          const enData = (typeof window !== "undefined" && window.DRAGONS_EN) ? window.DRAGONS_EN[id] : null;
          if (lang === "en" && enData && enData.title) {
            titleEl.textContent = `"${enData.title}"`;
          } else {
            titleEl.textContent = `"${rawTitle}"`;
          }
        }
      });

      // 8. Actualizar badge de resultados
      const resultsCount = document.getElementById("results-count");
      if (resultsCount) {
        const txt = resultsCount.textContent;
        const numMatch = txt.match(/\d+/);
        if (numMatch) {
          const num = numMatch[0];
          resultsCount.textContent = `${num} ${this.t(num === "103" ? "results_count_suffix" : "results_found")}`;
        }
      }


      // 10. Traducir valores en fichas estáticas de /dragon/
      document.querySelectorAll(".trans-myth").forEach(el => {
        const raw = el.getAttribute("data-raw") || el.textContent.trim();
        el.setAttribute("data-raw", raw);
        el.textContent = this.translateMythology(raw);
      });
      document.querySelectorAll(".trans-type").forEach(el => {
        const raw = el.getAttribute("data-raw") || el.textContent.trim();
        el.setAttribute("data-raw", raw);
        el.textContent = this.translateType(raw);
      });
      document.querySelectorAll(".trans-elem").forEach(el => {
        const raw = el.getAttribute("data-raw") || el.textContent.trim();
        el.setAttribute("data-raw", raw);
        el.textContent = this.translateElement(raw);
      });
      document.querySelectorAll("[data-dragon-id-badge]").forEach(el => {
        const id = el.getAttribute("data-dragon-id-badge");
        el.textContent = `📜 ${this.t("dragon_badge_prefix")} #${id}`;
      });

      // 11. Conmutar textos narrativos (lore) en fichas estáticas
      document.querySelectorAll(".trans-lore-title").forEach(el => {
        const es = el.getAttribute("data-es");
        const en = el.getAttribute("data-en");
        if (lang === "en" && en) {
          el.textContent = `"${en}"`;
        } else if (lang === "es" && es) {
          el.textContent = `"${es}"`;
        }
      });

      document.querySelectorAll(".trans-lore-habitat, .trans-lore-ability, .trans-lore-weakness").forEach(el => {
        const es = el.getAttribute("data-es");
        const en = el.getAttribute("data-en");
        if (lang === "en" && en) {
          el.textContent = en;
        } else if (lang === "es" && es) {
          el.textContent = es;
        }
      });

      document.querySelectorAll(".trans-lore-scroll").forEach(el => {
        const es = el.getAttribute("data-es");
        const en = el.getAttribute("data-en");
        if (lang === "en" && en) {
          el.textContent = `"${en}"`;
        } else if (lang === "es" && es) {
          el.textContent = `"${es}"`;
        }
      });

      // 9. Actualizar botones de navegación de paginación
      const btnFirst = document.getElementById("btn-first-page");
      if (btnFirst) btnFirst.textContent = lang === "en" ? "⏮️ First" : "⏮️ Primera";
      const btnPrev = document.getElementById("btn-prev-page");
      if (btnPrev) btnPrev.textContent = lang === "en" ? "◀ Previous" : "◀ Anterior";
      const btnNext = document.getElementById("btn-next-page");
      if (btnNext) btnNext.textContent = lang === "en" ? "Next ▶" : "Siguiente ▶";
      const btnLast = document.getElementById("btn-last-page");
      if (btnLast) btnLast.textContent = lang === "en" ? "Last ⏭️" : "Última ⏭️";

      // 12. Actualizar vista de favoritos si estamos en favoritos.html
      if (document.getElementById("favorites-grid") && typeof window.renderFavoritesView === "function") {
        window.renderFavoritesView();
      }

      // 13. Actualizar vista del quiz si estamos en test-draconiano.html
      if (document.getElementById("quiz-container") && typeof window.renderQuizCurrentView === "function") {
        window.renderQuizCurrentView();
      }

      // 14. Actualizar vista de la Arena si estamos en arena.html o coliseo.html
      const arenaCont = document.getElementById("arena-container") || document.getElementById("coliseo-container");
      if (arenaCont && typeof window.renderArenaContainer === "function") {
        if (!window.isBattling && !window.isTournamentBattling && !window.isSquadBattling) {
          if (window.isArenaMounted) {
            window.renderArenaContainer(arenaCont);
          }
        }
      }

      // 15. Traducir Pie de Página (Site Footer) en cualquier página
      const footer = document.querySelector(".site-footer");
      if (footer) {
        // A. Encabezados de columnas
        const colHeaders = footer.querySelectorAll("strong");
        colHeaders.forEach(h => {
          const raw = h.getAttribute("data-raw") || h.textContent.trim();
          h.setAttribute("data-raw", raw);
          if (raw.includes("Mitología")) {
            h.textContent = lang === "en" ? "🏛️ Explore by Mythology:" : "🏛️ Explorá por Mitología:";
          } else if (raw.includes("Elemento")) {
            h.textContent = lang === "en" ? "🔥 Explore by Element:" : "🔥 Explorá por Elemento:";
          } else if (raw.includes("Tipo de Cuerpo")) {
            h.textContent = lang === "en" ? "🐉 Explore by Body Type:" : "🐉 Explorá por Tipo de Cuerpo:";
          }
        });

        // B. Enlaces de navegación por filtro
        const footerLinks = footer.querySelectorAll("ul li a");
        footerLinks.forEach(a => {
          const raw = a.getAttribute("data-raw") || a.textContent.trim();
          a.setAttribute("data-raw", raw);
          const href = a.getAttribute("href") || "";
          if (href.includes("mitologia=")) {
            a.textContent = this.translateMythology(raw);
          } else if (href.includes("elemento=")) {
            a.textContent = this.translateElement(raw);
          } else if (href.includes("tipo=")) {
            a.textContent = this.translateType(raw);
          }
        });

        // C. Botón de reporte de feedback
        const feedbackBtn = footer.querySelector(".footer-feedback-btn span:last-child");
        if (feedbackBtn) {
          const raw = feedbackBtn.getAttribute("data-raw") || feedbackBtn.textContent.trim();
          feedbackBtn.setAttribute("data-raw", raw);
          feedbackBtn.textContent = lang === "en" ? "Report Error or Suggestion" : "Reportar Error o Sugerencia";
        }

        // D. Leyenda de autor / copyright
        const copyrightP = footer.querySelector("p");
        if (copyrightP) {
          const raw = copyrightP.getAttribute("data-raw") || copyrightP.textContent.trim();
          copyrightP.setAttribute("data-raw", raw);
          if (lang === "en") {
            copyrightP.textContent = "🐉 Secret Sanctuary of Dragons | Created by Magus Dragus";
          } else {
            copyrightP.textContent = "🐉 Santuario Secreto de Dragones | Creado por Magus Dragus";
          }
        }
      }

      // 16. Sincronizar Modal de Feedback si existe en el DOM
      const fbModal = document.getElementById("feedback-modal-backdrop");
      if (fbModal) {
        fbModal.remove();
      }

      // 17. Actualizar Título y Metadatos en forja-de-sigilos.html
      const p = window.location.pathname;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (p.includes("forja-de-sigilos")) {
        document.title = lang === "en"
          ? "Draconian Sigil Forge: Craft Your Sacred Glyph | Sanctuary of Dragons"
          : "Forja de Sigilos Draconianos: Creá tu Glifo Sagrado | Santuario de Dragones";
        if (metaDesc) {
          metaDesc.content = lang === "en"
            ? "Design and forge your own protective draconian sigil in vector SVG: combine your name with your guardian dragon, choose horns and elemental auras."
            : "Diseñá y forjá tu propio sigilo protector draconiano en SVG vectorial: combiná tu nombre con tu dragón guardián, elegí cuernos y auras elementales.";
        }
      } else if (p.includes("magia-draconiana")) {
        document.title = lang === "en"
          ? "Ancestral Draconian Magic: Foundations, The 4 Laws & Philosophy | Dragon Sanctuary"
          : "Magia Draconiana Ancestral: Fundamentos, Las 4 Leyes y Filosofía | Santuario de Dragones";
        if (metaDesc) {
          metaDesc.content = lang === "en"
            ? "Discover the foundations of ancestral draconian magic, its 4 sacred laws, the Golden Rule, and translation into the ancient dragon script."
            : "Descubrí los fundamentos de la magia draconiana ancestral, sus 4 leyes sagradas, la Regla de Oro y la traducción al escrito antiguo del dragón.";
        }
      } else if (p.includes("altar-varita")) {
        document.title = lang === "en"
          ? "The Wand or Balancing Staff | Dragon Sanctuary"
          : "La Varita o Bastón de Equilibrio | Santuario de Dragones";
        if (metaDesc) {
          metaDesc.content = lang === "en"
            ? "Complete crafting manual, tuning guide, and body measurements for your draconian balancing wand or staff."
            : "Manual completo de confección, sintonización y medidas para tu varita o bastón de equilibrio draconiano.";
        }
      } else if (p.includes("altar-pentaculo")) {
        document.title = lang === "en"
          ? "The Pentacle of the 5 Elements | Dragon Sanctuary"
          : "El Pentáculo de los 5 Elementos | Santuario de Dragones";
        if (metaDesc) {
          metaDesc.content = lang === "en"
            ? "Learn to craft and consecrate the sacred Pentacle of the 5 elements and the golden safety rule."
            : "Aprende a construir y consagrar el Pentáculo sagrado de los 5 elementos y la regla de oro de seguridad.";
        }
      } else if (p.includes("altar-espejo")) {
        document.title = lang === "en"
          ? "The Magic Mirror or Dragon Eye | Dragon Sanctuary"
          : "El Espejo Mágico u Ojo de Dragón | Santuario de Dragones";
        if (metaDesc) {
          metaDesc.content = lang === "en"
            ? "Craft your own Magic Mirror or Dragon Eye to protect your altar and attune mystical insight."
            : "Construye tu propio Espejo Mágico u Ojo de Dragón para proteger tu altar y sintonizar la visión mística.";
        }
      } else if (p.includes("altar-dragonscript")) {
        document.title = lang === "en"
          ? "Dragon Script: The Sacred Alphabet | Dragon Sanctuary"
          : "Dragon Script: El Alfabeto Sagrado | Santuario de Dragones";
        if (metaDesc) {
          metaDesc.content = lang === "en"
            ? "The mystical writing system and live translator into the ancient language of dragons."
            : "El sistema místico de escritura y traducción al lenguaje antiguo del dragón.";
        }
      } else if (p.includes("altar-draconiano")) {
        document.title = lang === "en"
          ? "The Draconian Altar & Magical Tools | Dragon Sanctuary"
          : "El Altar Draconiano y Herramientas Mágicas | Santuario de Dragones";
        if (metaDesc) {
          metaDesc.content = lang === "en"
            ? "Learn how to build your draconian ritual altar, find your balancing wand or staff, and consecrate your sacred elements."
            : "Aprendé a construir tu altar ritual draconiano, encontrar la varita o bastón de equilibrio y consagrar tus elementos sagrados.";
        }
      } else if (p.includes("academia-anillo-1")) {
        document.title = lang === "en"
          ? "Ring 1: The Apprentice (Awakening & Patience) | Dragon Sanctuary"
          : "Anillo 1: El Aprendiz (Despertar y Paciencia) | Santuario de Dragones";
        if (metaDesc) {
          metaDesc.content = lang === "en"
            ? "Lesson of the First Ring of the Draconian Academy: breathing, concentration, apprentice code, and initial connection."
            : "Lección del Primer Anillo de la Academia Draconiana: respiración, concentración, el código del aprendiz y conexión inicial.";
        }
      } else if (p.includes("academia-anillo-2")) {
        document.title = lang === "en"
          ? "Ring 2: The Enchanter (Sounds & Words of Power) | Dragon Sanctuary"
          : "Anillo 2: El Encantador (Sonidos y Palabras de Poder) | Santuario de Dragones";
        if (metaDesc) {
          metaDesc.content = lang === "en"
            ? "Lesson of the Second Ring of the Draconian Academy: rhymes, harmonic sounds, bell, and words of power."
            : "Lección del Segundo Anillo de la Academia Draconiana: rimas, sonidos armónicos, campana y palabras de poder.";
        }
      } else if (p.includes("academia-anillo-3")) {
        document.title = lang === "en"
          ? "Ring 3: The Shaman (Nature & Healing) | Dragon Sanctuary"
          : "Anillo 3: El Chamán (Naturaleza y Sanación) | Santuario de Dragones";
        if (metaDesc) {
          metaDesc.content = lang === "en"
            ? "Lesson of the Third Ring of the Draconian Academy: friendship with animals, sacred plants, and nature healing."
            : "Lección del Tercer Anillo de la Academia Draconiana: amistad con los animales, plantas sagradas y sanación de la naturaleza.";
        }
      } else if (p.includes("academia-anillo-4")) {
        document.title = lang === "en"
          ? "Ring 4: The Warrior (Shield of Courage) | Dragon Sanctuary"
          : "Anillo 4: El Guerrero (Escudo de Valentía) | Santuario de Dragones";
        if (metaDesc) {
          metaDesc.content = lang === "en"
            ? "Lesson of the Fourth Ring of the Draconian Academy: meditation, the golden shield, respect, and magical protection."
            : "Lección del Cuarto Anillo de la Academia Draconiana: meditación, el escudo dorado, respeto y protección mágica.";
        }
      } else if (p.includes("academia-anillo-5")) {
        document.title = lang === "en"
          ? "Ring 5: The Mystic (Graduation & Cosmic Lore) | Dragon Sanctuary"
          : "Anillo 5: El Místico (Graduación y Sabiduría Cósmica) | Santuario de Dragones";
        if (metaDesc) {
          metaDesc.content = lang === "en"
            ? "Lesson of the Fifth Ring of the Draconian Academy: the web of life, the storm element, oath, and graduation."
            : "Lección del Quinto Anillo de la Academia Draconiana: la red de la vida, el elemento tormenta, juramento y graduación.";
        }
      } else if (p.includes("academia-draconiana")) {
        document.title = lang === "en"
          ? "The Draconian Academy: The 5 Rings of Lore | Dragon Sanctuary"
          : "La Academia Draconiana: Los 5 Anillos del Saber | Santuario de Dragones";
        if (metaDesc) {
          metaDesc.content = lang === "en"
            ? "Advance step by step through the 5 Inner Rings of Lore to master focus, enchantments, shamanic healing, protection, and dragon mysticism."
            : "Avanzá paso a paso a través de los 5 Anillos Internos del Saber para dominar la concentración, los encantamientos, la sanación, la protección y el misticismo.";
        }
      } else if (p.includes("test-draconiano")) {
        document.title = lang === "en"
          ? "Draconian Quiz: Which Dragon Are You? | Dragon Sanctuary"
          : "Test Draconiano: ¿Qué Dragón Sos Vos? | Santuario de Dragones";
        if (metaDesc) {
          metaDesc.content = lang === "en"
            ? "Take the 5-question mystical quiz and discover which of the 100 legendary dragons resonates with your personality, element, and spiritual temperament."
            : "Hacé el test místico de 5 preguntas y descubrí cuál de los 100 dragones legendarios resuena con tu personalidad, elemento y temperamento espiritual.";
        }
      } else if (p.includes("favoritos")) {
        document.title = lang === "en"
          ? "My Favorite Dragons | Dragon Sanctuary"
          : "Mis Dragones Favoritos | Santuario de Dragones";
        if (metaDesc) {
          metaDesc.content = lang === "en"
            ? "Your personal dragon lair in the Secret Sanctuary: view and manage your saved legendary creatures."
            : "Tu guarida personal en el Santuario Secreto: consultá y gestioná los dragones legendarios guardados en tu sesión.";
        }
      }

      // 18. Actualizar Forja de Sigilos y Sección de Magia
      const magicCont = document.getElementById("magic-container");
      if (magicCont && typeof window.renderMagicSection === "function") {
        window.renderMagicSection(magicCont);
      } else if (document.getElementById("sigil-svg-stage") && typeof window.renderSigilForgeUI === "function") {
        const c = document.getElementById("sigil-container") || document.getElementById("magic-container");
        if (c) window.renderSigilForgeUI(c);
      }

      // 19. Actualizar Quiz interactivo en vivo
      if (document.getElementById("quiz-container") && typeof window.renderQuizCurrentView === "function") {
        window.renderQuizCurrentView();
      }

    },

    updateControls: function() {
      const langBtn = document.getElementById("btn-lang-toggle");
      if (langBtn) {
        langBtn.textContent = this.t("lang_btn_text");
        langBtn.title = this.t("lang_btn_title");
      }

      const audioBtn = document.getElementById("btn-audio-toggle");
      if (audioBtn) {
        const isMuted = (typeof window.isMuted !== "undefined") ? window.isMuted : false;
        audioBtn.textContent = isMuted ? this.t("sound_off") : this.t("sound_on");
      }
    }
  };

  window.I18N = I18N;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => I18N.init());
  } else {
    I18N.init();
  }
})();
