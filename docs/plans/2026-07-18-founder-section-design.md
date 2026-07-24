# Diseño de la sección Founder

Founder incorpora una pausa editorial y humana dentro del recorrido de Active Club. La sección explica quién está detrás de la marca y cuenta su origen en primera persona, sin repetir la metodología ni los servicios.

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
| Descripción | Dos párrafos editoriales en primera persona: biografía del fundador e historia de la marca. |
| Fuente de datos | Módulo tipado `src/data/founder.ts`, separado del componente visual. |
| Imagen inicial | Placeholder visible con proporción 9:16. |
| Imagen definitiva | Fotografía real del fundador; queda fuera de esta primera implementación. |

## Contenido aprobado

La sección mostrará estos textos desde la voz de Juan Esteban Arias:

1. `Mi nombre es Juan Esteban Arias, soy el fundador de Active Club y profesional en Entrenamiento Deportivo de la Universidad de Antioquia. Mi trabajo se enfoca en crear procesos responsables, personalizados y adaptados a las necesidades de cada persona, entendiendo la salud, el movimiento y el rendimiento como partes de un mismo proceso.`
2. `Fundé Active Club en 2024 con el propósito de ofrecer un acompañamiento más humano, profesional y cercano. Desde Active Club, ayudo a las personas a mejorar su salud, bienestar y rendimiento deportivo mediante una planificación segura, progresiva y orientada a resultados reales y sostenibles.`

El primer párrafo presenta al fundador y su enfoque profesional. El segundo cuenta el propósito que dio origen a Active Club. El contenido vive fuera de la UI para que pueda evolucionar sin modificar la estructura del componente.

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

- Incorporar la fotografía real.
- Agregar CTA, redes sociales o estadísticas.
- Modificar la navegación principal.

## Criterios de aceptación visual

- [ ] Founder aparece entre Method y ForWho.
- [ ] Method y Founder forman un capítulo dark coherente sin parecer una sola sección interminable.
- [ ] Desktop presenta texto a la izquierda e imagen 9:16 a la derecha.
- [ ] Mobile presenta título y párrafos antes de la imagen.
- [ ] No aparece eyebrow.
- [ ] La biografía y la historia se leen en primera persona.
- [ ] El contenido editorial se obtiene desde `src/data/founder.ts`.
- [ ] La imagen se reconoce claramente como placeholder.
- [ ] No existe scroll horizontal a 375 px.
- [ ] El cambio posterior a ForWho conserva un contraste claro entre dark y light.
