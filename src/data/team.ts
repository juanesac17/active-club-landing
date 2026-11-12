import type { ImageMetadata } from "astro";
import juanImage from "../assets/images/juan-image.webp";
import agustinImage from "../assets/images/agustin-image.webp";
import jhonImage from "../assets/images/jhon-image.webp";
import carolinaImage from "../assets/images/carolina-image.webp";
import { createWhatsAppHref, type Link } from "./brand";

export interface TeamMember {
  readonly name: string;
  readonly role: string;
  readonly description: string;
  /** Opcional: sin imagen, el panel muestra las iniciales del nombre. */
  readonly image?: ImageMetadata;
}

export interface TeamCta extends Link {
  readonly description: string;
}

export interface TeamData {
  readonly heading: string;
  readonly intro?: string;
  readonly members: readonly TeamMember[];
  readonly cta: TeamCta;
}

export const TEAM_DATA = {
  heading: "El equipo detrás de cada proceso",
  intro:
    "Te acompañamos en cada etapa con experiencia, buen trato y atención a lo que realmente importa.",
  members: [
    {
      name: "Entrenador",
      role: "Juan Esteban Arias · Entrenador deportivo",
      description:
        "Profesional en Entrenamiento Deportivo de la Universidad de Antioquia. Diseña procesos responsables y personalizados para mejorar la salud, el bienestar y el rendimiento de cada persona.",
      image: juanImage,
    },
    {
      name: "Nutricionista",
      role: "Agustín Arenas · Universidad de Antioquia",
      description:
        "Creo en la alimentación y el entrenamiento como herramientas para transformar vidas. Mi propósito es acompañarte a mejorar tu salud, alcanzar tus objetivos físicos y construir hábitos sostenibles mediante un enfoque nutricional integral y personalizado.",
      image: agustinImage,
    },
    {
      name: "Masoterapeuta",
      role: "Jhon Fredy Cataño",
      description:
        "Creo que el bienestar va más allá de lo físico. A través de diferentes técnicas de masaje, busco aliviar tensiones musculares, reducir el estrés y favorecer la recuperación, brindándote un espacio para reconectar con tu cuerpo y encontrar equilibrio.",
      image: jhonImage,
    },
    {
      name: "Fisioterapeuta",
      role: "Carolina Bustamante · FUMC",
      description:
        "La fisioterapia es fundamental para moverte mejor, prevenir lesiones y optimizar tu rendimiento físico. Mi propósito es acompañarte en procesos de prevención, recuperación y readaptación, promoviendo un movimiento seguro, funcional y adaptado a tus necesidades.",
      image: carolinaImage,
    },
  ],
  cta: {
    description:
      "Cada servicio es independiente: elige solo el que necesitas o combínalos según tu objetivo.",
    label: "Quiero agendar con el equipo",
    href: createWhatsAppHref(
      "Hola, quiero agendar una cita con el equipo de Active Club. Me gustaría saber qué profesional se adapta mejor a mis objetivos."
    ),
  },
} as const satisfies TeamData;
