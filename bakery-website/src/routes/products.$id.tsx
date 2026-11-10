import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { formatPrice, getProductById, products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = getProductById(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const title = p ? `${p.name} — Keithston Bake Shop` : "Not found — Keithston Bake Shop";
    const desc = p?.description ?? "This bake isn't on our menu.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(p ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="pt-24">
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold">
          <ArrowLeft className="h-4 w-4" /> Back to menu
        </Link>
        <div className="mt-8 grid gap-12 md:grid-cols-2">
          <img src={product.image} alt={product.name} width={816} height={816} className="aspect-square w-full rounded-lg object-cover" />
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold tracking-widest text-gold uppercase">{product.category}</p>
            <h1 className="mt-2 font-display text-5xl md:text-6xl">{product.name}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{product.description}</p>
            <p className="mt-6 text-4xl font-bold">{formatPrice(product.price)}</p>
            <p className="mt-1 text-sm text-muted-foreground">{product.stock} left today</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-md border border-border">
                <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-12 w-12 place-items-center hover:bg-muted"><Minus className="h-4 w-4" /></button>
                <span className="w-10 text-center font-semibold" aria-live="polite">{qty}</span>
                <button aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="grid h-12 w-12 place-items-center hover:bg-muted"><Plus className="h-4 w-4" /></button>
              </div>
              <button
                onClick={() => {
                  add(product.id, qty);
                  toast.success(`${qty} × ${product.name} added to your basket`);
                }}
                className="h-12 rounded-md bg-primary px-8 font-semibold text-primary-foreground shadow-warm"
              >
                Add to basket
              </button>
            </div>

            <div className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
              <div>
                <h2 className="text-sm font-semibold tracking-widest text-gold uppercase">Ingredients</h2>
                <p className="mt-2 text-muted-foreground">{product.ingredients.join(", ")}</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold tracking-widest text-gold uppercase">Allergens</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.allergens.map((a) => (
                    <span key={a} className="rounded-full bg-muted px-3 py-1 text-xs">{a}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
          <h2 className="font-display text-4xl">You may also love</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
