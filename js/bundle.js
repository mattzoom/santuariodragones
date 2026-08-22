/* SANTUARIO SECRETO DE DRAGONES - UNIFIED STANDALONE BUNDLE v7.0.0 */

(function() {

  'use strict';



  // 1. UTILS

function initParticlesCanvas(canvasId = "particle-canvas") {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    canvas.style.display = "none";
    return;
  }

  function getParticleCount() {
    return window.innerWidth < 768 ? 18 : 40;
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  let particles = Array.from({ length: getParticleCount() }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2.2 + 0.8,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    alpha: Math.random() * 0.55 + 0.15
  }));

  let isAnimating = true;

  function animate() {
    if (!isAnimating) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(233, 196, 106, ${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  // Pause animation when tab is inactive to save battery and GPU
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      isAnimating = false;
    } else {
      if (!isAnimating) {
        isAnimating = true;
        animate();
      }
    }
  });

  animate();
}



let isMuted = false;
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioClass = window.AudioContext || window.webkitAudioContext;
    if (AudioClass) {
      audioCtx = new AudioClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSound(type) {
  if (isMuted) return;
  
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === "click") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);

    } else if (type === "roar") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.linearRampToValueAtTime(180, now + 0.3);
      osc.frequency.linearRampToValueAtTime(80, now + 0.8);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.8);

    } else if (type === "chime" || type === "magic") {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.12, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.5);
      });

    } else if (type === "drum") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);

    } else if (type === "rune") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);

    } else if (type === "hit") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.12);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);

    } else if (type === "clash") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(120, now + 0.2);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);

    } else if (type === "victory") {
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.2, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.4);
      });
    }
  } catch (e) {
    console.warn("Web Audio synthesis error:", e);
  }
}

function toggleSound() {
  isMuted = !isMuted;
  const btn = document.getElementById("btn-audio-toggle");
  if (btn) {
    btn.textContent = isMuted ? "🔇 Sonido: OFF" : "🔊 Sonido: ON";
  }
  if (!isMuted) {
    playSound("click");
  }
  return isMuted;
}



const favoritesSet = new Set(JSON.parse(localStorage.getItem("santuario_favorites") || "[]"));

