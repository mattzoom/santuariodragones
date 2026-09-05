// Arena de Dragones - Modos:
// 1. Duelo Rápido 1 vs 1
// 2. El Torneo del Santuario (Modo Copa / Roguelite)
// 3. Batalla de Escuadrones 5 vs 5 (Guerra de Clanes)

import { DRAGONS_DATA } from "../data/dragons.js?v=6.1.0";
import { playSound } from "../utils/audio.js?v=6.1.0";
import { getDragonArtworkSrc } from "../svg/dragonSvg.js?v=6.1.0";

// Estado global de la Arena
let currentMode = "duel"; // "duel" | "tournament" | "squad"

// ==========================================
// ESTADO: MODO DUELO 1 VS 1
// ==========================================
let dragonA = null;
let dragonB = null;
let isBattling = false;
let battleInterval = null;
let duelWinner = null; // { winner, loser }

// ==========================================
// ESTADO: MODO TORNEO ROGUELITE
// ==========================================
let playerDragon = null;
let tournamentStage = 0; // 0 = selección, 1 = Cuartos, 2 = Semis, 3 = Final, 5 = Campeón, -1 = Derrota
let playerHp = 130;
let playerMaxHp = 130;
let playerAttackBonus = 0;
let playerDefenseBonus = 0;
let playerRelics = [];
let currentOpponent = null;
let opponentHp = 100;
let opponentMaxHp = 100;
let tournamentOpponents = [];
let isTournamentBattling = false;
let tournamentInterval = null;
let firstTournamentStrikeUsed = false;

// ==========================================
// ESTADO: MODO ESCUADRONES 5 VS 5
// ==========================================
let squadNameA = "Legión Dracónica";
let squadNameB = "Horda Ancestral";
let squadA = []; // 5 dragones
let squadB = []; // 5 dragones
let squadHpA = []; // [hp1, hp2, hp3, hp4, hp5]
let squadHpB = []; // [hp1, hp2, hp3, hp4, hp5]
let activeIndexA = 0; // 0 a 4
let activeIndexB = 0; // 0 a 4
let isSquadBattling = false;
let squadInterval = null;
let squadBattleEnded = false;
let squadWinnerTeam = null; // "A" | "B"

// ==========================================
// ESTADO: MODAL DE BÚSQUEDA RÁPIDA DE DRAGONES
// ==========================================
let activePickerContext = null; // { type: "duel", key: "A" } | { type: "tourney" } | { type: "squad", team: "A", index: 0 }
let pickerSearchQuery = "";
let pickerElementFilter = "Todos";

// Rueda de Ventajas Elementales
const ELEMENTAL_ADVANTAGE = {
  "Fuego": ["Hielo", "Naturaleza"],
  "Magma": ["Hielo", "Naturaleza", "Tierra"],
  "Agua": ["Fuego", "Magma", "Tierra"],
  "Hielo": ["Agua", "Naturaleza", "Viento"],
  "Tierra": ["Rayo", "Tormenta", "Fuego"],
  "Cristal": ["Rayo", "Luz", "Sombra"],
  "Rayo": ["Agua", "Viento"],
  "Tormenta": ["Agua", "Veneno", "Viento"],
  "Viento": ["Veneno", "Tierra"],
  "Naturaleza": ["Tierra", "Agua"],
  "Luz": ["Sombra", "Veneno"],
  "Sombra": ["Luz", "Naturaleza"],
  "Veneno": ["Naturaleza", "Luz"]
};

// Reliquias Ancestrales (Mejoras Roguelite)
const BLESSINGS_POOL = [
  { id: "ruby", name: "Rubí del Corazón de Dragón", icon: "❤️‍🔥", desc: "+35 de Salud Máxima y cura 50 HP", apply: () => { playerMaxHp += 35; playerHp = Math.min(playerMaxHp, playerHp + 50); } },
  { id: "claw", name: "Garra de Titanita Ígnea", icon: "🗡️", desc: "+6 de Daño Físico y Mágico permanente", apply: () => { playerAttackBonus += 6; } },
  { id: "scale", name: "Escama de Diamante Astral", icon: "🛡️", desc: "-4 de Daño recibido en cada golpe enemigo", apply: () => { playerDefenseBonus += 4; } },
  { id: "breath", name: "Elixir del Aliento Infinito", icon: "🧪", desc: "Aumenta la probabilidad de Golpe Crítico", apply: () => { playerRelics.push("crit_boost"); } },
  { id: "fountain", name: "Fuente de Rocío Draconiano", icon: "💧", desc: "Restaura el 100% de la Salud actual", apply: () => { playerHp = playerMaxHp; } }
];

export function initColiseoModule(containerId = "arena-container") {
  const container = document.getElementById("arena-container") || document.getElementById(containerId);
  if (!container) return;

  if (!dragonA) dragonA = DRAGONS_DATA.find(d => d.id === 2) || DRAGONS_DATA[0];
  if (!dragonB) pickRandomRival();
  if (!playerDragon) playerDragon = DRAGONS_DATA.find(d => d.id === 1) || DRAGONS_DATA[0];

  initDefaultSquads();

  renderArenaContainer(container);
}

function initDefaultSquads() {
  if (squadA.length === 5 && squadB.length === 5) return;

  squadA = [
    DRAGONS_DATA[0], // #1 Furia Nocturna
    DRAGONS_DATA[1], // #2 Fafnir
    DRAGONS_DATA[2], // #3 Quetzalcóatl
    DRAGONS_DATA[3], // #4 Leviatán
    DRAGONS_DATA[4]  // #5 Wyvern de Fuego
  ];
  squadHpA = [100, 100, 100, 100, 100];

  const pool = DRAGONS_DATA.slice(5);
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  squadB = shuffled.slice(0, 5);
  squadHpB = [100, 100, 100, 100, 100];

  activeIndexA = 0;
  activeIndexB = 0;
  isSquadBattling = false;
  squadBattleEnded = false;
}

function pickRandomRival() {
  const otherDragons = DRAGONS_DATA.filter(d => !dragonA || d.id !== dragonA.id);
  const randomIndex = Math.floor(Math.random() * otherDragons.length);
  dragonB = otherDragons[randomIndex] || DRAGONS_DATA[1];
}

// Switch entre Modos
window.switchArenaMode = function(mode) {
  if (isBattling || isTournamentBattling || isSquadBattling) return;
  currentMode = mode;
  playSound("click");
  const container = document.getElementById("arena-container") || document.getElementById("coliseo-container");
  if (container) renderArenaContainer(container);
};

function renderArenaContainer(container) {
  container.innerHTML = `
    <div style="max-width: 1100px; margin: 0 auto;">
      
      <!-- SELECTOR DE MODO DE JUEGO (TABS DE LA ARENA) -->
      <div style="display: flex; justify-content: center; gap: 10px; margin-bottom: 1.5rem; flex-wrap: wrap;">
        <button type="button" class="btn ${currentMode === 'duel' ? 'btn-gold' : 'btn-secondary'}" onclick="switchArenaMode('duel')" style="padding: 9px 20px; font-weight: 700; font-size: 0.95rem; border-radius: 20px;">
          ⚔️ Duelo 1 vs 1
        </button>
        <button type="button" class="btn ${currentMode === 'tournament' ? 'btn-gold' : 'btn-secondary'}" onclick="switchArenaMode('tournament')" style="padding: 9px 20px; font-weight: 700; font-size: 0.95rem; border-radius: 20px;">
          🏆 El Torneo (Modo Copa)
        </button>
        <button type="button" class="btn ${currentMode === 'squad' ? 'btn-gold' : 'btn-secondary'}" onclick="switchArenaMode('squad')" style="padding: 9px 20px; font-weight: 700; font-size: 0.95rem; border-radius: 20px;">
          🛡️ Batalla 5 vs 5 (Escuadrones)
        </button>
      </div>

      <!-- CONTENIDO DEL MODO ACTIVO -->
      <div id="arena-mode-content">
        ${currentMode === 'duel' ? renderDuelViewHtml() : (currentMode === 'tournament' ? renderTournamentViewHtml() : renderSquadViewHtml())}
      </div>

      <!-- MODAL DE BÚSQUEDA RÁPIDA DE DRAGONES -->
      <div id="arena-picker-modal-root"></div>

    </div>
  `;
}

/* ==========================================================================
   1. MODO DUELO RÁPIDO 1 VS 1
   ========================================================================== */

