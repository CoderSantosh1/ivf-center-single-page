import raw from "@/data/category.json";
import type { CategoryData, PageComponent, SectionDataMap, SectionKey } from "@/types/category";

export const data = raw as unknown as CategoryData;

export const common = data.common;

export function getCategory(name = data.activeCategory) {
  const category = data.categories[name];
  if (!category) throw new Error(`Unknown category "${name}" in data/category.json`);
  return category;
}

/** Data for one section variant, e.g. getSection("Hero", "IVFHero1"). */
export function getSection<K extends SectionKey>(key: K, variant: string, category?: string): SectionDataMap[K] {
  const section = getCategory(category).sections[key];
  const value = section?.variants[variant];
  if (!value) throw new Error(`Missing variant "${variant}" for section "${key}" in data/category.json`);
  return value as SectionDataMap[K];
}

/** Ordered list of components for a page, from the top-level `pages` block. */
export function getPage(name: string): PageComponent[] {
  const page = data.pages[name];
  if (!page) throw new Error(`Unknown page "${name}" in data/category.json`);
  return page.components;
}
