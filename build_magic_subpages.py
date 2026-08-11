import os, re

root_dir = r'c:\Users\matia\Documents\proyectos antigravity\dragones'

with open(os.path.join(root_dir, 'index.html'), 'r', encoding='utf-8') as f:
    template = f.read()

subpages = [
    {
        'file': 'magia-draconiana.html',
        'sub': 'fundamentos',
        'title': 'Magia Draconiana: Fundamentos y Leyes | Santuario de Dragones',
        'desc': 'Descubrí los fundamentos de la magia draconiana ancestral, sus 4 leyes sagradas y la traducción al escrito antiguo del dragón.'
    },
    {
        'file': 'altar-draconiano.html',
        'sub': 'altar',
        'title': 'El Altar y Herramientas Mágicas | Santuario de Dragones',
        'desc': 'Aprendé a construir tu altar ritual draconiano, encontrar la varita o bastón de equilibrio y consagrar tus elementos.'
    },
    {
        'file': 'academia-draconiana.html',
        'sub': 'academia',
        'title': 'Academia Draconiana: Los 5 Anillos | Santuario de Dragones',
        'desc': 'El camino de iniciación en la magia draconiana a través de los 5 Anillos del Conocimiento y la Sabiduría.'
    },
    {
        'file': 'forja-de-sigilos.html',
        'sub': 'sigilos',
        'title': 'Forja de Sigilos Draconianos | Santuario de Dragones',
        'desc': 'Herramienta interactiva para diseñar, personalizar y descargar tu sigilo sagrado de protección draconiana.'
    }
]

for sp in subpages:
    html = template
    url = f"https://santuario-dragones.vercel.app/{sp['file']}"
    html = re.sub(r'<title>.*?</title>', f'<title>{sp["title"]}</title>', html)
    html = re.sub(r'<meta name="description" content=".*?">', f'<meta name="description" content="{sp["desc"]}">', html)
    html = re.sub(r'<link rel="canonical" href=".*?">', f'<link rel="canonical" href="{url}">', html)
    html = re.sub(r'<meta property="og:url" content=".*?">', f'<meta property="og:url" content="{url}">', html)
    
    out_p = os.path.join(root_dir, sp['file'])
    with open(out_p, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Creada subpágina estática de magia: {sp["file"]}')
