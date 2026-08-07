// Interactive Dragon Creator ("La Forja de Dragones")
// Real-time canvas/SVG preview, customized stats, and card image export

import { playSound } from "./audio.js?v=6.1.0";

const CREATOR_STATE = {
  bodyType: "draco",
  colorPrimary: "#ff5722",
  colorSecondary: "#ffd700",
  hornStyle: "horns-ram",
  wingType: "wings-bat",
  breathType: "fire",
  eyeColor: "#00e5ff",
  dragonName: "Dracofuego",
  dragonTitle: "El Asolador de las Cumbres",
  element: "Fuego"
};

const RANDOM_NAMES = [
  "Ignis", "Astraea", "Vesper", "Obsidian", "Kaelen", "Valeria", "Drakon", "Pyros", "Boreal", "Nox", "Zephyr", "Solaria", "Vortex", "Titan", "Ember", "Frostwing"
];

const RANDOM_TITLES = [
  "El Asolador de las Cumbres", "La Sombra del Infinito", "Guardián de los Vientos", "El Señor del Trueno", "La Llama Eterna", "El Caminante de las Estrellas", "Destructor de Sombras", "El Terror del Mar"
];

export function initDragonCreator(containerId = "creator-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  renderCreatorUI(container);
  updateCreatorPreview();
}

function renderCreatorUI(container) {
  container.innerHTML = `
    <div class="creator-grid">
      <!-- Left Panel: Live Preview Canvas -->
      <div class="creator-preview-card fantasy-panel">
        <h3 class="panel-title">🐉 Forja Viva de Dragones</h3>
        <div class="preview-stage" id="creator-preview-stage">
          <!-- Live SVG injected here -->
        </div>

        <div class="dragon-naming-box">
          <label for="creator-name-input">Nombre de tu Dragón:</label>
          <div class="input-with-button">
            <input type="text" id="creator-name-input" value="${CREATOR_STATE.dragonName}" maxlength="20" placeholder="Ej: Furia de Sol" />
            <button class="btn btn-secondary btn-sm" id="btn-random-name">🎲 Aleatorio</button>
          </div>

          <label for="creator-title-input">Título Legendario:</label>
          <input type="text" id="creator-title-input" value="${CREATOR_STATE.dragonTitle}" maxlength="35" placeholder="Ej: El Guardián del Viento" />
        </div>

        <div class="creator-actions">
          <button class="btn btn-gold btn-lg" id="btn-export-card">📜 Descargar Tarjeta Draconiana</button>
        </div>
      </div>

      <!-- Right Panel: Customization Options -->
      <div class="creator-controls-card fantasy-panel">
        <h3 class="panel-title">⚒️ Opciones de Personalización</h3>

        <!-- 1. Anatomía -->
        <div class="control-group">
          <label class="control-label">1. Anatomía y Cuerpo:</label>
          <div class="option-chips" id="body-chips">
            <button class="chip active" data-param="bodyType" data-val="draco">🐉 Draco Clásico</button>
            <button class="chip" data-param="bodyType" data-val="wyvern">🦅 Wyvern Ágil</button>
            <button class="chip" data-param="bodyType" data-val="shen">🐍 Shen Serpentino</button>
            <button class="chip" data-param="bodyType" data-val="hidra">🐍 Multi-Cabezas</button>
            <button class="chip" data-param="bodyType" data-val="ampithere">🪶 Alado Plumado</button>
          </div>
        </div>

        <!-- 2. Colores de Escamas -->
        <div class="control-group">
          <label class="control-label">2. Color de Escamas (Principal y Borde):</label>
          <div class="color-picker-row">
            <label>Principal:
              <input type="color" id="picker-primary" value="${CREATOR_STATE.colorPrimary}" />
            </label>
            <label>Secundario / Brillo:
              <input type="color" id="picker-secondary" value="${CREATOR_STATE.colorSecondary}" />
            </label>
            <label>Ojos & Aura:
              <input type="color" id="picker-eye" value="${CREATOR_STATE.eyeColor}" />
            </label>
          </div>
        </div>

        <!-- 3. Aliento / Elemento -->
        <div class="control-group">
          <label class="control-label">3. Tipo de Aliento / Ataque:</label>
          <div class="option-chips" id="breath-chips">
            <button class="chip active" data-param="breathType" data-val="fire" data-elem="Fuego">🔥 Fuego Voraz</button>
            <button class="chip" data-param="breathType" data-val="ice" data-elem="Hielo">❄️ Aliento Helado</button>
            <button class="chip" data-param="breathType" data-val="lightning" data-elem="Rayo">⚡ Rayo Cósmico</button>
            <button class="chip" data-param="breathType" data-val="poison" data-elem="Veneno">🧪 Esporas Ácidas</button>
            <button class="chip" data-param="breathType" data-val="shadow" data-elem="Sombra">🌌 Sombras Abisales</button>
            <button class="chip" data-param="breathType" data-val="light" data-elem="Luz">✨ Magia Estelar</button>
          </div>
        </div>

        <!-- 4. Cuernos y Cresta -->
        <div class="control-group">
          <label class="control-label">4. Estilo de Cuernos:</label>
          <div class="option-chips" id="horn-chips">
            <button class="chip active" data-param="hornStyle" data-val="horns-ram">🐐 Cuernos de Carnero</button>
            <button class="chip" data-param="hornStyle" data-val="horns-spikes">🌋 Espinas Dorsales</button>
            <button class="chip" data-param="hornStyle" data-val="horns-crown">👑 Tiara de Cristales</button>
            <button class="chip" data-param="hornStyle" data-val="horns-whiskers">🐉 Bigotes Místicos</button>
          </div>
        </div>

      </div>
    </div>
  `;

  attachCreatorEvents(container);
}

