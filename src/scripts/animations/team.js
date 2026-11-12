import { gsap } from "./gsap.config.js";

const HOVER_QUERY = "(hover: hover) and (min-width: 900px)";
const MOBILE_QUERY = "(max-width: 899.98px)";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function getTransitionSeconds(element) {
  const value = getComputedStyle(element).getPropertyValue("--team-duration").trim();
  const amount = Number.parseFloat(value);
  if (Number.isNaN(amount)) return 0.5;
  return value.endsWith("ms") ? amount / 1000 : amount;
}

/**
 * Carga y decodifica las fotos antes del primer toque: los paneles cerrados
 * tienen alto 0 y el lazy loading nativo no las pediría hasta abrirlos, así
 * que se descargarían y decodificarían en plena animación.
 */
function preloadImagesNearViewport(section) {
  const images = Array.from(section.querySelectorAll("img"));
  if (images.length === 0) return;

  const load = () => {
    images.forEach((image) => {
      image.loading = "eager";
      image.decode?.().catch(() => {});
    });
  };

  if (!("IntersectionObserver" in window)) {
    load();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      load();
    },
    { rootMargin: "100% 0px" }
  );
  observer.observe(section);
}

/**
 * Acordeón del equipo.
 * Solo un panel abierto a la vez; el estado vive en data-open + ARIA.
 * Los contenidos cerrados quedan inert y aria-hidden para no ser leídos ni enfocados.
 *
 * Desktop: fila de paneles animada por CSS (flex-grow); siempre hay uno abierto.
 * Mobile: columna de franjas; GSAP anima el alto de los contenidos en un solo
 * tween. El viewport NO se compensa frame a frame (en táctil, scrollBy por
 * frame mientras cambia el layout vibra): el contenido se reacomoda solo y, al
 * terminar, si la franja tocada quedó fuera de vista se hace un único scroll
 * suave hacia ella. Tocar la franja abierta la cierra.
 */
export function initTeamAccordion(section) {
  const panels = Array.from(section.querySelectorAll("[data-team-panel]"));
  if (panels.length === 0) return;

  const contents = panels.map((panel) => panel.querySelector("[data-team-content]"));
  const hoverMedia = window.matchMedia(HOVER_QUERY);
  const mobileMedia = window.matchMedia(MOBILE_QUERY);
  const reducedMotionMedia = window.matchMedia(REDUCED_MOTION_QUERY);
  let heightTween = null;

  const setOpen = (target) => {
    panels.forEach((panel, index) => {
      const isOpen = panel === target;
      const trigger = panel.querySelector("[data-team-trigger]");
      const content = contents[index];

      panel.dataset.open = isOpen ? "true" : "false";
      trigger?.setAttribute("aria-expanded", isOpen ? "true" : "false");

      if (content) {
        content.inert = !isOpen;
        if (isOpen) content.removeAttribute("aria-hidden");
        else content.setAttribute("aria-hidden", "true");
      }
    });
  };

  /**
   * Si al cerrarse el panel de arriba la franja tocada subió por detrás del
   * header fijo, la trae de vuelta con un solo scroll suave. scroll-margin-top
   * (Team.astro, mobile) deja el espacio del header.
   */
  const revealTrigger = (trigger) => {
    const panel = trigger.closest("[data-team-panel]");
    if (!panel) return;
    const offset = Number.parseFloat(getComputedStyle(panel).scrollMarginTop) || 0;
    if (panel.getBoundingClientRect().top >= offset) return;
    panel.scrollIntoView({
      behavior: reducedMotionMedia.matches ? "instant" : "smooth",
      block: "start",
    });
  };

  const stopHeightTween = () => {
    heightTween?.kill();
    heightTween = null;
    gsap.set(contents, { clearProps: "height" });
  };

  /** target null cierra todos los paneles. */
  const setOpenAnimated = (target, trigger) => {
    heightTween?.kill();

    // Alto actual (incluye el estado intermedio si se toca a mitad de animación).
    const fromHeights = contents.map((content) => content.offsetHeight);
    setOpen(target);
    gsap.set(contents, { height: (index) => fromHeights[index] });
    // scrollHeight da el alto natural aunque el contenido esté recortado.
    const toHeights = contents.map((content, index) =>
      panels[index] === target ? content.scrollHeight : 0
    );

    if (reducedMotionMedia.matches) {
      stopHeightTween();
      revealTrigger(trigger);
      return;
    }

    // Sin scroll anchoring nativo mientras dura el tween: si no, Chrome también
    // ajusta el scroll al cambiar el contenido y el viewport no queda libre.
    const root = document.documentElement;
    root.style.overflowAnchor = "none";

    heightTween = gsap.to(contents, {
      height: (index) => toHeights[index],
      duration: getTransitionSeconds(section.querySelector("[data-team-panels]") ?? section),
      ease: "power1.inOut",
      overwrite: true,
      onInterrupt: () => root.style.removeProperty("overflow-anchor"),
      onComplete: () => {
        heightTween = null;
        root.style.removeProperty("overflow-anchor");
        // Devuelve el control al CSS (alto auto / 0) para que se adapte a resize.
        gsap.set(contents, { clearProps: "height" });
        revealTrigger(trigger);
      },
    });
  };

  panels.forEach((panel) => {
    const trigger = panel.querySelector("[data-team-trigger]");

    trigger?.addEventListener("click", () => {
      const isOpen = panel.dataset.open === "true";

      if (mobileMedia.matches) {
        setOpenAnimated(isOpen ? null : panel, trigger);
        return;
      }

      if (!isOpen) setOpen(panel);
    });

    // Hover solo en desktop con puntero fino; en táctil abre el toque.
    panel.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "mouse" || !hoverMedia.matches) return;
      if (panel.dataset.open !== "true") setOpen(panel);
    });
  });

  // En desktop siempre debe haber un panel abierto: si se cerraron todos en
  // mobile y se pasa a desktop, se reabre el primero.
  mobileMedia.addEventListener("change", (event) => {
    stopHeightTween();
    const hasOpenPanel = panels.some((panel) => panel.dataset.open === "true");
    if (!event.matches && !hasOpenPanel) setOpen(panels[0]);
  });

  preloadImagesNearViewport(section);
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
