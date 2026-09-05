# -*- coding: utf-8 -*-
import os, sys, re

sys.stdout.reconfigure(encoding='utf-8')
root_dir = r'c:\Users\matia\Documents\proyectos antigravity\dragones'
template_file = os.path.join(root_dir, 'index.html')

with open(template_file, 'r', encoding='utf-8') as f:
    html_template = f.read()

# Base clean template stripping all duplicate head meta tags
clean_head_template = html_template
clean_head_template = re.sub(r'<title>.*?</title>\s*', '', clean_head_template)
clean_head_template = re.sub(r'<meta name="description" content=".*?">\s*', '', clean_head_template)
clean_head_template = re.sub(r'<link rel="canonical" href=".*?">\s*', '', clean_head_template)
clean_head_template = re.sub(r'<meta property="og:[^"]+" content=".*?">\s*', '', clean_head_template)
clean_head_template = re.sub(r'<meta name="twitter:[^"]+" content=".*?">\s*', '', clean_head_template)
clean_head_template = re.sub(r'<script type="application/ld\+json">.*?</script>\s*', '', clean_head_template, flags=re.DOTALL)

BASE_URL = "https://santuariodragones.vercel.app"

def make_meta(title, desc, page_path, img_path="assets/ui/hero_emblem.webp", is_article=False):
    page_url = f"{BASE_URL}/{page_path}".rstrip('/')
    if not page_path:
        page_url = f"{BASE_URL}/"
    full_img_url = f"{BASE_URL}/{img_path}"
    og_type = "article" if is_article else "website"
    return f'''  <title>{title}</title>
  <meta name="description" content="{desc}">
  <link rel="canonical" href="{page_url}">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:image" content="{full_img_url}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="900">
  <meta property="og:type" content="{og_type}">
  <meta property="og:url" content="{page_url}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{title}">
  <meta name="twitter:description" content="{desc}">
  <meta name="twitter:image" content="{full_img_url}">
  <!-- Structured Data JSON-LD for Search Engines -->
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "{title}",
    "url": "{page_url}",
    "description": "{desc}"
  }}
  </script>'''

def get_magic_sub_nav_html(activePage):
    return f'''
    <div class="margin-top-md magic-sub-nav">
      <a href="/magia-draconiana.html" class="chip {'active' if activePage == 'fundamentos' else ''}" style="font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; {'background: rgba(233,196,106,0.15);' if activePage != 'fundamentos' else ''}">📜 1. Fundamentos</a>
      <a href="/altar-draconiano.html" class="chip {'active' if activePage == 'altar' else ''}" style="font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; {'background: rgba(233,196,106,0.15);' if activePage != 'altar' else ''}">⚒️ 2. El Altar</a>
      <a href="/academia-draconiana.html" class="chip {'active' if activePage == 'academia' else ''}" style="font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; {'background: rgba(233,196,106,0.15);' if activePage != 'academia' else ''}">🎓 3. Academia (5 Anillos)</a>
      <a href="/forja-de-sigilos.html" class="chip {'active' if activePage == 'sigilos' else ''}" style="font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; {'background: rgba(233,196,106,0.15);' if activePage != 'sigilos' else ''}">🔮 4. Forja de Sigilos</a>
    </div>
'''

# Read magic.js content
with open(os.path.join(root_dir, 'js', 'views', 'magic.js'), 'r', encoding='utf-8') as f:
    magic_js = f.read()

def extract_between(text, start_marker, end_marker):
    s = text.find(start_marker)
    if s == -1: return ""
    e = text.find(end_marker, s + len(start_marker))
    if e == -1: return ""
    return text[s + len(start_marker):e]

# 1. Fundamentos HTML
raw_fundamentos = extract_between(magic_js, 'function renderFundamentosView(container) {\n  container.innerHTML = `', '`;\n}')
fundamentos_clean_html = raw_fundamentos.replace('${renderMagicSubNavHtml("fundamentos")}', get_magic_sub_nav_html("fundamentos"))

