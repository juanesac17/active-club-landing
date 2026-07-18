# Marcas de agua editoriales

La identidad visual del Footer se extiende de forma contenida a `Problem` y `Services`. Ambas secciones usan recursos oficiales como capas decorativas de gran formato, parcialmente recortadas y con menor opacidad que el cierre de la página.

## Composición

- `Problem`: logotipo negro de gran formato sobre superficie clara, desplazado hacia la derecha.
- `Services`: logotipo blanco de gran formato sobre superficie oscura, desplazado hacia la izquierda.
- Las posiciones opuestas crean ritmo sin repetir exactamente la composición del Footer.
- La opacidad se mantiene entre 4 % y 6 % para no competir con títulos, texto o cards.

## Comportamiento

- Las capas son estáticas, no reciben eventos y quedan fuera del árbol accesible.
- El contenido conserva una capa superior explícita mediante `z-index`.
- Las secciones mantienen `overflow: hidden` para recortar el wordmark sin generar scroll horizontal.
- En mobile, el wordmark aumenta proporcionalmente para conservar su lectura abstracta sin saturar la pantalla.
