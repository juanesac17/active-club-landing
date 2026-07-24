# Rediseño Hallmark de Plans — Stat-Led Comparison

Plans adopta una tabla comparativa editorial para presentar los tres niveles de acompañamiento sin modificar el mensaje, el orden ni el branding. El cambio reemplaza la grilla de cards idénticas por filas tipográficas con separadores horizontales y precios en COP.

## Decisiones aprobadas

| Tema | Decisión |
|---|---|
| Alcance | Rediseñar únicamente la estructura visual de Plans. |
| Contenido | Conservar el título, los tres nombres, sus descripciones y sus features. Eliminar la introducción y el bloque de cotización redundante. |
| Precios | Agregar campo `price` en COP con valores placeholder que el usuario modificará. |
| Branding | Mantener tema light, colores semánticos, tipografías y escala de la landing. |
| Estructura | Tabla comparativa sin cards. Filas con separadores horizontales. |
| Destacado | Active se marca con hairline `var(--highlight)` en borde izquierdo de la fila, sin badge. |
| Precios | `tabular-nums` para alineación vertical. Formato `$XXX.XXX` en COP. |
| Conversión | No incluir CTA local: los precios son explícitos y la conversión se resuelve en otros puntos de la landing. |
| Movimiento | Sin animaciones. Contenido visible desde el primer render. |
| Responsive | Mobile: cada fila colapsa a bloque vertical (nombre → precio → focus → features). |

## Estructura de datos

```typescript
const PLANS = [
  {
    name: "Starter",
    focus: "Para comenzar con una ruta clara.",
    price: "$180.000",
    features: ["Entrenamiento virtual", "Plan personalizado", "Seguimiento mensual"],
    featured: false,
  },
  {
    name: "Active",
    focus: "Para combinar autonomía y acompañamiento presencial.",
    price: "$320.000",
    features: ["Cuatro sesiones presenciales al mes", "Ajustes quincenales", "Soporte por WhatsApp"],
    featured: true,
  },
  {
    name: "Elite",
    focus: "Para un acompañamiento más frecuente e individualizado.",
    price: "$480.000",
    features: ["Sesiones presenciales ilimitadas", "Acompañamiento dedicado", "Evaluación física mensual"],
    featured: false,
  },
];
```

## Estructura visual

```text
Plans
├── header
│   └── título
└── tabla comparativa
    ├── fila Starter  │ nombre │ precio │ focus │ features
    ├── fila Active   │ nombre │ precio │ focus │ features  ← hairline accent
    └── fila Elite    │ nombre │ precio │ focus │ features
```

## Responsive

- Desktop (`min-width: 64rem`): tabla de 4 columnas (nombre, precio, focus, features).
- Tablet y mobile (`max-width: 63.9375rem`): cada fila colapsa a bloque vertical.
- El plan destacado mantiene la hairline accent en todos los breakpoints.

## Verificación

- [ ] `astro check` sin diagnósticos.
- [ ] Build estático exitoso.
- [ ] La copia de los planes permanece intacta y no se renderiza el bloque de cotización eliminado.
- [ ] No quedan cards, sombras, spotlight ni badge de la versión anterior.
- [ ] Los precios se muestran con `tabular-nums`.
- [ ] El contenido funciona con JavaScript desactivado.
- [ ] No hay overflow horizontal a 320, 375, 414 ni 768 px.

## Archivos

| Acción | Archivo | Responsabilidad |
|---|---|---|
| Crear | `docs/plans/2026-07-24-plans-stat-led-redesign-design.md` | Diseño aprobado y criterios de verificación. |
| Modificar | `src/components/sections/Plans.astro` | Estructura de tabla, datos con precios, responsive. |
| Eliminar | `src/scripts/animations/plans.js` | Spotlight JS ya no necesario. |
