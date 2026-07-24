# Integración mínima de Simple Icons

Active Club usará Simple Icons como fuente oficial de los iconos sociales, limitando el código consumido durante el build a WhatsApp e Instagram.

## Ruta rápida

1. Instalar `simple-icons` con pnpm.
2. Importar únicamente `siWhatsapp` y `siInstagram` desde el paquete.
3. Eliminar los SVG sociales locales y validar el HTML estático generado.

## Decisiones

| Tema | Decisión |
|---|---|
| Dependencia | Instalar el paquete monolítico `simple-icons`; se acepta que la colección completa exista en `node_modules`. |
| Consumo | Usar importaciones ESM nominales para que Vite/Rollup descarte los iconos no utilizados. |
| Render | Convertir `icon.path` en SVG inline de `24 × 24`, con `fill="currentColor"`, `aria-hidden="true"` y `focusable="false"`. |
| API interna | Mantener `BRAND_ICONS` y `BrandIconName` para no acoplar el Footer a la librería externa. |
| Assets locales | Eliminar `src/assets/icons/whatsapp.svg` y `src/assets/icons/instagram.svg`. |
| Runtime | No agregar JavaScript cliente; Astro resolverá los iconos durante el build estático. |

## Flujo de datos

`simple-icons` → `src/data/brand.ts` → `BRAND_DATA.assets.icons` → `Footer.astro` → SVG inline en el HTML.

No se usará `import * as icons` ni una búsqueda dinámica por nombre: ambas opciones debilitan la garantía de consumir solo dos iconos.

## Verificación

- [ ] `pnpm exec astro check` finaliza sin diagnósticos.
- [ ] `pnpm build` finaliza correctamente.
- [ ] El HTML contiene los enlaces sociales y dos SVG accesibles mediante las etiquetas de sus enlaces.
- [ ] El resultado no contiene JavaScript cliente de Simple Icons.
- [ ] No quedan referencias a los SVG sociales eliminados.

## Rollback

Eliminar la dependencia, restaurar los dos SVG locales y recuperar sus importaciones `?raw` en `src/data/brand.ts`. El Footer no requiere cambios.
