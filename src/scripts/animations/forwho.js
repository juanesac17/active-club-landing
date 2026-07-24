import { gsap } from "./gsap.config.js";

/**
 * Sección ForWho — reveal editorial de la matriz 2×2.
 * Solo se activa en desktop con altura suficiente y movimiento permitido.
 */
export function initForWho() {
  const section = document.querySelector("[data-forwho-section]");
  if (!section || section.dataset.forwhoInit === "1") return;

  const matrix = section.querySelector("[data-forwho-matrix]");
  if (!matrix) return;

  section.dataset.forwhoInit = "1";

  const mm = gsap.matchMedia();

  mm.add(
    "(min-width: 769px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)",
    () => {
      const animationContext = gsap.context(() => {
        const horizontalDivider = matrix.querySelector(
          ".forwho__divider--horizontal"
        );
        const verticalDivider = matrix.querySelector(
          ".forwho__divider--vertical"
        );
        const items = gsap.utils.toArray("[data-forwho-item]", matrix);

        const timeline = gsap.timeline({
          scrollTrigger: {
            id: "forwho-editorial-grid",
            trigger: matrix,
            start: "top 50%",
            once: true,
          },
        });

        timeline
          .from(
            horizontalDivider,
            {
              scaleX: 0,
              duration: 0.85,
              ease: "none",
            },
            0
          )
          .from(
            verticalDivider,
            {
              scaleY: 0,
              duration: 0.85,
              ease: "none",
            },
            0
          )
          .from(
            items,
            {
              autoAlpha: 0,
              y: 28,
              duration: 0.65,
              ease: "power2.out",
              stagger: 0.1,
            },
            0.3
          );
      }, section);

      return () => animationContext.revert();
    }
  );

  return () => mm.revert();
}
