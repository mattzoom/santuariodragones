// Arena de Dragones - Modos: Duelo Rápido 1 vs 1 y El Torneo del Santuario (Modo Copa / Roguelite)
// Combate automático por asaltos con ventajas elementales, reliquias benditas, mejoras de salud y ascensión épica.

import { DRAGONS_DATA } from "../data/dragons.js?v=6.1.0";
import { playSound } from "../utils/audio.js?v=6.1.0";
import { getDragonArtworkSrc } from "../svg/dragonSvg.js?v=6.1.0";

// Estado global de la Arena
let currentMode = "duel"; // "duel" | "tournament"

// Estado Modo Duelo 1 vs 1
let dragonA = null;
let dragonB = null;
let isBattling = false;
let battleInterval = null;

// Estado Modo Torneo Roguelite
let playerDragon = null;
let tournamentStage = 0; // 0 = selección, 1 = Octavos, 2 = Cuartos, 3 = Semifinal, 4 = Gran Final, 5 = Campeón Absoluto
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

  renderArenaContainer(container);
}

function pickRandomRival() {
  const otherDragons = DRAGONS_DATA.filter(d => !dragonA || d.id !== dragonA.id);
  const randomIndex = Math.floor(Math.random() * otherDragons.length);
  dragonB = otherDragons[randomIndex] || DRAGONS_DATA[1];
}

// Switch entre Modo Duelo y Modo Torneo
window.switchArenaMode = function(mode) {
  if (isBattling || isTournamentBattling) return;
  currentMode = mode;
  playSound("click");
  const container = document.getElementById("arena-container") || document.getElementById("coliseo-container");
  if (container) renderArenaContainer(container);
};

function renderArenaContainer(container) {
  container.innerHTML = `
    <div style="max-width: 1050px; margin: 0 auto;">
      
      <!-- SELECTOR DE MODO DE JUEGO (TABS DE LA ARENA) -->
      <div style="display: flex; justify-content: center; gap: 12px; margin-bottom: 1.5rem; flex-wrap: wrap;">
        <button type="button" class="btn ${currentMode === 'duel' ? 'btn-gold' : 'btn-secondary'}" onclick="switchArenaMode('duel')" style="padding: 10px 22px; font-weight: 700; font-size: 1rem; border-radius: 20px;">
          ⚔️ Duelo Rápido 1 vs 1
        </button>
        <button type="button" class="btn ${currentMode === 'tournament' ? 'btn-gold' : 'btn-secondary'}" onclick="switchArenaMode('tournament')" style="padding: 10px 22px; font-weight: 700; font-size: 1rem; border-radius: 20px;">
          🏆 El Torneo del Santuario (Modo Copa)
        </button>
      </div>

      <!-- CONTENIDO DEL MODO ACTIVO -->
      <div id="arena-mode-content">
        ${currentMode === 'duel' ? renderDuelViewHtml() : renderTournamentViewHtml()}
      </div>

    </div>
  `;
}

/* ==========================================================================
   1. MODO DUELO RÁPIDO 1 VS 1
   ========================================================================== */

function renderDuelViewHtml() {
  const optionsHtmlA = DRAGONS_DATA.map(d => 
    `<option value="${d.id}" ${dragonA && d.id === dragonA.id ? "selected" : ""}>${d.name} (${d.element})</option>`
  ).join("");

  const optionsHtmlB = DRAGONS_DATA.map(d => 
    `<option value="${d.id}" ${dragonB && d.id === dragonB.id ? "selected" : ""}>${d.name} (${d.element})</option>`
  ).join("");

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

          <select class="filter-select fighter-select" onchange="selectDuelDragon('A', this.value)" ${isBattling ? "disabled" : ""}>
            ${optionsHtmlA}
          </select>

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
            <strong style="color: #ff6b6b;">Debilidad:</strong> ${dragonA.weakness}
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

          <select class="filter-select fighter-select" onchange="selectDuelDragon('B', this.value)" ${isBattling ? "disabled" : ""}>
            ${optionsHtmlB}
          </select>

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
  const container = document.getElementById("arena-container") || document.getElementById("coliseo-container");
  if (container) renderArenaContainer(container);
};

window.startDragonDuel = function() {
  if (isBattling || !dragonA || !dragonB) return;
  if (dragonA.id === dragonB.id) {
    alert("¡Por favor elegí dos dragones distintos para el enfrentamiento!");
    return;
  }

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
    // Pantalla de Selección del Campeón para el Torneo
    const optionsHtml = DRAGONS_DATA.map(d => 
      `<option value="${d.id}" ${playerDragon && d.id === playerDragon.id ? "selected" : ""}>${d.name} (${d.element}) - Peligro ${d.danger}/5</option>`
    ).join("");

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

        <select class="filter-select" onchange="selectTournamentChampion(this.value)" style="width: 100%; font-size: 1rem; margin-bottom: 15px; font-weight: 600;">
          ${optionsHtml}
        </select>

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
    // Victoria Total del Torneo (Roguelite Complete)
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
            <img src="/assets/ui/trophy_champion.jpg" alt="Copa de Campeón del Santuario" style="width: 100%; height: auto; display: block;" />
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

  // Vista de Combate de Ronda de Torneo (Rondas 1, 2 y 3)
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

    <!-- MODAL / PANEL DE BENDICIONES ROGUELITE (OCULTO HASTA GANAR RONDA) -->
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
  // Generar 3 oponentes de dificultad creciente
  const pool = DRAGONS_DATA.filter(d => d.id !== playerDragon.id);
  
  // Rival 1: Peligro 2-3
  const easyPool = pool.filter(d => d.danger <= 3);
  const opp1 = easyPool[Math.floor(Math.random() * easyPool.length)] || pool[0];
  
  // Rival 2: Peligro 3-4
  const medPool = pool.filter(d => d.id !== opp1.id && d.danger >= 3 && d.danger <= 4);
  const opp2 = medPool[Math.floor(Math.random() * medPool.length)] || pool[1];

  // Rival 3 (Jefe Final): Peligro 5
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
  // El rival final tiene más salud
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

    // Turno del Jugador
    let dmgToOpp = 0;
    let isCrit = false;

    if (!firstTournamentStrikeUsed) {
      // El primer golpe inaugural de todo el torneo asesta 57 de daño
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

    // Turno del Oponente
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
    // Ganó la final absoluta
    setTimeout(() => {
      tournamentStage = 5;
      const container = document.getElementById("arena-container") || document.getElementById("coliseo-container");
      if (container) renderArenaContainer(container);
    }, 1500);
  } else {
    // Ofrecer 3 bendiciones roguelite aleatorias
    showRelicSelectionModal();
  }
}

function showRelicSelectionModal() {
  const modal = document.getElementById("relic-reward-modal");
  const optContainer = document.getElementById("relic-options-container");
  if (!modal || !optContainer) return;

  // Seleccionar 3 bendiciones al azar del pool
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
}