function attachCreatorEvents(container) {
  // Option Chips
  container.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", (e) => {
      const parent = chip.parentElement;
      parent.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");

      const param = chip.dataset.param;
      const val = chip.dataset.val;
      if (param && val) {
        CREATOR_STATE[param] = val;
        if (chip.dataset.elem) {
          CREATOR_STATE.element = chip.dataset.elem;
        }
        playSound("click");
        updateCreatorPreview();
      }
    });
  });

  // Color Inputs
  const pPrimary = container.querySelector("#picker-primary");
  const pSecondary = container.querySelector("#picker-secondary");
  const pEye = container.querySelector("#picker-eye");

  if (pPrimary) pPrimary.addEventListener("input", (e) => { CREATOR_STATE.colorPrimary = e.target.value; updateCreatorPreview(); });
  if (pSecondary) pSecondary.addEventListener("input", (e) => { CREATOR_STATE.colorSecondary = e.target.value; updateCreatorPreview(); });
  if (pEye) pEye.addEventListener("input", (e) => { CREATOR_STATE.eyeColor = e.target.value; updateCreatorPreview(); });

  // Name & Title Inputs
  const nameInput = container.querySelector("#creator-name-input");
  const titleInput = container.querySelector("#creator-title-input");

  if (nameInput) nameInput.addEventListener("input", (e) => { CREATOR_STATE.dragonName = e.target.value || "Mi Dragón"; updateCreatorPreviewText(); });
  if (titleInput) titleInput.addEventListener("input", (e) => { CREATOR_STATE.dragonTitle = e.target.value || "El Legendario"; updateCreatorPreviewText(); });

  // Random Name Button
  const btnRandom = container.querySelector("#btn-random-name");
  if (btnRandom) {
    btnRandom.addEventListener("click", () => {
      const rName = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
      const rTitle = RANDOM_TITLES[Math.floor(Math.random() * RANDOM_TITLES.length)];
      CREATOR_STATE.dragonName = rName;
      CREATOR_STATE.dragonTitle = rTitle;
      if (nameInput) nameInput.value = rName;
      if (titleInput) titleInput.value = rTitle;
      playSound("chime");
      updateCreatorPreviewText();
    });
  }

  // Export Card Button
  const btnExport = container.querySelector("#btn-export-card");
  if (btnExport) {
    btnExport.addEventListener("click", () => {
      playSound("forge");
      exportDragonCard();
    });
  }
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

  const mockDragon = {
    id: "creator",
    svgType: CREATOR_STATE.bodyType,
    colorPrimary: CREATOR_STATE.colorPrimary,
    colorSecondary: CREATOR_STATE.colorSecondary,
    glowColor: CREATOR_STATE.eyeColor,
    element: CREATOR_STATE.element
  };

  stage.innerHTML = `
    <div class="creator-preview-frame">
      <div class="creator-svg-wrap">
        ${renderCreatorCustomSVG(mockDragon)}
      </div>
      <div class="creator-card-badge">
        <h4 id="creator-preview-name">${CREATOR_STATE.dragonName}</h4>
        <p id="creator-preview-title">${CREATOR_STATE.dragonTitle}</p>
        <span class="element-tag">${getElementIcon(CREATOR_STATE.element)} ${CREATOR_STATE.element}</span>
      </div>
    </div>
  `;
}

