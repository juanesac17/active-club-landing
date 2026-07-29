import { createWhatsAppHref } from "./brand";

export interface PlanCta {
  readonly label: string;
  readonly href: string;
}

export interface Plan {
  readonly id: string;
  readonly name: string;
  readonly focus: string;
  readonly price: string;
  readonly features: readonly string[];
  readonly description: string;
  readonly featured: boolean;
  readonly cta: PlanCta;
}

const PLAN_CTA_LABEL = "Quiero este plan";

const createPlanCta = (planName: string): PlanCta => ({
  label: PLAN_CTA_LABEL,
  href: createWhatsAppHref(
    `Hola Active Club, quiero adquirir el plan ${planName}.`
  ),
});

export const PLANS = [
  {
    id: "starter",
    name: "Starter",
    focus: "Para comenzar con una ruta clara.",
    price: "$180.000",
    features: [
      "Entrenamiento virtual",
      "Plan personalizado",
      "Seguimiento mensual",
    ],
    description:
      "Una opción para quienes quieren comenzar o retomar su entrenamiento con una planificación adaptada a su nivel, objetivos y disponibilidad. Recibirás una ruta clara para entrenar de forma virtual, acompañada de seguimiento mensual para revisar avances y mantener el proceso en dirección.",
    featured: false,
    cta: createPlanCta("Starter"),
  },
  {
    id: "active",
    name: "Active",
    focus: "Para combinar autonomía y acompañamiento presencial.",
    price: "$320.000",
    features: [
      "Cuatro sesiones presenciales al mes",
      "Ajustes quincenales",
      "Soporte por WhatsApp",
    ],
    description:
      "Un plan para quienes buscan combinar la flexibilidad del entrenamiento autónomo con acompañamiento presencial frecuente. Las sesiones presenciales, los ajustes quincenales y el soporte por WhatsApp permiten adaptar el proceso con mayor cercanía a medida que avanzas.",
    featured: true,
    cta: createPlanCta("Active"),
  },
  {
    id: "elite",
    name: "Elite",
    focus: "Para un acompañamiento más frecuente e individualizado.",
    price: "$480.000",
    features: [
      "Sesiones presenciales ilimitadas",
      "Acompañamiento dedicado",
      "Evaluación física mensual",
    ],
    description:
      "La alternativa de acompañamiento más completo para quienes necesitan atención frecuente y un proceso altamente individualizado. Incluye acceso ilimitado a sesiones presenciales, seguimiento dedicado y una evaluación física mensual para tomar decisiones con información actualizada.",
    featured: false,
    cta: createPlanCta("Elite"),
  },
] as const satisfies readonly Plan[];
