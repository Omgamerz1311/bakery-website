import { Link } from "@tanstack/react-router";
import { Logo } from "./site-header";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Bringing joy through authentic, handcrafted baked goods made with love and the finest ingredients.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-widest text-gold uppercase">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-foreground">Menu</Link></li>
            <li><Link to="/about" className="hover:text-foreground">Our story</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/cart" className="hover:text-foreground">Cart</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-widest text-gold uppercase">Visit</h3>
          <p className="mt-4 text-sm text-muted-foreground">
            Open daily 7am – 7pm<br />Fresh batches every morning
          </p>
        </div>
      </div>
      <p className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Keithston Bake Shop. Baked with love.
      </p>
    </footer>
  );
}
