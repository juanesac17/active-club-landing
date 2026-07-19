import { gsap } from "./gsap.config.js";

/**
 * Founder — entrada editorial del relato y el retrato vertical.
 * El contenido permanece visible sin JavaScript y con movimiento reducido.
 */
export function initFounder() {
  const section = document.querySelector("[data-founder-section]");
  if (!section || section.dataset.founderInit === "1") return;

  const content = section.querySelector("[data-founder-content]");
  const portrait = section.querySelector("[data-founder-portrait]");
  if (!content || !portrait) return;

  section.dataset.founderInit = "1";

  const mm = gsap.matchMedia();

  mm.add(
    {
      reduce: "(prefers-reduced-motion: reduce)",
      ok: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reduce } = context.conditions;
      const targets = [content, portrait];

      if (reduce) {
        gsap.set(targets, { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      gsap
        .timeline({
          scrollTrigger: {
            id: "founder-reveal",
            trigger: section,
            start: "top 72%",
            once: true,
          },
        })
        .from(content, {
          autoAlpha: 0,
          y: 24,
          duration: 0.55,
          ease: "power2.out",
        })
        .from(
          portrait,
          {
            autoAlpha: 0,
            y: 32,
            duration: 0.6,
            ease: "power2.out",
          },
          0.12
        );
    },
    section
  );

  return () => mm.revert();
}
