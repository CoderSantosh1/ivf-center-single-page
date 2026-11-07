// Types for data/category.json.
// Shape: common (shared across all categories) → categories.<Category>.sections.<Section>.variants.<Variant>
// → templateComponents (which variant each page uses) → pages (final render order per page).

/* ---------- shared building blocks ---------- */

export type Link = { label: string; href: string };

export type ImageAsset = { src: string; alt: string };

/** Name of an icon in components/ui/Icon.tsx (e.g. "microscope", "phone"). */
export type IconKey = string;

/* ---------- common ---------- */

export type Metadata = { title: string; description: string };

export type Brand = {
  name: string;
  highlight: string;
  tagline: string;
  href: string;
};

export type SocialLink = { label: string; key: string; short: string; href: string };

export type FooterColumn = { heading: string; links: Link[] };

export type FooterData = {
  description: string;
  socialLinks: SocialLink[];
  columns: FooterColumn[];
  newsletter: {
    heading: string;
    description: string;
    placeholder: string;
    buttonLabel: string;
  };
  copyright: string;
  madeWith: { before: string; after: string };
  backToTop: { label: string; href: string };
};

export type CommonData = {
  metadata: Metadata;
  brand: Brand;
  Footer: FooterData;
};

/* ---------- section variants ---------- */

export type SectionHeadingData = {
  eyebrow: string;
  title: string;
  highlightTitle: string;
  description?: string;
};

export type HeaderData = {
  navLinks: { id: string; label: string }[];
  ctaLabel: string;
  ctaHref: string;
  menuAriaLabel: string;
};

export type HeroData = {
  id: string;
  badge: string;
  title: string;
  highlightTitle: string;
  ctaLabel: string;
  ctaHref: string;
  rating: { value: string; stars: number };
  families: { count: string; label: string };
  mainImage: ImageAsset;
  secondaryImage: ImageAsset;
  successBadge: { title: string; subtitle: string };
  specialities: string[];
};

export type AboutData = SectionHeadingData & {
  id: string;
  images: [ImageAsset, ImageAsset];
  counters: { value: number; suffix: string; label: string }[];
  circleText: string;
  features: { title: string; icon: IconKey }[];
  gallery: ImageAsset[];
};

export type MissionVisionData = SectionHeadingData & {
  id: string;
  cards: {
    tag: string;
    title: string;
    icon: IconKey;
    gradient: string;
    image: ImageAsset;
  }[];
  values: { label: string; icon: IconKey }[];
};

export type ProjectItem = {
  title: string;
  category: string;
  stat: string;
  href: string;
  image: ImageAsset;
};

export type ProjectsData = SectionHeadingData & {
  id: string;
  autoplayMs: number;
  items: ProjectItem[];
  previousLabel: string;
  nextLabel: string;
};

export type GalleryImage = { thumb: string; src: string; alt: string };

export type GalleryData = SectionHeadingData & {
  id: string;
  rows: GalleryImage[][];
  labels: { open: string; close: string; previous: string; next: string; dialog: string };
};

export type TestimonialItem = {
  name: string;
  place: string;
  treatment: string;
  quote: string;
  image: ImageAsset;
};

export type TestimonialsData = SectionHeadingData & {
  id: string;
  autoplayMs: number;
  items: TestimonialItem[];
  stats: { value: string; label: string }[];
};

export type FormField = {
  id: string;
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  required: boolean;
};

export type ContactData = SectionHeadingData & {
  id: string;
  info: { title: string; icon: IconKey; lines: string[] }[];
  emergency: { title: string; subtitle: string; phone: string; phoneHref: string };
  form: {
    fields: FormField[];
    select: { id: string; name: string; label: string; placeholder: string; options: string[] };
    submitLabel: string;
    privacyNote: string;
    success: { title: string; description: string; resetLabel: string };
  };
};

/* ---------- category / templates / pages ---------- */

/** Maps each section key to the data shape its variants use. */
export type SectionDataMap = {
  Header: HeaderData;
  Hero: HeroData;
  AboutUs: AboutData;
  MissionVision: MissionVisionData;
  Projects: ProjectsData;
  Gallery: GalleryData;
  Testimonials: TestimonialsData;
  Contact: ContactData;
};

export type SectionKey = keyof SectionDataMap;

export type Sections = {
  [K in SectionKey]: { variants: Record<string, SectionDataMap[K]> };
};

export type PageComponent = { key: SectionKey | "Footer"; component: string };

export type PageConfig = { components: PageComponent[] };

export type TemplateComponents = {
  shared: { Header: string; Footer: string };
  pages: Record<string, PageConfig>;
};

export type Category = {
  sections: Sections;
  templateComponents: TemplateComponents;
};

export type CategoryData = {
  activeCategory: string;
  common: CommonData;
  categories: Record<string, Category>;
  pages: Record<string, PageConfig>;
};
