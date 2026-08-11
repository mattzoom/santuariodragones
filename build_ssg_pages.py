import os, re, shutil

root_dir = r'c:\Users\matia\Documents\proyectos antigravity\dragones'
dragons_file = os.path.join(root_dir, 'js', 'data', 'dragons.js')
template_file = os.path.join(root_dir, 'index.html')
output_dir = os.path.join(root_dir, 'dragon')

if os.path.exists(output_dir):
    shutil.rmtree(output_dir)
os.makedirs(output_dir, exist_ok=True)

with open(dragons_file, 'r', encoding='utf-8') as f:
    text = f.read()

with open(template_file, 'r', encoding='utf-8') as f:
    html_template = f.read()

def slugify(text):
    text = text.lower()
    replacements = {'á':'a', 'é':'e', 'í':'i', 'ó':'o', 'ú':'u', 'ñ':'n', 'ü':'u'}
    for k, v in replacements.items():
        text = text.replace(k, v)
    text = re.sub(r'[^a-z0-9]+', '-', text).strip('-')
    return text

blocks = re.split(r'\{\s*id:\s*', text)[1:]
dragons = []

for b in blocks:
    try:
        d_id = int(re.search(r'^(\d+)', b).group(1))
        name = re.search(r'name:\s*"([^"]+)"', b).group(1)
        title = re.search(r'title:\s*"([^"]+)"', b).group(1)
        mythology = re.search(r'mythology:\s*"([^"]+)"', b).group(1)
        type_ = re.search(r'type:\s*"([^"]+)"', b).group(1)
        element = re.search(r'element:\s*"([^"]+)"', b).group(1)
        danger = int(re.search(r'danger:\s*(\d+)', b).group(1))
        habitat = re.search(r'habitat:\s*"([^"]+)"', b).group(1)
        ability = re.search(r'ability:\s*"([^"]+)"', b).group(1)
        weakness = re.search(r'weakness:\s*"([^"]+)"', b).group(1)
        scroll = re.search(r'scroll:\s*"([^"]+)"', b).group(1)
        
        dragons.append({
            'id': d_id, 'name': name, 'title': title, 'mythology': mythology,
            'type': type_, 'element': element, 'danger': danger,
            'habitat': habitat, 'ability': ability, 'weakness': weakness, 'scroll': scroll,
            'slug': slugify(name)
        })
    except Exception as e:
        print(f"Error parsing block: {e}")

print(f"Total dragones parseados: {len(dragons)}")

base_url = "https://santuario-dragones.vercel.app"