# 2. Altar Tools HTML Extraction
tools_html = {}
for t in ['varita', 'pentaculo', 'espejo', 'dragonscript']:
    s_marker = f'if (currentAltarTool === "{t}") {{\n    toolContentHtml = `'
    if s_marker not in magic_js:
        s_marker = f'else if (currentAltarTool === "{t}") {{\n    toolContentHtml = `'
    t_content = extract_between(magic_js, s_marker, '`;\n  }')
    tools_html[t] = t_content

# Clean dragonscript template literal
alphabet_buttons = "".join([
    f'''<button type="button" class="btn btn-secondary" onclick="if(window.playRuneSound) playRuneSound('{ch}')" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 8px; border-radius: 8px; min-width: 48px; border: 1px solid var(--border-panel); background: rgba(255,255,255,0.04);">
      <span style="font-size: 1.1rem; color: var(--gold-main); font-weight: bold;">{ch}</span>
    </button>''' for ch in "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
])

ds_clean = tools_html['dragonscript']
# Replace ${Object.keys(DRAGON_SCRIPT_MAP)...} block
ds_clean = re.sub(r'\$\{Object\.keys\(DRAGON_SCRIPT_MAP\)[\s\S]*?\.join\(""\)\}', alphabet_buttons, ds_clean)
tools_html['dragonscript'] = ds_clean

def make_altar_page_html(active_tool="varita"):
    subnav = get_magic_sub_nav_html("altar")
    tool_selector = f'''
      <div style="display: flex; justify-content: center; gap: 10px; margin: 1.5rem 0; flex-wrap: wrap;">
        <a href="/altar-varita.html" class="btn {'btn-gold' if active_tool == 'varita' else 'btn-secondary'}" style="text-decoration: none; padding: 8px 18px; font-weight: 700; font-size: 0.9rem;">
          ✨ Varita / Bastón
        </a>
        <a href="/altar-pentaculo.html" class="btn {'btn-gold' if active_tool == 'pentaculo' else 'btn-secondary'}" style="text-decoration: none; padding: 8px 18px; font-weight: 700; font-size: 0.9rem;">
          ⭐ Pentáculo 5 Elementos
        </a>
        <a href="/altar-espejo.html" class="btn {'btn-gold' if active_tool == 'espejo' else 'btn-secondary'}" style="text-decoration: none; padding: 8px 18px; font-weight: 700; font-size: 0.9rem;">
          👁️ Espejo Mágico
        </a>
        <a href="/altar-dragonscript.html" class="btn {'btn-gold' if active_tool == 'dragonscript' else 'btn-secondary'}" style="text-decoration: none; padding: 8px 18px; font-weight: 700; font-size: 0.9rem;">
          📜 Dragon Script
        </a>
      </div>
    '''
    content = tools_html.get(active_tool, tools_html['varita'])
    return f'''
    <div class="magic-section-wrapper" style="display: flex; flex-direction: column; gap: 2rem;">
      <div class="magic-hero fantasy-panel text-center" style="padding: 2.2rem; background: linear-gradient(135deg, rgba(233,196,106,0.15), rgba(200,85,61,0.15)); border: 2px solid var(--gold-main); border-radius: 20px;">
        <div class="quiz-step-tag" style="font-size: 0.95rem;">⚒️ El Taller del Mago ⚒️</div>
        <h2 class="panel-title margin-top-xs" style="color: var(--gold-main); font-size: 2.3rem;">El Altar y las Herramientas del Mago</h2>
        <p style="color: var(--text-main); font-size: 1.1rem; max-width: 800px; margin: 12px auto 0 auto; line-height: 1.6;">
          Elegí una de las 4 subsecciones de artefactos y saberes para aprender su confección, alfabetos y reglas mágicas:
        </p>
        {subnav}
        {tool_selector}
      </div>

      <!-- CONTENIDO DE LA HERRAMIENTA SELECCIONADA -->
      <div id="altar-tool-display">
        {content}
      </div>
    </div>
    '''

