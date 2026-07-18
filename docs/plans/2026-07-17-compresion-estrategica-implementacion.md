# Plan de implementación de la compresión estratégica

Este plan aplica el diseño aprobado en unidades revisables. La implementación debe conservar el sistema visual, las animaciones útiles y la accesibilidad mientras reduce la densidad editorial.

## Unidad 1 — Datos de marca y recorrido

**Objetivo:** establecer destinos reales y la nueva estructura narrativa.

- Actualizar `src/data/brand.ts`:
  - WhatsApp con mensaje prellenado: `https://wa.me/573045999963?text=Hola%2C%20quiero%20agendar%20una%20cita%20con%20Active%20Club.%20Me%20gustar%C3%ADa%20conocer%20qu%C3%A9%20opci%C3%B3n%20se%20adapta%20mejor%20a%20mis%20objetivos%20y%20recibir%20informaci%C3%B3n%20sobre%20los%20planes.`.
  - Instagram: `https://www.instagram.com/activeclub.col/`.
  - Navegación central: Método, Para quién, Servicios y Planes.
  - Nuevo asset de navegación: `logotipo-blanco.svg`.
- Actualizar `src/pages/index.astro`:
  - Eliminar importación y render de About.
  - Ordenar Hero → Problem → Method → ForWho → Services → Plans → FAQ → FinalCTA.
- Mantener `About.astro` sin borrar durante esta unidad para que el rollback sea simple; retirar el archivo solo después de confirmar que no tiene consumidores.

**Verificación:** todas las anclas apuntan a secciones existentes y los enlaces externos usan `noopener noreferrer` cuando abren una pestaña nueva.

## Unidad 2 — Header de tres pills

**Objetivo:** separar identidad, navegación y conversión.

- Reestructurar `src/components/layout/Header.astro`:
  - Pill izquierda con el logotipo blanco y enlace al Hero.
  - Pill central con cuatro destinos.
  - Pill derecha con “Agendar cita” hacia WhatsApp.
- Responsive:
  - Desktop: tres pills independientes.
  - Mobile: logo y CTA visibles; navegación dentro de un menú desplegable.
- Actualizar `src/scripts/animations/header.js`:
  - Conservar aparición después de la intro del Hero.
  - Mantener el Header disponible después de abandonar el Hero.
  - Cerrar el menú al elegir un enlace y con la tecla Escape.
  - Preservar `aria-expanded`, foco visible y movimiento reducido.

**Verificación:** navegación completa por teclado, sin foco oculto y sin solapamiento a 375 px.

## Unidad 3 — Promesa, problema y metodología

**Objetivo:** implementar el primer bloque de copy aprobado.

- Actualizar `Hero.astro`:
  - Reducir el rotador a cuatro verbos.
  - Reemplazar título, texto y CTA.
  - Mantener la introducción visual y el enlace secundario a Method.
- Actualizar `Problem.astro`:
  - Un párrafo y tres mensajes destacados.
  - Ajustar la animación solo si los selectores o la medición de líneas cambian.
- Actualizar `Method.astro`:
  - Integrar el posicionamiento esencial de About.
  - Reducir de seis a cuatro pasos.
  - Eliminar el CTA interno.
  - Mostrar cuatro cards horizontales con flechas en desktop.
  - Apilar cards con flechas descendentes en tablet y mobile.
  - Mantener el `<ol>` como fuente del orden semántico y marcar las flechas como decorativas.
- Revisar `src/scripts/animations/method.js` para que la entrada secuencial funcione con cuatro cards.

**Verificación:** lectura ordenada con CSS desactivado, flechas fuera del árbol accesible y comportamiento correcto con movimiento reducido.

## Unidad 4 — Identificación y servicios

**Objetivo:** reducir opciones sin perder cobertura.

- Actualizar `ForWho.astro`:
  - Reducir siete perfiles a cuatro contextos.
  - Eliminar cierre y CTA.
  - Reconstruir el loop del carrusel con la nueva colección.
- Actualizar `Services.astro`:
  - Reducir seis servicios a cuatro soluciones.
  - Eliminar CTA individuales.
  - Reconstruir el loop del carrusel y revisar controles laterales.
- Revisar scripts asociados para evitar índices o longitudes codificados.

**Verificación:** loops continuos sin saltos, contenido duplicado oculto para lectores de pantalla y controles utilizables con teclado.

## Unidad 5 — Planes, objeciones y cierre

**Objetivo:** llevar al visitante desde la decisión hasta WhatsApp.

- Actualizar `Plans.astro`:
  - Máximo tres beneficios por plan.
  - Una nota compartida que explique la cotización personalizada.
  - Un solo CTA hacia WhatsApp.
- Actualizar `Faq.astro`:
  - Reducir ocho preguntas a cuatro.
  - Mantener acordeones nativos y estados accesibles.
  - Adaptar la distribución a dos columnas de dos elementos en desktop.
- Actualizar `FinalCTA.astro`:
  - Un título, un texto de tranquilidad y un CTA.
  - Eliminar la afirmación extensa sobre recomendaciones.
- Simplificar `src/scripts/animations/finalcta.js` para la nueva cantidad de elementos y conservar `SplitText` solo donde aporte legibilidad.

**Verificación:** los tres momentos principales de conversión abren el mismo enlace oficial de WhatsApp.

## Unidad 6 — Validación integral

- Ejecutar `npm run build`.
- Ejecutar `git diff --check`.
- Revisar manualmente 375 px, 768 px, 1024 px y desktop.
- Verificar navegación por teclado y Escape en el menú mobile.
- Verificar `prefers-reduced-motion`.
- Confirmar ausencia de scroll horizontal y anclas obsoletas.
- Confirmar que WhatsApp e Instagram abren los destinos oficiales.

## Límites

- No publicar precios fijos.
- No agregar testimonios, servicios ni planes.
- No vectorizar el nuevo logotipo en esta iteración.
- No crear un WhatsApp FAB.
- No realizar commits sin una solicitud explícita.
