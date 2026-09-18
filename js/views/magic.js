import { playSound } from "../utils/audio.js?v=6.1.0";
import { DRAGONS_DATA } from "../data/dragons.js?v=6.1.0";
import { renderDragonSVG } from "../svg/dragonSvg.js?v=6.1.0";
import { renderSigilForgeUI } from "./sigilForge.js?v=6.1.0";
import { DRAGON_SCRIPT_MAP, translateToDragonScript } from "../utils/dragonScript.js?v=6.1.0";

let currentMagicPage = "fundamentos";
let currentMagicRing = 1;
let currentAltarTool = "varita";

function magicIsEn() {
  return typeof window !== "undefined" && window.I18N && window.I18N.currentLang === "en";
}

// Global interactive translator for Dragon Script
window.updateDragonScriptTranslator = function() {
  const input = document.getElementById("ds-translator-input");
  const outputContainer = document.getElementById("ds-translator-output");
  const downloadBtn = document.getElementById("ds-download-all-btn");
  if (!input || !outputContainer) return;

  const isEn = magicIsEn();
  const val = input.value.trim();
  if (!val) {
    outputContainer.innerHTML = isEn
      ? `<span style="color: var(--text-muted); font-style: italic;">Write your name or wish above to see it converted into Dragon Script...</span>`
      : `<span style="color: var(--text-muted); font-style: italic;">Escribí tu nombre o deseo arriba para verlo convertido al Escrito del Dragón...</span>`;
    if (downloadBtn) downloadBtn.style.display = "none";
    return;
  }

  const translated = translateToDragonScript(val);

  outputContainer.innerHTML = translated.map(item => `
    <div class="ds-char-box">
      <div class="ds-char-glyph-wrap" style="color: var(--gold-main);">
        ${item.info.svg || `<span style="font-size:1.6rem;">${item.info.glyph}</span>`}
      </div>
      <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px; font-weight: 700; user-select: none;">${item.char}</span>
    </div>
  `).join("");

  if (downloadBtn) downloadBtn.style.display = "inline-flex";
};

