import { Link } from "@tanstack/react-router";
import { Heart, Eye, Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart, useQuickView, useWishlist } from "@/lib/store";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const { open } = useQuickView();
  const wished = has(product.id);

  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted reveal-img">
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={800}
            height={1000}
            className="h-full w-full object-cover"
          />
        </Link>

        {/* Badges */}
        {product.compareAt && (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] tracking-[0.18em] uppercase px-2 py-1 rounded-sm">
            Sale
          </span>
        )}

        {/* Hover actions */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggle(product.id);
              toast(wished ? "Removed from wishlist" : "Added to wishlist");
            }}
            aria-label="Wishlist"
            className="h-9 w-9 rounded-full bg-background/95 backdrop-blur flex items-center justify-center shadow-soft hover:bg-background transition-colors"
          >
            <Heart className={`h-4 w-4 ${wished ? "fill-accent text-accent" : ""}`} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              open(product.id);
            }}
            aria-label="Quick view"
            className="h-9 w-9 rounded-full bg-background/95 backdrop-blur flex items-center justify-center shadow-soft hover:bg-background transition-colors"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>

        {/* Add bar */}
        <button
          onClick={(e) => {
            e.preventDefault();
            add(product.id);
            toast.success("Added to cart", { description: product.name });
          }}
          className="absolute bottom-3 left-3 right-3 bg-foreground text-background py-2.5 rounded-md text-sm font-medium tracking-wide opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
        >
          Add to Cart
        </button>
      </div>

      <Link to="/product/$slug" params={{ slug: product.slug }} className="block mt-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg leading-tight">{product.name}</h3>
          <div className="flex items-baseline gap-1.5 shrink-0">
            {product.compareAt && (
              <span className="text-xs text-muted-foreground line-through">
                ${product.compareAt}
              </span>
            )}
            <span className="text-sm font-medium">${product.price}</span>
          </div>
        </div>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-current text-accent" />
          <span>
            {product.rating} · {product.reviewCount}
          </span>
          <span className="mx-1">·</span>
          <span className="capitalize">{product.category}</span>
        </div>
      </Link>
    </article>
  );
}
