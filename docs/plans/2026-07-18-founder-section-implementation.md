# Plan de implementación de Founder

Este plan incorpora la sección Founder sin producir todavía contenido biográfico ni fotografía definitivos. La entrega se mantiene como un único trabajo funcional y revisable: componente, integración, movimiento mínimo y verificación viajan juntos.

## Ruta rápida

1. Crear el componente semántico y responsive.
2. Integrarlo entre Method y ForWho.
3. Añadir un reveal discreto compatible con movimiento reducido.
4. Ejecutar validaciones técnicas y visuales.

## Unidad 1 — Construir e integrar Founder

**Objetivo:** renderizar la nueva sección en su posición aprobada, con todos los placeholders y comportamientos responsive definidos en el diseño.

### 1. Crear `src/components/sections/Founder.astro`

- Añadir una sección con:
  - `id="fundador"`.
  - `data-theme="dark"`.
  - `aria-labelledby="founder-title"`.
  - `h2` con el texto `Detrás de Active Club`.
  - Dos párrafos con los placeholders editoriales aprobados.
  - Un placeholder visual con proporción 9:16 y estado pendiente inequívoco.
- No añadir eyebrow, CTA, redes sociales, estadísticas ni credenciales.
- Construir el layout con CSS local y tokens semánticos existentes:
  - Desktop: dos columnas, contenido a la izquierda y visual a la derecha.
  - Mobile: una columna en orden título → párrafos → visual.
- Reservar dimensiones mediante `aspect-ratio: 9 / 16` para prevenir CLS.
- Mantener una medida de lectura controlada y reutilizar la escala de espaciado y títulos de la landing.
- Incorporar un divisor sutil respecto de Method usando `--border-default`.

### 2. Crear `src/scripts/animations/founder.js`

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

### 3. Actualizar `src/pages/index.astro`

- Importar `Founder.astro`.
- Renderizar `<Founder />` inmediatamente después de `<Method />` y antes de `<ForWho />`.
- No añadir Founder a la navegación principal: la sección genera confianza, pero no constituye uno de los destinos principales del recorrido comprimido.

## Sustitución futura de placeholders

Cuando estén disponibles el contenido y la fotografía reales:

- Reemplazar únicamente los dos párrafos, sin cambiar la estructura del componente.
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
| Crear | `src/components/sections/Founder.astro` | Estructura, placeholders y responsive. |
| Crear | `src/scripts/animations/founder.js` | Reveal progresivo y movimiento reducido. |
| Modificar | `src/pages/index.astro` | Integración en el recorrido. |

## Límite de revisión y rollback

La entrega debe permanecer en una sola unidad porque el componente no tiene valor aislado sin su integración y verificación. El rollback consiste en eliminar `Founder.astro`, `founder.js` y retirar su importación y render de `index.astro`; no requiere modificar otras secciones ni datos compartidos.

## Criterios de finalización

- [ ] Se cumplen todos los criterios del diseño aprobado.
- [ ] `npx astro check` finaliza sin errores.
- [ ] `npm run build` finaliza sin errores.
- [ ] `git diff --check` finaliza sin errores.
- [ ] La revisión responsive y de movimiento reducido queda registrada.
- [ ] No se incorporan afirmaciones biográficas ni imágenes ficticias.
