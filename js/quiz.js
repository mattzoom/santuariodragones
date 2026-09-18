// Interactive Mini-Games for Kids: Personality Quiz & Dragon Trivia
// Written in natural Rioplatense Spanish & English (100% Bilingual)

import { DRAGONS_DATA } from "./dragonsData.js?v=6.1.0";
import { playSound } from "./audio.js?v=6.1.0";
import { renderDragonSVG, getDragonArtworkSrc } from "./svgGenerator.js?v=6.1.0";

const QUIZ_QUESTIONS = [
  {
    question: "1. Si pudieras volar hacia cualquier lugar ahora mismo, ¿a dónde irías?",
    question_en: "1. If you could fly anywhere right now, where would you go?",
    options: [
      { text: "A la cima de un volcán hirviendo con lava y fuego", text_en: "To the peak of a roaring volcano boiling with lava and fire", element: "Fuego", dragonId: 2 },
      { text: "A los picos nevados y helados del Polo Norte", text_en: "To the frosted peaks and glaciers of the North Pole", element: "Hielo", dragonId: 8 },
      { text: "A explorar el palacio secreto en lo profundo del océano", text_en: "To explore the secret palace deep beneath the ocean", element: "Agua", dragonId: 26 },
      { text: "A volar entre las estrellas y las galaxias lejanas", text_en: "To soar among the radiant stars and distant galaxies", element: "Luz", dragonId: 94 }
    ]
  },
  {
    question: "2. ¿Cuál es tu superpoder favorito si fueras un dragón legendario?",
    question_en: "2. What is your favorite superpower if you were a legendary dragon?",
    options: [
      { text: "Lanzar llamaradas doradas que iluminan la noche", text_en: "Unleashing golden firestorms that illuminate the night", element: "Fuego", dragonId: 46 },
      { text: "Volverme invisible y deslizarme por las sombras", text_en: "Becoming invisible and gliding silently through shadows", element: "Sombra", dragonId: 54 },
      { text: "Controlar el clima, la lluvia y los rayos con el pensamiento", text_en: "Controlling the weather, storm clouds, and lightning at will", element: "Tormenta", dragonId: 21 },
      { text: "Convertir cualquier piedra en un diamante resplandeciente", text_en: "Transmuting rough stones into gleaming radiant crystals", element: "Cristal", dragonId: 35 }
    ]
  },
  {
    question: "3. Si alguien intentara quitarte tu tesoro, ¿qué harías?",
    question_en: "3. If someone tried to take your treasure, what would you do?",
    options: [
      { text: "Lanzar un rugido tan fuerte que haría temblar la tierra", text_en: "Release a thunderous roar that shakes the very earth", element: "Fuego", dragonId: 18 },
      { text: "Resolver un acertijo sabio para convencerlo de irse en paz", text_en: "Share an ancient riddle of wisdom to make peace", element: "Luz", dragonId: 100 },
      { text: "Engañarlo con una niebla mágica y esconder el tesoro en una cueva", text_en: "Cast an illusionary mist and conceal the hoard inside a cavern", element: "Sombra", dragonId: 27 },
      { text: "Regalarle una manzana dorada para hacernos amigos", text_en: "Offer a golden enchanted fruit and forge a friendship", element: "Naturaleza", dragonId: 11 }
    ]
  },
  {
    question: "4. ¿En qué momento del día sentís que tenés más energía?",
    question_en: "4. What time of day do you feel the most energetic?",
    options: [
      { text: "Al amanecer, cuando el sol dorado recién sale", text_en: "At sunrise, when the first golden beams break the dawn", element: "Luz", dragonId: 36 },
      { text: "Al mediodía, cuando el sol está bien caliente", text_en: "At high noon, under the blazing heat of the sun", element: "Magma", dragonId: 37 },
      { text: "Al atardecer, cuando las nubes se ponen violetas", text_en: "At twilight, when the clouds glow with purple hues", element: "Viento", dragonId: 38 },
      { text: "A la medianoche, bajo un cielo lleno de estrellas", text_en: "At midnight, beneath a sky brimming with constellations", element: "Sombra", dragonId: 97 }
    ]
  },
  {
    question: "5. ¿Qué cualidad describe mejor tu personalidad?",
    question_en: "5. Which quality describes your personality the best?",
    options: [
      { text: "Valiente y protector de mis amigos", text_en: "Brave, bold, and fiercely loyal to my friends", element: "Fuego", dragonId: 46 },
      { text: "Curioso, inteligente y apasionado por aprender cosas nuevas", text_en: "Curious, wise, and eager to learn new mysteries", element: "Luz", dragonId: 100 },
      { text: "Tranquilo, paciente y amante de la naturaleza", text_en: "Calm, patient, and deeply connected with nature", element: "Naturaleza", dragonId: 4 },
      { text: "Ágil, veloz y lleno de sorpresas divertidas", text_en: "Agile, swift, and brimming with joyful surprises", element: "Rayo", dragonId: 98 }
    ]
  }
];

