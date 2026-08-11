import os, re, shutil

root_dir = r'c:\Users\matia\Documents\proyectos antigravity\dragones'

with open(os.path.join(root_dir, 'index.html'), 'r', encoding='utf-8') as f:
    template = f.read()

# Build static section pages: magia-draconiana.html, test-draconiano.html, favoritos.html
sections = [
    {
        'file': 'magia-draconiana.html',
        'tab': 'magic',
        'title': 'Magia Draconiana | Santuario Secreto de Dragones',
        'desc': 'Explorá las leyes ancestrales de la magia draconiana, el ritual del bastón de equilibrio y la forja de sigilos sagrados.',
        'url': 'https://santuario-dragones.vercel.app/magia-draconiana.html'
    },
    {
        'file': 'test-draconiano.html',
        'tab': 'quiz',
        'title': 'Test Draconiano de Afinidad | Santuario Secreto de Dragones',
        'desc': 'Descubrí cuál de los 100 dragones legendarios es tu guardián y compañero espiritual según tus decisiones.',
        'url': 'https://santuario-dragones.vercel.app/test-draconiano.html'
    },
    {
        'file': 'favoritos.html',
        'tab': 'favorites',
        'title': 'Mis Dragones Favoritos | Santuario Secreto de Dragones',
        'desc': 'Tu guarida personal con los dragones que elegiste durante tu recorrido por el Santuario.',
        'url': 'https://santuario-dragones.vercel.app/favoritos.html'
    }
]

for sec in sections:
    html = template
    # Replace title & description & canonical
    html = re.sub(r'<title>.*?</title>', f'<title>{sec["title"]}</title>', html)
    html = re.sub(r'<meta name="description" content=".*?">', f'<meta name="description" content="{sec["desc"]}">', html)
    html = re.sub(r'<link rel="canonical" href=".*?">', f'<link rel="canonical" href="{sec["url"]}">', html)
    html = re.sub(r'<meta property="og:url" content=".*?">', f'<meta property="og:url" content="{sec["url"]}">', html)
    
    out_p = os.path.join(root_dir, sec['file'])
    with open(out_p, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Creada página estática de sección: {sec["file"]}')
