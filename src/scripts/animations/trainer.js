import { gsap } from "./gsap.config.js";

/**
 * Sección 5 — El Entrenador.
 * Capa 2: entrada por scroll en dos grupos independientes (ScrollTrigger, one-time).
 *
 *  1. Columna de texto (eyebrow, título, párrafos, socials): fade-up con stagger.
 *  2. Foto: fade + slide-in lateral, con su propio trigger.
 *
 * Sigue el patrón del proyecto: gsap.matchMedia() (prefers-reduced-motion)
 * + gsap.context() (cleanup).
 */
export function initTrainer() {
  const section = document.querySelector(".trainer");
  if (!section || section.dataset.trainerInit === "1") return;
  section.dataset.trainerInit = "1";

  const mm = gsap.matchMedia();

  mm.add(
    {
      reduce: "(prefers-reduced-motion: reduce)",
      ok: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reduce } = context.conditions;
      const textItems = gsap.utils.toArray(
        ".trainer__eyebrow, .trainer__title, .trainer__body p, .trainer__socials",
        section
      );
      const photo = section.querySelector(".trainer__photo");

      // reduced-motion: todo visible, sin animar.
      if (reduce) {
        gsap.set([...textItems, photo], { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      const ctx = gsap.context(() => {
        // Columna de texto: fade-up escalonado al entrar la sección.
        gsap.from(textItems, {
          autoAlpha: 0,
          y: 30,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: section.querySelector(".trainer__content"),
            start: "top 75%",
            once: true,
          },
        });

        // Foto: entra deslizándose desde la derecha, con su propio trigger.
        gsap.from(photo, {
          autoAlpha: 0,
          x: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: photo,
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
