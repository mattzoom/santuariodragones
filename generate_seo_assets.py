import os, re

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
        dragons.append({'id': d_id, 'name': name, 'slug': slugify(name)})
    except Exception:
        pass

# Generate sitemap.xml
sitemap_path = os.path.join(root_dir, 'sitemap.xml')
baseUrl = "https://santuario-dragones.vercel.app"

mythologies = [
    "Nórdica y Germánica", "Griega y Romana", "Oriental (Asia)", 
    "Celta y Británica", "Eslava y Este de Europa", "América Precolombina", 
    "Mesopotámica y Medio Oriente", "Hindú y Sudeste Asiático", 
    "Europea Continental", "Leyenda del Santuario"
]

elements = [
    "Fuego", "Agua", "Tierra", "Viento", "Rayo", "Hielo", 
    "Veneno", "Sombra", "Luz", "Magma", "Tormenta", "Cristal", "Naturaleza"
]

xml_lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
]

# Main page
xml_lines.append(f'  <url><loc>{baseUrl}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>')

# Mythology URLs
for m in mythologies:
    encoded_m = m.replace(" ", "%20")
    xml_lines.append(f'  <url><loc>{baseUrl}/?mitologia={encoded_m}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>')

# Element URLs
for e in elements:
    encoded_e = e.replace(" ", "%20")
    xml_lines.append(f'  <url><loc>{baseUrl}/?elemento={encoded_e}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>')

# Static SSG Dragon Pages /dragon/slug.html
for d in dragons:
    xml_lines.append(f'  <url><loc>{baseUrl}/dragon/{d["slug"]}.html</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>')

xml_lines.append('</urlset>')

with open(sitemap_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(xml_lines))

print(f"Generado sitemap.xml exitosamente en {sitemap_path} con {len(dragons)} URLs SSG estáticas.")
