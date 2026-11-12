# Diseño de la sección Equipo

Equipo presenta a las cuatro personas que forman Active Club, incluido el fundador. La sección continúa el relato humano de Founder: Founder cuenta la historia y la visión; Equipo muestra quiénes acompañan el proceso. La interacción se inspira en el componente "Team Showcase" de Framer: un acordeón de paneles con foto donde un integrante se expande y los demás quedan contraídos.

## Decisiones aprobadas

| Tema | Decisión |
|---|---|
| Posición | Después de `Founder` y antes de `ForWho`. |
| Recorrido | Hero → Problem → Method → Founder → **Equipo** → ForWho → Services → Plans → FAQ → FinalCTA. |
| Ancla | `id="equipo"`. |
| Tema visual | Dark, como continuación de Founder; separación mediante el mismo `border-top` del contenedor interno. |
| Integrantes | 4. El fundador es el primero y aparece abierto por defecto. |
| Contenido inicial | Juan Esteban con su foto actual; tres placeholders con texto de ejemplo. |
| Fuente de datos | Módulo tipado `src/data/team.ts`, separado del componente visual. |
| Colores de paneles | Solo negro y blanco, alternados por posición: negro, blanco, negro, blanco. |
| Placeholder sin foto | Panel con iniciales grandes; no se agregan imágenes falsas al repositorio. |
| Interacción | Clic y hover (desktop) abren un panel; solo uno abierto a la vez. |
| Mobile | Paneles apilados en vertical; tocar una franja la expande. |

## Datos

```ts
interface TeamMember {
  readonly name: string;
  readonly role: string;
  readonly description: string;
  readonly image?: ImageMetadata;
}
```

- El color no forma parte de los datos: se deriva de la posición (impar → negro, par → blanco).
- `image` es opcional. Sin imagen, el panel muestra las iniciales del nombre.
- Reemplazar placeholders por datos reales solo requiere editar `team.ts` y agregar fotos en `src/assets/images/`.

## Composición visual

- Encabezado alineado a la izquierda, con la misma escala tipográfica que el título de Founder.
- Desktop (≥ 900px): fila de 4 paneles con altura `clamp(28rem, 70vh, 42rem)`. Panel abierto con `flex-grow: 3`; cerrados con `flex-grow: 1`. Transición de `flex-grow` de 0.5 s con curva `cubic-bezier(.44, 0, .56, 1)`.
- Panel abierto: foto (o iniciales), nombre grande, rol y descripción. El texto aparece con un fundido corto después de expandirse.
- Panel cerrado: solo el nombre, girado en vertical.
- Panel negro: `--color-black` con texto blanco y borde `--border-default` para distinguirlo del fondo de la sección.
- Panel blanco: `--color-white` con texto negro.
- Las fotos se cubren con `object-fit: cover` y un degradado inferior que asegura el contraste del texto.

## Responsive

- Mobile (< 900px): columna. Los paneles cerrados son franjas horizontales bajas con el nombre; el abierto crece hacia abajo mostrando foto, rol y descripción.
- Sin scroll horizontal en ningún ancho.

## Accesibilidad

- Cada panel tiene un `<button>` disparador con `aria-expanded` y `aria-controls` apuntando a su contenido.
- Navegación con Tab; apertura con Enter o Espacio.
- Los contenidos cerrados usan `hidden`/`inert` equivalente para no ser leídos ni enfocados.
- `alt` descriptivo en fotos reales; las iniciales del placeholder son decorativas (`aria-hidden`).
- Con `prefers-reduced-motion: reduce` el cambio de panel ocurre sin transición.
- Sin JavaScript: el fundador se ve abierto y el contenido de los demás permanece en el HTML.

## Animación

- Archivo nuevo `src/scripts/animations/team.js` con el patrón de `founder.js`: guardia de doble inicialización, `gsap.matchMedia()` con rama de movimiento reducido y `ScrollTrigger` con `once: true`.
- Entrada: encabezado y paneles con `stagger` al entrar en viewport.
- La lógica del acordeón es independiente de GSAP (clases y atributos ARIA) para que funcione aunque la animación de entrada no corra.

## Fuera de alcance

- Enlace a `#equipo` en el Header.
- Fotos y textos reales de los tres integrantes restantes.
- Redes sociales por integrante.

## Verificación

- `astro check` y `astro build` sin errores.
- Revisión visual en navegador: desktop y mobile, teclado, movimiento reducido.
