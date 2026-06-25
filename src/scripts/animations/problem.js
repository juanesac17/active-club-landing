import { gsap, SplitText } from "./gsap.config.js";

/**
 * Sección 2 — Problema / Promesa.
 * Reveal por CARACTERES (SplitText) atado a ScrollTrigger, una frase a la vez:
 * cada pain point arma sus letras al entrar; la frase puente entra después (el giro).
 *
 * Adaptado del efecto de chars del pen de referencia, pero ONE-TIME (sin repeat/yoyo)
 * y con rotación sutil → vistoso sin traicionar el tono serio de la sección.
 *
 * Sigue el patrón del Hero: gsap.matchMedia() (reduced-motion) + gsap.context() (cleanup).
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
      const pains = gsap.utils.toArray(".problem__pain", section);
      const bridge = section.querySelector(".problem__bridge");

      // reduced-motion: contenido visible, sin animar.
      if (reduce) {
        gsap.set([...pains, bridge], { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      const splits = [];
      let ctx;

      // CRÍTICO: partir el texto DESPUÉS de cargar las fuentes. Antes, SplitText
      // mide mal los saltos de línea (riesgo mayor con las fuentes de marca pendientes).
      document.fonts.ready.then(() => {
        ctx = gsap.context(() => {
          // Una frase a la vez: cada pain point con su propio ScrollTrigger.
          pains.forEach((pain) => {
            const split = SplitText.create(pain, { type: "chars, words, lines" });
            splits.push(split);

            gsap.from(split.chars, {
              autoAlpha: 0,
              yPercent: "random([-60, 60])",
              rotation: "random(-8, 8)", // sutil: vida sin caos lúdico
              ease: "back.out(1.6)",
              duration: 0.6,
              stagger: { amount: 0.45, from: "start" }, // lectura de izq. a der.
              scrollTrigger: { trigger: pain, start: "top 75%", once: true },
            });
          });

          // El giro entra al final, marcando el cambio problema → promesa.
          if (bridge) {
            gsap.from(bridge, {
              opacity: 0,
              y: 24,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: { trigger: bridge, start: "top 80%", once: true },
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
