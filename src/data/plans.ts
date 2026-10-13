import { createWhatsAppHref } from "./brand";

export interface PlanCta {
  readonly label: string;
  readonly href: string;
}

export interface PlanDescription {
  readonly paragraphs: readonly string[];
  readonly recommendedFor: readonly string[];
}

export interface Plan {
  readonly id: string;
  readonly name: string;
  readonly focus: string;
  readonly price: string;
  readonly features: readonly string[];
  readonly description: PlanDescription;
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
    price: "$200.000 COP/mes",
    features: [
      "Entrenamiento virtual y 2 sesiones presenciales por semana",
      "Plan personalizado",
      "Seguimiento mensual",
      "Ajustes básicos según evolución",
      "Orientación general por WhatsApp",
      "Recomendación de movilidad",
    ],
    description: {
      paragraphs: [
        "Un plan diseñado para personas que quieren empezar a entrenar con estructura, pero que prefieren hacerlo de forma autónoma. Recibes una planificación personalizada según tu objetivo, tu nivel actual y tu disponibilidad semanal.",
      ],
      recommendedFor: [
        "Personas con poco tiempo",
        "Personas que entrenan en gimnasio o casa",
        "Personas que quieren mejorar su salud general",
      ],
    },
    featured: false,
    cta: createPlanCta("Starter"),
  },
  {
    id: "duo",
    name: "Active Duo",
    focus: "Para entrenar acompañado.",
    price: "$260.000 COP/mes",
    features: [
      "2 sesiones presenciales por semana en formato dúo",
      "Plan personalizado",
      "Ajustes quincenales",
      "Soporte por WhatsApp",
      "Corrección técnica durante las sesiones",
      "Ajustes básicos según evolución",
    ],
    description: {
      paragraphs: [
        "Un plan pensado para dos personas que quieren entrenar juntas, mantenerse constantes y recibir acompañamiento profesional sin perder la atención individual.",
      ],
      recommendedFor: [
        "Parejas que quieren entrenar juntas",
        "Amigos o familiares con objetivos similares",
        "Quienes buscan motivación mutua",
      ],
    },
    featured: false,
    cta: createPlanCta("Active Duo"),
  },
  {
    id: "active",
    name: "Active",
    focus: "Para combinar autonomía y acompañamiento presencial.",
    price: "$400.000 COP/mes",
    features: [
      "4 sesiones presenciales al mes",
      "Ajustes quincenales",
      "Soporte por WhatsApp",
      "Corrección técnica durante las sesiones presenciales",
      "Seguimiento de progreso",
      "Adaptación del plan según evolución, objetivo y disponibilidad",
    ],
    description: {
      paragraphs: [
        "Un plan híbrido pensado para personas que quieren entrenar con una planificación clara, pero también necesitan sesiones presenciales para corregir técnica, resolver dudas y mantener mayor compromiso con el proceso.",
      ],
      recommendedFor: [
        "Personas que ya entrenan, pero necesitan orientación",
        "⁠Personas que quieren mejorar fuerza, salud o composición corporal",
        "Corredores que necesitan complementar su entrenamiento",
      ],
    },
    featured: true,
    cta: createPlanCta("Active"),
  },
  {
    id: "elite",
    name: "Elite",
    focus: "Para un acompañamiento más frecuente, cercano e individualizado.",
    price: "$780.000 COP/mes",
    features: [
      "Acompañamiento presencial frecuente",
      "Hasta 4 o 5 sesiones presenciales por semana",
      "Evaluaciones físicas",
      "Ajustes semanales del plan",
      "Control de cargas y progresión",
      "Acompañamiento dedicado según objetivo",
    ],
    description: {
      paragraphs: [
        "Un plan diseñado para personas que necesitan mayor presencia del entrenador, más control del proceso y un acompañamiento constante. Está pensado para quienes quieren entrenar con mayor frecuencia y recibir una atención más personalizada.",
      ],
      recommendedFor: [
        "Atletas o personas con objetivos físicos claros",
        "Quienes requieren atención personalizada frecuente",
        "Personas que requieren mayor estructura y seguimiento",
      ],
    },
    featured: false,
    cta: createPlanCta("Elite"),
  },
] as const satisfies readonly Plan[];