function renderDuelViewHtml() {
  if (duelWinner) {
    const { winner, loser } = duelWinner;
    return `
      <!-- PANTALLA DE VICTORIA DUELO 1 VS 1 CON COPA -->
      <div class="fantasy-panel text-center" style="padding: 2.5rem 1.5rem; border: 3px solid var(--gold-main); border-radius: 20px; background: radial-gradient(circle, rgba(233,196,106,0.22) 0%, rgba(15,23,42,0.96) 100%); margin-bottom: 2rem; box-shadow: 0 10px 40px rgba(233,196,106,0.25);">
        <div style="font-size: 3.5rem; margin-bottom: 6px; animation: pulse 1.5s infinite;">👑🏆✨</div>
        <h2 style="color: var(--gold-main); font-size: 2.2rem; font-family: var(--font-heading); margin: 0 0 10px 0;">¡CAMPEÓN DEL DUELO SINGULAR!</h2>
        <p style="color: #80ed99; font-size: 1.25rem; font-weight: 700; margin-bottom: 1.8rem;">
          ¡<strong>${winner.name}</strong> ha triunfado en la arena ante <strong>${loser.name}</strong> y alza la Copa Legendaria!
        </p>

        <!-- ILUSTRACIÓN DE LA COPA Y DRAGÓN GANADOR -->
        <div style="display: flex; justify-content: center; align-items: center; gap: 2rem; flex-wrap: wrap; margin-bottom: 2rem;">
          <div style="width: 100%; max-width: 440px; border-radius: 16px; overflow: hidden; border: 3px solid var(--gold-main); box-shadow: 0 8px 30px rgba(233,196,106,0.45); background: #0a0911;">
            <img src="/assets/ui/trophy_champion.webp" alt="Copa de Campeón de la Arena" style="width: 100%; height: auto; display: block;" />
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
            <div style="width: 150px; height: 150px; border-radius: 50%; overflow: hidden; border: 3px solid var(--gold-main); box-shadow: 0 0 25px rgba(233,196,106,0.6);">
              <img src="${getDragonArtworkSrc(winner)}" alt="${winner.name}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <span style="color: var(--gold-main); font-weight: 800; font-size: 1.3rem;">${winner.name}</span>
            <span style="color: var(--color-teal); font-style: italic; font-size: 0.95rem;">"${winner.title}"</span>
            <div style="display: flex; gap: 6px; flex-wrap: wrap; justify-content: center;">
              <span class="badge badge-element badge-${winner.element.toLowerCase()}">${winner.element}</span>
              <span class="badge badge-type">${winner.type}</span>
              <span class="badge badge-danger">🔥 Peligro ${winner.danger}/5</span>
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
          <button type="button" class="btn btn-gold btn-lg" onclick="resetDragonDuel()" style="padding: 14px 34px; font-weight: 800; font-size: 1.15rem; box-shadow: 0 6px 20px rgba(233,196,106,0.4);">
            ⚔️ Disputar Otro Duelo
          </button>
        </div>
      </div>
    `;
  }

  return `
    <!-- HERO BANNER ARENA DUELO -->
    <div class="fantasy-panel text-center margin-bottom-lg" style="padding: 1.8rem; background: linear-gradient(135deg, rgba(230,57,70,0.18), rgba(233,196,106,0.12)); border: 2px solid #e63946; border-radius: 20px;">
      <div style="font-size: 2.5rem; margin-bottom: 4px;">⚔️🔥</div>
      <h2 style="color: var(--gold-main); font-size: 1.9rem; margin: 0; font-family: var(--font-heading);">La Arena Ancestral: Duelo 1 vs 1</h2>
      <p style="color: var(--text-main); font-size: 1rem; max-width: 700px; margin: 6px auto 0 auto; line-height: 1.5;">
        ¡Elegí a dos titanes del Santuario y presenciá un combate legendario por turnos con ventajas elementales y cálculo de daño épico!
      </p>
    </div>

    <!-- ARENA DE COMBATE (LADO A VS LADO B) -->
    <div class="arena-grid">
      
      <!-- FICHA LUCHADOR 1 (IZQUIERDA) -->
      <div id="fighter-card-A" class="fantasy-panel fighter-card fighter-card-a">
        <div>
          <div class="fighter-card-header">
            <span class="fighter-title fighter-title-a">🐲 Campeón 1</span>
            <button type="button" class="btn btn-secondary btn-sm" onclick="randomizeFighter('A')" ${isBattling ? "disabled" : ""}>🎲 Al Azar</button>
          </div>

          <!-- BOTÓN SELECTOR RÁPIDO CON BÚSQUEDA -->
          <div style="margin-bottom: 12px;">
            <button type="button" class="arena-picker-btn" onclick="openDragonPicker('duel_A')" ${isBattling ? "disabled" : ""}>
              <span>🔍 ${dragonA ? dragonA.name + ' (' + dragonA.element + ')' : 'Elegir Dragón'}</span>
              <span style="color: var(--gold-main); font-size: 0.8rem;">Buscar ▾</span>
            </button>
          </div>

          <div class="fighter-img-box">
            <img id="img-fighter-A" src="${getDragonArtworkSrc(dragonA)}" alt="${dragonA.name}" />
          </div>

          <h3 class="fighter-name">${dragonA.name}</h3>
          <p class="fighter-subtitle">${dragonA.title}</p>

          <div class="fighter-badges">
            <span class="badge badge-element badge-${dragonA.element.toLowerCase()}">${dragonA.element}</span>
            <span class="badge badge-type">${dragonA.type}</span>
            <span class="badge badge-danger">🔥 Peligro ${dragonA.danger}/5</span>
          </div>

          <p class="fighter-stat-text">
            <strong style="color: var(--gold-main);">Habilidad:</strong> ${dragonA.ability}
          </p>
          <p class="fighter-stat-text">
            <strong style="color: #ff6b6b);">Debilidad:</strong> ${dragonA.weakness}
          </p>
        </div>

        <!-- BARRA DE VIDA LUCHADOR 1 -->
        <div class="fighter-hp-wrap">
          <div class="fighter-hp-info">
            <span style="color: var(--color-teal);">Puntos de Salud (HP)</span>
            <span id="hp-text-A" style="color: var(--color-teal);">100 / 100</span>
          </div>
          <div class="fighter-hp-track" style="border-color: var(--color-teal);">
            <div id="hp-bar-A" class="fighter-hp-fill-a"></div>
          </div>
        </div>
      </div>

      <!-- CENTRO: VERSUS & ACCIÓN -->
      <div class="arena-vs-panel">
        <div class="arena-vs-badge">VS</div>
        
        <button id="btn-start-duel" type="button" class="btn btn-gold btn-lg arena-btn-fight" onclick="startDragonDuel()" ${isBattling ? "disabled" : ""}>
          ⚔️ ¡COMBATIR!
        </button>
        
        <button id="btn-reset-duel" type="button" class="btn btn-secondary btn-sm margin-top-sm" onclick="resetDragonDuel()" style="display: none;">
          🔄 Nuevo Combate
        </button>
      </div>

      <!-- FICHA LUCHADOR 2 (DERECHA) -->
      <div id="fighter-card-B" class="fantasy-panel fighter-card fighter-card-b">
        <div>
          <div class="fighter-card-header">
            <span class="fighter-title fighter-title-b">🐲 Campeón 2</span>
            <button type="button" class="btn btn-secondary btn-sm" onclick="randomizeFighter('B')" ${isBattling ? "disabled" : ""}>🎲 Al Azar</button>
          </div>

          <!-- BOTÓN SELECTOR RÁPIDO CON BÚSQUEDA -->
          <div style="margin-bottom: 12px;">
            <button type="button" class="arena-picker-btn" onclick="openDragonPicker('duel_B')" ${isBattling ? "disabled" : ""}>
              <span>🔍 ${dragonB ? dragonB.name + ' (' + dragonB.element + ')' : 'Elegir Dragón'}</span>
              <span style="color: var(--gold-main); font-size: 0.8rem;">Buscar ▾</span>
            </button>
          </div>

          <div class="fighter-img-box">
            <img id="img-fighter-B" src="${getDragonArtworkSrc(dragonB)}" alt="${dragonB.name}" />
          </div>

          <h3 class="fighter-name">${dragonB.name}</h3>
          <p class="fighter-subtitle">${dragonB.title}</p>

          <div class="fighter-badges">
            <span class="badge badge-element badge-${dragonB.element.toLowerCase()}">${dragonB.element}</span>
            <span class="badge badge-type">${dragonB.type}</span>
            <span class="badge badge-danger">🔥 Peligro ${dragonB.danger}/5</span>
          </div>

          <p class="fighter-stat-text">
            <strong style="color: var(--gold-main);">Habilidad:</strong> ${dragonB.ability}
          </p>
          <p class="fighter-stat-text">
            <strong style="color: #ff6b6b;">Debilidad:</strong> ${dragonB.weakness}
          </p>
        </div>

        <!-- BARRA DE VIDA LUCHADOR 2 -->
        <div class="fighter-hp-wrap">
          <div class="fighter-hp-info">
            <span style="color: #ff6b6b;">Puntos de Salud (HP)</span>
            <span id="hp-text-B" style="color: #ff6b6b;">100 / 100</span>
          </div>
          <div class="fighter-hp-track" style="border-color: #ff4757;">
            <div id="hp-bar-B" class="fighter-hp-fill-b"></div>
          </div>
        </div>
      </div>

    </div>

    <!-- CRÓNICA DE BATALLA (BATTLE LOG) -->
    <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--border-gold); background: rgba(10, 9, 17, 0.95); border-radius: 16px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid var(--border-panel); padding-bottom: 8px;">
        <h3 style="color: var(--gold-main); margin: 0; font-size: 1.2rem; display: flex; align-items: center; gap: 8px;">
          📜 Crónica Épica de la Batalla
        </h3>
        <span id="round-indicator" style="color: var(--text-muted); font-size: 0.9rem; font-weight: bold;">Listo para el combate</span>
      </div>

      <div id="battle-log-box" style="height: 180px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding-right: 8px; font-size: 0.95rem; line-height: 1.5; color: var(--text-main);">
        <div style="color: var(--text-muted); font-style: italic; text-align: center; padding-top: 50px;">
          Presioná "¡COMBATIR!" para dar inicio a los rugidos en la Arena...
        </div>
      </div>
    </div>
  `;
}

window.selectDuelDragon = function(fighterKey, dragonId) {
  if (isBattling) return;
  const selected = DRAGONS_DATA.find(d => d.id === parseInt(dragonId));
  if (!selected) return;

  if (fighterKey === "A") dragonA = selected;
  else dragonB = selected;
  
  playSound("click");
  const container = document.getElementById("arena-container") || document.getElementById("coliseo-container");
  if (container) renderArenaContainer(container);
};

window.randomizeFighter = function(fighterKey) {
  if (isBattling) return;
  playSound("click");
  const randomIndex = Math.floor(Math.random() * DRAGONS_DATA.length);
  if (fighterKey === "A") dragonA = DRAGONS_DATA[randomIndex];
  else dragonB = DRAGONS_DATA[randomIndex];

  const container = document.getElementById("arena-container") || document.getElementById("coliseo-container");
  if (container) renderArenaContainer(container);
};

window.resetDragonDuel = function() {
  if (battleInterval) clearInterval(battleInterval);
  isBattling = false;
  duelWinner = null;
  const container = document.getElementById("arena-container") || document.getElementById("coliseo-container");
  if (container) renderArenaContainer(container);
};

window.startDragonDuel = function() {
  if (isBattling || !dragonA || !dragonB) return;
  if (dragonA.id === dragonB.id) {
    alert("¡Por favor elegí dos dragones distintos para el enfrentamiento!");
    return;
  }

  duelWinner = null;
  isBattling = true;
  playSound("roar");

  const btnStart = document.getElementById("btn-start-duel");
  const btnReset = document.getElementById("btn-reset-duel");
  if (btnStart) btnStart.style.display = "none";
  if (btnReset) btnReset.style.display = "none";

  const logBox = document.getElementById("battle-log-box");
  const roundIndicator = document.getElementById("round-indicator");
  if (logBox) logBox.innerHTML = "";

  let hpA = 100;
  let hpB = 100;
  let round = 1;

  const advA = (ELEMENTAL_ADVANTAGE[dragonA.element] || []).includes(dragonB.element);
  const advB = (ELEMENTAL_ADVANTAGE[dragonB.element] || []).includes(dragonA.element);

  appendBattleLog(`⚔️ <strong>¡Comienza el duelo épico entre ${dragonA.name} y ${dragonB.name}!</strong>`, "gold");

  if (advA) {
    appendBattleLog(`🔥 ¡Ventaja Elemental! El elemento <strong>${dragonA.element}</strong> de ${dragonA.name} domina al <strong>${dragonB.element}</strong> de ${dragonB.name}.`, "teal");
  } else if (advB) {
    appendBattleLog(`⚡ ¡Ventaja Elemental! El elemento <strong>${dragonB.element}</strong> de ${dragonB.name} domina al <strong>${dragonA.element}</strong> de ${dragonA.name}.`, "rust");
  }

  battleInterval = setInterval(() => {
    if (roundIndicator) roundIndicator.textContent = `Asalto ${round}`;

    // Turno de A atacando a B
    const resultA = calculateAttack(dragonA, dragonB, advA);
    hpB = Math.max(0, hpB - resultA.damage);
    updateHpBars(hpA, hpB);

    playSound("hit");
    appendBattleLog(resultA.log, resultA.isCrit ? "gold" : "main");

    if (hpB <= 0) {
      endBattle(dragonA, dragonB);
      return;
    }

    // Turno de B atacando a A
    setTimeout(() => {
      if (hpB <= 0) return;
      const resultB = calculateAttack(dragonB, dragonA, advB);
      hpA = Math.max(0, hpA - resultB.damage);
      updateHpBars(hpA, hpB);

      playSound("hit");
      appendBattleLog(resultB.log, resultB.isCrit ? "rust" : "main");

      if (hpA <= 0) {
        endBattle(dragonB, dragonA);
      }
    }, 600);

    round++;
    if (round > 8 && hpA > 0 && hpB > 0) {
      hpA > hpB ? endBattle(dragonA, dragonB) : endBattle(dragonB, dragonA);
    }
  }, 1400);
};

