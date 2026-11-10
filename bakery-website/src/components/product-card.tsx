import { Link } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <article className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-card">
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        width={816}
        height={816}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-card-fade" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold">{formatPrice(product.price)}</span>
          <Link
            to="/products/$id"
            params={{ id: product.id }}
            aria-label={`Details for ${product.name}`}
            className="grid h-8 w-8 place-items-center rounded-full border border-foreground/60 transition-colors hover:border-gold hover:text-gold"
          >
            <Info className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-3 flex items-end justify-between gap-3">
          <Link to="/products/$id" params={{ id: product.id }} className="text-base leading-snug font-medium hover:text-gold">
            {product.name}
          </Link>
          <button
            onClick={() => {
              add(product.id);
              toast.success(`${product.name} added to your basket`);
            }}
            className="shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
