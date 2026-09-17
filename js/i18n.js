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
      ancient_scroll_title: "📜 Pergamino de la Antigüedad",
      fav_add: "🤍 Guardar en Favoritos",
      fav_remove: "❤️ Quitar de Favoritos",
      view_full_page: "📖 Ver Ficha Completa",
      // Ficha individual de Dragón
      stat_element: "Elemento",
      btn_back_encyclopedia: "⬅️ Volver a la Enciclopedia",
      combat_data_title: "Datos de Combate & Hábitat",
      btn_back_catalog: "📚 Volver al Catálogo de Dragones",
      dragon_badge_prefix: "Dragón",
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
      ancient_scroll_title: "📜 Ancient Lore Scroll",
      fav_add: "🤍 Save to Favorites",
      fav_remove: "❤️ Remove from Favorites",
      view_full_page: "📖 View Full Page",
      // Standalone Dragon Detail Page
      stat_element: "Element",
      btn_back_encyclopedia: "⬅️ Back to Encyclopedia",
      combat_data_title: "Combat Data & Habitat",
      btn_back_catalog: "📚 Back to Dragon Catalog",
      dragon_badge_prefix: "Dragon",
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
      const saved = localStorage.getItem("santuario_lang");
      this.currentLang = (saved === "en") ? "en" : "es";
      this.applyTranslations();
      this.updateControls();
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

    setLanguage: function(lang) {
      this.currentLang = (lang === "en") ? "en" : "es";
      try {
        localStorage.setItem("santuario_lang", this.currentLang);
      } catch (e) {}
      this.applyTranslations();
      this.updateControls();
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
