import { extractConsonants } from "../utils/AustinSpare.js?v=6.1.0";
import { renderSigilSVG } from "../svg/sigilSvg.js?v=6.1.0";
import { playSound } from "../utils/audio.js?v=6.1.0";

const ELEMENTAL_PALETTES = {
  Rayo: { primary: "#ffd700", secondary: "#7209b7", glow: "#4cc9f0" },
  Fuego: { primary: "#ffd700", secondary: "#e63946", glow: "#ff5722" },
  Hielo: { primary: "#90e0ef", secondary: "#0077b6", glow: "#48cae4" },
  Veneno: { primary: "#2a9d8f", secondary: "#52b788", glow: "#74c69d" },
  Sombra: { primary: "#e0aaff", secondary: "#3c096c", glow: "#9d4edd" },
  Luz: { primary: "#ffd700", secondary: "#f8f9fa", glow: "#ffb703" }
};

const BODY_LABELS_ES = {
  draco: "Draco Clásico",
  shen: "Shen Serpentino",
  wyvern: "Wyvern Ágil",
  hidra: "Hidra",
  ampithere: "Ampithere Alado"
};

const HORN_LABELS_ES = {
  "horns-classic": "Cuernos Clásicos",
  "horns-ram": "Cuernos de Carnero",
  "horns-crown": "Corona de Espinas",
  "horns-unicorn": "Cuerno de Cristal"
};

const RUNAL_MEANINGS = {
  B: "Sabiduría Ancestral", C: "Viento y Cielos", D: "Dominio Draco", F: "Fuego Inmortal",
  G: "Guardián de Protección", H: "Escarcha Eterna", J: "Justicia Solar", K: "Cristal de Poder",
  L: "Luz Estelar", M: "Magia Mística", N: "Fuerza Vital", P: "Poder Elemental",
  Q: "Alquimia Sagrada", R: "Rayo y Tormenta", S: "Sombra Abisal", T: "Poder Terrenal",
  V: "Veneno Curativo", W: "Viento Ancestral", X: "Vínculo Cósmico", Y: "Eternidad", Z: "Cúspide Dragón"
};

const BACKGROUND_PRESETS = {
  astral: "radial-gradient(circle at center, #2e1065 0%, #0f172a 70%, #020617 100%)",
  fuego: "radial-gradient(circle at center, #7f1d1d 0%, #450a0a 65%, #0f0505 100%)",
  escarcha: "radial-gradient(circle at center, #075985 0%, #0c4a6e 65%, #031e2e 100%)",
  obsidiana: "radial-gradient(circle at center, #581c87 0%, #2e1065 65%, #090314 100%)"
};

const SIGIL_STATE = {
  userName: "MAGUS DRAGUS",
  dragonName: "VOLTARION",
  bodyType: "draco",
  hornStyle: "horns-classic",
  element: "Rayo",
  colorPrimary: "#ffd700",
  colorSecondary: "#7209b7",
  colorGlow: "#4cc9f0",
  bgStyle: "astral",
  isConsecrated: false
};

export function initSigilForge(containerId = "sigil-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  renderSigilForgeUI(container);
}

