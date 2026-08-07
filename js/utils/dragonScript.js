// Dragon Script dictionary mapping standard uppercase letters to custom SVG vector paths matching the official "Guía de Equivalencias Latino a Dragon" chart
export const DRAGON_SCRIPT_MAP = {
  'A': { 
    glyph: 'S-Dragon', 
    desc: 'Serpiente Alada S-Curva', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 32 10 C 15 8 10 20 25 25 C 40 30 35 44 15 42 M 15 42 L 10 38 M 15 42 L 20 38" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'B': { 
    glyph: 'Mars-Circle', 
    desc: 'Símbolo del Marte Draconiano', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><circle cx="22" cy="28" r="12" fill="none" stroke="currentColor" stroke-width="3.5"/><path d="M 31 19 L 42 8 M 42 8 L 32 8 M 42 8 L 42 18" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'C': { 
    glyph: 'Zigzag-Crown', 
    desc: 'Corona Zigzag de la Caverna (C / K)', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 8 18 L 50 18 M 8 28 L 18 18 L 28 32 L 38 18 L 48 28" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'D': { 
    glyph: 'Diamond-Rune', 
    desc: 'Rombo Sagrado de la Fortaleza', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 25 8 L 40 25 L 25 42 L 10 25 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'E': { 
    glyph: 'Circle-Arrows', 
    desc: 'Círculo con Flechas Horizontales', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><circle cx="25" cy="25" r="9" fill="none" stroke="currentColor" stroke-width="3.5"/><path d="M 6 25 L 44 25 M 6 25 L 12 20 M 6 25 L 12 30 M 44 25 L 38 20 M 44 25 L 38 30" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'F': { 
    glyph: 'Trident-Cross', 
    desc: 'Cruz de la Llama Ancestral', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 12 25 L 38 25 M 25 12 L 25 38 M 16 16 C 25 22 25 22 34 16 M 16 34 C 25 28 25 28 34 34" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'G': { 
    glyph: 'Spiral-Spiral', 
    desc: 'Espiral Doble Infinita', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 25 25 C 12 20 12 8 25 8 C 38 8 38 20 25 25 C 12 30 12 42 25 42 C 38 42 38 30 25 25" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'H': { 
    glyph: 'Diamond-Horns', 
    desc: 'Rombo con Cuernos Superiores', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 25 18 L 38 30 L 25 42 L 12 30 Z M 12 30 L 8 12 M 38 30 L 42 12" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'I': { 
    glyph: 'Crossed-Arrows', 
    desc: 'Garras Cruzadas del Rayo (I / J)', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 12 10 L 38 40 M 38 10 L 12 40 M 12 40 L 12 30 M 12 40 L 22 40 M 38 40 L 38 30 M 38 40 L 28 40" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'J': { 
    glyph: 'Crossed-Arrows', 
    desc: 'Garras Cruzadas del Rayo (I / J)', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 12 10 L 38 40 M 38 10 L 12 40 M 12 40 L 12 30 M 12 40 L 22 40 M 38 40 L 38 30 M 38 40 L 28 40" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'K': { 
    glyph: 'Zigzag-Crown', 
    desc: 'Corona Zigzag de la Caverna (C / K)', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 8 18 L 50 18 M 8 28 L 18 18 L 28 32 L 38 18 L 48 28" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'L': { 
    glyph: 'Arrow-Down-Dot', 
    desc: 'Flecha de Anclaje a la Tierra', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 25 12 L 25 40 M 25 40 L 18 32 M 25 40 L 32 32" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="25" cy="10" r="3" fill="currentColor"/></svg>`
  },
  'M': { 
    glyph: 'Double-Arch', 
    desc: 'Alas Gemelas del Vuelo', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 10 40 L 10 22 C 10 10 25 10 25 22 C 25 10 40 10 40 22 L 40 40" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'N': { 
    glyph: 'Gate-Square', 
    desc: 'Puerta Portal de la Montaña', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 12 40 L 12 18 C 12 10 38 10 38 18 L 38 40 M 20 40 L 20 26 C 20 20 30 20 30 26 L 30 40" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'O': { 
    glyph: 'Circle-Portal', 
    desc: 'Anillo del Ojo de Cristal', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><circle cx="25" cy="25" r="15" fill="none" stroke="currentColor" stroke-width="3.5"/></svg>`
  },
  'P': { 
    glyph: 'Triangle-Points', 
    desc: 'Triángulo con Puntos Astrales', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 25 10 L 40 38 L 10 38 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="25" cy="10" r="3" fill="currentColor"/><circle cx="10" cy="38" r="3" fill="currentColor"/><circle cx="40" cy="38" r="3" fill="currentColor"/></svg>`
  },
  'Q': { 
    glyph: 'Circle-Portal', 
    desc: 'Anillo del Ojo de Cristal', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><circle cx="25" cy="25" r="15" fill="none" stroke="currentColor" stroke-width="3.5"/></svg>`
  },
  'R': { 
    glyph: 'Arch-Points', 
    desc: 'Arco del Firmamento', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 10 38 C 10 15 40 15 40 38" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><circle cx="10" cy="38" r="3" fill="currentColor"/><circle cx="40" cy="38" r="3" fill="currentColor"/></svg>`
  },
  'S': { 
    glyph: 'Percent-Rune', 
    desc: 'Tijera del Viento Divino', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 12 40 L 38 10 M 16 16 L 34 34 M 14 20 L 20 14 M 30 36 L 36 30" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'T': { 
    glyph: 'T-Rune', 
    desc: 'Sello de la Tierra Sagrada', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 10 14 L 40 14 M 25 14 L 25 36 M 25 36 L 18 42 M 25 36 L 32 42" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'U': { 
    glyph: 'Calix-Rune', 
    desc: 'Cáliz de las Mareas (U / V)', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 10 10 L 10 30 C 10 42 40 42 40 30 L 40 10 M 25 10 L 25 36" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'V': { 
    glyph: 'Triangle-Down', 
    desc: 'Triángulo Invertido del Fuego (U / V)', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 10 12 L 40 12 L 25 40 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  'W': { 
    glyph: 'Triangle-Loop-Down', 
    desc: 'Triángulo Invertido con Lazo', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 10 18 L 40 18 L 25 42 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="25" cy="11" r="3" fill="none" stroke="currentColor" stroke-width="3"/></svg>`
  },
  'X': { 
    glyph: 'Cross-Dots', 
    desc: 'Cruz de los Cuatro Vientos', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 10 25 L 40 25 M 25 10 L 25 40" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><circle cx="10" cy="25" r="3" fill="currentColor"/><circle cx="40" cy="25" r="3" fill="currentColor"/><circle cx="25" cy="10" r="3" fill="currentColor"/><circle cx="25" cy="40" r="3" fill="currentColor"/></svg>`
  },
  'Y': { 
    glyph: 'Cross-Slashed', 
    desc: 'Estrella Tachada de las Nebulosas', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 8 25 L 42 25 M 25 8 L 25 42 M 12 12 L 38 38 M 38 12 L 12 38" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><circle cx="25" cy="25" r="8" fill="none" stroke="currentColor" stroke-width="3"/></svg>`
  },
  'Z': { 
    glyph: 'Anchor-T', 
    desc: 'Ancla del Inframundo', 
    svg: `<svg viewBox="0 0 50 50" width="36" height="36" style="vertical-align: middle;"><path d="M 10 12 L 40 12 M 25 12 L 25 40 M 25 40 L 16 32 M 25 40 L 34 32" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  }
};

export function translateToDragonScript(text) {
  if (!text) return [];
  const normalized = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
  
  const clean = normalized.replace(/[^A-Z\s]/g, '');
  return clean.split('').map(char => {
    if (char === ' ') {
      return {
        char: ' ',
        info: { glyph: ' ', desc: 'Espacio Mágico', svg: `<span style="display:inline-block; width:16px;"></span>` }
      };
    }
    return {
      char: char,
      info: DRAGON_SCRIPT_MAP[char] || { glyph: char, desc: 'Símbolo Mágico', svg: `<span style="font-size:1.5rem;">${char}</span>` }
    };
  });
}