# 3. Rings HTML Extraction
rings_html = {}
for r in range(1, 6):
    s_marker = f'case {r}:\n      return `'
    r_content = extract_between(magic_js, s_marker, '`;\n    case')
    if not r_content:
        r_content = extract_between(magic_js, s_marker, '`;\n    default:')
    rings_html[r] = r_content

def make_academia_page_html(active_ring=1):
    subnav = get_magic_sub_nav_html("academia")
    ring_selector = f'''
      <div style="display: flex; justify-content: center; gap: 8px; margin: 1.5rem 0; flex-wrap: wrap;">
        <a href="/academia-anillo-1.html" class="btn {'btn-gold' if active_ring == 1 else 'btn-secondary'}" style="text-decoration: none; padding: 8px 16px; font-weight: 700; font-size: 0.9rem;">
          🌱 Anillo 1: Ética
        </a>
        <a href="/academia-anillo-2.html" class="btn {'btn-gold' if active_ring == 2 else 'btn-secondary'}" style="text-decoration: none; padding: 8px 16px; font-weight: 700; font-size: 0.9rem;">
          🌪️ Anillo 2: Elementos
        </a>
        <a href="/academia-anillo-3.html" class="btn {'btn-gold' if active_ring == 3 else 'btn-secondary'}" style="text-decoration: none; padding: 8px 16px; font-weight: 700; font-size: 0.9rem;">
          🌿 Anillo 3: Chamán
        </a>
        <a href="/academia-anillo-4.html" class="btn {'btn-gold' if active_ring == 4 else 'btn-secondary'}" style="text-decoration: none; padding: 8px 16px; font-weight: 700; font-size: 0.9rem;">
          🧘 Anillo 4: Meditación
        </a>
        <a href="/academia-anillo-5.html" class="btn {'btn-gold' if active_ring == 5 else 'btn-secondary'}" style="text-decoration: none; padding: 8px 16px; font-weight: 700; font-size: 0.9rem;">
          🎓 Anillo 5: Graduación
        </a>
      </div>
    '''
    content = rings_html.get(active_ring, rings_html[1])
    return f'''
    <div class="magic-section-wrapper" style="display: flex; flex-direction: column; gap: 2rem;">
      <div class="magic-hero fantasy-panel text-center" style="padding: 2.2rem; background: linear-gradient(135deg, rgba(233,196,106,0.15), rgba(138,43,226,0.15)); border: 2px solid var(--gold-main); border-radius: 20px;">
        <div class="quiz-step-tag" style="font-size: 0.95rem;">🎓 Centro de Maestría 🎓</div>
        <h2 class="panel-title margin-top-xs" style="color: var(--gold-main); font-size: 2.3rem;">La Academia Draconiana</h2>
        <p style="color: var(--text-main); font-size: 1.1rem; max-width: 800px; margin: 12px auto 0 auto; line-height: 1.6;">
          Avanzá paso a paso a través de los 5 Anillos Internos del Saber para dominar la concentración, los encantamientos, la sanación, la protección y el misticismo.
        </p>
        {subnav}
        {ring_selector}
      </div>

      <!-- CONTENIDO DEL ANILLO SELECCIONADO -->
      <div id="academia-ring-display">
        {content}
      </div>
    </div>
    '''

def make_magic_page(body_content):
    return f'''
      <!-- 4. MAGIA DRACONIANA SECTION -->
      <section id="section-magic" class="view-section active" style="display: block; max-width: 1000px; margin: 0 auto; padding: 1rem 0.5rem;">
        <div id="magic-container">
          {body_content}
        </div>
      </section>
'''

