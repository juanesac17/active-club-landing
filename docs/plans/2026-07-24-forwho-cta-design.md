# CTA de conversión en ForWho

## Objetivo

Agregar un CTA de WhatsApp al final de la sección `ForWho` que aparezca después de completar el reveal editorial de divisores y perfiles.

## Diseño aprobado

- Reutilizar `Button.astro` con la variante `primary` y el enlace centralizado en `BRAND_DATA.links.contact.href`.
- Mover el subtítulo de la sección sobre el botón y agrupar ambos en un único bloque centrado debajo de la matriz editorial.
- Incorporar su entrada como último paso de la timeline GSAP existente, sin delays ni animaciones independientes.
- Revelar subtítulo y CTA simultáneamente animando el contenedor compartido con una transición breve de opacidad, desplazamiento vertical y escala.
- Mantener ambos visibles inmediatamente en móvil y cuando el usuario prefiera movimiento reducido.

## Verificación

- La timeline de escritorio debe revelar el CTA después del último perfil.
- El enlace debe abrir el contacto de WhatsApp configurado en los datos de marca.
- El CTA debe ser visible sin animación en móvil y con `prefers-reduced-motion`.
- El build de Astro debe finalizar correctamente.
