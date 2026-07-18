# Galería horizontal de ForWho

## Objetivo

Reemplazar el marquee automático de `ForWho` por una galería horizontal vinculada al scroll vertical. La sección permanece fijada durante el recorrido tanto en desktop como en mobile.

## Arquitectura

- Mantener el scroll nativo del documento; no incorporar `ScrollSmoother`.
- Fijar la sección completa con `ScrollTrigger` y animar únicamente su track interior.
- Calcular el desplazamiento desde `track.scrollWidth - viewport.clientWidth` para admitir cards y viewports de ancho variable.
- Renderizar una sola copia de cada perfil; ya no se necesita duplicar contenido para formar un loop.
- Encapsular inicialización y cleanup en `src/scripts/animations/forwho.js`.

## Comportamiento

- El movimiento usa `transform: translateX()` con `ease: none` y scrub suavizado.
- `invalidateOnRefresh` recalcula la distancia después de cambios de viewport.
- Desktop y mobile comparten el mismo patrón de pinning.
- Con `prefers-reduced-motion: reduce`, se desactiva el pinning y el track queda disponible como scroll horizontal nativo.
- El carrusel de `Services` no cambia.

## Verificación

- Comprobar tipos con `astro check`.
- Generar el sitio con `astro build`.
- Revisar que el diff no tenga errores de whitespace.
- La revisión visual final debe cubrir desktop, mobile y reduced motion.
