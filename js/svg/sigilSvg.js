export function renderSigilSVG(state, consonants, width = 600, height = 600) {
  const pCol = state.colorPrimary || "#ffd700";
  const sCol = state.colorSecondary || "#2a9d8f";
  const gCol = state.colorGlow || state.glowColor || "#e76f51";
  const element = state.element || "Rayo";
  const body = state.bodyType || "draco";
  const horn = state.hornStyle || "horns-classic";

  const cx = width / 2;
  const cy = height / 2;
  const radius = width * 0.32;

  // Calculate Nodes for Consonants
  const N = consonants.length;
  const points = consonants.map((c, i) => {
    const angle = (i * 2 * Math.PI) / N - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
      char: c,
      angle: angle
    };
  });

  // Build Glyph Curve Path
  let glyphPath = "";
  if (points.length > 0) {
    glyphPath = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const midX = (prev.x + curr.x) / 2 + Math.cos(i) * 25;
      const midY = (prev.y + curr.y) / 2 + Math.sin(i) * 25;
      glyphPath += ` Q ${midX.toFixed(1)} ${midY.toFixed(1)}, ${curr.x.toFixed(1)} ${curr.y.toFixed(1)}`;
    }
    glyphPath += ` Z`;
  }

  // Sacred Geometry Background Lines (Pentáculo Sagrado de 5 Puntas)
  let pentaclePath = "";
  const rPent = radius * 1.08;
  const pentPoints = [];
  for (let k = 0; k < 5; k++) {
    const a = (k * 2 * Math.PI) / 5 - Math.PI / 2;
    pentPoints.push({
      x: cx + rPent * Math.cos(a),
      y: cy + rPent * Math.sin(a)
    });
  }
  const pentSeq = [pentPoints[0], pentPoints[2], pentPoints[4], pentPoints[1], pentPoints[3]];
  const pentPolyStr = pentSeq.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  pentaclePath = `
    <!-- Pentáculo de 5 puntas de fondo -->
    <circle cx="${cx}" cy="${cy}" r="${rPent.toFixed(1)}" stroke="${sCol}" stroke-width="2" fill="none" opacity="0.6" />
    <polygon points="${pentPolyStr}" stroke="${gCol}" stroke-width="1.8" fill="none" opacity="0.65" filter="url(#sigilGlowFilter)" />
  `;

  // Element Specific Aura Paths
  let auraSvg = "";

    if (element === "Rayo") {
    // 2 Rayos cruzados plenos (sin líneas punteadas), gruesos, más cortos y con clara forma de zig-zag
    const r1_p1 = `${(cx - radius * 0.75).toFixed(1)},${(cy - radius * 0.75).toFixed(1)}`;
    const r1_p2 = `${(cx - radius * 0.20).toFixed(1)},${(cy - radius * 0.40).toFixed(1)}`;
    const r1_p3 = `${(cx - radius * 0.35).toFixed(1)},${(cy - radius * 0.05).toFixed(1)}`;
    const r1_p4 = `${(cx + radius * 0.30).toFixed(1)},${(cy + radius * 0.20).toFixed(1)}`;
    const r1_p5 = `${(cx + radius * 0.10).toFixed(1)},${(cy + radius * 0.40).toFixed(1)}`;
    const r1_p6 = `${(cx + radius * 0.75).toFixed(1)},${(cy + radius * 0.75).toFixed(1)}`;
    const path1 = `M ${r1_p1} L ${r1_p2} L ${r1_p3} L ${r1_p4} L ${r1_p5} L ${r1_p6}`;

    const r2_p1 = `${(cx + radius * 0.75).toFixed(1)},${(cy - radius * 0.75).toFixed(1)}`;
    const r2_p2 = `${(cx + radius * 0.20).toFixed(1)},${(cy - radius * 0.40).toFixed(1)}`;
    const r2_p3 = `${(cx + radius * 0.35).toFixed(1)},${(cy - radius * 0.05).toFixed(1)}`;
    const r2_p4 = `${(cx - radius * 0.30).toFixed(1)},${(cy + radius * 0.20).toFixed(1)}`;
    const r2_p5 = `${(cx - radius * 0.10).toFixed(1)},${(cy + radius * 0.40).toFixed(1)}`;
    const r2_p6 = `${(cx - radius * 0.75).toFixed(1)},${(cy + radius * 0.75).toFixed(1)}`;
    const path2 = `M ${r2_p1} L ${r2_p2} L ${r2_p3} L ${r2_p4} L ${r2_p5} L ${r2_p6}`;

    auraSvg = `
      <path d="${path1}" stroke="${gCol}" stroke-width="6" fill="none" stroke-linecap="square" stroke-linejoin="miter" filter="url(#sigilGlowFilter)" />
      <path d="${path1}" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="square" stroke-linejoin="miter" />

      <path d="${path2}" stroke="${pCol}" stroke-width="5" fill="none" stroke-linecap="square" stroke-linejoin="miter" filter="url(#sigilGlowFilter)" />
      <path d="${path2}" stroke="#ffd700" stroke-width="2.5" fill="none" stroke-linecap="square" stroke-linejoin="miter" />
    `; } else if (element === "Fuego") {
    // 3 Triángulos picudos (Grande, Mediano, Pequeño) alineados por la base en el círculo principal
    const baseY = cy + radius * 0.90;
    
    // 1. Triángulo Grande (Outer)
    const x1_left = cx - radius * 0.85;
    const x1_right = cx + radius * 0.85;
    const y1_top = cy - radius * 1.45;
    
    // 2. Triángulo Mediano (Middle)
    const x2_left = cx - radius * 0.58;
    const x2_right = cx + radius * 0.58;
    const y2_top = cy - radius * 1.05;
    
    // 3. Triángulo Pequeño (Inner)
    const x3_left = cx - radius * 0.32;
    const x3_right = cx + radius * 0.32;
    const y3_top = cy - radius * 0.65;
    
    auraSvg = `
      <polygon points="${x1_left.toFixed(1)},${baseY.toFixed(1)} ${cx.toFixed(1)},${y1_top.toFixed(1)} ${x1_right.toFixed(1)},${baseY.toFixed(1)}" fill="none" stroke="${gCol}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" filter="url(#sigilGlowFilter)" />
      <polygon points="${x2_left.toFixed(1)},${baseY.toFixed(1)} ${cx.toFixed(1)},${y2_top.toFixed(1)} ${x2_right.toFixed(1)},${baseY.toFixed(1)}" fill="rgba(255, 69, 0, 0.15)" stroke="${pCol}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
      <polygon points="${x3_left.toFixed(1)},${baseY.toFixed(1)} ${cx.toFixed(1)},${y3_top.toFixed(1)} ${x3_right.toFixed(1)},${baseY.toFixed(1)}" fill="rgba(255, 215, 0, 0.25)" stroke="#ffffff" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />
      <line x1="${x1_left.toFixed(1)}" y1="${baseY.toFixed(1)}" x2="${x1_right.toFixed(1)}" y2="${baseY.toFixed(1)}" stroke="${pCol}" stroke-width="3" stroke-linecap="round" />
    `;   } else if (element === "Veneno") {
    // Línea serpenteante con ángulos suavizados (Catmull-Rom a Bezier cúbico suave)
    const getSmoothSerpentinePath = (rBase, amplitude, waves, nPts) => {
      let pts = [];
      for (let i = 0; i < nPts; i++) {
        const a = (i * 2 * Math.PI) / nPts;
        const rWave = rBase + Math.sin(a * waves) * amplitude;
        const x = cx + rWave * Math.cos(a);
        const y = cy + rWave * Math.sin(a);
        pts.push([x, y]);
      }
      let pathCmds = [`M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`];
      const len = pts.length;
      for (let i = 0; i < len; i++) {
        const p0 = pts[(i - 1 + len) % len];
        const p1 = pts[i];
        const p2 = pts[(i + 1) % len];
        const p3 = pts[(i + 2) % len];
        const cp1x = p1[0] + (p2[0] - p0[0]) / 6.0;
        const cp1y = p1[1] + (p2[1] - p0[1]) / 6.0;
        const cp2x = p2[0] - (p3[0] - p1[0]) / 6.0;
        const cp2y = p2[1] - (p3[1] - p1[1]) / 6.0;
        pathCmds.push(`C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`);
      }
      return pathCmds.join(" ") + " Z";
    };

    const venomPath = getSmoothSerpentinePath(radius * 1.12, 12, 8, 48);
    const innerPath = getSmoothSerpentinePath(radius * 1.05, 8, 8, 48);

    auraSvg = `
      <path d="${venomPath}" stroke="${gCol}" stroke-width="3" fill="none" filter="url(#sigilGlowFilter)" stroke-linecap="round" stroke-linejoin="round" />
      <path d="${innerPath}" stroke="${pCol}" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      <polygon points="${cx},${cy - radius - 28} ${cx - 10},${cy - radius - 14} ${cx + 10},${cy - radius - 14}" fill="${gCol}" stroke="${pCol}" stroke-width="1.5" />
      <circle cx="${cx - 4}" cy="${cy - radius - 18}" r="1.5" fill="#ffffff" />
      <circle cx="${cx + 4}" cy="${cy - radius - 18}" r="1.5" fill="#ffffff" />
    `; } else if (element === "Luz") {
    let sunburstPts = [];
    const nRays = 12;
    for (let i = 0; i < nRays * 2; i++) {
      const a = (i * Math.PI) / nRays - Math.PI / 2;
      const rCurr = (i % 2 === 0) ? (radius * 1.32) : (radius * 1.05);
      const x = cx + rCurr * Math.cos(a);
      const y = cy + rCurr * Math.sin(a);
      sunburstPts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    const sunburstPoly = sunburstPts.join(" ");

    auraSvg = `
      <polygon points="${sunburstPoly}" fill="none" stroke="${gCol}" stroke-width="2.5" filter="url(#sigilGlowFilter)" />
      <circle cx="${cx}" cy="${cy}" r="${radius * 1.05}" stroke="${pCol}" stroke-width="1.5" fill="none" />
      <circle cx="${cx}" cy="${cy}" r="${radius * 1.28}" stroke="${gCol}" stroke-width="1" opacity="0.6" fill="none" />
    `;
    } else if (element === "Hielo") {
    // 1. Cristales geométricos actuales (Superior e Inferior) + Anillo exterior
    const baseCrystals = `
      <polygon points="${cx},${cy-radius-25} ${cx+15},${cy-radius-10} ${cx},${cy-radius+5} ${cx-15},${cy-radius-10}" fill="rgba(144,224,239,0.25)" stroke="${gCol}" stroke-width="2" />
      <polygon points="${cx},${cy+radius-5} ${cx+15},${cy+radius+10} ${cx},${cy+radius+25} ${cx-15},${cy+radius+10}" fill="rgba(144,224,239,0.25)" stroke="${gCol}" stroke-width="2" />
      <circle cx="${cx}" cy="${cy}" r="${radius*1.15}" stroke="${gCol}" stroke-width="1.8" fill="none" filter="url(#sigilGlowFilter)" />
    `;

    // 2. Cristales coincidentes con las 5 puntas del pentáculo
    const rPent = radius * 1.08;
    let pentCrystals = [];
    for (let k = 0; k < 5; k++) {
      const a = (k * 2 * Math.PI) / 5 - Math.PI / 2;
      const px = cx + rPent * Math.cos(a);
      const py = cy + rPent * Math.sin(a);
      const pt_top = `${(px + 12 * Math.cos(a)).toFixed(1)},${(py + 12 * Math.sin(a)).toFixed(1)}`;
      const pt_bottom = `${(px - 8 * Math.cos(a)).toFixed(1)},${(py - 8 * Math.sin(a)).toFixed(1)}`;
      const pt_left = `${(px + 7 * Math.cos(a + Math.PI / 2)).toFixed(1)},${(py + 7 * Math.sin(a + Math.PI / 2)).toFixed(1)}`;
      const pt_right = `${(px + 7 * Math.cos(a - Math.PI / 2)).toFixed(1)},${(py + 7 * Math.sin(a - Math.PI / 2)).toFixed(1)}`;
      pentCrystals.push(`<polygon points="${pt_top} ${pt_right} ${pt_bottom} ${pt_left}" fill="rgba(255,255,255,0.4)" stroke="${gCol}" stroke-width="1.8" filter="url(#sigilGlowFilter)" />`);
    }

    // 3. Cristales en el centro del espacio entre puntas del pentáculo
    const rMid = radius * 0.88;
    let midCrystals = [];
    for (let k = 0; k < 5; k++) {
      const a = (k * 2 * Math.PI) / 5 - Math.PI / 2 + Math.PI / 5;
      const mx = cx + rMid * Math.cos(a);
      const my = cy + rMid * Math.sin(a);
      const pt_top = `${(mx + 9 * Math.cos(a)).toFixed(1)},${(my + 9 * Math.sin(a)).toFixed(1)}`;
      const pt_bottom = `${(mx - 6 * Math.cos(a)).toFixed(1)},${(my - 6 * Math.sin(a)).toFixed(1)}`;
      const pt_left = `${(mx + 5 * Math.cos(a + Math.PI / 2)).toFixed(1)},${(my + 5 * Math.sin(a + Math.PI / 2)).toFixed(1)}`;
      const pt_right = `${(mx + 5 * Math.cos(a - Math.PI / 2)).toFixed(1)},${(my + 5 * Math.sin(a - Math.PI / 2)).toFixed(1)}`;
      midCrystals.push(`<polygon points="${pt_top} ${pt_right} ${pt_bottom} ${pt_left}" fill="rgba(0,119,182,0.3)" stroke="#ffffff" stroke-width="1.5" />`);
    }

    auraSvg = `
      ${baseCrystals}
      ${pentCrystals.join("")}
      ${midCrystals.join("")}
    `; } else if (element === "Sombra") {
    auraSvg = `
      <circle cx="${cx}" cy="${cy}" r="${radius*1.25}" stroke="${gCol}" stroke-width="2" fill="none" filter="url(#sigilGlowFilter)" />
      <circle cx="${cx}" cy="${cy}" r="${radius*1.15}" stroke="${pCol}" stroke-width="1" fill="none" />
    `;
  } else {
    auraSvg = `
      <circle cx="${cx}" cy="${cy}" r="${radius*1.18}" stroke="${gCol}" stroke-width="1.5" fill="none" />
    `;
  }

  // Horn Flourishes (Centered at Sigil Core cx, cy)
  let hornSvg = "";
  if (horn === "horns-classic") {
    // 1. Cuernos Clásicos (Draco Clásico): Más chicos, sin relleno (fill="none")
    const leftHorn = `M ${(cx - radius * 0.55).toFixed(1)} ${(cy + radius * 0.40).toFixed(1)} C ${(cx - radius * 0.95).toFixed(1)} ${(cy + radius * 0.20).toFixed(1)} ${(cx - radius * 1.00).toFixed(1)} ${(cy - radius * 0.25).toFixed(1)} ${(cx - radius * 0.35).toFixed(1)} ${(cy - radius * 0.75).toFixed(1)} C ${(cx - radius * 0.55).toFixed(1)} ${(cy - radius * 0.42).toFixed(1)} ${(cx - radius * 0.48).toFixed(1)} ${(cy - radius * 0.03).toFixed(1)} ${(cx - radius * 0.22).toFixed(1)} ${(cy + radius * 0.35).toFixed(1)} Q ${(cx - radius * 0.38).toFixed(1)} ${(cy + radius * 0.43).toFixed(1)} ${(cx - radius * 0.55).toFixed(1)} ${(cy + radius * 0.40).toFixed(1)} Z`;
    const rightHorn = `M ${(cx + radius * 0.55).toFixed(1)} ${(cy + radius * 0.40).toFixed(1)} C ${(cx + radius * 0.95).toFixed(1)} ${(cy + radius * 0.20).toFixed(1)} ${(cx + radius * 1.00).toFixed(1)} ${(cy - radius * 0.25).toFixed(1)} ${(cx + radius * 0.35).toFixed(1)} ${(cy - radius * 0.75).toFixed(1)} C ${(cx + radius * 0.55).toFixed(1)} ${(cy - radius * 0.42).toFixed(1)} ${(cx + radius * 0.48).toFixed(1)} ${(cy - radius * 0.03).toFixed(1)} ${(cx + radius * 0.22).toFixed(1)} ${(cy + radius * 0.35).toFixed(1)} Q ${(cx + radius * 0.38).toFixed(1)} ${(cy + radius * 0.43).toFixed(1)} ${(cx + radius * 0.55).toFixed(1)} ${(cy + radius * 0.40).toFixed(1)} Z`;

    hornSvg = `
      <!-- Cuernos Clásicos: Más chicos y sin relleno -->
      <path d="${leftHorn}" stroke="${pCol}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" filter="url(#sigilGlowFilter)" />
      <path d="${rightHorn}" stroke="${pCol}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" filter="url(#sigilGlowFilter)" />
    `;
      } else if (horn === "horns-ram") {
    // 2. Cuernos de Carnero Grandes: Llegan hasta la periferia del círculo y se tocan al centro
    const makeSpiralPath = (centerX, isRight = false) => {
      let pts = [];
      const nSteps = 60;
      const maxTurns = 2.4 * 2 * Math.PI;
      for (let step = 0; step <= nSteps; step++) {
        const t = (step / nSteps) * maxTurns;
        const r = 5 + t * 4.4;
        const angle = isRight ? -t : t;
        const x = centerX + r * Math.cos(angle + Math.PI / 2);
        const y = cy - 10 + r * Math.sin(angle + Math.PI / 2);
        pts.push([x, y]);
      }
      let cmd = [`M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`];
      for (let p of pts.slice(1)) {
        cmd.push(`L ${p[0].toFixed(1)} ${p[1].toFixed(1)}`);
      }
      return cmd.join(" ");
    };

    const ramLeft = makeSpiralPath(cx - radius * 0.48, false);
    const ramRight = makeSpiralPath(cx + radius * 0.48, true);

    hornSvg = `
      <!-- Cuernos de Carnero Grandes: Hasta la periferia del círculo -->
      <path d="${ramLeft}" stroke="${pCol}" stroke-width="3.8" fill="none" stroke-linecap="round" stroke-linejoin="round" filter="url(#sigilGlowFilter)" />
      <path d="${ramRight}" stroke="${pCol}" stroke-width="3.8" fill="none" stroke-linecap="round" stroke-linejoin="round" filter="url(#sigilGlowFilter)" />
    `; } else if (horn === "horns-crown") {
    // 3. Corona de Espinas: De lado a lado del círculo, más grande, sin relleno, 5 puntas
    const rX = radius * 0.98;
    const crownPts = `${(cx - rX).toFixed(1)},${(cy + 10).toFixed(1)} ${(cx - rX).toFixed(1)},${(cy - 35).toFixed(1)} ${(cx - radius * 0.7).toFixed(1)},${(cy - 5).toFixed(1)} ${(cx - radius * 0.48).toFixed(1)},${(cy - 58).toFixed(1)} ${(cx - radius * 0.24).toFixed(1)},${(cy - 12).toFixed(1)} ${cx.toFixed(1)},${(cy - 78).toFixed(1)} ${(cx + radius * 0.24).toFixed(1)},${(cy - 12).toFixed(1)} ${(cx + radius * 0.48).toFixed(1)},${(cy - 58).toFixed(1)} ${(cx + radius * 0.7).toFixed(1)},${(cy - 5).toFixed(1)} ${(cx + rX).toFixed(1)},${(cy - 35).toFixed(1)} ${(cx + rX).toFixed(1)},${(cy + 10).toFixed(1)}`;
    hornSvg = `
      <path d="M ${crownPts.replace(/ /g, " L ")} Q ${cx.toFixed(1)} ${(cy + 35).toFixed(1)} ${(cx - rX).toFixed(1)} ${(cy + 10).toFixed(1)} Z" stroke="${pCol}" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round" filter="url(#sigilGlowFilter)" />
    `;
  } else if (horn === "horns-unicorn") {
    // 4. Cuerno Único de Cristal: De la base al tope del círculo, sin sobresalir, sin rellenar
    const yBase = cy + radius;
    const yTop = cy - radius;
    hornSvg = `
      <polygon points="${(cx - 15).toFixed(1)},${yBase.toFixed(1)} ${cx.toFixed(1)},${yTop.toFixed(1)} ${(cx + 15).toFixed(1)},${yBase.toFixed(1)}" fill="none" stroke="${pCol}" stroke-width="3" stroke-linejoin="round" filter="url(#sigilGlowFilter)" />
      <line x1="${cx.toFixed(1)}" y1="${yBase.toFixed(1)}" x2="${cx.toFixed(1)}" y2="${yTop.toFixed(1)}" stroke="${gCol}" stroke-width="1.8" />
      <line x1="${(cx - 12).toFixed(1)}" y1="${(cy + radius * 0.5).toFixed(1)}" x2="${(cx + 12).toFixed(1)}" y2="${(cy + radius * 0.35).toFixed(1)}" stroke="${gCol}" stroke-width="1.8" />
      <line x1="${(cx - 9).toFixed(1)}" y1="${cy.toFixed(1)}" x2="${(cx + 9).toFixed(1)}" y2="${(cy - radius * 0.15).toFixed(1)}" stroke="${gCol}" stroke-width="1.8" />
      <line x1="${(cx - 6).toFixed(1)}" y1="${(cy - radius * 0.4).toFixed(1)}" x2="${(cx + 6).toFixed(1)}" y2="${(cy - radius * 0.55).toFixed(1)}" stroke="${gCol}" stroke-width="1.8" />
    `;
  }

  // Anatomical Outer Shape
  let bodyOutline = "";
  if (body === "draco") {
    // Draco Clásico: Triángulo de escudo apuntando hacia abajo (contrario a cresta triangular)
    bodyOutline = `
      <polygon points="${(cx - radius - 10).toFixed(1)},${(cy - radius * 0.7).toFixed(1)} ${(cx + radius + 10).toFixed(1)},${(cy - radius * 0.7).toFixed(1)} ${cx.toFixed(1)},${(cy + radius + 15).toFixed(1)}" stroke="${pCol}" stroke-width="2.5" fill="none" stroke-linejoin="round" />
    `;
    } else if (body === "shen") {
    bodyOutline = `
      <!-- Primary Centered Outer Ring -->
      <circle cx="${cx}" cy="${cy}" r="${radius}" stroke="${pCol}" stroke-width="4.2" fill="none" />
      <!-- Centered Oriental Shen Serpentine Wave (Yin-Yang / Infinity S-curves con líneas más gruesas) -->
      <path d="M ${cx} ${cy - radius} C ${cx + radius * 0.7} ${cy - radius * 0.5} ${cx - radius * 0.7} ${cy + radius * 0.5} ${cx} ${cy + radius}" stroke="${pCol}" stroke-width="3.8" fill="none" filter="url(#sigilGlowFilter)" />
      <path d="M ${cx} ${cy - radius} C ${cx - radius * 0.7} ${cy - radius * 0.5} ${cx + radius * 0.7} ${cy + radius * 0.5} ${cx} ${cy + radius}" stroke="${gCol}" stroke-width="3.5" fill="none" filter="url(#sigilGlowFilter)" />
      <!-- Sacred Central Shen Core Ring -->
      <circle cx="${cx}" cy="${cy}" r="${radius * 0.45}" stroke="${pCol}" stroke-width="3.0" fill="none" />
    `; } else if (body === "wyvern") {
    bodyOutline = `
      <polygon points="${cx},${cy-radius-15} ${cx+radius+10},${cy+radius*0.7} ${cx-radius-10},${cy+radius*0.7}" stroke="${pCol}" stroke-width="2.5" fill="none" />
    `;
  } else if (body === "hidra") {
    bodyOutline = `
      <circle cx="${cx}" cy="${cy-25}" r="${radius*0.75}" stroke="${pCol}" stroke-width="2" fill="none" />
      <circle cx="${cx-35}" cy="${cy+25}" r="${radius*0.75}" stroke="${pCol}" stroke-width="2" fill="none" />
      <circle cx="${cx+35}" cy="${cy+25}" r="${radius*0.75}" stroke="${pCol}" stroke-width="2" fill="none" />
    `;
  } else if (body === "ampithere") {
    bodyOutline = `
      <path d="M ${cx-radius-20} ${cy} Q ${cx} ${cy-radius-30} ${cx+radius+20} ${cy} Q ${cx} ${cy+radius+30} ${cx-radius-20} ${cy}" stroke="${pCol}" stroke-width="2.5" fill="none" />
    `;
  } else {
    bodyOutline = `<circle cx="${cx}" cy="${cy}" r="${radius}" stroke="${pCol}" stroke-width="2.5" fill="none" />`;
  }

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="sigilGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Background Circle Shield -->
      <circle cx="${cx}" cy="${cy}" r="${radius*1.22}" stroke="rgba(255,215,0,0.3)" stroke-width="1.5" fill="rgba(0,0,0,0.25)" />

      <!-- Sacred Geometry Pentacle Background -->
      ${pentaclePath}

      <!-- Elemental Aura -->
      ${auraSvg}

      <!-- Anatomical Outer Frame -->
      ${bodyOutline}

      <!-- Central Horns -->
      ${hornSvg}

      <!-- Consonant Sigil Glyph Curve -->
      <path d="${glyphPath}" stroke="${pCol}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round" filter="url(#sigilGlowFilter)" />
      <path d="${glyphPath}" stroke="#ffffff" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Consonant Node Points & Runes -->
      ${points.map(pt => `
        <circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="10" fill="rgba(10,14,23,0.9)" stroke="${gCol}" stroke-width="2" />
        <circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="4" fill="${pCol}" />
        <text x="${pt.x.toFixed(1)}" y="${pt.y > cy ? pt.y + 24 : pt.y - 14}" fill="#ffd700" font-size="14" font-weight="bold" font-family="serif" text-anchor="middle">${pt.char}</text>
      `).join("")}

      <!-- Center Alchemical Seal -->
      <circle cx="${cx}" cy="${cy}" r="6" fill="#ffd700" stroke="${pCol}" stroke-width="1.5" />
    </svg>
  `;
}
