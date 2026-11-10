import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Leaf, Clock, Heart, Star } from "lucide-react";
import hero from "@/assets/hero-buns.jpg";
import baker from "@/assets/baker-hands.jpg";
import { ProductCard } from "@/components/product-card";
import { categories, products, type Category } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Keithston Bake Shop — Sweet Treats, Perfect Eats" },
      { name: "description", content: "Artisan breads, flaky pastries and decadent cakes, baked fresh every morning." },
      { property: "og:title", content: "Keithston Bake Shop — Sweet Treats, Perfect Eats" },
      { property: "og:description", content: "Artisan breads, flaky pastries and decadent cakes, baked fresh every morning." },
    ],
  }),
  component: Index,
});

const reasons = [
  { icon: Clock, title: "Freshly baked daily", text: "Every batch comes out of the oven at dawn using traditional recipes." },
  { icon: Leaf, title: "Local ingredients", text: "Flour, butter and eggs from farmers and millers we know by name." },
  { icon: Heart, title: "Made with love", text: "Hand-shaped, slow-proofed and crafted with care in every detail." },
];

const reviews = [
  { name: "Priya S.", text: "The sourdough is the best I've had outside Paris. Crust that crackles, crumb that sings." },
  { name: "Daniel M.", text: "Their cinnamon rolls are my Saturday ritual. Soft, gooey, never too sweet." },
  { name: "Aisha K.", text: "Ordered the chocolate cake for a birthday — everyone asked where it came from." },
];

function Index() {
  const [tab, setTab] = useState<Category | "All">("All");
  const top = products.filter((p) => p.featured).slice(0, 6);
  const explore = tab === "All" ? products.slice(0, 6) : products.filter((p) => p.category === tab).slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <img src={hero} alt="Golden brioche buns on a rustic board" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
        <div className="absolute inset-0 bg-hero-fade" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pt-24 md:px-8">
          <p className="animate-rise text-lg font-semibold text-gold">Delicious Bakery</p>
          <h1 className="animate-rise mt-2 font-display text-6xl leading-[1.05] md:text-8xl">
            Sweet Treats,
            <br />
            Perfect Eats
          </h1>
          <p className="animate-rise mt-6 max-w-md text-lg text-foreground/80">
            Handcrafted breads, flaky pastries and decadent cakes — baked fresh every single morning.
          </p>
          <div className="animate-rise mt-9 flex flex-wrap items-center gap-6">
            <Link to="/products" className="rounded-md bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-warm transition-transform hover:-translate-y-0.5">
              Shop Now
            </Link>
            <Link to="/about" className="group inline-flex items-center gap-2 font-semibold text-gold">
              Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Top products */}
      <section className="bg-paper py-24 text-paper-foreground">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="text-center font-display text-5xl md:text-6xl">Top Products</h2>
          <p className="mx-auto mt-3 max-w-md text-center text-paper-muted">Our most-loved bakes, straight from the oven.</p>
          <div className="mt-14 grid gap-5 text-foreground sm:grid-cols-2 lg:grid-cols-3">
            {top.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Promo */}
      <section className="relative overflow-hidden">
        <img src={baker} alt="Baker shaping dough" loading="lazy" width={1280} height={960} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/70" />
        <div className="relative mx-auto max-w-2xl px-5 py-28 text-center">
          <h2 className="font-display text-5xl text-gold md:text-6xl">20% Off Your First Order</h2>
          <p className="mt-4 text-foreground/85">Join the Keithston family — your first basket of fresh bakes is on us, almost.</p>
          <Link to="/products" className="mt-8 inline-flex rounded-md bg-primary px-7 py-3 font-semibold text-primary-foreground shadow-warm">
            Claim the offer
          </Link>
        </div>
      </section>

      {/* Explore */}
      <section className="bg-paper py-24 text-paper-foreground">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="text-center font-display text-5xl md:text-6xl">Explore More</h2>
          <div role="tablist" className="mx-auto mt-10 flex max-w-xl justify-center gap-6 overflow-x-auto border-b border-paper-foreground/10">
            {(["All", ...categories] as const).map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={tab === c}
                onClick={() => setTab(c)}
                className={`-mb-px border-b-2 px-1 pb-3 text-sm font-semibold transition-colors ${tab === c ? "border-primary text-primary" : "border-transparent text-paper-muted hover:text-paper-foreground"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-12 grid gap-5 text-foreground sm:grid-cols-2 lg:grid-cols-3">
            {explore.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="mt-12 text-center">
            <Link to="/products" className="inline-flex items-center gap-2 font-semibold text-primary">
              View full menu <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="grain py-24">
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-5xl md:text-6xl">
            Baking happiness <span className="text-gold">every day</span>
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-lg border border-border bg-card p-7">
                <r.icon className="h-8 w-8 text-gold" />
                <h3 className="mt-5 text-xl font-semibold">{r.title}</h3>
                <p className="mt-2 text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
          <dl className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-12 md:grid-cols-4">
            {[["10+", "Years of baking"], ["5K+", "Happy customers"], ["100+", "Recipes perfected"], ["1K+", "Loaves a week"]].map(([n, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="text-5xl font-bold text-gold">{n}</dd>
                <p className="mt-1 text-sm text-muted-foreground">{l}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-paper py-24 text-paper-foreground">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="text-center font-display text-5xl">What they say about us</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.name} className="rounded-lg border border-paper-foreground/10 bg-paper p-7">
                <div className="flex gap-0.5 text-primary" aria-label="5 stars">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <blockquote className="mt-4 text-paper-foreground/85">“{r.text}”</blockquote>
                <figcaption className="mt-5 font-semibold">{r.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-5 text-center">
          <h2 className="font-display text-5xl md:text-6xl">Ready for delicious bakes?</h2>
          <p className="max-w-md opacity-90">Order online and pick up warm from the oven, or get it delivered.</p>
          <Link to="/products" className="rounded-md bg-background px-7 py-3 font-semibold text-foreground">Order now</Link>
        </div>
      </section>
    </>
  );
}
