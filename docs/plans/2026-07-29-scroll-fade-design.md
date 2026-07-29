# Scroll fade adaptativo

La página incorporará un difuminado decorativo fijo en el borde inferior del viewport. El efecto acompañará el recorrido visual, adaptará su color al contexto claro u oscuro de la sección activa y desaparecerá cuando el Footer entre en pantalla.

## Decisiones aprobadas

| Tema | Decisión |
|---|---|
| Alcance | Aplicar el efecto globalmente desde `BaseLayout`. |
| Componente | Aislar markup, estilos y observadores en `ScrollFade.astro`. |
| Posición | Fijar el fade en la parte inferior del viewport. |
| Tema | Usar negro sobre secciones dark y blanco sobre secciones light. |
| Detección | Observar una franja inferior del viewport mediante `IntersectionObserver`. |
| Footer | Ocultar el fade apenas el Footer intersecte el viewport. |
| Intro | Mantener el fade oculto mientras `html.intro-lock` esté activo. |
| Rendimiento | No usar listeners de scroll. |
| Accesibilidad | Tratar el efecto como decorativo, sin interacción ni exposición al árbol accesible. |

## Arquitectura

`ScrollFade.astro` se renderiza una sola vez desde `BaseLayout.astro`. El componente consulta las secciones directas de `<main>` que declaran `data-theme` y el único landmark `<footer>` de la página.

Un observador reducido a la franja inferior del viewport detecta los cambios de sección. Al cruzar un límite, el componente toma el tema de la sección que ocupa el borde inferior y actualiza `data-fade-theme`. Un segundo observador controla la visibilidad según la intersección del Footer.

## Presentación

- Altura responsive entre aproximadamente 4.5 y 7 rem.
- Dos capas de gradiente superpuestas permiten una transición limpia entre negro y blanco.
- El degradado no llega a opacidad total para no ocultar completamente contenido enfocable.
- `pointer-events: none` evita bloquear controles.
- Z-index menor que el Header fijo y que cualquier elemento en top layer.
- La transición se elimina con `prefers-reduced-motion: reduce`.

## Estados

| Estado | Resultado |
|---|---|
| `data-fade-theme="dark"` | Capa negra visible. |
| `data-fade-theme="light"` | Capa blanca visible. |
| `data-hidden` | Fade transparente. |
| `html.intro-lock` | Fade transparente aunque el Footer no esté visible. |

## Verificación

- [ ] `astro check` sin diagnósticos.
- [ ] Build estático exitoso.
- [ ] El fade permanece fijo y no captura eventos de puntero.
- [ ] Cambia de negro a blanco únicamente al cruzar límites temáticos.
- [ ] Desaparece al entrar el Footer y reaparece al salir hacia arriba.
- [ ] No aparece durante el gate inicial del Hero.
- [ ] No usa listeners de scroll.
- [ ] Reduced motion elimina las transiciones.
- [ ] No introduce overflow horizontal.

## Archivos

| Acción | Archivo | Responsabilidad |
|---|---|---|
| Crear | `src/components/layout/ScrollFade.astro` | Efecto visual y observadores. |
| Modificar | `src/layouts/BaseLayout.astro` | Montaje global del componente. |
