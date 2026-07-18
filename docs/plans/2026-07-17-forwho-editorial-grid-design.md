# Matriz editorial de ForWho

## Objetivo

Reemplazar la galería horizontal por una composición editorial de cuatro áreas que se diferencie claramente del carrusel de `Services`.

## Composición

- Desktop presenta los cuatro perfiles en una matriz 2×2.
- Una línea horizontal y otra vertical dividen la matriz desde el centro.
- Las áreas no usan fondos, radios ni sombras de card: la jerarquía depende de espacio, tipografía, iconos y divisores.
- Mobile apila los cuatro perfiles en una columna y usa separadores horizontales.

## Movimiento

- GSAP se ejecuta únicamente en desktop con altura suficiente y sin preferencia de movimiento reducido.
- La secuencia se reproduce automáticamente una sola vez cuando la matriz entra al viewport.
- No se usa pinning ni scrub: la navegación por ancla muestra la sección y dispara el reveal sin dejarla detenida en blanco.
- Mobile, viewports bajos y `prefers-reduced-motion` no reciben animación ni pinning.
- La animación usa transform y opacity; no modifica dimensiones durante el scroll.

## Verificación

- Validar la matriz en desktop y el apilado en 375 px y 768 px.
- Confirmar que mobile no crea ningún ScrollTrigger.
- Ejecutar `astro check`, `astro build` y `git diff --check`.
