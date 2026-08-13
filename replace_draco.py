import os

filepath = r'c:\Users\matia\Documents\proyectos antigravity/dragones/js/data/dragons.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

count = content.count('"Draco"')
print(f'Menciones de "Draco": {count}')

updated = content.replace('"Draco"', '"Dragón Europeo"')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(updated)

print('Éxito reemplazando "Draco" por "Dragón Europeo" en dragons.js')
