# Show the complete Founder portrait

Replace the temporary 9:16 placeholder with the real portrait while preserving the section's editorial layout and reveal animation.

## Decisions

| Topic | Decision |
| --- | --- |
| Rendering | Import the local WebP metadata and render a native `img`; the file is already optimized and the project does not include Sharp. |
| Framing | Let the image's intrinsic aspect ratio define the container height so no part of the photograph is cropped. |
| Layout | Keep the existing desktop and mobile portrait widths. |
| Accessibility | Describe the subject through the image's `alt` text and remove placeholder ARIA. |
| Motion | Preserve `data-founder-portrait` on the wrapper so the existing GSAP reveal remains unchanged. |

## Verification

- The complete photograph is visible at desktop and mobile widths.
- Intrinsic dimensions prevent layout shift without adding image-processing dependencies.
- The portrait keeps its border, radius, shadow, and reveal animation.
- Astro validation and the production build pass.
