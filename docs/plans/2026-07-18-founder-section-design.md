# Diseño de la sección Founder

Founder incorporará una pausa editorial y humana dentro del recorrido de Active Club. La sección explicará quién está detrás de la marca y, cuando exista el contenido definitivo, contará su origen sin repetir la metodología ni los servicios.

## Decisiones aprobadas

| Tema | Decisión |
|---|---|
| Posición | Después de `Method` y antes de `ForWho`. |
| Recorrido | Hero → Problem → Method → **Founder** → ForWho → Services → Plans → FAQ → FinalCTA. |
| Tema visual | Dark, como continuación del capítulo de marca iniciado en Method. |
| Composición desktop | Dos columnas: contenido a la izquierda y retrato vertical a la derecha. |
| Composición mobile | Una columna: título y párrafos primero; imagen después. |
| Título | `Detrás de Active Club`. |
| Eyebrow | No se incluye. |
| Descripción | Dos párrafos editoriales explícitamente marcados como pendientes. |
| Imagen inicial | Placeholder visible con proporción 9:16. |
| Imagen definitiva | Fotografía real del fundador; queda fuera de esta primera implementación. |

## Contenido inicial

La primera versión mostrará estos textos para que nadie los confunda con copy definitivo:

1. `[Presentación del fundador pendiente.]`
2. `[Historia del origen de Active Club pendiente.]`

El primer párrafo se reemplazará posteriormente por una presentación humana del fundador. El segundo contará la situación concreta que dio origen a Active Club. Ninguno deberá convertirse en una hoja de vida ni duplicar los pasos explicados en Method.

## Composición visual

- Usar los tokens semánticos de `data-theme="dark"`; no introducir colores fijos ni tokens legacy.
- Mantener los gutters y la escala tipográfica de las secciones actuales.
- Alinear el contenido a la izquierda para diferenciar Founder de los encabezados centrados de Method y ForWho.
- Limitar el ancho de lectura de los párrafos para conservar entre 60 y 75 caracteres por línea en desktop.
- Reservar la relación `9 / 16` de la imagen desde el primer render para evitar cambios de layout.
- Separar visualmente Founder de Method mediante espacio y un divisor sutil, no mediante otro cambio de fondo.
- Permitir que el cambio de dark a light entre Founder y ForWho marque el regreso del relato de marca al contexto del visitante.

## Responsive y accesibilidad

- El orden del DOM será título, párrafos e imagen; CSS no alterará ese orden en mobile.
- El título será un `h2` asociado a la sección mediante `aria-labelledby`.
- El placeholder visual comunicará que la fotografía está pendiente sin simular una imagen real.
- La fotografía definitiva deberá declarar dimensiones, conservar 9:16 y tener un texto alternativo contextual.
- El contenido será completamente legible sin JavaScript.
- Cualquier reveal deberá respetar `prefers-reduced-motion` y dejar el contenido visible cuando el movimiento esté reducido.

## Fuera de alcance

- Redactar la biografía definitiva.
- Redactar la historia de origen de Active Club.
- Incorporar la fotografía real.
- Agregar CTA, redes sociales, credenciales o estadísticas.
- Modificar la navegación principal.

## Criterios de aceptación visual

- [ ] Founder aparece entre Method y ForWho.
- [ ] Method y Founder forman un capítulo dark coherente sin parecer una sola sección interminable.
- [ ] Desktop presenta texto a la izquierda e imagen 9:16 a la derecha.
- [ ] Mobile presenta título y párrafos antes de la imagen.
- [ ] No aparece eyebrow.
- [ ] Los dos párrafos y la imagen se reconocen claramente como placeholders.
- [ ] No existe scroll horizontal a 375 px.
- [ ] El cambio posterior a ForWho conserva un contraste claro entre dark y light.
