import os

filepath = r'c:\Users\matia\Documents\proyectos antigravity\dragones\js\data\dragons.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Dragón de Runas Antiguas (#100) -> Ampithere
print("Actualizando #100 Dragón de Runas Antiguas a tipo Ampithere...")
content = content.replace('name: "Dragón de Runas Antiguas", title: "El Sabio Eterno del Santuario", mythology: "Leyenda del Santuario", type: "Shen"', 'name: "Dragón de Runas Antiguas", title: "El Sabio Eterno del Santuario", mythology: "Leyenda del Santuario", type: "Ampithere"')

# 2. Chuvash Yish (#64) -> Shen
print("Actualizando #64 Chuvash Yish a tipo Shen...")
content = content.replace('name: "Chuvash Yish", title: "El Dragón Volador de Fuego", mythology: "Oriental (Asia)", type: "Ampithere"', 'name: "Chuvash Yish", title: "El Dragón Volador de Fuego", mythology: "Oriental (Asia)", type: "Shen"')

# 3. Naga Vasuki (#81) -> Basilisco
print("Actualizando #81 Naga Vasuki a tipo Basilisco...")
content = content.replace('name: "Naga Vasuki", title: "El Rey Dragón de la Cuerda Cósmica", mythology: "Hindú y Sudeste Asiático", type: "Drakón"', 'name: "Naga Vasuki", title: "El Rey Dragón de la Cuerda Cósmica", mythology: "Hindú y Sudeste Asiático", type: "Basilisco"')
content = content.replace('name: "Naga Vasuki", title: "El Rey Dragón de la Cuerda Cósmica", mythology: "Hindú y Sudeste Asiático", type: "Shen"', 'name: "Naga Vasuki", title: "El Rey Dragón de la Cuerda Cósmica", mythology: "Hindú y Sudeste Asiático", type: "Basilisco"')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("¡Éxito actualizando los 3 dragones!")
