import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useQuickView, useCart, useWishlist } from "@/lib/store";
import { PRODUCTS } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

export function QuickView() {
  const { productId, close } = useQuickView();
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const product = productId ? PRODUCTS.find((p) => p.id === productId) ?? null : null;

  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && close()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden border-0">
        {product && (
          <div className="grid md:grid-cols-2">
            <div className="aspect-square md:aspect-auto bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-8 flex flex-col">
              <p className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                {product.category}
              </p>
              <h2 className="font-display text-3xl mt-2">{product.name}</h2>
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-current text-accent" />
                {product.rating} · {product.reviewCount} reviews
              </div>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-medium">${product.price}</span>
                {product.compareAt && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.compareAt}
                  </span>
                )}
              </div>

              <p className="mt-5 text-muted-foreground leading-relaxed">{product.description}</p>

              <div className="mt-auto pt-8 flex gap-3">
                <Button
                  className="flex-1"
                  onClick={() => {
                    add(product.id);
                    toast.success("Added to cart", { description: product.name });
                    close();
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => toggle(product.id)}
                  aria-label="Wishlist"
                >
                  <Heart className={`h-4 w-4 ${has(product.id) ? "fill-accent text-accent" : ""}`} />
                </Button>
              </div>

              <Link
                to="/product/$slug"
                params={{ slug: product.slug }}
                onClick={close}
                className="mt-4 text-sm text-center text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                View full details
              </Link>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
