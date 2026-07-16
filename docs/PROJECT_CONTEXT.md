# Active Club — Decisiones de Proyecto

> Documento de referencia técnica y estratégica para el desarrollo de la Landing Page. Versión 1.1 — actualizado contra `docs/Identidad de marca.pdf`

---

## 1. Objetivo del Proyecto

Construir una Landing Page para **Active Club**, un servicio de asesoría personalizada de entrenamiento físico, con el propósito de:

- Comunicar la propuesta de valor del entrenador y su método de trabajo
- Generar confianza suficiente para que el usuario dé el primer paso
- Dirigir al usuario directamente a una conversación por WhatsApp

**Las ventas no se realizan en la página.** El único canal de conversión es WhatsApp. La Landing no tiene formularios, pasarelas de pago ni registro. Su trabajo es convencer al usuario de escribir.

---

## 2. Tipo de Proyecto

|Atributo|Decisión|
|---|---|
|Tipo|Landing Page estática de una sola página|
|Audiencia emocional|Personas que sienten que su esfuerzo necesita dirección: las que entrenan sin avanzar, las que quieren empezar pero no saben cómo, y las que buscan recuperar o mejorar su condición física desde un proceso planificado y acompañado (no desde una rutina genérica). El usuario debe sentir confianza, claridad, tranquilidad, cercanía, motivación realista y seguridad de que su proceso será individual.|
|Eje comunicativo|Active Club acompaña a cada persona a mejorar su movimiento, condición física, bienestar y rendimiento mediante un proceso planificado, progresivo y adaptado a su realidad. La promesa no es conseguir cambios rápidos, sino ayudar a construir resultados que puedan sostenerse en el tiempo. El diferencial es la combinación entre conocimiento, seguimiento y trato humano: el entrenamiento se convierte en un proceso con dirección.|
|Canal de conversión|WhatsApp (`wa.me`) — canal principal de conversación y agendamiento de valoración|
|Modalidades del servicio|Presencial y virtual|
|Idioma|Español|

---

## 3. Stack Tecnológico

|Tecnología|Rol|Justificación|
|---|---|---|
|**Astro**|Framework principal|Genera HTML estático por defecto, cero JS innecesario en el cliente, ideal para SEO y performance en landing pages|
|**Tailwind CSS**|Estilos|Utilidades directas, sin CSS muerto en producción, velocidad de desarrollo alta|
|**GSAP**|Animaciones|Estándar de facto para animaciones de alta calidad, control fino sobre timelines y ScrollTrigger|
|**pnpm**|Manejador de paquetes|Más rápido que npm, manejo de dependencias más seguro mediante symlinks|

### Consideración clave — GSAP en Astro

GSAP corre exclusivamente en el cliente. En Astro esto se resuelve con `<script>` tags normales o la directiva `client:load` en componentes que lo requieran. Debe tenerse en cuenta desde el inicio para evitar conflictos con la hidratación.

### Deploy

El proyecto se puede deployar en **Vercel**, **Netlify** o **Cloudflare Pages** sin configuración adicional dado que el output es estático.

---

## 4. Branding de Marca

### 4.1 Paleta de Colores

#### Primarios

|Token|Hex|Uso|
|---|---|---|
|`--color-black`|`#1A1A1A`|Fondo principal, texto sobre claro|
|`--color-white`|`#FFFFFF`|Texto sobre oscuro, fondos de contraste|

#### Secundarios

|Token|Hex|Uso|
|---|---|---|
|`--color-blue-gray`|`#C7D5D9`|Fondos sutiles, separadores, texto secundario|
|`--color-green`|`#75AE8B`|Acentos de bienestar, íconos, highlights|
|`--color-yellow`|`#F5C355`|Estado hover de CTAs, highlights tipográficos|
|`--color-orange`|`#EE8A5A`|CTA principal, elementos de energía y acción|

#### Tokens semánticos

