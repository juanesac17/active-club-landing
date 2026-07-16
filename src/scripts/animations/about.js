import { gsap, SplitText } from "./gsap.config.js";

/**
 * Sección 2 — Quiénes somos.
 * Reveal por CARACTERES (SplitText) atado a ScrollTrigger, un párrafo a la vez.
 * Animación clonada de Problem, ajustada solo en selectores y triggers.
 *
 * Patrón:
 * - document.fonts.ready antes de partir (medición correcta de saltos de línea).
 * - gsap.matchMedia() (reduced-motion) + gsap.context() (cleanup).
 * - One-time: cada párrafo se anima la primera vez que entra al viewport.
 */
export function initAbout() {
  const section = document.querySelector(".about");
  if (!section || section.dataset.aboutInit === "1") return;
  section.dataset.aboutInit = "1";

  const mm = gsap.matchMedia();

  mm.add(
    {
      reduce: "(prefers-reduced-motion: reduce)",
      ok: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reduce } = context.conditions;
      const paragraphs = gsap.utils.toArray(".about__paragraph", section);
      const cta = section.querySelector(".about__cta");

      if (reduce) {
        gsap.set([...paragraphs, cta], { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      const splits = [];
      let ctx;

      document.fonts.ready.then(() => {
        ctx = gsap.context(() => {
          // Un párrafo a la vez: cada uno con su propio ScrollTrigger.
          paragraphs.forEach((p) => {
            const split = SplitText.create(p, { type: "chars, words, lines" });
            splits.push(split);

            gsap.from(split.chars, {
              autoAlpha: 0,
              yPercent: "random([-60, 60])",
              rotation: "random(-8, 8)",
              ease: "back.out(1.6)",
              duration: 0.6,
              stagger: { amount: 0.45, from: "start" },
              scrollTrigger: { trigger: p, start: "top 75%", once: true },
            });
          });

          // CTA entra al final.
          if (cta) {
            gsap.from(cta, {
              opacity: 0,
              y: 24,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: { trigger: cta, start: "top 80%", once: true },
            });
          }
        }, section);
      });

      return () => {
        ctx?.revert();
        splits.forEach((s) => s.revert());
      };
    },
    section
  );

  return () => mm.revert();
}
