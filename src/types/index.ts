export interface Service {
  title: string;
  description: string;
  link: string;
}

export interface Client {
  type: string;
  subtitle: string;
  description: string;
  cta: string;
  image: string;
}

export interface NavLink {
  label: string;
  href: string;
  hasArrow?: boolean;
}

export interface Artwork {
  id: number;
  image: string;
  title?: string;
}
