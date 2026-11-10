import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Clock, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Keithston Bake Shop" },
      { name: "description", content: "Questions, custom cakes or catering? Get in touch with our bakers." },
      { property: "og:title", content: "Contact — Keithston Bake Shop" },
      { property: "og:description", content: "Questions, custom cakes or catering? Get in touch with our bakers." },
    ],
  }),
  component: Contact,
});

const field = "mt-2 w-full rounded-md border border-paper-foreground/15 bg-paper px-4 py-3 outline-none focus:border-primary";

function Contact() {
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const message = String(f.get("message") ?? "").trim();
    const next: { name?: string; email?: string; message?: string } = {};
    if (!name) next.name = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email so we can reply.";
    if (message.length < 10) next.message = "Your message should be at least 10 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    toast.success("Thanks! We'll get back to you within a day.");
    e.currentTarget.reset();
  }

  return (
    <>
      <PageHero eyebrow="Say hello" title="Get in touch">
        Custom cakes, catering, or just a question about our sourdough — we'd love to hear from you.
      </PageHero>
      <section className="bg-paper py-20 text-paper-foreground">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 md:grid-cols-[1fr_1.4fr] md:px-8">
          <ul className="space-y-8">
            {[
              { icon: MapPin, t: "Visit", d: "Your bakery address here" },
              { icon: Clock, t: "Hours", d: "Every day, 7am – 7pm" },
              { icon: Mail, t: "Email", d: "hello@keithston.example" },
            ].map((i) => (
              <li key={i.t} className="flex gap-4">
                <i.icon className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold">{i.t}</p>
                  <p className="text-paper-muted">{i.d}</p>
                </div>
              </li>
            ))}
          </ul>
          <form onSubmit={onSubmit} noValidate className="space-y-5">
            <div>
              <label htmlFor="name" className="text-sm font-semibold">Name</label>
              <input id="name" name="name" autoComplete="name" className={field} />
              {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-semibold">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" className={field} />
              {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-semibold">Message</label>
              <textarea id="message" name="message" rows={5} className={field} />
              {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message}</p>}
            </div>
            <button type="submit" className="rounded-md bg-primary px-7 py-3 font-semibold text-primary-foreground">Send message</button>
          </form>
        </div>
      </section>
    </>
  );
}
