// Interactive Mini-Games for Kids: Personality Quiz & Dragon Trivia
// Written in natural Rioplatense Spanish for 10-year-old children

import { DRAGONS_DATA } from "../data/dragons.js?v=6.1.0";
import { playSound } from "../utils/audio.js?v=6.1.0";
import { renderDragonSVG, getDragonArtworkSrc } from "../svg/dragonSvg.js?v=6.1.0";

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

export function initQuizModule(containerId = "quiz-container") {
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
    ? `<div class="modal-img-frame" style="max-width: 480px; margin: 0 auto; height: 260px;">
        <img src="${artworkSrc}" alt="${dragon.name}" class="modal-artwork-img" />
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
