import { Fragment } from "react";
import { renderComponent } from "@/components/registry";
import { getPage } from "@/lib/category";

// Page layout comes from `pages.home.components` in data/category.json.
// Header/Footer render outside <main>; every other section renders inside it, in order.
export default function Home() {
  const components = getPage("home");
  const header = components.filter((c) => c.key === "Header");
  const footer = components.filter((c) => c.key === "Footer");
  const body = components.filter((c) => c.key !== "Header" && c.key !== "Footer");

  return (
    <>
      {header.map((c) => (
        <Fragment key={`${c.key}-${c.component}`}>{renderComponent(c)}</Fragment>
      ))}
      <main className="flex-1">
        {body.map((c) => (
          <Fragment key={`${c.key}-${c.component}`}>{renderComponent(c)}</Fragment>
        ))}
      </main>
      {footer.map((c) => (
        <Fragment key={`${c.key}-${c.component}`}>{renderComponent(c)}</Fragment>
      ))}
    </>
  );
}
