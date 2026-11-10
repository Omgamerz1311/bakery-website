import type { ReactNode } from "react";
import hero from "@/assets/hero-buns.jpg";

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-20">
      <img src={hero} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover object-right opacity-60" />
      <div className="absolute inset-0 bg-hero-fade" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <p className="animate-rise text-sm font-semibold tracking-widest text-gold uppercase">{eyebrow}</p>
        <h1 className="animate-rise mt-3 font-display text-5xl md:text-6xl">{title}</h1>
        {children && <div className="animate-rise mt-4 max-w-xl text-muted-foreground">{children}</div>}
      </div>
    </section>
  );
}
