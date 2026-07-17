/**
 * Sección 8 — Preguntas frecuentes.
 * Acordeón: alterna aria-expanded en el botón y data-open en el ítem;
 * el CSS anima la altura (grid-template-rows 0fr → 1fr). Solo un ítem
 * abierto a la vez. Sin GSAP: es un toggle de estado, no una timeline.
 */
export function initFaq() {
  const section = document.querySelector(".faq");
  if (!section || section.dataset.faqInit === "1") return;
  section.dataset.faqInit = "1";

  const items = Array.from(section.querySelectorAll(".faq__item"));

  const setOpen = (item, open) => {
    const button = item.querySelector("[data-faq-toggle]");
    if (open) {
      item.setAttribute("data-open", "true");
    } else {
      item.removeAttribute("data-open");
    }
    button.setAttribute("aria-expanded", open ? "true" : "false");
  };

  items.forEach((item) => {
    const button = item.querySelector("[data-faq-toggle]");
    if (!button) return;

    button.addEventListener("click", () => {
      const isOpen = item.hasAttribute("data-open");
      // Cierra el resto: comportamiento acordeón de un solo panel.
      items.forEach((other) => {
        if (other !== item) setOpen(other, false);
      });
      setOpen(item, !isOpen);
    });
  });
}
