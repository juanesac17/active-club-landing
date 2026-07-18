import instagramIconSvg from "../assets/icons/instagram.svg?raw";
import whatsappIconSvg from "../assets/icons/whatsapp.svg?raw";
import navigationLogoSvg from "../assets/images/logotipo-blanco.svg?raw";
import wordmarkSvg from "../assets/images/wordmark.svg?raw";

export const BRAND_ICONS = {
  instagram: instagramIconSvg,
  whatsapp: whatsappIconSvg,
} as const;

export type BrandIconName = keyof typeof BRAND_ICONS;

export interface SiteData {
  readonly name: string;
  readonly language: string;
  readonly defaultTitle: string;
  readonly defaultDescription: string;
  readonly ogLocale: string;
  readonly themeColor: string;
}

export interface Link {
  readonly label: string;
  readonly href: string;
}

export interface BrandLinks {
  readonly home: Link;
  readonly contact: Link;
  readonly instagram: Link;
}

export interface NavigationItem extends Link {}

export interface NavigationData {
  readonly home: Link;
  readonly items: readonly NavigationItem[];
}

export interface SocialLink extends Link {
  readonly icon: BrandIconName;
}

export interface BrandAssets {
  readonly favicon: string;
  readonly socialImage: string;
  readonly navigationLogoSvg: string;
  readonly wordmarkSvg: string;
  readonly icons: Readonly<Record<BrandIconName, string>>;
}

export interface FooterData {
  readonly claim: string;
  readonly socials: readonly SocialLink[];
  readonly copyright: string;
}

export interface BrandData {
  readonly site: SiteData;
  readonly assets: BrandAssets;
  readonly links: BrandLinks;
  readonly navigation: NavigationData;
  readonly footer: FooterData;
}

const BRAND_LINKS = {
  home: { label: "Active Club — inicio", href: "#hero" },
  contact: {
    label: "WhatsApp",
    href: "https://wa.me/573045999963?text=Hola%2C%20quiero%20agendar%20una%20cita%20con%20Active%20Club.%20Me%20gustar%C3%ADa%20conocer%20qu%C3%A9%20opci%C3%B3n%20se%20adapta%20mejor%20a%20mis%20objetivos%20y%20recibir%20informaci%C3%B3n%20sobre%20los%20planes.",
  },
  instagram: {
    label: "Instagram",
    href: "https://www.instagram.com/activeclub.col/",
  },
} as const satisfies BrandLinks;

export const BRAND_DATA = {
  site: {
    name: "Active Club",
    language: "es",
    defaultTitle: "Active Club — Entrena con propósito. Avanza con confianza.",
    defaultDescription:
      "Asesoría personalizada para mejorar tu rendimiento físico, con un método respaldado por evidencia. Presencial y virtual.",
    ogLocale: "es_ES",
    themeColor: "#1A1A1A",
  },
  assets: {
    favicon: "/favicon.svg",
    socialImage: "/og-image.jpg",
    navigationLogoSvg,
    wordmarkSvg,
    icons: BRAND_ICONS,
  },
  links: BRAND_LINKS,
  navigation: {
    home: BRAND_LINKS.home,
    items: [
      { label: "Método", href: "#metodo" },
      { label: "Para quién", href: "#para-quien" },
      { label: "Servicios", href: "#servicios" },
      { label: "Planes", href: "#planes" },
    ],
  },
  footer: {
    claim: "Entrena con propósito. Avanza con confianza.",
    socials: [
      { ...BRAND_LINKS.contact, icon: "whatsapp" },
      { ...BRAND_LINKS.instagram, icon: "instagram" },
    ],
    copyright: "Active Club. Todos los derechos reservados.",
  },
} as const satisfies BrandData;
