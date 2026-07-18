# Header unificado

El Header agrupa el logotipo y la navegación principal dentro de una única pill oscura. El CTA de WhatsApp permanece separado para conservar su jerarquía de conversión.

## Comportamiento

- Desktop: logotipo, separador y enlaces comparten una pill; “Agendar cita” usa una pill de acción independiente.
- Mobile: la pill principal contiene el logotipo y el botón de menú; el CTA permanece visible.
- Scroll: solo la pill de navegación aumenta su opacidad. El CTA conserva siempre fondo naranja y texto negro.
- Accesibilidad: se mantienen foco visible, `aria-expanded`, cierre con Escape y targets táctiles mínimos.

## Validación

- Contraste legible del CTA sobre secciones claras y oscuras.
- Sin solapamientos a 375 px.
- Navegación por teclado y menú mobile sin regresiones.
- `astro check`, build y `git diff --check` exitosos.
