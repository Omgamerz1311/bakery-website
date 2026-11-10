import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProductById, type Product } from "./products";

type Line = { id: string; qty: number };
type CartLine = Line & { product: Product };

type CartCtx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "keithston-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<Line[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setRaw(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(raw));
  }, [raw]);

  const value = useMemo<CartCtx>(() => {
    const lines = raw
      .map((l) => ({ ...l, product: getProductById(l.id) }))
      .filter((l): l is CartLine => !!l.product);
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal: lines.reduce((s, l) => s + l.qty * l.product.price, 0),
      add: (id, qty = 1) =>
        setRaw((r) => {
          const ex = r.find((l) => l.id === id);
          return ex ? r.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l)) : [...r, { id, qty }];
        }),
      setQty: (id, qty) =>
        setRaw((r) => (qty <= 0 ? r.filter((l) => l.id !== id) : r.map((l) => (l.id === id ? { ...l, qty } : l)))),
      remove: (id) => setRaw((r) => r.filter((l) => l.id !== id)),
      clear: () => setRaw([]),
    };
  }, [raw]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
