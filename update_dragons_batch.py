import re

filepath = r'c:\Users\matia\Documents\proyectos antigravity\dragones\js\data\dragons.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fucanglong -> Fu-ts'an Lung
content = content.replace('name: "Fucanglong"', 'name: "Fu-ts\'an Lung"')

# 2. Yinglong -> Ying-lung y tipo Shen
content = content.replace('name: "Yinglong", title: "El Dragón Alado con Caimán", mythology: "Oriental (Asia)", type: "Dragón Europeo"', 'name: "Ying-lung", title: "El Dragón Alado con Caimán", mythology: "Oriental (Asia)", type: "Shen"')

# 3. Longwang -> Lung Wang
content = content.replace('name: "Longwang"', 'name: "Lung Wang"')

# 4. Quetzalcóatl -> element: "Naturaleza"
content = content.replace('name: "Quetzalcóatl", title: "La Serpiente Emplumada de la Mañana", mythology: "Mesoamericana y Sudamericana", type: "Ampithere", element: "Luz"', 'name: "Quetzalcóatl", title: "La Serpiente Emplumada de la Mañana", mythology: "Mesoamericana y Sudamericana", type: "Ampithere", element: "Naturaleza"')

# 5. Unificar Rayo -> Tormenta
rayo_count = content.count('element: "Rayo"')
print(f"Reemplazando {rayo_count} especímenes de 'Rayo' a 'Tormenta'")
content = content.replace('element: "Rayo"', 'element: "Tormenta"')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("¡Éxito actualizando todos los nombres, elementos y unificando Rayo -> Tormenta!")
