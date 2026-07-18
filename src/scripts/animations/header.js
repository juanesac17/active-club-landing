/**
 * Header — identidad, navegación y conversión en tres pills.
 *
 * Comportamiento:
 *   - OCULTA durante la intro de la máscara del logo (mientras el usuario
 *     aún no hizo click en "Comencemos" o el contenido no se reveló).
 *   - Se vuelve VISIBLE cuando se dispara el evento `hero:entered` (la
 *     intro terminó y la escena completa está a la vista).
 *   - Se vuelve fixed al abandonar el inicio y permanece disponible.
 *
 * También maneja el toggle del menú mobile.
 */
import { gsap, ScrollTrigger } from "./gsap.config.js";

const HEADER_SELECTOR = "[data-header]";
const HERO_SELECTOR = "#hero";

export function initHeader() {
  const header = document.querySelector(HEADER_SELECTOR);
  if (!header) return;

  setupHeroVisibility(header);
  setupMobileToggle(header);
  setupSmoothAnchors(header);
}

function setupHeroVisibility(header) {
  const hero = document.querySelector(HERO_SELECTOR);
  if (!hero) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Estado inicial: oculta hasta que la intro del hero termine.
  // El CSS del componente ya la arranca con opacity:0; aquí solo
  // sincronizamos el estado de GSAP para los tweens siguientes.
  gsap.set(header, { autoAlpha: 0, y: -12 });

  // Si la intro ya terminó antes de que este script se monte (caso raro:
  // caché de página, hidratación rápida), la mostramos sin esperar evento.
  if (hero.classList.contains("is-intro-complete")) {
    gsap.set(header, { autoAlpha: 1, y: 0 });
  } else {
    hero.addEventListener(
      "hero:entered",
      () => {
        if (reduceMotion) {
          gsap.set(header, { autoAlpha: 1, y: 0 });
        } else {
          gsap.to(header, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      },
      { once: true }
    );
  }

  // La pill se vuelve fixed en cuanto el usuario empieza a scrollear dentro
  // del hero. Vuelve a su posición absoluta sobre el hero cuando el usuario
  // regresa al top absoluto.
  ScrollTrigger.create({
    trigger: hero,
    start: "top top-=10", // el top del hero se aleja del top del viewport
    end: "top top-=10",
    onEnter: () => {
      header.setAttribute("data-header-state", "fixed");
    },
    onLeaveBack: () => {
      // Solo volver al estado "hero" si la intro ya terminó
      if (!hero.classList.contains("is-intro-complete")) return;
      header.removeAttribute("data-header-state");
    },
  });
}

function setupMobileToggle(header) {
  const toggle = header.querySelector("[data-header-toggle]");
  const mobile = header.querySelector("[data-header-mobile]");
  if (!toggle || !mobile) return;

  const setOpen = (isOpen) => {
    header.setAttribute("data-mobile-open", String(isOpen));
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");

    if (isOpen) {
      mobile.removeAttribute("hidden");
    } else {
      mobile.setAttribute("hidden", "");
    }
  };

  toggle.addEventListener("click", () => {
    const isOpen = header.getAttribute("data-mobile-open") === "true";
    setOpen(!isOpen);
  });

  // Cerrar al hacer click en un link del menú mobile
  mobile.querySelectorAll("[data-header-mobile-link]").forEach((link) => {
    link.addEventListener("click", () => {
      setOpen(false);
      toggle.focus({ preventScroll: true });
    });
  });

  const desktopMedia = window.matchMedia("(min-width: 761px)");
  desktopMedia.addEventListener("change", ({ matches }) => {
    if (matches) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (header.getAttribute("data-mobile-open") !== "true") return;

    setOpen(false);
    toggle.focus();
  });
}

function setupSmoothAnchors(header) {
  header.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return; // anclas a secciones inexistentes → no hacer nada

      e.preventDefault();
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  });
}
