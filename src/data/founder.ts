export interface FounderData {
  readonly heading: string;
  readonly biography: string;
  readonly story: string;
}

export const FOUNDER_DATA = {
  heading: "Detrás de Active Club",
  biography:
    "Mi nombre es Juan Esteban Arias, soy el fundador de Active Club y profesional en Entrenamiento Deportivo de la Universidad de Antioquia. Mi trabajo se enfoca en crear procesos responsables, personalizados y adaptados a las necesidades de cada persona, entendiendo la salud, el movimiento y el rendimiento como partes de un mismo proceso.",
  story:
    "Fundé Active Club en 2024 con el propósito de ofrecer un acompañamiento más humano, profesional y cercano. Desde Active Club, ayudo a las personas a mejorar su salud, bienestar y rendimiento deportivo mediante una planificación segura, progresiva y orientada a resultados reales y sostenibles.",
} as const satisfies FounderData;
