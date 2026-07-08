import { gsap } from "./gsap.config.js";

/**
 * Sección 6 — ¿Cómo funciona el proceso?
 * Capa 2: entrada secuencial de las 4 cards + 3 flechas de conexión, en el
 * orden del DOM (paso 1 → 2 → 3 → 4), disparada una sola vez al entrar el grid.
 *
 *  1. Desktop: una sola timeline con ScrollTrigger (once) sobre el grid.
 *     Cada card entra con fade + slide horizontal (dirección según
 *     data-dir: "left" → -60px, "right" → +60px) y cada flecha aparece con
 *     un pequeño solape sobre la card anterior.
 *  2. Mobile: sin flechas (ocultas por CSS); cada card tiene su propio
 *     ScrollTrigger individual con un desplazamiento menor (±30px).
 *
 * Sigue el patrón del proyecto: gsap.matchMedia() (reduced-motion + breakpoint)
 * + gsap.context() (cleanup).
 */
export function initProcess() {
  const section = document.querySelector(".process");
  if (!section || section.dataset.processInit === "1") return;
  section.dataset.processInit = "1";

  const mm = gsap.matchMedia();

  mm.add(
    {
      reduce: "(prefers-reduced-motion: reduce)",
      desktop: "(prefers-reduced-motion: no-preference) and (min-width: 769px)",
      mobile: "(prefers-reduced-motion: no-preference) and (max-width: 768px)",
    },
    (context) => {
      const { reduce, desktop, mobile } = context.conditions;
      const cards = gsap.utils.toArray(".process__card", section);
      const arrows = gsap.utils.toArray(".process__arrow", section);

      // reduced-motion: todo visible, sin animar.
      if (reduce) {
        gsap.set([...cards, ...arrows], { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      // Dirección de entrada según data-dir de cada card.
      const dirX = (card) => (card.dataset.dir === "left" ? -60 : 60);

      if (desktop) {
        const grid = section.querySelector(".process__grid");
        const [card1, card2, card3, card4] = cards;
        const [arrow1, arrow2, arrow3] = arrows;

        const ctx = gsap.context(() => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: grid,
                start: "top 70%",
                once: true,
              },
              defaults: { duration: 0.6, ease: "power2.out" },
            })
            .from(card1, { autoAlpha: 0, x: dirX(card1), clearProps: "transform" })
            .from(arrow1, { autoAlpha: 0, duration: 0.3 }, "-=0.15")
            .from(card2, { autoAlpha: 0, x: dirX(card2), clearProps: "transform" }, "-=0.1")
            .from(arrow2, { autoAlpha: 0, duration: 0.3 }, "-=0.15")
            .from(card3, { autoAlpha: 0, x: dirX(card3), clearProps: "transform" }, "-=0.1")
            .from(arrow3, { autoAlpha: 0, duration: 0.3 }, "-=0.15")
            .from(card4, { autoAlpha: 0, x: dirX(card4), clearProps: "transform" }, "-=0.1");
        }, section);

        return () => ctx.revert();
      }

      if (mobile) {
        const ctx = gsap.context(() => {
          cards.forEach((card) => {
            gsap.from(card, {
              autoAlpha: 0,
              x: card.dataset.dir === "left" ? -30 : 30,
              duration: 0.6,
              ease: "power2.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                once: true,
              },
            });
          });
        }, section);

        return () => ctx.revert();
      }
    },
    section
  );

  return () => mm.revert();
}
