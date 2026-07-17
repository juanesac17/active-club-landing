import facebookIconSvg from "../assets/icons/facebook.svg?raw";
import instagramIconSvg from "../assets/icons/instagram.svg?raw";
import whatsappIconSvg from "../assets/icons/whatsapp.svg?raw";
import navigationLogoSvg from "../assets/images/logo-horizontal.svg?raw";
import footerWordmarkSvg from "../assets/images/wordmark.svg?raw";

export const BRAND_ICONS = {
  facebook: facebookIconSvg,
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
  readonly facebook: Link;
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
  readonly footerWordmarkSvg: string;
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
  contact: { label: "WhatsApp", href: "#contacto" },
  instagram: { label: "Instagram", href: "#" },
  facebook: { label: "Facebook", href: "#" },
} as const satisfies BrandLinks;

export const BRAND_DATA = {
  site: {
    name: "Active Club",
    language: "es",
    defaultTitle: "Active Club — Entrena con propósito, progresa con ciencia",
    defaultDescription:
      "Asesoría personalizada para mejorar tu rendimiento físico, con un método respaldado por evidencia. Presencial y virtual.",
    ogLocale: "es_ES",
    themeColor: "#1A1A1A",
  },
  assets: {
    favicon: "/favicon.svg",
    socialImage: "/og-image.jpg",
    navigationLogoSvg,
    footerWordmarkSvg,
    icons: BRAND_ICONS,
  },
  links: BRAND_LINKS,
  navigation: {
    home: BRAND_LINKS.home,
    items: [
      { label: "Quiénes somos", href: "#quienes-somos" },
      { label: "Metodología", href: "#metodo" },
      { label: "Problema", href: "#problema" },
      { label: "Para quién", href: "#para-quien" },
      { label: "Servicios", href: "#servicios" },
      { label: "Planes", href: "#planes" },
      { label: "Preguntas frecuentes", href: "#preguntas" },
    ],
  },
  footer: {
    claim: "Entrena con propósito. Avanza con confianza.",
    socials: [
      { ...BRAND_LINKS.contact, icon: "whatsapp" },
      { ...BRAND_LINKS.instagram, icon: "instagram" },
      { ...BRAND_LINKS.facebook, icon: "facebook" },
    ],
    copyright: "Active Club. Todos los derechos reservados.",
  },
} as const satisfies BrandData;
