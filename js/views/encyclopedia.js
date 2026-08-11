import { DRAGONS_DATA } from "../data/dragons.js?v=6.1.0";
import { renderDragonCardHTML, openDragonModal } from "./dragonCard.js?v=6.1.0";
import { isFavorite, toggleFavorite } from "../utils/storage.js?v=6.1.0";
import { playSound } from "../utils/audio.js?v=6.1.0";

const ITEMS_PER_PAGE = 12;
let currentPage = 1;
let filteredDragons = [...DRAGONS_DATA].sort((a, b) => a.name.localeCompare(b.name));

export function initEncyclopediaFilters() {
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
    const types = ["Todos", ...new Set(DRAGONS_DATA.map(d => d.type))];
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

export function renderEncyclopedia() {
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
