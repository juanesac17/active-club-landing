# Detalle de planes en diálogos nativos

Plans incorporará un diálogo modal por plan para ampliar la información sin abandonar la tabla comparativa. La solución mantiene el lenguaje editorial de la sección, separa el contenido de la UI y conduce a WhatsApp desde el punto de mayor intención.

## Decisiones aprobadas

| Tema | Decisión |
|---|---|
| Datos | Mover todos los datos de los planes a `src/data/plans.ts`. |
| Componente | `Plans.astro` solo importa y renderiza los datos. |
| Modal | Renderizar un `<dialog>` nativo e independiente por plan. |
| Apertura | Cada fila incorpora un botón “Ver detalles”. |
| Cierre | Permitir cierre mediante “X”, `Escape` y clic en el fondo. |
| Scroll | Bloquear el documento mientras haya un diálogo abierto; permitir scroll interno únicamente cuando el viewport o el zoom lo requieran. |
| Foco | Enviar el foco al control de cierre y devolverlo al disparador al cerrar. |
| Conversión | Añadir el CTA “Quiero este plan” con un mensaje de WhatsApp específico por plan. |
| Movimiento | Usar una transición CSS breve y respetar `prefers-reduced-motion`. |

## Estructura de datos

Cada plan tendrá los campos `id`, `name`, `focus`, `price`, `features`, `description`, `featured` y `cta`. El CTA contendrá su etiqueta y URL final, construida con una utilidad centralizada que codifica el mensaje mediante `URLSearchParams`.

Las descripciones serán texto provisional coherente con Starter, Active y Elite. El usuario podrá reemplazarlas posteriormente sin modificar el componente.

## Estructura visual

```text
fila del plan
└── botón “Ver detalles”
    └── dialog
        ├── botón “X”
        ├── logo horizontal pequeño y centrado
        ├── nombre del plan en MADE Outer Sans
        ├── descripción del plan
        └── CTA “Quiero este plan”
```

El logo es decorativo dentro del diálogo. El nombre del plan etiqueta programáticamente al diálogo. Tanto el control “X” como el CTA conservan un objetivo táctil mínimo de 44 px y un estado de foco visible.

## Comportamiento

1. “Ver detalles” identifica su diálogo mediante un atributo de datos.
2. `showModal()` abre el diálogo en la capa superior nativa.
3. Una clase en `<html>` bloquea el scroll del documento.
4. El evento `close` elimina el bloqueo y restaura el foco.
5. Un clic cuyo objetivo sea el propio `<dialog>` se interpreta como clic en el fondo y lo cierra.
6. `Escape` conserva el comportamiento nativo del diálogo.

## WhatsApp

El número de Active Club y la construcción de enlaces se centralizan para evitar duplicaciones. Cada plan define un mensaje con este formato:

```text
Hola Active Club, quiero adquirir el plan Starter.
```

El nombre cambia según el plan. El enlace se abre como recurso externo con `target="_blank"` y `rel="noopener noreferrer"`.

## Verificación

- [ ] `astro check` sin diagnósticos.
- [ ] Build estático exitoso.
- [ ] Todos los datos visibles de Plans proceden de `src/data/plans.ts`.
- [ ] Cada plan abre únicamente su diálogo.
- [ ] “X”, `Escape` y clic en el fondo cierran el diálogo.
- [ ] El documento no se desplaza mientras el diálogo está abierto.
- [ ] El contenido sigue accesible con zoom y viewport reducido.
- [ ] El foco entra al diálogo y regresa al botón disparador.
- [ ] Cada CTA genera el mensaje correcto de WhatsApp.
- [ ] No existe overflow horizontal desde 320 px.

## Archivos

| Acción | Archivo | Responsabilidad |
|---|---|---|
| Crear | `src/data/plans.ts` | Datos tipados, descripciones y CTA de cada plan. |
| Modificar | `src/data/brand.ts` | Centralizar la creación de enlaces de WhatsApp. |
| Modificar | `src/components/sections/Plans.astro` | Renderizado, estilos y comportamiento de los diálogos. |
| Modificar | `src/styles/global.css` | Bloqueo global de scroll durante el modal. |
