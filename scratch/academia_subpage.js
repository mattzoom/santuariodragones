// SUB-PÁGINA 3: LA ACADEMIA DRACONIANA (5 ANILLOS)
function renderAcademiaSubPage(container) {
  if (typeof window !== "undefined" && window.location) {
    const p = window.location.pathname;
    for (let r = 1; r <= 5; r++) {
      if (p.includes(`academia-anillo-${r}`)) {
        currentMagicRing = r;
        break;
      }
    }
  }

  const isEn = magicIsEn();
  container.innerHTML = `
    <div class="magic-section-wrapper" style="display: flex; flex-direction: column; gap: 2rem;">
      
      <!-- HERO BANNER DE ACADEMIA SUB-PAGE -->
      <div class="magic-hero fantasy-panel text-center" style="padding: 2.2rem; background: linear-gradient(135deg, rgba(233,196,106,0.15), rgba(138,43,226,0.15)); border: 2px solid var(--gold-main); border-radius: 20px;">
        <div class="quiz-step-tag" style="font-size: 0.95rem;">${isEn ? "🎓 Center of Mastery 🎓" : "🎓 Centro de Maestría 🎓"}</div>
        <h2 class="panel-title margin-top-xs" style="color: var(--gold-main); font-size: 2.3rem;">${isEn ? "The Draconian Academy" : "La Academia Draconiana"}</h2>
        <p style="color: var(--text-main); font-size: 1.1rem; max-width: 800px; margin: 12px auto 0 auto; line-height: 1.6;">
          ${isEn 
            ? "Advance step by step through the 5 Inner Rings of Lore to master focus, enchantments, shamanic healing, protection, and dragon mysticism." 
            : "Avanzá paso a paso a través de los 5 Anillos Internos del Saber para dominar la concentración, los encantamientos, la sanación, la protección y el misticismo."}
        </p>

        <!-- SUB-NAV SWITCHER -->
        ${renderMagicSubNavHtml("academia")}
      </div>

      <!-- NAVEGACIÓN POR LOS 5 ANILLOS -->
      <div class="fantasy-panel" style="padding: 2rem;">
        <div class="text-center">
          <h3 class="panel-title" style="color: var(--gold-main); font-size: 1.8rem;">${isEn ? "The Five Inner Rings of Lore" : "Los Cinco Anillos Internos del Saber"}</h3>
          <p style="color: var(--text-muted); font-size: 1rem; margin-top: 6px;">
            ${isEn ? "Select a Ring to study its lesson and complete its sacred quests:" : "Seleccioná un Anillo para estudiar su lección y completar sus misiones:"}
          </p>
        </div>

        <!-- Navigation Chips for 5 Rings -->
        <div class="magic-rings-nav display-flex justify-center flex-wrap gap-sm margin-top-lg" style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
          <a href="/academia-anillo-1.html" class="chip ${currentMagicRing === 1 ? "active" : ""}" style="padding: 10px 18px; font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center;">${isEn ? "🌱 Ring 1: Apprentice" : "🌱 Anillo 1: El Aprendiz"}</a>
          <a href="/academia-anillo-2.html" class="chip ${currentMagicRing === 2 ? "active" : ""}" style="padding: 10px 18px; font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center;">${isEn ? "📜 Ring 2: Enchanter" : "📜 Anillo 2: El Encantador"}</a>
          <a href="/academia-anillo-3.html" class="chip ${currentMagicRing === 3 ? "active" : ""}" style="padding: 10px 18px; font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center;">${isEn ? "🌿 Ring 3: Shaman" : "🌿 Anillo 3: El Chamán"}</a>
          <a href="/academia-anillo-4.html" class="chip ${currentMagicRing === 4 ? "active" : ""}" style="padding: 10px 18px; font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center;">${isEn ? "🛡️ Ring 4: Warrior" : "🛡️ Anillo 4: El Guerrero"}</a>
          <a href="/academia-anillo-5.html" class="chip ${currentMagicRing === 5 ? "active" : ""}" style="padding: 10px 18px; font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center;">${isEn ? "🔮 Ring 5: Mystic" : "🔮 Anillo 5: El Místico"}</a>
        </div>

        <!-- Ring Content Container -->
        <div class="ring-detail-box margin-top-lg fantasy-panel" id="ring-detail-box" style="padding: 1.8rem; background: rgba(0,0,0,0.4); border-radius: 16px;">
          ${renderRingContent(currentMagicRing)}
        </div>
      </div>

    </div>
  `;
}