import { createFileRoute, Link } from "@tanstack/react-router";
import baker from "@/assets/baker-hands.jpg";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Keithston Bake Shop" },
      { name: "description", content: "How a small neighbourhood oven became a bakery built on slow fermentation and local flour." },
      { property: "og:title", content: "Our Story — Keithston Bake Shop" },
      { property: "og:description", content: "How a small neighbourhood oven became a bakery built on slow fermentation and local flour." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="Our story" title="Baked by hand, since day one" />
      <section className="bg-paper py-24 text-paper-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:grid-cols-2 md:px-8">
          <img src={baker} alt="Baker shaping dough" loading="lazy" width={1280} height={960} className="aspect-[4/3] w-full rounded-lg object-cover" />
          <div>
            <h2 className="font-display text-5xl">Bringing joy, one loaf at a time</h2>
            <p className="mt-6 text-lg text-paper-foreground/80">
              Keithston began with a single stone oven and a sourdough starter we still feed every morning. Today our team of bakers
              shapes every loaf, folds every croissant and frosts every cake by hand.
            </p>
            <p className="mt-4 text-paper-foreground/80">
              We work with local farmers and millers, let our doughs ferment slowly for deeper flavour, and bake in small batches so
              everything you take home is as fresh as it gets.
            </p>
            <Link to="/products" className="mt-8 inline-flex rounded-md bg-primary px-7 py-3 font-semibold text-primary-foreground">
              Taste the difference
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
