import { gsap } from "./gsap.config.js";

/**
 * Sección 4 — Metodología Active Club.
 * El rail de progreso entra una sola vez al scrollear la secuencia.
 * El contenido permanece visible; el movimiento explica continuidad.
 *
 * Patrón del proyecto: gsap.matchMedia() (reduced-motion) + gsap.context()
 * (cleanup) + ScrollTrigger one-time.
 */
export function initMethod() {
  const section = document.querySelector(".method");
  if (!section || section.dataset.methodInit === "1") return;
  section.dataset.methodInit = "1";

  const mm = gsap.matchMedia();

  const sequence = section.querySelector(".method__sequence-frame");
  const progress = section.querySelector("[data-method-progress]");
  if (!sequence || !progress) return;

  mm.add(
    {
      reduce: "(prefers-reduced-motion: reduce)",
      compact: "(max-width: 63.9375rem)",
      wide: "(min-width: 64rem)",
    },
    (context) => {
      const { reduce, compact } = context.conditions;

      if (reduce) {
        gsap.set(progress, { scaleX: 1, scaleY: 1 });
        return;
      }

      const axis = compact ? "scaleY" : "scaleX";

      const ctx = gsap.context(() => {
        gsap.fromTo(
          progress,
          { [axis]: 0 },
          {
            [axis]: 1,
            duration: 5.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sequence,
              start: "top 75%",
              once: true,
            },
          }
        );
      }, section);

      return () => ctx.revert();
    },
    section
  );

  return () => mm.revert();
}
