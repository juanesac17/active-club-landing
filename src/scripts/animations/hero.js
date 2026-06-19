import gsap from "gsap";

/**
 * Animaciones del Hero (capa 2).
 * - Entrada en stagger al cargar.
 * - Palabra rotatoria (salida y entrada simultáneas) sincronizada con los dots.
 * - Parallax sutil con el mouse (foto + número fantasma).
 *
 * Respeta prefers-reduced-motion vía gsap.matchMedia(): si el usuario
 * pide menos movimiento, todo queda estático y visible.
 *
 * El markup esconde [data-hero-nav]/[data-hero-reveal]/.hero__rotator solo
 * cuando hay JS y no hay reduced-motion (anti-FOUC), así que acá los revelamos.
 */
const HOLD = 2.8; // segundos por palabra

export function initHero() {
  const hero = document.querySelector("#hero");
  if (!hero || hero.dataset.heroInit === "1") return;
  hero.dataset.heroInit = "1";

  const rotator = hero.querySelector("[data-hero-rotator]");
  const wordEl = rotator?.querySelector(".hero__word");
  const words = safeWords(rotator);
  const dots = [...hero.querySelectorAll("[data-hero-dots] li")];
  const bgImg = hero.querySelector(".hero__bg img");

  const mm = gsap.matchMedia();

  mm.add(
    {
      reduce: "(prefers-reduced-motion: reduce)",
      ok: "(prefers-reduced-motion: no-preference)",
    },
    (ctx) => {
      const { reduce } = ctx.conditions;
      const reveals = gsap.utils.toArray("[data-hero-nav], [data-hero-reveal], .hero__rotator");

      // --- Reduced motion: todo visible y quieto, sin rotación ---
      if (reduce) {
        gsap.set(reveals, { autoAlpha: 1, y: 0 });
        return;
      }

      // --- Entrada en stagger ---
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(
          "[data-hero-nav]",
          { autoAlpha: 0, y: -18 },
          { autoAlpha: 1, y: 0, duration: 0.6 }
        )
        .fromTo(
          reveals.filter((el) => !el.matches("[data-hero-nav]")),
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12 },
          "-=0.3"
        )
        .add(startRotation, "-=0.2");

      // --- Palabra rotatoria + sincronía ---
      let i = 0;
      let loop;

      function startRotation() {
        if (!wordEl || words.length < 2) return;
        // Timeline-temporizador: cada repetición dispara el cambio de palabra.
        loop = gsap.timeline({ repeat: -1, onRepeat: advance });
        loop.to({}, { duration: HOLD });
      }

      function advance() {
        i = (i + 1) % words.length;

        // Clon saliente (posición absoluta) para que la palabra que sale y la
        // que entra se muevan AL MISMO TIEMPO: ambas suben, una se va y otra entra.
        const leaving = wordEl.cloneNode(true);
        leaving.classList.add("is-leaving");
        rotator.appendChild(leaving);

        wordEl.textContent = words[i];

        gsap
          .timeline({ defaults: { ease: "power2.inOut", duration: 0.55 } })
          .fromTo(wordEl, { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1 }, 0)
          .to(leaving, { yPercent: -110, autoAlpha: 0, onComplete: () => leaving.remove() }, 0);

        dots.forEach((d, idx) => d.classList.toggle("is-active", idx === i));
      }

      // --- Parallax con el mouse (foto + número fantasma) ---
      let cleanupParallax = () => {};
      if (bgImg && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        gsap.set(bgImg, { scale: 1.06 });

        const imgX = gsap.quickTo(bgImg, "x", { duration: 0.6, ease: "power3" });
        const imgY = gsap.quickTo(bgImg, "y", { duration: 0.6, ease: "power3" });

        let rect = hero.getBoundingClientRect();
        const cacheRect = () => (rect = hero.getBoundingClientRect());
        const onMove = (e) => {
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;
          imgX(nx * -22);
          imgY(ny * -22);
        };

        hero.addEventListener("mousemove", onMove);
        window.addEventListener("resize", cacheRect);
        cleanupParallax = () => {
          hero.removeEventListener("mousemove", onMove);
          window.removeEventListener("resize", cacheRect);
        };
      }

      // Cleanup (matchMedia revierte los tweens; matamos timelines y listeners)
      return () => {
        loop?.kill();
        intro.kill();
        cleanupParallax();
      };
    },
    hero // scope de los selectores
  );
}

function safeWords(rotator) {
  try {
    return JSON.parse(rotator?.dataset.words || "[]");
  } catch {
    return [];
  }
}
