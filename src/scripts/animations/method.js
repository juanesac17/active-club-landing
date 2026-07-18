import { gsap } from "./gsap.config.js";

/**
 * Sección 4 — Metodología Active Club.
 * Entrada secuencial de los 4 pasos con stagger al scrollear el grid.
 * Sin spotlight ni hover lift: el foco está en el contenido del paso.
 *
 * Patrón del proyecto: gsap.matchMedia() (reduced-motion) + gsap.context()
 * (cleanup) + ScrollTrigger one-time.
 */
export function initMethod() {
  const section = document.querySelector(".method");
  if (!section || section.dataset.methodInit === "1") return;
  section.dataset.methodInit = "1";

  const mm = gsap.matchMedia();

  mm.add(
    {
      reduce: "(prefers-reduced-motion: reduce)",
      ok: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reduce } = context.conditions;
      const steps = gsap.utils.toArray(".method__step", section);

      // reduced-motion: contenido visible, sin animar.
      if (reduce) {
        gsap.set(steps, { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      let ctx;
      ctx = gsap.context(() => {
        // Los 4 pasos entran con stagger cuando el grid aparece en viewport.
        gsap.from(steps, {
          autoAlpha: 0,
          y: 32,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: section.querySelector(".method__grid"),
            start: "top 75%",
            once: true,
          },
        });

      }, section);

      return () => ctx.revert();
    },
    section
  );

  return () => mm.revert();
}