function isFavorite(dragonId) {
  return favoritesSet.has(dragonId);
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

function getFavoritesSet() {
  return favoritesSet;
}



/**
 * Austin Osman Spare Consonant Filtering Algorithm
 * Removes vowels (including accents) and ANY consonant that appears more than once in the total phrase.
 */
function extractConsonants(str1 = "", str2 = "") {
  const combined = (str1 + " " + str2).toUpperCase();
  const normalized = combined.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const vowels = new Set(["A", "E", "I", "O", "U"]);

  const lettersOnly = [];
  for (let ch of normalized) {
    if (ch >= "A" && ch <= "Z") {
      lettersOnly.push(ch);
    }
  }

  const freq = {};
  for (let ch of lettersOnly) {
    if (!vowels.has(ch)) {
      freq[ch] = (freq[ch] || 0) + 1;
    }
  }

  const result = [];
  for (let ch of lettersOnly) {
    if (!vowels.has(ch) && freq[ch] === 1) {
      if (!result.includes(ch)) {
        result.push(ch);
      }
    }
  }

  return result.length > 0 ? result : ["M", "D", "T"];
}



// Dragon Script dictionary mapping standard uppercase letters to custom SVG vector paths matching the official "Guía de Equivalencias Latino a Dragon" chart
const DRAGON_SCRIPT_MAP = {
  'A': { 
    glyph: 'S-Dragon', 
    desc: 'Serpiente Alada S-Curva', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 32 10 C 15 8 10 20 25 25 C 40 30 35 44 15 42 M 15 42 L 10 38 M 15 42 L 20 38" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'B': { 
    glyph: 'Mars-Circle', 
    desc: 'Símbolo del Marte Draconiano', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><circle cx="22" cy="28" r="12" fill="none" stroke="currentColor" stroke-width="3.5"/><path d="M 31 19 L 42 8 M 42 8 L 32 8 M 42 8 L 42 18" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'C': { 
    glyph: 'Zigzag-Crown', 
    desc: 'Corona Zigzag de la Caverna (C / K)', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 8 18 L 50 18 M 8 28 L 18 18 L 28 32 L 38 18 L 48 28" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'D': { 
    glyph: 'Diamond-Rune', 
    desc: 'Rombo Sagrado de la Fortaleza', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 25 8 L 40 25 L 25 42 L 10 25 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'E': { 
    glyph: 'Circle-Arrows', 
    desc: 'Círculo con Flechas Horizontales', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><circle cx="25" cy="25" r="9" fill="none" stroke="currentColor" stroke-width="3.5"/><path d="M 6 25 L 44 25 M 6 25 L 12 20 M 6 25 L 12 30 M 44 25 L 38 20 M 44 25 L 38 30" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'F': { 
    glyph: 'Trident-Cross', 
    desc: 'Cruz de la Llama Ancestral', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 12 25 L 38 25 M 25 12 L 25 38 M 16 16 C 25 22 25 22 34 16 M 16 34 C 25 28 25 28 34 34" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'G': { 
    glyph: 'Spiral-Spiral', 
    desc: 'Espiral Doble Infinita', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 25 25 C 12 20 12 8 25 8 C 38 8 38 20 25 25 C 12 30 12 42 25 42 C 38 42 38 30 25 25" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'H': { 
    glyph: 'Diamond-Horns', 
    desc: 'Rombo con Cuernos Superiores', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 25 18 L 38 30 L 25 42 L 12 30 Z M 12 30 L 8 12 M 38 30 L 42 12" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'I': { 
    glyph: 'Crossed-Arrows', 
    desc: 'Garras Cruzadas del Rayo (I / J)', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 12 10 L 38 40 M 38 10 L 12 40 M 12 40 L 12 30 M 12 40 L 22 40 M 38 40 L 38 30 M 38 40 L 28 40" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'J': { 
    glyph: 'Crossed-Arrows', 
    desc: 'Garras Cruzadas del Rayo (I / J)', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 12 10 L 38 40 M 38 10 L 12 40 M 12 40 L 12 30 M 12 40 L 22 40 M 38 40 L 38 30 M 38 40 L 28 40" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'K': { 
    glyph: 'Zigzag-Crown', 
    desc: 'Corona Zigzag de la Caverna (C / K)', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 8 18 L 50 18 M 8 28 L 18 18 L 28 32 L 38 18 L 48 28" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'L': { 
    glyph: 'Arrow-Down-Dot', 
    desc: 'Flecha de Anclaje a la Tierra', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 25 12 L 25 40 M 25 40 L 18 32 M 25 40 L 32 32" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="25" cy="10" r="3" fill="currentColor"/></svg>`
  },
  'M': { 
    glyph: 'Double-Arch', 
    desc: 'Alas Gemelas del Vuelo', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 10 40 L 10 22 C 10 10 25 10 25 22 C 25 10 40 10 40 22 L 40 40" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'N': { 
    glyph: 'Gate-Square', 
    desc: 'Puerta Portal de la Montaña', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 12 40 L 12 18 C 12 10 38 10 38 18 L 38 40 M 20 40 L 20 26 C 20 20 30 20 30 26 L 30 40" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'O': { 
    glyph: 'Circle-Portal', 
    desc: 'Anillo del Ojo de Cristal', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><circle cx="25" cy="25" r="15" fill="none" stroke="currentColor" stroke-width="3.5"/></svg>`
  },
  'P': { 
    glyph: 'Triangle-Points', 
    desc: 'Triángulo con Puntos Astrales', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 25 10 L 40 38 L 10 38 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="25" cy="10" r="3" fill="currentColor"/><circle cx="10" cy="38" r="3" fill="currentColor"/><circle cx="40" cy="38" r="3" fill="currentColor"/></svg>`
  },
  'Q': { 
    glyph: 'Circle-Portal', 
    desc: 'Anillo del Ojo de Cristal', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><circle cx="25" cy="25" r="15" fill="none" stroke="currentColor" stroke-width="3.5"/></svg>`
  },
  'R': { 
    glyph: 'Arch-Points', 
    desc: 'Arco del Firmamento', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 10 38 C 10 15 40 15 40 38" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><circle cx="10" cy="38" r="3" fill="currentColor"/><circle cx="40" cy="38" r="3" fill="currentColor"/></svg>`
  },
  'S': { 
    glyph: 'Percent-Rune', 
    desc: 'Tijera del Viento Divino', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 12 40 L 38 10 M 16 16 L 34 34 M 14 20 L 20 14 M 30 36 L 36 30" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'T': { 
    glyph: 'T-Rune', 
    desc: 'Sello de la Tierra Sagrada', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 10 14 L 40 14 M 25 14 L 25 36 M 25 36 L 18 42 M 25 36 L 32 42" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'U': { 
    glyph: 'Calix-Rune', 
    desc: 'Cáliz de las Mareas (U / V)', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 10 10 L 10 30 C 10 42 40 42 40 30 L 40 10 M 25 10 L 25 36" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'V': { 
    glyph: 'Triangle-Down', 
    desc: 'Triángulo Invertido del Fuego (U / V)', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 10 12 L 40 12 L 25 40 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'W': { 
    glyph: 'Triangle-Loop-Down', 
    desc: 'Triángulo Invertido con Lazo', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 10 18 L 40 18 L 25 42 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="25" cy="11" r="3" fill="none" stroke="currentColor" stroke-width="3"/></svg>`
  },
  'X': { 
    glyph: 'Cross-Dots', 
    desc: 'Cruz de los Cuatro Vientos', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 10 25 L 40 25 M 25 10 L 25 40" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><circle cx="10" cy="25" r="3" fill="currentColor"/><circle cx="40" cy="25" r="3" fill="currentColor"/><circle cx="25" cy="10" r="3" fill="currentColor"/><circle cx="25" cy="40" r="3" fill="currentColor"/></svg>`
  },
  'Y': { 
    glyph: 'Cross-Slashed', 
    desc: 'Estrella Tachada de las Nebulosas', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 8 25 L 42 25 M 25 8 L 25 42 M 12 12 L 38 38 M 38 12 L 12 38" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><circle cx="25" cy="25" r="8" fill="none" stroke="currentColor" stroke-width="3"/></svg>`
  },
  'Z': { 
    glyph: 'Anchor-T', 
    desc: 'Ancla del Inframundo', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 10 12 L 40 12 M 25 12 L 25 40 M 25 40 L 16 32 M 25 40 L 34 32" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  }
};

function translateToDragonScript(text) {
  if (!text) return [];
  const normalized = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
  
  const clean = normalized.replace(/[^A-Z\s]/g, '');
  return clean.split('').map(char => {
    if (char === ' ') {
      return {
        char: ' ',
        info: { glyph: ' ', desc: 'Espacio Mágico', svg: `<span style="display:inline-block; width:16px;"></span>` }
      };
    }
    return {
      char: char,
      info: DRAGON_SCRIPT_MAP[char] || { glyph: char, desc: 'Símbolo Mágico', svg: `<span style="font-size:1.5rem;">${char}</span>` }
    };
  });
}



  // 2. DATA

const DRAGONS_DATA = [
{
    id: 1, name: "Níðhöggr", title: "El Roedor de las Raíces del Mundo", mythology: "Nórdica y Germánica", type: "Wyrm", element: "Sombra", danger: 5,
    habitat: "Niflheim (El Inframundo Helado)", ability: "Aliento de Corrupción y Mordedura Ancestral", weakness: "Luz de la Aurora Boreal",
    scroll: "En los relatos vikingos antiguos, Níðhöggr vive bajo las raíces del gran árbol Yggdrasil. Se pasa la eternidad royendo sus raíces heladas para desestabilizar los nueve mundos. Los sabios del norte decían que cuando baje volando de las montañas con cadáveres en sus alas, el mundo cambiará para siempre.",
    physicalDescription: "wingless serpent-like dragon with coiled body and sharp claws featuring dark shadowed purple scales and abyssal twilight smoke with main colors #2b0036 and #990000",
    svgType: "wyrm", colorPrimary: "#2b0036", colorSecondary: "#990000", glowColor: "#bf00ff"
  },
{
    id: 2, name: "Fafnir", title: "El Guardián del Tesoro Maldito", mythology: "Nórdica y Germánica", type: "Dragón Europeo", element: "Fuego", danger: 4,
    habitat: "Breiðablik (Cueva de las Montañas)", ability: "Piel Impenetrable y Aliento de Fuego Dorado", weakness: "Punto débil oculto bajo su hombro izquierdo",
    scroll: "Fafnir era originalmente un príncipe enano tan codicioso que se transformó en un dragón colosal para proteger su tesoro de oro y el anillo maldito Andvaranaut. Su veneno quemaba el pasto por donde caminaba y su rugido hacía temblar los fiordos.",
    physicalDescription: "four-legged classic dragon with majestic wings and scaled chest featuring blazing fiery scales and glowing ember accents with main colors #664400 and #ffd700",
    svgType: "draco", colorPrimary: "#664400", colorSecondary: "#ffd700", glowColor: "#ffaa00"
  },
{
    id: 3, name: "Jörmungandr", title: "La Serpiente de Midgard", mythology: "Nórdica y Germánica", type: "Wyrm", element: "Agua", danger: 5,
    habitat: "Océano Global de Midgard", ability: "Maremotos Gigantescos y Veneno Letal Eitr", weakness: "El Martillo de Thor (Mjölnir)",
    scroll: "Hijo de Loki, este dragón marino creció tanto que logró rodear toda la Tierra y morderse su propia cola. Si llega a soltar su cola, las olas colosales cubrirán los continentes. Los marineros vikingos evitaban las aguas oscuras por miedo a despertar sus escamas turquesas.",
    physicalDescription: "wingless serpent-like dragon with coiled body and sharp claws featuring magical elemental aura with main colors #004d40 and #00bfa5",
    svgType: "shen", colorPrimary: "#004d40", colorSecondary: "#00bfa5", glowColor: "#18ffff"
  },
{
    id: 4, name: "Goinn", title: "El Excavador de la Niebla", mythology: "Nórdica y Germánica", type: "Wyrm", element: "Naturaleza", danger: 3,
    habitat: "Bosques Helados de Jotunheim", ability: "Camuflaje de Musgo y Excavación Relámpago", weakness: "Fuego Volcánico",
    scroll: "Un dragón subterráneo cubierto de líquenes y raíces fosilizadas. Pasaba siglos durmiendo bajo el suelo vikingo, alimentándose de minerales raros. Dicen que las grietas en las rocas de Noruega son rastros de sus antiguas excavaciones.",
    physicalDescription: "wingless serpent-like dragon with coiled body and sharp claws featuring magical elemental aura with main colors #1b5e20 and #81c784",
    svgType: "wyrm", colorPrimary: "#1b5e20", colorSecondary: "#81c784", glowColor: "#4caf50"
  },
{
    id: 5, name: "Moinn", title: "El Habitante de los Turbales", mythology: "Nórdica y Germánica", type: "Drake", element: "Tierra", danger: 3,
    habitat: "Pantanos de Skáney", ability: "Trampas de Lodo Espeso y Escamas de Piedra", weakness: "Vientos Fuertes",
    scroll: "Hermano de Goinn, Moinn habita en los pantanos donde la niebla nunca se disipa. Sus escamas son gruesas como baldosas de granito y se arrastra en el barro sin hacer un solo ruido.",
    physicalDescription: "majestic dragon featuring subterranean mossy stone scales and earthy amber glow with main colors #3e2723 and #8d6e63",
    svgType: "draco", colorPrimary: "#3e2723", colorSecondary: "#8d6e63", glowColor: "#d7ccc8"
  },
{
    id: 6, name: "Grabakr", title: "La Llama Gris de la Caverna", mythology: "Nórdica y Germánica", type: "Dragón Europeo", element: "Fuego", danger: 4,
    habitat: "Cavernas de Ceniza de Muspelheim", ability: "Aliento de Ceniza Ardiente y Visión Térmica", weakness: "Agua de Glaciar",
    scroll: "Cuyo nombre significa 'Lomo Gris', este dragón posee escamas de color carbón que se encienden al enfurecerse. Se cuenta que dormía cerca de los ríos de lava y usaba las rocas calientes como almohada.",
    physicalDescription: "four-legged classic dragon with majestic wings and scaled chest featuring blazing fiery scales and glowing ember accents with main colors #212121 and #ff5722",
    svgType: "draco", colorPrimary: "#212121", colorSecondary: "#ff5722", glowColor: "#ff9800"
  },
{
    id: 7, name: "Grafvolludr", title: "El Señor de las Fosas Ancestrales", mythology: "Nórdica y Germánica", type: "Wyrm", element: "Veneno", danger: 4,
    habitat: "Fosas de Hvergelmir", ability: "Nube Ácida Sulfurosa", weakness: "Aire Puro de las Alturas",
    scroll: "Habitante de las profundidades donde emanan los géiseres sulfurosos. Grafvolludr desprende un humo tóxico que desorienta a cualquiera que intente explorar su guarida subterránea.",
    physicalDescription: "wingless serpent-like dragon with coiled body and sharp claws featuring acidic emerald green scales and dripping venomous mist with main colors #33691e and #aed581",
    svgType: "wyrm", colorPrimary: "#33691e", colorSecondary: "#aed581", glowColor: "#76ff03"
  },
{
    id: 8, name: "Svafnir", title: "El Soporífero del Invierno", mythology: "Nórdica y Germánica", type: "Drake", element: "Hielo", danger: 3,
    habitat: "Cumbres Snow-Cap", ability: "Canto de Congelamiento Instantáneo", weakness: "Llama de Antorcha Solar",
    scroll: "Un dragón escarchado cuyo rugido suave suena como el viento de invierno produciendo sueño profundo en los viajeros. Sus escamas parecen cristales pulidos de hielo milenario.",
    physicalDescription: "majestic dragon featuring crystalline icy frost scales and glowing cyan frost aura with main colors #006064 and #80deea",
    svgType: "draco", colorPrimary: "#006064", colorSecondary: "#80deea", glowColor: "#00e5ff"
  },
{
    id: 9, name: "Ofnir", title: "El Enroscado de la Niebla", mythology: "Nórdica y Germánica", type: "Wyrm", element: "Viento", danger: 4,
    habitat: "Cielos de Asgard", ability: "Vuelo Silencioso y Ciclón de Niebla", weakness: "Relámpagos",
    scroll: "Surcaba los cielos escandinavos camuflado en las nubes densas. Su cuerpo delgado y flexible le permitía deslizarse entre las corrientes de aire como una cinta dorada de luz difusa.",
    physicalDescription: "wingless serpent-like dragon with coiled body and sharp claws featuring magical elemental aura with main colors #455a64 and #cfd8dc",
    svgType: "shen", colorPrimary: "#455a64", colorSecondary: "#cfd8dc", glowColor: "#eceff1"
  },
{
    id: 10, name: "Lindwyrm de Götaland", title: "El Terror de los Caminos de Suecia", mythology: "Nórdica y Germánica", type: "Wyrm", element: "Tierra", danger: 4,
    habitat: "Valles de Götaland", ability: "Embestida Demoledora y Escamas Afiladas", weakness: "Leche Dulce y Espejos",
    scroll: "Un lindwyrm gigante sin alas, de cuerpo serpentino y dos potentes patas delanteras que aterrorizaba los antiguos caminos de Suecia. Los cuentos populares decían que si le ofrecías un tazón de leche recién ordeñada, se quedaba dormido pacíficamente.",
    physicalDescription: "wingless serpent-like dragon with two strong front legs, coiled scaly body and horns, resting over a stone wall in misty Swedish pine forest, Wyrm dragon with Tierra powers in Valles de Götaland",
    svgType: "wyrm", colorPrimary: "#4a148c", colorSecondary: "#ab47bc", glowColor: "#e040fb"
  },
{
    id: 11, name: "Ladón", title: "El Guardián de las Manzanas Doradas", mythology: "Griega y Romana", type: "Hidra", element: "Tierra", danger: 3,
    habitat: "El Jardín de las Hespérides", ability: "100 Cabezas Parlantes y Sueño Inexistente", weakness: "Las Flechas con Veneno de Hidra",
    scroll: "Este mítico dragón de cien cabezas nunca dormía. Cada cabeza hablaba en un idioma o tono distinto para confundir a los intrusos que intentaban robar las manzanas de oro sagradas de la diosa Hera. Fue enfrentado por el legendario Hércules.",
    physicalDescription: "multi-headed serpentine hydra dragon with multiple long necks featuring subterranean mossy stone scales and earthy amber glow with main colors #b71c1c and #ffb74d",
    svgType: "hidra", colorPrimary: "#b71c1c", colorSecondary: "#ffb74d", glowColor: "#ff9100"
  },
{
    id: 12, name: "Hidra de Lerna", title: "La Bestia del Pantano Infinito", mythology: "Griega y Romana", type: "Hidra", element: "Agua", danger: 5,
    habitat: "Lago de Lerna", ability: "Regeneración Cabeza por Cabeza y Sangre Ácida", weakness: "Fuego Cauterizador",
    scroll: "Criatura acuática con múltiples cabezas de serpiente. Si le cortabas una cabeza, le crecían dos más inmediatamente. Su aliento era tan venenoso que bastaba con respirar cerca de su guarida para caer en un trance profundo.",
    physicalDescription: "multi-headed serpentine hydra dragon with multiple long necks featuring acidic emerald green scales and dripping venomous mist with main colors #1b5e20 and #00e676",
    svgType: "hidra", colorPrimary: "#1b5e20", colorSecondary: "#00e676", glowColor: "#b2ff59"
  },
{
    id: 13, name: "Pitón de Delfos", title: "La Serpiente del Oráculo", mythology: "Griega y Romana", type: "Wyrm", element: "Tierra", danger: 4,
    habitat: "Monte Parnaso", ability: "Terremotos Locales y Soplido de Tierra Chocante", weakness: "Flechas Doradas del Dios Apolo",
    scroll: "Hija de la diosa Gaia, esta serpiente-dragón custodiaba el centro de la Tierra en Delfos. Sus escamas imitaban los colores de las rocas y el barro, y su cuerpo era tan ancho como un roble milenario.",
    physicalDescription: "wingless serpent-like dragon with coiled body and sharp claws featuring subterranean mossy stone scales and earthy amber glow with main colors #4e342e and #bcaaa4",
    svgType: "wyrm", colorPrimary: "#4e342e", colorSecondary: "#bcaaa4", glowColor: "#d7ccc8"
  },
{
    id: 14, name: "Dragón de Colquide", title: "El Insonmne del Vellocino de Oro", mythology: "Griega y Romana", type: "Dragón Europeo", element: "Tormenta", danger: 3,
    habitat: "Bosque Sagrado de Ares (Colquide)", ability: "Silbido Ensordecedor y Mirada Hipnótica", weakness: "Pociones Lulaby de la Hechicera Medea",
    scroll: "Enroscado al árbol donde colgaba el mítico Vellocino de Oro. Nunca cerraba los ojos y su silbido se escuchaba a millas de distancia. Jasón y los Argonautas solo lograron vencerlo gracias a un filtro mágico de sueño que preparó Medea.",
    physicalDescription: "four-legged classic dragon with majestic wings and scaled chest featuring electric crackling scales and sparkling lightning sparks with main colors #f57f17 and #fff59d",
    svgType: "draco", colorPrimary: "#f57f17", colorSecondary: "#fff59d", glowColor: "#ffff00"
  },
{
    id: 15, name: "Dragón de Ismene", title: "El Guardián de la Fuente de Ares", mythology: "Griega y Romana", type: "Drakón", element: "Agua", danger: 4,
    habitat: "Fuente Manantial de Tebas", ability: "Chorros de Agua a Gran Presión y Dientes de Guerrero", weakness: "Lanzas de Bronce Templado",
    scroll: "Hijo de Ares, este dragón protegía las aguas sagradas de Tebas. Cuando el héroe Cadmo lo derrotó, sembró sus dientes en la tierra y de ellos nacieron guerreros armados completos con escudos de bronce.",
    physicalDescription: "majestic dragon featuring magical elemental aura with main colors #00695c and #80cbc4",
    svgType: "draco", colorPrimary: "#0d47a1", colorSecondary: "#64b5f6", glowColor: "#40c4ff"
  },
{
    id: 16, name: "Ceto", title: "El Monstruo de las Profundidades Abisales", mythology: "Griega y Romana", type: "Drakón", element: "Agua", danger: 4,
    habitat: "Mar Egeo", ability: "Tsunamis Embajadores y Escamas de Arrecife", weakness: "Reflejo del Escudo de Atenea",
    scroll: "Un voraz dragón marino enviado por Poseidón. Poseía aletas gigantescas que parecían alas de murciélago submarinas y dientes como estalactitas de roca volcánica.",
    physicalDescription: "oriental long serpentine dragon with flowing whiskers and floating crest featuring magical elemental aura with main colors #002171 and #5472d3",
    svgType: "shen", colorPrimary: "#002171", colorSecondary: "#5472d3", glowColor: "#80d8ff"
  },
{
    id: 17, name: "Campe", title: "La Carcelera del Tártaro", mythology: "Griega y Romana", type: "Hidra", element: "Sombra", danger: 5,
    habitat: "Abismo del Tártaro", ability: "Cola de Escorpión Venom y 50 Cabezas de Bestias", weakness: "El Rayo Primordial de Zeus",
    scroll: "Monstruosa guardiana que custodiaba a los Cíclopes en el inframundo. Su cuerpo combinaba partes de dragón, serpientes en los pies y alas oscuras que tapaban las estrellas.",
    physicalDescription: "multi-headed serpentine hydra dragon with multiple long necks featuring dark shadowed purple scales and abyssal twilight smoke with main colors #1a237e and #9c27b0",
    svgType: "hidra", colorPrimary: "#1a237e", colorSecondary: "#9c27b0", glowColor: "#ea80fc"
  },
{
    id: 18, name: "Tifón Dragón", title: "El Titán de los Cien Huracanes", mythology: "Griega y Romana", type: "Otros", element: "Tormenta", danger: 5,
    habitat: "Monte Etna", ability: "Llamaradas de Azufre y Vientos Ciclónicos", weakness: "El Rayo Maestro del Olimpo",
    scroll: "Considerado el padre de todos los monstruos griegos. Sus cabezas tocaban las estrellas y de sus ojos salía un fuego violento capaz de derretir montañas enteras.",
    physicalDescription: "four-legged classic dragon with majestic wings and scaled chest featuring magical elemental aura with main colors #311b92 and #ff1744",
    svgType: "draco", colorPrimary: "#311b92", colorSecondary: "#ff1744", glowColor: "#ff5252"
  },
{
    id: 19, name: "Drakon Nemeios", title: "El Dragón de los Viñedos", mythology: "Griega y Romana", type: "Drakón", element: "Naturaleza", danger: 2,
    habitat: "Valles de Peloponeso", ability: "Camuflaje entre las Vides y Crecimiento Veloz", weakness: "Frío Extremo",
    scroll: "Un pequeño dragón de las colinas griegas que solía proteger los viñedos de las plagas comiéndose a los roedores y expulsando un suave vapor con olor a uvas dulces.",
    physicalDescription: "majestic dragon featuring magical elemental aura with main colors #33691e and #c0ca33",
    svgType: "draco", colorPrimary: "#33691e", colorSecondary: "#c0ca33", glowColor: "#eeff41"
  },
{
    id: 20, name: "Leviatán", title: "El Titán Definitivo de las Profundidades", mythology: "Mesopotámica y Medio Oriente", type: "Otros", element: "Agua", danger: 5,
    habitat: "Abismo del Océano Primordial", ability: "Hervor del Océano y Chispas de Fuego Abrasador", weakness: "Las Cadenas Celestiales de los Tiempos",
    scroll: "Un dragón de agua de casi 500 kilómetros. Leviatán es el titán definitivo de las profundidades: cuando tiene hambre, el calor de sus fauces hace hervir el océano. Su anatomía es una máquina de guerra. Lomo blindado por hileras de escamas durísimas y dientes como navajas. Los ojos brillan, rojos y dorados, como el primer destello del amanecer. De la boca le saltan chispas; de la nariz, un humo espeso. Si se despierta, trae rayos y vendavales que parten el cielo.",
    physicalDescription: "colossal ancient sea serpent wyrm dragon with dark armored scaly spine, razor-sharp teeth, glowing golden-red eyes, exhaling fire sparks and steam mist into boiling ocean storm with lightning, Wyrm dragon with Agua powers in Abismo del Océano Primordial",
    svgType: "wyrm", colorPrimary: "#1a237e", colorSecondary: "#ff6f00", glowColor: "#ffab00"
  },
{
    id: 21, name: "Shen Lung", title: "El Dragón Espíritu del Clima", mythology: "Oriental (Asia)", type: "Shen", element: "Tormenta", danger: 3,
    habitat: "Nubes del Cielo Celestial", ability: "Control del Lluvia, Viento y Rayos Benditos", weakness: "Falta de Respeto a la Naturaleza",
    scroll: "Dragón azul brillante que vuela sin necesidad de alas. En la antigua China, los agricultores le ofrecían cantos y té para que trajera lluvias suaves a las cosechas de arroz. Es considerado un símbolo de sabiduría y prosperidad.",
    physicalDescription: "oriental long serpentine dragon with flowing whiskers and floating crest featuring magical elemental aura with main colors #0277bd and #81d4fa",
    svgType: "shen", colorPrimary: "#0277bd", colorSecondary: "#81d4fa", glowColor: "#00b0ff"
  },
{
    id: 22, name: "T'ien Lung", title: "El Dragón Celestial de los Dioses", mythology: "Oriental (Asia)", type: "Shen", element: "Luz", danger: 4,
    habitat: "Palacios de las Estrellas", ability: "Escudo de Luz Divina y Vuelo Cómico", weakness: "Niebla de Engaño",
    scroll: "El encargado de tirar de los carros de los dioses celestiales y proteger los palacios del cielo. Sus escamas brillan como si tuviera incrustadas miles de gemas estelares.",
    physicalDescription: "oriental long serpentine dragon with flowing whiskers and floating crest featuring golden radiant celestial scales and brilliant solar sparks with main colors #fbc02d and #fff9c4",
    svgType: "shen", colorPrimary: "#fbc02d", colorSecondary: "#fff9c4", glowColor: "#ffff8d"
  },
{
    id: 23, name: "Ti Lung", title: "El Dragón de la Tierra y los Ríos", mythology: "Oriental (Asia)", type: "Wyrm", element: "Agua", danger: 3,
    habitat: "Profundidades del Río Amarillo", ability: "Moldeo de Canales de Agua y Terremotos Suaves", weakness: "Sequía Extrema",
    scroll: "Dragón terrestre que habita bajo el lecho de los grandes ríos de Asia. Se decía que cuando Ti Lung nadaba por debajo de la tierra, creaba fértiles valles y manantiales cristalinos.",
    physicalDescription: "wingless serpent-like dragon with coiled body and sharp claws featuring subterranean mossy stone scales and earthy amber glow with main colors #5d4037 and #d7ccc8",
    svgType: "wyrm", colorPrimary: "#5d4037", colorSecondary: "#d7ccc8", glowColor: "#bcaaa4"
  },
{
    id: 24, name: "Fu-ts'an Lung", title: "El Dragón de los Tesoros Ocultos", mythology: "Oriental (Asia)", type: "Shen", element: "Magma", danger: 4,
    habitat: "Volcanes y Minas de Jade", ability: "Geiseres de Lava y Creación de Diamantes", weakness: "Agua Bendita de Manantial",
    scroll: "Este dragón vive en las profundidades del volcán custodiando los metales preciosos y gemas del planeta. Cuando emerge a la superficie para saludar al sol, crea un volcán con su aliento candente.",
    physicalDescription: "oriental long serpentine dragon with flowing whiskers and floating crest featuring volcano lava scales with glowing molten core with main colors #d84315 and #ffab91",
    svgType: "shen", colorPrimary: "#d84315", colorSecondary: "#ffab91", glowColor: "#ff6e40"
  },
{
    id: 25, name: "Ying-lung", title: "El Dragón Alado con Caimán", mythology: "Oriental (Asia)", type: "Shen", element: "Agua", danger: 4,
    habitat: "Lagos Ancestrales de Hubei", ability: "Canalización de Riadas y Control de Vientos", weakness: "Flechas de Bambú Sagrado",
    scroll: "El único dragón oriental tradicional con grandes alas de pluma de águila. Ayudó al mítico emperador Yu a detener las grandes inundaciones dibujando canales en la tierra con su larga cola.",
    physicalDescription: "four-legged classic dragon with majestic wings and scaled chest featuring magical elemental aura with main colors #00695c and #80cbc4",
    svgType: "draco", colorPrimary: "#00695c", colorSecondary: "#80cbc4", glowColor: "#64ffda"
  },
{
    id: 26, name: "Lung Wang", title: "El Rey Dragón de los Cuatro Mares", mythology: "Oriental (Asia)", type: "Shen", element: "Agua", danger: 5,
    habitat: "Palacio de Cristal bajo el Mar", ability: "Transformación Humana y Dominio de las Mareas", weakness: "Perla Maravillosa Robada",
    scroll: "Gobernador supremo de los cuatro océanos (Norte, Sur, Este y Oeste). Vive en un palacio construido con coral y perlas cristalinas, rodeado de un ejército de generales peces y mariscos mágicos.",
    physicalDescription: "oriental long serpentine dragon with flowing whiskers and floating crest featuring magical elemental aura with main colors #1565c0 and #90caf9",
    svgType: "shen", colorPrimary: "#1565c0", colorSecondary: "#90caf9", glowColor: "#448aff"
  },
{
    id: 27, name: "Yamata no Orochi", title: "La Serpiente de Ocho Cabezas y Ocho Colas", mythology: "Oriental (Asia)", type: "Hidra", element: "Sombra", danger: 5,
    habitat: "Provincia de Izumo (Japón)", ability: "Rugido Sembrador de Caos y Ojos como Linternas de Fuego", weakness: "Sake de Ocho Veces Refinado",
    scroll: "Gigantesco dragón japonés con 8 cabezas y 8 colas, cuyo cuerpo ocupaba ocho valles y ocho colinas. En sus espaldas crecían musgo, cipreses y cedros antiguos. Fue vencido por el astuto dios Susanoo.",
    physicalDescription: "multi-headed serpentine hydra dragon with multiple long necks featuring dark shadowed purple scales and abyssal twilight smoke with main colors #4a148c and #e1bee7",
    svgType: "hidra", colorPrimary: "#4a148c", colorSecondary: "#e1bee7", glowColor: "#d500f9"
  },
{
    id: 28, name: "Ryujin", title: "El Dios Dragón del Océano Shinto", mythology: "Oriental (Asia)", type: "Shen", element: "Agua", danger: 4,
    habitat: "Ryūgū-jō (Palacio del Dragón)", ability: "Joyas Mareales (Control de Bajamar y Pleamar)", weakness: "La Medicina del Medusa Marina",
    scroll: "Posee el poder de manipular las mareas del mar de Japón mediante dos joyas mágicas: Kanju (marea baja) y Manju (marea alta). Es conocido por su generosidad con los navegantes de buen corazón.",
    physicalDescription: "oriental long serpentine dragon with flowing whiskers and floating crest featuring magical elemental aura with main colors #004d40 and #a7ffeb",
    svgType: "shen", colorPrimary: "#004d40", colorSecondary: "#a7ffeb", glowColor: "#18ffff"
  },
{
    id: 29, name: "Kiyohime", title: "La Llama de la Pasión Transformada", mythology: "Oriental (Asia)", type: "Wyrm", element: "Fuego", danger: 4,
    habitat: "Río Hidaka", ability: "Aliento de Fuego Vengativo y Nadado Ultrarrápido", weakness: "Campana de Bronce de Templo",
    scroll: "Cuenta la leyenda que era una joven que, dominada por una emoción intensa, se transformó en un dragón serpenteante capaz de cruzar ríos embravecidos soltando chispas de fuego por la boca.",
    physicalDescription: "wingless serpent-like dragon with coiled body and sharp claws featuring blazing fiery scales and glowing ember accents with main colors #ad1457 and #f8bbd0",
    svgType: "wyrm", colorPrimary: "#ad1457", colorSecondary: "#f8bbd0", glowColor: "#ff4081"
  },
{
    id: 30, name: "Mizuchi", title: "El Dragón de Agua Dulce", mythology: "Oriental (Asia)", type: "Wyrm", element: "Veneno", danger: 3,
    habitat: "Ríos y Lagunas de Nara", ability: "Veneno Fluvial y Niebla Escondite", weakness: "Flores de Calabaza Silvestre",
    scroll: "Un dragón con cuernos rectos y cuerpo de serpiente de agua. Exhalaba un veneno que adormecía a los peces del río hasta que un héroe local aprendió a neutralizarlo con plantas curativas.",
    physicalDescription: "wingless serpent-like dragon with coiled body and sharp claws featuring acidic emerald green scales and dripping venomous mist with main colors #00695c and #b2dfdb",
    svgType: "wyrm", colorPrimary: "#00695c", colorSecondary: "#b2dfdb", glowColor: "#64ffda"
  },
{
    id: 31, name: "Imoogi", title: "El Dragón en Potencia", mythology: "Oriental (Asia)", type: "Wyrm", element: "Luz", danger: 2,
    habitat: "Cuevas de las Montañas de Seoraksan", ability: "Paciencia Milenaria y Bendición del Sol", weakness: "Interrupción de su Trance Místico",
    scroll: "En la mitología coreana, una serpiente gigante debe vivir mil años en paz para obtener una joya celestial (Yeouiju) y transformar su cuerpo en un majestuoso Dragón del Cielo.",
    physicalDescription: "wingless serpent-like dragon with coiled body and sharp claws featuring golden radiant celestial scales and brilliant solar sparks with main colors #f57f17 and #fff59d",
    svgType: "shen", colorPrimary: "#f57f17", colorSecondary: "#fff59d", glowColor: "#ffff00"
  },
{
    id: 32, name: "Yong", title: "El Dragón de los Cuatro Climas", mythology: "Oriental (Asia)", type: "Shen", element: "Naturaleza", danger: 3,
    habitat: "Cumbres de la Península Coreana", ability: "Convocatoria de Vientos de Primavera", weakness: "Ruidos Metálicos Estridentes",
    scroll: "Portador de la joya brillante Yeouiju en sus garras. Simboliza la armonía entre los elementos naturales y el respeto a los antepasados.",
    physicalDescription: "oriental long serpentine dragon with flowing whiskers and floating crest featuring magical elemental aura with main colors #2e7d32 and #c8e6c9",
    svgType: "shen", colorPrimary: "#2e7d32", colorSecondary: "#c8e6c9", glowColor: "#69f0ae"
  },
{
    id: 33, name: "Zhulong", title: "El Guardián del Fuego Estival", mythology: "Oriental (Asia)", type: "Shen", element: "Fuego", danger: 4,
    habitat: "Montañas del Sur de Hunan", ability: "Calor Solar y Chispa Vital", weakness: "Lluvia Glacial",
    scroll: "Representa el verano y el elemento fuego dentro de los puntos cardinales tradicionales orientales. Sus plumas de fuego iluminan las noches oscuras.",
    physicalDescription: "oriental long serpentine dragon with flowing whiskers and floating crest featuring blazing fiery scales and glowing ember accents with main colors #c62828 and #ff8a80",
    svgType: "shen", colorPrimary: "#c62828", colorSecondary: "#ff8a80", glowColor: "#ff5252"
  },
{
    id: 34, name: "Druk del Bhután", title: "El Dragón del Trueno de las Alturas", mythology: "Oriental (Asia)", type: "Shen", element: "Tormenta", danger: 3,
    habitat: "Montañas del Himalaya", ability: "Rugido de Trueno de Alta Montaña", weakness: "Baja Altitud",
    scroll: "El Dragón del Trueno que adorna la bandera nacional de Bhután. Vuela entre los picos nevados del Himalaya sosteniendo perlas que representan la riqueza y la paz.",
    physicalDescription: "oriental long serpentine dragon with flowing whiskers and floating crest featuring magical elemental aura with main colors #ef6c00 and #ffe0b2",
    svgType: "shen", colorPrimary: "#ef6c00", colorSecondary: "#ffe0b2", glowColor: "#ffab40"
  },
{
    id: 35, name: "Yulong", title: "El Tercer Príncipe de Jade", mythology: "Oriental (Asia)", type: "Shen", element: "Cristal", danger: 3,
    habitat: "Océano del Oeste y Montañas de Jade", ability: "Metamorfosis Equina y Piel de Jade Sanadora", weakness: "Perla Incendiada del Padre",
    scroll: "Yulong (el Dragón de Jade) es el tercer príncipe del Rey Dragón del Mar del Oeste (Ao Lie). Inmortalizado en la inmortal novela 'Viaje al Oeste', tras cometer una falta juvenil fue perdonado por la diosa Guanyin y se transformó en el majestuoso caballo blanco que transportó fielmente al monje Xuanzang en su peregrinación a la India.",
    physicalDescription: "oriental long serpentine dragon with flowing whiskers and floating crest featuring magical elemental aura with main colors #00796b and #b2dfdb",
    svgType: "shen", colorPrimary: "#00796b", colorSecondary: "#b2dfdb", glowColor: "#a7ffeb"
  },
{
    id: 36, name: "Quetzalcóatl", title: "La Serpiente Emplumada de la Mañana", mythology: "Mesoamericana y Sudamericana", type: "Ampithere", element: "Naturaleza", danger: 4,
    habitat: "Tenochtitlan / Cielos Mesoamericanos", ability: "Control del Viento, Sabiduría Divina y Vuelo de Plumas de Quetzal", weakness: "Espejos de Obsidiana Oscura",
    scroll: "Una de las deidades más veneradas del México antiguo. Mezcla la majestuosidad de las serpientes verdes con el plumaje iridiscente del ave quetzal. Traía el conocimiento de las estrellas, la agricultura y el viento suave de la tarde.",
    physicalDescription: "feathered-winged serpent dragon with vibrant crest featuring golden radiant celestial scales and brilliant solar sparks with main colors #2e7d32 and #ffd54f",
    svgType: "ampithere", colorPrimary: "#2e7d32", colorSecondary: "#ffd54f", glowColor: "#00e676"
  },
{
    id: 37, name: "Xiuhcóatl", title: "La Serpiente de Fuego Turquesa", mythology: "Mesoamericana y Sudamericana", type: "Wyrm", element: "Magma", danger: 5,
    habitat: "Monte Coatepec", ability: "Rayo de Rayos Solares y Calor Volcánico", weakness: "Agua de Cenote Frío",
    scroll: "Utilizada como arma sagrada por el dios Huitzilopochtli. Su cuerpo estaba formado por mosaicos de turquesa que ardían con una llama azul brillante capaz de atravesar cualquier escudo.",
    physicalDescription: "vibrant Aztec fire serpent dragon made of glowing cyan turquoise mosaic scales, fiery orange mane, sharp horn snout, exhaling blazing blue volcanic flames near Mount Coatepec, Wyrm dragon with Magma powers in Monte Coatepec",
    svgType: "wyrm", colorPrimary: "#00838f", colorSecondary: "#ff6f00", glowColor: "#ffab00"
  },
{
    id: 38, name: "Kukulkán", title: "La Serpiente Visión de la Pirámide", mythology: "Mesoamericana y Sudamericana", type: "Ampithere", element: "Viento", danger: 4,
    habitat: "Chichén Itzá", ability: "Sombra Danzante en los Solsticios y Eco de Quetzal", weakness: "Eclipses Solares Totales",
    scroll: "En la gran pirámide de Chichén Itzá, cada equinoccio la luz del sol proyecta la sombra serpenteante de Kukulkán descendiendo por las escalinatas hasta la gran cabeza de piedra en la base.",
    physicalDescription: "feathered-winged serpent dragon with vibrant crest featuring magical elemental aura with main colors #00695c and #80e27e",
    svgType: "ampithere", colorPrimary: "#00695c", colorSecondary: "#80e27e", glowColor: "#b9f6ca"
  },
{
    id: 39, name: "Amaru", title: "La Serpiente Alada de los Andes", mythology: "Mesoamericana y Sudamericana", type: "Ampithere", element: "Tormenta", danger: 4,
    habitat: "Cumbres del Cusco / Lago Titicaca", ability: "Granizo Destructivo y Convocatoria de Lluvias de Montaña", weakness: "Sol de Mediodía Seco",
    scroll: "Mítico dragón serpiente con cabeza de llama, alas de cóndor y cola de pez. Los antiguos incas creían que el Amaru emergía de las cumbres o los lagos para anunciar cambios trascendentales en la naturaleza.",
    physicalDescription: "feathered-winged serpent dragon with vibrant crest featuring magical elemental aura with main colors #6a1b9a and #ffb300",
    svgType: "ampithere", colorPrimary: "#6a1b9a", colorSecondary: "#ffb300", glowColor: "#ffd54f"
  },
{
    id: 40, name: "Trentren Vilu", title: "La Serpiente Protectora de la Tierra", mythology: "Mesoamericana y Sudamericana", type: "Otros", element: "Tierra", danger: 4,
    habitat: "Cerros y Cordilleras del Sur", ability: "Elevación de Montañas y Terremotos Protectores", weakness: "Tsunamis de Caicai Vilu",
    scroll: "En la cosmología mapuche, Trentren Vilu es la benigna serpiente de la tierra que elevó los cerros para salvar a la humanidad de una gigante inundación provocada por la serpiente del mar.",
    physicalDescription: "wingless serpent-like dragon with coiled body and sharp claws featuring subterranean mossy stone scales and earthy amber glow with main colors #4e342e and #a1887f",
    svgType: "wyrm", colorPrimary: "#4e342e", colorSecondary: "#a1887f", glowColor: "#d7ccc8"
  },
{
    id: 41, name: "Caicai Vilu", title: "La Serpiente de los Maremotos", mythology: "Mesoamericana y Sudamericana", type: "Otros", element: "Agua", danger: 5,
    habitat: "Océano Pacífico Sur", ability: "Crecimiento del Nivel del Mar y Olas Gigantes", weakness: "El Cantar de Trentren Vilu",
    scroll: "Serpiente marina legendaria que reina sobre los peces y los océanos. Su feroz batalla contra Trentren dio origen al archipiélago de Chiloé y sus múltiples islas pintorescas.",
    physicalDescription: "oriental long serpentine dragon with flowing whiskers and floating crest featuring magical elemental aura with main colors #0d47a1 and #42a5f5",
    svgType: "shen", colorPrimary: "#0d47a1", colorSecondary: "#42a5f5", glowColor: "#80d8ff"
  },
{
    id: 42, name: "Alicanto Dorado", title: "El Dragón Volador de Atacama", mythology: "Mesoamericana y Sudamericana", type: "Ampithere", element: "Luz", danger: 2,
    habitat: "Desierto de Atacama", ability: "Alimentación de Oro y Resplandor Guía", weakness: "La Codicia de los Hombres",
    scroll: "Criatura alada misteriosa que se alimenta de vetas de oro y plata puro en el desierto. Emite una luz dorada brillante que guía a los mineros de buen corazón hacia yacimientos ocultos.",
    physicalDescription: "feathered-winged serpent dragon with vibrant crest featuring golden radiant celestial scales and brilliant solar sparks with main colors #ff8f00 and #ffe082",
    svgType: "ampithere", colorPrimary: "#ff8f00", colorSecondary: "#ffe082", glowColor: "#ffecb3"
  },
{
    id: 43, name: "Bohitu", title: "El Dragón del Río Amazonas", mythology: "Mesoamericana y Sudamericana", type: "Otros", element: "Naturaleza", danger: 3,
    habitat: "Río Selva Amazónica", ability: "Camuflaje de Liana y Canto de Selva", weakness: "Hachas de Hierro",
    scroll: "Protegía la vegetación tupida de la cuenca amazónica. Se deslizaba entre los copos de los árboles gigantes como si fuera una liana viva que despedía brillo verde fluorescente por las noches.",
    physicalDescription: "wingless serpent-like dragon with coiled body and sharp claws featuring magical elemental aura with main colors #1b5e20 and #76ff03",
    svgType: "wyrm", colorPrimary: "#1b5e20", colorSecondary: "#76ff03", glowColor: "#b2ff59"
  },
{
    id: 44, name: "Q'uq'umatz", title: "La Serpiente Resplandeciente del Popol Vuh", mythology: "Mesoamericana y Sudamericana", type: "Ampithere", element: "Agua", danger: 3,
    habitat: "Cielos Verdes de Guatemala", ability: "Creación de Aguas Cristalinas y Vuelo Plumado", weakness: "Fuego de Carbón",
    scroll: "Citado en el libro sagrado Popol Vuh como uno de los dioses creadores que meditaban rodeados de plumas verdes y azules en las aguas primordiales.",
    physicalDescription: "feathered-winged serpent dragon with vibrant crest featuring magical elemental aura with main colors #00796b and #80cbc4",
    svgType: "ampithere", colorPrimary: "#00796b", colorSecondary: "#80cbc4", glowColor: "#e0f2f1"
  },
{
    id: 45, name: "Coatlicue Serpiente", title: "La Madre Dragón de las Faldas de Piedra", mythology: "Mesoamericana y Sudamericana", type: "Otros", element: "Tierra", danger: 4,
    habitat: "Templo Mayor de Tenochtitlan", ability: "Petrificación Instantánea de Invasores", weakness: "Luz de la Luna Llena",
    scroll: "Representada con dos cabezas de serpiente en lugar de rostro que simbolizan el equilibrio entre la vida y la tierra que renace.",
    physicalDescription: "multi-headed serpentine hydra dragon with multiple long necks featuring subterranean mossy stone scales and earthy amber glow with main colors #37474f and #90a4ae",
    svgType: "hidra", colorPrimary: "#37474f", colorSecondary: "#90a4ae", glowColor: "#cfd8dc"
  },
{
    id: 46, name: "Y Ddraig Goch", title: "El Dragón Rojo de Gales", mythology: "Celta y Británica", type: "Dragón Europeo", element: "Fuego", danger: 4,
    habitat: "Montañas de Snowdonia (Gales)", ability: "Rugido de Libertad y Aliento Abrasador", weakness: "Vino Dulce Dulce de Brezo",
    scroll: "El famoso Dragón Rojo que aparece orgulloso en la bandera de Gales. Combatió durante siglos contra el dragón blanco invasor bajo la colina de Dinas Emrys hasta salir victorioso.",
    physicalDescription: "four-legged classic dragon with majestic wings and scaled chest featuring blazing fiery scales and glowing ember accents with main colors #b71c1c and #ff5252",
    svgType: "draco", colorPrimary: "#b71c1c", colorSecondary: "#ff5252", glowColor: "#ff1744"
  },
{
    id: 47, name: "Wyvern de Wessex", title: "El Señor de las Alas Peligrosas", mythology: "Celta y Británica", type: "Wyvern", element: "Veneno", danger: 4,
    habitat: "Bosques de Hampshire", ability: "Aguijón de Cola Venenoso y Vuelo en Picada", weakness: "Escudos Rechazantes con Espejo",
    scroll: "Un dragón de dos patas y alas membranosas temido por los caballeros anglosajones. Poseía un aguijón en la punta de la cola similar al de un escorpión gigantesco.",
    physicalDescription: "two-legged agile winged dragon with spiked tail and slender snout featuring acidic emerald green scales and dripping venomous mist with main colors #4a148c and #ea80fc",
    svgType: "wyvern", colorPrimary: "#4a148c", colorSecondary: "#ea80fc", glowColor: "#e040fb"
  },
{
    id: 48, name: "Knucker de Sussex", title: "El Dragón del Pozo Inhondo", mythology: "Celta y Británica", type: "Wyrm", element: "Agua", danger: 3,
    habitat: "Pozos de Knuckerhole (Lyminster)", ability: "Mordedura Adormecedora y Emboscada Acuática", weakness: "Pastel Mágico de Pudín de Sal",
    scroll: "Habitaba en fuentes de agua subterránea llamadas 'Knuckerholes' que según los aldeanos no tenían fondo. Salía de noche a alimentarse de ganado hasta que un joven astuto lo venció ofreciéndole un pastel gigante.",
    physicalDescription: "wingless serpent-like dragon with coiled body and sharp claws featuring magical elemental aura with main colors #006064 and #80deea",
    svgType: "wyrm", colorPrimary: "#006064", colorSecondary: "#80deea", glowColor: "#00e5ff"
  },
{
    id: 49, name: "Dragón Blanco Sajón", title: "El Rival de las Nieblas", mythology: "Celta y Británica", type: "Dragón Europeo", element: "Hielo", danger: 4,
    habitat: "Colinas Chalk Cliffs de Dover", ability: "Aliento Glacial y Vuelo Nocturno", weakness: "El Fuego del Dragón Rojo",
    scroll: "En las profecías del mago Merlín, el Dragón Blanco luchaba contra el Dragón Rojo en un duelo subterráneo que sacudía los cimientos de Gran Bretaña.",
    physicalDescription: "four-legged classic dragon with majestic wings and scaled chest featuring crystalline icy frost scales and glowing cyan frost aura with main colors #eceff1 and #90a4ae",
    svgType: "draco", colorPrimary: "#eceff1", colorSecondary: "#90a4ae", glowColor: "#ffffff"
  },
{
    id: 50, name: "Linton Worm", title: "El Enroscado de las Colinas Escocesas", mythology: "Celta y Británica", type: "Wyrm", element: "Tierra", danger: 4,
    habitat: "Colina de Linton Hill (Escocia)", ability: "Constricción de Roble y Peste de Aliento", weakness: "Lanzas con Punta de Turba Encendida",
    scroll: "Un dragón serpiente que se enroscaba alrededor de una colina escocesa, destruyendo las cosechas con su aliento venenoso. Fue derrotado por el héroe Laird de Lariston usando una lanza incandescente.",
    physicalDescription: "wingless serpent-like dragon with coiled body and sharp claws featuring subterranean mossy stone scales and earthy amber glow with main colors #3e2723 and #bcaaa4",
    svgType: "wyrm", colorPrimary: "#3e2723", colorSecondary: "#bcaaa4", glowColor: "#d7ccc8"
  },
{
    id: 51, name: "Lambton Worm", title: "La Serpiente del Río Wear", mythology: "Celta y Británica", type: "Wyrm", element: "Agua", danger: 4,
    habitat: "Condado de Durham", ability: "Regeneración de Cuerpo Cortado y Abrazo Asfixiante", weakness: "Armaduras con Espinas de Acero",
    scroll: "Cuenta la historia que este dragón podía volver a juntar sus partes si lo cortaban a la mitad. Lord Lambton tuvo que vestir una armadura llena de cuchillas afiladas y luchar dentro del río para vencerlo.",
    physicalDescription: "wingless serpent-like dragon with coiled body and sharp claws featuring magical elemental aura with main colors #1a237e and #8c9eff",
    svgType: "wyrm", colorPrimary: "#1a237e", colorSecondary: "#8c9eff", glowColor: "#536dfe"
  },
{
    id: 52, name: "Gurvelen", title: "El Dragón del Lago Celta", mythology: "Celta y Británica", type: "Shen", element: "Agua", danger: 3,
    habitat: "Lough Gur (Irlanda)", ability: "Encantamiento de Niebla Dorada", weakness: "Trébol de Cuatro Hojas",
    scroll: "Un dragón pacífico que salía a la superficie del lago durante las noches de luna llena para cantar melodías mágicas a las criaturas del bosque.",
    physicalDescription: "oriental long serpentine dragon with flowing whiskers and floating crest featuring magical elemental aura with main colors #1b5e20 and #a5d6a7",
    svgType: "shen", colorPrimary: "#1b5e20", colorSecondary: "#a5d6a7", glowColor: "#b2ff59"
  },
{
    id: 53, name: "Tarasque de Provenza", title: "El Monstruo de Caparazón de Espinas", mythology: "Europea Continental", type: "Otros", element: "Tierra", danger: 4,
    habitat: "Río Ródano", ability: "Caparazón de Tortuga Espinosa y Cola de Escorpión", weakness: "Cantos de Paz y Agua Bendita",
    scroll: "Poseía seis patas cortas pero potentes, un cuerpo protegido por un caparazón de espinas de tortuga y una cabeza de león con orejas de caballo. Fue amansado por Santa Marta con una oración suave.",
    physicalDescription: "majestic dragon featuring subterranean mossy stone scales and earthy amber glow with main colors #558b2f and #f57f17",
    svgType: "draco", colorPrimary: "#558b2f", colorSecondary: "#f57f17", glowColor: "#c0ca33"
  },
{
    id: 54, name: "Longwitton Dragon", title: "El Dragón Invisible de Northumberland", mythology: "Celta y Británica", type: "Wyvern", element: "Sombra", danger: 4,
    habitat: "Pozos de Longwitton", ability: "Invisibilidad Total y Aliento helado", weakness: "Ver su Propia Sombra reflejada",
    scroll: "Este dragón tenía la extraña habilidad de volverse completamente invisible a voluntad. Solo se podía saber dónde estaba por los rastros de hierba aplastada que dejaba al caminar.",
    physicalDescription: "two-legged agile winged dragon with spiked tail and slender snout featuring dark shadowed purple scales and abyssal twilight smoke with main colors #263238 and #78909c",
    svgType: "wyvern", colorPrimary: "#263238", colorSecondary: "#78909c", glowColor: "#b0bec5"
  },
{
    id: 55, name: "Cuélebre de Asturias", title: "El Guardián de los Tesoros Escondidos", mythology: "Celta y Británica", type: "Wyvern", element: "Fuego", danger: 4,
    habitat: "Cuevas del Mar Cantábrico", ability: "Escamas de Diamante Imparables y Ojos de Fuego", weakness: "Pan con Alfileres o Maza Encendida",
    scroll: "Dragón con alas de murciélago y escamas tan duras que ninguna espada de acero podía atravesarlas. Solo envejecía cuando se retiraba al fondo del mar a cuidar sus riquezas.",
    physicalDescription: "two-legged agile winged dragon with spiked tail and slender snout featuring blazing fiery scales and glowing ember accents with main colors #b71c1c and #ffb74d",
    svgType: "wyvern", colorPrimary: "#b71c1c", colorSecondary: "#ffb74d", glowColor: "#ff9100"
  },
{
    id: 56, name: "Zmey Gorynych", title: "El Dragón Tres Cabezas de las Montañas de Kiev", mythology: "Eslava y Este de Europa", type: "Hidra", element: "Fuego", danger: 5,
    habitat: "Montañas de Ceniza de Ucrania y Rusia", ability: "Fuego Tripartito y Garras de Cobre", weakness: "El Látigo Mágico del Héroe Dobrynya",
    scroll: "El dragón más famoso del folclore eslava. Posee tres cabezas que escupen fuego independientemente, alas de cuero negro y camina en dos patas potentes haciendo sonar sus garras de cobre.",
    physicalDescription: "multi-headed serpentine hydra dragon with multiple long necks featuring blazing fiery scales and glowing ember accents with main colors #3e2723 and #ff3d00",
    svgType: "hidra", colorPrimary: "#3e2723", colorSecondary: "#ff3d00", glowColor: "#ff6e40"
  },
{
    id: 57, name: "Balaur", title: "El Dragón de Siete Cabezas y Aletas Finas", mythology: "Eslava y Este de Europa", type: "Hidra", element: "Tormenta", danger: 4,
    habitat: "Valles del Danubio", ability: "Creación de Granizo y Huracanes", weakness: "La Espada Encantada de Făt-Frumos",
    scroll: "Un dragón gigantesco de la mitología rumana con siete cabezas. Cuando abría las siete bocas a la vez, creaba un arcoíris tóxico que atraía las tormentas y la niebla hacia los pueblos.",
    physicalDescription: "multi-headed serpentine hydra dragon with multiple long necks featuring magical elemental aura with main colors #1a237e and #00e5ff",
    svgType: "hidra", colorPrimary: "#1a237e", colorSecondary: "#00e5ff", glowColor: "#18ffff"
  },
{
    id: 58, name: "Zirnitra", title: "El Dragón Mágico de la Hechicería", mythology: "Eslava y Este de Europa", type: "Dragón Europeo", element: "Sombra", danger: 4,
    habitat: "Bosques Negros de Pomerania", ability: "Chispa de Magia Oscura e Ilusión", weakness: "Amuletos de Plata Pura",
    scroll: "Venerado por los antiguos hechiceros como el dios dragón de la magia. Sus escamas de color azul noche resplandecían con símbolos rúnicos antiguos al lanzar sus hechizos.",
    physicalDescription: "majestic classic four-legged dragon with midnight blue night scales, glowing neon purple ancient runic symbols shimmering across its wings, glowing violet eyes, and a horned head, Draco dragon with Sombra powers in Bosques Negros de Pomerania",
    svgType: "draco", colorPrimary: "#0d47a1", colorSecondary: "#ea80fc", glowColor: "#e040fb"
  },
{
    id: 59, name: "Smok Wawelski", title: "El Dragón de la Cueva del Vístula", mythology: "Eslava y Este de Europa", type: "Dragón Europeo", element: "Fuego", danger: 4,
    habitat: "Colina de Wawel (Cracovia)", ability: "Llamaradas Devoradoras y Terremoto de Paso", weakness: "Oveja Rellena de Azufre",
    scroll: "Habitaba en una cueva debajo del castillo de Wawel en Cracovia. Exigía tributos semanales de ganado hasta que el ingenioso zapatero Skuba le ofreció una piel de oveja cargada de azufre.",
    physicalDescription: "massive stocky four-legged classic dragon with thick jagged burnt-orange scales, glowing fiery nostrils, smoking jaws, and giant spiked tail standing near a dark cave, Draco dragon with Fuego powers in Colina de Wawel (Cracovia)",
    svgType: "draco", colorPrimary: "#bf360c", colorSecondary: "#ffab91", glowColor: "#ff6e40"
  },
{
    id: 60, name: "Zilant", title: "El Dragón Coronado de Kazán", mythology: "Oriental (Asia)", type: "Wyvern", element: "Fuego", danger: 3,
    habitat: "Lago Kaban (Rusia)", ability: "Corona del Rey Dragón y Vuelo Ágil", weakness: "Hierbas de Ajenjo Sagrado",
    scroll: "Un wyvern hermoso que ostenta una corona de oro sobre su cabeza y patas de gallo mágico. Es el símbolo oficial de la ciudad de Kazán en la actualidad.",
    physicalDescription: "elegant two-legged green wyvern dragon with golden rooster talons, a shiny imperial golden crown on its head, red bird-like wings, and a long curved tail, Wyvern dragon with Fuego powers in Lago Kaban (Rusia)",
    svgType: "wyvern", colorPrimary: "#1b5e20", colorSecondary: "#ffd700", glowColor: "#ffeb3b"
  },
{
    id: 61, name: "Kulshedra", title: "La Tormenta Encarnada", mythology: "Eslava y Este de Europa", type: "Hidra", element: "Agua", danger: 5,
    habitat: "Cavernas Subterráneas de Albania", ability: "Secado de Manantiales y Terremotos Fluviales", weakness: "El Dragón Benigno (Drangue)",
    scroll: "Una serpiente dragón hembra de nueve cabezas que causaba sequías terribles al tragarse el agua de los ríos. Su enemigo natural eran los Drangue, héroes legendarios con alas ocultas.",
    physicalDescription: "frightening nine-headed serpentine hydra dragon with dark violet and indigo scales, glowing purple eyes, and swirling torrential whirlpool water aura around its necks, Hidra dragon with Agua powers in Cavernas Subterráneas de Albania",
    svgType: "hidra", colorPrimary: "#311b92", colorSecondary: "#9575cd", glowColor: "#b388ff"
  },
{
    id: 62, name: "Illuyanka", title: "El Dragón del Imperio Hitita", mythology: "Eslava y Este de Europa", type: "Wyrm", element: "Tierra", danger: 4,
    habitat: "Montañas de Anatolia", ability: "Robo de Fuerza Vital y Emboscada Terrestre", weakness: "Banquetes de Miel y Cerveza",
    scroll: "Un temible dragón que logró derrotar al dios del trueno en su primer enfrentamiento. Solo pudo ser atrapado cuando fue invitado a un gran banquete donde comió tanto que no pudo volver a su cueva.",
    physicalDescription: "gigantic earth brown serpentine wyrm dragon with heavy subterranean rocky armor scales, sharp digging claws, and sleepy fat belly near a mountain feast, Wyrm dragon with Tierra powers in Montañas de Anatolia",
    svgType: "wyrm", colorPrimary: "#4e342e", colorSecondary: "#bcaaa4", glowColor: "#d7ccc8"
  },
{
    id: 63, name: "Yilbegän", title: "El Dragón Multi-Cabeza de Siberia", mythology: "Eslava y Este de Europa", type: "Otros", element: "Hielo", danger: 5,
    habitat: "Estepas Heladas de Siberia", ability: "Cabalgata de Tormentas de Nieve y 6 u 9 Cabezas", weakness: "Calor Intenso de Forja",
    scroll: "Monstruo legendario del folclore turco-siberiano, híbrido de ogro gigante y dragón de siete cabezas con ojos amarillos brillantes y dientes aserrados. Cabalga un buey negro descomunal coronado por noventa y nueve cuernos entrelazados a través de las estepas heladas.",
    physicalDescription: "massive hybrid giant dragon-ogre with seven distinct heads featuring glowing yellow eyes, jagged teeth, petrified wood scales, mounted on a gargantuan black ox with an impossible crown of ninety-nine intertwined horns across desolated frozen Siberian steppes, Hidra dragon with Hielo powers in Estepas Heladas de Siberia",
    svgType: "hidra", colorPrimary: "#006064", colorSecondary: "#e0f7fa", glowColor: "#80deea"
  },
{
    id: 64, name: "Chuvash Yish", title: "El Dragón Volador de Fuego", mythology: "Oriental (Asia)", type: "Shen", element: "Fuego", danger: 3,
    habitat: "Bosques del Volga", ability: "Transformación en Meteriorito y Lluvia de Chispas", weakness: "Oraciones de Abuelas del Pueblo",
    scroll: "Se creía que este dragón caía del cielo como un meteorito ardiente y se transformaba al tocar tierra en una persona apacible que ayudaba a las granjas.",
    physicalDescription: "gorgeous feathered serpent dragon with fiery orange and gold scales, bright red feathered wings, glowing flame tail trail like a shooting meteor, Ampithere dragon with Fuego powers in Bosques del Volga",
    svgType: "ampithere", colorPrimary: "#e65100", colorSecondary: "#ffe0b2", glowColor: "#ffb74d"
  },
{
    id: 65, name: "Huracán", title: "El Señor Corazón del Cielo", mythology: "Mesoamericana y Sudamericana", type: "Otros", element: "Tormenta", danger: 3,
    habitat: "Cielos Tormentosos y Ruinas de El Mirador", ability: "Ciclón de Jade Espiral, Sismos de Cola Única y Aliento de Lluvia Fertil", weakness: "La Calma Absoluta del Ojo Solar",
    scroll: "El colosal Huracán (el gran dragón de la mitología Maya y del Caribe) es el señor absoluto de los vientos giratorios, los terremotos y las tormentas tropicales. ¡De su nombre proviene directamente la palabra 'huracán'! Posee una anatomía única y giratoria de dos brazos asimétricos y una sola pata espiral. Su rostro es una máscara de piedra tallada en basalto con un místico ojo en forma de 'X' y cejas de fuego turquesa, exhalando la lluvia sagrada de jade.",
    physicalDescription: "unique asymmetrical green jade dragon with carved stone mask face, one large eye with X pupil and flaming turquoise eyebrows, exhaling spiral cloud mist tornado, Drakón dragon with Tormenta powers in Cielos Tormentosos",
    svgType: "draco", colorPrimary: "#00695c", colorSecondary: "#18ffff", glowColor: "#64ffda"
  },
{
    id: 66, name: "Tiamat", title: "La Diosa Primordial del Caos Caótico", mythology: "Mesopotámica y Medio Oriente", type: "Hidra", element: "Agua", danger: 5,
    habitat: "El Océano Primordial de Sal", ability: "Creación de Legiones de Monstruos y Olas Cosmicas", weakness: "Las Cuatro Flechas de Viento de Marduk",
    scroll: "En el mito babilónico Enūma Eliš, Tiamat es la dragona madre del océano salado. Encarnaba el caos antes de la creación del cielo y la tierra. Sus escamas contenían todas las tormentas del universo.",
    physicalDescription: "colossal five-headed oceanic dragon hydra with deep sapphire blue scales, glowing cyan eyes, swirling sea foam and salt water waves around its serpentine bodies, Hidra dragon with Agua powers in El Océano Primordial de Sal",
    svgType: "hidra", colorPrimary: "#0d47a1", colorSecondary: "#e040fb", glowColor: "#00e5ff"
  },
{
    id: 67, name: "Kur", title: "El Dragón del Inframundo de Sumeria", mythology: "Mesopotámica y Medio Oriente", type: "Drake", element: "Tierra", danger: 5,
    habitat: "El Abismo Vacío de Kur", ability: "Terremotos Primordiales y Absorción de Luz", weakness: "La Barca Dorada del Dios Enki",
    scroll: "Considerado el primer dragón registrado en las tabletas de arcilla cuneiforme de Sumeria. Habitaba entre el mundo de los vivos y el abismo sombrío.",
    physicalDescription: "ancient subterranean dragon with dark slate grey rocky scales, sharp digging claws, near sumerian cuneiform tablets, Drake dragon with Tierra powers in El Abismo Vacío de Kur",
    svgType: "draco", colorPrimary: "#263238", colorSecondary: "#78909c", glowColor: "#90a4ae"
  },
{
    id: 68, name: "Apep (Apofis)", title: "La Serpiente Devoradora del Sol", mythology: "Mesopotámica y Medio Oriente", type: "Wyrm", element: "Sombra", danger: 5,
    habitat: "Duat (El Inframundo Egipcio)", ability: "Eclipses Solares y Mirada Paralizante", weakness: "La Lanza del Dios Ra y el Gato Sagrado de Heliópolis",
    scroll: "Cada noche, el dios sol Ra viajaba en su barca solar por el inframundo. Apep intentaba tragar la barca para sumergir al mundo en la oscuridad eterna, pero Ra y Seth la defendían al amanecer.",
    physicalDescription: "colossal ancient Egyptian void serpent dragon with obsidian black scales, dark crimson belly, glowing red eyes, attempting to swallow the golden solar barge of Ra in the underworld, Wyrm dragon with Sombra powers in Duat (El Inframundo Egipcio)",
    svgType: "wyrm", colorPrimary: "#1b0000", colorSecondary: "#b71c1c", glowColor: "#ff1744"
  },
{
    id: 69, name: "Azhi Dahaka", title: "El Dragón de Tres Cabezas de Persia", mythology: "Mesopotámica y Medio Oriente", type: "Hidra", element: "Veneno", danger: 5,
    habitat: "Monte Damavand", ability: "Sangre Inundada de Lagartos Venenosos", weakness: "Atado con Cadenas Mágicas por Fereydun",
    scroll: "Un demonio dragón persa con tres bocas, seis ojos y tres cabezas de serpiente. Se decía que si le cortaban el cuello, de su sangre brotarían arañas y escorpiones venenosos.",
    physicalDescription: "monstrous Persian three-headed snake dragon hydra with dark ash grey and toxic green scales, six glowing yellow eyes, venomous green mist dripping from its three fanged jaws, Hidra dragon with Veneno powers in Monte Damavand",
    svgType: "hidra", colorPrimary: "#311b92", colorSecondary: "#b0bec5", glowColor: "#7c4dff"
  },
{
    id: 70, name: "Mušḫoššu (Sirrush)", title: "El Dragón Furioso de la Puerta de Ishtar", mythology: "Mesopotámica y Medio Oriente", type: "Dragón Europeo", element: "Luz", danger: 3,
    habitat: "Babilonia (Mesopotamia)", ability: "Cuerpo de León, Cuerno de Víbora y Patas de Águila", weakness: "Respeto a los Sacerdotes de Marduk",
    scroll: "El hermoso dragón tallado en azulejos de cerámica azul brillante en la Puerta de Ishtar en Babilonia. Posee patas delanteras de león, patas traseras de águila y un cuello largo de serpiente.",
    physicalDescription: "majestic mythical creature with long slender snake neck, lion front legs, eagle hind talons, sharp viper horn on its head, coated in lapis lazuli blue ceramic scales with golden accents, Draco dragon with Luz powers in Babilonia (Mesopotamia)",
    svgType: "draco", colorPrimary: "#0288d1", colorSecondary: "#ffd54f", glowColor: "#ffea00"
  },
{
    id: 71, name: "Gandarewa", title: "El Dragón de los Mares de Oro", mythology: "Mesopotámica y Medio Oriente", type: "Shen", element: "Agua", danger: 4,
    habitat: "Océano Vourukasha", ability: "Devorador de Barcos y Talón de Hierro", weakness: "El Héroe Garshasp",
    scroll: "Un monstruo marino con garras gigantescas que intentó devorar los tesoros mágicos del océano persa. Sus escamas doradas reflejaban la luz de las estrellas.",
    physicalDescription: "gigantic sea serpent dragon with glittering golden scales, flowing whiskers, giant sharp iron-like talons, emerging from starlit ocean waves near a wooden ship, Shen dragon with Agua powers in Océano Vourukasha",
    svgType: "shen", colorPrimary: "#f57f17", colorSecondary: "#ffe082", glowColor: "#ffeb3b"
  },
{
    id: 72, name: "Labbu", title: "El Dragón de Cien Leguas", mythology: "Mesopotámica y Medio Oriente", type: "Wyrm", element: "Tormenta", danger: 5,
    habitat: "Cielos Mesopotámicos", ability: "Longitud de 60 Leguas y Aliento Devastador", weakness: "El Rayo del Dios Tishpak",
    scroll: "Creado por el dios del cielo para castigar los excesos de la humanidad. Medía más de 300 kilómetros de largo y su aliento podía secar cosechas enteras en un solo día.",
    physicalDescription: "immense endless storm serpent wyrm soaring through thunderous Mesopotamian clouds, dark charcoal scales glowing with orange lightning embers and hurricane winds, Wyrm dragon with Tormenta powers in Cielos Mesopotámicos",
    svgType: "wyrm", colorPrimary: "#37474f", colorSecondary: "#ff7043", glowColor: "#ffab91"
  },
{
    id: 73, name: "Illuyanka Hatti", title: "El Dragón de las Rocas de Anatolia", mythology: "Mesopotámica y Medio Oriente", type: "Wyrm", element: "Tierra", danger: 3,
    habitat: "Cañones de Capadocia", ability: "Camuflaje de Piedra Caliza y Vuelo Bajo", weakness: "Agua Dulce de Lluvia",
    scroll: "Un dragón serpiente que habitaba en las chimeneas de fadas de Capadocia. Se mimetizaba con las rocas porosas hasta confundirse por completo con el paisaje.",
    physicalDescription: "ancient limestone earth serpent dragon blending into porous fairy chimney rocks and stone spires of Cappadocia, sandy brown scales, Wyrm dragon with Tierra powers in Cañones de Capadocia",
    svgType: "wyrm", colorPrimary: "#8d6e63", colorSecondary: "#d7ccc8", glowColor: "#efebe9"
  },
{
    id: 74, name: "Shedu Serpiente", title: "El Guardián Alado del Palacio", mythology: "Mesopotámica y Medio Oriente", type: "Ampithere", element: "Luz", danger: 3,
    habitat: "Palacio de Nínive", ability: "Protección Divina contra el Mal", weakness: "Destrucción de las Runas de la Entrada",
    scroll: "Un dragón protector tallado a la entrada de los palacios reales asirios para espantar a los espíritus malvados con su sola mirada severa.",
    physicalDescription: "majestic winged palace guardian dragon serpent with golden feathered wings, solar lion crown, sparkling golden scales, standing at ancient Assyrian gates, Ampithere dragon with Luz powers in Palacio de Nínive",
    svgType: "ampithere", colorPrimary: "#ffb300", colorSecondary: "#fff8e1", glowColor: "#ffe082"
  },
{
    id: 75, name: "Skrimsl", title: "El Dragón Astral de Islandia", mythology: "Nórdica y Germánica", type: "Wyrm", element: "Agua", danger: 3,
    habitat: "Lagos y Fiordos Helados de Islandia", ability: "Materialización Astral, Camuflaje de Niebla y Nado Telúrico", weakness: "Luz Solar Directa sin Niebla",
    scroll: "Los tomos secretos revelan que Skrimsl es un dragón de agua astral que vive en una dimensión paralela de energía, capaz de materializarse físicamente en nuestro mundo. ¡Fue avistado por navegantes en las heladas aguas de Islandia en 1860! Su cuerpo serpentino sin patas ni alas posee escamas plateadas y verde-azuladas con una cresta de suaves barbas plumosas que flotan como ensueños en la niebla glacial.",
    physicalDescription: "wingless serpentine water dragon with flat snake head, horny eye sockets, feathery chin fringes and spine crest, silvery blue scales in misty icy lake, Wyrm dragon with Agua powers in Lagos Helados de Islandia",
    svgType: "wyrm", colorPrimary: "#37474f", colorSecondary: "#80deea", glowColor: "#80d8ff"
  },
{
    id: 76, name: "Vritra", title: "El Dragón Bloqueador de los Ríos", mythology: "Hindú y Sudeste Asiático", type: "Wyrm", element: "Tierra", danger: 5,
    habitat: "Montañas del Indo", ability: "Absorción de Todas las Aguas del Mundo y Sequía", weakness: "El Rayo Vajra del Dios Indra",
    scroll: "En los textos del Rigveda, Vritra era el Asura dragón que encerró a los 99 ríos del mundo dentro de su vientre causando la primera gran sequía de la humanidad.",
    physicalDescription: "massive dark earth serpent wyrm with swollen belly trapping ninety-nine rivers, dry cracked brown scales, blocking mountain valley waterfalls, Wyrm dragon with Tierra powers in Montañas del Indo",
    svgType: "wyrm", colorPrimary: "#4e342e", colorSecondary: "#ff6f00", glowColor: "#ffab00"
  },
{
    id: 77, name: "Kaliya", title: "El Dragón Venenoso de Cinco Cabezas", mythology: "Hindú y Sudeste Asiático", type: "Hidra", element: "Veneno", danger: 4,
    habitat: "Río Yamuna (Vrindavan)", ability: "Agua Hierve con Veneno y Cinco Capuchas de Cobra", weakness: "La Danza Divina del Joven Krishna",
    scroll: "Una serpiente dragón de cinco cabezas que envenenaba las aguas del río Yamuna. Krishna subió a sus cabezas y ejecutó una danza cósmica hasta amansarla y pedirle que nadara pacíficamente hacia el océano.",
    physicalDescription: "fearsome five-headed cobra dragon hydra with dark emerald green hoods, glowing toxic yellow eyes, dripping luminous green venom into boiling river waters, Hidra dragon with Veneno powers in Río Yamuna (Vrindavan)",
    svgType: "hidra", colorPrimary: "#004d40", colorSecondary: "#a7ffeb", glowColor: "#18ffff"
  },
{
    id: 78, name: "Phaya Naga", title: "El Dragón del Río Mekong", mythology: "Hindú y Sudeste Asiático", type: "Shen", element: "Fuego", danger: 3,
    habitat: "Río Mekong", ability: "Bolas de Fuego del Mekong y Bendición Fluvial", weakness: "Falta de Respeto al Río",
    scroll: "Se cree que habita en las profundidades del río Mekong. Cada año a finales de octubre se observa el fenómeno de las 'Bolas de Fuego del Naga', luces incandescentes que suben desde el agua hacia el cielo.",
    physicalDescription: "glowing red and gold serpent dragon emerging from the Mekong River under full moon, spitting incandescent fireball orbs into the night sky, Shen dragon with Fuego powers in Río Mekong",
    svgType: "shen", colorPrimary: "#c62828", colorSecondary: "#ffe082", glowColor: "#ffd54f"
  },
{
    id: 79, name: "Bakunawa", title: "El Devorador de Lunas de Filipinas", mythology: "Hindú y Sudeste Asiático", type: "Wyrm", element: "Sombra", danger: 5,
    habitat: "Cielos de Visayas", ability: "Causa Eclipses Lunares Tragándose la Luna", weakness: "Ruido de Tambores y Ollas de Metal golpeadas",
    scroll: "Un gigantesco dragón marino de Filipinas con boca tan ancha como el horizonte. Se enamoró de las siete lunas del cielo y comenzó a comérselas una por una hasta que los pobladores aprendieron a hacer tanto ruido con ollas que las escupía de susto.",
    physicalDescription: "colossal deep violet sea serpent dragon with gaping wide jaw swallowing a glowing silver crescent moon in dark starry eclipse sky, Wyrm dragon with Sombra powers in Cielos de Visayas",
    svgType: "wyrm", colorPrimary: "#1a237e", colorSecondary: "#e040fb", glowColor: "#ea80fc"
  },
{
    id: 80, name: "Makara Dragón", title: "El Monstruo Acuático Vehículo de las Diosas", mythology: "Hindú y Sudeste Asiático", type: "Otros", element: "Agua", danger: 3,
    habitat: "Ríos Sagrados de India", ability: "Cuerpo de Cocodrilo, Trompa de Elefante y Cola de Dragón", weakness: "Redes Sagradas de Seda",
    scroll: "Criatura mítica que combina la cabeza de cocodrilo o dragón con cuerpo de pez y trompa de elefante. Es la montura sagrada de la diosa del río Ganga.",
    physicalDescription: "mystical aquatic chimera dragon with crocodile head, curled elephant trunk, scaly fish body, swimming gracefully in lotus river, Drake dragon with Agua powers in Ríos Sagrados de India",
    svgType: "draco", colorPrimary: "#00695c", colorSecondary: "#80cbc4", glowColor: "#80e27e"
  },
{
    id: 81, name: "Naga Vasuki", title: "El Rey Dragón de la Cuerda Cósmica", mythology: "Hindú y Sudeste Asiático", type: "Basilisco", element: "Luz", danger: 4,
    habitat: "Cuello del Dios Shiva", ability: "Batido del Océano de Leche y Resistencia Divina", weakness: "Garuḍa el Ave Celestial",
    scroll: "Utilizado por los devas y asuras como cuerda gigantesca alrededor del Monte Mandara para batir el océano de leche y extraer el elíxir de la inmortalidad.",
    physicalDescription: "golden radiant multi-hooded Naga serpent dragon coiled around a sacred cosmic mountain churning the ocean of milk, Shen dragon with Luz powers in Cuello del Dios Shiva",
    svgType: "shen", colorPrimary: "#ff6f00", colorSecondary: "#fff3e0", glowColor: "#ffe082"
  },
{
    id: 82, name: "Antaboga", title: "El Dragón de la Tierra de Bali", mythology: "Hindú y Sudeste Asiático", type: "Wyrm", element: "Tierra", danger: 3,
    habitat: "Profundidades del Monte Agung", ability: "Meditación Cósmica y Creación de la Tortuga Bedawang", weakness: "Ruidos Estridentes",
    scroll: "En la mitología de Bali, Antaboga creó a la tortuga gigante Bedawang sobre la cual descansa toda la isla de Bali.",
    physicalDescription: "majestic Balinese earth serpent dragon with ornate crown, brown mossy scales, wrapping around a giant cosmic turtle carrying the island of Bali, Wyrm dragon with Tierra powers in Profundidades del Monte Agung",
    svgType: "wyrm", colorPrimary: "#4e342e", colorSecondary: "#a1887f", glowColor: "#bcaaa4"
  },
{
    id: 83, name: "Taxaka", title: "El Dragón Rey de las Serpientes de Takshashila", mythology: "Hindú y Sudeste Asiático", type: "Wyrm", element: "Veneno", danger: 4,
    habitat: "Bosque de Khandava", ability: "Vuelo de Veneno y Transformación en Humano", weakness: "El Sacrificio de Serpientes de Janamejaya",
    scroll: "Mencionando en el Mahabharata como el astuto rey de las serpientes dragón que podía cambiar de forma a voluntad para proteger a su pueblo.",
    physicalDescription: "wingless serpent-like dragon with coiled body and sharp claws featuring acidic emerald green scales and dripping venomous mist with main colors #2e7d32 and #a5d6a7",
    svgType: "wyrm", colorPrimary: "#2e7d32", colorSecondary: "#a5d6a7", glowColor: "#c8e6c9"
  },
{
    id: 84, name: "Dragón de San Jorge", title: "El Terror de la Villa de Silene", mythology: "Europea Continental", type: "Dragón Europeo", element: "Fuego", danger: 4,
    habitat: "Laguna de Silene (Libia / Europa Medieval)", ability: "Aliento de Pestilencia y Escamas Afiladas", weakness: "La Lanza Asalon de San Jorge y la Cruz Bendita",
    scroll: "El dragón más célebre de los cuentos de caballería medievales. Aterrorizaba a un reino pidiendo raciones diarias hasta que el caballero San Jorge lo enfrentó para salvar a la princesa.",
    physicalDescription: "four-legged classic dragon with majestic wings and scaled chest featuring blazing fiery scales and glowing ember accents with main colors #b71c1c and #ffe082",
    svgType: "draco", colorPrimary: "#b71c1c", colorSecondary: "#ffe082", glowColor: "#ffb74d"
  },
{
    id: 85, name: "Peluda de Maine", title: "La Bestia del Río Huisne", mythology: "Europea Continental", type: "Drake", element: "Agua", danger: 4,
    habitat: "Río Huisne (Francia)", ability: "Lanzamiento de Púas Venenosas y Maremoto de Río", weakness: "Corte Preciso en la Cola",
    scroll: "Un extraño dragón cubierto de pelaje verde lleno de púas venenosas del tamaño de jabalinas. Se refugiaba en el río y podía disparar sus púas como si fueran flechas.",
    physicalDescription: "majestic dragon featuring magical elemental aura with main colors #33691e and #76ff03",
    svgType: "draco", colorPrimary: "#33691e", colorSecondary: "#76ff03", glowColor: "#b2ff59"
  },
{
    id: 86, name: "Basilisco de Vilna", title: "El Rey de la Mirada Mortal", mythology: "Eslava y Este de Europa", type: "Basilisco", element: "Veneno", danger: 3,
    habitat: "Catacumbas de Vilna", ability: "Petrificación con la Mirada y Aliento Secante", weakness: "Un Espejo que Refleje su Propia Mirada",
    scroll: "Nacido de un huevo de gallina empollado por un sapo bajo una estrella de mal agüero. Podía petrificar a cualquier criatura viva con tan solo mirarla a los ojos.",
    physicalDescription: "majestic dragon featuring acidic emerald green scales and dripping venomous mist with main colors #1b5e20 and #eeff41",
    svgType: "basilisco", colorPrimary: "#1b5e20", colorSecondary: "#eeff41", glowColor: "#c0ca33"
  },
{
    id: 87, name: "Cocatriz de Hampshire", title: "El Dragón con Cabeza de Gallo", mythology: "Celta y Británica", type: "Otros", element: "Viento", danger: 4,
    habitat: "Pueblo de Wherwell", ability: "Canto Paralizante y Vuelo Ágil", weakness: "El Canto de un Gallo Real",
    scroll: "Un mítico ser con cuerpo de wyvern y cabeza de gallo de plumas incandescentes. Su solo aliento marchitaba las flores y hacía tropezar a los caballos de los caballeros.",
    physicalDescription: "majestic dragon featuring magical elemental aura with main colors #e65100 and #ffecb3",
    svgType: "basilisco", colorPrimary: "#e65100", colorSecondary: "#ffecb3", glowColor: "#ffe082"
  },
{
    id: 88, name: "Gárgola de Ruán", title: "El Origen Legendario del Mito Catedralicio", mythology: "Europea Continental", type: "Otros", element: "Fuego", danger: 2,
    habitat: "Pantanos de la Margen Izquierda del Río Sena (Normandía, Francia)", ability: "Llamaradas de Fuego Abrasador, Ráfagas Ciclónicas e Inundaciones", weakness: "Las Oraciones de San Román (Obispo de Ruán)",
    scroll: "La Gárgola de Ruán (conocida en francés como La Gargouille) es la criatura legendaria que dio origen al término y al mito arquitectónico de las gárgolas medievales. Según la tradición de Normandía del siglo VII, este feroz dragón acuático de cuello largo, alas de murciélago y garras afiladas habitaba los pantanos del río Sena. Asolaba las orillas exhalando llamaradas de fuego, provocando inundaciones destructivas, hundiendo embarcaciones y exigiendo sacrificios humanos anuales a los pobladores, hasta ser enfrentado por el obispo San Román.",
    physicalDescription: "monstrous aquatic serpent wyrm dragon with long slender neck, bat-like wings, sharp claws, exhaling blazing flames and water torrents near the Seine river swamps in Normandy, Wyrm dragon with Fuego powers in Río Sena (Francia)",
    svgType: "wyrm", colorPrimary: "#c62828", colorSecondary: "#ff8f00", glowColor: "#ff5252"
  },
{
    id: 89, name: "Herensuge Vasco", title: "El Dragón de Siete Cabezas de los Pirineos", mythology: "Europea Continental", type: "Hidra", element: "Fuego", danger: 5,
    habitat: "Cuevas de los Pirineos", ability: "Vuelo Estelar y Fuego Devorador", weakness: "Suena la Campana de San Miguel",
    scroll: "Legendario dragón vasco que volaba echando llamas por las siete bocas. Atraía a los viajeros cantando con un tono hipnótico entre los desfiladeros de la montaña.",
    physicalDescription: "multi-headed serpentine hydra dragon with multiple long necks featuring blazing fiery scales and glowing ember accents with main colors #4e342e and #ff3d00",
    svgType: "hidra", colorPrimary: "#4e342e", colorSecondary: "#ff3d00", glowColor: "#ff9100"
  },
{
    id: 90, name: "Bisu de Cerdeña", title: "El Dragón Somnoliento de las Torres", mythology: "Europea Continental", type: "Dragón Europeo", element: "Sombra", danger: 2,
    habitat: "Ruinas Nurágicas de Cerdeña", ability: "Canto de Dulces Sueños", weakness: "Ruidos Fuertes de Campanas",
    scroll: "Un pequeño dragón pacífico que vive en las antiguas torres Nuraghes de Cerdeña. Se pasa el día durmiendo al sol y soñando con estrellas de colores.",
    physicalDescription: "four-legged classic dragon with majestic wings and scaled chest featuring dark shadowed purple scales and abyssal twilight smoke with main colors #4a148c and #d1c4e9",
    svgType: "draco", colorPrimary: "#4a148c", colorSecondary: "#d1c4e9", glowColor: "#b388ff"
  },
{
    id: 91, name: "Guivre de Borgoña", title: "El Dragón de los Viñedos Franceses", mythology: "Europea Continental", type: "Wyrm", element: "Veneno", danger: 3,
    habitat: "Bosques de Borgoña", ability: "Picadura Ácida y Vuelo Deslizado", weakness: "Ver a una Persona Sin Miedo",
    scroll: "Tenía un cuerpo largo de serpiente con alas de murciélago y cuernos de ciervo. Huía a toda velocidad si alguien lo miraba fijamente a los ojos sin mostrar una gota de temor.",
    physicalDescription: "wingless serpent-like dragon with coiled body and sharp claws featuring acidic emerald green scales and dripping venomous mist with main colors #1b5e20 and #ccff90",
    svgType: "wyrm", colorPrimary: "#1b5e20", colorSecondary: "#ccff90", glowColor: "#b2ff59"
  },
{
    id: 92, name: "Vouivre de los Alpes", title: "La Dama Dragón del Carbúnculo Rojo", mythology: "Europea Continental", type: "Wyvern", element: "Luz", danger: 3,
    habitat: "Lagos de los Alpes", ability: "La Gema Carbúnculo de la Frente (Resplandor Sol)", weakness: "Robar la Gema cuando se Baña en el Lago",
    scroll: "Lleva en la frente una piedra preciosa roja brillante llamada 'Carbúnculo' que ilumina las montañas en las noches frías. Cuando se baña en el agua cristalina del lago, deja la gema en la orilla.",
    physicalDescription: "two-legged agile winged dragon with spiked tail and slender snout featuring golden radiant celestial scales and brilliant solar sparks with main colors #b71c1c and #ffd700",
    svgType: "wyvern", colorPrimary: "#b71c1c", colorSecondary: "#ffd700", glowColor: "#ffff00"
  },
{
    id: 93, name: "Dragón de la Cueva de Drachenfels", title: "El Dragón del Río Rhin", mythology: "Nórdica y Germánica", type: "Dragón Europeo", element: "Fuego", danger: 4,
    habitat: "Roca de Drachenfels (Alemania)", ability: "Aliento de Fuego Volcánico y Escamas de Hierro", weakness: "La Espada Balmung del Héroe Sigfrido",
    scroll: "Vivía en una caverna sobre el río Rhin exigiendo ofrendas. El héroe Sigfrido lo derrotó y al bañarse en la sangre del dragón obtuvo una piel impenetrable.",
    physicalDescription: "four-legged classic dragon with majestic wings and scaled chest featuring blazing fiery scales and glowing ember accents with main colors #212121 and #ff6f00",
    svgType: "draco", colorPrimary: "#212121", colorSecondary: "#ff6f00", glowColor: "#ff9100"
  },
{
    id: 94, name: "Dragón Astral del Cosmos", title: "El Tejedor de las Constelaciones", mythology: "Leyenda del Santuario", type: "Ampithere", element: "Luz", danger: 5,
    habitat: "Órbita de las Estrellas Fugaces", ability: "Polvo de Galaxias y Rayo Cósmico", weakness: "Ninguna conocida por los mortales",
    scroll: "Un dragón místico cuyas alas transparentes contienen mapas de galaxias lejanas. Vuela en el espacio profundo encendiendo las estrellas fugaces que piden los chicos por las noches.",
    physicalDescription: "feathered-winged serpent dragon with vibrant crest featuring golden radiant celestial scales and brilliant solar sparks with main colors #4a148c and #00e5ff",
    svgType: "ampithere", colorPrimary: "#4a148c", colorSecondary: "#00e5ff", glowColor: "#18ffff"
  },
{
    id: 95, name: "Dragón de Magma Ancestral", title: "El Guardián del Núcleo de la Tierra", mythology: "Leyenda del Santuario", type: "Dragón Europeo", element: "Magma", danger: 5,
    habitat: "Núcleo Fundido del Planeta", ability: "Tsunami de Lava y Piel de Obsidiana Candente", weakness: "Hielo Estelar",
    scroll: "Duerma placidamente cerca del centro de la Tierra. Cuando bosteza, los volcanes del mundo expulsan chispas de luz dorada y piedras brillantes.",
    physicalDescription: "four-legged classic dragon with majestic wings and scaled chest featuring volcano lava scales with glowing molten core with main colors #bf360c and #ffab91",
    svgType: "draco", colorPrimary: "#bf360c", colorSecondary: "#ffab91", glowColor: "#ff6e40"
  },
{
    id: 96, name: "Dragón de Cristal de Aurora", title: "El Reflejo de las Luces Polares", mythology: "Leyenda del Santuario", type: "Dragón Europeo", element: "Cristal", danger: 3,
    habitat: "Polos de Hielo Eterno", ability: "Prisma de Colores y Rayo Espejo", weakness: "Oscuridad Absoluta",
    scroll: "Sus escamas son cristales de cuarzo puro que descomponen la luz del sol en los hermosos colores violeta, verde y rosa de la aurora boreal.",
    physicalDescription: "four-legged classic dragon with majestic wings and scaled chest featuring magical elemental aura with main colors #00b0ff and #ea80fc",
    svgType: "draco", colorPrimary: "#00b0ff", colorSecondary: "#ea80fc", glowColor: "#e040fb"
  },
{
    id: 97, name: "Dragón del Abismo de Sombras", title: "El Caminante de los Sueños Secretos", mythology: "Leyenda del Santuario", type: "Wyrm", element: "Sombra", danger: 4,
    habitat: "Dimensión del Crepúsculo", ability: "Paso Incorpóreo y Esfumado de Humo", weakness: "Luz de la Linterna de Oro",
    scroll: "Se desliza suavemente por las sombras sin hacer ruido. Le gusta proteger los sueños de los niños ahuyentando las pesadillas con sus cuernos de plata.",
    physicalDescription: "wingless serpent-like dragon with coiled body and sharp claws featuring dark shadowed purple scales and abyssal twilight smoke with main colors #1a162b and #9c27b0",
    svgType: "wyrm", colorPrimary: "#1a162b", colorSecondary: "#9c27b0", glowColor: "#d500f9"
  },
{
    id: 98, name: "Dragón de la Tormenta Solar", title: "La Chispa del Sol Radiante", mythology: "Leyenda del Santuario", type: "Ampithere", element: "Tormenta", danger: 4,
    habitat: "Corona Solar", ability: "Llamarada Solar y Vuelo a Velocidad Luz", weakness: "Niebla de Cometa Helado",
    scroll: "Un dragón majestuoso compuesto de energía pura de helio e hidrógeno. Vuela alrededor del sol jugando con las llamaradas solares.",
    physicalDescription: "feathered-winged serpent dragon with vibrant crest featuring electric crackling scales and sparkling lightning sparks with main colors #ff6f00 and #ffff00",
    svgType: "ampithere", colorPrimary: "#ff6f00", colorSecondary: "#ffff00", glowColor: "#ffff8d"
  },
{
    id: 99, name: "Dragón Fénix de Esmeralda", title: "El Renacido de las Hojas Ancestrales", mythology: "Leyenda del Santuario", type: "Ampithere", element: "Naturaleza", danger: 3,
    habitat: "Bosque Mágico Inexplorado", ability: "Brote de Plantas Gigantes y Renacimiento de Semilla", weakness: "Fuego de Carbón",
    scroll: "Cuando envejece, se convierte en un brote verde brillante de árbol del que nace un dragón joven y vibrante lleno de energía para renovar los bosques.",
    physicalDescription: "feathered-winged serpent dragon with vibrant crest featuring magical elemental aura with main colors #1b5e20 and #b2ff59",
    svgType: "ampithere", colorPrimary: "#1b5e20", colorSecondary: "#b2ff59", glowColor: "#69f0ae"
  },
{
    id: 100, name: "Dragón de Runas Antiguas", title: "El Sabio Eterno del Santuario", mythology: "Leyenda del Santuario", type: "Otros", element: "Luz", danger: 5,
    habitat: "Biblioteca Secreta del Santuario", ability: "Conocimiento de Todos los Idiomas y Aliento de Sabiduría", weakness: "El Olvido",
    scroll: "El dragón guardián supremo de esta enciclopedia. Lleva inscritas en sus escamas las historias de los más de 100 dragones del mundo y da la bienvenida a todos los jóvenes guardianes que desean aprender sobre la grandeza de los dragones.",
    physicalDescription: "oriental long serpentine dragon with flowing whiskers and floating crest featuring golden radiant celestial scales and brilliant solar sparks with main colors #ffd700 and #ffffff",
    svgType: "wyrm", colorPrimary: "#37474f", colorSecondary: "#ff7043", glowColor: "#ffab91"
  },
{
    id: 101, name: "Ignitharyon", title: "El Heredero del Fuego Venenoso", mythology: "Leyenda del Santuario", type: "Wyvern", element: "Fuego", danger: 5,
    habitat: "Cumbres Sagradas del Santuario", ability: "Llamaradas Verdes Venenosas, Fuego Sanador y Vuelo Ágil", weakness: "Ninguna",
    scroll: "Hijo de Magus Dragus y fiel compañero de aventuras. Ignitharyon es un wyvern invencible con escamas escarlata y doradas capaz de exhalar ráfagas de fuego verde de veneno abrasador sobre sus rivales, así como también un poderoso fuego sanador que restaura la vida y cura cualquier herida. Posee una fuerza legendaria tan colosal que es capaz de derrotar al mismísimo Leviatán en combate.",
    physicalDescription: "agile two-legged red and orange wyvern dragon with massive wings carrying a young rider with a glowing sword, exhaling brilliant green poisonous flames over coastal cliffs, Wyvern dragon with Fuego powers in Cumbres Sagradas del Santuario",
    svgType: "wyvern", colorPrimary: "#d84315", colorSecondary: "#76ff03", glowColor: "#b2ff59"
  },
{
    id: 102, name: "Zenith", title: "El Gemelo Impenetrable de las Cumbres", mythology: "Leyenda del Santuario", type: "Drake", element: "Fuego", danger: 3,
    habitat: "Prados y Colinas Místicas del Santuario", ability: "Visión Doble Coordinada, Aliento Dual de Fuego Violeta y Escamas Impenetrables", weakness: "Descoordinación entre Cabezas por Distracción",
    scroll: "Hijo menor de Magus Dragus y hermano de Ignitharyon y Traxes. Zenith es un singular dragón de dos cabezas y tipo Drake, cubierto por una armadura de escamas violetas totalmente impenetrables. Sus dos cabezas independientes le permiten vigilar en todas direcciones simultáneamente y lanzar ráfagas sincronizadas de fuego místico mientras corre a toda velocidad por las colinas.",
    physicalDescription: "colossal two-headed wingless drake dragon with deep violet scales, glowing eyes, Drake dragon with Fuego powers in Prados Místicos del Santuario",
    svgType: "draco", colorPrimary: "#6a1b9a", colorSecondary: "#e1bee7", glowColor: "#ea80fc"
  },
{
    id: 103, name: "Traxes", title: "El Señor de las Espirales Igneas", mythology: "Leyenda del Santuario", type: "Dragón Europeo", element: "Fuego", danger: 4,
    habitat: "Cráteres Volcánicos del Santuario", ability: "Vórtice Ciclónico de Fuego Espiral y Vuelo Dominante", weakness: "Flechazos Directos a las Alas y Hachazos de Obsidiana Sagrada",
    scroll: "Hijo de Magus Dragus y hermano de Ignitharyon y Zenith. Traxes es un majestuoso y feroz Dragón Europeo de imponentes escamas grises pizarra y amplias alas membranosas. Domina los cielos volcánicos desplegando su legendario ataque: ráfagas ciclónicas de fuego hirviente que descienden en espiral destructiva sobre el cráter de las cumbres.",
    physicalDescription: "colossal slate-grey European dragon with large wings hovering over volcanic crater exhaling swirling spiral vortex of crimson flames, Dragón Europeo dragon with Fuego powers in Cráteres Volcánicos",
    svgType: "draco", colorPrimary: "#455a64", colorSecondary: "#ff6d00", glowColor: "#ff9e80"
  }
];



  // 3. SVG GENERATORS

function renderSigilSVG(state, consonants, width = 600, height = 600) {
  const pCol = state.colorPrimary || "#ffd700";
  const sCol = state.colorSecondary || "#2a9d8f";
  const gCol = state.colorGlow || state.glowColor || "#e76f51";
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

  // Sacred Geometry Background Lines (Pentáculo Sagrado de 5 Puntas)
  let pentaclePath = "";
  const rPent = radius * 1.08;
  const pentPoints = [];
  for (let k = 0; k < 5; k++) {
    const a = (k * 2 * Math.PI) / 5 - Math.PI / 2;
    pentPoints.push({
      x: cx + rPent * Math.cos(a),
      y: cy + rPent * Math.sin(a)
    });
  }
  const pentSeq = [pentPoints[0], pentPoints[2], pentPoints[4], pentPoints[1], pentPoints[3]];
  const pentPolyStr = pentSeq.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  pentaclePath = `
    <!-- Pentáculo de 5 puntas de fondo -->
    <circle cx="${cx}" cy="${cy}" r="${rPent.toFixed(1)}" stroke="${sCol}" stroke-width="2" fill="none" opacity="0.6" />
    <polygon points="${pentPolyStr}" stroke="${gCol}" stroke-width="1.8" fill="none" opacity="0.65" filter="url(#sigilGlowFilter)" />
  `;

  // Element Specific Aura Paths
  let auraSvg = "";

    if (element === "Rayo") {
    // 2 Rayos cruzados plenos (sin líneas punteadas), gruesos, más cortos y con clara forma de zig-zag
    const r1_p1 = `${(cx - radius * 0.75).toFixed(1)},${(cy - radius * 0.75).toFixed(1)}`;
    const r1_p2 = `${(cx - radius * 0.20).toFixed(1)},${(cy - radius * 0.40).toFixed(1)}`;
    const r1_p3 = `${(cx - radius * 0.35).toFixed(1)},${(cy - radius * 0.05).toFixed(1)}`;
    const r1_p4 = `${(cx + radius * 0.30).toFixed(1)},${(cy + radius * 0.20).toFixed(1)}`;
    const r1_p5 = `${(cx + radius * 0.10).toFixed(1)},${(cy + radius * 0.40).toFixed(1)}`;
    const r1_p6 = `${(cx + radius * 0.75).toFixed(1)},${(cy + radius * 0.75).toFixed(1)}`;
    const path1 = `M ${r1_p1} L ${r1_p2} L ${r1_p3} L ${r1_p4} L ${r1_p5} L ${r1_p6}`;

    const r2_p1 = `${(cx + radius * 0.75).toFixed(1)},${(cy - radius * 0.75).toFixed(1)}`;
    const r2_p2 = `${(cx + radius * 0.20).toFixed(1)},${(cy - radius * 0.40).toFixed(1)}`;
    const r2_p3 = `${(cx + radius * 0.35).toFixed(1)},${(cy - radius * 0.05).toFixed(1)}`;
    const r2_p4 = `${(cx - radius * 0.30).toFixed(1)},${(cy + radius * 0.20).toFixed(1)}`;
    const r2_p5 = `${(cx - radius * 0.10).toFixed(1)},${(cy + radius * 0.40).toFixed(1)}`;
    const r2_p6 = `${(cx - radius * 0.75).toFixed(1)},${(cy + radius * 0.75).toFixed(1)}`;
    const path2 = `M ${r2_p1} L ${r2_p2} L ${r2_p3} L ${r2_p4} L ${r2_p5} L ${r2_p6}`;

    auraSvg = `
      <path d="${path1}" stroke="${gCol}" stroke-width="6" fill="none" stroke-linecap="square" stroke-linejoin="miter" filter="url(#sigilGlowFilter)" />
      <path d="${path1}" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="square" stroke-linejoin="miter" />

      <path d="${path2}" stroke="${pCol}" stroke-width="5" fill="none" stroke-linecap="square" stroke-linejoin="miter" filter="url(#sigilGlowFilter)" />
      <path d="${path2}" stroke="#ffd700" stroke-width="2.5" fill="none" stroke-linecap="square" stroke-linejoin="miter" />
    `; } else if (element === "Fuego") {
    // 3 Triángulos picudos (Grande, Mediano, Pequeño) alineados por la base en el círculo principal
    const baseY = cy + radius * 0.90;
    
    // 1. Triángulo Grande (Outer)
    const x1_left = cx - radius * 0.85;
    const x1_right = cx + radius * 0.85;
    const y1_top = cy - radius * 1.45;
    
    // 2. Triángulo Mediano (Middle)
    const x2_left = cx - radius * 0.58;
    const x2_right = cx + radius * 0.58;
    const y2_top = cy - radius * 1.05;
    
    // 3. Triángulo Pequeño (Inner)
    const x3_left = cx - radius * 0.32;
    const x3_right = cx + radius * 0.32;
    const y3_top = cy - radius * 0.65;
    
    auraSvg = `
      <polygon points="${x1_left.toFixed(1)},${baseY.toFixed(1)} ${cx.toFixed(1)},${y1_top.toFixed(1)} ${x1_right.toFixed(1)},${baseY.toFixed(1)}" fill="none" stroke="${gCol}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" filter="url(#sigilGlowFilter)" />
      <polygon points="${x2_left.toFixed(1)},${baseY.toFixed(1)} ${cx.toFixed(1)},${y2_top.toFixed(1)} ${x2_right.toFixed(1)},${baseY.toFixed(1)}" fill="rgba(255, 69, 0, 0.15)" stroke="${pCol}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
      <polygon points="${x3_left.toFixed(1)},${baseY.toFixed(1)} ${cx.toFixed(1)},${y3_top.toFixed(1)} ${x3_right.toFixed(1)},${baseY.toFixed(1)}" fill="rgba(255, 215, 0, 0.25)" stroke="#ffffff" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />
      <line x1="${x1_left.toFixed(1)}" y1="${baseY.toFixed(1)}" x2="${x1_right.toFixed(1)}" y2="${baseY.toFixed(1)}" stroke="${pCol}" stroke-width="3" stroke-linecap="round" />
    `;   } else if (element === "Veneno") {
    // Línea serpenteante con ángulos suavizados (Catmull-Rom a Bezier cúbico suave)
    const getSmoothSerpentinePath = (rBase, amplitude, waves, nPts) => {
      let pts = [];
      for (let i = 0; i < nPts; i++) {
        const a = (i * 2 * Math.PI) / nPts;
        const rWave = rBase + Math.sin(a * waves) * amplitude;
        const x = cx + rWave * Math.cos(a);
        const y = cy + rWave * Math.sin(a);
        pts.push([x, y]);
      }
      let pathCmds = [`M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`];
      const len = pts.length;
      for (let i = 0; i < len; i++) {
        const p0 = pts[(i - 1 + len) % len];
        const p1 = pts[i];
        const p2 = pts[(i + 1) % len];
        const p3 = pts[(i + 2) % len];
        const cp1x = p1[0] + (p2[0] - p0[0]) / 6.0;
        const cp1y = p1[1] + (p2[1] - p0[1]) / 6.0;
        const cp2x = p2[0] - (p3[0] - p1[0]) / 6.0;
        const cp2y = p2[1] - (p3[1] - p1[1]) / 6.0;
        pathCmds.push(`C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`);
      }
      return pathCmds.join(" ") + " Z";
    };

    const venomPath = getSmoothSerpentinePath(radius * 1.12, 12, 8, 48);
    const innerPath = getSmoothSerpentinePath(radius * 1.05, 8, 8, 48);

    auraSvg = `
      <path d="${venomPath}" stroke="${gCol}" stroke-width="3" fill="none" filter="url(#sigilGlowFilter)" stroke-linecap="round" stroke-linejoin="round" />
      <path d="${innerPath}" stroke="${pCol}" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      <polygon points="${cx},${cy - radius - 28} ${cx - 10},${cy - radius - 14} ${cx + 10},${cy - radius - 14}" fill="${gCol}" stroke="${pCol}" stroke-width="1.5" />
      <circle cx="${cx - 4}" cy="${cy - radius - 18}" r="1.5" fill="#ffffff" />
      <circle cx="${cx + 4}" cy="${cy - radius - 18}" r="1.5" fill="#ffffff" />
    `; } else if (element === "Luz") {
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
      <circle cx="${cx}" cy="${cy}" r="${radius * 1.05}" stroke="${pCol}" stroke-width="1.5" fill="none" />
      <circle cx="${cx}" cy="${cy}" r="${radius * 1.28}" stroke="${gCol}" stroke-width="1" opacity="0.6" fill="none" />
    `;
    } else if (element === "Hielo") {
    // 1. Cristales geométricos actuales (Superior e Inferior) + Anillo exterior
    const baseCrystals = `
      <polygon points="${cx},${cy-radius-25} ${cx+15},${cy-radius-10} ${cx},${cy-radius+5} ${cx-15},${cy-radius-10}" fill="rgba(144,224,239,0.25)" stroke="${gCol}" stroke-width="2" />
      <polygon points="${cx},${cy+radius-5} ${cx+15},${cy+radius+10} ${cx},${cy+radius+25} ${cx-15},${cy+radius+10}" fill="rgba(144,224,239,0.25)" stroke="${gCol}" stroke-width="2" />
      <circle cx="${cx}" cy="${cy}" r="${radius*1.15}" stroke="${gCol}" stroke-width="1.8" fill="none" filter="url(#sigilGlowFilter)" />
    `;

    // 2. Cristales coincidentes con las 5 puntas del pentáculo
    const rPent = radius * 1.08;
    let pentCrystals = [];
    for (let k = 0; k < 5; k++) {
      const a = (k * 2 * Math.PI) / 5 - Math.PI / 2;
      const px = cx + rPent * Math.cos(a);
      const py = cy + rPent * Math.sin(a);
      const pt_top = `${(px + 12 * Math.cos(a)).toFixed(1)},${(py + 12 * Math.sin(a)).toFixed(1)}`;
      const pt_bottom = `${(px - 8 * Math.cos(a)).toFixed(1)},${(py - 8 * Math.sin(a)).toFixed(1)}`;
      const pt_left = `${(px + 7 * Math.cos(a + Math.PI / 2)).toFixed(1)},${(py + 7 * Math.sin(a + Math.PI / 2)).toFixed(1)}`;
      const pt_right = `${(px + 7 * Math.cos(a - Math.PI / 2)).toFixed(1)},${(py + 7 * Math.sin(a - Math.PI / 2)).toFixed(1)}`;
      pentCrystals.push(`<polygon points="${pt_top} ${pt_right} ${pt_bottom} ${pt_left}" fill="rgba(255,255,255,0.4)" stroke="${gCol}" stroke-width="1.8" filter="url(#sigilGlowFilter)" />`);
    }

    // 3. Cristales en el centro del espacio entre puntas del pentáculo
    const rMid = radius * 0.88;
    let midCrystals = [];
    for (let k = 0; k < 5; k++) {
      const a = (k * 2 * Math.PI) / 5 - Math.PI / 2 + Math.PI / 5;
      const mx = cx + rMid * Math.cos(a);
      const my = cy + rMid * Math.sin(a);
      const pt_top = `${(mx + 9 * Math.cos(a)).toFixed(1)},${(my + 9 * Math.sin(a)).toFixed(1)}`;
      const pt_bottom = `${(mx - 6 * Math.cos(a)).toFixed(1)},${(my - 6 * Math.sin(a)).toFixed(1)}`;
      const pt_left = `${(mx + 5 * Math.cos(a + Math.PI / 2)).toFixed(1)},${(my + 5 * Math.sin(a + Math.PI / 2)).toFixed(1)}`;
      const pt_right = `${(mx + 5 * Math.cos(a - Math.PI / 2)).toFixed(1)},${(my + 5 * Math.sin(a - Math.PI / 2)).toFixed(1)}`;
      midCrystals.push(`<polygon points="${pt_top} ${pt_right} ${pt_bottom} ${pt_left}" fill="rgba(0,119,182,0.3)" stroke="#ffffff" stroke-width="1.5" />`);
    }

    auraSvg = `
      ${baseCrystals}
      ${pentCrystals.join("")}
      ${midCrystals.join("")}
    `; } else if (element === "Sombra") {
    auraSvg = `
      <circle cx="${cx}" cy="${cy}" r="${radius*1.25}" stroke="${gCol}" stroke-width="2" fill="none" filter="url(#sigilGlowFilter)" />
      <circle cx="${cx}" cy="${cy}" r="${radius*1.15}" stroke="${pCol}" stroke-width="1" fill="none" />
    `;
  } else {
    auraSvg = `
      <circle cx="${cx}" cy="${cy}" r="${radius*1.18}" stroke="${gCol}" stroke-width="1.5" fill="none" />
    `;
  }

  // Horn Flourishes (Centered at Sigil Core cx, cy)
  let hornSvg = "";
  if (horn === "horns-classic") {
    // 1. Cuernos Clásicos (Draco Clásico): Más chicos, sin relleno (fill="none")
    const leftHorn = `M ${(cx - radius * 0.55).toFixed(1)} ${(cy + radius * 0.40).toFixed(1)} C ${(cx - radius * 0.95).toFixed(1)} ${(cy + radius * 0.20).toFixed(1)} ${(cx - radius * 1.00).toFixed(1)} ${(cy - radius * 0.25).toFixed(1)} ${(cx - radius * 0.35).toFixed(1)} ${(cy - radius * 0.75).toFixed(1)} C ${(cx - radius * 0.55).toFixed(1)} ${(cy - radius * 0.42).toFixed(1)} ${(cx - radius * 0.48).toFixed(1)} ${(cy - radius * 0.03).toFixed(1)} ${(cx - radius * 0.22).toFixed(1)} ${(cy + radius * 0.35).toFixed(1)} Q ${(cx - radius * 0.38).toFixed(1)} ${(cy + radius * 0.43).toFixed(1)} ${(cx - radius * 0.55).toFixed(1)} ${(cy + radius * 0.40).toFixed(1)} Z`;
    const rightHorn = `M ${(cx + radius * 0.55).toFixed(1)} ${(cy + radius * 0.40).toFixed(1)} C ${(cx + radius * 0.95).toFixed(1)} ${(cy + radius * 0.20).toFixed(1)} ${(cx + radius * 1.00).toFixed(1)} ${(cy - radius * 0.25).toFixed(1)} ${(cx + radius * 0.35).toFixed(1)} ${(cy - radius * 0.75).toFixed(1)} C ${(cx + radius * 0.55).toFixed(1)} ${(cy - radius * 0.42).toFixed(1)} ${(cx + radius * 0.48).toFixed(1)} ${(cy - radius * 0.03).toFixed(1)} ${(cx + radius * 0.22).toFixed(1)} ${(cy + radius * 0.35).toFixed(1)} Q ${(cx + radius * 0.38).toFixed(1)} ${(cy + radius * 0.43).toFixed(1)} ${(cx + radius * 0.55).toFixed(1)} ${(cy + radius * 0.40).toFixed(1)} Z`;

    hornSvg = `
      <!-- Cuernos Clásicos: Más chicos y sin relleno -->
      <path d="${leftHorn}" stroke="${pCol}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" filter="url(#sigilGlowFilter)" />
      <path d="${rightHorn}" stroke="${pCol}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" filter="url(#sigilGlowFilter)" />
    `;
      } else if (horn === "horns-ram") {
    // 2. Cuernos de Carnero Grandes: Llegan hasta la periferia del círculo y se tocan al centro
    const makeSpiralPath = (centerX, isRight = false) => {
      let pts = [];
      const nSteps = 60;
      const maxTurns = 2.4 * 2 * Math.PI;
      for (let step = 0; step <= nSteps; step++) {
        const t = (step / nSteps) * maxTurns;
        const r = 5 + t * 4.4;
        const angle = isRight ? -t : t;
        const x = centerX + r * Math.cos(angle + Math.PI / 2);
        const y = cy - 10 + r * Math.sin(angle + Math.PI / 2);
        pts.push([x, y]);
      }
      let cmd = [`M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`];
      for (let p of pts.slice(1)) {
        cmd.push(`L ${p[0].toFixed(1)} ${p[1].toFixed(1)}`);
      }
      return cmd.join(" ");
    };

    const ramLeft = makeSpiralPath(cx - radius * 0.48, false);
    const ramRight = makeSpiralPath(cx + radius * 0.48, true);

    hornSvg = `
      <!-- Cuernos de Carnero Grandes: Hasta la periferia del círculo -->
      <path d="${ramLeft}" stroke="${pCol}" stroke-width="3.8" fill="none" stroke-linecap="round" stroke-linejoin="round" filter="url(#sigilGlowFilter)" />
      <path d="${ramRight}" stroke="${pCol}" stroke-width="3.8" fill="none" stroke-linecap="round" stroke-linejoin="round" filter="url(#sigilGlowFilter)" />
    `; } else if (horn === "horns-crown") {
    // 3. Corona de Espinas: De lado a lado del círculo, más grande, sin relleno, 5 puntas
    const rX = radius * 0.98;
    const crownPts = `${(cx - rX).toFixed(1)},${(cy + 10).toFixed(1)} ${(cx - rX).toFixed(1)},${(cy - 35).toFixed(1)} ${(cx - radius * 0.7).toFixed(1)},${(cy - 5).toFixed(1)} ${(cx - radius * 0.48).toFixed(1)},${(cy - 58).toFixed(1)} ${(cx - radius * 0.24).toFixed(1)},${(cy - 12).toFixed(1)} ${cx.toFixed(1)},${(cy - 78).toFixed(1)} ${(cx + radius * 0.24).toFixed(1)},${(cy - 12).toFixed(1)} ${(cx + radius * 0.48).toFixed(1)},${(cy - 58).toFixed(1)} ${(cx + radius * 0.7).toFixed(1)},${(cy - 5).toFixed(1)} ${(cx + rX).toFixed(1)},${(cy - 35).toFixed(1)} ${(cx + rX).toFixed(1)},${(cy + 10).toFixed(1)}`;
    hornSvg = `
      <path d="M ${crownPts.replace(/ /g, " L ")} Q ${cx.toFixed(1)} ${(cy + 35).toFixed(1)} ${(cx - rX).toFixed(1)} ${(cy + 10).toFixed(1)} Z" stroke="${pCol}" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round" filter="url(#sigilGlowFilter)" />
    `;
  } else if (horn === "horns-unicorn") {
    // 4. Cuerno Único de Cristal: De la base al tope del círculo, sin sobresalir, sin rellenar
    const yBase = cy + radius;
    const yTop = cy - radius;
    hornSvg = `
      <polygon points="${(cx - 15).toFixed(1)},${yBase.toFixed(1)} ${cx.toFixed(1)},${yTop.toFixed(1)} ${(cx + 15).toFixed(1)},${yBase.toFixed(1)}" fill="none" stroke="${pCol}" stroke-width="3" stroke-linejoin="round" filter="url(#sigilGlowFilter)" />
      <line x1="${cx.toFixed(1)}" y1="${yBase.toFixed(1)}" x2="${cx.toFixed(1)}" y2="${yTop.toFixed(1)}" stroke="${gCol}" stroke-width="1.8" />
      <line x1="${(cx - 12).toFixed(1)}" y1="${(cy + radius * 0.5).toFixed(1)}" x2="${(cx + 12).toFixed(1)}" y2="${(cy + radius * 0.35).toFixed(1)}" stroke="${gCol}" stroke-width="1.8" />
      <line x1="${(cx - 9).toFixed(1)}" y1="${cy.toFixed(1)}" x2="${(cx + 9).toFixed(1)}" y2="${(cy - radius * 0.15).toFixed(1)}" stroke="${gCol}" stroke-width="1.8" />
      <line x1="${(cx - 6).toFixed(1)}" y1="${(cy - radius * 0.4).toFixed(1)}" x2="${(cx + 6).toFixed(1)}" y2="${(cy - radius * 0.55).toFixed(1)}" stroke="${gCol}" stroke-width="1.8" />
    `;
  }

  // Anatomical Outer Shape
  let bodyOutline = "";
  if (body === "draco") {
    // Draco Clásico: Triángulo de escudo apuntando hacia abajo (contrario a cresta triangular)
    bodyOutline = `
      <polygon points="${(cx - radius - 10).toFixed(1)},${(cy - radius * 0.7).toFixed(1)} ${(cx + radius + 10).toFixed(1)},${(cy - radius * 0.7).toFixed(1)} ${cx.toFixed(1)},${(cy + radius + 15).toFixed(1)}" stroke="${pCol}" stroke-width="2.5" fill="none" stroke-linejoin="round" />
    `;
    } else if (body === "shen") {
    bodyOutline = `
      <!-- Primary Centered Outer Ring -->
      <circle cx="${cx}" cy="${cy}" r="${radius}" stroke="${pCol}" stroke-width="4.2" fill="none" />
      <!-- Centered Oriental Shen Serpentine Wave (Yin-Yang / Infinity S-curves con líneas más gruesas) -->
      <path d="M ${cx} ${cy - radius} C ${cx + radius * 0.7} ${cy - radius * 0.5} ${cx - radius * 0.7} ${cy + radius * 0.5} ${cx} ${cy + radius}" stroke="${pCol}" stroke-width="3.8" fill="none" filter="url(#sigilGlowFilter)" />
      <path d="M ${cx} ${cy - radius} C ${cx - radius * 0.7} ${cy - radius * 0.5} ${cx + radius * 0.7} ${cy + radius * 0.5} ${cx} ${cy + radius}" stroke="${gCol}" stroke-width="3.5" fill="none" filter="url(#sigilGlowFilter)" />
      <!-- Sacred Central Shen Core Ring -->
      <circle cx="${cx}" cy="${cy}" r="${radius * 0.45}" stroke="${pCol}" stroke-width="3.0" fill="none" />
    `; } else if (body === "wyvern") {
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
  } else {
    bodyOutline = `<circle cx="${cx}" cy="${cy}" r="${radius}" stroke="${pCol}" stroke-width="2.5" fill="none" />`;
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
      <circle cx="${cx}" cy="${cy}" r="${radius*1.22}" stroke="rgba(255,215,0,0.3)" stroke-width="1.5" fill="rgba(0,0,0,0.25)" />

      <!-- Sacred Geometry Pentacle Background -->
      ${pentaclePath}

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



function getDragonArtworkSrc(dragon) {
  if (dragon && dragon.id <= 200) {
    const v = (dragon.id === 13) ? '?v=13_v2' : (dragon.id === 45) ? '?v=45_v2' : (dragon.id === 18) ? '?v=18_v2' : (dragon.id === 11) ? '?v=11_v2' : (dragon.id === 3) ? '?v=3_v2' : (dragon.id === 20) ? '?v=20_v2' : (dragon.id === 10) ? '?v=10_v2' : (dragon.id === 2) ? '?v=2_v2' : (dragon.id === 46) ? '?v=46_v2' : (dragon.id === 65) ? '?v=65_v2' : (dragon.id === 67) ? '?v=67_v2' : (dragon.id === 75) ? '?v=75_v2' : '';
    return `/assets/dragons/dragon_${dragon.id}.jpg${v}`;
  }
  return null;
}

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



  // 4. VIEWS

function slugify(text) {
  text = (text || "").toLowerCase();
  const replacements = {'á':'a', 'é':'e', 'í':'i', 'ó':'o', 'ú':'u', 'ñ':'n', 'ü':'u'};
  for (let k in replacements) {
    text = text.replace(new RegExp(k, 'g'), replacements[k]);
  }
  return text.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function renderDragonCardHTML(dragon) {
  const isFav = isFavorite(dragon.id);
  const dangerLevel = Math.max(1, Math.min(5, parseInt(dragon.danger || 1, 10)));
  const flames = "🔥".repeat(dangerLevel);
  const artSrc = getDragonArtworkSrc(dragon);
  const slug = slugify(dragon.name);

  const mediaHtml = artSrc
    ? `<img src="${artSrc}" alt="${dragon.name}" loading="lazy" decoding="async" class="dragon-artwork-img" />`
    : renderDragonSVG(dragon, 300, 200);

  return `
    <a href="/dragon/${slug}.html" class="dragon-card fantasy-panel" data-id="${dragon.id}" style="text-decoration: none; color: inherit; display: flex; flex-direction: column;">
      <button class="fav-btn ${isFav ? "active" : ""}" title="${isFav ? "Quitar de Favoritos" : "Guardar en Favoritos"}" onclick="event.preventDefault(); event.stopPropagation();">
        ${isFav ? "❤️" : "🤍"}
      </button>

      <div class="dragon-card-media">
        ${mediaHtml}
      </div>

      <div class="dragon-card-content">
        <span class="element-badge">${dragon.element}</span>
        <h3 class="dragon-name">${dragon.name}</h3>
        <p class="dragon-title">"${dragon.title}"</p>

        <div class="dragon-card-footer">
          <span class="mythology-tag">🏛️ ${dragon.mythology}</span>
          <span class="danger-tag">${flames}</span>
        </div>
      </div>
    </a>
  `;
}

function openDragonModal(dragon, onFavToggleCallback = null) {
  playSound("roar");

  const modalOverlay = document.getElementById("dragon-modal-overlay");
  const modalContent = document.getElementById("dragon-modal-content");

  if (!modalOverlay || !modalContent) return;

  const isFav = isFavorite(dragon.id);
  const flames = "🔥".repeat(dragon.danger);
  const artSrc = getDragonArtworkSrc(dragon);

  const mediaHtml = artSrc
    ? `<img src="${artSrc}" alt="${dragon.name}" class="modal-artwork-img" />`
    : renderDragonSVG(dragon, 340, 240);

  modalContent.innerHTML = `
    <button class="modal-close-btn" id="btn-close-modal">✖</button>
    <div class="modal-grid">
      <div class="modal-media-column">
        <div class="modal-img-frame">
          ${mediaHtml}
        </div>
        <div class="modal-actions margin-top-md">
          <button class="btn ${isFav ? "btn-secondary" : "btn-primary"} width-100" id="btn-modal-fav">
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
  if (btnClose) {
    btnClose.addEventListener("click", closeDragonModal);
  }

  modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) closeDragonModal();
  };

  const btnFav = modalContent.querySelector("#btn-modal-fav");
  if (btnFav) {
    btnFav.addEventListener("click", () => {
      toggleFavorite(dragon.id);
      openDragonModal(dragon, onFavToggleCallback);
      if (onFavToggleCallback) onFavToggleCallback();
    });
  }

  // Update URL parameter for deep-linking
  const url = new URL(window.location.href);
  url.searchParams.set("dragon", dragon.id);
  window.history.pushState({ dragonId: dragon.id }, "", url.toString());
}

function closeDragonModal() {
  const modalOverlay = document.getElementById("dragon-modal-overlay");
  if (modalOverlay) {
    modalOverlay.classList.remove("active");
  }

  // Remove dragon param from URL when closed
  const url = new URL(window.location.href);
  if (url.searchParams.has("dragon")) {
    url.searchParams.delete("dragon");
    window.history.pushState({}, "", url.toString());
  }
}



const ITEMS_PER_PAGE = 12;
let currentPage = 1;
let filteredDragons = [...DRAGONS_DATA].sort((a, b) => a.name.localeCompare(b.name));

function initEncyclopediaFilters() {
  const mythSelect = document.getElementById("filter-mythology");
  const elemSelect = document.getElementById("filter-element");
  const typeSelect = document.getElementById("filter-type");

  if (mythSelect) {
    const mythologies = ["Todas", ...new Set(DRAGONS_DATA.map(d => d.mythology))];
    mythSelect.innerHTML = mythologies.map(m => `<option value="${m}">${m === "Todas" ? "Todas las Mitologías" : m}</option>`).join("");
  }

  if (elemSelect) {
    const elements = ["Todos", ...new Set(DRAGONS_DATA.map(d => d.element))];
    elemSelect.innerHTML = elements.map(e => `<option value="${e}">${e === "Todos" ? "Todos los Elementos" : e}</option>`).join("");
  }

  if (typeSelect) {
    const rawTypes = new Set(DRAGONS_DATA.map(d => d.type));
    rawTypes.add("Drakón");
    rawTypes.add("Otros");
    const types = ["Todos", ...Array.from(rawTypes).sort()];
    typeSelect.innerHTML = types.map(t => `<option value="${t}">${t === "Todos" ? "Todos los Tipos" : t}</option>`).join("");
  }

  // Restore filter values from URL params on load
  const urlParams = new URLSearchParams(window.location.search);
  const searchInput = document.getElementById("search-input");
  const dangerSelect = document.getElementById("filter-danger");
  const sortSelect = document.getElementById("filter-sort");

  if (searchInput && urlParams.has("q")) searchInput.value = urlParams.get("q");
  if (mythSelect && urlParams.has("mitologia")) mythSelect.value = urlParams.get("mitologia");
  if (elemSelect && urlParams.has("elemento")) elemSelect.value = urlParams.get("elemento");
  if (typeSelect && urlParams.has("tipo")) typeSelect.value = urlParams.get("tipo");
  if (dangerSelect && urlParams.has("peligro")) dangerSelect.value = urlParams.get("peligro");
  if (sortSelect && urlParams.has("orden")) sortSelect.value = urlParams.get("orden");

  // Setup search and filter listeners
  if (searchInput) searchInput.addEventListener("input", () => applyFilters(true));
  if (mythSelect) mythSelect.addEventListener("change", () => applyFilters(true));
  if (elemSelect) elemSelect.addEventListener("change", () => applyFilters(true));
  if (typeSelect) typeSelect.addEventListener("change", () => applyFilters(true));
  if (dangerSelect) dangerSelect.addEventListener("change", () => applyFilters(true));
  if (sortSelect) sortSelect.addEventListener("change", () => applyFilters(true));

  const btnReset = document.getElementById("btn-reset-filters");
  if (btnReset) {
    btnReset.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (mythSelect) mythSelect.value = "Todas";
      if (elemSelect) elemSelect.value = "Todos";
      if (typeSelect) typeSelect.value = "Todos";
      if (dangerSelect) dangerSelect.value = "Todos";
      if (sortSelect) sortSelect.value = "name-asc";
      applyFilters(true);
    });
  }

  // Initial filtering based on URL (only if not on a static SSG detail page)
  if (!window.location.pathname.includes("/dragon/")) {
    applyFilters(false);
  }
}

function updateURLWithFilters(query, mythology, element, type, danger, sort) {
  const url = new URL(window.location.href);
  
  if (query) url.searchParams.set("q", query); else url.searchParams.delete("q");
  if (mythology && mythology !== "Todas") url.searchParams.set("mitologia", mythology); else url.searchParams.delete("mitologia");
  if (element && element !== "Todos") url.searchParams.set("elemento", element); else url.searchParams.delete("elemento");
  if (type && type !== "Todos") url.searchParams.set("tipo", type); else url.searchParams.delete("tipo");
  if (danger && danger !== "Todos") url.searchParams.set("peligro", danger); else url.searchParams.delete("peligro");
  if (sort && sort !== "name-asc") url.searchParams.set("orden", sort); else url.searchParams.delete("orden");

  window.history.replaceState({}, "", url.toString());
}

function applyFilters(shouldUpdateURL = true) {
  const query = (document.getElementById("search-input")?.value || "").toLowerCase().trim();
  
  const mVal = document.getElementById("filter-mythology")?.value;
  const mythology = (mVal && mVal.trim() !== "") ? mVal : "Todas";

  const eVal = document.getElementById("filter-element")?.value;
  const element = (eVal && eVal.trim() !== "") ? eVal : "Todos";

  const tVal = document.getElementById("filter-type")?.value;
  const type = (tVal && tVal.trim() !== "") ? tVal : "Todos";

  const dVal = document.getElementById("filter-danger")?.value;
  const danger = (dVal && dVal.trim() !== "") ? dVal : "Todos";

  const sort = document.getElementById("filter-sort")?.value || "name-asc";

  if (shouldUpdateURL) {
    updateURLWithFilters(query, mythology, element, type, danger, sort);
  }

  filteredDragons = DRAGONS_DATA.filter(d => {
    const matchQuery = !query || 
      d.name.toLowerCase().includes(query) || 
      d.title.toLowerCase().includes(query) || 
      d.mythology.toLowerCase().includes(query) || 
      d.ability.toLowerCase().includes(query) || 
      d.scroll.toLowerCase().includes(query);

    const matchMyth = mythology === "Todas" || d.mythology === mythology;
    const matchElem = element === "Todos" || d.element === element;
    const matchType = type === "Todos" || d.type === type;
    const matchDanger = danger === "Todos" || d.danger === parseInt(danger, 10);

    return matchQuery && matchMyth && matchElem && matchType && matchDanger;
  });

  if (sort === "name-asc") {
    filteredDragons.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "name-desc") {
    filteredDragons.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sort === "danger-desc") {
    filteredDragons.sort((a, b) => b.danger - a.danger);
  } else if (sort === "danger-asc") {
    filteredDragons.sort((a, b) => a.danger - b.danger);
  }

  currentPage = 1;
  renderEncyclopedia();
}

function renderEncyclopedia() {
  const grid = document.getElementById("dragons-grid");
  const countBadge = document.getElementById("results-count");
  const paginationBox = document.getElementById("pagination-box");

  if (!grid) return;

  if (countBadge) {
    countBadge.textContent = `${filteredDragons.length} Dragones Encontrados`;
  }

  if (filteredDragons.length === 0) {
    grid.innerHTML = `
      <div class="empty-state fantasy-panel width-100">
        <h3>🔍 No se encontraron dragones</h3>
        <p>Probá cambiando los filtros de búsqueda o reiniciando los parámetros.</p>
      </div>
    `;
    if (paginationBox) paginationBox.innerHTML = "";
    return;
  }

  const totalPages = Math.ceil(filteredDragons.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageDragons = filteredDragons.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  grid.innerHTML = pageDragons.map(dragon => renderDragonCardHTML(dragon)).join("");

  // Attach card click handlers for roar sound & favorite button
  grid.querySelectorAll(".dragon-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".fav-btn")) return;
      playSound("roar");
    });

    const btnFav = card.querySelector(".fav-btn");
    if (btnFav) {
      btnFav.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dragonId = parseInt(card.dataset.id, 10);
        toggleFavorite(dragonId);
        renderEncyclopedia();
      });
    }
  });

  // Render pagination controls
  if (paginationBox) {
    if (totalPages <= 1) {
      paginationBox.innerHTML = "";
    } else {
      let pageButtonsHtml = "";
      
      // Calculate numeric range to display
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + 4);
      if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
      }

      // Build page numbers buttons
      for (let p = startPage; p <= endPage; p++) {
        const isActive = p === currentPage;
        pageButtonsHtml += `
          <button class="pag-btn ${isActive ? "active" : ""}" data-page="${p}">
            ${p}
          </button>
        `;
      }

      paginationBox.innerHTML = `
        <div class="pagination-container">
          <button class="pag-btn nav-arrow" id="btn-first-page" ${currentPage === 1 ? "disabled" : ""} title="Primera página">⏮️ Primera</button>
          <button class="pag-btn nav-arrow" id="btn-prev-page" ${currentPage === 1 ? "disabled" : ""} title="Página anterior">◀ Anterior</button>
          
          <div class="pag-numbers-wrap">
            ${pageButtonsHtml}
          </div>

          <button class="pag-btn nav-arrow" id="btn-next-page" ${currentPage === totalPages ? "disabled" : ""} title="Página siguiente">Siguiente ▶</button>
          <button class="pag-btn nav-arrow" id="btn-last-page" ${currentPage === totalPages ? "disabled" : ""} title="Última página">Última ⏭️</button>
        </div>
      `;

      const btnFirst = paginationBox.querySelector("#btn-first-page");
      const btnPrev = paginationBox.querySelector("#btn-prev-page");
      const btnNext = paginationBox.querySelector("#btn-next-page");
      const btnLast = paginationBox.querySelector("#btn-last-page");

      if (btnFirst) {
        btnFirst.addEventListener("click", () => {
          if (currentPage !== 1) {
            currentPage = 1;
            playSound("click");
            renderEncyclopedia();
            window.scrollTo({ top: 300, behavior: "smooth" });
          }
        });
      }
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
      if (btnLast) {
        btnLast.addEventListener("click", () => {
          if (currentPage !== totalPages) {
            currentPage = totalPages;
            playSound("click");
            renderEncyclopedia();
            window.scrollTo({ top: 300, behavior: "smooth" });
          }
        });
      }

      paginationBox.querySelectorAll(".pag-btn[data-page]").forEach(btn => {
        btn.addEventListener("click", () => {
          const targetP = parseInt(btn.dataset.page, 10);
          if (targetP !== currentPage) {
            currentPage = targetP;
            playSound("click");
            renderEncyclopedia();
            window.scrollTo({ top: 300, behavior: "smooth" });
          }
        });
      });
    }
  }
}



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
  dragonName: "IGNITHARYON",
  bodyType: "draco",
  hornStyle: "horns-classic",
  element: "Rayo",
  colorPrimary: "#ffd700",
  colorSecondary: "#7209b7",
  colorGlow: "#4cc9f0",
  bgStyle: "astral",
  isConsecrated: false
};

