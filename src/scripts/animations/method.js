import { gsap } from "./gsap.config.js";

/**
 * Sección 3 — El Método.
 * Capa 2: dos efectos independientes sobre las cards de los pilares.
 *
 *  1. Entrada con stagger por scroll (ScrollTrigger one-time): las 3 cards
 *     aparecen una detrás de otra al cruzar el viewport. Fade + slide-up.
 *  2. Spotlight verde que sigue al cursor: actualiza las custom props
 *     --mx/--my de cada card en pointermove. El glow (radial-gradient en CSS)
 *     vive en .method__glow y solo se ve en :hover.
 *
 * Sigue el patrón del proyecto: gsap.matchMedia() (reduced-motion + pointer)
 * + gsap.context() (cleanup). El spotlight solo se monta con pointer:fine y
 * sin reduced-motion (es puro hover decorativo).
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
      fine: "(pointer: fine)",
    },
    (context) => {
      const { reduce, fine } = context.conditions;
      const cards = gsap.utils.toArray(".method__card", section);

      // reduced-motion: cards visibles, sin animar y sin spotlight.
      if (reduce) {
        gsap.set(cards, { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      const ctx = gsap.context(() => {
        // Entrada escalonada: una card detrás de otra al entrar la sección.
        gsap.from(cards, {
          autoAlpha: 0,
          y: 40,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.4,
          // Limpia el transform inline al terminar para que el lift en :hover (CSS) funcione.
          clearProps: "transform",
          scrollTrigger: {
            trigger: section.querySelector(".method__grid"),
            start: "top 50%",
            once: true,
          },
        });
      }, section);

      // Spotlight: solo con puntero fino (mouse/trackpad). En touch no aporta.
      const cleanups = [];
      if (fine) {
        cards.forEach((card) => {
          const onMove = (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
            card.style.setProperty("--my", `${e.clientY - rect.top}px`);
          };
          card.addEventListener("pointermove", onMove);
          cleanups.push(() => card.removeEventListener("pointermove", onMove));
        });
      }

      return () => {
        ctx.revert();
        cleanups.forEach((fn) => fn());
      };
    },
    section
  );

  return () => mm.revert();
}