function calculateAttack(attacker, defender, hasAdvantage) {
  const basePower = attacker.danger * 7 + Math.floor(Math.random() * 8);
  const elementBonus = hasAdvantage ? 8 : 0;
  const isCrit = Math.random() < 0.35 || hasAdvantage;
  const critMultiplier = isCrit ? 1.4 : 1.0;
  const totalDamage = Math.round((basePower + elementBonus) * critMultiplier);

  const attackNarratives = [
    `¡<strong>${attacker.name}</strong> desata su <em>${attacker.ability}</em> causando <strong>${totalDamage}</strong> de daño!`,
    `¡<strong>${attacker.name}</strong> embiste con toda la fuerza de su cuerpo tipo <em>${attacker.type}</em> propinando <strong>${totalDamage}</strong> de daño a ${defender.name}!`,
    `¡<strong>${attacker.name}</strong> invoca una ráfaga de poder <em>${attacker.element}</em> impactando con <strong>${totalDamage}</strong> de daño!`
  ];

  let chosenNarrative = attackNarratives[Math.floor(Math.random() * attackNarratives.length)];
  if (isCrit) chosenNarrative = `💥 ¡GOLPE CRÍTICO! ` + chosenNarrative;

  return { damage: totalDamage, isCrit, log: chosenNarrative };
}

function updateHpBars(hpA, hpB) {
  const barA = document.getElementById("hp-bar-A");
  const barB = document.getElementById("hp-bar-B");
  const textA = document.getElementById("hp-text-A");
  const textB = document.getElementById("hp-text-B");

  if (barA) barA.style.width = `${hpA}%`;
  if (barB) barB.style.width = `${hpB}%`;
  if (textA) textA.textContent = `${hpA} / 100`;
  if (textB) textB.textContent = `${hpB} / 100`;
}

function appendBattleLog(message, styleType = "main") {
  const logBox = document.getElementById("battle-log-box");
  if (!logBox) return;

  const entry = document.createElement("div");
  entry.style.padding = "6px 10px";
  entry.style.borderRadius = "6px";
  entry.style.animation = "fadeIn 0.3s ease";

  if (styleType === "gold") {
    entry.style.background = "rgba(233,196,106,0.15)";
    entry.style.borderLeft = "3px solid var(--gold-main)";
    entry.style.color = "var(--gold-light)";
  } else if (styleType === "teal") {
    entry.style.background = "rgba(42,157,143,0.15)";
    entry.style.borderLeft = "3px solid var(--color-teal)";
    entry.style.color = "#80ed99";
  } else if (styleType === "rust") {
    entry.style.background = "rgba(230,57,70,0.15)";
    entry.style.borderLeft = "3px solid #ff4757";
    entry.style.color = "#ff9f1c";
  } else {
    entry.style.background = "rgba(255,255,255,0.03)";
    entry.style.color = "var(--text-main)";
  }

  entry.innerHTML = message;
  logBox.appendChild(entry);
  logBox.scrollTop = logBox.scrollHeight;
}

function endBattle(winner, loser) {
  if (battleInterval) clearInterval(battleInterval);
  isBattling = false;
  playSound("victory");

  appendBattleLog(`🏆👑 <strong>¡VICTORIA ÉPICA! ${winner.name} ha vencido en la Arena demostrando la supremacía de su linaje!</strong>`, "gold");

  const btnReset = document.getElementById("btn-reset-duel");
  if (btnReset) btnReset.style.display = "inline-block";

  setTimeout(() => {
    duelWinner = { winner, loser };
    const container = document.getElementById("arena-container") || document.getElementById("coliseo-container");
    if (container) renderArenaContainer(container);
  }, 1400);
}


/* ==========================================================================
   2. MODO EL TORNEO DEL SANTUARIO (MODO COPA / ROGUELITE)
   ========================================================================== */

const STAGE_NAMES = [
  "Selección de Guardián",
  "Ronda 1: Cuartos de Final",
  "Ronda 2: Semifinal Épica",
  "Ronda 3: La Gran Final Ancestral",
  "🏆 ¡CAMPEÓN ABSOLUTO DEL SANTUARIO!"
];