export function renderSigilForgeUI(container) {
  const consonants = extractConsonants(SIGIL_STATE.userName, SIGIL_STATE.dragonName);
  const resonance = Math.min(99, 84 + consonants.length * 2);

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
            
            <div style="background: rgba(233,196,106,0.08); padding: 12px; border-radius: 8px; border-left: 4px solid var(--gold-main); margin-top: 6px; line-height: 1.5;">
              <span style="font-size: 0.9rem; color: var(--gold-main); font-weight: 700; display: block; margin-bottom: 4px;">🔮 Alquimia de tu Sigilo Secreto:</span>
              <p style="font-size: 0.85rem; color: var(--text-main); margin: 0;">
                Combinamos tu Nombre y el de tu Dragón. Eliminamos las vocales y letras repetidas para obtener la matriz sagrada de consonantes.
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
            </div>
          </div>

          <!-- Paso 3: Características del Dragón -->
          <div style="background: rgba(0,0,0,0.3); padding: 1.2rem; border-radius: 14px; border: 1px solid var(--border-panel);">
            <h3 style="color: var(--gold-main); margin: 0 0 10px 0; font-size: 1.3rem;">🐉 Paso 3: Poder y Paleta Mágica</h3>

            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div>
                <label style="display: block; color: var(--text-muted); font-size: 0.88rem; font-weight: 700; margin-bottom: 4px;">Anatomía / Forma Base:</label>
                <select id="sigil-body-type" style="width: 100%; padding: 8px; background: rgba(0,0,0,0.6); border: 1px solid var(--border-panel); border-radius: 8px; color: var(--text-main);">
                  <option value="draco" ${SIGIL_STATE.bodyType === "draco" ? "selected" : ""}>🛡️ Draco Clásico (Marco de Escudo Invertido)</option>
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
                <label style="display: block; color: var(--text-muted); font-size: 0.88rem; font-weight: 700; margin-bottom: 4px;">Elemento Mágico (Paleta Automática):</label>
                <select id="sigil-element" style="width: 100%; padding: 8px; background: rgba(0,0,0,0.6); border: 1px solid var(--border-panel); border-radius: 8px; color: var(--text-main);">
                  <option value="Rayo" ${SIGIL_STATE.element === "Rayo" ? "selected" : ""}>⚡ Rayo (Plenos Zig-zag)</option>
                  <option value="Fuego" ${SIGIL_STATE.element === "Fuego" ? "selected" : ""}>🔥 Fuego (3 Triángulos Picudos)</option>
                  <option value="Hielo" ${SIGIL_STATE.element === "Hielo" ? "selected" : ""}>❄️ Hielo (Cristales en Pentáculo)</option>
                  <option value="Veneno" ${SIGIL_STATE.element === "Veneno" ? "selected" : ""}>🧪 Veneno (Onda Suave)</option>
                  <option value="Sombra" ${SIGIL_STATE.element === "Sombra" ? "selected" : ""}>🌑 Sombra (Humo Abisal)</option>
                  <option value="Luz" ${SIGIL_STATE.element === "Luz" ? "selected" : ""}>✨ Luz (Rayos Solares)</option>
                </select>
              </div>

              <!-- Quick Presets -->
              <div style="margin-top: 4px;">
                <label style="display: block; font-size: 0.75rem; color: var(--text-gold); font-weight: 700; margin-bottom: 6px;">🎨 Paletas Temáticas Rápidas:</label>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
                  <button type="button" class="btn btn-secondary btn-sm sigil-preset-btn" data-p="#ffd700" data-s="#2a9d8f" data-g="#e76f51">🌟 Oro Sagrado</button>
                  <button type="button" class="btn btn-secondary btn-sm sigil-preset-btn" data-p="#ffd700" data-s="#e63946" data-g="#ff5722">🔥 Llamarada</button>
                  <button type="button" class="btn btn-secondary btn-sm sigil-preset-btn" data-p="#90e0ef" data-s="#0077b6" data-g="#48cae4">❄️ Escarcha</button>
                  <button type="button" class="btn btn-secondary btn-sm sigil-preset-btn" data-p="#e0aaff" data-s="#3c096c" data-g="#9d4edd">🌑 Noche Abisal</button>
                </div>
              </div>

              <!-- Colors Controls -->
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-top: 6px;">
                <div>
                  <label style="display: block; font-size: 0.75rem; color: var(--text-gold);">Trazos / Marco:</label>
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

          <!-- SUGGESTION 2: DECODIFICADOR DE RUNAS Y RESONANCIA ALQUÍMICA -->
          <div id="sigil-decoder-panel" style="background: rgba(0,0,0,0.3); padding: 1.2rem; border-radius: 14px; border: 1px solid var(--gold-main);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <h3 style="color: var(--gold-main); margin: 0; font-size: 1.2rem;">📜 Decodificador de Runas</h3>
              <span style="background: rgba(233,196,106,0.2); border: 1px solid var(--gold-main); color: var(--gold-main); padding: 3px 10px; border-radius: 12px; font-weight: 700; font-size: 0.85rem;">
                Resonancia: ${resonance}%
              </span>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
              ${consonants.map(c => `
                <div style="background: rgba(255,255,255,0.06); border: 1px solid var(--border-panel); padding: 4px 8px; border-radius: 6px; font-size: 0.82rem;">
                  <strong style="color: var(--gold-main);">${c}:</strong> <span style="color: var(--text-muted);">${RUNAL_MEANINGS[c] || "Poder Secreto"}</span>
                </div>
              `).join("")}
            </div>
          </div>

        </div>

        <!-- COLUMN 2: PASO 4 - DIBUJO VECTORIAL & ESPEJO MÁGICO -->
        <div class="fantasy-panel text-center" style="padding: 1.8rem; display: flex; flex-direction: column; align-items: center; justify-content: space-between; min-height: 580px;">
          
          <div style="width: 100%;">
            <div class="quiz-step-tag" style="margin-bottom: 8px;">✨ Paso 4: Hechizo de Dibujo Vectorial ✨</div>
            <h3 style="color: var(--gold-main); font-size: 1.5rem; margin: 0;">El Espejo de Sigilos</h3>
            <p style="color: var(--text-muted); font-size: 0.92rem; margin-top: 4px;">
              Geometría matemática pura: trazos suaves, infinitos y escalables que nunca se pixelan.
            </p>

            <!-- SUGGESTION 3: FONDOS ASTRALES INTERCAMBIABLES -->
            <div style="display: flex; justify-content: center; gap: 6px; margin-top: 10px;">
              <button type="button" class="btn btn-secondary btn-sm sigil-bg-btn" data-bg="astral" style="font-size: 0.78rem; padding: 3px 8px;">🌌 Astral</button>
              <button type="button" class="btn btn-secondary btn-sm sigil-bg-btn" data-bg="fuego" style="font-size: 0.78rem; padding: 3px 8px;">🔥 Fuego</button>
              <button type="button" class="btn btn-secondary btn-sm sigil-bg-btn" data-bg="escarcha" style="font-size: 0.78rem; padding: 3px 8px;">❄️ Escarcha</button>
              <button type="button" class="btn btn-secondary btn-sm sigil-bg-btn" data-bg="obsidiana" style="font-size: 0.78rem; padding: 3px 8px;">🌑 Obsidiana</button>
            </div>
          </div>

          <!-- SVG Canvas Stage -->
          <div id="sigil-svg-stage" style="width: 100%; max-width: 380px; height: 380px; display: flex; align-items: center; justify-content: center; background: ${BACKGROUND_PRESETS[SIGIL_STATE.bgStyle]}; border: 2px solid var(--gold-main); border-radius: 20px; box-shadow: 0 0 25px rgba(233,196,106,0.25); position: relative; margin: 1rem 0; overflow: hidden; transition: background 0.4s ease;">
            ${renderSigilSVG(SIGIL_STATE, consonants, 360, 360)}
          </div>

          <!-- SUGGESTION 1 & 4: ACTION BUTTONS -->
          <div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <!-- Suggestion 1: Trace Animation -->
              <button class="btn btn-secondary btn-md" id="btn-animate-sigil" style="font-weight: 700; font-size: 0.88rem;">
                ✨ Revelación Vectorial
              </button>
              <!-- Suggestion 4: Consecration Ritual -->
              <button class="btn btn-gold btn-md" id="btn-consecrate-sigil" style="font-weight: 700; font-size: 0.88rem;">
                🔥 Consagrar Sigilo
              </button>
            </div>

            <!-- Download Action -->
            <button class="btn btn-gold btn-lg width-100" id="btn-export-sigil" style="padding: 14px 24px; font-weight: 700; font-size: 1.05rem;">
              🔮 Descargar Sigilo Draconiano HD (PNG)
            </button>
          </div>

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
        updateDecoderPanel(container);
      });
    }
  };

  bindInput("sigil-user-name", "userName");
  bindInput("sigil-dragon-name", "dragonName");
  bindInput("sigil-body-type", "bodyType");
  bindInput("sigil-horn-style", "hornStyle");

  const elemSelect = container.querySelector("#sigil-element");
  if (elemSelect) {
    elemSelect.addEventListener("change", e => {
      const elem = e.target.value;
      SIGIL_STATE.element = elem;
      if (ELEMENTAL_PALETTES[elem]) {
        SIGIL_STATE.colorPrimary = ELEMENTAL_PALETTES[elem].primary;
        SIGIL_STATE.colorSecondary = ELEMENTAL_PALETTES[elem].secondary;
        SIGIL_STATE.colorGlow = ELEMENTAL_PALETTES[elem].glow;
        updateColorPickerInputs(container);
      }
      updateSigilStage(container);
    });
  }

  bindInput("sigil-col-primary", "colorPrimary");
  bindInput("sigil-col-secondary", "colorSecondary");
  bindInput("sigil-col-glow", "colorGlow");

  // Preset Color Buttons
  container.querySelectorAll(".sigil-preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      SIGIL_STATE.colorPrimary = btn.dataset.p;
      SIGIL_STATE.colorSecondary = btn.dataset.s;
      SIGIL_STATE.colorGlow = btn.dataset.g;
      playSound("click");
      updateColorPickerInputs(container);
      updateSigilStage(container);
    });
  });

  // Suggestion 3: Background Preset Buttons
  container.querySelectorAll(".sigil-bg-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const bg = btn.dataset.bg;
      SIGIL_STATE.bgStyle = bg;
      playSound("click");
      const stage = container.querySelector("#sigil-svg-stage");
      if (stage && BACKGROUND_PRESETS[bg]) {
        stage.style.background = BACKGROUND_PRESETS[bg];
      }
    });
  });

  // Suggestion 1: Trace Animation Button
  const btnAnimate = container.querySelector("#btn-animate-sigil");
  if (btnAnimate) {
    btnAnimate.addEventListener("click", () => {
      playSound("chime");
      animateSigilTrace(container);
    });
  }

  // Suggestion 4: Consecration Ritual Button
  const btnConsecrate = container.querySelector("#btn-consecrate-sigil");
  if (btnConsecrate) {
    btnConsecrate.addEventListener("click", () => {
      SIGIL_STATE.isConsecrated = true;
      playSound("roar");
      triggerConsecrationBanner(container);
    });
  }

  const btnExp = container.querySelector("#btn-export-sigil");
  if (btnExp) {
    btnExp.addEventListener("click", () => {
      playSound("roar");
      exportSigilCardPNG();
    });
  }
}

