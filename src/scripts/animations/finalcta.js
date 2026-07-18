import { gsap, SplitText } from "./gsap.config.js";

/**
 * Cierre: reveal por líneas del título y entrada conjunta del texto con su CTA.
 */
export function initFinalCta() {
  const section = document.querySelector(".finalcta");
  if (!section || section.dataset.finalctaInit === "1") return;
  section.dataset.finalctaInit = "1";

  const title = section.querySelector("[data-finalcta-title]");
  const closing = section.querySelector("[data-finalcta-closing]");
  if (!title || !closing) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      reduce: "(prefers-reduced-motion: reduce)",
      ok: "(prefers-reduced-motion: no-preference)",
    },
    ({ conditions }) => {
      if (conditions.reduce) {
        gsap.set([title, closing], { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      let split;
      let context;

      document.fonts.ready.then(() => {
        context = gsap.context(() => {
          split = SplitText.create(title, { type: "lines" });
          gsap.from(split.lines, {
            autoAlpha: 0,
            y: 36,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: title, start: "top 78%", once: true },
          });

          gsap.from(closing, {
            autoAlpha: 0,
            y: 24,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: { trigger: closing, start: "top 84%", once: true },
          });
        }, section);
      });

      return () => {
        context?.revert();
        split?.revert();
      };
    },
    section
  );

  return () => mm.revert();
}
