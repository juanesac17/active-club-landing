# Sistema de elevación para cards

Las cards de la landing comparten tokens de sombra adaptados al contexto visual. Las superficies claras usan sombras negras suaves; las oscuras combinan profundidad con un halo blanco mínimo.

## Alcance

- `Method`: pasos del método.
- `ForWho`: perfiles del carrusel.
- `Services`: servicios del coverflow.
- `Plans`: niveles de acompañamiento.
- `FAQ`: acordeones.

Hero, Problem y FinalCTA no contienen cards estructurales y quedan fuera.

## Comportamiento

- Todas las cards tienen elevación base.
- Hover intensifica únicamente la sombra y el borde; no modifica posición ni escala.
- El plan destacado y el FAQ abierto usan la elevación reforzada.
- Los tokens viven en `tokens.css` para mantener consistencia entre secciones.