// Genera un Canvas con los caracteres SVG exactos de Dragon Script en alta resolución dorada para descargar
function generateDragonScriptCanvas(items, callback) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const charWidth = 60;
  const charHeight = 70;
  const totalWidth = Math.max(120, items.length * charWidth + 40);
  const totalHeight = charHeight + 50;

  canvas.width = totalWidth;
  canvas.height = totalHeight;

  // Fondo místico oscuro
  ctx.fillStyle = "#0c0b14";
  ctx.fillRect(0, 0, totalWidth, totalHeight);

  // Borde dorado
  ctx.strokeStyle = "#e9c46a";
  ctx.lineWidth = 3;
  ctx.strokeRect(4, 4, totalWidth - 8, totalHeight - 8);

  let loadedImages = 0;
  const validItems = items.filter(it => it.char !== ' ');

  if (validItems.length === 0) {
    callback(canvas);
    return;
  }

  items.forEach((it, idx) => {
    if (it.char === ' ') return;
    const svgStr = it.info.svg;
    if (!svgStr) return;

    // Colorear el SVG con oro puro para el renderizado en canvas
    const coloredSvg = svgStr.replace(/currentColor/g, '#e9c46a');
    const svgBlob = new Blob([coloredSvg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = function() {
      const x = 20 + idx * charWidth + (charWidth - 44) / 2;
      const y = 14;
      ctx.drawImage(img, x, y, 44, 44);
      URL.revokeObjectURL(url);
      loadedImages++;

      // Letra latina pequeña abajo
      ctx.fillStyle = "#888899";
      ctx.font = "bold 13px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(it.char, 20 + idx * charWidth + charWidth / 2, y + 56);

      if (loadedImages >= validItems.length) {
        callback(canvas);
      }
    };
    img.src = url;
  });
}

// Descargar todo el mensaje traducido en PNG transparente/alta calidad
window.downloadDragonScriptImage = function() {
  const input = document.getElementById("ds-translator-input");
  if (!input || !input.value.trim()) return;

  const translated = translateToDragonScript(input.value.trim());
  generateDragonScriptCanvas(translated, (canvas) => {
    canvas.toBlob((blob) => {
      downloadCanvasBlob(blob, `dragon_script_${input.value.trim().toLowerCase()}.png`);
      playSound("chime");
    });
  });
};

function downloadCanvasBlob(blob, filename) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

window.playRuneSound = function(letter) {
  if (typeof playSound === "function") playSound("rune");
  const badge = document.getElementById("ds-rune-preview");
  const info = DRAGON_SCRIPT_MAP[letter];
  const isEn = magicIsEn();
  if (badge && info) {
    const descText = (isEn && info.desc_en) ? info.desc_en : info.desc;
    badge.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; gap: 14px; animation: fadeIn 0.3s ease; width: 100%;">
        <div class="ds-char-box" style="padding: 8px 12px; min-width: 50px;">
          <div class="ds-char-glyph-wrap" style="color: var(--gold-main);">
            ${info.svg || `<span style="font-size:2rem;">${info.glyph}</span>`}
          </div>
        </div>
        <div style="text-align: left;">
          <strong style="color: var(--gold-light); font-size: 1.15rem;">${isEn ? "Letter" : "Letra"} ${letter} — ${info.glyph}</strong>
          <p style="margin: 2px 0 0 0; color: var(--text-main); font-size: 0.92rem;">${descText}</p>
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

export function initMagicModule(containerId = "magic-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  renderMagicSection(container);
}

if (typeof window !== "undefined") {
  window.renderFundamentosView = renderFundamentosView;
  window.renderAltarSubPage = renderAltarSubPage;
  window.renderAcademiaSubPage = renderAcademiaSubPage;
  window.renderRingContent = renderRingContent;
  window.renderMagicSection = renderMagicSection;
}

function renderMagicSubNavHtml(activePage) {
  const isEn = window.I18N && window.I18N.currentLang === "en";
  return `
    <div class="margin-top-md magic-sub-nav">
      <a href="/magia-draconiana.html" class="chip ${activePage === "fundamentos" ? "active" : ""}" style="font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; ${activePage !== "fundamentos" ? "background: rgba(233,196,106,0.15);" : ""}">${isEn ? "📜 1. Foundations" : "📜 1. Fundamentos"}</a>
      <a href="/altar-draconiano.html" class="chip ${activePage === "altar" ? "active" : ""}" style="font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; ${activePage !== "altar" ? "background: rgba(233,196,106,0.15);" : ""}">${isEn ? "⚒️ 2. The Altar" : "⚒️ 2. El Altar"}</a>
      <a href="/academia-draconiana.html" class="chip ${activePage === "academia" ? "active" : ""}" style="font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; ${activePage !== "academia" ? "background: rgba(233,196,106,0.15);" : ""}">${isEn ? "🎓 3. Academy (5 Rings)" : "🎓 3. Academia (5 Anillos)"}</a>
      <a href="/forja-de-sigilos.html" class="chip ${activePage === "sigilos" ? "active" : ""}" style="font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; ${activePage !== "sigilos" ? "background: rgba(233,196,106,0.15);" : ""}">${isEn ? "🔮 4. Sigil Forge" : "🔮 4. Forja de Sigilos"}</a>
    </div>
  `;
}

function syncMagicRouteWithUrl() {
  if (typeof window === "undefined" || !window.location) return;
  const p = window.location.pathname;
  if (p.includes("altar-varita")) {
    currentMagicPage = "altar";
    currentAltarTool = "varita";
  } else if (p.includes("altar-pentaculo")) {
    currentMagicPage = "altar";
    currentAltarTool = "pentaculo";
  } else if (p.includes("altar-espejo")) {
    currentMagicPage = "altar";
    currentAltarTool = "espejo";
  } else if (p.includes("altar-dragonscript")) {
    currentMagicPage = "altar";
    currentAltarTool = "dragonscript";
  } else if (p.includes("altar-draconiano")) {
    currentMagicPage = "altar";
  } else if (p.includes("academia-anillo-")) {
    currentMagicPage = "academia";
    for (let r = 1; r <= 5; r++) {
      if (p.includes(`academia-anillo-${r}`)) {
        currentMagicRing = r;
        break;
      }
    }
  } else if (p.includes("academia-draconiana")) {
    currentMagicPage = "academia";
  } else if (p.includes("forja-de-sigilos")) {
    currentMagicPage = "sigilos";
  } else if (p.includes("magia-draconiana")) {
    currentMagicPage = "fundamentos";
  }
}

function renderMagicSection(container) {
  if (!container) container = document.getElementById("magic-container");
  if (!container) return;

  syncMagicRouteWithUrl();

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

// Window globals for cross-module reactivity
if (typeof window !== "undefined") {
  window.renderMagicSection = renderMagicSection;
  window.renderSigilSubPage = renderSigilSubPage;
}

// SUB-PÁGINA 1: FUNDAMENTOS Y LEYES
function renderFundamentosView(container) {
  const isEn = magicIsEn();
  container.innerHTML = `
    <div class="magic-section-wrapper" style="display: flex; flex-direction: column; gap: 2rem;">
      
      <!-- HERO BANNER DE MAGIA -->
      <div class="magic-hero fantasy-panel text-center" style="padding: 2.2rem; background: linear-gradient(135deg, rgba(42,157,143,0.15), rgba(200,85,61,0.15)); border: 2px solid var(--gold-main); border-radius: 20px;">
        <div class="quiz-step-tag" style="font-size: 0.95rem;">${isEn ? "✨ The Ancestral Path ✨" : "✨ El Sendero Ancestral ✨"}</div>
        <h2 class="panel-title margin-top-xs" style="color: var(--gold-main); font-size: 2.3rem;">${isEn ? "Draconian Magic: Foundations & Laws" : "Magia Draconiana: Fundamentos y Leyes"}</h2>
        <p style="color: var(--text-main); font-size: 1.1rem; max-width: 800px; margin: 12px auto 0 auto; line-height: 1.6;">
          ${isEn 
            ? "Welcome to the path of secret wisdom. Draconian Magic is an ancient tradition based on respect, friendship with ancient beings, and the responsible use of universal energy." 
            : "Te damos la bienvenida al camino de la sabiduría secreta. La Magia Draconiana es una tradición milenaria basada en el respeto, la amistad con seres antiguos y el uso responsable de la energía universal."}
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
            <h3 style="color: #ff4757; margin: 0; font-size: 1.6rem;">${isEn ? "The Wizard's Golden Rule: If you're not having fun, it's not magic!" : "La Regla de Oro del Mago: ¡Si no te divertís, no es magia!"}</h3>
          </div>
          <div style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 280px;">
              <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.7; margin: 0; font-weight: 500;">
                ${isEn 
                  ? "Listen closely, young wizard! There is a secret that many grimoires forget to tell, but which true sages and dragons know very well: <strong>magic was invented to be enjoyed and bring joy</strong>." 
                  : "¡Escuchá con atención, joven mago! Hay un secreto que muchos libros olvidan contar, pero que los verdaderos sabios y los dragones conocen muy bien: <strong>la magia se inventó para disfrutarse y ser feliz</strong>."}
              </p>
              <p style="color: var(--text-main); font-size: 0.98rem; line-height: 1.7; margin-top: 12px;">
                ${isEn 
                  ? "In Draconian Magic, having fun isn't just an extra—it is the very engine that makes your spells work! If you are ever practicing an exercise, meditating, or drawing a sigil and begin to feel bored, frightened, sad, or stressed, the golden rule instructs you to stop at once. <strong>If you're having a hard time, that isn't true magic!</strong>" 
                  : "En la Magia Draconiana, la diversión no es solo un extra, ¡es el motor que hace que tus hechizos funcionen! Si alguna vez estás practicando un ejercicio, haciendo una meditación o dibujando un sigilo y empezás a sentirte aburrido, asustado, triste o muy estresado, la regla de oro te dice que debés detenerte de inmediato. <strong>Si la estás pasando mal, ¡eso no es verdadera magia!</strong>"}
              </p>
            </div>
            <div style="width: 100%; max-width: 280px; border-radius: 12px; overflow: hidden; border: 2px solid var(--gold-main); box-shadow: 0 6px 18px rgba(0,0,0,0.6); flex-shrink: 0; margin: 0 auto;">
              <img src="/assets/patriarch_dragon_laws.webp" alt="${isEn ? "Wise patriarch dragon with the tablets of draconian commandments" : "Dragón patriarca sabio con las tablas de los mandamientos draconianos"}" style="width: 100%; height: auto; display: block; object-fit: cover;" />
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
                <h3 style="color: var(--color-teal); margin: 0; font-size: 1.45rem;">${isEn ? "The Rule of Companionship" : "La Regla del Compañerismo"}</h3>
              </div>
              <p style="color: var(--text-gold); font-size: 0.95rem; font-weight: 700; margin-top: 8px;">${isEn ? "Dragons are not pets!" : "¡Los dragones no son mascotas!"}</p>
              <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin-top: 8px;">
                ${isEn 
                  ? "Dragons are ancient, exceptionally wise, and independent beings. Draconian magic is rooted in cooperation and friendship, never in domination. Never attempt to order them around or treat them as servants. Treat them as your equals: with respect, trust, affection, and as true companions." 
                  : "Los dragones son seres antiguos, muy sabios e independientes. La magia draconiana se basa en la cooperación y la amistad, jamás en dominar. Nunca intentes ordenarles o tratarlos como sirvientes. Tratalos como a tus iguales: con respeto, confianza, cariño y como verdaderos compañeros de equipo."}
              </p>
            </div>
          </div>

          <!-- 💬 3. Las 24 Horas de Silencio -->
          <div class="fantasy-panel" style="padding: 1.8rem; border-left: 6px solid #9b5de5; background: rgba(155,93,229,0.08); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 2rem;">💬</span>
                <h3 style="color: #9b5de5; margin: 0; font-size: 1.45rem;">${isEn ? "The 24 Hours of Silence" : "Las 24 Horas de Silencio"}</h3>
              </div>
              <p style="color: var(--text-gold); font-size: 0.95rem; font-weight: 700; margin-top: 8px;">${isEn ? "Don't let your energy escape!" : "¡No dejes escapar tu energía!"}</p>
              <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin-top: 8px;">
                ${isEn 
                  ? "Whenever you cast a spell, trace a sigil, or make a petition to your dragon, keep absolute secrecy for at least a full day. Speaking of your magical workings prematurely disperses your energy. Dragons act in quiet stillness: allow your intention to gather its full strength." 
                  : "Cuando hagas un hechizo, dibujes un sigilo o hagas una petición a tu dragón, guardá el secreto absoluto por al menos un día entero. Hablar de tus trabajos mágicos antes de tiempo disipa tu energía. Los dragones actúan en silencio: dejá que tu deseo se concentre con toda su fuerza."}
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
                <h3 style="color: var(--gold-main); margin: 0; font-size: 1.45rem;">${isEn ? "Your Word is Made of Steel" : "Tu Palabra es de Acero"}</h3>
              </div>
              <p style="color: var(--text-gold); font-size: 0.95rem; font-weight: 700; margin-top: 8px;">${isEn ? "The law of sacred trust" : "La ley de la confianza sagrada"}</p>
              <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin-top: 8px;">
                ${isEn 
                  ? "Words act as invisible contracts with the cosmos. Therefore, your word is your sacred bond. If you promise your dragon (or yourself) to tidy your room, study, or tend your altar, see it through! Steadfastness keeps your energy resolute and sacred trust unbroken." 
                  : "Las palabras actúan como contratos invisibles con el universo. Por eso, tu palabra es tu promesa sagrada. Si le prometés a tu dragón (o a vos mismo) ordenar tu cuarto, estudiar o cuidar tu altar, ¡cumplilo! La constancia mantiene tu energía fuerte y la confianza intacta."}
              </p>
            </div>
          </div>

          <!-- 🕸️ 5. La Ley del Eco y la Red Tripartita -->
          <div class="fantasy-panel" style="padding: 1.8rem; border-left: 6px solid var(--color-rust); background: rgba(200,85,61,0.08); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 2rem;">🕸️</span>
                <h3 style="color: var(--color-rust); margin: 0; font-size: 1.45rem;">${isEn ? "The Law of the Echo & Cosmic Web" : "La Ley del Eco y la Red Cósmica"}</h3>
              </div>
              <p style="color: var(--text-gold); font-size: 0.95rem; font-weight: 700; margin-top: 8px;">${isEn ? '"What befalls a stone is mirrored in all"' : '"Lo que le pasa a una piedra, se refleja en todas"'}</p>
              <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin-top: 8px;">
                ${isEn 
                  ? "Everything across the Multiverse is woven into a vast web of energy. The <strong>Threefold Law</strong> reigns: whatever you send forth (kindness or harsh vibes) shall return to you threefold. If you nurture nature and walk gently, the universe will answer with joy and fortune." 
                  : "Todo en el Multiverso está conectado en una gran telaraña de energía. Rige la <strong>Ley Tripartita</strong>: lo que envíes (amabilidad o mala vibra) volverá a vos multiplicado por tres. Si cuidás la naturaleza y sos amable, el universo te devolverá felicidad y buena suerte."}
              </p>
            </div>
          </div>

        </div>

        <!-- 📜 6. El Código de Honor del Mago (PIE DE PÁGINA ANCHO COMPLETO) -->
        <div class="fantasy-panel" style="padding: 1.8rem; border-left: 6px solid #4cc9f0; background: rgba(76,201,240,0.08);">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 2rem;">📜</span>
            <h3 style="color: #4cc9f0; margin: 0; font-size: 1.5rem;">${isEn ? "The Draconian Mage's Code of Honor" : "El Código de Honor del Mago Draconiano"}</h3>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-top: 14px;">
            <div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 10px; border-left: 3px solid #4cc9f0;">
              <strong style="color: #4cc9f0;">${isEn ? "🛡️ Pure Intent:" : "🛡️ Intención Pura:"}</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 4px 0 0 0; line-height: 1.5;">${isEn ? "Never use magic to manipulate, frighten, or harm other beings or animals." : "Nunca uses la magia para manipular, asustar o dañar a otras personas o animales."}</p>
            </div>
            <div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 10px; border-left: 3px solid var(--gold-main);">
              <strong style="color: var(--gold-main);">${isEn ? "🌿 Elemental Reverence:" : "🌿 Respeto Elemental:"}</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 4px 0 0 0; line-height: 1.5;">${isEn ? "Always protect nature, trees, and every living creature on the planet." : "Protegé siempre a la naturaleza, a los árboles y a todos los seres vivos del planeta."}</p>
            </div>
            <div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 10px; border-left: 3px solid #9b5de5;">
              <strong style="color: #9b5de5;">${isEn ? "🔮 Secrecy & Discretion:" : "🔮 Sigilo y Discreción:"}</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 4px 0 0 0; line-height: 1.5;">${isEn ? "Keep your tools, altar, and Magical Name in quiet confidence to guard your power." : "Guardá en secreto tus herramientas, tu altar y tu Nombre Mágico para conservar tu fuerza."}</p>
            </div>
          </div>
        </div>

      </div>

      <!-- BANNER DE NAVEGACIÓN A HERRAMIENTAS -->
      <div class="fantasy-panel text-center" style="padding: 2.2rem; background: linear-gradient(135deg, rgba(233,196,106,0.1), rgba(42,157,143,0.1)); border: 2px solid var(--gold-main); border-radius: 20px;">
        <div style="font-size: 3rem;">⚒️</div>
        <h3 class="panel-title margin-top-xs" style="color: var(--gold-main); font-size: 1.9rem;">${isEn ? "Next Step: Craft Your Tools" : "Próximo Paso: Confeccioná tus Herramientas"}</h3>
        <p style="color: var(--text-main); max-width: 700px; margin: 8px auto 0 auto; font-size: 1.05rem; line-height: 1.6;">
          ${isEn 
            ? "Discover how to prepare your wand or staff, your pentacle, and your magic mirror in the Tools sanctuary." 
            : "Descubrí cómo preparar tu varita o bastón, tu pentáculo y tu espejo mágico en la sección de Herramientas."}
        </p>
        <button type="button" class="btn btn-gold btn-lg margin-top-md" onclick="switchMagicSubPage('altar')" style="padding: 12px 28px; font-weight: 700; cursor: pointer;">
          ${isEn ? "⚒️ Go to The Altar & Tools" : "⚒️ Ir a El Altar y Herramientas"}
        </button>
      </div>

    </div>
  `;
}

// SUB-PÁGINA 2: EL ALTAR Y LAS HERRAMIENTAS
function renderAltarSubPage(container) {
  if (typeof window !== "undefined" && window.location) {
    const p = window.location.pathname;
    if (p.includes("altar-varita")) currentAltarTool = "varita";
    else if (p.includes("altar-pentaculo")) currentAltarTool = "pentaculo";
    else if (p.includes("altar-espejo")) currentAltarTool = "espejo";
    else if (p.includes("altar-dragonscript")) currentAltarTool = "dragonscript";
  }

  const isEn = magicIsEn();
  let toolContentHtml = "";

  if (currentAltarTool === "varita") {
    toolContentHtml = `
      <!-- GUIA COMPLETA DE CREACION DE VARITA Y BASTON -->
      <div class="fantasy-panel" style="padding: 2rem; background: rgba(15, 23, 42, 0.7); border: 2px solid var(--gold-main); border-radius: 18px;">
        <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 1rem;">
          <div style="font-size: 2.5rem;">✨</div>
          <div>
            <h3 style="color: var(--gold-main); margin: 0; font-size: 1.8rem;">${isEn ? "The Draconian Wand or Staff" : "La Varita o Bastón Draconiano"}</h3>
            <p style="color: var(--text-muted); margin: 4px 0 0 0; font-size: 0.95rem;">${isEn ? "Complete manual of crafting, attuning, and safety for young wizards" : "Manual completo de confección, sintonización y seguridad para jóvenes magos"}</p>
          </div>
        </div>

        <div style="background: rgba(233,196,106,0.1); border-left: 4px solid var(--gold-main); padding: 14px 18px; border-radius: 8px; margin-bottom: 1.5rem;">
          <p style="color: var(--text-main); margin: 0; font-size: 1rem; line-height: 1.6;">
            ${isEn 
              ? "<strong>✨ The Wizards' Great Secret:</strong> No tool, no matter how beautiful, possesses magical power on its own. True power comes from within you and from your connection with the universe. Your wand or staff simply functions like a lens or laser beam that helps you concentrate and direct your invisible energy, preventing it from dispersing." 
              : "<strong>✨ El Gran Secreto de los Magos:</strong> Ninguna herramienta, por muy hermosa que sea, posee poder mágico por sí sola. El verdadero poder proviene de tu interior y de tu conexión con el universo. Tu varita o bastón funciona simplemente como una lente o rayo láser que te ayuda a concentrar y dirigir tu energía invisible, evitando que se disperse."}
          </p>
        </div>

        <!-- PASO 1 Y 2 -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(255,255,255,0.03); padding: 1.2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h4 style="color: #4cc9f0; margin-top: 0; font-size: 1.2rem;">${isEn ? "1. The Quest for Your Magical Material" : "1. La Búsqueda de tu Material Mágico"}</h4>
            <div style="width: 100%; max-width: 380px; margin: 0 auto 1rem auto; border-radius: 12px; overflow: hidden; border: 1px solid var(--border-gold); box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
              <img src="/assets/magic_wand_material.webp" alt="${isEn ? "Searching for a mystical branch on the beach" : "Búsqueda de rama mística en la playa"}" style="width: 100%; height: auto; display: block; object-fit: cover;" />
            </div>
            <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.5;">${isEn ? "You don't need to spend your savings or search for super-rare woods! The most powerful tools are the ones you craft yourself or find in unusual ways:" : "¡No necesitás gastar tus ahorros ni buscar maderas súper raras! Las herramientas más poderosas son las que vos mismo fabricás o encontrás de formas inusuales:"}</p>
            <ul style="color: var(--text-main); font-size: 0.9rem; line-height: 1.5; padding-left: 1.2rem;">
              <li style="margin-bottom: 6px;">${isEn ? "<strong>Gifts of Nature:</strong> Walk through a park, forest, or beach and look for a fallen branch or driftwood worn by the sea. <em>Golden Rule: Never harm a living tree.</em> Walk with a calm mind and your intuition will tell you which one is right." : "<strong>Regalos de la Naturaleza:</strong> Caminá por un parque, bosque o playa y buscá una rama caída o madera desgastada por el mar. <em>Regla de Oro: Nunca lastimes a un árbol vivo.</em> Caminá con mente tranquila y tu intuición te dirá cuál es la adecuada."}</li>
              <li>${isEn ? "<strong>Hidden Wands:</strong> You can use a smooth wooden dowel, a copper tube, or a clear plastic tube. Plastic is very sturdy and looks great if you fill it!" : "<strong>Varitas Ocultas:</strong> Podés usar una varilla lisa de madera, un tubo de cobre o un tubo de plástico transparente. ¡El plástico es muy resistente y se ve genial si lo rellenás!"}</li>
            </ul>
          </div>

          <div style="background: rgba(255,255,255,0.03); padding: 1.2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h4 style="color: #4cc9f0; margin-top: 0; font-size: 1.2rem;">${isEn ? "2. The Measure of the Wizard" : "2. La Medida del Mago"}</h4>
            <div style="width: 100%; max-width: 380px; margin: 0 auto 1rem auto; border-radius: 12px; overflow: hidden; border: 1px solid var(--border-gold); box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
              <img src="/assets/magic_wand_measurement.webp" alt="${isEn ? "Young wizard tuning his wand's measure in his room" : "Joven mago sintonizando la medida de su varita en su cuarto"}" style="width: 100%; height: auto; display: block; object-fit: cover;" />
            </div>
            <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.5;">${isEn ? "In draconian magic, the dimensions of your tools depend on your own body:" : "En la magia draconiana, la dimensión de tus herramientas depende de tu propio cuerpo:"}</p>
            <ul style="color: var(--text-main); font-size: 0.9rem; line-height: 1.5; padding-left: 1.2rem;">
              <li style="margin-bottom: 6px;">${isEn ? "<strong>For a Wand (Air Element):</strong> Serves to project your willpower. It should not be longer than the distance <strong>from your elbow to the tips of your fingers</strong>. If it is longer, it becomes clumsy inside the magic circle." : "<strong>Para una Varita (Elemento Aire):</strong> Sirve para proyectar tu fuerza de voluntad. No debe ser más larga que la distancia <strong>desde tu codo hasta la punta de tus dedos</strong>. Si es más larga, resulta torpe dentro del círculo mágico."}</li>
              <li>${isEn ? "<strong>For a Staff (Spirit Element):</strong> Acts as a bridge to astral planes. For walking outdoors, it should reach <strong>only up to your shoulder height</strong> to avoid bumping and knocking items off the altar." : "<strong>Para un Bastón (Elemento Espíritu):</strong> Funciona como puente hacia los planos astrales. Para caminar al aire libre, debe llegar <strong>solo hasta la altura de tus hombros</strong> para evitar golpear y tirar objetos del altar."}</li>
            </ul>
          </div>
        </div>

        <!-- PASO 3 -->
        <div style="background: rgba(255,255,255,0.03); padding: 1.2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 1.5rem;">
          <h4 style="color: var(--gold-main); margin-top: 0; font-size: 1.2rem;">${isEn ? "3. The Art of Decorating Your Tool" : "3. El Arte de Decorar tu Herramienta"}</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
            <div>
              <strong style="color: #e9c46a;">${isEn ? "💎 Power Tip:" : "💎 Punta de Poder:"}</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 4px 0 0 0; line-height: 1.5;">${isEn ? "Glue a quartz crystal point or shiny gemstone at the tip as an energy focus. If you use a transparent tube, fill it with colored pebbles and cap it with a black or dark stone." : "Pegá una punta de cuarzo o gema brillante en el extremo como foco de energía. Si usás un tubo transparente, rellenalo con piedritas de colores y tapalo con una piedra negra u oscura."}</p>
            </div>
            <div>
              <strong style="color: #e9c46a;">${isEn ? "⚡ Copper & Leather:" : "⚡ Cobre y Cuero:"}</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 4px 0 0 0; line-height: 1.5;">${isEn ? "Wrap the center with copper wire to empower the stones. Tie leather strips around the grip to insulate static electricity." : "Envolvé el centro con alambre de cobre para potenciar las piedras. Atá tiras de cuero en el agarre para aislar la electricidad estática."}</p>
            </div>
            <div>
              <strong style="color: #e9c46a;">${isEn ? "🎨 Elemental Colors:" : "🎨 Colores Elementales:"}</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 4px 0 0 0; line-height: 1.5;">${isEn ? "Tie ribbons of the 4 elements: Red (Fire), Yellow (Air), Blue (Water), and Green/Black (Earth)." : "Atá cintas de los 4 elementos: Rojo (Fuego), Amarillo (Aire), Azul (Agua) y Verde/Negro (Tierra)."}</p>
            </div>
            <div>
              <strong style="color: #e9c46a;">${isEn ? "🔔 Dragon Music & Name:" : "🔔 Música para Dragones & Nombre:"}</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 4px 0 0 0; line-height: 1.5;">${isEn ? "Add small bells to the ribbons to attract dragons with their vibrations. Paint your Magical Name in " : "Agregá campanitas en las cintas para atraer dragones con sus vibraciones. Pintá tu Nombre Mágico en "}<a href="javascript:void(0)" onclick="switchAltarTool('dragonscript')" style="color: var(--gold-main); font-weight: 700; text-decoration: underline;">${isEn ? "Dragon Script Alphabet" : "Alfabeto Draconiano (Dragon Script)"}</a>.</p>
            </div>
          </div>
        </div>

        <!-- PASO 4: REGLA DE SEGURIDAD -->
        <div style="background: rgba(230, 57, 70, 0.15); border: 2px solid #e63946; padding: 1.2rem; border-radius: 12px; margin-bottom: 1.5rem;">
          <h4 style="color: #ff4d6d; margin-top: 0; font-size: 1.2rem; display: flex; align-items: center; gap: 8px;">
            ${isEn ? "⚠️ Dragon Safety Rule (Very Important!)" : "⚠️ Regla de Seguridad del Dragón (¡Muy Importante!)"}
          </h4>
          <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin: 0;">
            ${isEn 
              ? "Your wand <strong>is not a toy or a pretend sword</strong>. Once you use it in magic, it charges with concentrated energy. <strong>Never point or wave your wand at people or pets</strong>: the energy streams out like a laser beam and would hit their Aura (protective shield), potentially causing fatigue, bad moods, or poor fortune. Treat your tools with absolute respect!" 
              : "Tu varita <strong>no es un juguete ni una espada de mentira</strong>. Una vez que la usás en magia, se carga de energía concentrada. <strong>Nunca apuntés ni agités tu varita hacia personas o mascotas</strong>: la energía sale como un rayo láser e incidiría en su Aura (escudo protector), pudiendo causarles cansancio, mal humor o mala suerte. ¡Tratá tus herramientas con absoluto respeto!"}
          </p>
        </div>

        <!-- PASO 5: RITUAL DE DESPERTAR -->
        <div style="background: linear-gradient(135deg, rgba(42,157,143,0.15), rgba(138,43,226,0.15)); border: 1px solid var(--color-teal); padding: 1.4rem; border-radius: 12px;">
          <h4 style="color: var(--color-teal); margin-top: 0; font-size: 1.25rem;">${isEn ? "5. The Awakening Ritual (Consecration)" : "5. El Ritual de Despertar (Consagración)"}</h4>
          <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.5; margin-bottom: 10px;">
            ${isEn ? "Preferably performed on a <strong>Full or Waxing Moon</strong> night:" : "Se realiza preferentemente en noche de <strong>Luna Llena o Creciente</strong>:"}
          </p>
          <ol style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; padding-left: 1.2rem;">
            <li style="margin-bottom: 8px;">${isEn 
              ? 'Gently sprinkle the wand with droplets of pure water and say aloud:<br><em style="color: var(--gold-main); font-weight: bold;">"I ask the dragons to cleanse this wand with spiritual energy"</em>.' 
              : 'Rociá suavemente la varita con gotitas de agua pura y di en voz alta:<br><em style="color: var(--gold-main); font-weight: bold;">"Pido a los dragones que limpien esta varita con energía espiritual"</em>.'}</li>
            <li style="margin-bottom: 8px;">${isEn ? "Pass it over incense smoke while reciting this incantation:" : "Pasala sobre el humo de incienso recitando este conjuro:"}
              <div style="background: rgba(0,0,0,0.4); padding: 12px; border-radius: 8px; margin: 8px 0; border-left: 4px solid var(--gold-main); color: var(--text-gold); font-style: italic;">
                ${isEn 
                  ? '"Mighty dragons, ancient and bold,<br>Fill this wand with power untold.<br>Teach me its virtues, light over dark,<br>And make it shine with your sacred spark"' 
                  : '"Poderosos dragones, fuertes y ancianos,<br>Llenen mi varita con poder en mis manos.<br>Enséñenme sus usos, el bien sobre el mal,<br>Y háganla brillar con su canción magistral"'}
              </div>
            </li>
            <li>${isEn ? "Leave it overnight next to the window exposed to the Full Moon light for at least 2 hours." : "Dejala durante la noche junto a la ventana expuesta a la luz de la Luna Llena por al menos 2 horas."}</li>
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
            <h3 style="color: var(--color-teal); margin: 0; font-size: 1.8rem;">${isEn ? "The Dragon's Pentacle" : "El Pentáculo del Dragón"}</h3>
            <p style="color: var(--text-muted); margin: 4px 0 0 0; font-size: 0.95rem;">${isEn ? "Your magical shield and badge of authority before dragons" : "Tu escudo mágico y medalla de autoridad ante los dragones"}</p>
          </div>
        </div>

        <!-- INTRODUCCIÓN CON ILUSTRACIÓN -->
        <div style="background: rgba(42,157,143,0.1); border-left: 4px solid var(--color-teal); padding: 16px 20px; border-radius: 12px; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 280px;">
            <p style="color: var(--text-main); margin: 0; font-size: 1rem; line-height: 1.7;">
              ${isEn 
                ? "Every great magical lab equipment needs a safe foundation! In Draconian Magic, that base is the <strong>Dragon's Pentacle</strong>. It is not an attacking weapon, but acts as an <strong>energy shield</strong>, a balancer, and your magical 'badge of authority'. When dragons see your Pentacle, they immediately know you are a serious, friendly wizard worthy of respect." 
                : "¡Todo gran equipo de laboratorio mágico necesita una base segura! En la Magia Draconiana, esa base es el <strong>Pentáculo del Dragón</strong>. No es un arma para atacar, sino que funciona como un <strong>escudo de energía</strong>, un equilibrador y tu 'medalla de autoridad' mágica. Cuando los dragones ven tu Pentáculo, saben de inmediato que sos un mago serio, amigable y digno de respeto."}
            </p>
          </div>
          <div style="width: 100%; max-width: 260px; border-radius: 12px; overflow: hidden; border: 2px solid var(--gold-main); box-shadow: 0 6px 18px rgba(0,0,0,0.6); flex-shrink: 0; margin: 0 auto;">
            <img src="/assets/clay_pentacle_altar.webp" alt="${isEn ? "The Dragon's Pentacle made of clay on the altar" : "El Pentáculo del Dragón hecho de arcilla en el altar"}" style="width: 100%; height: auto; display: block; object-fit: cover;" />
          </div>
        </div>

        <!-- PASO 1: FABRICAR -->
        <div style="background: rgba(255,255,255,0.03); padding: 1.4rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 1.5rem;">
          <h4 style="color: #4cc9f0; margin-top: 0; font-size: 1.2rem;">${isEn ? "1. Craft Your Own Pentacle!" : "1. ¡Fabrica tu propio Pentáculo!"}</h4>
          <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin-bottom: 10px;">
            ${isEn 
              ? "The Pentacle is usually a flat disc drawn with a five-pointed star (a pentagram). Dragons don't care if it's made of gold or paper; what matters to them is that <strong>you make it yourself</strong>!" 
              : "El Pentáculo suele ser un disco plano con el dibujo de una estrella de cinco puntas (un pentagrama). A los dragones no les importa si está hecho de oro o de papel, ¡lo que les importa es que <strong>lo hagas vos mismo</strong>!"}
          </p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
            <div style="background: rgba(233,196,106,0.07); padding: 10px 14px; border-radius: 8px; border-left: 3px solid var(--gold-main);">
              <strong style="color: var(--gold-main);">${isEn ? "🪵 Materials:" : "🪵 Materiales:"}</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 6px 0 0 0; line-height: 1.5;">${isEn ? "Find a flat wooden circle at a craft store, use a clay disc you sculpt yourself, or cut a perfect circle out of thick, sturdy cardboard." : "Buscá un círculo de madera plano en una tienda de manualidades, usá un disco de arcilla que modeles vos mismo, o recortá un círculo perfecto en cartón grueso y resistente."}</p>
            </div>
            <div style="background: rgba(233,196,106,0.07); padding: 10px 14px; border-radius: 8px; border-left: 3px solid var(--gold-main);">
              <strong style="color: var(--gold-main);">${isEn ? "🎨 The Drawing:" : "🎨 El Dibujo:"}</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 6px 0 0 0; line-height: 1.5;">${isEn ? "Draw a five-pointed star in the center with your best markers. It is very powerful to draw a dragon embracing the star or holding it with its claws! Use the colors you like best." : "Dibujá una estrella de cinco puntas en el centro con tus mejores marcadores. ¡Es muy poderoso dibujar un dragón abrazando la estrella o sosteniéndola con sus garras! Usá los colores que más te gusten."}</p>
            </div>
          </div>
        </div>

        <!-- PASO 2: LAS CINCO PUNTAS -->
        <div style="background: rgba(255,255,255,0.03); padding: 1.4rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 1.5rem;">
          <h4 style="color: #4cc9f0; margin-top: 0; font-size: 1.2rem;">${isEn ? "2. The Secret of the Five Points" : "2. El Secreto de las Cinco Puntas"}</h4>
          <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem;">
            ${isEn ? "Why a star? In ancient magic, the universe is made of great forces. Each point of your star represents an element:" : "¿Por qué una estrella? En la magia antigua, el universo está formado por grandes fuerzas. Cada punta de tu estrella representa un elemento:"}
          </p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 8px; text-align: center; margin-bottom: 1rem;">
            <div style="background: rgba(139,90,43,0.2); padding: 10px 8px; border-radius: 10px; border: 1px solid rgba(139,90,43,0.4);">
              <div style="font-size: 1.6rem;">🌍</div>
              <strong style="color: #c4a35a; font-size: 0.85rem;">${isEn ? "Earth" : "Tierra"}</strong>
            </div>
            <div style="background: rgba(100,180,255,0.15); padding: 10px 8px; border-radius: 10px; border: 1px solid rgba(100,180,255,0.4);">
              <div style="font-size: 1.6rem;">💨</div>
              <strong style="color: #7ecef4; font-size: 0.85rem;">${isEn ? "Air" : "Aire"}</strong>
            </div>
            <div style="background: rgba(230,57,70,0.15); padding: 10px 8px; border-radius: 10px; border: 1px solid rgba(230,57,70,0.4);">
              <div style="font-size: 1.6rem;">🔥</div>
              <strong style="color: #ff6b6b; font-size: 0.85rem;">${isEn ? "Fire" : "Fuego"}</strong>
            </div>
            <div style="background: rgba(30,100,200,0.15); padding: 10px 8px; border-radius: 10px; border: 1px solid rgba(30,100,200,0.4);">
              <div style="font-size: 1.6rem;">💧</div>
              <strong style="color: #74c0fc; font-size: 0.85rem;">${isEn ? "Water" : "Agua"}</strong>
            </div>
            <div style="background: rgba(138,43,226,0.2); padding: 10px 8px; border-radius: 10px; border: 2px solid rgba(138,43,226,0.6);">
              <div style="font-size: 1.6rem;">✨</div>
              <strong style="color: #c77dff; font-size: 0.85rem;">${isEn ? "Spirit ↑" : "Espíritu ↑"}</strong>
              <p style="color: var(--text-muted); font-size: 0.75rem; margin: 3px 0 0 0;">${isEn ? "Your magic!" : "¡Tu magia!"}</p>
            </div>
          </div>
          <p style="color: var(--text-main); font-size: 0.9rem; line-height: 1.6; margin: 0;">
            ${isEn 
              ? "Having your Pentacle on the altar helps keep all these energies calm and in perfect balance, acting like a &quot;vacuum&quot; that catches bad vibes and keeps your room safe." 
              : "Tener tu Pentáculo en el altar ayuda a que todas estas energías se mantengan tranquilas y en perfecto equilibrio, funcionando como una &quot;aspiradora&quot; que atrapa las malas vibras y mantiene tu cuarto seguro."}
          </p>
        </div>

        <!-- PASO 3: REGLA DE SEGURIDAD + DIAGRAMA SÍ/NO -->
        <div style="background: rgba(230, 57, 70, 0.12); border: 2px solid #e63946; padding: 1.4rem; border-radius: 12px; margin-bottom: 1.5rem;">
          <h4 style="color: #ff4d6d; margin-top: 0; font-size: 1.2rem;">${isEn ? "⚠️ The Great Safety Rule (Very Important!)" : "⚠️ La Gran Regla de Seguridad (¡Muy Importante!)"}</h4>
          <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.2rem;">
            ${isEn 
              ? "The Pentacle is a symbol of harmony, health, and mystical powers, but it has a <strong>golden rule</strong> you must never forget:" 
              : "El Pentáculo es un símbolo de armonía, salud y poderes místicos, pero tiene una <strong>regla de oro</strong> que nunca debés olvidar:"}
          </p>

          <!-- DIAGRAMA SÍ / NO -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; max-width: 500px; margin: 0 auto;">
            <!-- SÍ -->
            <div style="background: rgba(42,157,143,0.15); border: 2px solid var(--color-teal); border-radius: 12px; padding: 1rem; text-align: center;">
              <div style="font-size: 2rem; margin-bottom: 4px;">✅</div>
              <div style="font-size: 2.5rem; line-height: 1; margin-bottom: 6px; filter: drop-shadow(0 0 6px rgba(42,200,150,0.8));">⭐</div>
              <strong style="color: var(--color-teal); font-size: 1rem;">${isEn ? "YES!" : "¡SÍ!"}</strong>
              <p style="color: var(--text-main); font-size: 0.8rem; margin: 6px 0 0 0; line-height: 1.4;">${isEn ? "A single point <strong>pointing upward</strong> (to the sky). Attracts good magic and friendly dragons. ✨🐉" : "Una sola punta <strong>apuntando hacia arriba</strong> (al cielo). Atrae buena magia y dragones amigables. ✨🐉"}</p>
            </div>
            <!-- NO -->
            <div style="background: rgba(230,57,70,0.12); border: 2px solid #e63946; border-radius: 12px; padding: 1rem; text-align: center;">
              <div style="font-size: 2rem; margin-bottom: 4px;">❌</div>
              <div style="font-size: 2.5rem; line-height: 1; margin-bottom: 6px; transform: rotate(180deg); display: inline-block; filter: drop-shadow(0 0 6px rgba(230,57,70,0.7));">⭐</div>
              <strong style="color: #ff4d6d; font-size: 1rem;">${isEn ? "NO!" : "¡NO!"}</strong>
              <p style="color: var(--text-main); font-size: 0.8rem; margin: 6px 0 0 0; line-height: 1.4;">${isEn ? "Inverted with <strong>two points facing up</strong>. Attracts confusion, bad mood, and chaotic magic. 😵🌀" : "Invertida con <strong>dos puntas hacia arriba</strong>. Atrae confusiones, mal humor y magia caótica. 😵🌀"}</p>
            </div>
          </div>
        </div>

        <!-- PASO 4: CONSAGRACIÓN -->
        <div style="background: linear-gradient(135deg, rgba(42,157,143,0.15), rgba(138,43,226,0.15)); border: 1px solid var(--color-teal); padding: 1.4rem; border-radius: 12px;">
          <h4 style="color: var(--color-teal); margin-top: 0; font-size: 1.25rem;">${isEn ? "4. The Awakening Spell (Consecration)" : "4. El Hechizo de Despertar (Consagración)"}</h4>
          <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.5; margin-bottom: 1rem;">
            ${isEn ? "Once finished painting and decorating your disc, you must purify it to fill it with magic:" : "Una vez terminado de pintar y decorar tu disco, tienes que purificarlo para llenarlo de magia:"}
          </p>
          <ol style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; padding-left: 1.2rem; margin-bottom: 1rem;">
            <li style="margin-bottom: 10px;">${isEn 
              ? "Ask an adult to help you light an incense stick that smells delicious (<strong>apple, sandalwood, or lavender</strong> are beloved by dragons). Take your Pentacle with your <strong>power hand</strong> (the hand you write with) and pass it slowly through the smoke while saying:" 
              : "Pedile a un adulto que te ayude a encender una varita de incienso que huela muy rico (el de <strong>manzana, sándalo o lavanda</strong> les encanta a los dragones). Toma tu Pentáculo con tu <strong>mano de poder</strong> (la mano con la que escribes) y pasalo lentamente a través del humo mientras dices:"}
              <div style="background: rgba(0,0,0,0.4); padding: 12px; border-radius: 8px; margin: 8px 0; border-left: 4px solid var(--color-teal); color: #a8dadc; font-style: italic; line-height: 1.6;">
                ${isEn ? '"Element of Spirit, by the power of the Dragon, I call you purified!"' : '"Elemento del Espíritu, por el poder del Dragón, ¡te llamo purificado!"'}
              </div>
            </li>
            <li style="margin-bottom: 10px;">${isEn 
              ? "Raise your Pentacle before you, facing <strong>East</strong>, and present it to your guardians saying:" 
              : "Levanta tu Pentáculo frente a vos, mirando hacia el <strong>Este</strong>, y presentalo a tus guardianes diciendo:"}
              <div style="background: rgba(0,0,0,0.4); padding: 12px; border-radius: 8px; margin: 8px 0; border-left: 4px solid var(--gold-main); color: var(--text-gold); font-style: italic; line-height: 1.6;">
                ${isEn ? '"Dragons of magic, behold my symbol and be my allies"' : '"Dragones de la magia, contemplen mi símbolo y sean mis aliados"'}
              </div>
            </li>
            <li>${isEn 
              ? "Done! Place your Pentacle at the <strong>center of your altar</strong>. Now you can place your amulets, stones, or Wand on top of it to recharge them with clean, balanced energy. 🐉⭐" 
              : "¡Listo! Pon tu Pentáculo en el <strong>centro de tu altar</strong>. Ahora podés poner encima de él tus amuletos, tus piedras o tu Varita para recargarlos de energía limpia y equilibrada. 🐉⭐"}</li>
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
            <h3 style="color: var(--color-rust); margin: 0; font-size: 1.8rem;">${isEn ? "The Magic Mirror (Dragon's Eye)" : "El Espejo Mágico (Ojo de Dragón)"}</h3>
            <p style="color: var(--text-muted); margin: 4px 0 0 0; font-size: 0.95rem;">${isEn ? "Deflecting shield, imagination screen, and eye into the dragon realm" : "Escudo rebotador, pantalla de imaginación y ojo al mundo de los dragones"}</p>
          </div>
        </div>

        <!-- INTRODUCCIÓN CON ILUSTRACIÓN -->
        <div style="background: rgba(200,85,61,0.1); border-left: 4px solid var(--color-rust); padding: 16px 20px; border-radius: 12px; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 280px;">
            <p style="color: var(--text-main); margin: 0; font-size: 1rem; line-height: 1.7;">
              ${isEn 
                ? "So far you have your Wand (to direct your energy) and your Pentacle (your safe base). But a draconian wizard's equipment is not complete without the <strong>Magic Mirror</strong>! In dragon magic, the mirror represents the <strong>Earth element</strong> and is not used for grooming. It is used as the <strong>'Dragon\'s Eye'</strong>: a super-secret tool to catch good ideas, protect you from bad vibes, and peer into the world of imagination." 
                : "Hasta ahora tenés tu Varita (para dirigir tu energía) y tu Pentáculo (tu base segura). ¡Pero el equipo de un mago draconiano no está completo sin el <strong>Espejo Mágico</strong>! En la magia de los dragones, el espejo representa el <strong>elemento Tierra</strong> y no se usa para peinarse. Se usa como el <strong>'Ojo del Dragón'</strong>: una herramienta súper secreta para atrapar buenas ideas, protegerte de las malas vibras y asomarte al mundo de la imaginación."}
            </p>
          </div>
          <div style="width: 100%; max-width: 260px; border-radius: 12px; overflow: hidden; border: 2px solid var(--gold-main); box-shadow: 0 6px 18px rgba(0,0,0,0.6); flex-shrink: 0; margin: 0 auto;">
            <img src="/assets/magic_mirror_wooden.webp" alt="${isEn ? "The Magic Mirror with mystical wooden frame" : "El Espejo Mágico con marco de madera místico"}" style="width: 100%; height: auto; display: block; object-fit: cover;" />
          </div>
        </div>

        <!-- PASO 1: CREAR EL ESPEJO -->
        <div style="background: rgba(255,255,255,0.03); padding: 1.4rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 1.5rem;">
          <h4 style="color: #4cc9f0; margin-top: 0; font-size: 1.2rem;">${isEn ? "1. Create Your Own Dragon's Eye!" : "1. ¡Crea tu propio Ojo de Dragón!"}</h4>
          <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.5; margin-bottom: 1.2rem;">${isEn ? "Magic mirrors are very easy to make. You can choose between <strong>two incredible types</strong>:" : "Los espejos mágicos son muy fáciles de hacer. Podés elegir entre <strong>dos tipos increíbles</strong>:"}</p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
            <!-- ESPEJO BRILLANTE -->
            <div style="background: rgba(233,196,106,0.07); border: 1px solid rgba(233,196,106,0.3); border-radius: 12px; padding: 1.2rem;">
              <div style="font-size: 1.8rem; margin-bottom: 6px;">✨</div>
              <strong style="color: var(--gold-main); font-size: 1.05rem;">${isEn ? "The Shiny Mirror" : "El Espejo Brillante"}</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 8px 0 0 0; line-height: 1.5;">${isEn ? "Get any small mirror that has a flat wooden or plastic frame. The older and more mysterious the frame looks, the better!" : "Conseguí cualquier espejo pequeño que tenga un marco de madera o de plástico plano. ¡Entre más viejo y misterioso se vea el marco, mejor!"}</p>
            </div>
            <!-- ESPEJO OSCURO -->
            <div style="background: rgba(20,20,30,0.6); border: 2px solid rgba(200,85,61,0.5); border-radius: 12px; padding: 1.2rem; position: relative; overflow: hidden;">
              <div style="font-size: 1.8rem; margin-bottom: 6px;">🌑</div>
              <strong style="color: #c8553d; font-size: 1.05rem;">${isEn ? "The Dark Mirror" : "El Espejo Oscuro"} <span style="color: var(--text-muted); font-size: 0.8rem;">${isEn ? "(The sorcerers' secret)" : "(El secreto de los hechiceros)"}</span></strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 8px 0 0 0; line-height: 1.5;">${isEn ? "Dragons love peering through &ldquo;black mirrors&rdquo;. To make one:" : "A los dragones les encanta asomarse por &ldquo;espejos negros&rdquo;. Para hacer uno:"}</p>
              <ol style="color: var(--text-main); font-size: 0.88rem; line-height: 1.5; padding-left: 1.2rem; margin: 8px 0 0 0;">
                <li style="margin-bottom: 4px;">${isEn ? "Get a small picture frame." : "Conseguí un portarretratos pequeño."}</li>
                <li style="margin-bottom: 4px;">${isEn ? "Ask an adult to help you remove the glass." : "Pedile a un adulto que te ayude a sacar el vidrio."}</li>
                <li style="margin-bottom: 4px;">${isEn ? "Paint only one side of the glass with plenty of <strong>black acrylic paint</strong>." : "Pintá solo un lado del vidrio con mucha <strong>pintura acrílica negra</strong>."}</li>
                <li style="margin-bottom: 4px;">${isEn ? "When dry, reassemble the picture frame with the painted part facing back." : "Cuando seque, volvé a armar el portarretratos con la parte pintada hacia atrás."}</li>
                <li>${isEn ? "The front will look like a super shiny, mysterious black mirror! 🖤" : "¡El frente se verá como un espejo negro súper brillante y misterioso! 🖤"}</li>
              </ol>
            </div>
          </div>
        </div>

        <!-- PASO 2: CONJURO DEL MARCO -->
        <div style="background: rgba(255,255,255,0.03); padding: 1.4rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 1.5rem;">
          <h4 style="color: #4cc9f0; margin-top: 0; font-size: 1.2rem;">${isEn ? "2. The Frame Incantation (The Secret Alphabet)" : "2. El Conjuro del Marco (El Alfabeto Secreto)"}</h4>
          <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem;">
            ${isEn ? "For the mirror to awaken, you must write a magical instruction on it. Use a <strong>permanent marker</strong> (gold or silver looks great) to write all around the frame:" : "Para que el espejo despierte, tenés que escribirle una instrucción mágica. Usá un <strong>marcador permanente</strong> (dorado o plateado se ve genial) para escribir alrededor de todo el marco:"}
          </p>
          <div style="background: rgba(0,0,0,0.5); border: 2px solid var(--gold-main); padding: 1.2rem 1.5rem; border-radius: 12px; text-align: center; margin-bottom: 1rem;">
            <p style="color: var(--gold-main); font-style: italic; font-size: 1.05rem; line-height: 1.7; margin: 0;">
              ${isEn 
                ? "By the power of the Dragon's Eye,<br>I capture visionary thoughts<br>and bounce back discordant energy" 
                : "Por el poder del Ojo del Dragón,<br>atrapo los pensamientos mágicos<br>y reboto la mala energía"}
            </p>
          </div>
          <div style="background: rgba(138,43,226,0.12); border-left: 4px solid #9b5de5; padding: 12px 16px; border-radius: 8px;">
            <p style="color: var(--text-main); font-size: 0.92rem; margin: 0; line-height: 1.6;">
              💡 <strong>${isEn ? "Super Tip!" : "¡Súper Tip!"}</strong> ${isEn 
                ? 'If you want it to look like a true ancient artifact, use the <a href="javascript:void(0)" onclick="switchAltarTool(\'dragonscript\'); window.scrollTo({top: 300, behavior: \'smooth\'});" style="color: var(--gold-main); font-weight: bold; text-decoration: underline; background: rgba(255,215,0,0.15); padding: 2px 8px; border-radius: 6px; border: 1px solid var(--gold-main);">📜 Dragon Script Alphabet</a> from our secret codes section to write this message. No one but wizards will be able to read it! 🐉🔮' 
                : 'Si querés que se vea como un verdadero artefacto antiguo, usá el <a href="javascript:void(0)" onclick="switchAltarTool(\'dragonscript\'); window.scrollTo({top: 300, behavior: \'smooth\'});" style="color: var(--gold-main); font-weight: bold; text-decoration: underline; background: rgba(255,215,0,0.15); padding: 2px 8px; border-radius: 6px; border: 1px solid var(--gold-main);">📜 Alfabeto de los Dragones (Dragon Script)</a> de nuestra sección de códigos secretos para escribir este mensaje. ¡Nadie más que los magos podrá leerlo! 🐉🔮'}
            </p>
          </div>
        </div>

        <!-- PASO 3: LOS DOS SUPERPODERES -->
        <div style="background: rgba(255,255,255,0.03); padding: 1.4rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 1.5rem;">
          <h4 style="color: #4cc9f0; margin-top: 0; font-size: 1.2rem;">${isEn ? "3. The Two Superpowers of Your Mirror" : "3. Los Dos Súper Poderes de tu Espejo"}</h4>
          <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.5; margin-bottom: 1rem;">${isEn ? "Once ready, your magic mirror has <strong>two main functions</strong>:" : "Una vez que está listo, tu espejo mágico tiene <strong>dos funciones principales</strong>:"}</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">

            <!-- PODER 1: ESCUDO REBOTADOR -->
            <div style="background: linear-gradient(135deg, rgba(42,157,143,0.1), rgba(42,157,143,0.05)); border: 2px solid var(--color-teal); border-radius: 12px; padding: 1.2rem;">
              <div style="font-size: 2rem; margin-bottom: 6px;">🛡️</div>
              <strong style="color: var(--color-teal); font-size: 1.05rem;">${isEn ? "The Deflecting Shield" : "El Escudo Rebotador"}</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 8px 0 0 0; line-height: 1.5;">
                ${isEn ? "If you had a bad day, or someone said hurtful words that made you feel sad (we call this &ldquo;harmful energy&rdquo;), don't let them stay with you!" : "Si tuviste un mal día, o alguien te dijo palabras feas que te hicieron sentir triste (a esto le llamamos &ldquo;energía dañina&rdquo;), ¡no dejes que se queden con vos!"}
              </p>
              <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 10px 12px; margin-top: 10px; border-left: 3px solid var(--color-teal);">
                <p style="color: var(--text-main); font-size: 0.88rem; margin: 0; line-height: 1.5;">
                  ${isEn 
                    ? 'Hold the mirror in front of you with the reflective side pointing <strong>outward</strong> (toward the world) and imagine the figure of a giant dragon appearing in the glass. Think with great focus:<br><em style="color: var(--color-teal);">"May bad energy return to where it came from!"</em><br>The mirror will bounce the bad mood away from you. 💚' 
                    : 'Sostené el espejo frente a vos con la parte que refleja apuntando <strong>hacia afuera</strong> (hacia el mundo) e imaginá que la figura de un dragón gigante aparece en el cristal. Pensá con mucha fuerza:<br><em style="color: var(--color-teal);">"¡Que la mala energía regrese a donde vino!"</em><br>El espejo rebotará el mal humor lejos de vos. 💚'}
                </p>
              </div>
            </div>

            <!-- PODER 2: PANTALLA DE IMAGINACIÓN -->
            <div style="background: linear-gradient(135deg, rgba(138,43,226,0.12), rgba(138,43,226,0.05)); border: 2px solid #9b5de5; border-radius: 12px; padding: 1.2rem;">
              <div style="font-size: 2rem; margin-bottom: 6px;">🔮</div>
              <strong style="color: #c77dff; font-size: 1.05rem;">${isEn ? "The Screen of Imagination" : "La Pantalla de la Imaginación"}</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 8px 0 0 0; line-height: 1.5;">
                ${isEn ? "The black mirror functions as a television for your intuition. Just with the mirror on your altar in a room with soft light:" : "El espejo negro funciona como una televisión para tu intuición. Solo con el espejo en tu altar en una habitación con luz suave:"}
              </p>
              <ol style="color: var(--text-main); font-size: 0.88rem; line-height: 1.5; padding-left: 1.2rem; margin: 8px 0 0 0;">
                <li style="margin-bottom: 4px;">${isEn ? "Sit, relax, and look deeply into the glass <strong>without straining your eyes</strong>, letting your vision soften slightly." : "Sentate, relajate y mirá profundamente el cristal <strong>sin esforzar los ojos</strong>, dejando que tu vista se vuelva un poco borrosa."}</li>
                <li style="margin-bottom: 4px;">${isEn ? "<strong>Do not try to force images!</strong> Just let your mind become quiet." : "¡<strong>No trates de forzar imágenes!</strong> Solo dejá que tu mente se calme."}</li>
                <li>${isEn ? "Sometimes you'll see colors, feel great ideas come out of nowhere, or even catch a glimpse of your <strong>Guardian Dragon</strong> greeting you. 🐉✨" : "A veces verás colores, sentirás que se te ocurren ideas geniales de la nada, o incluso podrías ver un destello de tu <strong>Dragón Guardián</strong> saludándote. 🐉✨"}</li>
              </ol>
            </div>

          </div>
        </div>

        <!-- PASO 4: REGLA DE LIMPIEZA -->
        <div style="background: rgba(42,157,143,0.1); border: 1px solid var(--color-teal); padding: 1.4rem; border-radius: 12px;">
          <h4 style="color: var(--color-teal); margin-top: 0; font-size: 1.2rem;">${isEn ? "💧 The Cleansing Rule (Washing Astral Dust)" : "💧 La Regla de Limpieza (Lavando el &quot;Polvo Astral&quot;)"}</h4>
          <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin: 0;">
            ${isEn 
              ? "Because mirrors catch thoughts and bounce away bad moods, they sometimes get <em>soiled with invisible energy</em>. If you feel your mirror no longer shines the same or you are grumpy when using it, it is time for a magic bath! Wash it with a little <strong>pure water and gentle soap</strong> to remove all &quot;astral dust&quot; and let it rest. 🌊✨" 
              : "Como los espejos atrapan pensamientos y rebotan el mal humor, a veces se <em>&quot;ensucian&quot; de energía invisible</em>. Si sentís que tu espejo ya no brilla igual o estás de mal humor cuando lo usás, ¡es hora de un baño mágico! Lavalo con un poquito de <strong>agua pura y jabón suave</strong> para quitarle todo el &quot;polvo astral&quot; y dejalo descansar. 🌊✨"}
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
            <h3 style="color: var(--gold-main); margin: 0; font-size: 1.8rem;">${isEn ? "The Alphabet of Dragons: Dragon Script" : "El Alfabeto de los Dragones: Dragon Script"}</h3>
            <p style="color: var(--text-muted); margin: 4px 0 0 0; font-size: 0.95rem;">${isEn ? "The ancient mystical cipher for communicating with draconian beings" : "El cifrado místico antiguo para comunicarte con los seres draconianos"}</p>
          </div>
        </div>

        <!-- INTRODUCCIÓN CON ILUSTRACIÓN -->
        <div style="background: rgba(233,196,106,0.1); border-left: 4px solid var(--gold-main); padding: 16px 20px; border-radius: 12px; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 280px;">
            <p style="color: var(--text-main); margin: 0; font-size: 1rem; line-height: 1.7;">
              ${isEn 
                ? "Can you imagine having a secret alphabet that only you and dragons can read? Well, it exists! In the wondrous world of draconian magic, this writing system is known as <strong>Dragon Script</strong> (or the Dragon's Runes). Dragons are immensely intelligent beings and know all human languages, but ancient teachings reveal that <strong>they pay much closer attention to things written using this special alphabet</strong>. It is like sending them a message sealed with a &quot;Super Important!&quot; stamp!" 
                : "¿Te imaginás tener un alfabeto secreto que solo vos y los dragones puedan leer? ¡Pues existe! En el maravilloso mundo de la magia draconiana, este sistema de escritura se conoce como <strong>Dragon Script</strong> (o el Escrito del Dragón). Los dragones son seres sumamente inteligentes y conocen todos los idiomas humanos, pero las fuentes nos revelan que <strong>ellos prestan muchísima más atención a las cosas que escribís usando este alfabeto especial</strong>. ¡Es como enviarles un mensaje con un sello de &quot;¡Súper Importante!&quot;!"}
            </p>
          </div>
          <div style="width: 100%; max-width: 260px; border-radius: 12px; overflow: hidden; border: 2px solid var(--gold-main); box-shadow: 0 6px 18px rgba(0,0,0,0.6); flex-shrink: 0; margin: 0 auto;">
            <img src="/assets/scholar_dragon_script.webp" alt="${isEn ? "Scholar dragon writing manuscript in Dragon Script in gothic hall" : "Dragón erudito escribiendo manuscrito en Dragon Script en salón gótico"}" style="width: 100%; height: auto; display: block; object-fit: cover;" />
          </div>
        </div>

        <!-- CONTENIDO PRINCIPAL: TEXTOS E HISTORIA -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2rem;">
          
          <!-- 🌟 HISTORIA -->
          <div style="background: rgba(255,255,255,0.03); padding: 1.4rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h4 style="color: #4cc9f0; margin-top: 0; font-size: 1.2rem; display: flex; align-items: center; gap: 8px;">${isEn ? "🌟 The Lore of the Mysterious Script" : "🌟 La Historia del Alfabeto Misterioso"}</h4>
            <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin: 0;">
              ${isEn 
                ? "No one knows with scientific certainty who originally invented this alphabet or how many thousands of years ago it was created, as its origin is a great mystery. What we do know is that it was taught to humans by a wise spiritual entity of Irish-Celtic origin who communicated with mages through dreams and deep meditations. If you look closely at its letters, you will notice they resemble other legendary alphabets such as <strong>Viking Runes</strong>, <strong>Celtic Ogham</strong>, and the ciphers of medieval alchemists." 
                : "Nadie sabe con certeza científica quién inventó originalmente este alfabeto o hace cuántos miles de años se creó, pues su origen es un gran misterio. Lo que sí sabemos es que fue enseñado a los humanos por una sabia entidad espiritual de origen irlandés-celta que se comunicaba con los magos a través de sueños y profundas meditaciones. Si mirás con atención sus letras, notarás que se parecen a otros alfabetos legendarios como las <strong>Runas vikingas</strong>, el <strong>Ogham celta</strong> y los códigos de los alquimistas medievales."}
            </p>
          </div>

          <!-- ⚡ POR QUÉ HACE TU MAGIA MÁS FUERTE -->
          <div style="background: rgba(255,255,255,0.03); padding: 1.4rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h4 style="color: var(--gold-main); margin-top: 0; font-size: 1.2rem; display: flex; align-items: center; gap: 8px;">${isEn ? "⚡ Why Does Writing in Dragon Script Make Your Magic Stronger?" : "⚡ ¿Por qué escribir en Dragon Script hace tu magia más fuerte?"}</h4>
            <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin: 0;">
              ${isEn 
                ? "You might wonder: <em>&quot;Why not simply write in my normal letters?&quot;</em> The answer is a secret of wise enchanters! When you write a petition or your name using this alphabet, you must go slowly, letter by letter, consulting the symbol chart to avoid mistakes. That extra effort demands all your <strong>Concentration</strong>. By drawing each curve and mysterious stroke patiently, you are focusing your mind and <strong>transferring your own personal energy and willpower into the object</strong>. That is why tools and wishes inscribed in Dragon Script hum with incredible magical power!" 
                : "Seguramente te preguntarás: <em>&quot;¿Por qué no escribir simplemente con mis letras normales?&quot;</em> ¡La respuesta es un secreto de los sabios encantadores! Cuando escribís una petición o tu nombre usando este alfabeto, tenés que ir despacio, letra por letra, mirando la tabla de símbolos para no equivocarte. Ese esfuerzo extra requiere de toda tu <strong>Concentración</strong>. Al dibujar cada curva y cada línea misteriosa con paciencia, estás enfocando tu mente y <strong>traspasando tu propia energía personal y tu fuerza de voluntad al objeto</strong>. ¡Es por eso que las herramientas y los deseos escritos en Dragon Script se llenan de un poder mágico increíble!"}
            </p>
          </div>

          <!-- 🧩 TRADUCTOR INTERACTIVO ÚNICO Y OFICIAL -->
          <div style="background: linear-gradient(135deg, rgba(138,43,226,0.15), rgba(42,157,143,0.15)); border: 2px solid var(--color-teal); padding: 1.6rem; border-radius: 16px;">
            <div style="text-align: center; margin-bottom: 1rem;">
              <span style="font-size: 2.2rem;">🧩</span>
              <h4 style="color: var(--color-teal); margin: 6px 0 0 0; font-size: 1.4rem;">${isEn ? "Magical Dragon Script Translator" : "Traductor Mágico al Dragon Script"}</h4>
              <p style="color: var(--text-main); font-size: 0.95rem; margin-top: 4px;">${isEn ? "Type your real name, nickname, or intention to automatically translate each letter onto the digital scroll:" : "Escribí tu nombre real, apodo o deseo para traducir automáticamente cada letra al pergamino digital:"}</p>
            </div>

            <div style="max-width: 500px; margin: 0 auto 1.2rem auto;">
              <input type="text" id="ds-translator-input" oninput="updateDragonScriptTranslator()" placeholder="${isEn ? "Type your name or wish here (e.g. ARTHUR)..." : "Escribí tu nombre o deseo acá (ej: MATIAS)..."}" style="width: 100%; padding: 12px 16px; border-radius: 10px; border: 1px solid var(--gold-main); background: rgba(10,9,17,0.95); color: var(--text-main); font-size: 1.1rem; outline: none; font-weight: 700; text-align: center;" />
            </div>

            <!-- PERGAMINO OUTPUT -->
            <div style="background: rgba(0,0,0,0.5); padding: 4px; border-radius: 14px; box-shadow: 0 6px 20px rgba(0,0,0,0.5);">
              <div style="background: rgba(15, 12, 25, 0.92); backdrop-filter: blur(4px); padding: 1.5rem; border-radius: 10px; border: 1px solid var(--gold-main); min-height: 90px; display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;" id="ds-translator-output">
                <span style="color: var(--text-muted); font-style: italic;">${isEn ? "Type your name or wish above to see it converted into Dragon Script..." : "Escribí tu nombre o deseo arriba para verlo convertido al Escrito del Dragón..."}</span>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 14px; flex-wrap: wrap; gap: 10px;">
              <span style="font-size: 0.85rem; color: var(--text-muted);">
                ✨ <em>${isEn ? "Check the equivalence of each rune or download the full composition in high resolution:" : "Mirá la equivalencia de cada letra o descargá la composición completa en alta resolución:"}</em>
              </span>
              <div>
                <button id="ds-download-all-btn" type="button" class="btn btn-gold btn-sm" style="display: none; padding: 8px 18px; font-weight: 700;" onclick="downloadDragonScriptImage()">
                  ${isEn ? "📥 Download Dragon Script Image" : "📥 Descargar Imagen Dragon Script"}
                </button>
              </div>
            </div>
          </div>

        </div>

        <!-- TABLA INTERACTIVA DE SÍMBOLOS CON SONIDO -->
        <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--border-gold); padding: 1.5rem; border-radius: 14px; margin-bottom: 2rem;">
          <h4 style="color: var(--gold-main); margin-top: 0; font-size: 1.25rem; text-align: center;">
            ${isEn ? "🔊 Interactive Resonance Keyboard (Click any rune)" : "🔊 Teclado Interactivo de Resonancia (Hacé clic en cualquier letra)"}
          </h4>
          <p style="color: var(--text-muted); font-size: 0.9rem; text-align: center; margin-bottom: 1.2rem;">
            ${isEn ? "Click any letter to hear its harmonic rune resonance and reveal its spiritual meaning:" : "Tocá cualquier letra para escuchar su resonancia armónica de runa y ver su significado espiritual:"}
          </p>

          <!-- PREVIEW BADGE -->
          <div id="ds-rune-preview" style="min-height: 65px; background: rgba(233,196,106,0.08); border: 1px dashed var(--gold-main); border-radius: 10px; padding: 10px; margin-bottom: 1.2rem; display: flex; align-items: center; justify-content: center; text-align: center;">
            <span style="color: var(--text-muted); font-style: italic;">${isEn ? "Click a letter on the mystic keyboard below..." : "Hacé clic en una letra del teclado mágico inferior..."}</span>
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
          <h4 style="color: #4cc9f0; margin-top: 0; font-size: 1.2rem;">${isEn ? "🛠️ How Can You Use Dragon Script in Your Daily Life?" : "🛠️ ¿Cómo podés usar el Dragon Script en tu día a día?"}</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem;">
            <div style="background: rgba(233,196,106,0.07); padding: 12px 14px; border-radius: 8px; border-left: 3px solid var(--gold-main);">
              <strong style="color: var(--gold-main);">${isEn ? "1. Protect Your Wand or Staff:" : "1. Protegé tu Varita o Bastón:"}</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 4px 0 0 0; line-height: 1.5;">${isEn ? "Paint your 'Magical Name' along the wood of your wand with gold or black marker using these characters. That way your wand will know it belongs to you alone." : "Pintá tu 'Nombre Mágico' a lo largo de la madera de tu varita con marcador dorado o negro usando estos caracteres. Así la varita sabrá que te pertenece solo a vos."}</p>
            </div>
            <div style="background: rgba(42,157,143,0.07); padding: 12px 14px; border-radius: 8px; border-left: 3px solid var(--color-teal);">
              <strong style="color: var(--color-teal);">${isEn ? "2. Magic Mirror Incantation:" : "2. Hechizo de tu Espejo Mágico:"}</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 4px 0 0 0; line-height: 1.5;">${isEn ? "To activate your 'Dragon\'s Eye', inscribe around its frame the phrase: <em>&quot;By the power of the dragon\'s eye, I capture visionary thoughts&quot;</em> in Dragon Script." : "Para activar tu 'Ojo de Dragón', escribí en su marco la frase: <em>&quot;Por el poder del ojo del dragón, atrapo los pensamientos mágicos&quot;</em> en Dragon Script."}</p>
            </div>
            <div style="background: rgba(138,43,226,0.07); padding: 12px 14px; border-radius: 8px; border-left: 3px solid #9b5de5;">
              <strong style="color: #c77dff;">${isEn ? "3. Intention & Wish Scrolls:" : "3. Tus Cartas de Deseos:"}</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 4px 0 0 0; line-height: 1.5;">${isEn ? "If you wish to ask your guardian dragon for advice on wisdom, courage, or calm, write your petition on parchment in Dragon Script and keep it in your secret diary." : "Si necesitás pedirle un consejo de sabiduría, valentía o calma a tu dragón guardián, escribí tu petición en un pergamino en Dragon Script y guardalo en tu diario secreto."}</p>
            </div>
            <div style="background: rgba(200,85,61,0.07); padding: 12px 14px; border-radius: 8px; border-left: 3px solid var(--color-rust);">
              <strong style="color: var(--color-rust);">${isEn ? "4. Intention Candles:" : "4. Velas de Deseos:"}</strong>
              <p style="color: var(--text-main); font-size: 0.9rem; margin: 4px 0 0 0; line-height: 1.5;">${isEn ? "With an adult's help, you can use a pointed stylus to carve your goals or intentions into the wax of a colored candle before lighting it for your ritual." : "Con la ayuda de un adulto, podés usar un objeto puntiagudo para tallar tus metas o deseos en la cera de una vela de color antes de encenderla para tu ritual."}</p>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  container.innerHTML = `
    <div class="magic-section-wrapper" style="display: flex; flex-direction: column; gap: 2rem;">
      <div class="magic-hero fantasy-panel text-center" style="padding: 2.2rem; background: linear-gradient(135deg, rgba(233,196,106,0.15), rgba(200,85,61,0.15)); border: 2px solid var(--gold-main); border-radius: 20px;">
        <div class="quiz-step-tag" style="font-size: 0.95rem;">${isEn ? "⚒️ The Wizard's Workshop ⚒️" : "⚒️ El Taller del Mago ⚒️"}</div>
        <h2 class="panel-title margin-top-xs" style="color: var(--gold-main); font-size: 2.3rem;">${isEn ? "The Altar & Wizard's Tools" : "El Altar y las Herramientas del Mago"}</h2>
        <p style="color: var(--text-main); font-size: 1.1rem; max-width: 800px; margin: 12px auto 0 auto; line-height: 1.6;">
          ${isEn 
            ? "Choose one of the 4 artifact sections to learn their crafting, secret scripts, and sacred lore:" 
            : "Elegí una de las 4 subsecciones de artefactos y saberes para aprender su confección, alfabetos y reglas mágicas:"}
        </p>
        ${renderMagicSubNavHtml("altar")}
        
        <!-- BARRA DE SELECCIÓN DE HERRAMIENTAS -->
        <div class="margin-top-md text-center" style="display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;">
          <a href="/altar-varita.html" class="chip ${currentAltarTool === "varita" ? "active" : ""}" style="font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center;">${isEn ? "✨ 1. Wand or Staff" : "✨ 1. Varita o Bastón"}</a>
          <a href="/altar-pentaculo.html" class="chip ${currentAltarTool === "pentaculo" ? "active" : ""}" style="font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center;">${isEn ? "⭐ 2. Pentacle (5 Elements)" : "⭐ 2. Pentáculo (5 Elementos)"}</a>
          <a href="/altar-espejo.html" class="chip ${currentAltarTool === "espejo" ? "active" : ""}" style="font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center;">${isEn ? "👁️ 3. Magic Mirror" : "👁️ 3. Espejo Mágico"}</a>
          <a href="/altar-dragonscript.html" class="chip ${currentAltarTool === "dragonscript" ? "active" : ""}" style="font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center;">${isEn ? "📜 4. Dragon Script" : "📜 4. Dragon Script"}</a>
        </div>
      </div>

      ${toolContentHtml}

      <div class="fantasy-panel text-center" style="padding: 2.2rem; background: linear-gradient(135deg, rgba(138,43,226,0.15), rgba(233,196,106,0.15)); border: 2px solid #8a2be2; border-radius: 20px;">
        <div style="font-size: 3rem;">🎓</div>
        <h3 class="panel-title margin-top-xs" style="color: var(--gold-main); font-size: 1.9rem;">${isEn ? "Ready to Advance Through the 5 Rings?" : "¿Listo para avanzar en los 5 Anillos?"}</h3>
        <p style="color: var(--text-main); max-width: 700px; margin: 8px auto 0 auto; font-size: 1.05rem; line-height: 1.6;">
          ${isEn 
            ? "Enter the <strong>Draconian Academy</strong> and begin your training from Ring 1 through Ring 5 of graduation." 
            : "Entrá a la <strong>Academia Draconiana</strong> y comenzá tu entrenamiento desde el Anillo 1 hasta el Anillo 5 de graduación."}
        </p>
        <button type="button" class="btn btn-gold btn-lg margin-top-md" onclick="switchMagicSubPage('academia')" style="padding: 12px 28px; font-weight: 700; cursor: pointer;">
          ${isEn ? "🎓 Enter the Draconian Academy" : "🎓 Entrar a la Academia Draconiana"}
        </button>
      </div>
    </div>
  `;
}

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

function renderRingContent(ringNumber) {
  const isEn = magicIsEn();
  switch (ringNumber) {
    case 1:
      return `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          
          <!-- Encabezado del Anillo 1 -->
          <div style="display: flex; align-items: center; gap: 14px; background: rgba(42,157,143,0.15); padding: 1.2rem; border-radius: 14px; border: 1px solid var(--color-teal);">
            <span style="font-size: 2.8rem;">🌱</span>
            <div>
              <h3 style="color: var(--gold-main); margin: 0; font-size: 1.7rem;">${isEn ? "Level 1: The Dragon Apprentice" : "Nivel 1: El Aprendiz de Dragón"}</h3>
              <p style="color: var(--text-gold); font-style: italic; margin: 4px 0 0 0; font-size: 1.05rem;">
                ${isEn 
                  ? "&quot;Welcome to the First Ring! Becoming a draconian wizard is an incredible journey that will expand your mind.&quot;" 
                  : "&quot;¡Bienvenido al Primer Anillo! Convertirse en un mago draconiano es una aventura increíble que abrirá tu mente.&quot;"}
              </p>
            </div>
          </div>

          <p style="line-height: 1.6; color: var(--text-main); font-size: 1.05rem;">
            ${isEn 
              ? "Every great wizard must begin by mastering the most fundamental arts: <strong>concentration</strong>, <strong>visualization</strong> (the art of directing your imagination with purpose), and <strong>patience</strong>." 
              : "Todo gran mago debe empezar por dominar las habilidades más básicas: la <strong>concentración</strong>, la <strong>visualización</strong> (el arte de usar tu imaginación con fuerza) y la <strong>paciencia</strong>."}
          </p>

          <!-- Código y Símbolos del Aprendiz -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0 0 10px 0; font-size: 1.3rem;">${isEn ? "🔮 The Apprentice's Code & Symbols" : "🔮 El Código y los Símbolos del Aprendiz"}</h4>
            
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(233,196,106,0.08); padding: 1rem; border-radius: 10px; border-left: 4px solid var(--gold-main);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "📜 Your Magical Motto:" : "📜 Tu Lema Mágico:"}</h5>
                <p style="margin-top: 4px; font-style: italic; color: var(--text-gold); font-size: 1rem; font-weight: 600;">
                  ${isEn ? "&quot;To be called is to have a destiny. Know thyself well.&quot;" : "&quot;Ser llamado es tener un destino. Conócete bien a vos mismo.&quot;"}
                </p>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "This reminds us that every being plays a meaningful part in this world. To practice magic safely, you must first be completely honest with yourself about your own feelings, your gifts, and your shortcomings." 
                    : "Esto significa que todos tenemos un papel importante en este mundo. Para hacer magia de forma segura, primero debés ser honesto sobre tus propios sentimientos, tus talentos y tus defectos."}
                </p>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
                <div style="background: rgba(42,157,143,0.1); padding: 1rem; border-radius: 10px; border: 1px solid var(--color-teal);">
                  <h5 style="color: var(--color-teal); margin: 0; font-size: 1.1rem;">${isEn ? "🟦 Your Color: Pure Blue" : "🟦 Tu Color: El Azul"}</h5>
                  <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                    ${isEn 
                      ? "The color of serene emotions and inner mind clarity. Find a blue ribbon (about 60 cm) to drape across your shoulders whenever you sit to meditate or cast your exercises." 
                      : "Es el color de las emociones tranquilas y la magia de la mente. Conseguí un listón azul (de unos 60 cm) para ponértelo sobre los hombros cada vez que vayas a practicar tus hechizos o a meditar."}
                  </p>
                </div>

                <div style="background: rgba(200,85,61,0.1); padding: 1rem; border-radius: 10px; border: 1px solid var(--color-rust);">
                  <h5 style="color: var(--color-rust); margin: 0; font-size: 1.1rem;">${isEn ? "⭐ Your Symbol: The Elven Star" : "⭐ Tu Símbolo: La Estrella Élfica"}</h5>
                  <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                    ${isEn 
                      ? "The seven-pointed star (heptagram). Drawing it or tracing its path with your finger allows your mind to quiet down, opening gentle communion with dragon realms." 
                      : "La estrella de 7 puntas. Dibujarla o seguir su forma con el dedo ayuda a que tu mente se relaje y sea más fácil contactar con el mundo mágico."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tus Primeras Herramientas Mágicas -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.3rem;">${isEn ? "📚 Your First Magical Grimoires" : "📚 Tus Primeras Herramientas Mágicas"}</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 4px;">
              ${isEn ? "Every apprentice must acquire or craft two very special books:" : "Todo aprendiz necesita fabricar o conseguir dos libros muy especiales:"}
            </p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "📖 1. The Dragon's Secrets" : "📖 1. Los Secretos del Dragón"}</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "A private journal where you write each day about your insights, vivid dreams, and how your daily life flourishes as you progress along the path." 
                    : "Un diario secreto donde escribirás todos los días tus pensamientos, tus sueños y cómo cambia tu vida a medida que avanzas en tus estudios mágicos."}
                </p>
              </div>

              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">📁 2. The Dragon's Hoard" : "📁 2. El Tesoro del Dragón"}</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "A binder or ledger where you store your rituals, sacred drawings, and results. Inscribe upon its first page: <em>&quot;This Book of Wisdom is written by the hand of [Your Magical Name]!&quot;</em>" 
                    : "Una carpeta con anillas donde guardarás tus rituales, hechizos y resultados. Escribí en la primera página con tus mejores colores: <em>&quot;¡Este libro de secretos está escrito por la mano de [Tu Nombre Mágico]!&quot;</em>"}
                </p>
              </div>
            </div>
          </div>

          <!-- Tu Nuevo Mejor Amigo: El Dragón Guardián -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(233,196,106,0.08); border: 1px solid var(--gold-main);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.3rem;">${isEn ? "🐉 Your Guardian Dragon: First Companion" : "🐉 Tu Nuevo Mejor Amigo: El Dragón Guardián"}</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 1rem;">
              ${isEn 
                ? "At this stage you meet your very first magical companion. Guardian dragons are the youthful scouts of their clan; some are so petite they could nestle in the palm of your hand!" 
                : "En este nivel vas a conocer a tu primer compañero mágico. Los dragones guardianes son los más jóvenes de su especie, ¡y algunos son tan pequeños que caben en la palma de tu mano!"}
            </p>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 1rem;">
              ${isEn 
                ? "They are playful, inquisitive beings who delight in warming scents like <strong>ginger</strong>, enjoy joyful music, and love watching you dance without worry. They are allies and friends—never order them around or treat them as servants, or they will depart like morning mist!" 
                : "Son criaturas súper juguetonas a las que les encantan los aromas dulces y picantes, como el del <strong>jengibre</strong>, además de disfrutar la música y verte bailar libremente. Ellos serán tus colaboradores, así que recordá la regla de oro: nunca intentes darles órdenes ni tratarlos como sirvientes, ¡o se irán!"}
            </p>
          </div>

          <!-- Misión 1: El Ritual de Contacto -->
          <div class="fantasy-panel" style="padding: 1.6rem; border: 2px solid var(--color-teal); background: rgba(42,157,143,0.1);">
            <h4 style="color: var(--color-teal); margin: 0; font-size: 1.4rem; text-align: center;">${isEn ? "📜 Quest 1: The First Contact Ritual" : "📜 Misión 1: El Ritual de Contacto"}</h4>
            <p style="text-align: center; color: var(--text-gold); font-size: 0.95rem; margin-top: 4px;">
              ${isEn ? "Follow these 6 sacred steps to invite your guardian dragon and introduce yourself with warmth:" : "Seguí estos 6 pasos para invitar a tu dragón guardián a jugar y presentarte oficialmente:"}
            </p>

            <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 1.2rem;">
              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <strong style="color: var(--gold-main);">${isEn ? "Step 1:" : "Paso 1:"}</strong> ${isEn ? "Find a quiet sanctuary in your room where you will not be disturbed, and place your blue Apprentice ribbon across your shoulders." : "Andá a un lugar tranquilo de tu cuarto donde nadie te interrumpa y colocate tu listón azul de Aprendiz sobre los hombros."}
              </div>

              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <strong style="color: var(--gold-main);">${isEn ? "Step 2:" : "Paso 2:"}</strong> ${isEn ? "Sit comfortably, close your eyes, breathe deeply to unwind, and speak aloud with sincerity:" : "Sentate cómodamente, cerrá los ojos, respirá profundo para relajarte y decí en voz alta:"}
                <p style="margin: 8px 0 0 0; font-style: italic; color: var(--text-gold); background: rgba(233,196,106,0.1); padding: 10px; border-radius: 8px;">
                  ${isEn 
                    ? "&quot;I rest secure within the circle of the Dragon Apprentice. In this sanctuary, I invite and call my guardian dragon to dwell beside me. I offer you loyal and heartfelt friendship.&quot;" 
                    : "&quot;Estoy a salvo en el poderoso anillo del Dragón Aprendiz. Mientras me siento en este espacio, invito y llamo a mi dragón guardián para que esté aquí conmigo. Te ofrezco una amistad leal y cálida.&quot;"}
                </p>
              </div>

              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <strong style="color: var(--gold-main);">${isEn ? "Step 3:" : "Paso 3:"}</strong> ${isEn ? "Allow your thoughts to drift without tense expectation. Soon, you may sense a faint breeze on your neck, a subtle tingle on your skin, or an unmistakable certainty that you are no longer alone." : "Dejá que tus pensamientos vuelen sin esperar nada en particular. En poco tiempo, es posible que sientas una ligera brisa en el cuello, un leve roce en tu piel, o simplemente una sensación muy fuerte de que ya no estás solo en tu cuarto."}
              </div>

              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <strong style="color: var(--gold-main);">${isEn ? "Step 4:" : "Paso 4:"}</strong> ${isEn ? "Dragons often perch quietly behind you—do not expect them to hover before physical eyes. Instead, look through your imagination: you might glimpse iridescent scales, a twitching tail, or a warm luminous eye." : "A los dragones les gusta pararse detrás de vos, así que no esperes verlos flotando frente a tus ojos físicos. En cambio, míralo a través de tu imaginación con los ojos cerrados: puede que veas un destello de su cuerpo o un gran ojo amigable mirándote."}
              </div>

              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <strong style="color: var(--gold-main);">${isEn ? "Step 5:" : "Paso 5:"}</strong> ${isEn ? "Send a wave of mental friendship. In return, your dragon will surround you with reassuring warmth, like a gentle invisible hug. From this moment forth, you are companions." : "Envíale mentalmente un gran saludo de amistad. A cambio, tu dragón guardián te rodeará con un sentimiento muy cálido, ¡como si te diera un gran abrazo invisible! Desde ese momento serán inseparables."}
              </div>

              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <strong style="color: var(--gold-main);">${isEn ? "Step 6:" : "Paso 6:"}</strong> ${isEn ? "Open your eyes gently, rest the palms of your hands upon the floor to ground any surplus energy, and thank your dragon friend for answering the call." : "Abrí los ojos lentamente, poné las palmas de tus manos en el suelo para soltar la energía sobrante y dale las gracias a tu nuevo compañero mágico por haber venido."}
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
              <h3 style="color: var(--gold-main); margin: 0; font-size: 1.7rem;">${isEn ? "Level 2: The Dragon Enchanter" : "Nivel 2: El Encantador de Dragones"}</h3>
              <p style="color: var(--text-gold); font-style: italic; margin: 4px 0 0 0; font-size: 1.05rem;">
                ${isEn 
                  ? "&quot;Congratulations on reaching the Second Ring! It is time to learn the ancient craft of spells, nature potions, and magical amulets.&quot;" 
                  : "&quot;¡Felicidades por avanzar al Segundo Anillo! Es hora de aprender el antiguo arte de los hechizos, las pociones de la naturaleza y los amuletos mágicos.&quot;"}
              </p>
            </div>
          </div>

          <!-- Código y Símbolos del Encantador -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0 0 10px 0; font-size: 1.3rem;">${isEn ? "🌿 The Enchanter's Code & Symbols" : "🌿 Tu Código y Símbolos de Encantador"}</h4>
            
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(233,196,106,0.08); padding: 1rem; border-radius: 10px; border-left: 4px solid var(--gold-main);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "📜 Your Magical Motto:" : "📜 Tu Lema Mágico:"}</h5>
                <p style="margin-top: 4px; font-style: italic; color: var(--text-gold); font-size: 1rem; font-weight: 600;">
                  ${isEn ? "&quot;Magic is both an art and a science. Always treat it with reverence.&quot;" : "&quot;La magia es tanto un arte como una ciencia. Trátala siempre con respeto.&quot;"}
                </p>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "As an Enchanter, you will learn to work with gifts of nature. Remember the supreme law: magic is invoked to aid, heal, and elevate—never to manipulate or control others. Dragons abhor tyrants and will never lend aid to anyone seeking dominion." 
                    : "Como Encantador, aprenderás a usar ingredientes de la naturaleza, pero recuerda la regla más grande: la magia se usa para ayudar, sanar y mejorar, ¡nunca para tratar de controlar a otras personas! A los dragones no les gustan los tiranos y no ayudarán a quien intente ser uno."}
                </p>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
                <div style="background: rgba(42,157,143,0.1); padding: 1rem; border-radius: 10px; border: 1px solid var(--color-teal);">
                  <h5 style="color: var(--color-teal); margin: 0; font-size: 1.1rem;">${isEn ? "🟩 Your Color: Radiant Green" : "🟩 Tu Color: El Verde Brillante"}</h5>
                  <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                    ${isEn 
                      ? "Symbolizes the vigorous growth of living nature, prosperity, and radiant intent. Wear a bright green ribbon across your shoulders during your magical crafts." 
                      : "Representa el crecimiento de la naturaleza, la prosperidad y la magia positiva. Conseguí un listón verde y ponértelo en los hombros cada vez que vayas a trabajar en tus proyectos mágicos."}
                  </p>
                </div>

                <div style="background: rgba(200,85,61,0.1); padding: 1rem; border-radius: 10px; border: 1px solid var(--color-rust);">
                  <h5 style="color: var(--color-rust); margin: 0; font-size: 1.1rem;">${isEn ? "🔺 Your Symbol: The Upward Triangle" : "🔺 Tu Símbolo: El Triángulo Ascendente"}</h5>
                  <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                    ${isEn 
                      ? "The triangle pointing toward the heavens. Inscribe it in your book of secrets to focus the elemental warmth of fire and conscious will." 
                      : "El triángulo apuntando hacia arriba. Podés dibujarlo en tu cuaderno de secretos para enfocar la fuerza del fuego y la mente."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tu Laboratorio Mágico: Nuevas Herramientas -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.3rem;">${isEn ? "🧪 Your Magical Workshop: Crafting Tools" : "🧪 Tu Laboratorio Mágico: Nuevas Herramientas"}</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 4px;">
              ${isEn ? "To practice the art of an Enchanter, assemble your sacred toolkit:" : "Para hacer la magia de un Encantador, necesitarás reunir tu propio equipo de laboratorio:"}
            </p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "✨ The Magic Wand" : "✨ La Varita Mágica"}</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "Your primary focus for projecting benevolent energy. Find a fallen branch worn by nature, or craft a smooth dowel adorned with a quartz crystal tip." 
                    : "Tu herramienta principal para dirigir buena energía. Podés buscar en el parque una rama caída que te guste, o usar un tubo transparente con piedritas de colores y un cristal de cuarzo en la punta."}
                </p>
              </div>

              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "🥣 Mortar & Glass Vials" : "🥣 El Mortero y Frasquitos"}</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "A small grinding bowl and clean glass jars with lids. Here you will carefully grind and preserve aromatic herbs and floral blossoms." 
                    : "Un mortero pequeño (un tazón grueso para machacar) y varios frasquitos vacíos limpios con tapa. Aquí guardarás y molerás tus hierbas mágicas."}
                </p>
              </div>

              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "🧵 Colorful Fabrics" : "🧵 Telas de Colores"}</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "Collect remnants of green, white, and red cotton fabric with ribbons to sew miniature charm bags and mojo pouches." 
                    : "Reuní pedacitos de tela (verde, blanca, roja) e hilos de colores. Te servirán para confeccionar pequeñas bolsitas mágicas."}
                </p>
              </div>
            </div>
          </div>

          <!-- Misión 1: Amuletos y Talismanes de Poder -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(233,196,106,0.08); border: 1px solid var(--gold-main);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.3rem;">${isEn ? "✨ Quest 1: Amulets and Talismans of Might" : "✨ Misión 1: Amuletos y Talismanes de Poder"}</h4>
            <p style="margin-top: 6px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              ${isEn 
                ? "Did you know they are not the same? Understanding the difference will help you craft true tools of good fortune:" 
                : "¿Sabías que no son lo mismo? Conocer la diferencia te ayudará a crear tus propias herramientas de buena suerte:"}
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.05rem;">${isEn ? "🪨 Amulets (Gifts of Nature):" : "🪨 Los Amuletos (Naturaleza):"}</h5>
                <p style="margin-top: 6px; font-size: 0.9rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "Tokens shaped by nature itself: an intriguing river stone, a spiraled seashell, or an acorn (which shields you and imparts endurance). Simply discover and carry them." 
                    : "Son regalitos creados por la naturaleza, como una piedra con forma curiosa, una concha de mar o una bellota (que te protege y te da fuerza). Solo tenés que encontrarlos y llevarlos con vos."}
                </p>
              </div>
              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.05rem;">${isEn ? "🎨 Talismans (Handcrafted Creations):" : "🎨 Los Talismanes (Creación Propia):"}</h5>
                <p style="margin-top: 6px; font-size: 0.9rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "Objects you fashion with your own hands. Craft a clay disc, inscribe your monogram or a dragon rune upon it, and hold it whenever you need courage!" 
                    : "Son objetos creados por vos. Podés hacer una pequeña moneda de arcilla, dibujarle tu inicial o un símbolo de dragón con marcador mágico, ¡y usarla para llenarte de valentía!"}
                </p>
              </div>
            </div>
          </div>

          <!-- Misión 2: Polvo de "Amistad de Dragón" -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--color-teal); background: rgba(42,157,143,0.1);">
            <h4 style="color: var(--color-teal); margin: 0; font-size: 1.4rem;">${isEn ? "🌸 Quest 2: Dragon Friendship Dust" : "🌸 Misión 2: Polvo de &quot;Amistad de Dragón&quot;"}</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              ${isEn 
                ? "Learn to blend pure, gentle ritual powders using unscented talcum or baking soda as your base. In your mortar, gently blend it with dried fragrant rose petals or dried herbs." 
                : "Aprendé a hacer polvos mágicos inofensivos usando una base de talco sin aroma o bicarbonato. En tu tazón, mezclá el polvo con hojas secas de flores que huelan muy rico (como pétalos de rosa)."}
            </p>
            <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; margin-top: 10px;">
              <strong style="color: var(--gold-main);">${isEn ? "Blending Chanted Verse:" : "Conjuro de Mezcla:"}</strong>
              <p style="margin: 6px 0 0 0; font-style: italic; color: var(--text-gold); font-size: 0.95rem;">
                ${isEn 
                  ? "&quot;Dragons near and dragons far, join with me beneath each star. A happy heart I share with thee, when we meet and when we part in glee.&quot;" 
                  : "&quot;Llamo a los dragones, cerca y lejos, para que se unan a mí dondequiera que estén. Compartiré con ustedes un corazón feliz, cuando nos encontremos y cuando nos despidamos.&quot;"}
              </p>
            </div>
            <p style="margin-top: 10px; font-size: 0.9rem; color: var(--text-muted);">
              ${isEn 
                ? "Keep it in a small vial, and sprinkle a pinch near your altar space whenever you wish to invite young guardian dragons to play." 
                : "Guárdalo en tu frasco, y espolvoreá un poquito en tu cuarto cuando quieras invitar a los pequeños dragones guardianes a que te hagan compañía."}
            </p>
          </div>

          <!-- Misión 3: Pociones de "Agua de la Naturaleza" -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--color-rust); background: rgba(200,85,61,0.1);">
            <h4 style="color: var(--color-rust); margin: 0; font-size: 1.4rem;">${isEn ? "💧 Quest 3: Potions of Living Nature Water" : "💧 Misión 3: Pociones de &quot;Agua de la Naturaleza&quot;"}</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              ${isEn 
                ? "Enchanters brew subtle infusions known as &quot;fluid condensers&quot; that absorb elemental vitality. With an adult's guidance, warm clean spring water and infuse it with fresh garden mint, lavender, or rose petals. Strain when cool and store in a glass flacon." 
                : "Los Encantadores preparan pociones de agua llamadas &quot;condensadores de fluidos&quot;, que sirven para atrapar la energía de los elementos. Pedile a un adulto que te ayude a calentar un poquito de agua pura y agrégale hojas frescas de tu jardín (como menta, rosas o lavanda). Déjala enfriar por completo, cuélala y guárdala en una botellita."}
            </p>
            <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; margin-top: 10px;">
              <strong style="color: var(--gold-main);">${isEn ? "Blessing Incantation:" : "Encantamiento de Cierre:"}</strong>
              <p style="margin: 6px 0 0 0; font-style: italic; color: var(--text-gold); font-size: 0.95rem;">
                ${isEn 
                  ? "&quot;Dragons of water, subtle and bold, bless this bottle that I hold. I trust your wisdom and your might, aiding my craft this sacred night.&quot;" 
                  : "&quot;Dragones de agua, sutiles pero audaces, energicen esta botella que sostengo. Confío en su sabiduría y en su poder, que me ayuda a hacer magia en esta hora.&quot;"}
              </p>
            </div>
            <p style="margin-top: 10px; font-size: 0.9rem; color: var(--text-muted);">
              ${isEn 
                ? "Dab a few drops of this herbal elixir onto your talismans to consecrate them with clear, uplifting energy." 
                : "Podés poner unas gotitas de esta agua mágica en tus amuletos para recargarlos de energía limpia y positiva."}
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
              <h3 style="color: var(--gold-main); margin: 0; font-size: 1.7rem;">${isEn ? "Level 3: The Dragon Shaman (Energy Healer)" : "Nivel 3: El Chamán de Dragones (Sanador de Energía)"}</h3>
              <p style="color: var(--text-gold); font-style: italic; margin: 4px 0 0 0; font-size: 1.05rem;">
                ${isEn 
                  ? "&quot;Splendid! You have attained the Third Ring. You step beyond simple charms to walk deeply with the spirit realm as a Walker Between Worlds.&quot;" 
                  : "&quot;¡Increíble! Has llegado al Tercer Anillo. Dejarás de ser un aprendiz para trabajar profundamente con el mundo espiritual y convertirte en un 'Caminante entre Mundos'.&quot;"}
              </p>
            </div>
          </div>

          <p style="line-height: 1.6; color: var(--text-main); font-size: 1.05rem;">
            ${isEn 
              ? "Shamans work alongside dragons to soothe emotional distress, heal energetic fatigue, and preserve the subtle balance of the living earth." 
              : "Los chamanes trabajan junto a los dragones para sanar la energía, calmar las emociones y mantener el equilibrio invisible de las cosas."}
          </p>

          <!-- Código y Símbolos de Chamán -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0 0 10px 0; font-size: 1.3rem;">${isEn ? "✨ The Shaman's Code & Symbols" : "✨ Tu Código y Símbolos de Chamán"}</h4>
            
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(233,196,106,0.08); padding: 1rem; border-radius: 10px; border-left: 4px solid var(--gold-main);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "📜 Your Magical Motto:" : "📜 Tu Lema Mágico:"}</h5>
                <p style="margin-top: 4px; font-style: italic; color: var(--text-gold); font-size: 1rem; font-weight: 600;">
                  ${isEn ? "&quot;To benefit all, I journey and learn throughout the Multiverse. I am a Walker Between Worlds.&quot;" : "&quot;Para beneficiar a todos, debo viajar y aprender en el Multiverso. Soy un Caminante entre Mundos.&quot;"}
                </p>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
                <div style="background: rgba(200,85,61,0.15); padding: 1rem; border-radius: 10px; border: 1px solid var(--color-rust);">
                  <h5 style="color: var(--color-rust); margin: 0; font-size: 1.1rem;">${isEn ? "🔴 Your Color: Radiant Crimson" : "🔴 Tu Color: El Rojo Brillante"}</h5>
                  <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                    ${isEn 
                      ? "Embodying action, vital vitality, and the potent current of healing. Adorn your shoulders with a scarlet ribbon when doing healing work." 
                      : "Este color representa la acción, el esfuerzo y el gran poder para sanar. Conseguí un listón rojo para ponerlo en tus hombros en tus prácticas."}
                  </p>
                </div>

                <div style="background: rgba(42,157,143,0.15); padding: 1rem; border-radius: 10px; border: 1px solid var(--color-teal);">
                  <h5 style="color: var(--color-teal); margin: 0; font-size: 1.1rem;">${isEn ? "🍃 Your Symbol: Leaf of the World Tree" : "🍃 Tu Símbolo: La Hoja Verde del Árbol del Mundo"}</h5>
                  <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                    ${isEn 
                      ? "A vibrant leaf representing Yggdrasil and universal renewal. Wear a leaf pin or sketch it upon your diary as your badge of initiation." 
                      : "Una hoja verde que representa el Árbol del Mundo y la naturaleza. Podés dibujarla o buscar un prendedor con esta forma para usarlo como tu medalla."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tus Herramientas de Sanación -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.3rem;">${isEn ? "💎 Your Healing Mineral Allies" : "💎 Tus Herramientas de Sanación"}</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 4px;">
              ${isEn ? "A Shaman employs two complementary stones to balance living energy:" : "Un Chamán necesita piedras muy especiales (que podés buscar en el parque o en un río) para ayudar a los demás:"}
            </p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "🖤 The Absorbing Stone" : "🖤 La Piedra &quot;Aspiradora&quot;"}</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "A smooth black stone (such as obsidian, onyx, or river jet). Operates like an astral vacuum to draw away tension, grumpy moods, and heavy stagnant vibrations." 
                    : "Una piedra negra y de superficie suave (como el ónix o la obsidiana). Sirve como una aspiradora mágica para absorber y limpiar el mal humor, el estrés o la energía negativa del ambiente."}
                </p>
              </div>

              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "🤍 The Sealing Quartz" : "🤍 El Cristal Sellador"}</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "A white or clear quartz crystal applied right after the black stone to seal the cleansed aura with sparkling light and golden protection." 
                    : "Una piedra blanca (como el cuarzo nevado) que se usa inmediatamente después de la piedra negra, para 'sellar' y rellenar de luz y buena energía el espacio que limpiaste."}
                </p>
              </div>
            </div>
          </div>

          <!-- Misión 1: Sentir el Aura -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--color-teal); background: rgba(42,157,143,0.1);">
            <h4 style="color: var(--color-teal); margin: 0; font-size: 1.4rem;">${isEn ? "🖐️ Quest 1: Sensing the Aura (Your Invisible Field)" : "🖐️ Misión 1: Sentir el Aura (Tu Campo de Fuerza Invisible)"}</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              ${isEn 
                ? "Every person, animal, and living tree is enveloped by a luminous biometric field known as the <strong>Aura</strong>. Some perceive it as radiant colors, others as soft white radiance, and others simply feel its temperature and texture." 
                : "¿Sabías que todas las personas, animales e incluso las cosas están rodeados por un campo electromagnético invisible llamado <strong>Aura</strong>? Algunos magos la ven como luces de colores, otros como luz blanca, y otros simplemente la 'sienten'."}
            </p>
            <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; margin-top: 10px;">
              <strong style="color: var(--gold-main);">${isEn ? "How to Practice:" : "Cómo practicar:"}</strong>
              <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                ${isEn 
                  ? "Ask a trusted family member or friend to sit relaxed. With peaceful breathing, slowly sweep your open palms through the air roughly 15 cm from their shoulders, without physical touch. With patience, you will notice warmth, cool patches, or gentle tingling. Shamans use this skill to perceive where comforting energy is needed!" 
                  : "Pídele a un amigo o familiar que se siente tranquilo. Relajá tu mente y mové tus manos muy despacio en el aire, a unos 15 centímetros de su cuerpo, sin tocarlo en ningún momento. Con práctica, empezarás a 'sentir' el aura: podés notar lugares que se sienten más fríos, más calientes, o un leve cosquilleo. ¡Los chamanes usan este ejercicio para descubrir dónde necesita una persona un abrazo de energía mágica!"}
              </p>
            </div>
          </div>

          <!-- Misión 3: El Sonido que Cura -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--color-rust); background: rgba(200,85,61,0.1);">
            <h4 style="color: var(--color-rust); margin: 0; font-size: 1.4rem;">${isEn ? "🎵 Quest 2: The Healing Dragon Resonance" : "🎵 Misión 2: El Sonido que Cura"}</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              ${isEn 
                ? "Shamans discovered that the vibration of sound and voice acts as a direct balm for troubled spirits." 
                : "Los chamanes descubrieron que la vibración de la voz es una gran herramienta de sanación."}
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-top: 10px;">
              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <strong style="color: var(--color-teal);">${isEn ? "🌬️ Tone &quot;AAHH&quot; (Soothing Relaxation):" : "🌬️ Sonido &quot;AAHH&quot; (Relajación):"}</strong>
                <p style="margin-top: 4px; font-size: 0.9rem; color: var(--text-main);">
                  ${isEn 
                    ? "When feeling weary or upset, gently intone a sustained, soft <em>&quot;aahh&quot;</em> sound. It dissolves worry and unties mental knots." 
                    : "Si tú o alguien de tu familia se siente cansado, cantá en voz alta y suavemente el sonido <em>&quot;aahh&quot;</em>, que ayuda a sanar y relajar la mente y el cuerpo."}
                </p>
              </div>
              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <strong style="color: var(--gold-main);">${isEn ? "⚡ Tone &quot;EEEE&quot; (Vital Awakening):" : "⚡ Sonido &quot;EEEE&quot; (Energización):"}</strong>
                <p style="margin-top: 4px; font-size: 0.9rem; color: var(--text-main);">
                  ${isEn 
                    ? "When you need to awaken resolve and banish sluggishness, softly hum the crisp <em>&quot;eeee&quot;</em> sound while holding your healing stones." 
                    : "Si lo que necesitan es despertar y llenarse de energía positiva, el sonido mágico es <em>&quot;eeee&quot;</em>. ¡Pruébalo mientras sostienes tus piedras curativas en las manos!"}
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
              <h3 style="color: var(--gold-main); margin: 0; font-size: 1.7rem;">${isEn ? "Level 4: The Dragon Warrior (Valiant Guardian)" : "Nivel 4: El Guerrero Dragón (El Protector Valiente)"}</h3>
              <p style="color: var(--text-gold); font-style: italic; margin: 4px 0 0 0; font-size: 1.05rem;">
                ${isEn 
                  ? "&quot;Welcome to the Fourth Ring! A Dragon Warrior never raises fists! A warrior uses luminous confidence, energetic shields, and keen wit to triumph over discord.&quot;" 
                  : "&quot;¡Bienvenido al Cuarto Anillo! ¡Un Guerrero Dragón no usa los puños! Usa su súper confianza, escudos de energía e inteligencia para triunfar sobre cualquier problema.&quot;"}
              </p>
            </div>
          </div>

          <!-- Código y Símbolos de Guerrero -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0 0 10px 0; font-size: 1.3rem;">${isEn ? "✨ The Warrior's Code & Symbols" : "✨ Tu Código y Símbolos de Guerrero"}</h4>
            
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(233,196,106,0.08); padding: 1rem; border-radius: 10px; border-left: 4px solid var(--gold-main);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "📜 Your Magical Motto:" : "📜 Tu Lema Mágico:"}</h5>
                <p style="margin-top: 4px; font-style: italic; color: var(--text-gold); font-size: 1rem; font-weight: 600;">
                  ${isEn 
                    ? "&quot;I stand for truth, protect my inner spark, and seek no quarreling where none exists. Common sense is my armor!&quot;" 
                    : "&quot;Defiendo la verdad, protejo mi energía y nunca busco problemas donde no los hay. ¡Uso mi sentido común!&quot;"}
                </p>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "The true power of a warrior lies in knowing when to step aside with dignity and preserve unshakable peace." 
                    : "El verdadero poder de un guerrero es saber cuándo alejarse de una pelea y mantenerse tranquilo."}
                </p>
              </div>

              <div style="background: rgba(233,196,106,0.12); padding: 1rem; border-radius: 10px; border: 1px solid var(--gold-main);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "🟡 Your Color: Brilliant Gold or Solar Amber" : "🟡 Tu Color: El Dorado o Amarillo Brillante"}</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "The radiance of strength and unbreachable psychic safety. Wear a golden ribbon during your courage rituals." 
                    : "El color de la fuerza y la protección invencible. Podés conseguir un listón de este color para usarlo en tus meditaciones de fortaleza."}
                </p>
              </div>
            </div>
          </div>

          <!-- Tus Herramientas de Defensa -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.3rem;">${isEn ? "🛡️ Your Shields of Defense" : "🛡️ Tus Herramientas de Defensa"}</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 4px;">
              ${isEn ? "A Dragon Warrior relies on two steadfast emotional shields:" : "Un Guerrero Dragón cuenta con dos poderosos escudos emocionales:"}
            </p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "🔮 1. The Mirror of Deflection" : "🔮 1. El Espejo Brillante"}</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "A pocket mirror used to deflect harsh energy or mean remarks back into the universe without harboring bitterness." 
                    : "Un espejo pequeño que usarás para 'rebotar' las malas energías o las palabras feas sin guardarte rencor."}
                </p>
              </div>

              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "🌿 2. The Staff of Balance" : "🌿 2. El Bastón de Equilibrio"}</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "A sturdy wooden staff that steadies your heart and reminds you to stand rooted whenever challenges arise." 
                    : "Una vara larga de madera (puedes buscar una rama firme en el parque). Sirve para mantener tu equilibrio emocional cuando sientes que te vas a caer o a rendir."}
                </p>
              </div>
            </div>
          </div>

          <!-- Misión 1: El Hechizo del "Espejo Rebotador" -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--gold-main); background: rgba(233,196,106,0.08);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.4rem;">${isEn ? "🔮 Quest 1: The Mirror Deflection Ward" : "🔮 Misión 1: El Hechizo del &quot;Espejo Rebotador&quot;"}</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              ${isEn 
                ? "Sometimes at school or on the street, you may encounter grumpy spirits or unkind words. Never let them stick to your heart!" 
                : "A veces, en la escuela o en la calle, te puedes encontrar con personas que están de muy mal humor o que dicen cosas hirientes (a esto le llamamos 'energía dañina'). ¡No dejes que se pegue a vos!"}
            </p>
            <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; margin-top: 10px;">
              <strong style="color: var(--gold-main);">${isEn ? "Your Warrior Practice:" : "Tu tarea de Guerrero:"}</strong>
              <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                ${isEn 
                  ? "Hold your mirror facing outward toward the world. Envision your guardian dragon gazing through the glass with benevolent fire, and chant:" 
                  : "Toma tu Espejo Brillante y sostenlo frente a vos con la parte que refleja apuntando hacia afuera (hacia el mundo). Imagina que tu dragón guardián está proyectando su imagen en ese espejo para protegerte. Luego, repite este conjuro especial:"}
              </p>
              <p style="margin: 8px 0 0 0; font-style: italic; color: var(--text-gold); background: rgba(233,196,106,0.1); padding: 10px; border-radius: 8px;">
                ${isEn 
                  ? "&quot;In this mirror bright and clear, dragon courage leaves no fear. Safe and peaceful I remain, return discordant thoughts again!&quot;" 
                  : "&quot;En este espejo brillante y protector, un gran dragón refleja su valor. Me quedo aquí seguro y sin temor, ¡que la mala energía se aleje a su creador!&quot;"}
              </p>
              <p style="margin-top: 8px; font-size: 0.9rem; color: var(--text-muted);">
                ${isEn 
                  ? "Afterward, rinse the mirror under cool water to wash away whatever heavy feelings were neutralized." 
                  : "Después, lava tu espejo con un poco de agua para limpiarlo de cualquier mala vibra que haya atrapado."}
              </p>
            </div>
          </div>

          <!-- Misión 2: Caminar con la Confianza del Dragón -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--color-teal); background: rgba(42,157,143,0.1);">
            <h4 style="color: var(--color-teal); margin: 0; font-size: 1.4rem;">${isEn ? "🐉 Quest 2: Walking with Dragon Confidence" : "🐉 Misión 2: Caminar con la Confianza del Dragón"}</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              ${isEn 
                ? "The greatest secret of Dragon Warriors is their unshakeable inner self-trust, enabling them to meet every challenge with grace." 
                : "El secreto más grande de los Guerreros Dragón es que desarrollan una confianza en sí mismos tan gigante que los ayuda a superar cualquier cosa."}
            </p>
            <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; margin-top: 10px;">
              <strong style="color: var(--color-teal);">${isEn ? "Your Attitude Quest:" : "Tu tarea de Actitud:"}</strong>
              <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                ${isEn 
                  ? "Whenever nervous before a speech or test, grip your Staff of Balance. Stand tall, inhale deeply, and picture majestic dragon wings unfurling behind your shoulders. Walk with calm majesty. Every obstacle shrinks before such courage!" 
                  : "La próxima vez que te sientas nervioso (antes de un examen o de hablar en público), toma tu Bastón de Equilibrio con fuerza. Párate muy derecho, respira hondo e imagina que unas enormes alas de dragón se abren a tus espaldas. Camina sintiendo que eres invencible. ¡Esa actitud hará que cualquier obstáculo parezca diminuto!"}
              </p>
            </div>
          </div>

          <!-- Misión 3: La Regla del "No-Problema" -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--color-rust); background: rgba(200,85,61,0.1);">
            <h4 style="color: var(--color-rust); margin: 0; font-size: 1.4rem;">${isEn ? "📜 Quest 3: The Golden Rule of Non-Conflict" : "📜 Misión 3: La Regla del &quot;No-Problema&quot;"}</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              ${isEn 
                ? "To be a warrior means bearing great capability, and true capability demands wise restraint." 
                : "Ser un guerrero significa tener mucho poder, y tener poder significa ser muy responsable."}
            </p>
            <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; margin-top: 10px;">
              <strong style="color: var(--color-rust);">${isEn ? "Ring Pledge:" : "Promesa del Anillo:"}</strong>
              <p style="margin-top: 6px; font-style: italic; color: var(--text-gold); font-size: 1rem;">
                ${isEn ? "&quot;Do not breed trouble where none exists.&quot;" : "&quot;No hagas problemas donde no los hay.&quot;"}
              </p>
              <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                ${isEn 
                  ? "If a pointless argument begins, be the wisest person in the room and walk away. A true warrior maintains an open heart but guards their peace!" 
                  : "Si ves que una discusión está a punto de empezar, sé el más inteligente de la habitación y aléjate. Un guerrero siempre tiene la mente abierta, ¡pero usa su sentido común para mantenerse a salvo!"}
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
              <h3 style="color: var(--gold-main); margin: 0; font-size: 1.7rem;">${isEn ? "Level 5: The Mystic Dragon (Master of the Cosmic Web)" : "Nivel 5: El Místico Dragón (Maestro de la Red de la Vida)"}</h3>
              <p style="color: var(--text-gold); font-style: italic; margin: 4px 0 0 0; font-size: 1.05rem;">
                ${isEn 
                  ? "&quot;Congratulations, noble wizard! You have arrived at the Fifth Ring, the highest pinnacle. You stand as a guardian of nature and the cosmos.&quot;" 
                  : "&quot;¡Felicidades, joven mago! Has llegado al Quinto Anillo, el último y más alto nivel. Te conviertes en un guardián de la naturaleza y del universo.&quot;"}
              </p>
            </div>
          </div>

          <!-- Código y Símbolos de Místico -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0 0 10px 0; font-size: 1.3rem;">${isEn ? "✨ The Mystic's Code & Symbols" : "✨ Tu Código y Símbolos de Místico"}</h4>
            
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(138,43,226,0.1); padding: 1rem; border-radius: 10px; border-left: 4px solid #8a2be2;">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "📜 Your Magical Motto:" : "📜 Tu Lema Mágico:"}</h5>
                <p style="margin-top: 4px; font-style: italic; color: var(--text-gold); font-size: 1rem; font-weight: 600;">
                  ${isEn 
                    ? "&quot;We are all strands in the Web of Life. All things, animate and inanimate, are woven as one.&quot;" 
                    : "&quot;Todos somos parte de la Red de la Vida. Todas las cosas, animadas e inanimadas, están conectadas.&quot;"}
                </p>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "Every word, intention, and deed is like a pebble dropped into clear water: ripples travel onward and touch all living beings around you!" 
                    : "Esto significa que todo lo que haces, dices o piensas es como lanzar una piedrita en un estanque: ¡crea ondas que viajan y tocan todo a tu alrededor!"}
                </p>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
                <div style="background: rgba(138,43,226,0.15); padding: 1rem; border-radius: 10px; border: 1px solid #8a2be2;">
                  <h5 style="color: #b19ffb; margin: 0; font-size: 1.1rem;">${isEn ? "🟣 Your Color: Royal Violet or Starlit Silver" : "🟣 Tu Color: El Violeta o Gris Plateado"}</h5>
                  <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                    ${isEn 
                      ? "The hues of celestial nebulas, starlight, and boundless wisdom. Wear this ribbon with honor at your graduation." 
                      : "Los colores del universo, de las estrellas y de la magia más profunda. Conseguí un listón de este color para celebrar tu gran graduación."}
                  </p>
                </div>

                <div style="background: rgba(233,196,106,0.1); padding: 1rem; border-radius: 10px; border: 1px solid var(--gold-main);">
                  <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "🌠 Your Symbol: The Shooting Star" : "🌠 Tu Símbolo: La Estrella Fugaz"}</h5>
                  <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                    ${isEn 
                      ? "The nine-pointed star or shooting comet, embodying an eternal pilgrimage of discovery, wonder, and illumination." 
                      : "La estrella fugaz (o estrella de 9 puntas). Representa un viaje lleno de sorpresas maravillosas, sabiduría e iluminación."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- El Secreto Supremo: El Elemento Tormenta -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3); border: 1px solid var(--color-teal);">
            <h4 style="color: var(--color-teal); margin: 0; font-size: 1.3rem;">${isEn ? "⚡ The Supreme Mystery: The Storm Element" : "⚡ El Secreto Supremo: El Elemento Tormenta"}</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              ${isEn 
                ? "While earlier stages work with Air, Fire, Water, and Earth, the Mystic embraces the mysterious <strong>Storm Element</strong>. Storms bring profound renewal, and a Mystic welcomes change as the wind beneath dragon wings!" 
                : "Mientras que otros niveles trabajan con el Aire, Fuego, Agua y Tierra, el Místico trabaja con el misterioso <strong>elemento de la Tormenta</strong>. Las tormentas traen cambios, y un Místico sabe que cambiar y crecer es parte de la vida. ¡Un Místico no le teme a los cambios, los usa para volar más alto!"}
            </p>
          </div>

          <!-- Misión 1: Sentir la "Red de la Vida" -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid #8a2be2; background: rgba(138,43,226,0.1);">
            <h4 style="color: #b19ffb; margin: 0; font-size: 1.4rem;">${isEn ? "🌱 Quest 1: Feeling the Web of Life" : "🌱 Misión 1: Sentir la &quot;Red de la Vida&quot;"}</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              ${isEn 
                ? "Step out into a garden, park, or stand before your favorite houseplant for this communion." 
                : "Para esta misión, sal a un parque, a tu jardín o siéntate junto a tu planta favorita."}
            </p>
            <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; margin-top: 10px;">
              <strong style="color: var(--gold-main);">${isEn ? "Your Connection Practice:" : "Tu tarea de Conexión:"}</strong>
              <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                ${isEn 
                  ? "Touch tree bark or fresh leaves gently. Close your eyes and visualize a thread of luminous light flowing from your heart to the tree. Trace that thread as it reaches flying birds, clouds, loved ones, and distant constellations. Feel the embrace of the whole living cosmos. You are never alone—you are part of everything!" 
                  : "Toca suavemente la corteza de un árbol o las hojas de una planta. Cierra los ojos e imagina que un hilo de luz brillante y muy delgadito sale de tu corazón y se conecta con el árbol. Luego, imagina que ese hilo se conecta con los pajaritos, con las nubes, con tu familia y con las estrellas. Siente cómo la energía de todo el universo te abraza. ¡Nunca estás solo, porque estás conectado con todo lo que existe!"}
              </p>
            </div>
          </div>

          <!-- Misión 2: Despertar tu "Corazón de Dragón Oculto" -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--gold-main); background: rgba(233,196,106,0.08);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.4rem;">${isEn ? "💖 Quest 2: Awakening Your Hidden Dragon Heart" : "💖 Misión 2: Despertar tu &quot;Corazón de Dragón Oculto&quot;"}</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              ${isEn 
                ? "Ancient dragon masters teach that deep within your consciousness rests an invaluable treasure: your <strong>Hidden Dragon Heart</strong>." 
                : "Los maestros draconianos enseñan que muy en el fondo de tu mente (justo detrás de tus ojos) se esconde un tesoro invaluable: tu <strong>Corazón de Dragón Oculto</strong>."}
            </p>
            <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; margin-top: 10px;">
              <strong style="color: var(--gold-main);">${isEn ? "Your Illumination Quest:" : "Tu tarea de Iluminación:"}</strong>
              <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                ${isEn 
                  ? "Sit quietly, breathe deeply, and picture a small radiant violet sun glowing behind your eyes. That is your Dragon Heart—the seat of calm, bravery, and insight. Whenever faced with uncertainty or sadness, close your eyes and commune with this radiant spark. It will show you the noble path!" 
                  : "Siéntate en silencio, respira profundo y visualiza que dentro de tu cabeza hay un pequeño sol brillante de color violeta. Ese es tu Corazón de Dragón. Es el lugar donde guardas toda tu valentía, tu paz y tu inteligencia. Cuando te sientas triste, asustado o no sepas qué hacer, solo cierra los ojos, respira y conéctate con esta luz. ¡Te dará la respuesta correcta!"}
              </p>
            </div>
          </div>

          <!-- Misión 3: El Gran Viaje (Tu Graduación) -->
          <div class="fantasy-panel text-center" style="padding: 1.8rem; border: 2px solid var(--gold-main); background: linear-gradient(135deg, rgba(233,196,106,0.15), rgba(138,43,226,0.2)); border-radius: 18px;">
            <div style="font-size: 3rem;">🎓</div>
            <h4 style="color: var(--gold-main); margin: 6px 0 0 0; font-size: 1.6rem;">${isEn ? "🎓 Quest 3: The Grand Journey (Your Graduation)" : "🎓 Misión 3: El Gran Viaje (Tu Graduación)"}</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 1rem; max-width: 700px; margin: 8px auto 0 auto;">
              ${isEn 
                ? "The quest of a Mystic Dragon never truly ends, for there are ever new wonders to explore and understand in the boundless universe." 
                : "El viaje de un Místico nunca termina realmente, porque siempre hay cosas nuevas y emocionantes por descubrir y aprender en el universo."}
            </p>
            <div style="background: rgba(0,0,0,0.5); padding: 1.2rem; border-radius: 12px; margin-top: 1.2rem; text-align: left;">
              <strong style="color: var(--gold-main);">${isEn ? "Your Graduation Oath:" : "Tu Juramento de Graduación:"}</strong>
              <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                ${isEn 
                  ? "Open your Dragon Secrets Journal and draw a grand shooting star upon the final leaf. Inscribe beneath:" 
                  : "Toma tu 'Diario de Secretos del Dragón' (tu cuaderno mágico) y dibuja una estrella fugaz grande en la última página. Escribí debajo:"}
              </p>
              <p style="margin: 8px 0 0 0; font-style: italic; color: var(--text-gold); background: rgba(233,196,106,0.1); padding: 10px; border-radius: 8px; font-weight: 700; text-align: center;">
                ${isEn 
                  ? "&quot;I vow to use my magic to uplift the world and continue learning each and every day.&quot;" 
                  : "&quot;Prometo usar mi magia para ayudar al mundo y seguir aprendiendo todos los días.&quot;"}
              </p>
              <p style="margin-top: 10px; font-size: 0.9rem; color: var(--text-muted); text-align: center;">
                ${isEn 
                  ? "Seal with your Magical Name and celebrate joyfully with your Guardian Dragon! 🎉🐉✨" 
                  : "¡Firma con tu Nombre Mágico y celebra con tu Dragón Guardián! 🎉🐉✨"}
              </p>
            </div>
          </div>

        </div>
      `;
  }
}

