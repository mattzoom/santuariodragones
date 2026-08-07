import { DRAGONS_DATA } from "../data/dragons.js?v=6.1.0";
import { playSound } from "../utils/audio.js?v=6.1.0";
import { getFavoritesSet, toggleFavorite } from "../utils/storage.js?v=6.1.0";
import { renderDragonCardHTML, openDragonModal } from "./dragonCard.js?v=6.1.0";

export function renderFavoritesView() {
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
