import os, re

root_dir = r'c:\Users\matia\Documents\proyectos antigravity\dragones'

with open(os.path.join(root_dir, 'index.html'), 'r', encoding='utf-8') as f:
    template = f.read()

subpages = [
    # Altar Tool Subpages
    {
        'file': 'altar-varita.html',
        'title': 'La Varita o Bastón Draconiano | Santuario de Dragones',
        'desc': 'Manual completo de confección, sintonización y medidas para tu varita o bastón de equilibrio draconiano.'
    },
    {
        'file': 'altar-pentaculo.html',
        'title': 'El Pentáculo de los 5 Elementos | Santuario de Dragones',
        'desc': 'Aprende a construir y consagrar el Pentáculo sagrado de los 5 elementos y la regla de oro de seguridad.'
    },
    {
        'file': 'altar-espejo.html',
        'title': 'El Espejo Mágico (Ojo de Dragón) | Santuario de Dragones',
        'desc': 'Construye tu propio Espejo Mágico u Ojo de Dragón para proteger tu altar y sintonizar la visión mística.'
    },
    {
        'file': 'altar-dragonscript.html',
        'title': 'El Escritura Secreta: Dragon Script | Santuario de Dragones',
        'desc': 'El sistema místico de escritura y traducción al lenguaje antiguo del dragón.'
    },
    # Academia Ring Subpages
    {
        'file': 'academia-anillo-1.html',
        'title': 'Academia: Anillo 1 - Código de Honor y Ética | Santuario de Dragones',
        'desc': 'Primer Anillo de la Academia Draconiana: El Código de Ética y Responsabilidad Mágica para jóvenes guardianes.'
    },
    {
        'file': 'academia-anillo-2.html',
        'title': 'Academia: Anillo 2 - Elementos y Direcciones | Santuario de Dragones',
        'desc': 'Segundo Anillo de la Academia Draconiana: Sintonía con los 4 Elementos y los Dragones Guardianes de los Puntos Cardinales.'
    },
    {
        'file': 'academia-anillo-3.html',
        'title': 'Academia: Anillo 3 - El Chamán Draconiano | Santuario de Dragones',
        'desc': 'Tercer Anillo de la Academia Draconiana: Sabiduría chamánica y plantas medicinales draconianas.'
    },
    {
        'file': 'academia-anillo-4.html',
        'title': 'Academia: Anillo 4 - Meditación y Comunicación | Santuario de Dragones',
        'desc': 'Cuarto Anillo de la Academia Draconiana: Técnicas de relajación y comunicación mental con tu dragón guardián.'
    },
    {
        'file': 'academia-anillo-5.html',
        'title': 'Academia: Anillo 5 - Consagración y Graduación | Santuario de Dragones',
        'desc': 'Quinto Anillo de la Academia Draconiana: Ritual final de graduación y consagración de herramientas sagradas.'
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
    print(f'Creada subpágina estática dedicada: {sp["file"]}')
