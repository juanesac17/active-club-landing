# Tarjetas 3D para la sección de planes

La sección Plans reemplazará la tabla comparativa y los diálogos por un grid de cuatro tarjetas con dos caras. El objetivo es mostrar toda la información disponible sin recortarla, mantener una jerarquía comercial clara y evitar una segunda capa redundante de detalle.

## Decisiones aprobadas

| Tema | Decisión |
|---|---|
| Estructura | Mostrar los cuatro planes en un grid 2×2 en desktop y una columna en móvil. |
| Componente | Cada plan será una tarjeta con cara frontal y trasera dentro del mismo `article`. |
| Detalle | Eliminar los diálogos; la cara trasera contendrá toda la información ampliada. |
| Desktop | Girar la tarjeta al entrar con un puntero preciso y restaurarla al salir. |
| Móvil | Activar el mismo giro 3D mediante “Mostrar más detalles”. |
| Retorno móvil | Incluir “Volver al resumen” en la misma posición de la acción frontal. |
| Conversión | Ubicar el CTA personalizado de WhatsApp en la cara trasera. |
| Recomendación | Mantener Active como plan recomendado en ambas caras. |
| Movimiento reducido | Sustituir el giro por un cambio de cara inmediato. |

## Jerarquía visual

### Cara frontal

1. Etiqueta “Recomendado” cuando corresponda, sin rótulo “Resumen”.
2. Nombre del plan.
3. Precio mensual en COP.
4. Frase que resume el enfoque.
5. Lista completa de prestaciones.
6. Botón “Mostrar más detalles” en móvil y dispositivos táctiles.

### Cara trasera

1. Etiqueta “Recomendado” cuando corresponda.
2. Logo horizontal de Active Club centrado; el nombre del plan se conserva de forma semántica para tecnologías de asistencia.
3. Descripción completa.
4. Bloque “Recomendado para”.
5. CTA “Quiero este plan” con el enlace de WhatsApp específico.
6. Botón “Volver al resumen” en móvil y dispositivos táctiles.

Active conservará una señal textual y un tratamiento de borde destacado. La recomendación no dependerá únicamente del color. Las tarjetas normales usan el borde neutro de 4 px vigente y Active uno verde de 3 px.

Solo Active utilizará un degradado diagonal de 145 grados desde la superficie neutra hacia un 9 % de verde de marca. Las demás tarjetas conservarán una superficie neutra para reforzar la jerarquía del plan recomendado.

## Dimensiones y composición

Las tarjetas no usarán una altura fija de 300 px. El contenedor interno empleará dos caras superpuestas mediante CSS Grid para que ambas participen en el cálculo del tamaño. La tarjeta adoptará la altura necesaria para su cara con mayor contenido, evitando recortes y scroll interno.

Las tarjetas de una misma fila tendrán igual altura. En móvil, cada tarjeta conservará su tamaño determinado por el contenido y ocupará todo el ancho disponible.

## Modelo de interacción

La interacción se adaptará al método de entrada sin cambiar el lenguaje visual:

- Un puntero preciso activa el giro al entrar en la tarjeta y lo revierte al salir.
- Un dispositivo táctil activa y revierte el giro mediante botones explícitos.
- Un usuario de teclado dispone de un control de detalle que se hace visible al recibir foco, aunque no permanezca visible para usuarios de mouse en desktop.
- Al abrir mediante teclado, el foco pasa a una acción operable de la cara trasera.
- “Volver al resumen” restaura la cara frontal y devuelve el foco al control de apertura.
- `Escape` restaura la cara frontal cuando el giro fue activado de forma persistente.

El estado se representará mediante `data-flipped`. El script sincronizará `aria-hidden` e `inert` para impedir que la cara oculta sea recorrida o anunciada por tecnologías de asistencia.

## Movimiento

La animación normal se limitará a `transform: rotateY(180deg)`:

- Duración aproximada: 360 ms.
- Easing: curva de desaceleración suave, sin rebote.
- Perspectiva aplicada al contenedor exterior.
- `transform-style: preserve-3d` en el contenedor interno.
- `backface-visibility: hidden` en ambas caras.
- Sin animaciones de tamaño, posición de layout o sombra.

Con `prefers-reduced-motion: reduce`, no se ejecutará una rotación acelerada. La cara activa cambiará de forma inmediata mediante visibilidad y estado semántico.

## Datos y conversión

`src/data/plans.ts` seguirá siendo la fuente única para nombres, precios, enfoque, prestaciones, descripción, recomendaciones y CTA. No se duplicará contenido dentro del componente.

Cada CTA reutilizará `plan.cta.href`, que ya contiene el mensaje de WhatsApp personalizado para el plan correspondiente.

## Cambios de implementación previstos

| Acción | Archivo | Responsabilidad |
|---|---|---|
| Modificar | `src/components/sections/Plans.astro` | Sustituir tabla y diálogos por las tarjetas, estilos 3D e interacción adaptativa. |
| Preservar | `src/data/plans.ts` | Mantener los cuatro planes y sus enlaces personalizados como fuente única. |
| Modificar | `src/styles/global.css` | Eliminar el bloqueo de scroll del diálogo si queda sin referencias. |
| Crear | `docs/plans/2026-07-30-plans-flip-cards-design.md` | Registrar el diseño aprobado y sus criterios. |

No se eliminarán archivos de producción ni se modificarán otras secciones de la landing.

## Verificación

- [ ] Los cuatro planes aparecen como tarjetas y conservan todo su contenido.
- [ ] El grid usa dos columnas en desktop y una columna en móvil.
- [ ] Hover gira y revierte cada tarjeta de manera independiente.
- [ ] Los botones móviles giran y restauran la tarjeta correcta.
- [ ] La navegación por teclado permite abrir, recorrer y cerrar cada reverso.
- [ ] La cara inactiva queda fuera del árbol interactivo.
- [ ] Active muestra “Recomendado” y conserva su jerarquía en ambas caras.
- [ ] Cada CTA genera el mensaje de WhatsApp correspondiente.
- [ ] `prefers-reduced-motion` produce un cambio inmediato, sin giro.
- [ ] No existe contenido recortado, scroll interno ni overflow horizontal desde 320 px.
- [ ] El contenido sigue siendo operable con zoom del 200 %.
- [ ] `astro check`, build estático y `git diff --check` finalizan correctamente.
