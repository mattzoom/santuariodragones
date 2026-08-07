export function renderElaborateCreatorSVG(state, width = 340, height = 250) {
  const primary = state.colorPrimary || "#c8553d";
  const secondary = state.colorSecondary || "#e9c46a";
  const eye = state.eyeColor || "#2a9d8f";
  const body = state.bodyType || "draco";
  const horn = state.hornStyle || "horns-classic";
  const wing = state.wingStyle || "wings-bat";
  const element = state.element || "Fuego";

  const outline = "#12101d";

  // Dynamic SVG Gradient Definitions
  const defs = `
    <defs>
      <linearGradient id="cBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${primary}" />
        <stop offset="100%" stop-color="#181328" />
      </linearGradient>

      <linearGradient id="cBellyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${secondary}" />
        <stop offset="100%" stop-color="#d4a373" />
      </linearGradient>

      <radialGradient id="cEyeGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${eye}" />
        <stop offset="100%" stop-color="#12101d" />
      </radialGradient>

      <linearGradient id="cWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${secondary}" stop-opacity="0.85" />
        <stop offset="100%" stop-color="${primary}" stop-opacity="0.65" />
      </linearGradient>

      <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
  `;

  // 1. Aura Layer (Elemental Background Effects)
  let aura = "";
  if (element === "Fuego") {
    aura = `
      <circle cx="170" cy="130" r="110" fill="#e9c46a" opacity="0.12" filter="url(#glowEffect)" />
      <path d="M 40 210 Q 70 150 90 200 Q 120 120 150 190 Q 180 110 220 200 Q 270 130 300 210" fill="none" stroke="${secondary}" stroke-width="4" opacity="0.6" stroke-dasharray="8,6" />
      <circle cx="70" cy="90" r="4" fill="#e9c46a" opacity="0.7" />
      <circle cx="290" cy="70" r="6" fill="#c8553d" opacity="0.8" />
      <circle cx="310" cy="160" r="3" fill="#e9c46a" opacity="0.9" />
    `;
  } else if (element === "Hielo") {
    aura = `
      <circle cx="170" cy="130" r="110" fill="#2a9d8f" opacity="0.15" filter="url(#glowEffect)" />
      <polygon points="50,60 62,40 74,60 62,80" fill="#2a9d8f" opacity="0.8" />
      <polygon points="290,70 300,52 310,70 300,88" fill="#ffffff" opacity="0.9" />
      <polygon points="80,180 88,168 96,180 88,192" fill="#2a9d8f" opacity="0.7" />
      <path d="M 30 130 L 310 130" stroke="#2a9d8f" stroke-width="2" opacity="0.3" stroke-dasharray="4,8" />
    `;
  } else if (element === "Rayo") {
    aura = `
      <circle cx="170" cy="130" r="110" fill="#e9c46a" opacity="0.12" filter="url(#glowEffect)" />
      <path d="M 30 50 L 60 90 L 45 100 L 80 150 M 310 40 L 280 90 L 295 105 L 265 160" stroke="#e9c46a" stroke-width="4" fill="none" stroke-linejoin="bevel" />
      <circle cx="170" cy="130" r="120" stroke="#e9c46a" stroke-width="2" fill="none" opacity="0.3" stroke-dasharray="12,12" />
    `;
  } else if (element === "Veneno") {
    aura = `
      <circle cx="170" cy="130" r="110" fill="#52b788" opacity="0.15" filter="url(#glowEffect)" />
      <circle cx="60" cy="100" r="12" fill="#52b788" opacity="0.6" />
      <circle cx="280" cy="80" r="16" fill="#74c69d" opacity="0.5" />
      <circle cx="90" cy="190" r="8" fill="#52b788" opacity="0.7" />
      <circle cx="310" cy="170" r="10" fill="#d8f3dc" opacity="0.8" />
    `;
  } else if (element === "Sombra") {
    aura = `
      <circle cx="170" cy="130" r="110" fill="#7209b7" opacity="0.2" filter="url(#glowEffect)" />
      <path d="M 30 200 C 60 140 100 220 150 150 C 200 230 260 130 310 200" fill="none" stroke="#480ca8" stroke-width="8" opacity="0.6" stroke-linecap="round" />
    `;
  } else {
    aura = `
      <circle cx="170" cy="130" r="110" fill="#e9c46a" opacity="0.2" filter="url(#glowEffect)" />
      <polygon points="170,15 178,35 198,35 182,47 188,67 170,55 152,67 158,47 142,35 162,35" fill="#ffd700" opacity="0.8" />
      <polygon points="50,70 55,83 68,83 58,91 62,103 50,95 38,103 42,91 32,83 45,83" fill="#ffffff" opacity="0.9" />
    `;
  }

  // 2. Wings Layer
  let wings = "";
  if (wing === "wings-bat") {
    wings = `
      <!-- Left Wing -->
      <path d="M 160 130 Q 90 30 30 80 Q 70 120 100 150 Q 130 150 160 130 Z" fill="url(#cWingGrad)" stroke="${outline}" stroke-width="5" />
      <path d="M 160 130 Q 90 30 30 80 M 90 30 L 100 150 M 90 30 L 70 120" stroke="${outline}" stroke-width="4" fill="none" />

      <!-- Right Wing -->
      <path d="M 200 130 Q 270 30 330 80 Q 290 120 260 150 Q 230 150 200 130 Z" fill="url(#cWingGrad)" stroke="${outline}" stroke-width="5" />
      <path d="M 200 130 Q 270 30 330 80 M 270 30 L 260 150 M 270 30 L 290 120" stroke="${outline}" stroke-width="4" fill="none" />
    `;
  } else if (wing === "wings-feather") {
    wings = `
      <!-- Left Feather Wing -->
      <path d="M 160 130 Q 90 30 20 70 Q 60 110 110 145 Z" fill="${secondary}" stroke="${outline}" stroke-width="5" />
      <path d="M 20 70 C 40 90 60 100 80 130 M 40 55 C 60 75 80 85 100 120" stroke="${outline}" stroke-width="4" fill="none" />

      <!-- Right Feather Wing -->
      <path d="M 200 130 Q 270 30 340 70 Q 300 110 250 145 Z" fill="${secondary}" stroke="${outline}" stroke-width="5" />
      <path d="M 340 70 C 320 90 300 100 260 130 M 320 55 C 300 75 280 85 240 120" stroke="${outline}" stroke-width="4" fill="none" />
    `;
  } else if (wing === "wings-plasma") {
    wings = `
      <path d="M 160 130 Q 80 20 20 90 Q 90 120 160 130 Z" fill="${eye}" opacity="0.75" stroke="${outline}" stroke-width="4" filter="url(#glowEffect)" />
      <path d="M 200 130 Q 260 20 320 90 Q 250 120 200 130 Z" fill="${eye}" opacity="0.75" stroke="${outline}" stroke-width="4" filter="url(#glowEffect)" />
    `;
  }

  // 3. Body & Anatomy Layer
  let bodyShape = "";
  if (body === "wyvern") {
    bodyShape = `
      <!-- Tail -->
      <path d="M 180 170 Q 240 230 290 200 Q 320 180 340 220" fill="none" stroke="url(#cBodyGrad)" stroke-width="22" stroke-linecap="round" />
      <path d="M 180 170 Q 240 230 290 200 Q 320 180 340 220" fill="none" stroke="${outline}" stroke-width="5" stroke-linecap="round" />
      <polygon points="340,220 355,205 350,230" fill="${secondary}" stroke="${outline}" stroke-width="3" />

      <!-- Legs -->
      <path d="M 155 170 L 140 225 L 120 235" stroke="${outline}" stroke-width="12" fill="none" stroke-linecap="round" />
      <path d="M 195 170 L 210 225 L 230 235" stroke="${outline}" stroke-width="12" fill="none" stroke-linecap="round" />

      <!-- Torso & Underbelly -->
      <path d="M 140 130 C 130 180 160 210 180 205 C 200 210 230 180 220 130 Z" fill="url(#cBodyGrad)" stroke="${outline}" stroke-width="5" />
      <path d="M 160 140 Q 180 160 180 200 Q 160 170 160 140 Z" fill="url(#cBellyGrad)" stroke="${outline}" stroke-width="3" />
    `;
  }
    // 4. Head Layer
  const headShape = `
    <path d="M 145 95 Q 170 65 195 95 Q 185 125 170 120 Q 155 125 145 95 Z" fill="url(#cBodyGrad)" stroke="${outline}" stroke-width="4" />
    <circle cx="160" cy="90" r="5" fill="${eye}" stroke="${outline}" stroke-width="2" />
    <circle cx="180" cy="90" r="5" fill="${eye}" stroke="${outline}" stroke-width="2" />
  `;

  // 5. Horns Layer
  let hornShape = "";
  if (horn === "horns-ram") {
    hornShape = `
      <path d="M 145 80 C 110 70 110 40 135 45" fill="none" stroke="${secondary}" stroke-width="6" stroke-linecap="round" />
      <path d="M 195 80 C 230 70 230 40 205 45" fill="none" stroke="${secondary}" stroke-width="6" stroke-linecap="round" />
    `;
  } else if (horn === "horns-crown") {
    hornShape = `
      <polygon points="150,75 160,45 170,60 180,45 190,75" fill="${secondary}" stroke="${outline}" stroke-width="3" />
    `;
  } else {
    hornShape = `
      <path d="M 150 80 Q 130 40 145 30" fill="none" stroke="${secondary}" stroke-width="6" stroke-linecap="round" />
      <path d="M 190 80 Q 210 40 195 30" fill="none" stroke="${secondary}" stroke-width="6" stroke-linecap="round" />
    `;
  }

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      ${defs}
      ${auraPath}
      ${wingShape}
      ${bodyShape}
      ${headShape}
      ${hornShape}
    </svg>
  `;
}