def build_page(file_name, title, desc, body_html, active_tab="magic", img="assets/ui/hero_emblem.webp"):
    meta = make_meta(title, desc, file_name, img)
    page = clean_head_template
    page = page.replace('</head>', f'{meta}\n</head>')
    page = re.sub(r'class="nav-tab active"', 'class="nav-tab"', page)
    page = page.replace(f'class="nav-tab" data-tab="{active_tab}"', f'class="nav-tab active" data-tab="{active_tab}"')
    
    main_regex = r'<main class="main-content">.*?</main>'
    page = re.sub(main_regex, f'<main class="main-content">\n{body_html}\n    </main>', page, flags=re.DOTALL)
    
    out_path = os.path.join(root_dir, file_name)
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(page)
    print(f"Generada: {file_name}")

# Build Fundamentos
build_page('magia-draconiana.html',
           'Magia Draconiana Ancestral: Fundamentos, Las 4 Leyes y Filosofía | Santuario de Dragones',
           'Descubrí los fundamentos de la magia draconiana ancestral, sus 4 leyes sagradas, la Regla de Oro y la traducción al escrito antiguo del dragón.',
           make_magic_page(fundamentos_clean_html), active_tab="magic")

# Build Altar Hub and Tools
build_page('altar-draconiano.html',
           'El Altar Draconiano y Herramientas Mágicas | Santuario de Dragones',
           'Aprendé a construir tu altar ritual draconiano, encontrar la varita o bastón de equilibrio y consagrar tus elementos sagrados.',
           make_magic_page(make_altar_page_html("varita")), active_tab="magic")

for tool_id, tool_name, tool_desc in [
    ('varita', 'La Varita o Bastón de Equilibrio', 'Manual completo de confección, sintonización y medidas para tu varita o bastón de equilibrio draconiano.'),
    ('pentaculo', 'El Pentáculo de los 5 Elementos', 'Aprende a construir y consagrar el Pentáculo sagrado de los 5 elementos y la regla de oro de seguridad.'),
    ('espejo', 'El Espejo Mágico u Ojo de Dragón', 'Construye tu propio Espejo Mágico u Ojo de Dragón para proteger tu altar y sintonizar la visión mística.'),
    ('dragonscript', 'Dragon Script: El Alfabeto Sagrado', 'El sistema místico de escritura y traducción al lenguaje antiguo del dragón.')
]:
    build_page(f'altar-{tool_id}.html', f'{tool_name} | Santuario de Dragones', tool_desc,
               make_magic_page(make_altar_page_html(tool_id)), active_tab="magic")

# Build Academia Hub and Rings
build_page('academia-draconiana.html',
           'Academia Draconiana: Los 5 Anillos del Conocimiento | Santuario de Dragones',
           'El camino de iniciación en la magia draconiana a través de los 5 Anillos del Conocimiento y la Sabiduría.',
           make_magic_page(make_academia_page_html(1)), active_tab="magic")

ring_info = [
    (1, 'Anillo 1: Código de Honor y Ética', 'Primer Anillo de la Academia Draconiana: El Código de Ética y Responsabilidad Mágica para jóvenes guardianes.'),
    (2, 'Anillo 2: Elementos y Guardianes Cardinales', 'Segundo Anillo de la Academia Draconiana: Sintonía con los 4 Elementos y los Dragones Guardianes de los Puntos Cardinales.'),
    (3, 'Anillo 3: El Chamán Draconiano y Medicina Sagrada', 'Tercer Anillo de la Academia Draconiana: Sabiduría chamánica y plantas medicinales draconianas.'),
    (4, 'Anillo 4: Meditación y Comunicación Mental', 'Cuarto Anillo de la Academia Draconiana: Técnicas de relajación y comunicación mental con tu dragón guardián.'),
    (5, 'Anillo 5: Consagración y Graduación', 'Quinto Anillo de la Academia Draconiana: Ritual final de graduación y consagración de herramientas sagradas.')
]

for r_num, r_title, r_desc in ring_info:
    build_page(f'academia-anillo-{r_num}.html', f'Academia: {r_title} | Santuario de Dragones', r_desc,
               make_magic_page(make_academia_page_html(r_num)), active_tab="magic")

print("¡Todas las páginas de Magia, Altar y Academia actualizadas limpiamente!")
