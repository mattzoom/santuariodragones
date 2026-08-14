export function getDragonArtworkSrc(dragon) {
  if (dragon && dragon.id <= 100) {
    const v = (dragon.id === 13) ? '?v=13_v2' : (dragon.id === 45) ? '?v=45_v2' : (dragon.id === 18) ? '?v=18_v2' : (dragon.id === 11) ? '?v=11_v2' : (dragon.id === 3) ? '?v=3_v2' : (dragon.id === 20) ? '?v=20_v2' : (dragon.id === 10) ? '?v=10_v2' : (dragon.id === 2) ? '?v=2_v2' : (dragon.id === 46) ? '?v=46_v2' : '';
    return `/assets/dragons/dragon_${dragon.id}.jpg${v}`;
  }
  return null;
}

export function renderDragonSVG(dragon, width = 300, height = 240) {
  const { svgType = "draco", colorPrimary = "#c8553d", colorSecondary = "#e9c46a", glowColor = "#2a9d8f", id = 1, name = "" } = dragon;

  const outline = "#12111c";
  
  const palette = [
    "#e9c46a", // Mustard
    "#2a9d8f", // Teal
    "#c8553d", // Rust
    "#b23a3a", // Faded Red
    "#d4a373", // Pale Clay
    "#264653"  // Deep Slate
  ];

  const seed1 = (id * 17) % 5;
  const seed2 = (id * 31) % 4;
  const seed3 = (id * 47) % 3;

  const bodyColor = colorPrimary || palette[id % palette.length];
  const accentColor = colorSecondary || palette[(id + 2) % palette.length];
  const secondaryAccent = palette[(id + 4) % palette.length];

  let paths = "";

  let headPolygon = "";
  if (seed1 === 0) headPolygon = "210,80 295,40 280,95 230,115 200,90";
  else if (seed1 === 1) headPolygon = "215,70 285,55 295,95 220,110 205,85";
  else if (seed1 === 2) headPolygon = "205,85 275,35 290,75 240,110 195,95";
  else if (seed1 === 3) headPolygon = "220,75 300,60 270,105 225,115 210,95";
  else headPolygon = "210,80 280,45 285,90 235,110 205,90";

  let eyeMarkup = "";
  if (seed2 === 0) {
    eyeMarkup = `
      <polygon points="238,55 258,52 260,70 240,73" fill="#ffffff" stroke="${outline}" stroke-width="3" />
      <rect x="248" y="58" width="5" height="10" fill="#12111c" />
      <path d="M 234 50 L 264 45" stroke="${outline}" stroke-width="5" stroke-linecap="square" />
    `;
  } else if (seed2 === 1) {
    eyeMarkup = `
      <polygon points="232,50 252,48 254,68 234,70" fill="#ffffff" stroke="${outline}" stroke-width="3" />
      <rect x="240" y="53" width="7" height="12" fill="#12111c" />
      <polygon points="258,45 272,42 274,58 260,60" fill="#ffffff" stroke="${outline}" stroke-width="3" />
      <rect x="264" y="47" width="4" height="8" fill="#12111c" />
      <path d="M 228 42 L 278 35" stroke="${outline}" stroke-width="5" stroke-linecap="square" />
    `;
  } else {
    eyeMarkup = `
      <polygon points="235,58 260,54 262,70 237,73" fill="#ffffff" stroke="${outline}" stroke-width="3" />
      <line x1="235" y1="63" x2="260" y2="59" stroke="${outline}" stroke-width="4" />
      <rect x="246" y="64" width="6" height="5" fill="#12111c" />
    `;
  }

  let toothMarkup = "";
  if (seed3 === 0) toothMarkup = `<polygon points="265,95 273,112 280,93" fill="#ffffff" stroke="${outline}" stroke-width="3" />`;
  else if (seed3 === 1) toothMarkup = `<polygon points="250,98 256,114 262,96" fill="#ffffff" stroke="${outline}" stroke-width="3" /><polygon points="270,92 276,108 282,90" fill="#ffffff" stroke="${outline}" stroke-width="3" />`;
  else toothMarkup = `<polygon points="272,90 282,106 288,88" fill="#ffffff" stroke="${outline}" stroke-width="3" />`;

  switch (svgType) {
    case "wyrm":
      paths = `
        <polygon points="40,210 180,225 260,205 120,200" fill="rgba(18, 17, 28, 0.3)" />
        <path d="M 35 185 L 85 220 L 145 170 L 195 195 L 245 130 L 225 75 L 155 45 L 115 85 L 135 125 L 85 145 Z" fill="${bodyColor}" stroke="${outline}" stroke-width="6" stroke-linejoin="miter" />
        <path d="M 45 190 L 85 215 L 140 175 L 190 190 L 235 135" fill="none" stroke="${accentColor}" stroke-width="10" stroke-linecap="square" />
        <path d="M 45 190 L 85 215 L 140 175 L 190 190 L 235 135" fill="none" stroke="${outline}" stroke-width="3" stroke-dasharray="10,8" />
        <polygon points="${headPolygon}" fill="${bodyColor}" stroke="${outline}" stroke-width="6" stroke-linejoin="miter" />
        <polygon points="225,65 245,15 240,60" fill="${accentColor}" stroke="${outline}" stroke-width="4" />
        <polygon points="238,55 275,20 255,62" fill="${secondaryAccent}" stroke="${outline}" stroke-width="4" />
        ${eyeMarkup}
        <path d="M 235 105 L 285 90" stroke="${outline}" stroke-width="5" />
        ${toothMarkup}
        <polygon points="280,85 315,75 305,95 330,85 295,105" fill="${secondaryAccent}" stroke="${outline}" stroke-width="3" />
      `;
      break;

    case "shen":
      paths = `
        <polygon points="30,195 80,180 140,210 210,185 280,210 230,225 100,220" fill="${secondaryAccent}" opacity="0.4" stroke="${outline}" stroke-width="3" />
        <path d="M 30 160 L 80 50 L 130 200 L 180 110 L 230 170 L 260 85" fill="none" stroke="${bodyColor}" stroke-width="34" stroke-linecap="square" stroke-linejoin="miter" />
        <path d="M 30 160 L 80 50 L 130 200 L 180 110 L 230 170 L 260 85" fill="none" stroke="${outline}" stroke-width="6" stroke-linecap="square" stroke-linejoin="miter" />
        <polygon points="${headPolygon}" fill="${bodyColor}" stroke="${outline}" stroke-width="6" stroke-linejoin="miter" />
        <polygon points="285,45 320,55 295,75" fill="${accentColor}" stroke="${outline}" stroke-width="4" />
        ${eyeMarkup}
        <path d="M 290 75 L 325 80 L 310 115 M 285 85 L 335 105 L 315 135" fill="none" stroke="${accentColor}" stroke-width="5" stroke-linecap="square" />
        <path d="M 290 75 L 325 80 L 310 115 M 285 85 L 335 105 L 315 135" fill="none" stroke="${outline}" stroke-width="2" stroke-linecap="square" />
      `;
      break;

    case "hidra":
      paths = `
        <polygon points="60,215 150,230 240,215 150,200" fill="rgba(18, 17, 28, 0.3)" />
        <polygon points="80,200 150,230 220,200 180,150 120,150" fill="${bodyColor}" stroke="${outline}" stroke-width="6" stroke-linejoin="miter" />
        <path d="M 100 150 L 55 90 L 70 45 L 105 60 L 125 150" fill="${bodyColor}" stroke="${outline}" stroke-width="5" stroke-linejoin="miter" />
        <polygon points="50,45 85,25 95,55 60,65" fill="${accentColor}" stroke="${outline}" stroke-width="4" />
        <rect x="62" y="38" width="10" height="10" fill="#ffffff" stroke="${outline}" stroke-width="2" />
        <rect x="65" y="40" width="4" height="6" fill="#12111c" />
        <path d="M 52 32 L 78 30" stroke="${outline}" stroke-width="4" />
        <path d="M 135 150 L 140 75 L 155 25 L 180 40 L 165 150" fill="${bodyColor}" stroke="${outline}" stroke-width="5" stroke-linejoin="miter" />
        <polygon points="140,25 185,15 175,50 135,45" fill="${bodyColor}" stroke="${outline}" stroke-width="4" />
        <polygon points="145,26 160,22 162,36 147,38" fill="#ffffff" stroke="${outline}" stroke-width="2" /><rect x="152" y="27" width="4" height="6" fill="#12111c" />
        <polygon points="163,22 176,18 178,32 165,34" fill="#ffffff" stroke="${outline}" stroke-width="2" /><rect x="170" y="23" width="4" height="6" fill="#12111c" />
        <path d="M 138 16 L 182 12" stroke="${outline}" stroke-width="4" />
        <path d="M 175 150 L 235 90 L 215 50 L 195 65 L 160 150" fill="${bodyColor}" stroke="${outline}" stroke-width="5" stroke-linejoin="miter" />
        <polygon points="205,50 245,35 235,70 195,75" fill="${secondaryAccent}" stroke="${outline}" stroke-width="4" />
        <rect x="210" y="52" width="10" height="10" fill="#ffffff" stroke="${outline}" stroke-width="2" />
        <rect x="213" y="54" width="4" height="6" fill="#12111c" />
        <path d="M 202 44 L 230 40" stroke="${outline}" stroke-width="4" />
      `;
      break;

    case "ampithere":
      paths = `
        <polygon points="50,215 150,225 250,215 150,200" fill="rgba(18, 17, 28, 0.3)" />
        <polygon points="140,120 40,25 15,80 115 135" fill="${accentColor}" stroke="${outline}" stroke-width="6" stroke-linejoin="miter" />
        <polygon points="160,120 260,25 285,80 185 135" fill="${accentColor}" stroke="${outline}" stroke-width="6" stroke-linejoin="miter" />
        <path d="M 115 110 L 35 45 M 105 120 L 45 75 M 185 110 L 265 45 M 195 120 L 255 75" stroke="${outline}" stroke-width="3" stroke-linecap="square" />
        <path d="M 95 175 L 150 215 L 205 175 L 215 130 L 150 100 L 90 130 Z" fill="${bodyColor}" stroke="${outline}" stroke-width="6" stroke-linejoin="miter" />
        <path d="M 140 100 L 140 45 L 180 50 L 165 115 Z" fill="${bodyColor}" stroke="${outline}" stroke-width="5" />
        <polygon points="180,50 225,55 175,75" fill="${secondaryAccent}" stroke="${outline}" stroke-width="4" />
        ${eyeMarkup}
      `;
      break;

    case "wyvern":
    case "basilisco":
    case "draco":
    default:
      paths = `
        <polygon points="40,215 150,230 260,215 150,195" fill="rgba(18, 17, 28, 0.3)" />
        <polygon points="130,110 40,15 10,75 115,130" fill="${accentColor}" stroke="${outline}" stroke-width="6" stroke-linejoin="miter" />
        <polygon points="160,110 250,15 285,75 175,130" fill="${accentColor}" stroke="${outline}" stroke-width="6" stroke-linejoin="miter" />
        <path d="M 105 175 L 35 205 L 15 165 L 50 155" fill="none" stroke="${bodyColor}" stroke-width="24" stroke-linecap="square" stroke-linejoin="miter" />
        <path d="M 105 175 L 35 205 L 15 165 L 50 155" fill="none" stroke="${outline}" stroke-width="6" stroke-linecap="square" stroke-linejoin="miter" />
        <polygon points="15,165 -5,145 5,185" fill="${secondaryAccent}" stroke="${outline}" stroke-width="4" />
        <polygon points="95,165 150,210 200,165 210,120 150,100 90,120" fill="${bodyColor}" stroke="${outline}" stroke-width="6" stroke-linejoin="miter" />
        <polygon points="120,130 150,185 180,130 150,110" fill="${accentColor}" stroke="${outline}" stroke-width="4" />
        <path d="M 130 110 L 120 45 L 180 35 L 210 65 L 165 100 Z" fill="${bodyColor}" stroke="${outline}" stroke-width="6" stroke-linejoin="miter" />
        <polygon points="145,40 120,5 155,30" fill="${accentColor}" stroke="${outline}" stroke-width="4" />
        <polygon points="160,38 175,0 178,35" fill="${secondaryAccent}" stroke="${outline}" stroke-width="4" />
        <polygon points="${headPolygon}" fill="${bodyColor}" stroke="${outline}" stroke-width="6" stroke-linejoin="miter" />
        ${eyeMarkup}
        <path d="M 160 72 L 215 65" stroke="${outline}" stroke-width="5" stroke-linecap="square" />
        ${toothMarkup}
        <path d="M 115 175 L 95 215 L 120 215 M 175 175 L 195 215 L 215 215" stroke="${outline}" stroke-width="6" stroke-linecap="square" stroke-linejoin="miter" />
        <polygon points="215,65 255,55 240,75 270,65 230,85" fill="${secondaryAccent}" stroke="${outline}" stroke-width="3" />
      `;
      break;
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%" class="dragon-svg-illustration">
      </defs>
      <circle cx="${width/2}" cy="${height/2}" r="${Math.min(width, height)*0.42}" fill="#13101c" stroke="#ffd700" stroke-width="2" opacity="0.6" />
      <circle cx="${width/2}" cy="${height/2}" r="${Math.min(width, height)*0.39}" fill="none" stroke="${colorSecondary}" stroke-width="1" stroke-dasharray="6,6" opacity="0.4" />
      ${paths}
    </svg>
  `;
}