|Token|Valor|Descripción|
|---|---|---|
|`--color-bg-dark`|`#1A1A1A`|Fondo base de la página|
|`--color-bg-light`|`#FFFFFF`|Fondo de secciones de contraste|
|`--color-text-primary`|`#1A1A1A`|Texto sobre fondo claro|
|`--color-text-on-dark`|`#FFFFFF`|Texto sobre fondo oscuro|
|`--color-cta-primary`|`#EE8A5A`|Color de botones de acción principal|
|`--color-cta-hover`|`#F5C355`|Color de hover en botones|
|`--color-accent`|`#75AE8B`|Acento general de la interfaz|

### 4.2 Tipografías

|Fuente|Rol|Disponibilidad|
|---|---|---|
|**TT First Neue**|Display — logo, números grandes, títulos de alto impacto|Licencia de pago — pendiente de adquirir|
|**Made Outer Sans**|Body — títulos, subtítulos, cuerpo de texto|Licencia de pago — pendiente de adquirir|

> **Estado actual:** Las fuentes originales de la marca no están disponibles aún. Se deben adquirir las licencias antes del deploy. Mientras tanto, se trabajará con fuentes alternativas de Google Fonts que respeten el carácter visual de la marca:
> 
> - `TT First Neue` → reemplazable temporalmente por **Space Grotesk** o **DM Sans**
> - `Made Outer Sans` → reemplazable temporalmente por **Inter** o **Outfit**

### 4.3 Logotipo

- El logo es un **imagotipo** (ícono + wordmark), pueden usarse juntos o por separado
- Variantes disponibles: principal, vertical, horizontal simple, ícono responsivo
- En la landing se usará el logo **negativo** (blanco sobre fondo oscuro) como variante principal, dado el modo dark-first
- Tamaño mínimo digital: `120px`
- No se permite: efectos o sombras, rotación, alteración de elementos, duplicación del ícono

### 4.4 Dirección Visual

- **Modo:** Dark-first — fondo negro/oscuro como base dominante
- **Estética:** fotografía de alto contraste, tipografía grande como elemento gráfico
- **Elementos gráficos:** líneas en outline, juego de pesos tipográficos, emojis como categorizadores (no decorativos)
- **Tono visual:** cálido, profesional, humano — transmitir acompañamiento y proceso, no energía genérica de fitness marketing. Confianza, claridad y cercanía por encima de espectacularidad.

---

## 5. Estructura de Secciones

El hilo narrativo de la landing es: **"Tú tienes una meta. Yo tengo el método. Hablemos."**

### Sección 1 — Hero

**Objetivo:** Capturar atención y comunicar la propuesta de valor en menos de 5 segundos.

|Elemento|Contenido|
|---|---|
|Texto superior (eyebrow)|`ENTRENAMIENTO PERSONAL · MOVIMIENTO · BIENESTAR · RENDIMIENTO`|
|Headline|Opción recomendada del documento de marca: _"Entrena con propósito. Avanza con confianza."_|
|Subtítulo|_"Entrenamiento, planificación y acompañamiento adaptados a tu cuerpo, tus objetivos y tu momento actual."_ + _"Mejora tu fuerza, movimiento, bienestar y rendimiento mediante un proceso diseñado para ti."_|
|CTA principal|Agenda tu valoración|
|CTA secundario|Conoce cómo trabajamos|
|Texto breve de confianza|_"No necesitas estar en forma para comenzar. El proceso parte de tu nivel actual."_|
|Visual|Fotografía de impacto alto contraste — entrenador en acción o movimiento|

---

### Sección 2 — El Problema / La Promesa

**Objetivo:** Hacer que el usuario se identifique con una frustración real y posicionar a Active Club como la solución.

