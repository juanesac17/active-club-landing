# Sección 3 — El Método / Diferenciadores · Design Doc

> Fecha: 2026-06-25 · Estado: aprobado, listo para implementar
> Componente: `src/components/sections/Method.astro`

## Objetivo

Responder la pregunta que deja la Sección 2 (_"¿Por qué Active Club es diferente?"_)
presentando los **3 pilares del método** como cards grandes, con una entrada
escalonada por scroll y un efecto de luz (spotlight) que sigue al cursor.

Mantiene el hilo narrativo: _"Tú tienes una meta. Yo tengo el método. Hablemos."_

## Decisiones clave

| Decisión | Elección | Razón |
|---|---|---|
| Mecánica de entrada | **Stagger por scroll** (no pinned/horizontal-scrub) | Coherente con `Problem.astro`; robusto en mobile; no rompe el ritmo vertical de la landing |
| Color del spotlight | **Verde acento `#75AE8B`** (no naranja) | El naranja queda reservado para el CTA de WhatsApp. Usarlo decorativo lo desgasta y compite con el botón. El verde es el acento general (bienestar) |
| Número fantasma | `01 / 02 / 03` **dentro de cada card** | Reusa el lenguaje visual del Hero (ghost numbers) y amarra la narrativa. El **título de la sección NO lleva número** (pedido explícito) |

## Layout

- Fondo dark, mismo patrón visual que `Problem` (tokens semánticos, BEM, CSS scoped).
- Encabezado de sección: eyebrow + título (sin número fantasma).
- Fila de 3 cards: grid de 3 columnas en desktop → 1 columna apilada en `< 768px`.
- Cards grandes y altas, llenan el ancho disponible.

## Anatomía de la card

```
┌─────────────────────────┐
│ 01            ← número fantasma (opacidad baja, lenguaje del Hero)
│                          │
│ EL MÉTODO     ← eyebrow verde (categoría)
│ Personalización real     ← título display, peso 700
│                          │
│ Cada sesión está         ← descripción, peso 300, opacidad reducida
│ diseñada para ti...      │
└─────────────────────────┘
```

Contenido (del doc §5 Sección 3, tal cual):

1. **Personalización real** — Cada sesión está diseñada para ti, tus metas y tu estado físico actual.
2. **Ciencia aplicada** — Cada ejercicio tiene una razón. El plan se construye con base en evidencia, no en tendencias.
3. **Ajuste continuo** — Se usan métodos de percepción de esfuerzo para ajustar la carga en cada sesión según cómo te sientes.

## Spotlight (luz que sigue al mouse)

- Capa de glow radial verde posicionada con custom props CSS `--mx` / `--my`
  (coordenadas del cursor relativas a la card).
- JS actualiza `--mx/--my` en `pointermove` solo mientras el cursor está sobre la card.
- Reposo: glow invisible. Hover: glow visible siguiendo el cursor + borde sutil que se intensifica.
- Técnica: `radial-gradient` + custom props → solo compositing, sin reflow. 60fps.

## Animación de entrada

- Script: `src/scripts/animations/method.js`, mismo molde que `problem.js`.
- `gsap.matchMedia()` (reduced-motion) + `gsap.context()` (cleanup) + `ScrollTrigger` `once: true`.
- Las 3 cards entran con fade + slide-up, stagger ~0.15s, al cruzar ~75% del viewport.

## Accesibilidad / robustez

- `prefers-reduced-motion: reduce`: cards visibles sin animar; el spotlight **no se monta**.
- Spotlight init solo con `matchMedia('(pointer: fine)')` → en touch no se gasta JS.
- Cards = contenido informativo, **no links** (el único CTA sigue siendo WhatsApp).
- Listeners con cleanup vía `gsap.context` / `mm.revert()`.

## Archivos

- `src/components/sections/Method.astro` — nuevo contenido (hoy vacío).
- `src/scripts/animations/method.js` — nuevo.
- `src/pages/index.astro` — montar `<Method />` después de `<Problem />`.
