# Rediseño Hallmark de Method

Method adoptará una secuencia editorial abierta para explicar el proceso de Active Club sin modificar el mensaje, el orden de los pasos ni el branding existente. El cambio reemplaza la matriz de cards idénticas por un rail de progresión con una composición más asimétrica y contenida.

## Decisiones aprobadas

| Tema | Decisión |
|---|---|
| Alcance | Rediseñar únicamente la estructura visual y la interacción de Method. |
| Contenido | Conservar literalmente el título, la introducción, los cuatro nombres y sus descripciones. |
| Branding | Mantener tema dark, colores semánticos, tipografías y escala de la landing. |
| Encabezado | Dos columnas en desktop: título amplio a la izquierda e introducción estrecha a la derecha. |
| Proceso | Secuencia horizontal abierta en desktop; rail vertical en tablet y mobile. |
| Pasos | Sin cards, sombras, bordes redondeados ni flechas SVG. |
| Indicador | Línea fina de progreso centrada entre los cuatro números, que quedan sobre sus descripciones. |
| Alineación | Títulos y descripciones centrados bajo cada número; en mobile se conserva el rail lateral y la columna de contenido. |
| Movimiento | Solo se anima la línea una vez al entrar en viewport; los textos permanecen visibles. |
| Movimiento reducido | Línea completa desde el primer render y sin transición espacial. |

## Estructura

```text
Method
├── heading dividido
│   ├── título
│   └── introducción
└── sequence frame
    ├── rail decorativo y progreso
    └── ol
        ├── 01 + título + descripción
        ├── 02 + título + descripción
        ├── 03 + título + descripción
        └── 04 + título + descripción
```

El `ol` conserva el orden semántico. El rail y los números son apoyo visual; el contenido textual no depende de JavaScript.

## Responsive

- Desktop (`min-width: 64rem`): cuatro columnas iguales sin contenedores visuales, con el rail pasando por los números.
- Tablet y mobile (`max-width: 63.9375rem`): una secuencia vertical con el rail en la primera columna.
- Los encabezados pueden replegarse a una columna y el texto mantiene `min-width: 0` y wrapping seguro.
- El layout no depende de interacciones hover.

## Verificación

- [ ] `astro check` sin diagnósticos.
- [ ] Build estático exitoso.
- [ ] La copia existente permanece intacta.
- [ ] No quedan cards, sombras ni flechas de la versión anterior.
- [ ] El contenido funciona con JavaScript desactivado.
- [ ] El rail progresa una sola vez y respeta `prefers-reduced-motion`.
- [ ] No hay overflow horizontal a 320, 375, 414 ni 768 px.

## Archivos

| Acción | Archivo | Responsabilidad |
|---|---|---|
| Crear | `docs/plans/2026-07-24-method-hallmark-redesign-design.md` | Diseño aprobado y criterios de verificación. |
| Modificar | `src/components/sections/Method.astro` | Estructura editorial, rail y responsive. |
| Modificar | `src/scripts/animations/method.js` | Animación única del progreso del rail. |