|Elemento|Contenido|
|---|---|
|Pain points|3–4 frases cortas que nombren frustraciones reales: _"Llevas meses en el gym y no ves resultados"_, _"No sabes si estás entrenando bien o solo cansándote"_, _"Empiezas con motivación y a las semanas lo abandonas"_|
|Transición|Frase puente hacia la propuesta: _"Eso cambia cuando entrenas con un método, no con suposiciones."_|

---

### Sección 3 — El Método / Diferenciadores

**Objetivo:** Explicar por qué Active Club es diferente, con argumentos concretos y sin sonar genérico.

Tres pilares presentados como cards o elementos visuales:

|Pilar|Contenido|
|---|---|
|Personalización real|Cada sesión está diseñada para ti, tus metas y tu estado físico actual|
|Ciencia aplicada|Cada ejercicio tiene una razón. El plan se construye con base en evidencia, no en tendencias|
|Ajuste continuo|Se usan métodos de percepción de esfuerzo para ajustar la carga en cada sesión según cómo te sientes|

---

### Sección 4 — Para Quién Es Active Club

**Objetivo:** Hablarle a los distintos perfiles sin que nadie se sienta excluido. El tono debe transmitir inclusión y posibilidad, dejando claro que no importa el punto de partida.

|Elemento|Contenido|
|---|---|
|Headline de sección|_"Hay una forma de comenzar desde tu nivel"_|
|Perfiles|Estás comenzando · Quieres recuperar tu condición física · Quieres mejorar tu bienestar · Practicas running · Practicas otro deporte · Tienes un objetivo de rendimiento · Necesitas mayor individualización|
|Modalidades|Presencial y virtual — se adapta al contexto del usuario|
|CTA secundario|Comienza tu proceso|

---

### Sección 5 — El Entrenador

**Objetivo:** Generar confianza. Es la sección más importante para la conversión dado que el cierre se hace persona a persona por WhatsApp.

|Elemento|Contenido|
|---|---|
|Foto|Real, no de stock|
|Nombre y presentación|Una línea de quién es|
|Historia|Por qué empezó, qué lo motivó, qué lo hace diferente como entrenador — narrativa de origen, no hoja de vida|
|Autoridad|Años de experiencia, formación, deportes o perfiles con los que ha trabajado|
|Filosofía|Frase o principio personal que resuma su enfoque|

> El tono de esta sección debe ser de persona real con convicción, no de perfil profesional.

---

### Sección 6 — Cómo Funciona el Proceso

**Objetivo:** Eliminar fricción. El usuario necesita saber qué pasa después de hacer clic en WhatsApp para animarse a hacerlo.

Flujo de 4 pasos:

1. Me escribes por WhatsApp
2. Hablamos de tus metas, tu historial y tu contexto
3. Diseño tu plan personalizado
4. Empezamos a entrenar y ajustamos sobre la marcha

---

### Sección 7 — Prueba Social

**Objetivo:** Refuerzo de confianza antes del CTA final.

> **Estado actual:** No hay testimonios formales disponibles.

**Decisión tomada (alineada con el documento de marca):** No se publican testimonios ficticios. Esta sección solo se incorporará cuando existan historias, fotografías y resultados autorizados por usuarios reales. Mientras tanto, se sustituye por el Manifiesto de marca (Sección 9 del PDF): _"Entrenar también es aprender a confiar en tu cuerpo"_ — que cumple el rol de refuerzo emocional antes del cierre sin inventar pruebas sociales.

---

### Sección 8 — CTA Final

**Objetivo:** Cierre. El usuario que llegó hasta aquí está interesado — facilitar el siguiente paso al máximo.

|Elemento|Contenido|
|---|---|
|Headline|_"Tu proceso puede comenzar hoy"_|
|Descripción|_"No necesitas tener experiencia, estar en tu mejor condición física ni conocer todos los ejercicios. Solo necesitas un punto de partida y la disposición para comenzar."_ + _"Conoceremos tu caso antes de recomendarte un servicio."_|
|CTA principal|Agenda tu valoración (WhatsApp)|
|CTA secundario|Habla con nosotros por WhatsApp|

