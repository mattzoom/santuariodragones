import { DRAGONS_DATA } from "./data/dragons.js?v=6.1.0";
import { initParticlesCanvas } from "./utils/particles.js?v=6.1.0";
import { playSound, toggleSound } from "./utils/audio.js?v=6.1.0";
import { initEncyclopediaFilters, renderEncyclopedia } from "./views/encyclopedia.js?v=6.1.0";
import { initSigilForge } from "./views/sigilForge.js?v=6.1.0";
import { initMagicModule } from "./views/magic.js?v=6.1.0";
import { initQuizModule } from "./views/quiz.js?v=6.1.0";
import { initColiseoModule } from "./views/coliseo.js?v=6.1.0";
import { renderFavoritesView } from "./views/favorites.js?v=6.1.0";

export function switchTab(tabName, playSoundEffect = true) {
  if (playSoundEffect) {
    playSound("click");
  }

  // If user clicks a tab while inside a static /dragon/*.html page, redirect natively
  if (window.location.pathname.includes("/dragon/")) {
    const sectionUrls = {
      encyclopedia: "/",
      coliseo: "/coliseo.html",
      magic: "/magia-draconiana.html",
      quiz: "/test-draconiano.html",
      favorites: "/favoritos.html"
    };
    if (sectionUrls[tabName]) {
      window.location.href = sectionUrls[tabName];
      return;
    }
  }

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
  } else if (tabName === "coliseo") {
    initColiseoModule();
  } else if (tabName === "sigils") {
    switchTab("magic", false);
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

  // Attach sound click handler to all nav tabs
  document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      playSound("click");
    });
  });

  initEncyclopediaFilters();
  
  // Check active route from pathname without double sound or flash
  const path = window.location.pathname;
  if (path.includes("magia-draconiana")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("fundamentos");
  } else if (path.includes("altar-varita")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("altar");
    if (window.switchAltarTool) window.switchAltarTool("varita");
  } else if (path.includes("altar-pentaculo")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("altar");
    if (window.switchAltarTool) window.switchAltarTool("pentaculo");
  } else if (path.includes("altar-espejo")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("altar");
    if (window.switchAltarTool) window.switchAltarTool("espejo");
  } else if (path.includes("altar-dragonscript")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("altar");
    if (window.switchAltarTool) window.switchAltarTool("dragonscript");
  } else if (path.includes("altar-draconiano")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("altar");
  } else if (path.includes("academia-anillo-1")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("academia");
    if (window.switchMagicRing) window.switchMagicRing(1);
  } else if (path.includes("academia-anillo-2")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("academia");
    if (window.switchMagicRing) window.switchMagicRing(2);
  } else if (path.includes("academia-anillo-3")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("academia");
    if (window.switchMagicRing) window.switchMagicRing(3);
  } else if (path.includes("academia-anillo-4")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("academia");
    if (window.switchMagicRing) window.switchMagicRing(4);
  } else if (path.includes("academia-anillo-5")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("academia");
    if (window.switchMagicRing) window.switchMagicRing(5);
  } else if (path.includes("academia-draconiana")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("academia");
  } else if (path.includes("forja-de-sigilos")) {
    switchTab("magic", false);
    if (window.switchMagicSubPage) window.switchMagicSubPage("sigilos");
  } else if (path.includes("test-draconiano")) {
    switchTab("quiz", false);
  } else if (path.includes("coliseo")) {
    switchTab("coliseo", false);
  } else if (path.includes("favoritos")) {
    switchTab("favorites", false);
  } else if (!path.includes("/dragon/")) {
    renderEncyclopedia();
  }

  // Deep-linking fallback: redirect legacy ?dragon=ID parameters to static SSG page
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("dragon")) {
    const dId = parseInt(urlParams.get("dragon"), 10);
    const dragon = DRAGONS_DATA.find(d => d.id === dId);
    if (dragon) {
      const slug = dragon.name.toLowerCase().replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u').replace(/ñ/g,'n').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
      window.location.href = `/dragon/${slug}.html`;
    }
  }

  window.initApp = initApp;
}

// Auto-boot app on DOMContentLoaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
