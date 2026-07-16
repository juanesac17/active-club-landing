import { gsap, SplitText } from "./gsap.config.js";

/**
 * Sección 3 — El problema que ayudamos a resolver.
 *
 * Párrafos: reveal por CARACTERES (SplitText) con stagger y rotación
 * sutil, clonado de About. Cada párrafo anima sus chars cuando entra
 * al viewport.
 *
 * Mensajes destacados: sin animación, aparecen con el flujo natural.
 *
 * Patrón general: gsap.matchMedia() (reduced-motion) + gsap.context()
 * (cleanup) + document.fonts.ready (medición correcta de saltos de línea).
 */
export function initProblem() {
  const section = document.querySelector(".problem");
  if (!section || section.dataset.problemInit === "1") return;
  section.dataset.problemInit = "1";

  const mm = gsap.matchMedia();

  mm.add(
    {
      reduce: "(prefers-reduced-motion: reduce)",
      ok: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reduce } = context.conditions;
      const paragraphs = gsap.utils.toArray(".problem__paragraph", section);

      // reduced-motion: contenido visible, sin animar.
      if (reduce) {
        gsap.set(paragraphs, { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      const splits = [];
      let ctx;

      // CRÍTICO: partir el texto DESPUÉS de cargar las fuentes.
      document.fonts.ready.then(() => {
        ctx = gsap.context(() => {
          // Cada párrafo entra por caracteres con stagger y rotación sutil.
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
