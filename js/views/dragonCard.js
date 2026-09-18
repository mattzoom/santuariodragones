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

  const isEn = (typeof window !== "undefined" && window.I18N && window.I18N.currentLang === "en");
  const elemText = (typeof window !== "undefined" && window.I18N) ? window.I18N.translateElement(dragon.element) : dragon.element;
  const mythText = (typeof window !== "undefined" && window.I18N) ? window.I18N.translateMythology(dragon.mythology) : dragon.mythology;
  const favTitle = isFav 
    ? (isEn ? "Remove from Favorites" : "Quitar de Favoritos")
    : (isEn ? "Save to Favorites" : "Guardar en Favoritos");

  const mediaHtml = artSrc
    ? `<img src="${artSrc}" alt="${dragon.name}" width="400" height="300" loading="lazy" decoding="async" class="dragon-artwork-img" />`
    : renderDragonSVG(dragon, 300, 200);

  const enData = (typeof window !== "undefined" && window.DRAGONS_EN) ? window.DRAGONS_EN[dragon.id] : null;
  const titleText = (isEn && enData && enData.title) ? enData.title : dragon.title;

  return `
    <a href="/dragon/${slug}.html" class="dragon-card fantasy-panel" data-id="${dragon.id}" style="text-decoration: none; color: inherit; display: flex; flex-direction: column;">
      <button class="fav-btn ${isFav ? "active" : ""}" title="${favTitle}" onclick="event.preventDefault(); event.stopPropagation();">
        ${isFav ? "❤️" : "🤍"}
      </button>

      <div class="dragon-card-media">
        ${mediaHtml}
      </div>

      <div class="dragon-card-content">
        <span class="element-badge" data-raw-element="${dragon.element}">${elemText}</span>
        <h3 class="dragon-name">${dragon.name}</h3>
        <p class="dragon-title" data-raw-title="${dragon.title}">"${titleText}"</p>

        <div class="dragon-card-footer">
          <span class="mythology-tag" data-raw-myth="${dragon.mythology}">🏛️ ${mythText}</span>
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
    ? `<img src="${artSrc}" alt="${dragon.name}" width="600" height="450" decoding="async" class="modal-artwork-img" />`
    : renderDragonSVG(dragon, 340, 240);

  const isEn = (typeof window !== "undefined" && window.I18N && window.I18N.currentLang === "en");
  const t = (k) => (window.I18N ? window.I18N.t(k) : k);
  const transElem = (v) => (window.I18N ? window.I18N.translateElement(v) : v);
  const transMyth = (v) => (window.I18N ? window.I18N.translateMythology(v) : v);
  const transType = (v) => (window.I18N ? window.I18N.translateType(v) : v);
  const slug = slugify(dragon.name);

  const enData = (typeof window !== "undefined" && window.DRAGONS_EN) ? window.DRAGONS_EN[dragon.id] : null;
  const modalTitle = (isEn && enData && enData.title) ? enData.title : dragon.title;
  const modalHabitat = (isEn && enData && enData.habitat) ? enData.habitat : dragon.habitat;
  const modalAbility = (isEn && enData && enData.ability) ? enData.ability : dragon.ability;
  const modalWeakness = (isEn && enData && enData.weakness) ? enData.weakness : dragon.weakness;
  const modalScroll = (isEn && enData && enData.scroll) ? enData.scroll : dragon.scroll;

  const favText = isFav 
    ? (isEn ? "❤️ Remove from Favorites" : "❤️ Quitar de Favoritos")
    : (isEn ? "🤍 Save to Favorites" : "🤍 Guardar en Favoritos");

  modalContent.innerHTML = `
    <button class="modal-close-btn" id="btn-close-modal" aria-label="Cerrar">✖</button>
    <div class="modal-grid">
      <div class="modal-media-column">
        <div class="modal-img-frame">
          ${mediaHtml}
        </div>
        <div class="modal-actions margin-top-md" style="display: flex; flex-direction: column; gap: 8px;">
          <button class="btn ${isFav ? "btn-secondary" : "btn-primary"} width-100" id="btn-modal-fav">
            ${favText}
          </button>
          <a href="/dragon/${slug}.html" class="btn btn-secondary width-100" style="text-decoration: none; text-align: center; font-size: 0.9rem;">
            ${t("view_full_page")}
          </a>
        </div>
      </div>

      <div class="modal-info-column">
        <span class="element-badge" data-raw-element="${dragon.element}">${transElem(dragon.element)}</span>
        <h2 class="modal-dragon-title">${dragon.name}</h2>
        <p class="modal-dragon-subtitle">"${modalTitle}"</p>

        <div class="stats-table margin-top-md">
          <div class="stat-row"><strong>${t("stat_mythology")}:</strong> <span>${transMyth(dragon.mythology)}</span></div>
          <div class="stat-row"><strong>${t("stat_type")}:</strong> <span>${transType(dragon.type)}</span></div>
          <div class="stat-row"><strong>${t("stat_danger")}:</strong> <span>${flames} (${dragon.danger}/5)</span></div>
          <div class="stat-row"><strong>${t("stat_habitat")}:</strong> <span>${modalHabitat}</span></div>
          <div class="stat-row"><strong>${t("stat_ability")}:</strong> <span>${modalAbility}</span></div>
          <div class="stat-row"><strong>${t("stat_weakness")}:</strong> <span>${modalWeakness}</span></div>
        </div>

        <div class="historical-scroll-box margin-top-md fantasy-panel">
          <h4>📜 ${t("ancient_scroll_title")}:</h4>
          <p>${modalScroll}</p>
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
