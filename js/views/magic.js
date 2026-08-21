import { playSound } from "../utils/audio.js?v=6.1.0";
import { DRAGONS_DATA } from "../data/dragons.js?v=6.1.0";
import { renderDragonSVG } from "../svg/dragonSvg.js?v=6.1.0";
import { renderSigilForgeUI } from "./sigilForge.js?v=6.1.0";
import { DRAGON_SCRIPT_MAP, translateToDragonScript } from "../utils/dragonScript.js?v=6.1.0";

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

export function initMagicModule(containerId = "magic-container") {
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
        
        <!-- 🌟 1. La Regla de Oro del Mago (HEADER ANCHO COMPLETO) -->
        <div class="fantasy-panel" style="padding: 1.8rem; border-left: 6px solid #ff4757; background: linear-gradient(135deg, rgba(255,71,87,0.12), rgba(255,165,2,0.06));">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 2.2rem;">🌟</span>
            <h3 style="color: #ff4757; margin: 0; font-size: 1.6rem;">La Regla de Oro del Mago: ¡Si no te divertís, no es magia!</h3>
          </div>
          <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.7; margin-top: 14px; font-weight: 500;">
            ¡Escuchá con atención, joven mago! Hay un secreto que muchos libros olvidan contar, pero que los verdaderos sabios y los dragones conocen muy bien: <strong>la magia se inventó para disfrutarse y ser feliz</strong>.
          </p>
          <p style="color: var(--text-main); font-size: 0.98rem; line-height: 1.7; margin-top: 10px;">
            En la Magia Draconiana, la diversión no es solo un extra, ¡es el motor que hace que tus hechizos funcionen! Si alguna vez estás practicando un ejercicio, haciendo una meditación o dibujando un sigilo y empezás a sentirte aburrido, asustado, triste o muy estresado, la regla de oro te dice que debés detenerte de inmediato. <strong>Si la estás pasando mal, ¡eso no es verdadera magia!</strong>
          </p>
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

        <!-- INTRODUCCIÓN -->
        <div style="background: rgba(200,85,61,0.1); border-left: 4px solid var(--color-rust); padding: 14px 18px; border-radius: 8px; margin-bottom: 1.5rem;">
          <p style="color: var(--text-main); margin: 0; font-size: 1rem; line-height: 1.7;">
            Hasta ahora tenés tu Varita (para dirigir tu energía) y tu Pentáculo (tu base segura). ¡Pero el equipo de un mago draconiano no está completo sin el <strong>Espejo Mágico</strong>! En la magia de los dragones, el espejo representa el <strong>elemento Tierra</strong> y no se usa para peinarse. Se usa como el <strong>"Ojo del Dragón"</strong>: una herramienta súper secreta para atrapar buenas ideas, protegerte de las malas vibras y asomarte al mundo de la imaginación.
          </p>
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

        <!-- INTRODUCCIÓN -->
        <div style="background: rgba(233,196,106,0.1); border-left: 4px solid var(--gold-main); padding: 14px 18px; border-radius: 8px; margin-bottom: 1.5rem;">
          <p style="color: var(--text-main); margin: 0; font-size: 1rem; line-height: 1.7;">
            ¿Te imaginás tener un alfabeto secreto que solo vos y los dragones puedan leer? ¡Pues existe! En el maravilloso mundo de la magia draconiana, este sistema de escritura se conoce como <strong>Dragon Script</strong> (o el Escrito del Dragón). Los dragones son seres sumamente inteligentes y conocen todos los idiomas humanos, pero las fuentes nos revelan que <strong>ellos prestan muchísima más atención a las cosas que escribís usando este alfabeto especial</strong>. ¡Es como enviarles un mensaje con un sello de "¡Súper Importante!"!
          </p>
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


