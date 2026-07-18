import { gsap } from "./gsap.config.js";
import { initIntro } from "./intro.js";

/**
 * Animaciones del Hero (capa 2).
 * - Intro invertida (intro.js): máscara crece, UI entra al ~80%.
 * - Franja de propuesta rápida con rotator de palabras (cada 2.2s).
 * - Parallax sutil sobre la foto de la escena enmascarada.
 */
const HOLD = 2.2;

export function initHero() {
  const hero = document.querySelector("#hero");
  if (!hero || hero.dataset.heroInit === "1") return;
  hero.dataset.heroInit = "1";

  const cleanupIntro = initIntro();

  const rotator = hero.querySelector("[data-hero-pitch-rotator]");
  const wordEl = rotator?.querySelector(".hero__pitch-word");
  const words = safeWords(rotator);
  const bgImg = hero.querySelector("[data-hero-bg]");

  const mm = gsap.matchMedia();

  mm.add(
    {
      reduce: "(prefers-reduced-motion: reduce)",
      ok: "(prefers-reduced-motion: no-preference)",
    },
    (ctx) => {
      const { reduce } = ctx.conditions;
      const reveals = gsap.utils.toArray(
        "[data-hero-reveal], [data-hero-intro-ui], .hero__pitch-word"
      );

      if (reduce) {
        gsap.set(reveals, { autoAlpha: 1, y: 0 });
        return;
      }

      let entrancePlayed = false;
      let entranceTl;
      let loop;
      let i = 0;

      const hideEntrance = () => {
        if (!entrancePlayed) return;
        entrancePlayed = false;

        loop?.kill();
        loop = null;
        entranceTl?.kill();
        entranceTl = null;

        gsap.killTweensOf(reveals);
        gsap.set("[data-hero-reveal], [data-hero-intro-ui], .hero__pitch-word", {
          autoAlpha: 0,
          y: 24,
        });

        rotator
          ?.querySelectorAll(".hero__pitch-word.is-leaving")
          .forEach((el) => el.remove());
        if (wordEl && words.length) {
          i = 0;
          wordEl.textContent = words[0];
          gsap.set(wordEl, { yPercent: 0, autoAlpha: 1 });
        }
      };

      const playEntrance = () => {
        if (entrancePlayed) return;
        entrancePlayed = true;

        entranceTl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () =>
            hero.dispatchEvent(new CustomEvent("hero:entered", { bubbles: false })),
        });
        entranceTl
          .fromTo(
            reveals,
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12 }
          )
          .add(startRotation, "-=0.2");
      };

      hero.addEventListener("intro:reveal", playEntrance);
      hero.addEventListener("intro:hide", hideEntrance);

      function startRotation() {
        if (!wordEl || words.length < 2) return;
        loop = gsap.timeline({ repeat: -1, onRepeat: advance });
        loop.to({}, { duration: HOLD });
      }

      function advance() {
        i = (i + 1) % words.length;

        const leaving = wordEl.cloneNode(true);
        leaving.classList.add("is-leaving");
        rotator.appendChild(leaving);

        wordEl.textContent = words[i];

        gsap
          .timeline({ defaults: { ease: "power2.inOut", duration: 0.55 } })
          .fromTo(
            wordEl,
            { yPercent: 110, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1 },
            0
          )
          .to(
            leaving,
            { yPercent: -110, autoAlpha: 0, onComplete: () => leaving.remove() },
            0
          );
      }

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

      return () => {
        loop?.kill();
        entranceTl?.kill();
        cleanupParallax();
        hero.removeEventListener("intro:reveal", playEntrance);
        hero.removeEventListener("intro:hide", hideEntrance);
        cleanupIntro();
      };
    },
    hero
  );
}

function safeWords(rotator) {
  try {
    return JSON.parse(rotator?.dataset.words || "[]");
  } catch {
    return [];
  }
}
