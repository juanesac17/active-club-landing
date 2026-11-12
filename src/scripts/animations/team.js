import { gsap } from "./gsap.config.js";

const HOVER_QUERY = "(hover: hover) and (min-width: 900px)";
const MOBILE_QUERY = "(max-width: 899.98px)";

/**
 * En mobile, al abrir un panel se cierra el que estaba abierto arriba y todo
 * el contenido sube: la franja tocada se iría hacia arriba de la pantalla.
 * Mientras dura la transición se compensa el scroll para que la franja quede
 * fija y el panel se perciba abriéndose hacia abajo.
 */
function keepTriggerInPlace(trigger, durationMs) {
  const startTop = trigger.getBoundingClientRect().top;
  const endAt = performance.now() + durationMs + 80;

  const step = () => {
    const delta = trigger.getBoundingClientRect().top - startTop;
    // "instant": el html usa scroll-behavior: smooth y desfasaría la compensación.
    if (delta !== 0) window.scrollBy({ top: delta, behavior: "instant" });
    if (performance.now() < endAt) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

function getTransitionMs(element) {
  const value = getComputedStyle(element).getPropertyValue("--team-duration").trim();
  const seconds = Number.parseFloat(value);
  if (Number.isNaN(seconds)) return 500;
  return value.endsWith("ms") ? seconds : seconds * 1000;
}

/**
 * Acordeón del equipo — independiente de GSAP.
 * Solo un panel abierto a la vez; el estado vive en data-open + ARIA.
 * Los contenidos cerrados quedan inert y aria-hidden para no ser leídos ni enfocados.
 */
export function initTeamAccordion(section) {
  const panels = Array.from(section.querySelectorAll("[data-team-panel]"));
  if (panels.length === 0) return;

  const setOpen = (target) => {
    panels.forEach((panel) => {
      const isOpen = panel === target;
      const trigger = panel.querySelector("[data-team-trigger]");
      const content = panel.querySelector("[data-team-content]");

      panel.dataset.open = isOpen ? "true" : "false";
      trigger?.setAttribute("aria-expanded", isOpen ? "true" : "false");

      if (content) {
        content.inert = !isOpen;
        if (isOpen) content.removeAttribute("aria-hidden");
        else content.setAttribute("aria-hidden", "true");
      }
    });
  };

  const hoverMedia = window.matchMedia(HOVER_QUERY);
  const mobileMedia = window.matchMedia(MOBILE_QUERY);

  panels.forEach((panel) => {
    const trigger = panel.querySelector("[data-team-trigger]");

    trigger?.addEventListener("click", () => {
      if (panel.dataset.open === "true") return;
      if (mobileMedia.matches) keepTriggerInPlace(trigger, getTransitionMs(panel));
      setOpen(panel);
    });

    // Hover solo en desktop con puntero fino; en táctil abre el toque.
    panel.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "mouse" || !hoverMedia.matches) return;
      if (panel.dataset.open !== "true") setOpen(panel);
    });
  });
}

/**
 * Equipo — acordeón de paneles con entrada escalonada.
 * El acordeón funciona aunque la animación de entrada no corra.
 */
export function initTeam() {
  const section = document.querySelector("[data-team-section]");
  if (!section || section.dataset.teamInit === "1") return;

  const header = section.querySelector("[data-team-header]");
  const panels = section.querySelectorAll("[data-team-panel]");
  if (!header || panels.length === 0) return;

  section.dataset.teamInit = "1";

  initTeamAccordion(section);

  const mm = gsap.matchMedia();

  mm.add(
    {
      reduce: "(prefers-reduced-motion: reduce)",
      ok: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reduce } = context.conditions;
      const targets = [header, ...panels];

      if (reduce) {
        gsap.set(targets, { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      gsap
        .timeline({
          scrollTrigger: {
            id: "team-reveal",
            trigger: section,
            start: "top 72%",
            once: true,
          },
        })
        .from(header, {
          autoAlpha: 0,
          y: 24,
          duration: 0.55,
          ease: "power2.out",
        })
        .from(
          panels,
          {
            autoAlpha: 0,
            y: 32,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.08,
            clearProps: "transform",
          },
          0.12
        );
    },
    section
  );

  return () => mm.revert();
}
