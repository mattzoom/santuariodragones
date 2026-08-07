# 🎨 Guía de Estilo Oficial e Instrucciones de Arte para Dragones

Este documento establece las reglas inmutables para la generación de imágenes de dragones del **Santuario Secreto de Dragones**, asegurando que cada ilustración respete tanto la **estética visual única** como las **características físicas y de contexto específicas** de cada dragón en la base de datos.

---

## 📐 1. Especificaciones Técnicas

- **Relación de Aspecto (Aspect Ratio)**: `4:3` (Horizontal / Landscape).
- **Resolución**: `1200 x 896 px`.
- **Encuadre**: Horizontal apaisado, figura del dragón centrada en pose heroica de cuerpo entero o 3/4 en su hábitat.
- **Sin Texto**: 100% libre de tipografías, logotipos o firmas (`no text, no watermark`).

---

## 🖌️ 2. Estilo Artístico Oficial (2D Animation cel-shading 90s-2000s)

- **Estilo**: Cartoon illustration style for 2D animation, Gravity Falls and modern mystery animated series aesthetic (Alex Hirsch style), clean confident linework with medium-thick bold outlines.
- **Proporciones**: Lightly stylized proportions — not cute, not grotesque, expressive balanced character design with mild asymmetry and quirky mystery charm.
- **Sombreado y Color**: Simple flat cel-shading, rich muted color palette with vibrant magical accents.
- **Expresión y Carácter**: Expressive, mysterious, and slightly whimsical facial expressions.
- **Estética**: Gravity Falls 2D animated show aesthetic, hand-drawn look, clean stylized background.

---

## 📋 3. Algoritmo Dinámico del Prompt con Atributos de la Base de Datos

Cada prompt se construye dinámicamente extrayendo los siguientes campos del dragón en `DRAGONS_DATA`:
1. `name`: Nombre del dragón.
2. `title`: Título legendario.
3. `type` / `svgType`: Anatomía (Wyrm, Draco, Wyvern, Shen, Hidra, Ampithere).
4. `element`: Elemento mágico (Fuego, Hielo, Rayo, Veneno, Sombra, Luz, Tierra, Magma).
5. `habitat`: Hábitat natural para el fondo.
6. `physicalDescription`: Descripción física detallada (color de escamas, ojos, cuernos, alas).

### Plantilla Maestra Dinámica:

```text
[NAME], [TITLE], [PHYSICAL_DESCRIPTION], [TYPE] dragon with [ELEMENT] powers in [HABITAT], 2D cartoon animation style inspired by Gravity Falls, clean confident linework with medium-thick bold outlines, lightly stylized proportions — expressive balanced character design with mild asymmetry and quirky mystery charm, simple flat cel-shading, rich muted color palette with vibrant magical accents, Gravity Falls 2D animated show aesthetic, clean stylized background matching [HABITAT], 4:3 landscape framing, no text
```

---

## 🐲 4. Ejemplo Práctico

Para **Níðhöggr** (Dragón #1):
```text
Níðhöggr, El Roedor de las Raíces del Mundo, massive wingless subterranean dark purple serpent wyrm dragon with dark crimson underbelly, razor-sharp fangs gnawing ancient roots, and glowing violet eyes, Wyrm dragon with Sombra powers in Niflheim icy underworld, 2D cartoon animation style inspired by Gravity Falls, clean confident linework with medium-thick bold outlines, lightly stylized proportions — expressive balanced character design with mild asymmetry and quirky mystery charm, simple flat cel-shading, rich muted color palette with vibrant magical accents, Gravity Falls 2D animated show aesthetic, clean stylized background matching Niflheim icy underworld, 4:3 landscape framing, no text
```