---

### Elemento Permanente — WhatsApp FAB

Botón flotante de WhatsApp visible en toda la página, especialmente en mobile. Es el canal permanente de conversación y debe estar siempre accesible sin necesidad de hacer scroll.

---

### Menú Principal (Header)

Según el documento de marca, el menú es fijo con máximo seis opciones y un botón destacado:

- Inicio
- Active Club
- Metodología
- Servicios
- Preguntas frecuentes
- Contacto

**Botón destacado:** `Agenda tu valoración`

---

### Servicios de Active Club (referencia)

Catálogo de servicios definido por el documento de marca. Cada servicio tiene su propio copy, beneficio principal y CTA. La landing debe poder presentarlos de forma diferenciada:

| # | Servicio | Copy principal | CTA |
|---|---|---|---|
| 1 | Entrenamiento personal | _"Entrenamiento diseñado alrededor de ti"_ | Conoce el entrenamiento personal |
| 2 | Valoración física y del movimiento | _"Conoce tu punto de partida"_ | Agenda tu valoración |
| 3 | Planificación y seguimiento | _"Un plan que evoluciona contigo"_ | Solicita información |
| 4 | Preparación física para corredores | _"Corre con un cuerpo mejor preparado"_ | Mejora tu preparación |
| 5 | Preparación física para deportistas | _"Entrena para las demandas de tu deporte"_ | Cuéntanos cuál es tu objetivo |
| 6 | Fuerza, movilidad y acondicionamiento | _"Muévete con mayor libertad y confianza"_ | Encuentra tu programa |

---

## 6. Arquitectura de Carpetas

