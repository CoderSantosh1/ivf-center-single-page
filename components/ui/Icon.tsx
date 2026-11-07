import {
  Baby,
  Eye,
  Gem,
  HeartHandshake,
  Lightbulb,
  Mail,
  MapPin,
  Microscope,
  Phone,
  Scale,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  type LucideProps,
} from "lucide-react";

// Icon keys used in data/category.json → lucide components.
const icons = {
  baby: Baby,
  eye: Eye,
  gem: Gem,
  heartHandshake: HeartHandshake,
  lightbulb: Lightbulb,
  mail: Mail,
  mapPin: MapPin,
  microscope: Microscope,
  phone: Phone,
  scale: Scale,
  searchCheck: SearchCheck,
  shieldCheck: ShieldCheck,
  stethoscope: Stethoscope,
  target: Target,
};

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = icons[name as IconName] ?? Sparkles;
  return <Cmp {...props} />;
}