let currentQuizStep = 0;
let userAnswers = [];
let quizState = "intro"; // 'intro' | 'question' | 'result'

export function initQuizModule(containerId = "quiz-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  renderQuizIntro(container);
}

function renderQuizIntro(container) {
  quizState = "intro";
  currentQuizStep = 0;
  userAnswers = [];

  const t = (k, fallback) => (window.I18N ? window.I18N.t(k) : fallback);

  container.innerHTML = `
    <div class="quiz-wrapper fantasy-panel" style="padding: 2rem;">
      <h2 class="panel-title" style="color: var(--gold-main); font-size: 1.6rem; margin-top: 0;">
        ${t("quiz_intro_title", "⭐ Descubrí tu Guardián Espiritual Draconiano")}
      </h2>
      <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-main);">
        ${t("quiz_intro_desc", "A lo largo de 5 dilemas sagrados, el Oráculo del Santuario evalúa tus instintos frente al peligro, tu hábitat predilecto, tu método de resolución de conflictos y tu afinidad elemental primordial (Fuego, Agua, Tierra, Viento, Luz o Sombra).")}
      </p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-panel); border-radius: 10px; padding: 1.2rem;">
          <h4 style="color: var(--gold-main); margin: 0 0 6px 0; font-size: 1.1rem;">${t("quiz_col1_title", "1. Tu Elemento Guía")}</h4>
          <p style="font-size: 0.9rem; margin: 0; color: var(--text-muted); line-height: 1.5;">${t("quiz_col1_desc", "Sintonía con el calor del fuego, la fluidez del agua, la solidez de la tierra o el abismo de las sombras.")}</p>
        </div>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-panel); border-radius: 10px; padding: 1.2rem;">
          <h4 style="color: var(--gold-main); margin: 0 0 6px 0; font-size: 1.1rem;">${t("quiz_col2_title", "2. Hábitat Sagrado")}</h4>
          <p style="font-size: 0.9rem; margin: 0; color: var(--text-muted); line-height: 1.5;">${t("quiz_col2_desc", "Cavernas con gemas ancestrales, volcanes ardientes, cielos tempestuosos o fosas abisales.")}</p>
        </div>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-panel); border-radius: 10px; padding: 1.2rem;">
          <h4 style="color: var(--gold-main); margin: 0 0 6px 0; font-size: 1.1rem;">${t("quiz_col3_title", "3. Vínculo del Códice")}</h4>
          <p style="font-size: 0.9rem; margin: 0; color: var(--text-muted); line-height: 1.5;">${t("quiz_col3_desc", "Conexión directa con uno de los 100 dragones registrados, su pergamino histórico y sus habilidades únicas.")}</p>
        </div>
      </div>

      <div class="text-center" style="margin-top: 2rem; text-align: center;">
        <button class="btn btn-gold btn-lg" id="btn-start-quiz" style="padding: 12px 32px; font-size: 1.15rem; font-weight: 700;">
          ${t("quiz_btn_start", "🔥 Comenzar el Test Draconiano")}
        </button>
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
  quizState = "question";
  if (currentQuizStep >= QUIZ_QUESTIONS.length) {
    renderQuizResult(container);
    return;
  }

  const q = QUIZ_QUESTIONS[currentQuizStep];
  const lang = (window.I18N && window.I18N.currentLang) || "es";
  const qText = (lang === "en" && q.question_en) ? q.question_en : q.question;
  const tagPregunta = window.I18N ? window.I18N.t("quiz_question_tag") : "Pregunta";
  const tagDe = window.I18N ? window.I18N.t("quiz_question_of") : "de";

  container.innerHTML = `
    <div class="quiz-wrapper fantasy-panel">
      <div class="quiz-progress-bar">
        <div class="progress-fill" style="width: ${((currentQuizStep + 1) / QUIZ_QUESTIONS.length) * 100}%"></div>
      </div>

      <span class="quiz-step-tag">${tagPregunta} ${currentQuizStep + 1} ${tagDe} ${QUIZ_QUESTIONS.length}</span>
      <h3 class="question-text">${qText}</h3>

      <div class="quiz-options-grid">
        ${q.options.map((opt, idx) => {
          const optText = (lang === "en" && opt.text_en) ? opt.text_en : opt.text;
          return `
            <button class="quiz-option-card" data-idx="${idx}">
              <span class="opt-bullet">🐉</span>
              <span class="opt-text">${optText}</span>
            </button>
          `;
        }).join("")}
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
  quizState = "result";
  const matchedDragonId = (userAnswers[userAnswers.length - 1] && userAnswers[userAnswers.length - 1].dragonId) || 100;
  const dragon = DRAGONS_DATA.find(d => d.id === matchedDragonId) || DRAGONS_DATA[99];

  playSound("chime");

  const lang = (window.I18N && window.I18N.currentLang) || "es";
  const enData = (window.DRAGONS_EN && window.DRAGONS_EN[dragon.id]) || {};

  const title = (lang === "en" && enData.title) ? enData.title : dragon.title;
  const myth = window.I18N ? window.I18N.translateMythology(dragon.mythology) : dragon.mythology;
  const elem = window.I18N ? window.I18N.translateElement(dragon.element) : dragon.element;
  const ability = (lang === "en" && enData.ability) ? enData.ability : dragon.ability;
  const scroll = (lang === "en" && enData.scroll) ? enData.scroll : dragon.scroll;

  const lblMyth = window.I18N ? window.I18N.t("stat_mythology") : "Mitología";
  const lblElem = window.I18N ? window.I18N.t("stat_element") : "Elemento";
  const lblAbility = window.I18N ? window.I18N.t("stat_ability") : "Habilidad Especial";
  const congrats = window.I18N ? window.I18N.t("quiz_result_congrats") : "🎉 ¡Tu Dragón Interior es";
  const btnRestartText = window.I18N ? window.I18N.t("quiz_btn_restart") : "🔄 Hacer el Test de Nuevo";
  const btnCardText = window.I18N ? window.I18N.t("quiz_view_card_btn") : "📖 Ver Ficha en el Códice";

  const slug = (dragon.name || "")
    .toLowerCase()
    .replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/ñ/g, 'n')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const artworkSrc = getDragonArtworkSrc(dragon);
  const visualContent = artworkSrc
    ? `<div class="modal-img-frame" style="max-width: 440px; aspect-ratio: 4 / 3; width: 100%; height: auto; margin: 0 auto; background: #0c0b14;">
        <img src="${artworkSrc}" alt="${dragon.name}" class="modal-artwork-img" style="object-fit: contain;" />
       </div>`
    : renderDragonSVG(dragon, 280, 220);

  container.innerHTML = `
    <div class="quiz-wrapper fantasy-panel text-center">
      <h3 class="panel-title">${congrats} ${dragon.name}!</h3>
      <p class="quiz-result-subtitle">"${title}"</p>

      <div class="result-svg-box margin-top-md">
        ${visualContent}
      </div>

      <div class="result-details-box margin-top-md">
        <p><strong>${lblMyth}:</strong> ${myth} | <strong>${lblElem}:</strong> ${elem}</p>
        <p class="margin-top-sm"><strong>${lblAbility}:</strong> ${ability}</p>
        <p class="margin-top-sm italic-text">"${scroll}"</p>
      </div>

      <div class="margin-top-lg" style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
        <a href="/dragon/${slug}.html" class="btn btn-gold btn-lg" style="text-decoration: none; display: inline-flex; align-items: center;">${btnCardText}</a>
        <button class="btn btn-secondary btn-lg" id="btn-restart-quiz">${btnRestartText}</button>
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

window.renderQuizCurrentView = function() {
  const container = document.getElementById("quiz-container");
  if (!container) return;
  if (quizState === "question") {
    renderQuizQuestion(container);
  } else if (quizState === "result") {
    renderQuizResult(container);
  } else if (quizState === "intro") {
    renderQuizIntro(container);
  }
};
window.initQuizModule = initQuizModule;
window.QUIZ_QUESTIONS = QUIZ_QUESTIONS;
