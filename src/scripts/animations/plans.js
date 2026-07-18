/**
 * Sección 7 — Planes.
 * Spotlight neutral que sigue al cursor dentro de cada card: actualiza
 * las CSS vars --spot-x/--spot-y y el ::after (radial-gradient) del
 * componente hace el resto. Sin GSAP: es un efecto 1:1 con el puntero,
 * no una animación con timeline.
 *
 * Con prefers-reduced-motion el seguimiento se omite y el CSS muestra
 * un glow estático centrado en el hover.
 */
export function initPlans() {
  const section = document.querySelector(".plans");
  if (!section || section.dataset.plansInit === "1") return;
  section.dataset.plansInit = "1";

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) return;

  const cards = section.querySelectorAll(".plans__card");

  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    });
  });
}
