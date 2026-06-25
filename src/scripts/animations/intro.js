import { gsap } from "./gsap.config.js";

const KEY_SCALE_START = 1.25;
const KEY_SCALE_END = 1;
/** Punto del timeline donde se quita la máscara (escena completa). */
const UNMASK_AT = 0.7;
/** Punto del timeline donde entra la UI del hero. */
const REVEAL_AT = 0.82;
/** Duración del crecimiento de la máscara (seg). */
const INTRO_DURATION = 0.75;
/** Multiplicador de crecimiento: máscara vertical + logos intro. */
const MASK_GROWTH = 4;
/** Hold tras terminar la entrada antes de soltar el scroll (seg). */
const UNLOCK_HOLD = 0.25;

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

function lockScroll() {
  document.documentElement.classList.add("intro-lock");
}

function unlockScroll() {
  document.documentElement.classList.remove("intro-lock");
}

/**
 * Intro invertida (GTA VI), dirigida por click:
 * - Un botón "Entrar" reproduce el timeline de una sola vez (sin scrub/pin).
 * - La máscara y el logo vertical escalan juntos; la escena hace zoom out (1.25 → 1).
 * - El scroll queda bloqueado hasta que la entrada del hero termina (no hay
 *   "pasarse de largo"). El gate aparece en cada carga (sin caché de sesión).
 */
export function initIntro() {
  const hero = document.querySelector("#hero");
  const mask = document.getElementById("hero-logo-mask");
  const key = document.getElementById("hero-key");
  const introLogos = document.getElementById("hero-intro-logos");
  const keyLogo = document.getElementById("hero-key-logo");
  const enterBtn = document.getElementById("hero-scroll-cue");
  const sceneOverlay = hero?.querySelector(".hero__scene-overlay");

  if (!hero || !mask || !key || !introLogos || hero.dataset.introInit === "1") {
    return () => {};
  }
  hero.dataset.introInit = "1";

  let contentRevealed = false;
  const reveal = () => {
    if (contentRevealed) return;
    contentRevealed = true;
    hero.dispatchEvent(new CustomEvent("intro:reveal", { bubbles: false }));
  };

  const setUnmasked = () => hero.classList.add("is-intro-unmasked");
  const setComplete = () => {
    hero.classList.add("is-intro-complete");
    reveal();
  };

  /** Salta el gate: hero directo, sin máscara, sin lock. */
  const skipIntro = () => {
    hero.classList.add("is-intro-unmasked", "is-intro-complete");
    gsap.set(introLogos, { opacity: 0 });
    if (enterBtn) gsap.set(enterBtn, { autoAlpha: 0, pointerEvents: "none" });
    unlockScroll();
    reveal();
  };

  const mm = gsap.matchMedia();
  let ctx;
  let onEntered;
  let onClick;

  mm.add(
    {
      reduce: "(prefers-reduced-motion: reduce)",
      ok: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reduce } = context.conditions;

      // Reduced-motion → directo al hero (el contenido se ve por CSS, sin gate).
      if (reduce) {
        skipIntro();
        return;
      }

      // Gate con botón en cada carga.
      const startW = measureIntroLogoWidth(keyLogo) ?? 168;
      const endW = Math.max(hero.offsetWidth, hero.offsetHeight) * MASK_GROWTH;
      const grow = endW / startW;

      hero.classList.remove("is-intro-unmasked", "is-intro-complete");

      gsap.set(key, { scale: KEY_SCALE_START });
      gsap.set(mask, {
        maskSize: maskSizePx(startW),
        WebkitMaskSize: maskSizePx(startW),
      });
      gsap.set(introLogos, { scale: 1, opacity: 1, transformOrigin: "50% 50%" });
      if (sceneOverlay) gsap.set(sceneOverlay, { opacity: 0 });
      if (enterBtn) gsap.set(enterBtn, { autoAlpha: 0.95 });

      lockScroll();

      // El scroll se suelta recién cuando la entrada del hero terminó (+ hold).
      onEntered = () => gsap.delayedCall(UNLOCK_HOLD, unlockScroll);
      hero.addEventListener("hero:entered", onEntered);

      let played = false;
      onClick = () => {
        if (played) return;
        played = true;
        if (enterBtn) enterBtn.disabled = true;

        ctx = gsap.context(() => {
          const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

          tl.to(key, { scale: KEY_SCALE_END, duration: INTRO_DURATION }, 0)
            .to(
              mask,
              {
                maskSize: maskSizePx(endW),
                WebkitMaskSize: maskSizePx(endW),
                duration: INTRO_DURATION,
              },
              0
            )
            .to(introLogos, { scale: grow, duration: INTRO_DURATION }, 0)
            .to(introLogos, { opacity: 0, duration: 0.4 }, 0.08);

          if (enterBtn) {
            tl.to(enterBtn, { autoAlpha: 0, duration: 0.35 }, 0);
          }
          if (sceneOverlay) {
            tl.to(sceneOverlay, { opacity: 1, duration: 0.5 }, INTRO_DURATION * 0.55);
          }

          tl.call(setUnmasked, null, INTRO_DURATION * UNMASK_AT)
            .call(setComplete, null, INTRO_DURATION * REVEAL_AT);
        }, hero);
      };

      if (enterBtn) enterBtn.addEventListener("click", onClick);

      return () => {
        ctx?.revert();
        if (enterBtn && onClick) enterBtn.removeEventListener("click", onClick);
        if (onEntered) hero.removeEventListener("hero:entered", onEntered);
        unlockScroll();
      };
    },
    hero
  );

  return () => {
    mm.revert();
  };
}