```
active-club-landing/
├── public/
│   ├── favicon.svg
│   └── fonts/                    # Archivos .woff2 de las fuentes cuando estén disponibles
│
├── src/
│   ├── components/
│   │   ├── sections/             # Un componente por sección de la landing
│   │   │   ├── Hero.astro
│   │   │   ├── Problem.astro
│   │   │   ├── Method.astro
│   │   │   ├── ForWho.astro
│   │   │   ├── Trainer.astro
│   │   │   ├── Process.astro
│   │   │   ├── Testimonials.astro
│   │   │   └── FinalCTA.astro
│   │   │
│   │   ├── ui/                   # Piezas reutilizables pequeñas
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── Badge.astro
│   │   │   └── SectionTitle.astro
│   │   │
│   │   └── layout/
│   │       ├── Header.astro
│   │       ├── Footer.astro
│   │       └── WhatsAppFAB.astro  # Botón flotante permanente
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro       # Layout base: meta tags, fuentes, global styles
│   │
│   ├── pages/
│   │   └── index.astro            # Página principal — ensambla todas las secciones
│   │
│   ├── scripts/
│   │   ├── animations/
│   │   │   ├── gsap.config.js     # Configuración global de GSAP (plugins, defaults)
│   │   │   ├── hero.js            # Animaciones específicas del Hero
│   │   │   └── scrollReveal.js    # Animaciones de entrada genéricas al hacer scroll
│   │   │
│   │   └── whatsapp.js            # Construcción del link wa.me con número y mensaje
│   │
│   ├── styles/
│   │   ├── global.css             # Reset, fuentes, estilos base
│   │   └── tokens.css             # Variables CSS — colores, tipografía, espaciado
│   │
│   └── assets/
│       ├── images/                # Fotografías y recursos visuales
│       └── icons/                 # SVGs del sistema de íconos de la marca
│
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

### Criterios de la arquitectura

|Decisión|Razón|
|---|---|
|`sections/` mapea 1:1 con la landing|Fácil de ubicar, fácil de modificar, sin ambigüedad|
|`ui/` separado de `sections/`|Evita repetir código — Button y Card se usan en múltiples secciones|
|`animations/` separado por responsabilidad|`scrollReveal.js` maneja entradas genéricas, archivos específicos manejan lo particular de cada sección|
|`tokens.css` centralizado|Si cambia un color o fuente, se cambia en un solo lugar|
|`WhatsAppFAB.astro` en `layout/`|Es un componente permanente de interfaz, no una sección de contenido|
|`whatsapp.js` separado|La lógica del link `wa.me` (número, mensaje predefinido) vive en un solo lugar y se importa donde se necesite|

---

## 7. Pendientes Antes de Arrancar Código

- [ ] Confirmar o adquirir licencias de **TT First Neue** y **Made Outer Sans**
- [ ] Definir sustitutos temporales de Google Fonts mientras se obtienen las licencias
- [ ] Obtener archivos de logo en SVG (variante negativa — blanco sobre negro)
- [ ] Definir número de WhatsApp y mensaje predefinido para los CTAs
- [ ] Obtener fotografías reales del entrenador y sesiones de entrenamiento
- [ ] Redactar la historia del entrenador para la Sección 5

---

## 8. Diseño de la Intro y el Hero

### 8.1 Intro — Efecto de máscara con scroll

**Concepto:** El usuario entra a la página con fondo negro y el logo de Active Club centrado. Al hacer scroll, el logo actúa como una ventana que se expande progresivamente hasta revelar el hero completo. No hay fade ni transición de opacidad en la máscara — el efecto es puramente geométrico.

**Inspiración:** Basado en la técnica del repo `midudev/landing-gta-vi`, pero con la lógica invertida. En el original la máscara arranca grande y se contrae; aquí arranca pequeña (el logo) y crece hasta cubrir toda la pantalla.

**Técnica: `mask-image` CSS + GSAP ScrollTrigger**

css

```css
#hero-mask {
  mask-image: url('/logo-mask.svg'); /* SVG del imagotipo */
  mask-repeat: no-repeat;
  mask-position: center center;
  mask-size: 20%; /* pequeño al inicio */
}
```

GSAP anima `mask-size` de `20%` a `300%` con `scrub` vinculado al scroll:

js

```js
gsap.to('#hero-mask', {
  maskSize: '300%',
  ease: 'power2.inOut',
  scrollTrigger: {
    trigger: 'body',
    start: 'top top',
    end: '+=150%',
    scrub: 1.0,
  }
});
```

**Por qué `mask-image` y no `clip-path`:**

- Acepta cualquier SVG directamente como URL — sin necesidad de extraer paths ni manipular el DOM
- La forma del logo se preserva con fidelidad total en todos los tamaños
- Es la misma propiedad que usa el repo de referencia, probada en producción
- Más simple de mantener: cambiar el logo es cambiar un archivo SVG

**Flujo visual completo:**

|Estado|`mask-size`|Imagen|Logo PNG|
|---|---|---|---|
|Carga inicial|`20%`|Solo visible dentro del logo|Visible, centrado|
|Durante scroll|`20%` → `300%`|Se va desvaneciendo el overlay oscuro|Escala junto a la máscara|
|Final|`300%`|Completamente visible y limpia|Tan grande que sale del viewport|

**Overlay sincronizado:** La imagen del hero no aparece de golpe — tiene un overlay negro (`#hero-overlay`) cuya opacidad baja de `1` a `0` entre el 15% y el 85% del progreso del scroll. Esto da la sensación de que la imagen se "enciende" gradualmente mientras la máscara crece.

js

```js
const overlayOpacity = p < 0.15
  ? 1
  : Math.max(0, 1 - ((p - 0.15) / 0.70));
heroOverlay.style.opacity = overlayOpacity;
```

**Logo PNG visible:** Para que el usuario siempre vea el logo sobre el negro (no solo el hueco de la máscara), el PNG del logo flota en una capa encima con `position: fixed`, y escala con GSAP al mismo ritmo que `mask-size`. Cuando es suficientemente grande sale del viewport — desaparece naturalmente sin ningún `opacity: 0`.

