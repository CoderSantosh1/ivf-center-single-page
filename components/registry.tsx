import type { ReactNode } from "react";
import type { PageComponent, SectionKey } from "@/types/category";
import { common, getSection } from "@/lib/category";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import MissionVision from "@/components/sections/MissionVision";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";

// Section key in data/category.json → React component that renders any of its variants.
const sections: { [K in SectionKey]: (variant: string) => ReactNode } = {
  Header: (v) => <Navbar data={getSection("Header", v)} brand={common.brand} />,
  Hero: (v) => <Hero data={getSection("Hero", v)} />,
  AboutUs: (v) => <About data={getSection("AboutUs", v)} />,
  MissionVision: (v) => <MissionVision data={getSection("MissionVision", v)} />,
  Projects: (v) => <Projects data={getSection("Projects", v)} />,
  Gallery: (v) => <Gallery data={getSection("Gallery", v)} />,
  Testimonials: (v) => <Testimonials data={getSection("Testimonials", v)} />,
  Contact: (v) => <Contact data={getSection("Contact", v)} />,
};

export function renderComponent({ key, component }: PageComponent): ReactNode {
  if (key === "Footer") return <Footer data={common.Footer} brand={common.brand} />;
  return sections[key](component);
}
