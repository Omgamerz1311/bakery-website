import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { categories, products, type Category } from "@/lib/products";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Menu — Keithston Bake Shop" },
      { name: "description", content: "Browse our full menu of breads, pastries and cakes." },
      { property: "og:title", content: "Menu — Keithston Bake Shop" },
      { property: "og:description", content: "Browse our full menu of breads, pastries and cakes." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [cat, setCat] = useState<Category | "All">("All");
  const [q, setQ] = useState("");
  const list = useMemo(
    () =>
      products.filter(
        (p) => (cat === "All" || p.category === cat) && p.name.toLowerCase().includes(q.trim().toLowerCase()),
      ),
    [cat, q],
  );

  return (
    <>
      <PageHero eyebrow="Our menu" title="Fresh from the oven">
        Twelve bakes, made by hand every morning.
      </PageHero>
      <section className="bg-paper py-16 text-paper-foreground">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {(["All", ...categories] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  aria-pressed={cat === c}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${cat === c ? "bg-primary text-primary-foreground" : "bg-paper-foreground/5 hover:bg-paper-foreground/10"}`}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="relative block md:w-72">
              <span className="sr-only">Search the menu</span>
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-paper-muted" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search croissants, cakes…"
                className="h-11 w-full rounded-full border border-paper-foreground/15 bg-paper pr-4 pl-10 text-sm outline-none focus:border-primary"
              />
            </label>
          </div>
          {list.length === 0 ? (
            <p className="py-24 text-center text-paper-muted">Nothing matches “{q}”. Try another search.</p>
          ) : (
            <div className="mt-10 grid gap-5 text-foreground sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {list.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
