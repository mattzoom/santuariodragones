import os, re

filepath = r'c:\Users\matia\Documents\proyectos antigravity\dragones\js\data\dragons.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

targets = [
    "Bahamut Abisal",
    "Bahamut abisal",
    "Cai Cai Vilu",
    "Caicai Vilu",
    "Caicai",
    "Ceto",
    "Naga Vasuki",
    "Naga vasuki",
    "Dragón de Hesperia",
    "Dragon de hespeira",
    "Dragon de Hesperia"
]

print("Buscando especímenes en dragons.js...")
for t in targets:
    if t.lower() in content.lower():
        print(f"Encontrada coincidencia para: {t}")

# Script específico para cambiar el tipo a "Drakón"
# Bahamut Abisal / Bahamut (id: 67 o similar)
# Caicai Vilu (id: 41)
# Ceto (id: 16)
# Naga Vasuki (id: 66 u otro)
# Dragón de Hesperia (id: 20)

def update_dragon_type(dragon_name, new_type="Drakón"):
    global content
    pattern = rf'(\{{[^}}]*?name:\s*"{dragon_name}"[^}}]*?type:\s*")[^"]+(")'
    def repl(m):
        print(f"Cambiado {dragon_name} -> {new_type}")
        return f'{m.group(1)}{new_type}{m.group(2)}'
    content = re.sub(pattern, repl, content, flags=re.IGNORECASE | re.DOTALL)

update_dragon_type("Bahamut Abisal")
update_dragon_type("Bahamut")
update_dragon_type("Caicai Vilu")
update_dragon_type("Caicai")
update_dragon_type("Ceto")
update_dragon_type("Naga Vasuki")
update_dragon_type("Vasuki")
update_dragon_type("Dragón de Hesperia")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Actualización completada en dragons.js")
