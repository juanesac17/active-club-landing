import { gsap, ScrollTrigger } from "./gsap.config.js";

const KEY_SCALE_START = 1.25;
const KEY_SCALE_END = 1;
const SCROLL_DISTANCE = "+=150%";
const UNMASK_AT = 0.72;
const REVEAL_AT = 0.8;
/** Fade del logo vertical (máscara) — corto. */
const LOGO_FADE_DURATION = 0.35;
const LOGO_FADE_START = 0.05;
/** Fade del cue “Scroll” — empieza al scrollear, mucho más lento. */
const SCROLL_CUE_FADE_DURATION = 0.85;
/** Multiplicador de crecimiento: máscara vertical + logos intro. */
const MASK_GROWTH = 4;

let introProgress = 1;

/** Ancho renderizado del logo vertical (referencia para logo-vertical-mask.svg). */
function measureIntroLogoWidth(keyLogo) {
  const svg = keyLogo?.querySelector("svg");
  if (!svg) return null;
  const w = svg.getBoundingClientRect().width;
  return w > 0 ? w : null;
}

function maskSizePx(width) {
  return `${width}px auto`;
}

/**
 * Intro invertida (GTA VI):
 * - Máscara vertical y logo vertical escalan juntos desde el mismo ancho.
 * - Escena con zoom out (1.25 → 1).
 */
export function initIntro() {
  const hero = document.querySelector("#hero");
  const mask = document.getElementById("hero-logo-mask");
  const key = document.getElementById("hero-key");
  const introLogos = document.getElementById("hero-intro-logos");
  const keyLogo = document.getElementById("hero-key-logo");
  const scrollCue = document.getElementById("hero-scroll-cue");
  const sceneOverlay = hero?.querySelector(".hero__scene-overlay");

  if (!hero || !mask || !key || !introLogos || hero.dataset.introInit === "1") {
    return () => {};
  }
  hero.dataset.introInit = "1";

  let contentRevealed = false;

  const syncIntroState = (progress) => {
    introProgress = progress;
    const unmasked = progress >= UNMASK_AT;
    const complete = progress >= REVEAL_AT;

    hero.classList.toggle("is-intro-unmasked", unmasked);
    hero.classList.toggle("is-intro-complete", complete);

    if (complete && !contentRevealed) {
      contentRevealed = true;
      hero.dispatchEvent(new CustomEvent("intro:reveal", { bubbles: false }));
    } else if (!complete && contentRevealed) {
      contentRevealed = false;
      hero.dispatchEvent(new CustomEvent("intro:hide", { bubbles: false }));
    }
  };

  const mm = gsap.matchMedia();
  let ctx;

  mm.add(
    {
      reduce: "(prefers-reduced-motion: reduce)",
      ok: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reduce } = context.conditions;

      if (reduce) {
        introProgress = 1;
        hero.classList.add("is-intro-unmasked", "is-intro-complete");
        gsap.set(introLogos, { opacity: 0 });
        if (scrollCue) gsap.set(scrollCue, { autoAlpha: 0 });
        syncIntroState(1);
        return;
      }

      const applyIntroMetrics = () => {
        const startW = measureIntroLogoWidth(keyLogo) ?? 168;
        const endW = Math.max(hero.offsetWidth, hero.offsetHeight) * MASK_GROWTH;
        const grow = endW / startW;

        return { startW, endW, grow };
      };

      introProgress = 0;
      hero.classList.remove("is-intro-unmasked", "is-intro-complete");

      const { startW, endW, grow } = applyIntroMetrics();

      gsap.set(key, { scale: KEY_SCALE_START });
      gsap.set(mask, {
        maskSize: maskSizePx(startW),
        WebkitMaskSize: maskSizePx(startW),
      });
      gsap.set(introLogos, { scale: 1, opacity: 1, transformOrigin: "50% 50%" });
      if (scrollCue) gsap.set(scrollCue, { autoAlpha: 0.9 });
      if (sceneOverlay) gsap.set(sceneOverlay, { opacity: 0 });

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: "hero-intro",
            trigger: hero,
            start: "top top",
            end: SCROLL_DISTANCE,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => syncIntroState(self.progress),
            onLeaveBack: (self) => syncIntroState(self.progress),
            onRefresh: () => {
              const m = applyIntroMetrics();
              gsap.set(mask, {
                maskSize: maskSizePx(m.startW),
                WebkitMaskSize: maskSizePx(m.startW),
              });
              gsap.set(introLogos, { scale: 1 });
              if (scrollCue) gsap.set(scrollCue, { autoAlpha: 0.9 });
            },
          },
        });

        tl.to(key, { scale: KEY_SCALE_END, duration: 1 }, 0)
          .to(
            mask,
            {
              maskSize: maskSizePx(endW),
              WebkitMaskSize: maskSizePx(endW),
              duration: 1,
            },
            0
          )
          .to(introLogos, { scale: grow, duration: 1 }, 0)
          .to(introLogos, { opacity: 0, duration: LOGO_FADE_DURATION }, LOGO_FADE_START);

        if (scrollCue) {
          tl.to(scrollCue, { autoAlpha: 0, duration: SCROLL_CUE_FADE_DURATION }, 0);
        }

        if (sceneOverlay) {
          tl.to(sceneOverlay, { opacity: 1, duration: 0.45 }, 0.55);
        }
      }, hero);

      return () => {
        ctx?.revert();
        introProgress = 1;
      };
    },
    hero
  );

  return () => {
    mm.revert();
  };
}
