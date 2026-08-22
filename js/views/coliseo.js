// Coliseo de Dragones - Duelo Rápido 1 vs 1
// Combate automático por asaltos con ventajas elementales, debilidades, animaciones y crónica épica

import { DRAGONS_DATA } from "../data/dragons.js?v=6.1.0";
import { playSound } from "../utils/audio.js?v=6.1.0";
import { getDragonArtworkSrc } from "../svg/dragonSvg.js?v=6.1.0";

let dragonA = null;
let dragonB = null;
let isBattling = false;
let battleInterval = null;

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

export function initColiseoModule(containerId = "arena-container") {
  const container = document.getElementById("arena-container") || document.getElementById(containerId);
  if (!container) return;

  if (!dragonA) {
    // Dragón por defecto (Fafnir #2)
    dragonA = DRAGONS_DATA.find(d => d.id === 2) || DRAGONS_DATA[0];
  }
  if (!dragonB) {
    // Dragón rival aleatorio
    pickRandomRival();
  }

  renderColiseoUI(container);
}

function pickRandomRival() {
  const otherDragons = DRAGONS_DATA.filter(d => !dragonA || d.id !== dragonA.id);
  const randomIndex = Math.floor(Math.random() * otherDragons.length);
  dragonB = otherDragons[randomIndex] || DRAGONS_DATA[1];
}

window.selectDuelDragon = function(fighterKey, dragonId) {
  if (isBattling) return;
  const selected = DRAGONS_DATA.find(d => d.id === parseInt(dragonId));
  if (!selected) return;

  if (fighterKey === "A") {
    dragonA = selected;
  } else {
    dragonB = selected;
  }
  playSound("click");
  const container = document.getElementById("arena-container") || document.getElementById("coliseo-container");
  if (container) renderColiseoUI(container);
};

window.randomizeFighter = function(fighterKey) {
  if (isBattling) return;
  playSound("click");
  const randomIndex = Math.floor(Math.random() * DRAGONS_DATA.length);
  if (fighterKey === "A") {
    dragonA = DRAGONS_DATA[randomIndex];
  } else {
    dragonB = DRAGONS_DATA[randomIndex];
  }
  const container = document.getElementById("arena-container") || document.getElementById("coliseo-container");
  if (container) renderColiseoUI(container);
};

function renderColiseoUI(container) {
  const optionsHtmlA = DRAGONS_DATA.map(d => 
    `<option value="${d.id}" ${dragonA && d.id === dragonA.id ? "selected" : ""}>${d.name} (${d.element})</option>`
  ).join("");

  const optionsHtmlB = DRAGONS_DATA.map(d => 
    `<option value="${d.id}" ${dragonB && d.id === dragonB.id ? "selected" : ""}>${d.name} (${d.element})</option>`
  ).join("");

  container.innerHTML = `
    <div style="max-width: 1050px; margin: 0 auto;">
      
      <!-- HERO BANNER ARENA -->
      <div class="fantasy-panel text-center margin-bottom-lg" style="padding: 2rem; background: linear-gradient(135deg, rgba(230,57,70,0.18), rgba(233,196,106,0.12)); border: 2px solid #e63946; border-radius: 20px;">
        <div style="font-size: 2.8rem; margin-bottom: 6px;">⚔️🔥</div>
        <h2 style="color: var(--gold-main); font-size: 2rem; margin: 0; font-family: var(--font-heading);">La Arena Ancestral: Duelo de Dragones</h2>
        <p style="color: var(--text-main); font-size: 1.05rem; max-width: 750px; margin: 8px auto 0 auto; line-height: 1.6;">
          ¡Elegí a dos titanes del Santuario y presenciá un combate legendario por turnos! El nivel de peligro, la afinidad de elementos y los puntos débiles sellarán el destino de la arena.
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
      <div class="fantasy-panel" style="padding: 1.6rem; border: 2px solid var(--border-gold); background: rgba(10, 9, 17, 0.95); border-radius: 16px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid var(--border-panel); padding-bottom: 8px;">
          <h3 style="color: var(--gold-main); margin: 0; font-size: 1.25rem; display: flex; align-items: center; gap: 8px;">
            📜 Crónica Épica de la Batalla
          </h3>
          <span id="round-indicator" style="color: var(--text-muted); font-size: 0.9rem; font-weight: bold;">Listo para el combate</span>
        </div>

        <div id="battle-log-box" style="height: 180px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding-right: 8px; font-size: 0.95rem; line-height: 1.5; color: var(--text-main);">
          <div style="color: var(--text-muted); font-style: italic; text-align: center; padding-top: 60px;">
            Presioná "¡COMBATIR!" para dar inicio a los rugidos en el Coliseo...
          </div>
        </div>
      </div>

    </div>
  `;
}

