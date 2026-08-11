import { DRAGONS_DATA } from "../data/dragons.js?v=6.1.0";
import { renderDragonSVG, getDragonArtworkSrc } from "../svg/dragonSvg.js?v=6.1.0";
import { isFavorite, toggleFavorite } from "../utils/storage.js?v=6.1.0";
import { playSound } from "../utils/audio.js?v=6.1.0";

function slugify(text) {
  text = (text || "").toLowerCase();
  const replacements = {'á':'a', 'é':'e', 'í':'i', 'ó':'o', 'ú':'u', 'ñ':'n', 'ü':'u'};
  for (let k in replacements) {
    text = text.replace(new RegExp(k, 'g'), replacements[k]);
  }
  return text.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function renderDragonCardHTML(dragon) {
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

export function openDragonModal(dragon, onFavToggleCallback = null) {
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

export function closeDragonModal() {
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
