import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBasket, Wheat } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const nav = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 text-gold">
      <Wheat className="h-7 w-7" aria-hidden />
      <span className="leading-none">
        <span className="block text-base font-bold tracking-[0.18em] uppercase">Keithston</span>
        <span className="block text-[10px] tracking-[0.4em] text-muted-foreground uppercase">Bake shop</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="text-sm font-medium text-foreground/85 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            aria-label={`Cart, ${count} items`}
            className="relative grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-foreground/10"
          >
            <ShoppingBasket className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button aria-label="Open menu" className="grid h-11 w-11 place-items-center rounded-full hover:bg-foreground/10 md:hidden">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <SheetTitle className="font-display text-3xl text-gold">Keithston</SheetTitle>
              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
                {nav.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-3 text-lg hover:bg-muted"
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