function renderCreatorCustomSVG(dragon) {
  const { svgType, colorPrimary, colorSecondary, glowColor, element } = dragon;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 260" width="100%" height="100%">
      <defs>
        <linearGradient id="creatorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${colorPrimary}" />
          <stop offset="50%" stop-color="${colorSecondary}" />
          <stop offset="100%" stop-color="${colorPrimary}" />
        </linearGradient>
        <filter id="creatorGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Background Crest -->
      <circle cx="170" cy="130" r="110" fill="#13101d" stroke="${colorSecondary}" stroke-width="3" />
      <circle cx="170" cy="130" r="98" fill="none" stroke="${glowColor}" stroke-width="1.5" stroke-dasharray="8,6" opacity="0.6" />

      <!-- Dragon Body Base -->
      <path d="M 100 190 Q 170 230 240 190 Q 230 130 170 110 Q 110 130 100 190 Z" fill="url(#creatorGrad)" stroke="${colorSecondary}" stroke-width="3" filter="url(#creatorGlow)" />
      
      <!-- Wings -->
      <path d="M 140 120 Q 60 20 10 70 Q 70 120 130 140 Z" fill="${colorPrimary}" opacity="0.8" stroke="${colorSecondary}" stroke-width="2" />
      <path d="M 200 120 Q 280 20 330 70 Q 270 120 210 140 Z" fill="${colorPrimary}" opacity="0.8" stroke="${colorSecondary}" stroke-width="2" />

      <!-- Neck & Head -->
      <path d="M 145 125 Q 140 50 185 45 Q 220 70 185 105 Z" fill="url(#creatorGrad)" stroke="${colorSecondary}" stroke-width="2.5" />

      <!-- Horns Choice -->
      <path d="M 168 45 L 140 10 L 175 38 L 195 5 L 182 42" stroke="${colorSecondary}" stroke-width="4" fill="none" stroke-linecap="round" />

      <!-- Eye -->
      <circle cx="190" cy="58" r="6" fill="${glowColor}" filter="url(#creatorGlow)" />
      <circle cx="191" cy="57" r="2" fill="#ffffff" />

      <!-- Breath Attack -->
      <path d="M 205 65 Q 260 55 310 45 Q 275 90 205 78 Z" fill="${glowColor}" opacity="0.9" filter="url(#creatorGlow)" />
    </svg>
  `;
}

function getElementIcon(elem) {
  switch (elem) {
    case "Fuego": return "🔥";
    case "Hielo": return "❄️";
    case "Rayo": return "⚡";
    case "Veneno": return "🧪";
    case "Sombra": return "🌌";
    case "Luz": return "✨";
    default: return "🐉";
  }
}

function exportDragonCard() {
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 800;
  const ctx = canvas.getContext("2d");

  // Draw Card Background
  ctx.fillStyle = "#0c0b14";
  ctx.fillRect(0, 0, 600, 800);

  // Border Gold
  ctx.strokeStyle = "#ffd700";
  ctx.lineWidth = 12;
  ctx.strokeRect(20, 20, 560, 760);

  ctx.strokeStyle = CREATOR_STATE.colorSecondary;
  ctx.lineWidth = 4;
  ctx.strokeRect(32, 32, 536, 736);

  // Title Text
  ctx.fillStyle = "#ffd700";
  ctx.font = "bold 32px 'Cinzel', serif";
  ctx.textAlign = "center";
  ctx.fillText("SANTUARIO DE DRAGONES", 300, 80);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 38px 'Outfit', sans-serif";
  ctx.fillText(CREATOR_STATE.dragonName, 300, 140);

  ctx.fillStyle = "#cccccc";
  ctx.font = "italic 22px 'Outfit', sans-serif";
  ctx.fillText(`"${CREATOR_STATE.dragonTitle}"`, 300, 180);

  // Element Tag
  ctx.fillStyle = "#1e1b2e";
  ctx.fillRect(200, 210, 200, 45);
  ctx.strokeStyle = "#ffd700";
  ctx.strokeRect(200, 210, 200, 45);

  ctx.fillStyle = "#ffd700";
  ctx.font = "bold 22px 'Outfit', sans-serif";
  ctx.fillText(`Elemento: ${CREATOR_STATE.element}`, 300, 240);

  // Drawing Badge Info
  ctx.fillStyle = "#141220";
  ctx.fillRect(50, 280, 500, 400);
  ctx.strokeStyle = CREATOR_STATE.colorPrimary;
  ctx.lineWidth = 3;
  ctx.strokeRect(50, 280, 500, 400);

  // Draw Dragon Representation Symbol
  ctx.fillStyle = CREATOR_STATE.colorSecondary;
  ctx.font = "120px sans-serif";
  ctx.fillText("🐉", 300, 510);

  // Footer Certificate Text
  ctx.fillStyle = "#ffd700";
  ctx.font = "bold 20px 'Cinzel', serif";
  ctx.fillText("CERTIFICADO OFICIAL DE GUARDIÁN LEYENDA", 300, 730);

  // Trigger Image Download
  const link = document.createElement("a");
  link.download = `Dragon_${CREATOR_STATE.dragonName.replace(/\s+/g, "_")}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
