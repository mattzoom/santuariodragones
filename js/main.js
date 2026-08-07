import { initParticlesCanvas } from "./utils/particles.js?v=6.1.0";
import { playSound, toggleSound } from "./utils/audio.js?v=6.1.0";
import { initEncyclopediaFilters, renderEncyclopedia } from "./views/encyclopedia.js?v=6.1.0";
import { initSigilForge } from "./views/sigilForge.js?v=6.1.0";
import { initMagicModule } from "./views/magic.js?v=6.1.0";
import { initQuizModule } from "./views/quiz.js?v=6.1.0";
import { renderFavoritesView } from "./views/favorites.js?v=6.1.0";

export function switchTab(tabName) {
  playSound("click");

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
  } else if (tabName === "sigils") {
    switchTab("magic");
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

export function initApp() {
  initParticlesCanvas("particle-canvas");

  const btnAudio = document.getElementById("btn-audio-toggle");
  if (btnAudio) {
    btnAudio.addEventListener("click", toggleSound);
  }

  // Attach direct click listeners to navigation tabs
  document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      const tabName = tab.dataset.tab;
      if (tabName) switchTab(tabName);
    });
  });

  initEncyclopediaFilters();
  renderEncyclopedia();

  window.initApp = initApp;
}

// Auto-boot app on DOMContentLoaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