function renderTournamentViewHtml() {
  if (tournamentStage === 0) {
    return `
      <div class="fantasy-panel text-center margin-bottom-lg" style="padding: 2rem; background: linear-gradient(135deg, rgba(233,196,106,0.15), rgba(42,157,143,0.15)); border: 2px solid var(--gold-main); border-radius: 20px;">
        <div style="font-size: 3rem; margin-bottom: 6px;">🏆🔥</div>
        <h2 style="color: var(--gold-main); font-size: 2rem; margin: 0; font-family: var(--font-heading);">El Torneo del Santuario</h2>
        <p style="color: var(--text-main); font-size: 1.05rem; max-width: 750px; margin: 8px auto 0 auto; line-height: 1.6;">
          ¡Elegí a tu dragón guardián y avanzá a través de 3 rondas eliminatorias consecutivas! Entre victoria y victoria podrás elegir <strong>Reliquias y Bendiciones Ancestrales</strong> para curarte y potenciar tus ataques.
        </p>
      </div>

      <div class="fantasy-panel" style="max-width: 600px; margin: 0 auto 2rem auto; padding: 2rem; border: 2px solid var(--border-gold); text-align: center; border-radius: 16px;">
        <h3 style="color: var(--gold-light); margin-top: 0; margin-bottom: 12px;">Elegí a tu Campeón:</h3>

        <!-- BOTÓN SELECTOR RÁPIDO TORNEO -->
        <div style="margin-bottom: 15px;">
          <button type="button" class="arena-picker-btn" onclick="openDragonPicker('tourney')">
            <span>🔍 ${playerDragon ? playerDragon.name + ' (' + playerDragon.element + ') - Peligro ' + playerDragon.danger + '/5' : 'Elegir Campeón'}</span>
            <span style="color: var(--gold-main); font-size: 0.8rem;">Buscar ▾</span>
          </button>
        </div>

        <div style="width: 100%; height: 240px; border-radius: 12px; overflow: hidden; border: 2px solid var(--gold-main); margin-bottom: 15px; background: #0a0911;">
          <img src="${getDragonArtworkSrc(playerDragon)}" alt="${playerDragon.name}" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>

        <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-bottom: 15px;">
          <span class="badge badge-element badge-${playerDragon.element.toLowerCase()}">${playerDragon.element}</span>
          <span class="badge badge-type">${playerDragon.type}</span>
          <span class="badge badge-danger">🔥 Peligro ${playerDragon.danger}/5</span>
        </div>

        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">
          <strong style="color: var(--gold-main);">Habilidad Especial:</strong> ${playerDragon.ability}
        </p>

        <button type="button" class="btn btn-gold btn-lg" onclick="startTournamentRun()" style="width: 100%; padding: 14px; font-size: 1.2rem; font-weight: 800; box-shadow: 0 6px 20px rgba(233,196,106,0.4);">
          🏆 ¡INICIAR EL TORNEO!
        </button>
      </div>
    `;
  }

  if (tournamentStage === 5) {
    return `
      <div class="fantasy-panel text-center" style="padding: 2.5rem 1.5rem; border: 3px solid var(--gold-main); border-radius: 20px; background: radial-gradient(circle, rgba(233,196,106,0.25) 0%, rgba(15,23,42,0.95) 100%);">
        <div style="font-size: 3.5rem; margin-bottom: 6px; animation: pulse 1.5s infinite;">👑🏆✨</div>
        <h1 style="color: var(--gold-main); font-size: 2.4rem; font-family: var(--font-heading); margin: 0 0 10px 0;">¡CAMPEÓN SUPREMO DEL SANTUARIO!</h1>
        <p style="color: #80ed99; font-size: 1.25rem; font-weight: 700; margin-bottom: 1.5rem;">
          ¡Tu dragón <strong>${playerDragon.name}</strong> ha triunfado en la arena y alzado la legendaria Copa Draconiana ante la multitud!
        </p>

        <!-- ILUSTRACIÓN DE LA COPA Y CAMPEÓN -->
        <div style="display: flex; justify-content: center; align-items: center; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1.8rem;">
          <div style="width: 100%; max-width: 480px; border-radius: 16px; overflow: hidden; border: 3px solid var(--gold-main); box-shadow: 0 8px 30px rgba(233,196,106,0.45); background: #0a0911;">
            <img src="/assets/ui/trophy_champion.webp" alt="Copa de Campeón del Santuario" style="width: 100%; height: auto; display: block;" />
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <div style="width: 150px; height: 150px; border-radius: 50%; overflow: hidden; border: 3px solid var(--gold-main); box-shadow: 0 0 20px rgba(233,196,106,0.6);">
              <img src="${getDragonArtworkSrc(playerDragon)}" alt="${playerDragon.name}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <span style="color: var(--gold-main); font-weight: 800; font-size: 1.1rem;">${playerDragon.name}</span>
            <span class="badge badge-element badge-${playerDragon.element.toLowerCase()}">${playerDragon.element}</span>
          </div>
        </div>

        <div style="margin-bottom: 2rem;">
          <h4 style="color: var(--gold-light); margin-bottom: 8px; font-size: 1.05rem;">Reliquias Coleccionadas en esta hazaña:</h4>
          <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
            ${playerRelics.map(r => `<span class="badge" style="background: rgba(233,196,106,0.2); border: 1px solid var(--gold-main); color: var(--gold-main); font-size: 0.95rem;">✨ ${r}</span>`).join("") || "<span style='color: var(--text-muted);'>Victoria en estado puro sin reliquias.</span>"}
          </div>
        </div>

        <button type="button" class="btn btn-gold btn-lg" onclick="resetTournamentToStart()" style="padding: 14px 32px; font-weight: 800; font-size: 1.15rem; box-shadow: 0 6px 20px rgba(233,196,106,0.4);">
          🔄 Jugar Otro Torneo
        </button>
      </div>
    `;
  }

  if (tournamentStage === -1) {
    const roundIndex = (currentOpponent && tournamentOpponents.indexOf(currentOpponent) !== -1)
      ? tournamentOpponents.indexOf(currentOpponent) + 1
      : 1;
    const roundFailedName = STAGE_NAMES[roundIndex] || "Combate del Torneo";

    return `
      <!-- PANTALLA DE DERROTA EN EL TORNEO -->
      <div class="fantasy-panel text-center" style="padding: 2.5rem 1.5rem; border: 3px solid #ff4757; border-radius: 20px; background: radial-gradient(circle, rgba(230,57,70,0.2) 0%, rgba(15,23,42,0.98) 100%); margin-bottom: 2rem; box-shadow: 0 10px 40px rgba(255,71,87,0.25);">
        <div style="font-size: 3.5rem; margin-bottom: 6px;">💀⚔️💔</div>
        <h1 style="color: #ff6b6b; font-size: 2.3rem; font-family: var(--font-heading); margin: 0 0 10px 0;">¡CAÍDO EN COMBATE!</h1>
        <p style="color: var(--text-muted); font-size: 1.15rem; margin-bottom: 1.8rem;">
          Tu dragón <strong>${playerDragon.name}</strong> ha caído en la arena ante <strong>${currentOpponent ? currentOpponent.name : 'el rival'}</strong> en <span style="color: var(--gold-main); font-weight: 700;">${roundFailedName}</span>.
        </p>

        <!-- CONTENEDOR DESIGNADO PARA LA ILUSTRACIÓN DE DERROTA -->
        <div id="tournament-defeat-banner" style="width: 100%; max-width: 520px; min-height: 220px; border-radius: 16px; border: 2px dashed rgba(255,71,87,0.6); background: rgba(10,9,17,0.85); box-shadow: inset 0 0 30px rgba(255,71,87,0.15); display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0 auto 1.8rem auto; padding: 2rem 1.5rem; position: relative; overflow: hidden;">
          <div style="font-size: 3.8rem; margin-bottom: 10px; filter: drop-shadow(0 0 12px rgba(255,71,87,0.5));">⚔️🥀🛡️</div>
          <h3 style="color: #ff6b6b; font-size: 1.25rem; font-family: var(--font-heading); margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 1px;">
            Santuario de los Dragones Caídos
          </h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; max-width: 400px; margin: 0; line-height: 1.5;">
            El fuego de tu guardián se ha extinguido momentáneamente en la arena. La gloria aguarda a quienes se levantan de las cenizas.
          </p>
        </div>

        <div style="display: flex; justify-content: center; align-items: center; gap: 2rem; flex-wrap: wrap; margin-bottom: 2rem;">
          <!-- Tu Dragón Caído -->
          <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
            <div style="width: 120px; height: 120px; border-radius: 50%; overflow: hidden; border: 3px solid #ff4757; opacity: 0.7; position: relative;">
              <img src="${getDragonArtworkSrc(playerDragon)}" alt="${playerDragon.name}" style="width: 100%; height: 100%; object-fit: cover;" />
              <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; color: #ff4757; font-size: 2rem;">💀</div>
            </div>
            <span style="color: #ff6b6b; font-weight: 700; font-size: 1rem;">${playerDragon.name}</span>
            <span class="badge badge-danger">Derrotado</span>
          </div>

          <div style="font-size: 1.8rem; color: var(--text-muted); font-weight: bold;">VS</div>

          <!-- Rival Vencedor -->
          ${currentOpponent ? `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
              <div style="width: 120px; height: 120px; border-radius: 50%; overflow: hidden; border: 3px solid var(--gold-main); box-shadow: 0 0 15px rgba(233,196,106,0.4);">
                <img src="${getDragonArtworkSrc(currentOpponent)}" alt="${currentOpponent.name}" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <span style="color: var(--gold-main); font-weight: 700; font-size: 1rem;">${currentOpponent.name}</span>
              <span class="badge" style="background: rgba(42,157,143,0.25); color: #80ed99; border: 1px solid #2a9d8f;">Vencedor</span>
            </div>
          ` : ''}
        </div>

        <div style="margin-bottom: 2rem;">
          <h4 style="color: var(--text-muted); margin-bottom: 8px; font-size: 1rem;">Reliquias reunidas antes de caer:</h4>
          <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
            ${playerRelics.map(r => `<span class="badge" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2); color: var(--text-main); font-size: 0.9rem;">⭐ ${r}</span>`).join("") || "<span style='color: var(--text-muted);'>Ninguna reliquia obtenida.</span>"}
          </div>
        </div>

        <button type="button" class="btn btn-gold btn-lg" onclick="resetTournamentToStart()" style="padding: 14px 34px; font-weight: 800; font-size: 1.15rem; box-shadow: 0 6px 20px rgba(233,196,106,0.4);">
          🔄 Intentar Nuevamente el Torneo
        </button>
      </div>
    `;
  }

  const isFinal = tournamentStage === 3;
  const stageTitle = STAGE_NAMES[tournamentStage];

  return `
    <!-- HEADER DE ETAPA DEL TORNEO -->
    <div class="fantasy-panel text-center margin-bottom-lg" style="padding: 1.2rem; border: 2px solid ${isFinal ? '#ff4757' : 'var(--gold-main)'}; border-radius: 16px; background: rgba(15,23,42,0.9);">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <span class="badge" style="background: rgba(233,196,106,0.2); border: 1px solid var(--gold-main); color: var(--gold-main); font-size: 1rem; font-weight: 700;">
          ${stageTitle}
        </span>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="color: var(--text-muted); font-size: 0.9rem;">Reliquias:</span>
          ${playerRelics.map(r => `<span title="${r}" style="font-size: 1.2rem;">⭐</span>`).join("") || "<span style='color: var(--text-muted); font-size: 0.85rem;'>Ninguna</span>"}
        </div>
        <button type="button" class="btn btn-secondary btn-sm" onclick="resetTournamentToStart()" ${isTournamentBattling ? "disabled" : ""}>
          🏳️ Abandonar Torneo
        </button>
      </div>
    </div>

    <!-- ARENA DEL TORNEO (TU DRAGÓN VS RIVAL DEL TORNEO) -->
    <div class="arena-grid">
      
      <!-- FICHA TU CAMPEÓN -->
      <div class="fantasy-panel fighter-card fighter-card-a">
        <div>
          <div class="fighter-card-header">
            <span class="fighter-title fighter-title-a">🐲 Tu Guardián (Tú)</span>
            <span class="badge" style="background: rgba(42,157,143,0.2); color: #80ed99; border: 1px solid #2a9d8f;">+${playerAttackBonus} ATK / +${playerDefenseBonus} DEF</span>
          </div>

          <div class="fighter-img-box">
            <img src="${getDragonArtworkSrc(playerDragon)}" alt="${playerDragon.name}" />
          </div>

          <h3 class="fighter-name">${playerDragon.name}</h3>
          <p class="fighter-subtitle">${playerDragon.title}</p>

          <div class="fighter-badges">
            <span class="badge badge-element badge-${playerDragon.element.toLowerCase()}">${playerDragon.element}</span>
            <span class="badge badge-type">${playerDragon.type}</span>
            <span class="badge badge-danger">🔥 Peligro ${playerDragon.danger}/5</span>
          </div>

          <p class="fighter-stat-text">
            <strong style="color: var(--gold-main);">Habilidad:</strong> ${playerDragon.ability}
          </p>
        </div>

        <div class="fighter-hp-wrap">
          <div class="fighter-hp-info">
            <span style="color: var(--color-teal);">Tu Salud (HP)</span>
            <span id="player-hp-text" style="color: var(--color-teal);">${playerHp} / ${playerMaxHp}</span>
          </div>
          <div class="fighter-hp-track" style="border-color: var(--color-teal);">
            <div id="player-hp-bar" class="fighter-hp-fill-a" style="width: ${(playerHp / playerMaxHp) * 100}%;"></div>
          </div>
        </div>
      </div>

      <!-- CENTRO: VERSUS & ACCIÓN TORNEO -->
      <div class="arena-vs-panel">
        <div class="arena-vs-badge" style="color: ${isFinal ? '#ff4757' : 'var(--gold-main)'};">VS</div>
        
        <button id="btn-start-tourney-battle" type="button" class="btn btn-gold btn-lg arena-btn-fight" onclick="startTournamentBattle()" ${isTournamentBattling ? "disabled" : ""}>
          ⚔️ ¡LUCHAR!
        </button>
      </div>

      <!-- FICHA RIVAL DE LA RONDA -->
      <div class="fantasy-panel fighter-card fighter-card-b">
        <div>
          <div class="fighter-card-header">
            <span class="fighter-title fighter-title-b">🐲 Rival: ${currentOpponent.name}</span>
            <span class="badge badge-danger">${isFinal ? '👑 JEFE FINAL' : 'Rival de Copa'}</span>
          </div>

          <div class="fighter-img-box">
            <img src="${getDragonArtworkSrc(currentOpponent)}" alt="${currentOpponent.name}" />
          </div>

          <h3 class="fighter-name">${currentOpponent.name}</h3>
          <p class="fighter-subtitle">${currentOpponent.title}</p>

          <div class="fighter-badges">
            <span class="badge badge-element badge-${currentOpponent.element.toLowerCase()}">${currentOpponent.element}</span>
            <span class="badge badge-type">${currentOpponent.type}</span>
            <span class="badge badge-danger">🔥 Peligro ${currentOpponent.danger}/5</span>
          </div>

          <p class="fighter-stat-text">
            <strong style="color: var(--gold-main);">Habilidad:</strong> ${currentOpponent.ability}
          </p>
          <p class="fighter-stat-text">
            <strong style="color: #ff6b6b;">Debilidad:</strong> ${currentOpponent.weakness}
          </p>
        </div>

        <div class="fighter-hp-wrap">
          <div class="fighter-hp-info">
            <span style="color: #ff6b6b;">Salud Rival (HP)</span>
            <span id="opp-hp-text" style="color: #ff6b6b;">${opponentHp} / ${opponentMaxHp}</span>
          </div>
          <div class="fighter-hp-track" style="border-color: #ff4757;">
            <div id="opp-hp-bar" class="fighter-hp-fill-b" style="width: ${(opponentHp / opponentMaxHp) * 100}%;"></div>
          </div>
        </div>
      </div>

    </div>

    <!-- MODAL / PANEL DE BENDICIONES ROGUELITE -->
    <div id="relic-reward-modal" style="display: none; margin-bottom: 2rem;" class="fantasy-panel">
      <h3 style="color: var(--gold-main); text-align: center; margin-top: 0;">✨ ¡VICTORIA DE RONDA! Elegí tu Bendición Ancestral:</h3>
      <p style="text-align: center; color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.2rem;">
        Los espíritus draconianos recompensan tu coraje. Escogé 1 bendición para fortalecerte antes de la siguiente batalla:
      </p>
      <div id="relic-options-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;"></div>
    </div>

    <!-- CRÓNICA DE BATALLA DEL TORNEO -->
    <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--border-gold); background: rgba(10, 9, 17, 0.95); border-radius: 16px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid var(--border-panel); padding-bottom: 8px;">
        <h3 style="color: var(--gold-main); margin: 0; font-size: 1.2rem;">
          📜 Crónica del Torneo
        </h3>
        <span id="tourney-round-indicator" style="color: var(--text-muted); font-size: 0.9rem; font-weight: bold;">Esperando orden de combate</span>
      </div>

      <div id="tourney-log-box" style="height: 160px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding-right: 8px; font-size: 0.92rem; line-height: 1.5; color: var(--text-main);">
        <div style="color: var(--text-muted); font-style: italic; text-align: center; padding-top: 40px;">
          Presioná "¡LUCHAR!" para disputar la ronda...
        </div>
      </div>
    </div>
  `;
}

window.selectTournamentChampion = function(dragonId) {
  const selected = DRAGONS_DATA.find(d => d.id === parseInt(dragonId));
  if (selected) {
    playerDragon = selected;
    playSound("click");
    const container = document.getElementById("arena-container") || document.getElementById("coliseo-container");
    if (container) renderArenaContainer(container);
  }
};

window.resetTournamentToStart = function() {
  if (tournamentInterval) clearInterval(tournamentInterval);
  isTournamentBattling = false;
  tournamentStage = 0;
  playerHp = 130;
  playerMaxHp = 130;
  playerAttackBonus = 0;
  playerDefenseBonus = 0;
  playerRelics = [];
  firstTournamentStrikeUsed = false;
  const container = document.getElementById("arena-container") || document.getElementById("coliseo-container");
  if (container) renderArenaContainer(container);
};

window.startTournamentRun = function() {
  playSound("roar");
  const pool = DRAGONS_DATA.filter(d => d.id !== playerDragon.id);
  
  const easyPool = pool.filter(d => d.danger <= 3);
  const opp1 = easyPool[Math.floor(Math.random() * easyPool.length)] || pool[0];
  
  const medPool = pool.filter(d => d.id !== opp1.id && d.danger >= 3 && d.danger <= 4);
  const opp2 = medPool[Math.floor(Math.random() * medPool.length)] || pool[1];

  const bossPool = pool.filter(d => d.id !== opp1.id && d.id !== opp2.id && d.danger === 5);
  const opp3 = bossPool[Math.floor(Math.random() * bossPool.length)] || pool[2];

  tournamentOpponents = [opp1, opp2, opp3];
  tournamentStage = 1;
  playerHp = 130;
  playerMaxHp = 130;
  playerAttackBonus = 0;
  playerDefenseBonus = 0;
  playerRelics = [];
  firstTournamentStrikeUsed = false;

  setupTournamentRound();
};

function setupTournamentRound() {
  currentOpponent = tournamentOpponents[tournamentStage - 1];
  opponentMaxHp = tournamentStage === 3 ? 140 : (tournamentStage === 2 ? 115 : 100);
  opponentHp = opponentMaxHp;

  const container = document.getElementById("arena-container") || document.getElementById("coliseo-container");
  if (container) renderArenaContainer(container);
}

window.startTournamentBattle = function() {
  if (isTournamentBattling || !playerDragon || !currentOpponent) return;

  isTournamentBattling = true;
  playSound("roar");

  const btnFight = document.getElementById("btn-start-tourney-battle");
  if (btnFight) btnFight.style.display = "none";

  const logBox = document.getElementById("tourney-log-box");
  const roundIndicator = document.getElementById("tourney-round-indicator");
  if (logBox) logBox.innerHTML = "";

  let round = 1;
  const advPlayer = (ELEMENTAL_ADVANTAGE[playerDragon.element] || []).includes(currentOpponent.element);
  const advOpp = (ELEMENTAL_ADVANTAGE[currentOpponent.element] || []).includes(playerDragon.element);

  appendTourneyLog(`⚔️ <strong>¡Comienza el combate de ${STAGE_NAMES[tournamentStage]}!</strong>`, "gold");

  if (advPlayer) {
    appendTourneyLog(`🔥 ¡Ventaja Elemental! Tu elemento <strong>${playerDragon.element}</strong> domina al <strong>${currentOpponent.element}</strong> rival.`, "teal");
  } else if (advOpp) {
    appendTourneyLog(`⚡ ¡Cuidado! El elemento <strong>${currentOpponent.element}</strong> rival domina a tu <strong>${playerDragon.element}</strong>.`, "rust");
  }

  tournamentInterval = setInterval(() => {
    if (roundIndicator) roundIndicator.textContent = `Asalto ${round}`;

    let dmgToOpp = 0;
    let isCrit = false;

    if (!firstTournamentStrikeUsed) {
      dmgToOpp = 57;
      isCrit = true;
      firstTournamentStrikeUsed = true;
    } else {
      const baseAtk = playerDragon.danger * 7 + playerAttackBonus + Math.floor(Math.random() * 8);
      const elemBonus = advPlayer ? 9 : 0;
      const hasCritRelic = playerRelics.includes("crit_boost");
      isCrit = Math.random() < (hasCritRelic ? 0.55 : 0.35) || advPlayer;
      dmgToOpp = Math.round((baseAtk + elemBonus) * (isCrit ? 1.45 : 1.0));
    }

    opponentHp = Math.max(0, opponentHp - dmgToOpp);
    updateTourneyHpBars();

    playSound("hit");
    appendTourneyLog(`${isCrit ? '💥 ¡CRÍTICO! ' : ''}¡Tu dragón ataca con <em>${playerDragon.ability}</em> causando <strong>${dmgToOpp}</strong> de daño!`, isCrit ? "gold" : "teal");

    if (opponentHp <= 0) {
      handleTournamentRoundWin();
      return;
    }

    setTimeout(() => {
      if (opponentHp <= 0) return;
      const baseOppAtk = currentOpponent.danger * 7 + Math.floor(Math.random() * 7);
      const oppElemBonus = advOpp ? 8 : 0;
      const rawDmg = baseOppAtk + oppElemBonus - playerDefenseBonus;
      const finalDmg = Math.max(4, Math.round(rawDmg));

      playerHp = Math.max(0, playerHp - finalDmg);
      updateTourneyHpBars();

      playSound("hit");
      appendTourneyLog(`¡${currentOpponent.name} contrataca infligiendo <strong>${finalDmg}</strong> de daño!`, "rust");

      if (playerHp <= 0) {
        handleTournamentDefeat();
      }
    }, 600);

    round++;
  }, 1400);
};

function updateTourneyHpBars() {
  const pBar = document.getElementById("player-hp-bar");
  const pText = document.getElementById("player-hp-text");
  const oBar = document.getElementById("opp-hp-bar");
  const oText = document.getElementById("opp-hp-text");

  if (pBar) pBar.style.width = `${(playerHp / playerMaxHp) * 100}%`;
  if (pText) pText.textContent = `${playerHp} / ${playerMaxHp}`;
  if (oBar) oBar.style.width = `${(opponentHp / opponentMaxHp) * 100}%`;
  if (oText) oText.textContent = `${opponentHp} / ${opponentMaxHp}`;
}

function appendTourneyLog(message, styleType = "main") {
  const logBox = document.getElementById("tourney-log-box");
  if (!logBox) return;

  const entry = document.createElement("div");
  entry.style.padding = "5px 9px";
  entry.style.borderRadius = "6px";

  if (styleType === "gold") {
    entry.style.background = "rgba(233,196,106,0.15)";
    entry.style.color = "var(--gold-light)";
  } else if (styleType === "teal") {
    entry.style.background = "rgba(42,157,143,0.15)";
    entry.style.color = "#80ed99";
  } else if (styleType === "rust") {
    entry.style.background = "rgba(230,57,70,0.15)";
    entry.style.color = "#ff9f1c";
  } else {
    entry.style.background = "rgba(255,255,255,0.03)";
    entry.style.color = "var(--text-main)";
  }

  entry.innerHTML = message;
  logBox.appendChild(entry);
  logBox.scrollTop = logBox.scrollHeight;
}

function handleTournamentRoundWin() {
  if (tournamentInterval) clearInterval(tournamentInterval);
  isTournamentBattling = false;
  playSound("victory");

  appendTourneyLog(`🏆👑 <strong>¡HAS DERROTADO A ${currentOpponent.name}!</strong>`, "gold");

  if (tournamentStage >= 3) {
    setTimeout(() => {
      tournamentStage = 5;
      const container = document.getElementById("arena-container") || document.getElementById("coliseo-container");
      if (container) renderArenaContainer(container);
    }, 1500);
  } else {
    showRelicSelectionModal();
  }
}

function showRelicSelectionModal() {
  const modal = document.getElementById("relic-reward-modal");
  const optContainer = document.getElementById("relic-options-container");
  if (!modal || !optContainer) return;

  const shuffled = [...BLESSINGS_POOL].sort(() => 0.5 - Math.random()).slice(0, 3);

  optContainer.innerHTML = shuffled.map(relic => `
    <div class="fantasy-panel" style="padding: 1rem; border: 1px solid var(--gold-main); text-align: center; border-radius: 12px; background: rgba(0,0,0,0.5);">
      <div style="font-size: 2.2rem; margin-bottom: 6px;">${relic.icon}</div>
      <h4 style="color: var(--gold-light); margin: 0 0 6px 0; font-size: 1rem;">${relic.name}</h4>
      <p style="color: var(--text-main); font-size: 0.85rem; margin-bottom: 12px;">${relic.desc}</p>
      <button type="button" class="btn btn-gold btn-sm" onclick="claimRelicReward('${relic.id}')" style="width: 100%; font-weight: 700;">
        Elegir Bendición ✨
      </button>
    </div>
  `).join("");

  modal.style.display = "block";
  modal.scrollIntoView({ behavior: "smooth" });
}

window.claimRelicReward = function(relicId) {
  const relic = BLESSINGS_POOL.find(r => r.id === relicId);
  if (relic) {
    relic.apply();
    playerRelics.push(relic.name);
    playSound("chime");
  }

  tournamentStage++;
  setupTournamentRound();
};

function handleTournamentDefeat() {
  if (tournamentInterval) clearInterval(tournamentInterval);
  isTournamentBattling = false;
  playSound("click");

  appendTourneyLog(`💀 <strong>¡Tu dragón ha caído en combate! Fin del recorrido en el Torneo.</strong>`, "rust");

  const btnFight = document.getElementById("btn-start-tourney-battle");
  if (btnFight) {
    btnFight.textContent = "🔄 Reintentar Torneo";
    btnFight.style.display = "inline-block";
    btnFight.onclick = resetTournamentToStart;
  }

  setTimeout(() => {
    tournamentStage = -1;
    const container = document.getElementById("arena-container") || document.getElementById("coliseo-container");
    if (container) renderArenaContainer(container);
  }, 1300);
}


/* ==========================================================================
   3. MODO BATALLA DE ESCUADRONES 5 VS 5 (GUERRA DE CLANES)
   ========================================================================== */

function renderSquadViewHtml() {
  if (squadWinnerTeam) {
    const winnerName = squadWinnerTeam === "A" ? squadNameA : squadNameB;
    const winningSquad = squadWinnerTeam === "A" ? squadA : squadB;
    const winningHps = squadWinnerTeam === "A" ? squadHpA : squadHpB;
    const survivingCount = winningHps.filter(h => h > 0).length;

    return `
      <!-- PANTALLA DE VICTORIA GUERRA 5v5 CON COPA -->
      <div class="fantasy-panel text-center" style="padding: 2.5rem 1.5rem; border: 3px solid var(--gold-main); border-radius: 20px; background: radial-gradient(circle, rgba(233,196,106,0.22) 0%, rgba(15,23,42,0.96) 100%); margin-bottom: 2rem; box-shadow: 0 10px 40px rgba(233,196,106,0.25);">
        <div style="font-size: 3.5rem; margin-bottom: 6px; animation: pulse 1.5s infinite;">👑🏆⚔️</div>
        <h2 style="color: var(--gold-main); font-size: 2.2rem; font-family: var(--font-heading); margin: 0 0 10px 0;">¡CLAN CAMPEÓN DE LA ARENA 5v5!</h2>
        <p style="color: #80ed99; font-size: 1.25rem; font-weight: 700; margin-bottom: 1.8rem;">
          ¡El escuadrón <strong>[${winnerName}]</strong> ha triunfado en la batalla campal con <strong>${survivingCount}</strong> dragones en pie y alza la Copa Legendaria!
        </p>

        <!-- ILUSTRACIÓN DE LA COPA Y CLAN GANADOR -->
        <div style="display: flex; justify-content: center; align-items: center; gap: 2rem; flex-wrap: wrap; margin-bottom: 2rem;">
          <div style="width: 100%; max-width: 440px; border-radius: 16px; overflow: hidden; border: 3px solid var(--gold-main); box-shadow: 0 8px 30px rgba(233,196,106,0.45); background: #0a0911;">
            <img src="/assets/ui/trophy_champion.webp" alt="Copa de Campeón de la Arena" style="width: 100%; height: auto; display: block;" />
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
            <h3 style="color: var(--gold-main); margin: 0; font-size: 1.2rem;">Guerreros del Clan Triunfante</h3>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; max-width: 380px;">
              ${winningSquad.map((d, idx) => {
                const isAlive = winningHps[idx] > 0;
                return `
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 4px; width: 68px;">
                    <div style="width: 58px; height: 58px; border-radius: 50%; overflow: hidden; border: 2px solid ${isAlive ? 'var(--gold-main)' : '#ff4757'}; position: relative;">
                      <img src="${getDragonArtworkSrc(d)}" alt="${d.name}" style="width: 100%; height: 100%; object-fit: cover; opacity: ${isAlive ? 1 : 0.35};" />
                      ${!isAlive ? '<div style="position: absolute; inset:0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.5); color: #ff4757; font-size: 0.85rem;">💀</div>' : ''}
                    </div>
                    <span style="font-size: 0.75rem; color: ${isAlive ? '#80ed99' : 'var(--text-muted)'}; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 68px;">${d.name}</span>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        </div>

        <button type="button" class="btn btn-gold btn-lg" onclick="resetSquadWar()" style="padding: 14px 34px; font-weight: 800; font-size: 1.15rem; box-shadow: 0 6px 20px rgba(233,196,106,0.4);">
          🔄 Disputar Otra Guerra de Clanes
        </button>
      </div>
    `;
  }

  const activeDragonA = squadA[activeIndexA] || squadA[0];
  const activeDragonB = squadB[activeIndexB] || squadB[0];
  const currentHpA = squadHpA[activeIndexA] !== undefined ? squadHpA[activeIndexA] : 100;
  const currentHpB = squadHpB[activeIndexB] !== undefined ? squadHpB[activeIndexB] : 100;

  const aliveA = squadHpA.filter(h => h > 0).length;
  const aliveB = squadHpB.filter(h => h > 0).length;

  return `
    <!-- HERO BANNER ARENA ESCUADRONES -->
    <div class="fantasy-panel text-center margin-bottom-lg" style="padding: 1.6rem; background: linear-gradient(135deg, rgba(42,157,143,0.2), rgba(233,196,106,0.15)); border: 2px solid var(--color-teal); border-radius: 20px;">
      <div style="font-size: 2.5rem; margin-bottom: 4px;">🛡️🐉⚔️</div>
      <h2 style="color: var(--gold-main); font-size: 1.85rem; margin: 0; font-family: var(--font-heading);">Guerra de Escuadrones 5 vs 5</h2>
      <p style="color: var(--text-main); font-size: 0.95rem; max-width: 760px; margin: 6px auto 0 auto; line-height: 1.5;">
        ¡Formá tu clan de 5 dragones con nombre personalizado y enfrentá al escuadrón rival en una batalla campal por relevos hasta la última garra!
      </p>
    </div>

    <!-- CONFIGURADOR Y BARRAS DE ESCUADRÓN -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; margin-bottom: 1.5rem;">
      
      <!-- ESCUADRÓN A (TU CLAN) -->
      <div class="fantasy-panel" style="padding: 1.2rem; border: 2px solid var(--gold-main); border-radius: 14px; background: rgba(15,23,42,0.9);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 6px; flex: 1;">
            <span style="font-size: 1.3rem;">🛡️</span>
            <input type="text" id="squad-name-input-a" class="search-input" value="${squadNameA}" placeholder="Nombre de tu Clan..." onchange="updateSquadName('A', this.value)" style="font-weight: 700; color: var(--gold-main); padding: 6px 10px; font-size: 1rem; width: 100%; max-width: 240px;" ${isSquadBattling ? "disabled" : ""} />
          </div>
          <button type="button" class="btn btn-secondary btn-sm" onclick="randomizeSquad('A')" ${isSquadBattling ? "disabled" : ""}>🎲 Al Azar</button>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 0.85rem; color: var(--text-muted);">Sobrevivientes:</span>
          <span class="badge" style="background: rgba(42,157,143,0.25); color: #80ed99; font-weight: 800; border: 1px solid #2a9d8f;">${aliveA} / 5 Dragones</span>
        </div>

        <!-- LISTA DE MINIATURAS 5 DRAGONES A -->
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px;">
          ${squadA.map((d, idx) => `
            <div class="squad-slot ${idx === activeIndexA ? 'squad-slot-active' : ''} ${squadHpA[idx] <= 0 ? 'squad-slot-dead' : ''}" onclick="selectActiveSquadDragon('A', ${idx})">
              <div class="squad-slot-img-wrap" style="border-color: ${idx === activeIndexA ? 'var(--gold-main)' : 'rgba(255,255,255,0.12)'};">
                <img src="${getDragonArtworkSrc(d)}" alt="${d.name}" style="opacity: ${squadHpA[idx] <= 0 ? 0.3 : 1};" />
                ${squadHpA[idx] <= 0 ? `<div style="position: absolute; top:0; left:0; right:0; bottom:0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.6); color: #ff4757; font-weight: 800; font-size: 1.1rem;">💀</div>` : ''}
              </div>
              <span class="squad-slot-name" style="color: ${idx === activeIndexA ? 'var(--gold-main)' : 'var(--text-muted)'};">${d.name}</span>
              <div style="width: 100%; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; margin-top: 2px;">
                <div style="width: ${squadHpA[idx]}%; height: 100%; background: #2a9d8f;"></div>
              </div>
            </div>
          `).join("")}
        </div>

        <!-- BOTÓN SELECTOR RÁPIDO PARA CAMBIAR INTEGRANTE A -->
        <div style="margin-top: 12px;">
          <button type="button" class="arena-picker-btn" onclick="openDragonPicker('squad_A_${activeIndexA}')" ${isSquadBattling ? "disabled" : ""}>
            <span>🔍 Cambiar pos. ${activeIndexA + 1}: <strong>${activeDragonA.name}</strong></span>
            <span style="color: var(--gold-main); font-size: 0.8rem;">Buscar ▾</span>
          </button>
        </div>
      </div>

      <!-- ESCUADRÓN B (RIVALES) -->
      <div class="fantasy-panel" style="padding: 1.2rem; border: 2px solid #ff4757; border-radius: 14px; background: rgba(15,23,42,0.9);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 6px; flex: 1;">
            <span style="font-size: 1.3rem;">⚔️</span>
            <input type="text" id="squad-name-input-b" class="search-input" value="${squadNameB}" placeholder="Nombre del Clan Rival..." onchange="updateSquadName('B', this.value)" style="font-weight: 700; color: #ff6b6b; padding: 6px 10px; font-size: 1rem; width: 100%; max-width: 240px;" ${isSquadBattling ? "disabled" : ""} />
          </div>
          <button type="button" class="btn btn-secondary btn-sm" onclick="randomizeSquad('B')" ${isSquadBattling ? "disabled" : ""}>🎲 Al Azar</button>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 0.85rem; color: var(--text-muted);">Sobrevivientes:</span>
          <span class="badge" style="background: rgba(230,57,70,0.25); color: #ff6b6b; font-weight: 800; border: 1px solid #e63946;">${aliveB} / 5 Dragones</span>
        </div>

        <!-- LISTA DE MINIATURAS 5 DRAGONES B -->
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px;">
          ${squadB.map((d, idx) => `
            <div class="squad-slot ${idx === activeIndexB ? 'squad-slot-active' : ''} ${squadHpB[idx] <= 0 ? 'squad-slot-dead' : ''}" onclick="selectActiveSquadDragon('B', ${idx})">
              <div class="squad-slot-img-wrap" style="border-color: ${idx === activeIndexB ? '#ff4757' : 'rgba(255,255,255,0.12)'};">
                <img src="${getDragonArtworkSrc(d)}" alt="${d.name}" style="opacity: ${squadHpB[idx] <= 0 ? 0.3 : 1};" />
                ${squadHpB[idx] <= 0 ? `<div style="position: absolute; top:0; left:0; right:0; bottom:0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.6); color: #ff4757; font-weight: 800; font-size: 1.1rem;">💀</div>` : ''}
              </div>
              <span class="squad-slot-name" style="color: ${idx === activeIndexB ? '#ff6b6b' : 'var(--text-muted)'};">${d.name}</span>
              <div style="width: 100%; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; margin-top: 2px;">
                <div style="width: ${squadHpB[idx]}%; height: 100%; background: #ff4757;"></div>
              </div>
            </div>
          `).join("")}
        </div>

        <!-- BOTÓN SELECTOR RÁPIDO PARA CAMBIAR INTEGRANTE B -->
        <div style="margin-top: 12px;">
          <button type="button" class="arena-picker-btn" onclick="openDragonPicker('squad_B_${activeIndexB}')" ${isSquadBattling ? "disabled" : ""}>
            <span>🔍 Cambiar pos. ${activeIndexB + 1}: <strong>${activeDragonB.name}</strong></span>
            <span style="color: var(--gold-main); font-size: 0.8rem;">Buscar ▾</span>
          </button>
        </div>
      </div>

    </div>

    <!-- ARENA CENTRAL DEL CHOQUE ACTIVO (CAMPEÓN A vs CAMPEÓN B EN TURNO) -->
    <div class="arena-grid">
      
      <!-- LUCHADOR ACTIVO CLAN A -->
      <div class="fantasy-panel fighter-card fighter-card-a">
        <div>
          <div class="fighter-card-header">
            <span class="fighter-title fighter-title-a">🐲 ${squadNameA} [Posición ${activeIndexA + 1}]</span>
          </div>

          <div class="fighter-img-box">
            <img src="${getDragonArtworkSrc(activeDragonA)}" alt="${activeDragonA.name}" />
          </div>

          <h3 class="fighter-name">${activeDragonA.name}</h3>
          <p class="fighter-subtitle">${activeDragonA.title}</p>

          <div class="fighter-badges">
            <span class="badge badge-element badge-${activeDragonA.element.toLowerCase()}">${activeDragonA.element}</span>
            <span class="badge badge-type">${activeDragonA.type}</span>
            <span class="badge badge-danger">🔥 Peligro ${activeDragonA.danger}/5</span>
          </div>

          <p class="fighter-stat-text">
            <strong style="color: var(--gold-main);">Habilidad:</strong> ${activeDragonA.ability}
          </p>
        </div>

        <div class="fighter-hp-wrap">
          <div class="fighter-hp-info">
            <span style="color: var(--color-teal);">Salud del Combatiente</span>
            <span id="squad-hp-text-A" style="color: var(--color-teal);">${currentHpA} / 100</span>
          </div>
          <div class="fighter-hp-track" style="border-color: var(--color-teal);">
            <div id="squad-hp-bar-A" class="fighter-hp-fill-a" style="width: ${currentHpA}%;"></div>
          </div>
        </div>
      </div>

      <!-- BOTONERA CENTRAL GUERRA -->
      <div class="arena-vs-panel">
        <div class="arena-vs-badge" style="font-size: 1.8rem; line-height: 1.1;">5v5<br><span style="font-size: 1.1rem; color: var(--text-muted);">WAR</span></div>
        
        <button id="btn-start-squad-war" type="button" class="btn btn-gold btn-lg arena-btn-fight" onclick="startSquadWar()" ${isSquadBattling ? "disabled" : ""}>
          ⚔️ ¡BATALLA CAMPAL!
        </button>

        <button id="btn-reset-squad-war" type="button" class="btn btn-secondary btn-sm margin-top-sm" onclick="resetSquadWar()" style="display: ${squadBattleEnded ? 'inline-block' : 'none'};">
          🔄 Reiniciar Guerra
        </button>
      </div>

      <!-- LUCHADOR ACTIVO CLAN B -->
      <div class="fantasy-panel fighter-card fighter-card-b">
        <div>
          <div class="fighter-card-header">
            <span class="fighter-title fighter-title-b">🐲 ${squadNameB} [Posición ${activeIndexB + 1}]</span>
          </div>

          <div class="fighter-img-box">
            <img src="${getDragonArtworkSrc(activeDragonB)}" alt="${activeDragonB.name}" />
          </div>

          <h3 class="fighter-name">${activeDragonB.name}</h3>
          <p class="fighter-subtitle">${activeDragonB.title}</p>

          <div class="fighter-badges">
            <span class="badge badge-element badge-${activeDragonB.element.toLowerCase()}">${activeDragonB.element}</span>
            <span class="badge badge-type">${activeDragonB.type}</span>
            <span class="badge badge-danger">🔥 Peligro ${activeDragonB.danger}/5</span>
          </div>

          <p class="fighter-stat-text">
            <strong style="color: var(--gold-main);">Habilidad:</strong> ${activeDragonB.ability}
          </p>
        </div>

        <div class="fighter-hp-wrap">
          <div class="fighter-hp-info">
            <span style="color: #ff6b6b;">Salud del Combatiente</span>
            <span id="squad-hp-text-B" style="color: #ff6b6b;">${currentHpB} / 100</span>
          </div>
          <div class="fighter-hp-track" style="border-color: #ff4757;">
            <div id="squad-hp-bar-B" class="fighter-hp-fill-b" style="width: ${currentHpB}%;"></div>
          </div>
        </div>
      </div>

    </div>

    <!-- CRÓNICA DE LA GUERRA 5V5 -->
    <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--border-gold); background: rgba(10, 9, 17, 0.95); border-radius: 16px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid var(--border-panel); padding-bottom: 8px;">
        <h3 style="color: var(--gold-main); margin: 0; font-size: 1.2rem; display: flex; align-items: center; gap: 8px;">
          📜 Crónica de la Guerra de Escuadrones
        </h3>
        <span id="squad-round-indicator" style="color: var(--text-muted); font-size: 0.9rem; font-weight: bold;">Preparando las filas</span>
      </div>

      <div id="squad-log-box" style="height: 180px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding-right: 8px; font-size: 0.92rem; line-height: 1.5; color: var(--text-main);">
        <div style="color: var(--text-muted); font-style: italic; text-align: center; padding-top: 50px;">
          Asigná los nombres de los clanes, configurá tus 5 dragones y presioná "¡BATALLA CAMPAL!"...
        </div>
      </div>
    </div>
  `;
}

window.updateSquadName = function(teamKey, name) {
  if (teamKey === "A") squadNameA = name.trim() || "Legión Dracónica";
  else squadNameB = name.trim() || "Horda Ancestral";
};

window.changeSquadMember = function(teamKey, index, dragonId) {
  if (isSquadBattling) return;
  const d = DRAGONS_DATA.find(x => x.id === parseInt(dragonId));
  if (!d) return;

  if (teamKey === "A") squadA[index] = d;
  else squadB[index] = d;

  playSound("click");
  const container = document.getElementById("arena-container") || document.getElementById("coliseo-container");
  if (container) renderArenaContainer(container);
};

window.selectActiveSquadDragon = function(teamKey, index) {
  if (isSquadBattling) return;
  if (teamKey === "A") activeIndexA = index;
  else activeIndexB = index;

  playSound("click");
  const container = document.getElementById("arena-container") || document.getElementById("coliseo-container");
  if (container) renderArenaContainer(container);
};

window.randomizeSquad = function(teamKey) {
  if (isSquadBattling) return;
  playSound("click");
  const shuffled = [...DRAGONS_DATA].sort(() => 0.5 - Math.random());
  if (teamKey === "A") {
    squadA = shuffled.slice(0, 5);
    squadHpA = [100, 100, 100, 100, 100];
    activeIndexA = 0;
  } else {
    squadB = shuffled.slice(0, 5);
    squadHpB = [100, 100, 100, 100, 100];
    activeIndexB = 0;
  }
  const container = document.getElementById("arena-container") || document.getElementById("coliseo-container");
  if (container) renderArenaContainer(container);
};

window.resetSquadWar = function() {
  if (squadInterval) clearInterval(squadInterval);
  isSquadBattling = false;
  squadBattleEnded = false;
  squadWinnerTeam = null;
  squadHpA = [100, 100, 100, 100, 100];
  squadHpB = [100, 100, 100, 100, 100];
  activeIndexA = 0;
  activeIndexB = 0;
  const container = document.getElementById("arena-container") || document.getElementById("coliseo-container");
  if (container) renderArenaContainer(container);
};

window.startSquadWar = function() {
  if (isSquadBattling) return;

  squadWinnerTeam = null;

  if (squadBattleEnded || squadHpA.every(h => h <= 0) || squadHpB.every(h => h <= 0)) {
    squadHpA = [100, 100, 100, 100, 100];
    squadHpB = [100, 100, 100, 100, 100];
    activeIndexA = 0;
    activeIndexB = 0;
  }

  isSquadBattling = true;
  squadBattleEnded = false;
  playSound("roar");

  const btnStart = document.getElementById("btn-start-squad-war");
  const btnReset = document.getElementById("btn-reset-squad-war");
  if (btnStart) btnStart.style.display = "none";
  if (btnReset) btnReset.style.display = "none";

  const logBox = document.getElementById("squad-log-box");
  const roundIndicator = document.getElementById("squad-round-indicator");
  if (logBox) logBox.innerHTML = "";

  appendSquadLog(`🛡️⚔️ <strong>¡DA INICIO LA GUERRA CAMPAL 5v5 ENTRE [${squadNameA}] Y [${squadNameB}]!</strong>`, "gold");

  let clashCount = 1;

  squadInterval = setInterval(() => {
    if (squadHpA[activeIndexA] <= 0) {
      const nextA = squadHpA.findIndex(h => h > 0);
      if (nextA !== -1) {
        activeIndexA = nextA;
        appendSquadLog(`🔄 <strong>${squadNameA}</strong> envía al frente a <strong>${squadA[activeIndexA].name}</strong>!`, "teal");
        playSound("chime");
      } else {
        endSquadWar("B");
        return;
      }
    }

    if (squadHpB[activeIndexB] <= 0) {
      const nextB = squadHpB.findIndex(h => h > 0);
      if (nextB !== -1) {
        activeIndexB = nextB;
        appendSquadLog(`🔄 <strong>${squadNameB}</strong> envía al frente a <strong>${squadB[activeIndexB].name}</strong>!`, "rust");
        playSound("chime");
      } else {
        endSquadWar("A");
        return;
      }
    }

    const dragonActiveA = squadA[activeIndexA];
    const dragonActiveB = squadB[activeIndexB];

    if (roundIndicator) roundIndicator.textContent = `Choque #${clashCount} (Duelo en curso)`;

    const advA = (ELEMENTAL_ADVANTAGE[dragonActiveA.element] || []).includes(dragonActiveB.element);
    const advB = (ELEMENTAL_ADVANTAGE[dragonActiveB.element] || []).includes(dragonActiveA.element);

    const baseAtkA = dragonActiveA.danger * 7 + Math.floor(Math.random() * 8);
    const elemBonusA = advA ? 8 : 0;
    const isCritA = Math.random() < 0.35 || advA;
    const dmgA = Math.round((baseAtkA + elemBonusA) * (isCritA ? 1.4 : 1.0));

    squadHpB[activeIndexB] = Math.max(0, squadHpB[activeIndexB] - dmgA);
    updateSquadWarUi();

    playSound("hit");
    appendSquadLog(`${isCritA ? '💥 ' : ''}<strong>${dragonActiveA.name}</strong> (${squadNameA}) golpea con <em>${dragonActiveA.ability}</em> causando <strong>${dmgA}</strong> de daño a ${dragonActiveB.name}!`, isCritA ? "gold" : "teal");

    if (squadHpB[activeIndexB] <= 0) {
      appendSquadLog(`💀 <strong>¡${dragonActiveB.name} ha caído en combate!</strong>`, "rust");
      if (squadHpB.every(h => h <= 0)) {
        endSquadWar("A");
        return;
      }
    }

    setTimeout(() => {
      if (squadHpB[activeIndexB] <= 0) return;
      if (squadHpA[activeIndexA] <= 0) return;

      const baseAtkB = dragonActiveB.danger * 7 + Math.floor(Math.random() * 8);
      const elemBonusB = advB ? 8 : 0;
      const isCritB = Math.random() < 0.35 || advB;
      const dmgB = Math.round((baseAtkB + elemBonusB) * (isCritB ? 1.4 : 1.0));

      squadHpA[activeIndexA] = Math.max(0, squadHpA[activeIndexA] - dmgB);
      updateSquadWarUi();

      playSound("hit");
      appendSquadLog(`${isCritB ? '💥 ' : ''}<strong>${dragonActiveB.name}</strong> (${squadNameB}) contrataca infligiendo <strong>${dmgB}</strong> de daño a ${dragonActiveA.name}!`, isCritB ? "rust" : "main");

      if (squadHpA[activeIndexA] <= 0) {
        appendSquadLog(`💀 <strong>¡${dragonActiveA.name} ha caído en combate!</strong>`, "rust");
        if (squadHpA.every(h => h <= 0)) {
          endSquadWar("B");
        }
      }
    }, 600);

    clashCount++;
  }, 1400);
};

function updateSquadWarUi() {
  const hpTextA = document.getElementById("squad-hp-text-A");
  const hpBarA = document.getElementById("squad-hp-bar-A");
  const hpTextB = document.getElementById("squad-hp-text-B");
  const hpBarB = document.getElementById("squad-hp-bar-B");

  const curHpA = squadHpA[activeIndexA] !== undefined ? squadHpA[activeIndexA] : 0;
  const curHpB = squadHpB[activeIndexB] !== undefined ? squadHpB[activeIndexB] : 0;

  if (hpTextA) hpTextA.textContent = `${curHpA} / 100`;
  if (hpBarA) hpBarA.style.width = `${curHpA}%`;
  if (hpTextB) hpTextB.textContent = `${curHpB} / 100`;
  if (hpBarB) hpBarB.style.width = `${curHpB}%`;

  const container = document.getElementById("arena-container") || document.getElementById("coliseo-container");
  if (container) {
    const logBox = document.getElementById("squad-log-box");
    const savedLog = logBox ? logBox.innerHTML : "";
    const roundInd = document.getElementById("squad-round-indicator");
    const savedRound = roundInd ? roundInd.textContent : "";

    renderArenaContainer(container);

    const newLogBox = document.getElementById("squad-log-box");
    if (newLogBox && savedLog) {
      newLogBox.innerHTML = savedLog;
      newLogBox.scrollTop = newLogBox.scrollHeight;
    }
    const newRoundInd = document.getElementById("squad-round-indicator");
    if (newRoundInd && savedRound) {
      newRoundInd.textContent = savedRound;
    }
  }
}

function appendSquadLog(message, styleType = "main") {
  const logBox = document.getElementById("squad-log-box");
  if (!logBox) return;

  const entry = document.createElement("div");
  entry.style.padding = "5px 9px";
  entry.style.borderRadius = "6px";

  if (styleType === "gold") {
    entry.style.background = "rgba(233,196,106,0.15)";
    entry.style.color = "var(--gold-light)";
  } else if (styleType === "teal") {
    entry.style.background = "rgba(42,157,143,0.15)";
    entry.style.color = "#80ed99";
  } else if (styleType === "rust") {
    entry.style.background = "rgba(230,57,70,0.15)";
    entry.style.color = "#ff9f1c";
  } else {
    entry.style.background = "rgba(255,255,255,0.03)";
    entry.style.color = "var(--text-main)";
  }

  entry.innerHTML = message;
  logBox.appendChild(entry);
  logBox.scrollTop = logBox.scrollHeight;
}

function endSquadWar(winningTeam) {
  if (squadInterval) clearInterval(squadInterval);
  isSquadBattling = false;
  squadBattleEnded = true;
  playSound("victory");

  const winnerName = winningTeam === "A" ? squadNameA : squadNameB;
  appendSquadLog(`🏆👑 <strong>¡GLORIA Y SUPREMACÍA TOTAL! ¡El escuadrón [${winnerName}] ha aniquilado al clan rival y conquistado la Arena 5v5!</strong>`, "gold");

  const container = document.getElementById("arena-container") || document.getElementById("coliseo-container");
  if (container) renderArenaContainer(container);

  setTimeout(() => {
    squadWinnerTeam = winningTeam;
    const target = document.getElementById("arena-container") || document.getElementById("coliseo-container");
    if (target) renderArenaContainer(target);
  }, 1300);
}


/* ==========================================================================
   4. SISTEMA DE BÚSQUEDA RÁPIDA Y SELECTOR VISUAL DE DRAGONES
   ========================================================================== */

window.openDragonPicker = function(contextKey) {
  activePickerContext = contextKey;
  pickerSearchQuery = "";
  pickerElementFilter = "Todos";
  playSound("click");
  renderDragonPickerModal();
};

window.closeDragonPicker = function() {
  activePickerContext = null;
  const root = document.getElementById("arena-picker-modal-root");
  if (root) root.innerHTML = "";
};

window.filterDragonPicker = function() {
  const input = document.getElementById("picker-search-input");
  const select = document.getElementById("picker-elem-filter");
  if (input) pickerSearchQuery = input.value.trim().toLowerCase();
  if (select) pickerElementFilter = select.value;
  renderDragonPickerList();
};

function renderDragonPickerModal() {
  const root = document.getElementById("arena-picker-modal-root");
  if (!root) return;

  const elementsList = ["Todos", "Fuego", "Agua", "Tierra", "Viento", "Tormenta", "Hielo", "Magma", "Luz", "Sombra", "Veneno", "Naturaleza", "Cristal"];

  root.innerHTML = `
    <div class="arena-picker-modal-overlay" onclick="handlePickerOverlayClick(event)">
      <div class="arena-picker-modal">
        
        <div class="arena-picker-header">
          <h3 style="color: var(--gold-main); margin: 0; font-size: 1.25rem; display: flex; align-items: center; gap: 8px;">
            🔍 Seleccionar Dragón para el Combate
          </h3>
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeDragonPicker()">✕ Cerrar</button>
        </div>

        <div class="arena-picker-filters">
          <div style="flex: 2; min-width: 180px;">
            <input type="text" id="picker-search-input" class="search-input" placeholder="🔍 Escribí un nombre o mitología..." oninput="filterDragonPicker()" style="padding: 8px 12px; font-size: 0.95rem;" autofocus />
          </div>
          <div style="flex: 1; min-width: 140px;">
            <select id="picker-elem-filter" class="filter-select" onchange="filterDragonPicker()" style="padding: 8px; font-size: 0.9rem;">
              ${elementsList.map(e => `<option value="${e}">${e === 'Todos' ? 'Todos los Elementos' : e}</option>`).join("")}
            </select>
          </div>
        </div>

        <div id="arena-picker-list-container" class="arena-picker-list"></div>

      </div>
    </div>
  `;

  renderDragonPickerList();
}

function renderDragonPickerList() {
  const container = document.getElementById("arena-picker-list-container");
  if (!container) return;

  const filtered = DRAGONS_DATA.filter(d => {
    const matchQuery = !pickerSearchQuery || 
      d.name.toLowerCase().includes(pickerSearchQuery) || 
      d.mythology.toLowerCase().includes(pickerSearchQuery) ||
      d.ability.toLowerCase().includes(pickerSearchQuery);

    const matchElement = pickerElementFilter === "Todos" || d.element.toLowerCase() === pickerElementFilter.toLowerCase();

    return matchQuery && matchElement;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 2rem;">
        No se encontraron dragones con esos criterios de búsqueda.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(d => `
    <div class="arena-picker-card" onclick="selectPickerDragon(${d.id})">
      <img src="${getDragonArtworkSrc(d)}" alt="${d.name}" loading="lazy" />
      <div class="picker-name">${d.name}</div>
      <div class="picker-meta">${d.element} • Peligro ${d.danger}/5</div>
    </div>
  `).join("");
}

window.handlePickerOverlayClick = function(e) {
  if (e.target.classList.contains("arena-picker-modal-overlay")) {
    closeDragonPicker();
  }
};

window.selectPickerDragon = function(dragonId) {
  const dragon = DRAGONS_DATA.find(d => d.id === dragonId);
  if (!dragon || !activePickerContext) return;

  playSound("click");

  if (activePickerContext === "duel_A") {
    dragonA = dragon;
  } else if (activePickerContext === "duel_B") {
    dragonB = dragon;
  } else if (activePickerContext === "tourney") {
    playerDragon = dragon;
  } else if (activePickerContext.startsWith("squad_A_")) {
    const idx = parseInt(activePickerContext.replace("squad_A_", ""));
    squadA[idx] = dragon;
  } else if (activePickerContext.startsWith("squad_B_")) {
    const idx = parseInt(activePickerContext.replace("squad_B_", ""));
    squadB[idx] = dragon;
  }

  closeDragonPicker();

  const container = document.getElementById("arena-container") || document.getElementById("coliseo-container");
  if (container) renderArenaContainer(container);
};

window.endBattle = endBattle;
window.handleTournamentDefeat = handleTournamentDefeat;
window.handleTournamentRoundWin = handleTournamentRoundWin;
window.endSquadWar = endSquadWar;