window.resetDragonDuel = function() {
  if (battleInterval) clearInterval(battleInterval);
  isBattling = false;
  const container = document.getElementById("arena-container") || document.getElementById("coliseo-container");
  if (container) renderColiseoUI(container);
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

  // Determinar quién tiene ventaja elemental
  const advA = (ELEMENTAL_ADVANTAGE[dragonA.element] || []).includes(dragonB.element);
  const advB = (ELEMENTAL_ADVANTAGE[dragonB.element] || []).includes(dragonA.element);

  // Inicializar log
  appendBattleLog(`⚔️ <strong>¡Comienza el duelo épico entre ${dragonA.name} y ${dragonB.name}!</strong>`, "gold");

  if (advA) {
    appendBattleLog(`🔥 ¡Ventaja Elemental! El elemento <strong>${dragonA.element}</strong> de ${dragonA.name} domina al <strong>${dragonB.element}</strong> de ${dragonB.name}.`, "teal");
  } else if (advB) {
    appendBattleLog(`⚡ ¡Ventaja Elemental! El elemento <strong>${dragonB.element}</strong> de ${dragonB.name} domina al <strong>${dragonA.element}</strong> de ${dragonA.name}.`, "rust");
  }

  // Loop de asaltos por intervalo
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

    // Turno de B atacando a A (con breve delay en log)
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
      // Clímax final si el combate se prolonga
      hpA > hpB ? endBattle(dragonA, dragonB) : endBattle(dragonB, dragonA);
    }
  }, 1400);
};

function calculateAttack(attacker, defender, hasAdvantage) {
  const basePower = attacker.danger * 7 + Math.floor(Math.random() * 8);
  const elementBonus = hasAdvantage ? 8 : 0;
  
  // Chance de crítico si la habilidad del atacante coincide temáticamente con el enemigo
  const isCrit = Math.random() < 0.35 || hasAdvantage;
  const critMultiplier = isCrit ? 1.4 : 1.0;

  const totalDamage = Math.round((basePower + elementBonus) * critMultiplier);

  const attackNarratives = [
    `¡<strong>${attacker.name}</strong> desata su <em>${attacker.ability}</em> causando <strong>${totalDamage}</strong> de daño!`,
    `¡<strong>${attacker.name}</strong> embiste con toda la fuerza de su cuerpo tipo <em>${attacker.type}</em> propinando <strong>${totalDamage}</strong> de daño a ${defender.name}!`,
    `¡<strong>${attacker.name}</strong> invoca una ráfaga de poder <em>${attacker.element}</em> impactando con <strong>${totalDamage}</strong> de daño!`
  ];

  let chosenNarrative = attackNarratives[Math.floor(Math.random() * attackNarratives.length)];
  if (isCrit) {
    chosenNarrative = `💥 ¡GOLPE CRÍTICO! ` + chosenNarrative;
  }

  return {
    damage: totalDamage,
    isCrit: isCrit,
    log: chosenNarrative
  };
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
  if (btnReset) {
    btnReset.style.display = "inline-block";
  }
}
