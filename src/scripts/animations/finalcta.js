import { gsap, SplitText } from "./gsap.config.js";

/**
 * Secciones 7+8 — Prueba social + CTA final.
 * Reveal con SplitText atado a ScrollTrigger para las 3 frases display:
 * la prueba social (frase larga) entra por LÍNEAS con giro 3D (rotationX,
 * pen de referencia de lines) y provocación + primer paso por CARACTERES
 * (pen de chars, deliberadamente más lento). Todo ONE-TIME, para que se
 * sienta como un cierre, no como un efecto llamativo.
 *
 * El remate (tranquilidad + botón) usa un fade-up simple, no char-split:
 * a ese tamaño de fuente el split por caracteres se lee como jitter, y el
 * botón es un <a> que SplitText no puede partir.
 *
 * Sigue el patrón del Hero/Problem: gsap.matchMedia() (reduced-motion) +
 * gsap.context() (cleanup) + document.fonts.ready (medición correcta de
 * saltos de línea antes de partir el texto).
 */
export function initFinalCta() {
  const section = document.querySelector(".finalcta");
  if (!section || section.dataset.finalctaInit === "1") return;
  section.dataset.finalctaInit = "1";

  const mm = gsap.matchMedia();

  mm.add(
    {
      reduce: "(prefers-reduced-motion: reduce)",
      ok: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reduce } = context.conditions;
      const splitLines = gsap.utils.toArray(".finalcta__split", section);
      const closing = section.querySelector(".finalcta__closing");
      const reassurance = section.querySelector(".finalcta__reassurance");
      const cta = section.querySelector(".finalcta__cta");

      // reduced-motion: contenido visible, sin animar.
      if (reduce) {
        gsap.set([...splitLines, reassurance, cta], { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      // Desplazamiento de entrada de los caracteres: menor en mobile para no
      // provocar overflow horizontal ni recorridos exagerados en pantallas chicas.
      const xOffset = window.matchMedia("(max-width: 768px)").matches ? 70 : 150;

      const splits = [];
      let ctx;

      // CRÍTICO: partir el texto DESPUÉS de cargar las fuentes. Antes, SplitText
      // mide mal los saltos de línea.
      document.fonts.ready.then(() => {
        ctx = gsap.context(() => {
          splitLines.forEach((line) => {
            const isProof = line.classList.contains("finalcta__proof");
            const split = SplitText.create(line, {
              type: isProof ? "lines" : "chars, words, lines",
            });
            splits.push(split);

            // Prueba social (frase larga): por líneas con giro 3D. La
            // perspective en el contenedor es necesaria para que el
            // rotationX tenga profundidad real (el pen la hereda de su CSS).
            if (isProof) {
              gsap.set(line, { perspective: 400 });
              gsap.from(split.lines, {
                rotationX: -100,
                transformOrigin: "50% 50% -160px",
                opacity: 0,
                duration: 1.5,
                ease: "power3",
                stagger: 0.25,
                scrollTrigger: { trigger: line, start: "top 75%", once: true },
              });
              return;
            }

            gsap.from(split.chars, {
              x: xOffset,
              opacity: 0,
              duration: 1.1,
              ease: "power4.out",
              stagger: 0.058,
              scrollTrigger: { trigger: line, start: "top 75%", once: true },
            });
          });

          // Remate: tranquilidad + botón entran juntos, fade-up simple.
          gsap.from([reassurance, cta], {
            opacity: 0,
            y: 24,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: { trigger: closing, start: "top 80%", once: true },
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