for d in dragons:
    slug = d['slug']
    img_url = f"{base_url}/assets/dragons/dragon_{d['id']}.jpg"
    page_url = f"{base_url}/dragon/{slug}.html"
    
    page_title = f"{d['name']} ({d['title']}) | Santuario de Dragones"
    meta_desc = f"{d['name']} es un dragón {d['type']} de {d['element']} de la mitología {d['mythology']}. Hábitat: {d['habitat']}. {d['scroll'][:140]}..."
    
    og_meta = f'''
  <!-- Custom SSG Open Graph & Meta Tags for {d['name']} -->
  <title>{page_title}</title>
  <meta name="description" content="{meta_desc}">
  <meta property="og:title" content="{d['name']} - {d['title']}">
  <meta property="og:description" content="{meta_desc}">
  <meta property="og:image" content="{img_url}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="900">
  <meta property="og:type" content="article">
  <meta property="og:url" content="{page_url}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{d['name']} | Santuario Secreto de Dragones">
  <meta name="twitter:description" content="{meta_desc}">
  <meta name="twitter:image" content="{img_url}">
  
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{d['name']} - {d['title']}",
    "description": "{meta_desc}",
    "image": "{img_url}",
    "author": {{
      "@type": "Person",
      "name": "Magus Dragus"
    }},
    "publisher": {{
      "@type": "Organization",
      "name": "Santuario Secreto de Dragones"
    }}
  }}
  </script>
'''

    stars = '⭐' * d['danger']
    
    # Epic Standalone Dragon Detail Page Layout
    dragon_detail_page_html = f'''
    <section class="dragon-detail-standalone-section" style="max-width: 900px; margin: 2rem auto; padding: 0 1rem;">
      <div style="margin-bottom: 1.5rem;">
        <a href="/" class="btn btn-secondary" style="text-decoration: none; display: inline-flex; align-items: center; gap: 8px; font-weight: 700; padding: 10px 18px;">
          ⬅️ Volver a la Enciclopedia
        </a>
      </div>

      <article class="fantasy-panel" style="padding: 2rem; border-radius: 20px; border: 2px solid var(--gold-main); background: rgba(12, 11, 20, 0.95); box-shadow: 0 10px 35px rgba(0,0,0,0.8);">
        
        <header style="text-align: center; margin-bottom: 2rem; border-bottom: 1px solid var(--border-panel); padding-bottom: 1.5rem;">
          <span class="badge" style="background: rgba(233,196,106,0.15); border: 1px solid var(--gold-main); color: var(--gold-main); padding: 6px 16px; border-radius: 20px; font-weight: 700; font-size: 0.95rem; text-transform: uppercase;">
            📜 Dragón #{d['id']} de 100
          </span>
          <h1 class="hero-title" style="font-size: 2.8rem; color: var(--gold-main); margin: 0.8rem 0 0.4rem 0; font-family: var(--font-heading);">{d['name']}</h1>
          <p class="hero-subtitle" style="font-size: 1.3rem; font-style: italic; color: var(--color-teal); margin: 0;">"{d['title']}"</p>
        </header>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; align-items: start;">
          
          <!-- Column 1: Image & Badges -->
          <div style="text-align: center;">
            <div style="aspect-ratio: 4 / 3; width: 100%; border-radius: 16px; overflow: hidden; border: 2px solid var(--gold-main); box-shadow: 0 8px 25px rgba(0,0,0,0.7); background: #0c0b14;">
              <img src="/assets/dragons/dragon_{d['id']}.jpg" alt="{d['name']}" style="width: 100%; height: 100%; object-fit: contain;" />
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 1.5rem;">
              <span class="badge" style="background: rgba(233,196,106,0.15); border: 1px solid var(--gold-main); color: var(--gold-main); padding: 10px; border-radius: 10px; font-weight: 700; text-align: left;">🏛️ Mitología: {d['mythology']}</span>
              <span class="badge" style="background: rgba(42,157,143,0.15); border: 1px solid var(--color-teal); color: var(--color-teal); padding: 10px; border-radius: 10px; font-weight: 700; text-align: left;">🐉 Tipo: {d['type']}</span>
              <span class="badge" style="background: rgba(231,111,81,0.15); border: 1px solid #e76f51; color: #e76f51; padding: 10px; border-radius: 10px; font-weight: 700; text-align: left;">🔥 Elemento: {d['element']}</span>
              <span class="badge" style="background: rgba(255,255,255,0.08); border: 1px solid #fff; color: #fff; padding: 10px; border-radius: 10px; font-weight: 700; text-align: left;">⚠️ Peligrosidad: {d['danger']}/5 ({stars})</span>
            </div>
          </div>

          <!-- Column 2: Data & Scroll -->
          <div>
            <div style="background: rgba(255,255,255,0.03); padding: 1.5rem; border-radius: 14px; border: 1px solid var(--border-panel); margin-bottom: 1.5rem;">
              <h3 style="color: var(--gold-main); margin-top: 0; font-size: 1.3rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.6rem;">📊 Datos de Combate & Hábitat</h3>
              <p style="margin: 0.8rem 0; font-size: 1rem;"><strong>🏡 Hábitat:</strong> <span style="color: var(--text-main);">{d['habitat']}</span></p>
              <p style="margin: 0.8rem 0; font-size: 1rem;"><strong>⚡ Habilidad Especial:</strong> <span style="color: var(--text-main);">{d['ability']}</span></p>
              <p style="margin: 0.8rem 0; font-size: 1rem;"><strong>🛡️ Debilidad:</strong> <span style="color: var(--text-main);">{d['weakness']}</span></p>
            </div>

            <div class="fantasy-panel" style="background: rgba(10,9,17,0.9); padding: 1.5rem; border-radius: 14px; border: 1px solid var(--gold-main);">
              <h3 style="color: var(--gold-main); margin-top: 0; font-size: 1.3rem; display: flex; align-items: center; gap: 8px;">
                📜 Pergamino de la Antigüedad
              </h3>
              <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-main); font-style: italic; margin-bottom: 0;">"{d['scroll']}"</p>
            </div>
          </div>

        </div>

        <footer style="margin-top: 2.5rem; text-align: center; border-top: 1px solid var(--border-panel); padding-top: 1.5rem;">
          <a href="/" class="btn btn-gold btn-lg" style="text-decoration: none; display: inline-block; font-size: 1.1rem; padding: 12px 28px;">
            📚 Volver al Catálogo de Dragones
          </a>
        </footer>

      </article>
    </section>
'''

    # Build pure static page replacing main section
    page_html = html_template
    
    # Absolute root paths
    page_html = page_html.replace('href="styles.css', 'href="/styles.css')
    page_html = page_html.replace('src="js/bundle.js', 'src="/js/bundle.js')
    
    # Inject OG meta tags
    page_html = page_html.replace('</head>', f'{og_meta}\n</head>')
    
    # Replace entire <main class="main-content"> ... </main> with the standalone detail page layout!
    main_regex = r'<main class="main-content">.*?</main>'
    page_html = re.sub(main_regex, f'<main class="main-content">{dragon_detail_page_html}</main>', page_html, flags=re.DOTALL)

    out_file = os.path.join(output_dir, f"{slug}.html")
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(page_html)

print(f"¡Éxito! Generadas 100 páginas de detalle estático limpias en /dragon/")
