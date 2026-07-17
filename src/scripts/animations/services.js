import { gsap, Draggable } from "./gsap.config.js";

/**
 * Sección 6 — Servicios.
 * Infinite card slider con GSAP: cards grandes al centro, pequeñas y
 * tenues hacia los lados. Controlado por botones anterior/siguiente y
 * por arrastre (drag), SIN ScrollTrigger: el scroll de la página no se
 * secuestra.
 *
 * Patrón: buildSeamlessLoop crea un timeline "raw" con todas las cards
 * (incluyendo extras a los lados para empalmar el loop) y un timeline
 * "seamless" que scrubea el raw en un loop infinito. Botones y drag
 * mueven el playhead con scrub.invalidate().restart().
 *
 * El coverflow sale de solo DOS tweens por card:
 * - xPercent 150 → -150 lineal (recorrido horizontal completo).
 * - scale/opacity 0 → 1 con yoyo (pico exacto en el centro del stage).
 *
 * Con spacing 0.3 y duración 1, solo la card central ± 1 caen dentro
 * de la ventana visible de la animación: las demás quedan en
 * opacity 0. Resultado: activa al centro, prev y next al fondo.
 */
export function initServices() {
  const section = document.querySelector(".services");
  if (!section || section.dataset.servicesInit === "1") return;
  section.dataset.servicesInit = "1";

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) return; // CSS maneja el fallback: scroll horizontal nativo.

  const cards = gsap.utils.toArray(".services__card", section);
  const prevBtn = section.querySelector("[data-services-prev]");
  const nextBtn = section.querySelector("[data-services-next]");
  const dragProxy = section.querySelector("[data-services-drag-proxy]");
  const stage = section.querySelector("[data-services-stage]");
  if (cards.length < 2 || !prevBtn || !nextBtn) return;

  // Estado inicial: fuera del stage, invisibles. El seamlessLoop las
  // coloca en su posición real al renderizar el primer frame.
  gsap.set(cards, { xPercent: 150, opacity: 0, scale: 0 });

  // Separación entre cards en la timeline. 0.3 ⇒ solo caben la card
  // central y una a cada lado dentro de la ventana visible (±0.5).
  const spacing = 0.3;
  const snapTime = gsap.utils.snap(spacing);

  const animateFunc = (element) => {
    const tl = gsap.timeline();
    // power1.out: las cards vecinas (a ±spacing del centro) quedan
    // a ~64% de scale/opacity — visibles "al fondo" pero legibles.
    tl.fromTo(
      element,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        zIndex: 100,
        duration: 0.5,
        yoyo: true,
        repeat: 1,
        ease: "power1.out",
        immediateRender: false,
      }
    ).fromTo(
      element,
      { xPercent: 150 },
      { xPercent: -150, duration: 1, ease: "none", immediateRender: false },
      0
    );
    return tl;
  };

  const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);
  const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());

  // Proxy del playhead: scrub mueve el offset y onUpdate aplica el tiempo
  // envuelto al seamlessLoop. Paused para control manual (botones/drag).
  const playhead = { offset: 0 };
  const scrub = gsap.to(playhead, {
    offset: 0,
    onUpdate() {
      seamlessLoop.time(wrapTime(playhead.offset));
    },
    duration: 0.5,
    ease: "power3",
    paused: true,
  });

  /**
   * Mueve el slider a un offset snapeado a la card más cercana. El
   * offset puede crecer sin límite en ambas direcciones: wrapTime lo
   * envuelve dentro de la duración del loop.
   */
  const scrollToOffset = (offset) => {
    scrub.vars.offset = snapTime(offset);
    scrub.invalidate().restart();
  };

  prevBtn.addEventListener("click", () => {
    scrollToOffset(scrub.vars.offset - spacing);
  });
  nextBtn.addEventListener("click", () => {
    scrollToOffset(scrub.vars.offset + spacing);
  });

  // Drag sobre el stage (mobile-friendly): un proxy invisible recibe el
  // movimiento y lo convierte en offset del playhead.
  if (dragProxy && stage) {
    Draggable.create(dragProxy, {
      type: "x",
      trigger: stage,
      onPress() {
        this.startOffset = scrub.vars.offset;
      },
      onDrag() {
        scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.001;
        scrub.invalidate().restart();
      },
      onDragEnd() {
        scrollToOffset(scrub.vars.offset);
      },
    });
  }
}

/**
 * Construye un loop sin costura horizontal a partir de un array de items.
 * Técnica estándar de GSAP: se duplican los items a los lados para que
 * el "salto" entre el final y el principio nunca sea visible.
 */
function buildSeamlessLoop(items, spacing, animateFunc) {
  const overlap = Math.ceil(1 / spacing); // extras en cada extremo
  const startTime = items.length * spacing + 0.5;
  const loopTime = (items.length + overlap) * spacing + 1;

  const rawSequence = gsap.timeline({ paused: true });
  const seamlessLoop = gsap.timeline({
    paused: true,
    repeat: -1,
    onRepeat() {
      // Edge case raro de GSAP fixed en 3.6.1+.
      if (this._time === this._dur) this._tTime += this._dur - 0.01;
    },
  });

  const l = items.length + overlap * 2;

  for (let i = 0; i < l; i++) {
    const index = i % items.length;
    const time = i * spacing;
    rawSequence.add(animateFunc(items[index]), time);
  }

  // Scrub del rawSequence: el seamlessLoop lo mueve del "medio" al "fin" y
  // vuelve al "inicio" sin costura visible.
  rawSequence.time(startTime);
  seamlessLoop
    .to(rawSequence, {
      time: loopTime,
      duration: loopTime - startTime,
      ease: "none",
    })
    .fromTo(
      rawSequence,
      { time: overlap * spacing + 1 },
      {
        time: startTime,
        duration: startTime - (overlap * spacing + 1),
        immediateRender: false,
        ease: "none",
      }
    );

  return seamlessLoop;
}
