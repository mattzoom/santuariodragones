import re

filepath = r'c:\Users\matia\Documents\proyectos antigravity\dragones\js\data\dragons.js'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Extraer objetos de dragones mediante regex
pattern = r'\{\s*id:\s*(\d+),\s*name:\s*"([^"]+)",[^}]*?type:\s*"([^"]+)",\s*element:\s*"([^"]+)"'
matches = re.findall(pattern, content)

print(f"Total dragones encontrados: {len(matches)}\n")

output_lines = []
output_lines.append("| # | Nombre del Dragón | Tipo de Cuerpo | Elemento Principal |")
output_lines.append("|---|---|---|---|")

for dragon_id, name, d_type, element in sorted(matches, key=lambda x: int(x[0])):
    output_lines.append(f"| **#{dragon_id}** | {name} | {d_type} | {element} |")

with open('listado_dragones.md', 'w', encoding='utf-8') as out_f:
    out_f.write("\n".join(output_lines))

print("Listado generado en listado_dragones.md!")
