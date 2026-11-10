import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBasket } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Basket — Keithston Bake Shop" },
      { name: "description", content: "Review the fresh bakes in your basket." },
      { property: "og:title", content: "Your Basket — Keithston Bake Shop" },
      { property: "og:description", content: "Review the fresh bakes in your basket." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, subtotal, setQty, remove, clear } = useCart();
  const delivery = 0;

  return (
    <div className="mx-auto max-w-6xl px-5 pt-32 pb-24 md:px-8">
      <h1 className="font-display text-5xl md:text-6xl">Your basket</h1>
      {lines.length === 0 ? (
        <div className="mt-16 flex flex-col items-center rounded-lg border border-dashed border-border py-20 text-center">
          <ShoppingBasket className="h-12 w-12 text-gold" />
          <p className="mt-4 text-xl font-semibold">Your basket is empty</p>
          <p className="mt-1 text-muted-foreground">Fill it with something warm and fresh.</p>
          <Link to="/products" className="mt-6 rounded-md bg-primary px-7 py-3 font-semibold text-primary-foreground">Browse the menu</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
          <ul className="divide-y divide-border">
            {lines.map(({ id, qty, product }) => (
              <li key={id} className="flex gap-4 py-5">
                <img src={product.image} alt={product.name} loading="lazy" width={96} height={96} className="h-24 w-24 rounded-md object-cover" />
                <div className="flex flex-1 flex-col justify-between sm:flex-row sm:items-center">
                  <div>
                    <Link to="/products/$id" params={{ id }} className="font-semibold hover:text-gold">{product.name}</Link>
                    <p className="text-sm text-muted-foreground">{formatPrice(product.price)} each</p>
                  </div>
                  <div className="mt-3 flex items-center gap-4 sm:mt-0">
                    <div className="flex items-center rounded-md border border-border">
                      <button aria-label="Decrease" onClick={() => setQty(id, qty - 1)} className="grid h-10 w-10 place-items-center hover:bg-muted"><Minus className="h-4 w-4" /></button>
                      <span className="w-8 text-center">{qty}</span>
                      <button aria-label="Increase" onClick={() => setQty(id, qty + 1)} className="grid h-10 w-10 place-items-center hover:bg-muted"><Plus className="h-4 w-4" /></button>
                    </div>
                    <span className="w-20 text-right font-semibold">{formatPrice(qty * product.price)}</span>
                    <button aria-label={`Remove ${product.name}`} onClick={() => remove(id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <aside className="h-fit rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd>{delivery ? formatPrice(delivery) : "Free"}</dd></div>
              <div className="flex justify-between border-t border-border pt-3 text-base font-semibold"><dt>Total</dt><dd>{formatPrice(subtotal + delivery)}</dd></div>
            </dl>
            <button
              onClick={() => {
                clear();
                toast.success("Order placed! We'll have it warm and ready.");
              }}
              className="mt-6 w-full rounded-md bg-primary py-3 font-semibold text-primary-foreground shadow-warm"
            >
              Place order
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
