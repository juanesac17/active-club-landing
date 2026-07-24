# Plan de implementación de Founder

Este plan incorpora la sección Founder con contenido biográfico aprobado y una fotografía todavía pendiente. La entrega se mantiene como un único trabajo funcional y revisable: datos, componente, integración, movimiento mínimo y verificación viajan juntos.

## Ruta rápida

1. Mantener el contenido editorial en un módulo tipado.
2. Renderizarlo desde el componente semántico y responsive.
3. Conservar la integración y el reveal compatible con movimiento reducido.
4. Ejecutar validaciones técnicas y visuales.

## Unidad 1 — Construir e integrar Founder

**Objetivo:** renderizar la sección en su posición aprobada, con la biografía e historia definitivas separadas de la UI y los comportamientos responsive definidos en el diseño.

### 1. Crear `src/data/founder.ts`

- Exportar `FOUNDER_DATA` con el título, la biografía y la historia aprobados.
- Definir una interfaz plana con propiedades de solo lectura.
- Mantener este módulo libre de estructura HTML y comportamiento visual.

### 2. Actualizar `src/components/sections/Founder.astro`

- Añadir una sección con:
  - `id="fundador"`.
  - `data-theme="dark"`.
  - `aria-labelledby="founder-title"`.
  - `h2` con el título obtenido desde `FOUNDER_DATA`.
  - Dos párrafos con la biografía y la historia obtenidas desde `FOUNDER_DATA`.
  - Un placeholder visual con proporción 9:16 y estado pendiente inequívoco.
- No añadir eyebrow, CTA, redes sociales ni estadísticas.
- Construir el layout con CSS local y tokens semánticos existentes:
  - Desktop: dos columnas, contenido a la izquierda y visual a la derecha.
  - Mobile: una columna en orden título → párrafos → visual.
- Reservar dimensiones mediante `aspect-ratio: 9 / 16` para prevenir CLS.
- Mantener una medida de lectura controlada y reutilizar la escala de espaciado y títulos de la landing.
- Incorporar un divisor sutil respecto de Method usando `--border-default`.

### 3. Conservar `src/scripts/animations/founder.js`

- Exportar `initFounder()` siguiendo las convenciones actuales:
  - Retorno temprano cuando la sección no exista.
  - Guardia `data-*` para impedir inicialización duplicada.
  - `gsap.matchMedia()` para distinguir movimiento permitido y reducido.
  - `gsap.context()` y cleanup mediante `revert()`.
  - `ScrollTrigger` de una sola ejecución.
- Mantener el movimiento deliberadamente simple:
  - Entrada breve del bloque de texto.
  - Entrada breve del placeholder visual.
  - Solo `opacity` y `transform`; no animar propiedades de layout.
- Con `prefers-reduced-motion: reduce`, dejar todos los elementos visibles y sin transformación.

### 4. Conservar la integración en `src/pages/index.astro`

- Importar `Founder.astro`.
- Renderizar `<Founder />` inmediatamente después de `<Method />` y antes de `<ForWho />`.
- No añadir Founder a la navegación principal: la sección genera confianza, pero no constituye uno de los destinos principales del recorrido comprimido.

## Sustitución futura de la fotografía

Cuando esté disponible la fotografía real:

- Sustituir el placeholder por una imagen optimizada mediante el pipeline de assets de Astro.
- Declarar `width`, `height`, `sizes` y texto alternativo contextual.
- Mantener la proporción 9:16 para evitar una regresión de layout.
- Revisar que la nueva extensión de los textos conserve párrafos de cuatro o cinco líneas como máximo.

## Verificación

### Automatizada

```bash
npx astro check
npm run build
git diff --check
```

No existe actualmente un runner de pruebas automatizadas para componentes. `astro check` y el build constituyen la validación estructural disponible para esta unidad.

### Manual

- Revisar 375 px, 768 px, 1024 px y desktop amplio.
- Confirmar texto a la izquierda e imagen a la derecha en desktop.
- Confirmar título y párrafos antes de la imagen en mobile.
- Verificar que el placeholder mantiene 9:16 y no provoca CLS.
- Confirmar ausencia de scroll horizontal.
- Comprobar contraste de título, cuerpo, divisor y placeholder sobre el tema dark.
- Probar con `prefers-reduced-motion: reduce`.
- Verificar que todo el contenido permanece visible con JavaScript desactivado.
- Confirmar la transición visual Method → Founder → ForWho.

## Archivos previstos

| Acción | Archivo | Responsabilidad |
|---|---|---|
| Crear | `src/data/founder.ts` | Contenido editorial tipado y separado de la UI. |
| Modificar | `src/components/sections/Founder.astro` | Render del contenido y responsive. |
| Sin cambios | `src/scripts/animations/founder.js` | Reveal progresivo y movimiento reducido. |
| Sin cambios | `src/pages/index.astro` | Integración en el recorrido. |

## Límite de revisión y rollback

La entrega debe permanecer en una sola unidad porque los datos y su render forman un único cambio editorial. El rollback consiste en eliminar `src/data/founder.ts` y restaurar los placeholders previos en `Founder.astro`; no requiere modificar otras secciones.

## Criterios de finalización

- [ ] Se cumplen todos los criterios del diseño aprobado.
- [ ] `npx astro check` finaliza sin errores.
- [ ] `npm run build` finaliza sin errores.
- [ ] `git diff --check` finaliza sin errores.
- [ ] La revisión responsive y de movimiento reducido queda registrada.
- [ ] Solo se incorporan las afirmaciones biográficas aprobadas por el usuario.
- [ ] La fotografía continúa representada por un placeholder inequívoco.