**Pendiente de producción:**

- El SVG del logo debe exportarse del archivo fuente (Figma/Illustrator) y colocarse en `/public/logo-mask.svg`
- La ruta del `mask-image` en Astro queda: `mask-image: url('/logo-mask.svg')`
- El PNG del logo en producción va en `src/assets/` y se importa como asset de Astro

---

### 8.2 Hero — Composición y animaciones

**Concepto visual:** Dark-first. Fondo negro dominante con fotografía de alto contraste. Tipografía grande como elemento gráfico principal. Una sola palabra que rota en loop ancla toda la sección.

**Elementos del Hero:**

|Elemento|Descripción|
|---|---|
|Nav|Logo + botón "Contactar" — entra con fade al completarse la intro|
|Eyebrow|Texto pequeño en naranja: `Entrenamiento personalizado · Basado en ciencia`|
|Headline|`Entrena con [palabra rotatoria]` — tipografía grande, peso 700|
|Palabra rotatoria|`propósito → ciencia → método → resultados` en loop cada 2.8s|
|Subtítulo|Una línea de descripción en peso 300, opacidad reducida|
|CTA principal|Botón naranja `#EE8A5A` → WhatsApp|
|CTA secundario|Texto fantasma con línea animada → ancla a sección del método|
|Stats izquierda|`100% / 2x / ∞` con línea de acento naranja vertical|
|Ghost number|Número grande `01→04` en opacidad mínima, cambia con la palabra|
|Tags derecha|`Presencial` / `Virtual` con borde sutil|
|Scroll indicator|Línea vertical animada con label "Scroll"|
|Dots|Indicador de progreso sincronizado con la palabra activa|
|Progress bar|Barra de 1px en el bottom que indica cuánto falta para el siguiente cambio|

**Animación de entrada del Hero:** Los elementos no aparecen todos a la vez — entran en stagger cuando la intro llega al 80% de su progreso:

```
0.00s — Nav fade in
0.08s — Headline línea 1 slide up
0.12s — Eyebrow fade in
0.20s — Headline línea 2 slide up
0.32s — Subtítulo fade up
0.44s — Acciones fade up
0.62s — Arranca rotación de palabras
```

**Palabra rotatoria — mecánica:** La palabra actual sale hacia arriba (`translateY(-110%)`) y la siguiente entra desde abajo (`translateY(110%) → 0`). El cambio ocurre cada 2800ms. Simultáneamente:

- El número fantasma de fondo cambia (`01 → 02 → 03 → 04`)
- El dot activo en los indicadores cambia
- La barra de progreso se reinicia y recorre el 100% hasta el siguiente cambio

**Parallax con mouse:** El glow de fondo y el número fantasma tienen un leve desplazamiento vinculado al movimiento del mouse — da profundidad sin distraer.

**Implementación en Astro:**

- Componente: `src/components/sections/Hero.astro`
- Script de animaciones: `src/scripts/animations/hero.js`
- La lógica de la intro y el hero viven en archivos separados y se coordinan por progreso de scroll

---

### 8.3 Archivos necesarios para producción

| Archivo                           | Descripción                                    | Estado                               |
| --------------------------------- | ---------------------------------------------- | ------------------------------------ |
| `/public/logo-mask.svg`           | SVG del imagotipo para `mask-image`            | Pendiente — pedir al diseñador       |
| `src/assets/logo-blanco.png`      | Logo PNG blanco para la capa visible           | Disponible                           |
| `src/assets/hero-bg.webp`         | Fotografía de fondo del hero                   | Pendiente — foto real del entrenador |
| `src/scripts/animations/intro.js` | Lógica GSAP de la intro (mask-size + scroll)   | Prototipado                          |
| `src/scripts/animations/hero.js`  | Lógica GSAP del hero (stagger + word rotation) | Prototipado                          |