function updateColorPickerInputs(container) {
  const pInput = container.querySelector("#sigil-col-primary");
  const sInput = container.querySelector("#sigil-col-secondary");
  const gInput = container.querySelector("#sigil-col-glow");
  if (pInput) pInput.value = SIGIL_STATE.colorPrimary;
  if (sInput) sInput.value = SIGIL_STATE.colorSecondary;
  if (gInput) gInput.value = SIGIL_STATE.colorGlow;
}

function updateDecoderPanel(container) {
  const panel = container.querySelector("#sigil-decoder-panel");
  if (!panel) return;
  const consonants = extractConsonants(SIGIL_STATE.userName, SIGIL_STATE.dragonName);
  const resonance = Math.min(99, 84 + consonants.length * 2);

  panel.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
      <h3 style="color: var(--gold-main); margin: 0; font-size: 1.2rem;">📜 Decodificador de Runas</h3>
      <span style="background: rgba(233,196,106,0.2); border: 1px solid var(--gold-main); color: var(--gold-main); padding: 3px 10px; border-radius: 12px; font-weight: 700; font-size: 0.85rem;">
        Resonancia: ${resonance}%
      </span>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
      ${consonants.map(c => `
        <div style="background: rgba(255,255,255,0.06); border: 1px solid var(--border-panel); padding: 4px 8px; border-radius: 6px; font-size: 0.82rem;">
          <strong style="color: var(--gold-main);">${c}:</strong> <span style="color: var(--text-muted);">${RUNAL_MEANINGS[c] || "Poder Secreto"}</span>
        </div>
      `).join("")}
    </div>
  `;
}

export function updateSigilStage(container) {
  const stage = container.querySelector("#sigil-svg-stage");
  const consonants = extractConsonants(SIGIL_STATE.userName, SIGIL_STATE.dragonName);
  
  if (stage) {
    stage.innerHTML = renderSigilSVG(SIGIL_STATE, consonants, 360, 360);
  }
}

export function animateSigilTrace(container) {
  const stage = container.querySelector("#sigil-svg-stage");
  if (!stage) return;

  const svg = stage.querySelector("svg");
  if (!svg) return;

  const paths = svg.querySelectorAll("path, polygon, circle, line");
  paths.forEach(p => {
    p.style.transition = "none";
    p.style.strokeDasharray = "1000";
    p.style.strokeDashoffset = "1000";
    p.getBoundingClientRect(); // Force reflow
    p.style.transition = "stroke-dashoffset 2.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease";
    p.style.strokeDashoffset = "0";
  });
}

export function triggerConsecrationBanner(container) {
  const stage = container.querySelector("#sigil-svg-stage");
  if (!stage) return;

  // Flash Golden Glow Filter
  stage.style.boxShadow = "0 0 50px rgba(255,215,0,0.8)";
  setTimeout(() => {
    stage.style.boxShadow = "0 0 25px rgba(233,196,106,0.25)";
  }, 1500);

  // Show Alert Banner
  let banner = container.querySelector("#consecration-alert");
  if (!banner) {
    banner = document.createElement("div");
    banner.id = "consecration-alert";
    banner.style.cssText = "background: linear-gradient(135deg, rgba(255,215,0,0.2), rgba(230,57,70,0.2)); border: 2px solid var(--gold-main); border-radius: 12px; padding: 14px; margin-top: 1rem; text-align: center; color: var(--gold-main); font-weight: 700; font-size: 0.98rem; animation: fadeIn 0.5s ease;";
    stage.parentNode.insertBefore(banner, stage.nextSibling);
  }
  banner.innerHTML = `📜 ¡SIGILO CONSAGRADO OFICIALMENTE!<br><span style="font-size:0.85rem; color:#ffffff; font-weight:normal;">Tu pacto sagrado con <strong>${SIGIL_STATE.dragonName}</strong> ha sido sellado en la matriz alquímica.</span>`;
}

export function exportSigilCardPNG() {
  const consonants = extractConsonants(SIGIL_STATE.userName, SIGIL_STATE.dragonName);
  
  const canvas = document.createElement("canvas");
  canvas.width = 650;
  canvas.height = 940;
  const ctx = canvas.getContext("2d");

  // 1. Rich Dark Radial Gradient Background
  const grad = ctx.createRadialGradient(325, 470, 50, 325, 470, 540);
  grad.addColorStop(0, "#1f1836");
  grad.addColorStop(0.6, "#100b1e");
  grad.addColorStop(1, "#07040d");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 650, 940);

  // 2. Metallic Golden Card Outer & Inner Borders
  ctx.strokeStyle = "#ffd700";
  ctx.lineWidth = 8;
  ctx.strokeRect(18, 18, 614, 904);

  ctx.strokeStyle = "#e9c46a";
  ctx.lineWidth = 2;
  ctx.strokeRect(28, 28, 594, 884);

  // 3. Corner Filigree Diamonds (◆)
  ctx.fillStyle = "#ffd700";
  ctx.font = "bold 20px serif";
  ctx.textAlign = "center";
  ctx.fillText("◆", 38, 45);
  ctx.fillText("◆", 612, 45);
  ctx.fillText("◆", 38, 905);
  ctx.fillText("◆", 612, 905);

  // 4. Header Badge & Title
  ctx.fillStyle = "#e9c46a";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText("✨ EMBLEMA DE ALQUIMIA DRACONIANA • EDICIÓN OFICIAL ✨", 325, 66);

  ctx.fillStyle = "#ffd700";
  ctx.font = "bold 28px serif";
  ctx.fillText("SIGILO SAGRADO DRACONIANO", 325, 100);

  ctx.fillStyle = "#ffffff";
  ctx.font = "italic 17px serif";
  ctx.fillText(`Pacto Sagrado entre "${SIGIL_STATE.userName}" y "${SIGIL_STATE.dragonName}"`, 325, 128);

  // 5. Render High-Res SVG onto Canvas
  const svgData = renderSigilSVG(SIGIL_STATE, consonants, 460, 460);
  const img = new Image();
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  img.onload = () => {
    // Draw Sigil Medallion Plate
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.beginPath();
    ctx.arc(325, 385, 215, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 215, 0, 0.4)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw SVG Sigil
    ctx.drawImage(img, 95, 155, 460, 460);

    // 6. Metadata Footer Box (Ajuste Perfecto sin Desbordamiento)
    ctx.fillStyle = "rgba(10, 14, 23, 0.88)";
    ctx.fillRect(38, 630, 574, 242);
    ctx.strokeStyle = SIGIL_STATE.isConsecrated ? "#ffd700" : "rgba(233,196,106,0.6)";
    ctx.lineWidth = 2;
    ctx.strokeRect(38, 630, 574, 242);

    // Line 1: Consonantes
    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 20px serif";
    ctx.fillText(`MATRIZ SAGRADA: ${consonants.join(" • ")}`, 325, 668);

    // Line 2: Elemento y Anatomía en Español
    const bodyLabel = BODY_LABELS_ES[SIGIL_STATE.bodyType] || "Draco Clásico";
    const hornLabel = HORN_LABELS_ES[SIGIL_STATE.hornStyle] || "Cuernos Clásicos";
    ctx.fillStyle = "#ffffff";
    ctx.font = "15px sans-serif";
    ctx.fillText(`Elemento: ${SIGIL_STATE.element}  |  Anatomía: ${bodyLabel}`, 325, 705);

    // Line 3: Cuernos y Resonancia
    ctx.fillStyle = "#4cc9f0";
    ctx.font = "15px sans-serif";
    ctx.fillText(`Cuernos: ${hornLabel}  |  Resonancia: ${Math.min(99, 84 + consonants.length * 2)}%`, 325, 740);

    // Line 4: Sello / Registro Oficial (Sin desbordar)
    ctx.fillStyle = SIGIL_STATE.isConsecrated ? "#ffd700" : "#2a9d8f";
    ctx.font = "bold 14px sans-serif";
    ctx.fillText("📜 REGISTRADO EN EL SANTUARIO SECRETO DE DRAGONES", 325, 782);

    // Line 5: Estado de Consagración
    ctx.fillStyle = SIGIL_STATE.isConsecrated ? "#ffb703" : "#e9c46a";
    ctx.font = "italic 13px sans-serif";
    const subSeal = SIGIL_STATE.isConsecrated
      ? "🔥 Consagrado con Aliento de Dragón"
      : "Emblema Vectorial Oficial";
    ctx.fillText(subSeal, 325, 814);

    // Download PNG
    const link = document.createElement("a");
    link.download = `Sigilo_Draconiano_${SIGIL_STATE.userName}_${SIGIL_STATE.dragonName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    URL.revokeObjectURL(url);
  };

  img.src = url;
}
