import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, PRODUCTS } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { useCart, useWishlist } from "@/lib/store";
import { Heart, Star, Truck, RotateCcw, ShieldCheck, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — AQT` },
          { name: "description", content: loaderData.product.tagline },
          { property: "og:title", content: `${loaderData.product.name} — AQT` },
          { property: "og:description", content: loaderData.product.tagline },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="container-aqt py-32 text-center">
      <h1 className="font-display text-3xl">Product not found</h1>
      <Button asChild className="mt-6">
        <Link to="/shop">Back to shop</Link>
      </Button>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container-aqt py-32 text-center">
      <h1 className="font-display text-3xl">Something went wrong</h1>
      <p className="text-muted-foreground mt-3">{error.message}</p>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const [qty, setQty] = useState(1);

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="container-aqt py-10 md:py-16">
      <nav className="text-xs text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-foreground">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        <div className="space-y-4">
          <div className="aspect-[4/5] overflow-hidden rounded-xl bg-muted">
            <img
              src={product.image}
              alt={product.name}
              width={800}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-md bg-muted opacity-80 hover:opacity-100 cursor-pointer"
              >
                <img src={product.image} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="md:pt-4">
          <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
            {product.category}
          </p>
          <h1 className="font-display text-4xl md:text-5xl mt-3">{product.name}</h1>
          <p className="mt-3 text-muted-foreground">{product.tagline}</p>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-current text-accent" />
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-display">${product.price}</span>
            {product.compareAt && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  ${product.compareAt}
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-accent">
                  Save ${product.compareAt - product.price}
                </span>
              </>
            )}
          </div>

          <p className="mt-7 text-foreground/85 leading-relaxed">{product.description}</p>

          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            {product.details.map((d) => (
              <li key={d} className="flex gap-2">
                <span className="text-accent">—</span> {d}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-3">
            <div className="inline-flex items-center border border-border rounded-md">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="h-11 w-11 flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Decrease"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="h-11 w-11 flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Increase"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button
              size="lg"
              className="flex-1 h-11"
              onClick={() => {
                add(product.id, qty);
                toast.success("Added to cart", { description: `${product.name} × ${qty}` });
              }}
            >
              Add to Cart
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="h-11 w-11"
              onClick={() => toggle(product.id)}
              aria-label="Wishlist"
            >
              <Heart className={`h-4 w-4 ${has(product.id) ? "fill-accent text-accent" : ""}`} />
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 text-xs text-muted-foreground">
            <div>
              <Truck className="h-4 w-4 text-accent" />
              <p className="mt-2">Free shipping over $80</p>
            </div>
            <div>
              <RotateCcw className="h-4 w-4 text-accent" />
              <p className="mt-2">30-day returns</p>
            </div>
            <div>
              <ShieldCheck className="h-4 w-4 text-accent" />
              <p className="mt-2">2-year guarantee</p>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-24">
        <h2 className="font-display text-2xl md:text-3xl mb-8">Reviews</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { name: "Eli M.", rating: 5, text: "Beautiful object, even better in person. Will buy again." },
            { name: "Anna T.", rating: 5, text: "Quality is exceptional. Worth every dollar." },
            { name: "Diego R.", rating: 4, text: "Lovely design. Slightly snug but very well made." },
            { name: "Sara K.", rating: 5, text: "AQT just gets it right. Always." },
          ].map((r) => (
            <div key={r.name} className="border-t border-border pt-6">
              <div className="flex items-center gap-2">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current text-accent" />
                ))}
              </div>
              <p className="mt-3 leading-relaxed">{r.text}</p>
              <p className="text-sm text-muted-foreground mt-3">— {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-2xl md:text-3xl mb-8">You may also like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
