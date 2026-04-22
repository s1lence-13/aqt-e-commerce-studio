import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import catApparel from "@/assets/cat-apparel.jpg";
import catHome from "@/assets/cat-home.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PRODUCTS } from "@/lib/products";
import { ArrowRight, Truck, RotateCcw, Leaf } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const TESTIMONIALS = [
  {
    quote:
      "Every piece feels considered. The cashmere has held up beautifully through three winters now.",
    author: "Maya R.",
    role: "Verified buyer",
  },
  {
    quote:
      "Quietly the best store on the internet. Restrained, generous, no noise.",
    author: "Jonas L.",
    role: "Verified buyer",
  },
  {
    quote:
      "Packaging, fit, finish — all of it. AQT understands the small things.",
    author: "Priya S.",
    role: "Verified buyer",
  },
];

function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Featured />
      <Categories />
      <Promise />
      <Testimonials />
      <Newsletter />
    </>
  );
}

function Hero() {
  return (
    <section className="relative">
      <div className="container-aqt pt-8 md:pt-14">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="md:col-span-6 lg:col-span-5 pb-6 md:pb-16 animate-fade-up">
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
              AQT — Spring Edition
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mt-6 leading-[0.95]">
              Considered
              <br /> objects for a
              <br /> <em className="text-accent not-italic font-display italic">quieter</em>{" "}
              everyday.
            </h1>
            <p className="mt-7 text-muted-foreground text-lg max-w-md leading-relaxed">
              Apparel, accessories and home goods designed in studio, made in small batches by
              makers we know.
            </p>
            <div className="mt-9 flex items-center gap-4">
              <Button asChild size="lg" className="rounded-full px-7">
                <Link to="/shop">
                  Shop Now <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Link
                to="/about"
                className="text-sm underline-offset-4 hover:underline text-muted-foreground hover:text-foreground"
              >
                Our story
              </Link>
            </div>
          </div>
          <div className="md:col-span-6 lg:col-span-7">
            <div className="relative aspect-[4/5] md:aspect-[5/6] overflow-hidden rounded-xl bg-muted">
              <img
                src={heroImg}
                alt="Editorial still life with terracotta vase"
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-8 md:right-auto md:max-w-xs bg-background/90 backdrop-blur p-5 rounded-lg">
                <p className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                  Featured
                </p>
                <p className="font-display text-xl mt-1">The Stoneware Series</p>
                <Link
                  to="/shop"
                  search={{ category: "home" } as never}
                  className="text-sm text-accent inline-flex items-center gap-1 mt-2 hover:gap-2 transition-all"
                >
                  Discover <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Free shipping over $80", "Carbon-neutral delivery", "30-day returns", "Made in small batches", "Crafted by hand"];
  return (
    <div className="mt-20 md:mt-28 border-y border-border/60 py-4 overflow-hidden bg-surface">
      <div className="marquee whitespace-nowrap text-xs tracking-[0.3em] uppercase text-muted-foreground">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            {t} <span className="text-accent">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Featured() {
  const items = PRODUCTS.slice(0, 4);
  return (
    <section className="container-aqt py-20 md:py-28">
      <div className="flex items-end justify-between mb-10 md:mb-14">
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
            Featured
          </p>
          <h2 className="font-display text-3xl md:text-5xl mt-3">This week's edit</h2>
        </div>
        <Link
          to="/shop"
          className="hidden md:inline-flex items-center gap-2 text-sm hover:text-accent transition-colors"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

function Categories() {
  const cats = [
    { label: "Apparel", img: catApparel, key: "apparel" },
    { label: "Home", img: catHome, key: "home" },
    { label: "Accessories", img: catAccessories, key: "accessories" },
  ];
  return (
    <section className="container-aqt">
      <div className="mb-10">
        <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">Shop by</p>
        <h2 className="font-display text-3xl md:text-5xl mt-3">Categories</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cats.map((c) => (
          <Link
            key={c.key}
            to="/shop"
            search={{ category: c.key } as never}
            className="group relative overflow-hidden rounded-xl reveal-img aspect-[4/5] block bg-muted"
          >
            <img
              src={c.img}
              alt={c.label}
              loading="lazy"
              width={900}
              height={1100}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-background">
              <p className="font-display text-2xl md:text-3xl">{c.label}</p>
              <p className="text-xs tracking-[0.2em] uppercase mt-1 opacity-80 inline-flex items-center gap-1">
                Shop <ArrowRight className="h-3 w-3" />
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Promise() {
  const items = [
    { Icon: Truck, title: "Free shipping", text: "On orders over $80, worldwide." },
    { Icon: RotateCcw, title: "Easy returns", text: "30 days, no questions asked." },
    { Icon: Leaf, title: "Considered making", text: "Small batches, low waste." },
  ];
  return (
    <section className="container-aqt py-20 md:py-28">
      <div className="grid md:grid-cols-3 gap-10 md:gap-14">
        {items.map(({ Icon, title, text }) => (
          <div key={title} className="border-t border-border/60 pt-6">
            <Icon className="h-5 w-5 text-accent" />
            <h3 className="font-display text-xl mt-4">{title}</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="container-aqt">
        <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground text-center">
          Words from
        </p>
        <h2 className="font-display text-3xl md:text-5xl mt-3 text-center">Our customers</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {TESTIMONIALS.map((t) => (
            <figure key={t.author} className="bg-background rounded-xl p-8 shadow-soft">
              <blockquote className="font-display text-xl leading-snug">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-medium">{t.author}</span>
                <span className="text-muted-foreground"> · {t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="container-aqt py-20 md:py-28">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
          The dispatch
        </p>
        <h2 className="font-display text-3xl md:text-5xl mt-3">
          New arrivals, in your inbox.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Quiet emails. New collections, occasional notes from the studio. Unsubscribe anytime.
        </p>
        <form
          className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            if (!email) return;
            toast.success("Welcome to AQT", { description: "Check your inbox to confirm." });
            setEmail("");
          }}
        >
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            className="h-11"
          />
          <Button type="submit" size="lg" className="rounded-md">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
