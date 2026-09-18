import { DRAGONS_DATA } from "../data/dragons.js?v=6.1.0";
import { playSound } from "../utils/audio.js?v=6.1.0";
import { getFavoritesSet, toggleFavorite } from "../utils/storage.js?v=6.1.0";
import { renderDragonCardHTML, openDragonModal } from "./dragonCard.js?v=6.1.0";

export function renderFavoritesView() {
  const container = document.getElementById("favorites-grid");
  if (!container) return;

  const favSet = getFavoritesSet();
  const favDragons = DRAGONS_DATA.filter(d => favSet.has(d.id));

  const isEn = (typeof window !== "undefined" && window.I18N && window.I18N.currentLang === "en");
  const t = (k) => (window.I18N ? window.I18N.t(k) : k);

  if (favDragons.length === 0) {
    container.innerHTML = `
      <div class="empty-state fantasy-panel width-100" style="text-align: center; padding: 2.5rem 1rem;">
        <h3 style="margin-bottom: 0.75rem; color: var(--gold-main); font-size: 1.4rem;">${t("fav_empty_title")}</h3>
        <p style="margin-bottom: 1.5rem; opacity: 0.85; font-size: 1.05rem;">${t("fav_empty_desc")}</p>
        <a href="/" class="btn btn-gold" style="display: inline-block; text-decoration: none; padding: 10px 22px; font-weight: 700;">
          ${t("fav_explore_btn")}
        </a>
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

if (typeof window !== "undefined") {
  window.renderFavoritesView = renderFavoritesView;
}
