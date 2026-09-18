import os, re, sys

sys.stdout.reconfigure(encoding='utf-8')

root_dir = r'c:\Users\matia\Documents\proyectos antigravity\dragones'
dragons_file = os.path.join(root_dir, 'js', 'data', 'dragons.js')

def slugify(text):
    text = text.lower()
    replacements = {'á':'a', 'é':'e', 'í':'i', 'ó':'o', 'ú':'u', 'ñ':'n', 'ü':'u'}
    for k, v in replacements.items():
        text = text.replace(k, v)
    text = re.sub(r'[^a-z0-9]+', '-', text).strip('-')
    return text

with open(dragons_file, 'r', encoding='utf-8') as f:
    text = f.read()

blocks = re.split(r'\{\s*id:\s*', text)[1:]
dragons = []

for b in blocks:
    try:
        d_id = int(re.search(r'^(\d+)', b).group(1))
        name = re.search(r'name:\s*"([^"]+)"', b).group(1)
        title = re.search(r'title:\s*"([^"]+)"', b).group(1)
        dragons.append({'id': d_id, 'name': name, 'title': title, 'slug': slugify(name)})
    except Exception:
        pass

# Generate bilingual sitemap.xml with xhtml:link hreflang
sitemap_path = os.path.join(root_dir, 'sitemap.xml')
baseUrl = "https://santuariodragones.vercel.app"
today = "2026-09-18"

xml_lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">'
]

# 1. Main Home Pages
xml_lines.append(f'''  <url>
    <loc>{baseUrl}/</loc>
    <xhtml:link rel="alternate" hreflang="es" href="{baseUrl}/" />
    <xhtml:link rel="alternate" hreflang="en" href="{baseUrl}/en/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="{baseUrl}/" />
    <lastmod>{today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>{baseUrl}/assets/ui/hero_emblem.webp</image:loc>
      <image:title>Emblema del Santuario Secreto de Dragones</image:title>
      <image:caption>Santuario Secreto de Dragones - Enciclopedia Mítica y Sabiduría Draconiana</image:caption>
    </image:image>
  </url>''')

xml_lines.append(f'''  <url>
    <loc>{baseUrl}/en/</loc>
    <xhtml:link rel="alternate" hreflang="es" href="{baseUrl}/" />
    <xhtml:link rel="alternate" hreflang="en" href="{baseUrl}/en/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="{baseUrl}/" />
    <lastmod>{today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
    <image:image>
      <image:loc>{baseUrl}/assets/ui/hero_emblem.webp</image:loc>
      <image:title>Secret Sanctuary of Dragons Emblem</image:title>
      <image:caption>Secret Sanctuary of Dragons - Mythical Codex and Draconian Lore</image:caption>
    </image:image>
  </url>''')

# 2. Main Site Sections
site_sections = [
    ("arena.html", "0.9", "weekly"),
    ("coliseo.html", "0.85", "weekly"),
    ("magia-draconiana.html", "0.9", "weekly"),
    ("altar-draconiano.html", "0.85", "weekly"),
    ("altar-varita.html", "0.8", "monthly"),
    ("altar-pentaculo.html", "0.8", "monthly"),
    ("altar-espejo.html", "0.8", "monthly"),
    ("altar-dragonscript.html", "0.85", "weekly"),
    ("academia-draconiana.html", "0.9", "weekly"),
    ("academia-anillo-1.html", "0.8", "monthly"),
    ("academia-anillo-2.html", "0.8", "monthly"),
    ("academia-anillo-3.html", "0.8", "monthly"),
    ("academia-anillo-4.html", "0.8", "monthly"),
    ("academia-anillo-5.html", "0.8", "monthly"),
    ("forja-de-sigilos.html", "0.9", "weekly"),
    ("test-draconiano.html", "0.9", "weekly"),
    ("favoritos.html", "0.75", "weekly")
]

for sec, prio, freq in site_sections:
    xml_lines.append(f'''  <url>
    <loc>{baseUrl}/{sec}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="{baseUrl}/{sec}" />
    <xhtml:link rel="alternate" hreflang="en" href="{baseUrl}/en/{sec}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="{baseUrl}/{sec}" />
    <lastmod>{today}</lastmod>
    <changefreq>{freq}</changefreq>
    <priority>{prio}</priority>
  </url>''')
    xml_lines.append(f'''  <url>
    <loc>{baseUrl}/en/{sec}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="{baseUrl}/{sec}" />
    <xhtml:link rel="alternate" hreflang="en" href="{baseUrl}/en/{sec}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="{baseUrl}/{sec}" />
    <lastmod>{today}</lastmod>
    <changefreq>{freq}</changefreq>
    <priority>{prio}</priority>
  </url>''')

# 3. 103 Spanish SSG Pages /dragon/slug.html
for d in dragons:
    slug = d["slug"]
    es_url = f"{baseUrl}/dragon/{slug}.html"
    en_url = f"{baseUrl}/en/dragon/{slug}.html"
    img_url = f"{baseUrl}/assets/dragons/dragon_{d['id']}.webp"

    xml_lines.append(f'''  <url>
    <loc>{es_url}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="{es_url}" />
    <xhtml:link rel="alternate" hreflang="en" href="{en_url}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="{es_url}" />
    <lastmod>{today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
    <image:image>
      <image:loc>{img_url}</image:loc>
      <image:title>{d['name']} - {d['title']}</image:title>
      <image:caption>{d['name']} en el Santuario Secreto de Dragones</image:caption>
    </image:image>
  </url>''')

# 4. 103 English SSG Pages /en/dragon/slug.html
for d in dragons:
    slug = d["slug"]
    es_url = f"{baseUrl}/dragon/{slug}.html"
    en_url = f"{baseUrl}/en/dragon/{slug}.html"
    img_url = f"{baseUrl}/assets/dragons/dragon_{d['id']}.webp"

    xml_lines.append(f'''  <url>
    <loc>{en_url}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="{es_url}" />
    <xhtml:link rel="alternate" hreflang="en" href="{en_url}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="{es_url}" />
    <lastmod>{today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
    <image:image>
      <image:loc>{img_url}</image:loc>
      <image:title>{d['name']}</image:title>
      <image:caption>{d['name']} in the Secret Dragon Sanctuary</image:caption>
    </image:image>
  </url>''')

xml_lines.append('</urlset>')

with open(sitemap_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(xml_lines))

total_urls = 2 + len(site_sections) + len(dragons) * 2
print(f"Generado sitemap.xml exitosamente en {sitemap_path} con {total_urls} URLs bilingües con soporte xhtml:link hreflang.")