function initSigilForge(containerId = "sigil-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  renderSigilForgeUI(container);
}

function renderSigilForgeUI(container) {
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

function updateSigilStage(container) {
  const stage = container.querySelector("#sigil-svg-stage");
  const consonants = extractConsonants(SIGIL_STATE.userName, SIGIL_STATE.dragonName);
  
  if (stage) {
    stage.innerHTML = renderSigilSVG(SIGIL_STATE, consonants, 360, 360);
  }
}

function animateSigilTrace(container) {
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

function triggerConsecrationBanner(container) {
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

function exportSigilCardPNG() {
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



let currentMagicPage = "fundamentos";
let currentMagicRing = 1;
let currentAltarTool = "varita";

// Global interactive translator for Dragon Script
window.updateDragonScriptTranslator = function() {
  const input = document.getElementById("ds-translator-input");
  const outputContainer = document.getElementById("ds-translator-output");
  if (!input || !outputContainer) return;

  const val = input.value.trim();
  if (!val) {
    outputContainer.innerHTML = `<span style="color: var(--text-muted); font-style: italic;">Escribí tu nombre o deseo arriba para verlo convertido al Escrito del Dragón...</span>`;
    return;
  }

  const translated = translateToDragonScript(val);
  outputContainer.innerHTML = translated.map(item => `
    <div style="display: flex; flex-direction: column; align-items: center; background: rgba(0,0,0,0.4); padding: 8px 12px; border-radius: 8px; border: 1px solid var(--gold-main); min-width: 48px; color: var(--gold-main);">
      ${item.info.svg || `<span style="font-size:1.6rem; color:var(--gold-main);">${item.info.glyph}</span>`}
      <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px; font-weight: 700;">${item.char}</span>
    </div>
  `).join("");
};

window.playRuneSound = function(letter) {
  if (typeof playSound === "function") playSound("rune");
  const badge = document.getElementById("ds-rune-preview");
  const info = DRAGON_SCRIPT_MAP[letter];
  if (badge && info) {
    badge.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; gap: 14px; animation: fadeIn 0.3s ease;">
        <div style="color: var(--gold-main); display: flex; align-items: center;">${info.svg || `<span style="font-size:2rem;">${info.glyph}</span>`}</div>
        <div style="text-align: left;">
          <strong style="color: var(--gold-light); font-size: 1.1rem;">Letra ${letter} (${info.glyph})</strong>
          <p style="margin: 2px 0 0 0; color: var(--text-main); font-size: 0.9rem;">${info.desc}</p>
        </div>
      </div>
    `;
  }
};

// Global navigation functions for inline onclick handlers
window.switchMagicSubPage = function(page) {
  if (typeof playSound === "function") playSound("click");
  currentMagicPage = page;
  const container = document.getElementById("magic-container");
  if (container) renderMagicSection(container);
  window.scrollTo({ top: 200, behavior: "smooth" });
};

window.switchAltarTool = function(tool) {
  if (typeof playSound === "function") playSound("click");
  currentAltarTool = tool;
  const container = document.getElementById("magic-container");
  if (container) renderAltarSubPage(container);
};

window.switchMagicRing = function(ringNum) {
  if (typeof playSound === "function") playSound("click");
  currentMagicRing = ringNum;
  const container = document.getElementById("magic-container");
  if (container) renderAcademiaSubPage(container);
};

function initMagicModule(containerId = "magic-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  renderMagicSection(container);
}

function renderMagicSubNavHtml(activePage) {
  return `
    <div class="margin-top-md magic-sub-nav">
      <a href="/magia-draconiana.html" class="chip ${activePage === "fundamentos" ? "active" : ""}" style="font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; ${activePage !== "fundamentos" ? "background: rgba(233,196,106,0.15);" : ""}">📜 1. Fundamentos</a>
      <a href="/altar-draconiano.html" class="chip ${activePage === "altar" ? "active" : ""}" style="font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; ${activePage !== "altar" ? "background: rgba(233,196,106,0.15);" : ""}">⚒️ 2. El Altar</a>
      <a href="/academia-draconiana.html" class="chip ${activePage === "academia" ? "active" : ""}" style="font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; ${activePage !== "academia" ? "background: rgba(233,196,106,0.15);" : ""}">🎓 3. Academia (5 Anillos)</a>
      <a href="/forja-de-sigilos.html" class="chip ${activePage === "sigilos" ? "active" : ""}" style="font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; ${activePage !== "sigilos" ? "background: rgba(233,196,106,0.15);" : ""}">🔮 4. Forja de Sigilos</a>
    </div>
  `;
}

function renderMagicSection(container) {
  if (!container) container = document.getElementById("magic-container");
  if (!container) return;

  if (currentMagicPage === "fundamentos") {
    renderFundamentosView(container);
  } else if (currentMagicPage === "altar") {
    renderAltarSubPage(container);
  } else if (currentMagicPage === "academia") {
    renderAcademiaSubPage(container);
  } else if (currentMagicPage === "sigilos") {
    renderSigilSubPage(container);
  }
}

function renderSigilSubPage(container) {
  // Render Sigil Forge inner UI and inject sub-navigation at top
  renderSigilForgeUI(container);

  // Prepend sub-navigation to container wrapper
  const heroBanner = container.querySelector(".fantasy-panel.text-center");
  if (heroBanner && !heroBanner.querySelector(".magic-sub-nav")) {
    const navDiv = document.createElement("div");
    navDiv.className = "magic-sub-nav";
    navDiv.innerHTML = renderMagicSubNavHtml("sigilos");
    heroBanner.appendChild(navDiv);
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
          Te damos la bienvenida al camino de la sabiduría secreta. La Magia Draconiana es una tradición milenaria basada en el respeto, la amistad con seres antiguos y el uso responsable de la energía universal.
        </p>
        
        <!-- SUB-NAV SWITCHER -->
        ${renderMagicSubNavHtml("fundamentos")}
      </div>

      <!-- GRILLA DE LEYES Y FUNDAMENTOS DRACONIANOS -->
      <div class="magic-laws-grid" style="display: flex; flex-direction: column; gap: 1.5rem;">
        
        <!-- 🌟 1. La Regla de Oro del Mago (HEADER ANCHO COMPLETO CON ILUSTRACIÓN) -->
        <div class="fantasy-panel" style="padding: 1.8rem; border-left: 6px solid #ff4757; background: linear-gradient(135deg, rgba(255,71,87,0.12), rgba(255,165,2,0.06));">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
            <span style="font-size: 2.2rem;">🌟</span>
            <h3 style="color: #ff4757; margin: 0; font-size: 1.6rem;">La Regla de Oro del Mago: ¡Si no te divertís, no es magia!</h3>
          </div>
          <div style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 280px;">
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.7; margin: 0; font-weight: 500;">
                ¡Escuchá con atención, joven mago! Hay un secreto que muchos libros olvidan contar, pero que los verdaderos sabios y los dragones conocen muy bien: <strong>la magia se inventó para disfrutarse y ser feliz</strong>.
              </p>
              <p style="color: var(--text-main); font-size: 0.98rem; line-height: 1.7; margin-top: 12px;">
                En la Magia Draconiana, la diversión no es solo un extra, ¡es el motor que hace que tus hechizos funcionen! Si alguna vez estás practicando un ejercicio, haciendo una meditación o dibujando un sigilo y empezás a sentirte aburrido, asustado, triste o muy estresado, la regla de oro te dice que debés detenerte de inmediato. <strong>Si la estás pasando mal, ¡eso no es verdadera magia!</strong>
              </p>
            </div>
            <div style="width: 100%; max-width: 280px; border-radius: 12px; overflow: hidden; border: 2px solid var(--gold-main); box-shadow: 0 6px 18px rgba(0,0,0,0.6); flex-shrink: 0; margin: 0 auto;">
              <img src="/assets/patriarch_dragon_laws.jpg" alt="Dragón patriarca sabio con las tablas de los mandamientos draconianos" style="width: 100%; height: auto; display: block; object-fit: cover;" />
            </div>
          </div>
        </div>

        <!-- FILA 1: COMPAÑERISMO & 24H SILENCIO -->
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;" class="display-grid">
          
          <!-- 🤝 2. La Regla del Compañerismo -->
          <div class="fantasy-panel" style="padding: 1.8rem; border-left: 6px solid var(--color-teal); background: rgba(42,157,143,0.08); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 2rem;">🤝</span>
                <h3 style="color: var(--color-teal); margin: 0; font-size: 1.45rem;">La Regla del Compañerismo</h3>
              </div>
              <p style="color: var(--text-gold); font-size: 0.95rem; font-weight: 700; margin-top: 8px;">¡Los dragones no son mascotas!</p>
              <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin-top: 8px;">
                Los dragones son seres antiguos, muy sabios e independientes. La magia draconiana se basa en la cooperación y la amistad, jamás en dominar. Nunca intentes ordenarles o tratarlos como sirvientes. Tratalos como a tus iguales: con respeto, confianza, cariño y como verdaderos compañeros de equipo.
              </p>
            </div>
          </div>

          <!-- 💬 3. Las 24 Horas de Silencio -->
          <div class="fantasy-panel" style="padding: 1.8rem; border-left: 6px solid #9b5de5; background: rgba(155,93,229,0.08); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 2rem;">💬</span>
                <h3 style="color: #9b5de5; margin: 0; font-size: 1.45rem;">Las 24 Horas de Silencio</h3>
              </div>
              <p style="color: var(--text-gold); font-size: 0.95rem; font-weight: 700; margin-top: 8px;">¡No dejes escapar tu energía!</p>
              <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin-top: 8px;">
                Cuando hagas un hechizo, dibujes un sigilo o hagas una petición a tu dragón, guardá el secreto absoluto por al menos un día entero. Hablar de tus trabajos mágicos antes de tiempo disipa tu energía. Los dragones actúan en silencio: dejá que tu deseo se concentre con toda su fuerza.
              </p>
            </div>
          </div>

        </div>

        <!-- FILA 2: PALABRA DE ACERO & LEY DEL ECO -->
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;" class="display-grid">

          <!-- 🔐 4. Tu Palabra es de Acero -->
          <div class="fantasy-panel" style="padding: 1.8rem; border-left: 6px solid var(--gold-main); background: rgba(233,196,106,0.08); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 2rem;">🔐</span>
                <h3 style="color: var(--gold-main); margin: 0; font-size: 1.45rem;">Tu Palabra es de Acero</h3>
              </div>
              <p style="color: var(--text-gold); font-size: 0.95rem; font-weight: 700; margin-top: 8px;">La ley de la confianza sagrada</p>
              <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin-top: 8px;">
                Las palabras actúan como contratos invisibles con el universo. Por eso, tu palabra es tu promesa sagrada. Si le prometés a tu dragón (o a vos mismo) ordenar tu cuarto, estudiar o cuidar tu altar, ¡cumplilo! La constancia mantiene tu energía fuerte y la confianza intacta.
              </p>
            </div>
          </div>

          <!-- 🕸️ 5. La Ley del Eco y la Red Tripartita -->
          <div class="fantasy-panel" style="padding: 1.8rem; border-left: 6px solid var(--color-rust); background: rgba(200,85,61,0.08); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 2rem;">🕸️</span>
                <h3 style="color: var(--color-rust); margin: 0; font-size: 1.45rem;">La Ley del Eco y la Red Cósmica</h3>
              </div>
              <p style="color: var(--text-gold); font-size: 0.95rem; font-weight: 700; margin-top: 8px;">"Lo que le pasa a una piedra, se refleja en todas"</p>
              <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin-top: 8px;">
                Todo en el Multiverso está conectado en una gran telaraña de energía. Rige la <strong>Ley Tripartita</strong>: lo que envíes (amabilidad o mala vibra) volverá a vos multiplicado por tres. Si cuidás la naturaleza y sos amable, el universo te devolverá felicidad y buena suerte.
              </p>
            </div>
          </div>

        </div>

        <!-- 📜 6. El Código de Honor del Mago (PIE DE PÁGINA ANCHO COMPLETO) -->
        <div class="fantasy-panel" style="padding: 1.8rem; border-left: 6px solid #4cc9f0; background: rgba(76,201,240,0.08);">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 2rem;">📜</span>
            <h3 style="color: #4cc9f0; margin: 0; font-size: 1.5rem;">El Código de Honor del Mago Draconiano</h3>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-top: 14px;">
            <div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 10px; border-left: 3px solid #4cc9f0;">
              <strong style="color: #4cc9f0;">🛡️ Intención Pura:</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 4px 0 0 0; line-height: 1.5;">Nunca uses la magia para manipular, asustar o dañar a otras personas o animales.</p>
            </div>
            <div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 10px; border-left: 3px solid var(--gold-main);">
              <strong style="color: var(--gold-main);">🌿 Respeto Elemental:</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 4px 0 0 0; line-height: 1.5;">Protegé siempre a la naturaleza, a los árboles y a todos los seres vivos del planeta.</p>
            </div>
            <div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 10px; border-left: 3px solid #9b5de5;">
              <strong style="color: #9b5de5;">🔮 Sigilo y Discreción:</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 4px 0 0 0; line-height: 1.5;">Guardá en secreto tus herramientas, tu altar y tu Nombre Mágico para conservar tu fuerza.</p>
            </div>
          </div>
        </div>

      </div>

      <!-- BANNER DE NAVEGACIÓN A HERRAMIENTAS -->
      <div class="fantasy-panel text-center" style="padding: 2.2rem; background: linear-gradient(135deg, rgba(233,196,106,0.1), rgba(42,157,143,0.1)); border: 2px solid var(--gold-main); border-radius: 20px;">
        <div style="font-size: 3rem;">⚒️</div>
        <h3 class="panel-title margin-top-xs" style="color: var(--gold-main); font-size: 1.9rem;">Próximo Paso: Confeccioná tus Herramientas</h3>
        <p style="color: var(--text-main); max-width: 700px; margin: 8px auto 0 auto; font-size: 1.05rem; line-height: 1.6;">
          Descubrí cómo preparar tu varita o bastón, tu pentáculo y tu espejo mágico en la sección de Herramientas.
        </p>
        <button type="button" class="btn btn-gold btn-lg margin-top-md" onclick="switchMagicSubPage('altar')" style="padding: 12px 28px; font-weight: 700; cursor: pointer;">
          ⚒️ Ir a El Altar y Herramientas
        </button>
      </div>

    </div>
  `;
}

// SUB-PÁGINA 2: EL ALTAR Y LAS HERRAMIENTAS
function renderAltarSubPage(container) {
  let toolContentHtml = "";

  if (currentAltarTool === "varita") {
    toolContentHtml = `
      <!-- GUIA COMPLETA DE CREACION DE VARITA Y BASTON -->
      <div class="fantasy-panel" style="padding: 2rem; background: rgba(15, 23, 42, 0.7); border: 2px solid var(--gold-main); border-radius: 18px;">
        <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 1rem;">
          <div style="font-size: 2.5rem;">✨</div>
          <div>
            <h3 style="color: var(--gold-main); margin: 0; font-size: 1.8rem;">La Varita o Bastón Draconiano</h3>
            <p style="color: var(--text-muted); margin: 4px 0 0 0; font-size: 0.95rem;">Manual completo de confección, sintonización y seguridad para jóvenes magos</p>
          </div>
        </div>

        <div style="background: rgba(233,196,106,0.1); border-left: 4px solid var(--gold-main); padding: 14px 18px; border-radius: 8px; margin-bottom: 1.5rem;">
          <p style="color: var(--text-main); margin: 0; font-size: 1rem; line-height: 1.6;">
            <strong>✨ El Gran Secreto de los Magos:</strong> Ninguna herramienta, por muy hermosa que sea, posee poder mágico por sí sola. El verdadero poder proviene de tu interior y de tu conexión con el universo. Tu varita o bastón funciona simplemente como una lente o rayo láser que te ayuda a concentrar y dirigir tu energía invisible, evitando que se disperse.
          </p>
        </div>

        <!-- PASO 1 Y 2 -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(255,255,255,0.03); padding: 1.2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h4 style="color: #4cc9f0; margin-top: 0; font-size: 1.2rem;">1. La Búsqueda de tu Material Mágico</h4>
            <div style="width: 100%; max-width: 380px; margin: 0 auto 1rem auto; border-radius: 12px; overflow: hidden; border: 1px solid var(--border-gold); box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
              <img src="/assets/magic_wand_material.jpg" alt="Búsqueda de rama mística en la playa" style="width: 100%; height: auto; display: block; object-fit: cover;" />
            </div>
            <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.5;">¡No necesitás gastar tus ahorros ni buscar maderas súper raras! Las herramientas más poderosas son las que vos mismo fabricás o encontrás de formas inusuales:</p>
            <ul style="color: var(--text-main); font-size: 0.9rem; line-height: 1.5; padding-left: 1.2rem;">
              <li style="margin-bottom: 6px;"><strong>Regalos de la Naturaleza:</strong> Caminá por un parque, bosque o playa y buscá una rama caída o madera desgastada por el mar. <em>Regla de Oro: Nunca lastimes a un árbol vivo.</em> Caminá con mente tranquila y tu intuición te dirá cuál es la adecuada.</li>
              <li><strong>Varitas Ocultas:</strong> Podés usar una varilla lisa de madera, un tubo de cobre o un tubo de plástico transparente. ¡El plástico es muy resistente y se ve genial si lo rellenás!</li>
            </ul>
          </div>

          <div style="background: rgba(255,255,255,0.03); padding: 1.2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h4 style="color: #4cc9f0; margin-top: 0; font-size: 1.2rem;">2. La Medida del Mago</h4>
            <div style="width: 100%; max-width: 380px; margin: 0 auto 1rem auto; border-radius: 12px; overflow: hidden; border: 1px solid var(--border-gold); box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
              <img src="/assets/magic_wand_measurement.jpg" alt="Joven mago sintonizando la medida de su varita en su cuarto" style="width: 100%; height: auto; display: block; object-fit: cover;" />
            </div>
            <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.5;">En la magia draconiana, la dimensión de tus herramientas depende de tu propio cuerpo:</p>
            <ul style="color: var(--text-main); font-size: 0.9rem; line-height: 1.5; padding-left: 1.2rem;">
              <li style="margin-bottom: 6px;"><strong>Para una Varita (Elemento Aire):</strong> Sirve para proyectar tu fuerza de voluntad. No debe ser más larga que la distancia <strong>desde tu codo hasta la punta de tus dedos</strong>. Si es más larga, resulta torpe dentro del círculo mágico.</li>
              <li><strong>Para un Bastón (Elemento Espíritu):</strong> Funciona como puente hacia los planos astrales. Para caminar al aire libre, debe llegar <strong>solo hasta la altura de tus hombros</strong> para evitar golpear y tirar objetos del altar.</li>
            </ul>
          </div>
        </div>

        <!-- PASO 3 -->
        <div style="background: rgba(255,255,255,0.03); padding: 1.2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 1.5rem;">
          <h4 style="color: var(--gold-main); margin-top: 0; font-size: 1.2rem;">3. El Arte de Decorar tu Herramienta</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
            <div>
              <strong style="color: #e9c46a;">💎 Punta de Poder:</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 4px 0 0 0; line-height: 1.5;">Pegá una punta de cuarzo o gema brillante en el extremo como foco de energía. Si usás un tubo transparente, rellenalo con piedritas de colores y tapalo con una piedra negra u oscura.</p>
            </div>
            <div>
              <strong style="color: #e9c46a;">⚡ Cobre y Cuero:</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 4px 0 0 0; line-height: 1.5;">Envolvé el centro con alambre de cobre para potenciar las piedras. Ata vosras de cuero en el agarre para aislar la electricidad estática.</p>
            </div>
            <div>
              <strong style="color: #e9c46a;">🎨 Colores Elementales:</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 4px 0 0 0; line-height: 1.5;">Atá cintas de los 4 elementos: Rojo (Fuego), Amarillo (Aire), Azul (Agua) y Verde/Negro (Tierra).</p>
            </div>
            <div>
              <strong style="color: #e9c46a;">🔔 Música para Dragones & Nombre:</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 4px 0 0 0; line-height: 1.5;">Agregá campanitas en las cintas para atraer dragones con sus vibraciones. Pintá tu Nombre Mágico en <a href="javascript:void(0)" onclick="switchAltarTool('dragonscript')" style="color: var(--gold-main); font-weight: 700; text-decoration: underline;">Alfabeto Draconiano (Dragon Script)</a>.</p>
            </div>
          </div>
        </div>

        <!-- PASO 4: REGLA DE SEGURIDAD -->
        <div style="background: rgba(230, 57, 70, 0.15); border: 2px solid #e63946; padding: 1.2rem; border-radius: 12px; margin-bottom: 1.5rem;">
          <h4 style="color: #ff4d6d; margin-top: 0; font-size: 1.2rem; display: flex; align-items: center; gap: 8px;">
            ⚠️ Regla de Seguridad del Dragón (¡Muy Importante!)
          </h4>
          <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin: 0;">
            Tu varita <strong>no es un juguete ni una espada de mentira</strong>. Una vez que la usás en magia, se carga de energía concentrada. <strong>Nunca apuntés ni agités tu varita hacia personas o mascotas</strong>: la energía sale como un rayo láser e incidiría en su Aura (escudo protector), pudiendo causarles cansancio, mal humor o mala suerte. ¡Tratá tus herramientas con absoluto respeto!
          </p>
        </div>

        <!-- PASO 5: RITUAL DE DESPERTAR -->
        <div style="background: linear-gradient(135deg, rgba(42,157,143,0.15), rgba(138,43,226,0.15)); border: 1px solid var(--color-teal); padding: 1.4rem; border-radius: 12px;">
          <h4 style="color: var(--color-teal); margin-top: 0; font-size: 1.25rem;">5. El Ritual de Despertar (Consagración)</h4>
          <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.5; margin-bottom: 10px;">
            Se realiza preferentemente en noche de <strong>Luna Llena o Creciente</strong>:
          </p>
          <ol style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; padding-left: 1.2rem;">
            <li style="margin-bottom: 8px;">Rociá suavemente la varita con gotitas de agua pura y di en voz alta:<br><em style="color: var(--gold-main); font-weight: bold;">"Pido a los dragones que limpien esta varita con energía espiritual"</em>.</li>
            <li style="margin-bottom: 8px;">Pasala sobre el humo de incienso recitando este conjuro:
              <div style="background: rgba(0,0,0,0.4); padding: 12px; border-radius: 8px; margin: 8px 0; border-left: 4px solid var(--gold-main); color: var(--text-gold); font-style: italic;">
                "Poderosos dragones, fuertes y ancianos,<br>
                Llenen mi varita con poder en mis manos.<br>
                Enséñenme sus usos, el bien sobre el mal,<br>
                Y háganla brillar con su canción magistral"
              </div>
            </li>
            <li>Dejala durante la noche junto a la ventana expuesta a la luz de la Luna Llena por al menos 2 horas.</li>
          </ol>
        </div>
      </div>
    `;
  } else if (currentAltarTool === "pentaculo") {
    toolContentHtml = `
      <div class="fantasy-panel" style="padding: 2rem; background: rgba(15, 23, 42, 0.7); border: 2px solid var(--color-teal); border-radius: 18px;">

        <!-- ENCABEZADO -->
        <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 1rem;">
          <div style="font-size: 2.5rem;">⭐</div>
          <div>
            <h3 style="color: var(--color-teal); margin: 0; font-size: 1.8rem;">El Pentáculo del Dragón</h3>
            <p style="color: var(--text-muted); margin: 4px 0 0 0; font-size: 0.95rem;">Tu escudo mágico y medalla de autoridad ante los dragones</p>
          </div>
        </div>

        <!-- INTRODUCCIÓN CON ILUSTRACIÓN -->
        <div style="background: rgba(42,157,143,0.1); border-left: 4px solid var(--color-teal); padding: 16px 20px; border-radius: 12px; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 280px;">
            <p style="color: var(--text-main); margin: 0; font-size: 1rem; line-height: 1.7;">
              ¡Todo gran equipo de laboratorio mágico necesita una base segura! En la Magia Draconiana, esa base es el <strong>Pentáculo del Dragón</strong>. No es un arma para atacar, sino que funciona como un <strong>escudo de energía</strong>, un equilibrador y tu "medalla de autoridad" mágica. Cuando los dragones ven tu Pentáculo, saben de inmediato que sos un mago serio, amigable y digno de respeto.
            </p>
          </div>
          <div style="width: 100%; max-width: 260px; border-radius: 12px; overflow: hidden; border: 2px solid var(--gold-main); box-shadow: 0 6px 18px rgba(0,0,0,0.6); flex-shrink: 0; margin: 0 auto;">
            <img src="/assets/clay_pentacle_altar.jpg" alt="El Pentáculo del Dragón hecho de arcilla en el altar" style="width: 100%; height: auto; display: block; object-fit: cover;" />
          </div>
        </div>

        <!-- PASO 1: FABRICAR -->
        <div style="background: rgba(255,255,255,0.03); padding: 1.4rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 1.5rem;">
          <h4 style="color: #4cc9f0; margin-top: 0; font-size: 1.2rem;">1. ¡Fabrica tu propio Pentáculo!</h4>
          <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin-bottom: 10px;">
            El Pentáculo suele ser un disco plano con el dibujo de una estrella de cinco puntas (un pentagrama). A los dragones no les importa si está hecho de oro o de papel, ¡lo que les importa es que <strong>lo hagas vos mismo</strong>!
          </p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
            <div style="background: rgba(233,196,106,0.07); padding: 10px 14px; border-radius: 8px; border-left: 3px solid var(--gold-main);">
              <strong style="color: var(--gold-main);">🪵 Materiales:</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 6px 0 0 0; line-height: 1.5;">Buscá un círculo de madera plano en una tienda de manualidades, usá un disco de arcilla que modeles vos mismo, o recortá un círculo perfecto en cartón grueso y resistente.</p>
            </div>
            <div style="background: rgba(233,196,106,0.07); padding: 10px 14px; border-radius: 8px; border-left: 3px solid var(--gold-main);">
              <strong style="color: var(--gold-main);">🎨 El Dibujo:</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 6px 0 0 0; line-height: 1.5;">Dibujá una estrella de cinco puntas en el centro con tus mejores marcadores. ¡Es muy poderoso dibujar un dragón abrazando la estrella o sosteniéndola con sus garras! Usá los colores que más te gusten.</p>
            </div>
          </div>
        </div>

        <!-- PASO 2: LAS CINCO PUNTAS -->
        <div style="background: rgba(255,255,255,0.03); padding: 1.4rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 1.5rem;">
          <h4 style="color: #4cc9f0; margin-top: 0; font-size: 1.2rem;">2. El Secreto de las Cinco Puntas</h4>
          <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem;">
            ¿Por qué una estrella? En la magia antigua, el universo está formado por grandes fuerzas. Cada punta de tu estrella representa un elemento:
          </p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 8px; text-align: center; margin-bottom: 1rem;">
            <div style="background: rgba(139,90,43,0.2); padding: 10px 8px; border-radius: 10px; border: 1px solid rgba(139,90,43,0.4);">
              <div style="font-size: 1.6rem;">🌍</div>
              <strong style="color: #c4a35a; font-size: 0.85rem;">Tierra</strong>
            </div>
            <div style="background: rgba(100,180,255,0.15); padding: 10px 8px; border-radius: 10px; border: 1px solid rgba(100,180,255,0.4);">
              <div style="font-size: 1.6rem;">💨</div>
              <strong style="color: #7ecef4; font-size: 0.85rem;">Aire</strong>
            </div>
            <div style="background: rgba(230,57,70,0.15); padding: 10px 8px; border-radius: 10px; border: 1px solid rgba(230,57,70,0.4);">
              <div style="font-size: 1.6rem;">🔥</div>
              <strong style="color: #ff6b6b; font-size: 0.85rem;">Fuego</strong>
            </div>
            <div style="background: rgba(30,100,200,0.15); padding: 10px 8px; border-radius: 10px; border: 1px solid rgba(30,100,200,0.4);">
              <div style="font-size: 1.6rem;">💧</div>
              <strong style="color: #74c0fc; font-size: 0.85rem;">Agua</strong>
            </div>
            <div style="background: rgba(138,43,226,0.2); padding: 10px 8px; border-radius: 10px; border: 2px solid rgba(138,43,226,0.6);">
              <div style="font-size: 1.6rem;">✨</div>
              <strong style="color: #c77dff; font-size: 0.85rem;">Espíritu ↑</strong>
              <p style="color: var(--text-muted); font-size: 0.75rem; margin: 3px 0 0 0;">¡Tu magia!</p>
            </div>
          </div>
          <p style="color: var(--text-main); font-size: 0.9rem; line-height: 1.6; margin: 0;">
            Tener tu Pentáculo en el altar ayuda a que todas estas energías se mantengan tranquilas y en perfecto equilibrio, funcionando como una "aspiradora" que atrapa las malas vibras y mantiene tu cuarto seguro.
          </p>
        </div>

        <!-- PASO 3: REGLA DE SEGURIDAD + DIAGRAMA SÍ/NO -->
        <div style="background: rgba(230, 57, 70, 0.12); border: 2px solid #e63946; padding: 1.4rem; border-radius: 12px; margin-bottom: 1.5rem;">
          <h4 style="color: #ff4d6d; margin-top: 0; font-size: 1.2rem;">⚠️ La Gran Regla de Seguridad (¡Muy Importante!)</h4>
          <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.2rem;">
            El Pentáculo es un símbolo de armonía, salud y poderes místicos, pero tiene una <strong>regla de oro</strong> que nunca debés olvidar:
          </p>

          <!-- DIAGRAMA SÍ / NO -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; max-width: 500px; margin: 0 auto;">
            <!-- SÍ -->
            <div style="background: rgba(42,157,143,0.15); border: 2px solid var(--color-teal); border-radius: 12px; padding: 1rem; text-align: center;">
              <div style="font-size: 2rem; margin-bottom: 4px;">✅</div>
              <div style="font-size: 2.5rem; line-height: 1; margin-bottom: 6px; filter: drop-shadow(0 0 6px rgba(42,200,150,0.8));">⭐</div>
              <strong style="color: var(--color-teal); font-size: 1rem;">¡SÍ!</strong>
              <p style="color: var(--text-main); font-size: 0.8rem; margin: 6px 0 0 0; line-height: 1.4;">Una sola punta <strong>apuntando hacia arriba</strong> (al cielo). Atrae buena magia y dragones amigables. ✨🐉</p>
            </div>
            <!-- NO -->
            <div style="background: rgba(230,57,70,0.12); border: 2px solid #e63946; border-radius: 12px; padding: 1rem; text-align: center;">
              <div style="font-size: 2rem; margin-bottom: 4px;">❌</div>
              <div style="font-size: 2.5rem; line-height: 1; margin-bottom: 6px; transform: rotate(180deg); display: inline-block; filter: drop-shadow(0 0 6px rgba(230,57,70,0.7));">⭐</div>
              <strong style="color: #ff4d6d; font-size: 1rem;">¡NO!</strong>
              <p style="color: var(--text-main); font-size: 0.8rem; margin: 6px 0 0 0; line-height: 1.4;">Invertida con <strong>dos puntas hacia arriba</strong>. Atrae confusiones, mal humor y magia caótica. 😵🌀</p>
            </div>
          </div>
        </div>

        <!-- PASO 4: CONSAGRACIÓN -->
        <div style="background: linear-gradient(135deg, rgba(42,157,143,0.15), rgba(138,43,226,0.15)); border: 1px solid var(--color-teal); padding: 1.4rem; border-radius: 12px;">
          <h4 style="color: var(--color-teal); margin-top: 0; font-size: 1.25rem;">4. El Hechizo de Despertar (Consagración)</h4>
          <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.5; margin-bottom: 1rem;">
            Una vez terminado de pintar y decorar tu disco, tienes que purificarlo para llenarlo de magia:
          </p>
          <ol style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; padding-left: 1.2rem; margin-bottom: 1rem;">
            <li style="margin-bottom: 10px;">Pedile a un adulto que te ayude a encender una varita de incienso que huela muy rico (el de <strong>manzana, sándalo o lavanda</strong> les encanta a los dragones). Toma tu Pentáculo con tu <strong>mano de poder</strong> (la mano con la que escribes) y pasalo lentamente a través del humo mientras dices:
              <div style="background: rgba(0,0,0,0.4); padding: 12px; border-radius: 8px; margin: 8px 0; border-left: 4px solid var(--color-teal); color: #a8dadc; font-style: italic; line-height: 1.6;">
                "Elemento del Espíritu, por el poder del Dragón, ¡te llamo purificado!"
              </div>
            </li>
            <li style="margin-bottom: 10px;">Levanta tu Pentáculo frente a vos, mirando hacia el <strong>Este</strong>, y presentalo a tus guardianes diciendo:
              <div style="background: rgba(0,0,0,0.4); padding: 12px; border-radius: 8px; margin: 8px 0; border-left: 4px solid var(--gold-main); color: var(--text-gold); font-style: italic; line-height: 1.6;">
                "Dragones de la magia, contemplen mi símbolo y sean mis aliados"
              </div>
            </li>
            <li>¡Listo! Pon tu Pentáculo en el <strong>centro de tu altar</strong>. Ahora podés poner encima de él tus amuletos, tus piedras o tu Varita para recargarlos de energía limpia y equilibrada. 🐉⭐</li>
          </ol>
        </div>

      </div>
    `;
  } else if (currentAltarTool === "espejo") {
    toolContentHtml = `
      <div class="fantasy-panel" style="padding: 2rem; background: rgba(15, 23, 42, 0.7); border: 2px solid var(--color-rust); border-radius: 18px;">
        <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 1rem;">
          <div style="font-size: 2.5rem;">👁️</div>
          <div>
            <h3 style="color: var(--color-rust); margin: 0; font-size: 1.8rem;">El Espejo Mágico (Ojo de Dragón)</h3>
            <p style="color: var(--text-muted); margin: 4px 0 0 0; font-size: 0.95rem;">Escudo rebotador, pantalla de imaginación y ojo al mundo de los dragones</p>
          </div>
        </div>

        <!-- INTRODUCCIÓN CON ILUSTRACIÓN -->
        <div style="background: rgba(200,85,61,0.1); border-left: 4px solid var(--color-rust); padding: 16px 20px; border-radius: 12px; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 280px;">
            <p style="color: var(--text-main); margin: 0; font-size: 1rem; line-height: 1.7;">
              Hasta ahora tenés tu Varita (para dirigir tu energía) y tu Pentáculo (tu base segura). ¡Pero el equipo de un mago draconiano no está completo sin el <strong>Espejo Mágico</strong>! En la magia de los dragones, el espejo representa el <strong>elemento Tierra</strong> y no se usa para peinarse. Se usa como el <strong>"Ojo del Dragón"</strong>: una herramienta súper secreta para atrapar buenas ideas, protegerte de las malas vibras y asomarte al mundo de la imaginación.
            </p>
          </div>
          <div style="width: 100%; max-width: 260px; border-radius: 12px; overflow: hidden; border: 2px solid var(--gold-main); box-shadow: 0 6px 18px rgba(0,0,0,0.6); flex-shrink: 0; margin: 0 auto;">
            <img src="/assets/magic_mirror_wooden.jpg" alt="El Espejo Mágico con marco de madera místico" style="width: 100%; height: auto; display: block; object-fit: cover;" />
          </div>
        </div>

        <!-- PASO 1: CREAR EL ESPEJO -->
        <div style="background: rgba(255,255,255,0.03); padding: 1.4rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 1.5rem;">
          <h4 style="color: #4cc9f0; margin-top: 0; font-size: 1.2rem;">1. ¡Crea tu propio Ojo de Dragón!</h4>
          <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.5; margin-bottom: 1.2rem;">Los espejos mágicos son muy fáciles de hacer. Podés elegir entre <strong>dos tipos increíbles</strong>:</p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
            <!-- ESPEJO BRILLANTE -->
            <div style="background: rgba(233,196,106,0.07); border: 1px solid rgba(233,196,106,0.3); border-radius: 12px; padding: 1.2rem;">
              <div style="font-size: 1.8rem; margin-bottom: 6px;">✨</div>
              <strong style="color: var(--gold-main); font-size: 1.05rem;">El Espejo Brillante</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 8px 0 0 0; line-height: 1.5;">Conseguí cualquier espejo pequeño que tenga un marco de madera o de plástico plano. ¡Entre más viejo y misterioso se vea el marco, mejor!</p>
            </div>
            <!-- ESPEJO OSCURO -->
            <div style="background: rgba(20,20,30,0.6); border: 2px solid rgba(200,85,61,0.5); border-radius: 12px; padding: 1.2rem; position: relative; overflow: hidden;">
              <div style="font-size: 1.8rem; margin-bottom: 6px;">🌑</div>
              <strong style="color: #c8553d; font-size: 1.05rem;">El Espejo Oscuro <span style="color: var(--text-muted); font-size: 0.8rem;">(El secreto de los hechiceros)</span></strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 8px 0 0 0; line-height: 1.5;">A los dragones les encanta asomarse por "espejos negros". Para hacer uno:</p>
              <ol style="color: var(--text-main); font-size: 0.88rem; line-height: 1.5; padding-left: 1.2rem; margin: 8px 0 0 0;">
                <li style="margin-bottom: 4px;">Conseguí un portarretratos pequeño.</li>
                <li style="margin-bottom: 4px;">Pedile a un adulto que te ayude a sacar el vidrio.</li>
                <li style="margin-bottom: 4px;">Pintá solo un lado del vidrio con mucha <strong>pintura acrílica negra</strong>.</li>
                <li style="margin-bottom: 4px;">Cuando seque, volvé a armar el portarretratos con la parte pintada hacia atrás.</li>
                <li>¡El frente se verá como un espejo negro súper brillante y misterioso! 🖤</li>
              </ol>
            </div>
          </div>
        </div>

        <!-- PASO 2: CONJURO DEL MARCO -->
        <div style="background: rgba(255,255,255,0.03); padding: 1.4rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 1.5rem;">
          <h4 style="color: #4cc9f0; margin-top: 0; font-size: 1.2rem;">2. El Conjuro del Marco (El Alfabeto Secreto)</h4>
          <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem;">
            Para que el espejo despierte, tenés que escribirle una instrucción mágica. Usá un <strong>marcador permanente</strong> (dorado o plateado se ve genial) para escribir alrededor de todo el marco:
          </p>
          <div style="background: rgba(0,0,0,0.5); border: 2px solid var(--gold-main); padding: 1.2rem 1.5rem; border-radius: 12px; text-align: center; margin-bottom: 1rem;">
            <p style="color: var(--gold-main); font-style: italic; font-size: 1.05rem; line-height: 1.7; margin: 0;">
              "Por el poder del Ojo del Dragón,<br>
              atrapo los pensamientos mágicos<br>
              y reboto la mala energía"
            </p>
          </div>
          <div style="background: rgba(138,43,226,0.12); border-left: 4px solid #9b5de5; padding: 12px 16px; border-radius: 8px;">
            <p style="color: var(--text-main); font-size: 0.92rem; margin: 0; line-height: 1.6;">
              💡 <strong>¡Súper Tip!</strong> Si querés que se vea como un verdadero artefacto antiguo, usá el <a href="javascript:void(0)" onclick="switchAltarTool('dragonscript'); window.scrollTo({top: 300, behavior: 'smooth'});" style="color: var(--gold-main); font-weight: bold; text-decoration: underline; background: rgba(255,215,0,0.15); padding: 2px 8px; border-radius: 6px; border: 1px solid var(--gold-main);">📜 Alfabeto de los Dragones (Dragon Script)</a> de nuestra sección de códigos secretos para escribir este mensaje. ¡Nadie más que los magos podrá leerlo! 🐉🔮
            </p>
          </div>
        </div>

        <!-- PASO 3: LOS DOS SUPERPODERES -->
        <div style="background: rgba(255,255,255,0.03); padding: 1.4rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 1.5rem;">
          <h4 style="color: #4cc9f0; margin-top: 0; font-size: 1.2rem;">3. Los Dos Súper Poderes de tu Espejo</h4>
          <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.5; margin-bottom: 1rem;">Una vez que está listo, tu espejo mágico tiene <strong>dos funciones principales</strong>:</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">

            <!-- PODER 1: ESCUDO REBOTADOR -->
            <div style="background: linear-gradient(135deg, rgba(42,157,143,0.1), rgba(42,157,143,0.05)); border: 2px solid var(--color-teal); border-radius: 12px; padding: 1.2rem;">
              <div style="font-size: 2rem; margin-bottom: 6px;">🛡️</div>
              <strong style="color: var(--color-teal); font-size: 1.05rem;">El Escudo Rebotador</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 8px 0 0 0; line-height: 1.5;">
                Si tuviste un mal día, o alguien te dijo palabras feas que te hicieron sentir triste (a esto le llamamos "energía dañina"), ¡no dejes que se queden con vos!
              </p>
              <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 10px 12px; margin-top: 10px; border-left: 3px solid var(--color-teal);">
                <p style="color: var(--text-main); font-size: 0.88rem; margin: 0; line-height: 1.5;">
                  Sostené el espejo frente a vos con la parte que refleja apuntando <strong>hacia afuera</strong> (hacia el mundo) e imaginá que la figura de un dragón gigante aparece en el cristal. Pensá con mucha fuerza:<br>
                  <em style="color: var(--color-teal);">"¡Que la mala energía regrese a donde vino!"</em><br>
                  El espejo rebotará el mal humor lejos de vos. 💚
                </p>
              </div>
            </div>

            <!-- PODER 2: PANTALLA DE IMAGINACIÓN -->
            <div style="background: linear-gradient(135deg, rgba(138,43,226,0.12), rgba(138,43,226,0.05)); border: 2px solid #9b5de5; border-radius: 12px; padding: 1.2rem;">
              <div style="font-size: 2rem; margin-bottom: 6px;">🔮</div>
              <strong style="color: #c77dff; font-size: 1.05rem;">La Pantalla de la Imaginación</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 8px 0 0 0; line-height: 1.5;">
                El espejo negro funciona como una televisión para tu intuición. Solo con el espejo en tu altar en una habitación con luz suave:
              </p>
              <ol style="color: var(--text-main); font-size: 0.88rem; line-height: 1.5; padding-left: 1.2rem; margin: 8px 0 0 0;">
                <li style="margin-bottom: 4px;">Sentate, relajate y mirá profundamente el cristal <strong>sin esforzar los ojos</strong>, dejando que tu vista se vuelva un poco borrosa.</li>
                <li style="margin-bottom: 4px;">¡<strong>No trates de forzar imágenes!</strong> Solo dejá que tu mente se calme.</li>
                <li>A veces verás colores, sentirás que se te ocurren ideas geniales de la nada, o incluso podrías ver un destello de tu <strong>Dragón Guardián</strong> saludándote. 🐉✨</li>
              </ol>
            </div>

          </div>
        </div>

        <!-- PASO 4: REGLA DE LIMPIEZA -->
        <div style="background: rgba(42,157,143,0.1); border: 1px solid var(--color-teal); padding: 1.4rem; border-radius: 12px;">
          <h4 style="color: var(--color-teal); margin-top: 0; font-size: 1.2rem;">💧 La Regla de Limpieza (Lavando el "Polvo Astral")</h4>
          <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin: 0;">
            Como los espejos atrapan pensamientos y rebotan el mal humor, a veces se <em>"ensucian" de energía invisible</em>. Si sentís que tu espejo ya no brilla igual o estás de mal humor cuando lo usás, ¡es hora de un baño mágico! Lavalo con un poquito de <strong>agua pura y jabón suave</strong> para quitarle todo el "polvo astral" y dejalo descansar. 🌊✨
          </p>
        </div>

      </div>
    `;
  } else if (currentAltarTool === "dragonscript") {
    toolContentHtml = `
      <div class="fantasy-panel" style="padding: 2rem; background: rgba(15, 23, 42, 0.75); border: 2px solid var(--gold-main); border-radius: 18px;">
        
        <!-- ENCABEZADO -->
        <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 1rem;">
          <div style="font-size: 2.5rem;">📜</div>
          <div>
            <h3 style="color: var(--gold-main); margin: 0; font-size: 1.8rem;">El Alfabeto de los Dragones: Dragon Script</h3>
            <p style="color: var(--text-muted); margin: 4px 0 0 0; font-size: 0.95rem;">El cifrado místico antiguo para comunicarte con los seres draconianos</p>
          </div>
        </div>

        <!-- INTRODUCCIÓN CON ILUSTRACIÓN -->
        <div style="background: rgba(233,196,106,0.1); border-left: 4px solid var(--gold-main); padding: 16px 20px; border-radius: 12px; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 280px;">
            <p style="color: var(--text-main); margin: 0; font-size: 1rem; line-height: 1.7;">
              ¿Te imaginás tener un alfabeto secreto que solo vos y los dragones puedan leer? ¡Pues existe! En el maravilloso mundo de la magia draconiana, este sistema de escritura se conoce como <strong>Dragon Script</strong> (o el Escrito del Dragón). Los dragones son seres sumamente inteligentes y conocen todos los idiomas humanos, pero las fuentes nos revelan que <strong>ellos prestan muchísima más atención a las cosas que escribís usando este alfabeto especial</strong>. ¡Es como enviarles un mensaje con un sello de "¡Súper Importante!"!
            </p>
          </div>
          <div style="width: 100%; max-width: 260px; border-radius: 12px; overflow: hidden; border: 2px solid var(--gold-main); box-shadow: 0 6px 18px rgba(0,0,0,0.6); flex-shrink: 0; margin: 0 auto;">
            <img src="/assets/scholar_dragon_script.jpg" alt="Dragón erudito escribiendo manuscrito en Dragon Script en salón gótico" style="width: 100%; height: auto; display: block; object-fit: cover;" />
          </div>
        </div>

        <!-- CONTENIDO PRINCIPAL: TEXTOS E HISTORIA -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2rem;">
          
          <!-- 🌟 HISTORIA -->
          <div style="background: rgba(255,255,255,0.03); padding: 1.4rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h4 style="color: #4cc9f0; margin-top: 0; font-size: 1.2rem; display: flex; align-items: center; gap: 8px;">🌟 La Historia del Alfabeto Misterioso</h4>
            <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin: 0;">
              Nadie sabe con certeza científica quién inventó originalmente este alfabeto o hace cuántos miles de años se creó, pues su origen es un gran misterio. Lo que sí sabemos es que fue enseñado a los humanos por una sabia entidad espiritual de origen irlandés-celta que se comunicaba con los magos a través de sueños y profundas meditaciones. Si mirás con atención sus letras, notarás que se parecen a otros alfabetos legendarios como las <strong>Runas vikingas</strong>, el <strong>Ogham celta</strong> y los códigos de los alquimistas medievales.
            </p>
          </div>

          <!-- ⚡ POR QUÉ HACE TU MAGIA MÁS FUERTE -->
          <div style="background: rgba(255,255,255,0.03); padding: 1.4rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h4 style="color: var(--gold-main); margin-top: 0; font-size: 1.2rem; display: flex; align-items: center; gap: 8px;">⚡ ¿Por qué escribir en Dragon Script hace tu magia más fuerte?</h4>
            <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin: 0;">
              Seguramente te preguntarás: <em>"¿Por qué no escribir simplemente con mis letras normales?"</em> ¡La respuesta es un secreto de los sabios encantadores! Cuando escribís una petición o tu nombre usando este alfabeto, tenés que ir despacio, letra por letra, mirando la tabla de símbolos para no equivocarte. Ese esfuerzo extra requiere de toda tu <strong>Concentración</strong>. Al dibujar cada curva y cada línea misteriosa con paciencia, estás enfocando tu mente y <strong>traspasando tu propia energía personal y tu fuerza de voluntad al objeto</strong>. ¡Es por eso que las herramientas y los deseos escritos en Dragon Script se llenan de un poder mágico increíble!
            </p>
          </div>

          <!-- 🧩 TRADUCTOR INTERACTIVO ÚNICO Y OFICIAL -->
          <div style="background: linear-gradient(135deg, rgba(138,43,226,0.15), rgba(42,157,143,0.15)); border: 2px solid var(--color-teal); padding: 1.6rem; border-radius: 16px;">
            <div style="text-align: center; margin-bottom: 1rem;">
              <span style="font-size: 2.2rem;">🧩</span>
              <h4 style="color: var(--color-teal); margin: 6px 0 0 0; font-size: 1.4rem;">Traductor Mágico al Dragon Script</h4>
              <p style="color: var(--text-main); font-size: 0.95rem; margin-top: 4px;">Escribí tu nombre real, apodo o deseo para traducir automáticamente cada letra al pergamino digital:</p>
            </div>

            <div style="max-width: 500px; margin: 0 auto 1.2rem auto;">
              <input type="text" id="ds-translator-input" oninput="updateDragonScriptTranslator()" placeholder="Escribí tu nombre o deseo acá (ej: MATIAS)..." style="width: 100%; padding: 12px 16px; border-radius: 10px; border: 1px solid var(--gold-main); background: rgba(10,9,17,0.95); color: var(--text-main); font-size: 1.1rem; outline: none; font-weight: 700; text-align: center;" />
            </div>

            <!-- PERGAMINO OUTPUT -->
            <div style="background: rgba(0,0,0,0.5); padding: 4px; border-radius: 14px; box-shadow: 0 6px 20px rgba(0,0,0,0.5);">
              <div style="background: rgba(15, 12, 25, 0.92); backdrop-filter: blur(4px); padding: 1.5rem; border-radius: 10px; border: 1px solid var(--gold-main); min-height: 90px; display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;" id="ds-translator-output">
                <span style="color: var(--text-muted); font-style: italic;">Escribí tu nombre o deseo arriba para verlo convertido al Escrito del Dragón...</span>
              </div>
            </div>
          </div>

        </div>

        <!-- TABLA INTERACTIVA DE SÍMBOLOS CON SONIDO -->
        <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--border-gold); padding: 1.5rem; border-radius: 14px; margin-bottom: 2rem;">
          <h4 style="color: var(--gold-main); margin-top: 0; font-size: 1.25rem; text-align: center;">
            🔊 Teclado Interactivo de Resonancia (Hacé clic en cualquier letra)
          </h4>
          <p style="color: var(--text-muted); font-size: 0.9rem; text-align: center; margin-bottom: 1.2rem;">
            Tocá cualquier letra para escuchar su resonancia armónica de runa y ver su significado espiritual:
          </p>

          <!-- PREVIEW BADGE -->
          <div id="ds-rune-preview" style="min-height: 65px; background: rgba(233,196,106,0.08); border: 1px dashed var(--gold-main); border-radius: 10px; padding: 10px; margin-bottom: 1.2rem; display: flex; align-items: center; justify-content: center; text-align: center;">
            <span style="color: var(--text-muted); font-style: italic;">Hacé clic en una letra del teclado mágico inferior...</span>
          </div>

          <!-- GRID DE LETRAS CON VECTORES SVG OFICIALES -->
          <div id="ds-rune-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(54px, 1fr)); gap: 10px;">
            ${Object.keys(DRAGON_SCRIPT_MAP).map(letter => `
              <button type="button" class="btn btn-secondary" onclick="playRuneSound('${letter}')" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px 4px; font-weight: 700; border-radius: 10px; color: var(--gold-main);">
                ${DRAGON_SCRIPT_MAP[letter].svg || `<span style="font-size: 1.3rem;">${DRAGON_SCRIPT_MAP[letter].glyph}</span>`}
                <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: bold; margin-top: 4px;">${letter}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- 🛠️ ¿CÓMO PUEDES USAR EL DRAGON SCRIPT? -->
        <div style="background: rgba(255,255,255,0.03); padding: 1.4rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
          <h4 style="color: #4cc9f0; margin-top: 0; font-size: 1.2rem;">🛠️ ¿Cómo podés usar el Dragon Script en tu día a día?</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem;">
            <div style="background: rgba(233,196,106,0.07); padding: 12px 14px; border-radius: 8px; border-left: 3px solid var(--gold-main);">
              <strong style="color: var(--gold-main);">1. Protegé tu Varita o Bastón:</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 4px 0 0 0; line-height: 1.5;">Pintá tu "Nombre Mágico" a lo largo de la madera de tu varita con marcador dorado o negro usando estos caracteres. Así la varita sabrá que te pertenece solo a vos.</p>
            </div>
            <div style="background: rgba(42,157,143,0.07); padding: 12px 14px; border-radius: 8px; border-left: 3px solid var(--color-teal);">
              <strong style="color: var(--color-teal);">2. Hechizo de tu Espejo Mágico:</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 4px 0 0 0; line-height: 1.5;">Para activar tu "Ojo de Dragón", escribí en su marco la frase: <em>"Por el poder del ojo del dragón, atrapo los pensamientos mágicos"</em> en Dragon Script.</p>
            </div>
            <div style="background: rgba(138,43,226,0.07); padding: 12px 14px; border-radius: 8px; border-left: 3px solid #9b5de5;">
              <strong style="color: #c77dff;">3. Tus Cartas de Deseos:</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 4px 0 0 0; line-height: 1.5;">Si necesitás pedirle un consejo de sabiduría, valentía o calma a tu dragón guardián, escribí tu petición en un pergamino en Dragon Script y guardalo en tu diario secreto.</p>
            </div>
            <div style="background: rgba(200,85,61,0.07); padding: 12px 14px; border-radius: 8px; border-left: 3px solid var(--color-rust);">
              <strong style="color: var(--color-rust);">4. Velas de Deseos:</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 4px 0 0 0; line-height: 1.5;">Con la ayuda de un adulto, podés usar un objeto puntiagudo para tallar tus metas o deseos en la cera de una vela de color antes de encenderla para tu ritual.</p>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  container.innerHTML = `
    <div class="magic-section-wrapper" style="display: flex; flex-direction: column; gap: 2rem;">
      <div class="magic-hero fantasy-panel text-center" style="padding: 2.2rem; background: linear-gradient(135deg, rgba(233,196,106,0.15), rgba(200,85,61,0.15)); border: 2px solid var(--gold-main); border-radius: 20px;">
        <div class="quiz-step-tag" style="font-size: 0.95rem;">⚒️ El Taller del Mago ⚒️</div>
        <h2 class="panel-title margin-top-xs" style="color: var(--gold-main); font-size: 2.3rem;">El Altar y las Herramientas del Mago</h2>
        <p style="color: var(--text-main); font-size: 1.1rem; max-width: 800px; margin: 12px auto 0 auto; line-height: 1.6;">
          Elegí una de las 4 subsecciones de artefactos y saberes para aprender su confección, alfabetos y reglas mágicas:
        </p>
        ${renderMagicSubNavHtml("altar")}
        
        <!-- BARRA DE SELECCIÓN DE HERRAMIENTAS -->
        <div class="margin-top-md text-center" style="display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;">
          <a href="/altar-varita.html" class="chip ${currentAltarTool === "varita" ? "active" : ""}" style="font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center;">✨ 1. Varita o Bastón</a>
          <a href="/altar-pentaculo.html" class="chip ${currentAltarTool === "pentaculo" ? "active" : ""}" style="font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center;">⭐ 2. Pentáculo (5 Elementos)</a>
          <a href="/altar-espejo.html" class="chip ${currentAltarTool === "espejo" ? "active" : ""}" style="font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center;">👁️ 3. Espejo Mágico</a>
          <a href="/altar-dragonscript.html" class="chip ${currentAltarTool === "dragonscript" ? "active" : ""}" style="font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center;">📜 4. Dragon Script</a>
        </div>
      </div>

      ${toolContentHtml}

      <div class="fantasy-panel text-center" style="padding: 2.2rem; background: linear-gradient(135deg, rgba(138,43,226,0.15), rgba(233,196,106,0.15)); border: 2px solid #8a2be2; border-radius: 20px;">
        <div style="font-size: 3rem;">🎓</div>
        <h3 class="panel-title margin-top-xs" style="color: var(--gold-main); font-size: 1.9rem;">¿Listo para avanzar en los 5 Anillos?</h3>
        <p style="color: var(--text-main); max-width: 700px; margin: 8px auto 0 auto; font-size: 1.05rem; line-height: 1.6;">
          Entrá a la <strong>Academia Draconiana</strong> y comenzá tu entrenamiento desde el Anillo 1 hasta el Anillo 5 de graduación.
        </p>
        <button type="button" class="btn btn-gold btn-lg margin-top-md" onclick="switchMagicSubPage('academia')" style="padding: 12px 28px; font-weight: 700; cursor: pointer;">
          🎓 Entrar a la Academia Draconiana
        </button>
      </div>
    </div>
  `;
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
          <a href="/academia-anillo-1.html" class="chip ${currentMagicRing === 1 ? "active" : ""}" style="padding: 10px 18px; font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center;">🌱 Anillo 1: El Aprendiz</a>
          <a href="/academia-anillo-2.html" class="chip ${currentMagicRing === 2 ? "active" : ""}" style="padding: 10px 18px; font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center;">📜 Anillo 2: El Encantador</a>
          <a href="/academia-anillo-3.html" class="chip ${currentMagicRing === 3 ? "active" : ""}" style="padding: 10px 18px; font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center;">🌿 Anillo 3: El Chamán</a>
          <a href="/academia-anillo-4.html" class="chip ${currentMagicRing === 4 ? "active" : ""}" style="padding: 10px 18px; font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center;">🛡️ Anillo 4: El Guerrero</a>
          <a href="/academia-anillo-5.html" class="chip ${currentMagicRing === 5 ? "active" : ""}" style="padding: 10px 18px; font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center;">🔮 Anillo 5: El Místico</a>
        </div>

        <!-- Ring Content Container -->
        <div class="ring-detail-box margin-top-lg fantasy-panel" id="ring-detail-box" style="padding: 1.8rem; background: rgba(0,0,0,0.4); border-radius: 16px;">
          ${renderRingContent(currentMagicRing)}
        </div>
      </div>

    </div>
  `;
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
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">✨ La Varita Mágica</h5>
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
              Los Encantadores preparan pociones de agua llamadas "condensadores de fluidos", que sirven para atrapar la energía de los elementos. Pedile a un adulto que te ayude a calentar un poquito de agua pura y agrégale hojas frescas de tu jardín (como menta, rosas o lavanda). Déjala enfriar por completo, cuélala y guárdala en una botellita.
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
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">🔮 1. El Espejo Brillante</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  Un espejo pequeño que usarás para "rebotar" las malas energías o las palabras feas sin guardarte rencor.
                </p>
              </div>

              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">🌿 2. El Bastón de Equilibrio</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  Una vara larga de madera (puedes buscar una rama firme en el parque). Sirve para mantener tu equilibrio emocional cuando sientes que te vas a caer o a rendir.
                </p>
              </div>
            </div>
          </div>

          <!-- Misión 1: El Hechizo del "Espejo Rebotador" -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--gold-main); background: rgba(233,196,106,0.08);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.4rem;">🔮 Misión 1: El Hechizo del "Espejo Rebotador"</h4>
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
                Toma tu "Diario de Secretos del Dragón" (tu cuaderno mágico) y dibuja una estrella fugaz grande en la última página. Escribí debajo:
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



// Interactive Mini-Games for Kids: Personality Quiz & Dragon Trivia
// Written in natural Rioplatense Spanish for 10-year-old children


const QUIZ_QUESTIONS = [
  {
    question: "1. Si pudieras volar hacia cualquier lugar ahora mismo, ¿a dónde irías?",
    options: [
      { text: "A la cima de un volcán hirviendo con lava y fuego", element: "Fuego", dragonId: 2 },
      { text: "A los picos nevados y helados del Polo Norte", element: "Hielo", dragonId: 8 },
      { text: "A explorar el palacio secreto en lo profundo del océano", element: "Agua", dragonId: 26 },
      { text: "A volar entre las estrellas y las galaxias lejanas", element: "Luz", dragonId: 94 }
    ]
  },
  {
    question: "2. ¿Cuál es tu superpoder favorito si fueras un dragón legendario?",
    options: [
      { text: "Lanzar llamaradas doradas que iluminan la noche", element: "Fuego", dragonId: 46 },
      { text: "Volverme invisible y deslizarme por las sombras", element: "Sombra", dragonId: 54 },
      { text: "Controlar el clima, la lluvia y los rayos con el pensamiento", element: "Tormenta", dragonId: 21 },
      { text: "Convertir cualquier piedra en un diamante resplandeciente", element: "Cristal", dragonId: 35 }
    ]
  },
  {
    question: "3. Si alguien intentara quitarte tu tesoro, ¿qué harías?",
    options: [
      { text: "Lanzar un rugido tan fuerte que haría temblar la tierra", element: "Fuego", dragonId: 18 },
      { text: "Resolver un acertijo sabio para convencerlo de irse en paz", element: "Luz", dragonId: 100 },
      { text: "Engañarlo con una niebla mágica y esconder el tesoro en una cueva", element: "Sombra", dragonId: 27 },
      { text: "Regalarle una manzana dorada para hacernos amigos", element: "Naturaleza", dragonId: 11 }
    ]
  },
  {
    question: "4. ¿En qué momento del día sentís que tenés más energía?",
    options: [
      { text: "Al amanecer, cuando el sol dorado recién sale", element: "Luz", dragonId: 36 },
      { text: "Al mediodía, cuando el sol está bien caliente", element: "Magma", dragonId: 37 },
      { text: "Al atardecer, cuando las nubes se ponen violetas", element: "Viento", dragonId: 38 },
      { text: "A la medianoche, bajo un cielo lleno de estrellas", element: "Sombra", dragonId: 97 }
    ]
  },
  {
    question: "5. ¿Qué cualidad describe mejor tu personalidad?",
    options: [
      { text: "Valiente y protector de mis amigos", element: "Fuego", dragonId: 46 },
      { text: "Curioso, inteligente y apasionado por aprender cosas nuevas", element: "Luz", dragonId: 100 },
      { text: "Tranquilo, paciente y amante de la naturaleza", element: "Naturaleza", dragonId: 4 },
      { text: "Ágil, veloz y lleno de sorpresas divertidas", element: "Rayo", dragonId: 98 }
    ]
  }
];

let currentQuizStep = 0;
let userAnswers = [];

function initQuizModule(containerId = "quiz-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  renderQuizIntro(container);
}

function renderQuizIntro(container) {
  currentQuizStep = 0;
  userAnswers = [];

  container.innerHTML = `
    <div class="quiz-wrapper fantasy-panel">
      <h3 class="panel-title">⭐ Test Draconiano: ¿Qué Dragón Sos Vos?</h3>
      <p class="quiz-desc">Respondé estas 5 preguntas divertidas para descubrir qué dragón de la enciclopedia coincide con tu espíritu legendario.</p>
      
      <div class="text-center margin-top-lg">
        <button class="btn btn-gold btn-lg" id="btn-start-quiz">🔥 Comenzar el Test</button>
      </div>
    </div>
  `;

  const btn = container.querySelector("#btn-start-quiz");
  if (btn) {
    btn.addEventListener("click", () => {
      playSound("click");
      renderQuizQuestion(container);
    });
  }
}

function renderQuizQuestion(container) {
  if (currentQuizStep >= QUIZ_QUESTIONS.length) {
    renderQuizResult(container);
    return;
  }

  const q = QUIZ_QUESTIONS[currentQuizStep];

  container.innerHTML = `
    <div class="quiz-wrapper fantasy-panel">
      <div class="quiz-progress-bar">
        <div class="progress-fill" style="width: ${((currentQuizStep + 1) / QUIZ_QUESTIONS.length) * 100}%"></div>
      </div>

      <span class="quiz-step-tag">Pregunta ${currentQuizStep + 1} de ${QUIZ_QUESTIONS.length}</span>
      <h3 class="question-text">${q.question}</h3>

      <div class="quiz-options-grid">
        ${q.options.map((opt, idx) => `
          <button class="quiz-option-card" data-idx="${idx}">
            <span class="opt-bullet">🐉</span>
            <span class="opt-text">${opt.text}</span>
          </button>
        `).join("")}
      </div>
    </div>
  `;

  container.querySelectorAll(".quiz-option-card").forEach(card => {
    card.addEventListener("click", () => {
      const idx = parseInt(card.dataset.idx, 10);
      userAnswers.push(q.options[idx]);
      playSound("click");
      currentQuizStep++;
      renderQuizQuestion(container);
    });
  });
}

function renderQuizResult(container) {
  // Determine matching dragon from answers
  const matchedDragonId = userAnswers[userAnswers.length - 1].dragonId || 100;
  const dragon = DRAGONS_DATA.find(d => d.id === matchedDragonId) || DRAGONS_DATA[99];

  playSound("chime");

  const artworkSrc = getDragonArtworkSrc(dragon);
  const visualContent = artworkSrc
    ? `<div class="modal-img-frame" style="max-width: 440px; aspect-ratio: 4 / 3; width: 100%; height: auto; margin: 0 auto; background: #0c0b14;">
        <img src="${artworkSrc}" alt="${dragon.name}" class="modal-artwork-img" style="object-fit: contain;" />
       </div>`
    : renderDragonSVG(dragon, 280, 220);

  container.innerHTML = `
    <div class="quiz-wrapper fantasy-panel text-center">
      <h3 class="panel-title">🎉 ¡Tu Dragón Interior es ${dragon.name}!</h3>
      <p class="quiz-result-subtitle">"${dragon.title}"</p>

      <div class="result-svg-box margin-top-md">
        ${visualContent}
      </div>

      <div class="result-details-box margin-top-md">
        <p><strong>Mitología:</strong> ${dragon.mythology} | <strong>Elemento:</strong> ${dragon.element}</p>
        <p class="margin-top-sm"><strong>Habilidad Especial:</strong> ${dragon.ability}</p>
        <p class="margin-top-sm italic-text">"${dragon.scroll}"</p>
      </div>

      <div class="margin-top-lg">
        <button class="btn btn-secondary btn-lg" id="btn-restart-quiz">🔄 Hacer el Test de Nuevo</button>
      </div>
    </div>
  `;

  const btnRestart = container.querySelector("#btn-restart-quiz");
  if (btnRestart) {
    btnRestart.addEventListener("click", () => {
      playSound("click");
      renderQuizIntro(container);
    });
  }
}



// Coliseo de Dragones - Duelo Rápido 1 vs 1
// Combate automático por asaltos con ventajas elementales, debilidades, animaciones y crónica épica


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

function initColiseoModule(containerId = "arena-container") {
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



function renderFavoritesView() {
  const container = document.getElementById("favorites-grid");
  if (!container) return;

  const favSet = getFavoritesSet();
  const favDragons = DRAGONS_DATA.filter(d => favSet.has(d.id));

  if (favDragons.length === 0) {
    container.innerHTML = `
      <div class="empty-state fantasy-panel width-100">
        <h3>🐉 No tenés dragones guardados todavía</h3>
        <p>Explorá la enciclopedia y hacé clic en el corazón para guardar tus dragones preferidos en la guarida.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = favDragons.map(dragon => renderDragonCardHTML(dragon)).join("");

  // Attach card click handlers for modal detail and favorite toggling
  container.querySelectorAll(".dragon-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".fav-btn")) return;
      const dragonId = parseInt(card.dataset.id, 10);
      const dragon = DRAGONS_DATA.find(d => d.id === dragonId);
      if (dragon) openDragonModal(dragon, renderFavoritesView);
    });

    const btnFav = card.querySelector(".fav-btn");
    if (btnFav) {
      btnFav.addEventListener("click", (e) => {
        e.stopPropagation();
        const dragonId = parseInt(card.dataset.id, 10);
        toggleFavorite(dragonId);
        renderFavoritesView();
      });
    }
  });
}



  // 5. MAIN ENTRY POINT

function switchTab(tabName, playSoundEffect = true) {
  if (playSoundEffect) {
    playSound("click");
  }

  // If user clicks a tab while inside a static /dragon/*.html page, redirect natively
  if (window.location.pathname.includes("/dragon/")) {
    const sectionUrls = {
      encyclopedia: "/",
      arena: "/arena.html",
      coliseo: "/arena.html",
      magic: "/magia-draconiana.html",
      quiz: "/test-draconiano.html",
      favorites: "/favoritos.html"
    };
    if (sectionUrls[tabName]) {
      window.location.href = sectionUrls[tabName];
      return;
    }
  }

  // Toggle active tab button
  document.querySelectorAll(".nav-tab").forEach(tab => {
    if (tab.dataset.tab === tabName) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  // Toggle active view section
  document.querySelectorAll(".view-section").forEach(sec => {
    sec.classList.remove("active");
    sec.style.display = "none";
  });

  const targetSection = document.getElementById(`section-${tabName}`);
  if (targetSection) {
    targetSection.classList.add("active");
    targetSection.style.display = "block";
  }

  // Trigger view renderers
  if (tabName === "encyclopedia") {
    renderEncyclopedia();
  } else if (tabName === "arena" || tabName === "coliseo") {
    initColiseoModule();
  } else if (tabName === "sigils") {
    switchTab("magic", false);
    if (window.switchMagicSubPage) {
      window.switchMagicSubPage("sigilos");
    }
  } else if (tabName === "magic") {
    initMagicModule();
  } else if (tabName === "quiz") {
    initQuizModule();
  } else if (tabName === "favorites") {
    renderFavoritesView();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Expose switchTab globally immediately
window.switchTab = switchTab;
window.renderEncyclopedia = renderEncyclopedia;

function initApp() {
  initParticlesCanvas("particle-canvas");

  const btnAudio = document.getElementById("btn-audio-toggle");
  if (btnAudio) {
    btnAudio.addEventListener("click", toggleSound);
  }

  // Attach sound click handler to all nav tabs
  document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      playSound("click");
    });
  });

  initEncyclopediaFilters();
  
  // Check active route from pathname without double sound or flash
  const path = window.location.pathname;
  if (path.includes("magia-draconiana")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("fundamentos");
  } else if (path.includes("altar-varita")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("altar");
    if (window.switchAltarTool) window.switchAltarTool("varita");
  } else if (path.includes("altar-pentaculo")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("altar");
    if (window.switchAltarTool) window.switchAltarTool("pentaculo");
  } else if (path.includes("altar-espejo")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("altar");
    if (window.switchAltarTool) window.switchAltarTool("espejo");
  } else if (path.includes("altar-dragonscript")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("altar");
    if (window.switchAltarTool) window.switchAltarTool("dragonscript");
  } else if (path.includes("altar-draconiano")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("altar");
  } else if (path.includes("academia-anillo-1")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("academia");
    if (window.switchMagicRing) window.switchMagicRing(1);
  } else if (path.includes("academia-anillo-2")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("academia");
    if (window.switchMagicRing) window.switchMagicRing(2);
  } else if (path.includes("academia-anillo-3")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("academia");
    if (window.switchMagicRing) window.switchMagicRing(3);
  } else if (path.includes("academia-anillo-4")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("academia");
    if (window.switchMagicRing) window.switchMagicRing(4);
  } else if (path.includes("academia-anillo-5")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("academia");
    if (window.switchMagicRing) window.switchMagicRing(5);
  } else if (path.includes("academia-draconiana")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("academia");
  } else if (path.includes("forja-de-sigilos")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("sigilos");
  } else if (path.includes("test-draconiano")) {
    switchTab("quiz", false);
  } else if (path.includes("arena") || path.includes("coliseo")) {
    switchTab("arena", false);
  } else if (path.includes("favoritos")) {
    switchTab("favorites", false);
  } else if (!path.includes("/dragon/")) {
    renderEncyclopedia();
  }

  // Deep-linking fallback: redirect legacy ?dragon=ID parameters to static SSG page
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("dragon")) {
    const dId = parseInt(urlParams.get("dragon"), 10);
    const dragon = DRAGONS_DATA.find(d => d.id === dId);
    if (dragon) {
      const slug = dragon.name.toLowerCase().replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u').replace(/ñ/g,'n').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
      window.location.href = `/dragon/${slug}.html`;
    }
  }

  window.initApp = initApp;
}

// Auto-boot app on DOMContentLoaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}



})();