import { createFileRoute, Link } from "@tanstack/react-router";
import { useWishlist } from "@/lib/store";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — AQT" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { ids } = useWishlist();
  const items = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <div className="container-aqt py-12 md:py-16">
      <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">Saved</p>
      <h1 className="font-display text-4xl md:text-5xl mt-3">Wishlist</h1>

      {items.length === 0 ? (
        <div className="text-center py-24">
          <Heart className="h-10 w-10 mx-auto text-muted-foreground" />
          <p className="font-display text-2xl mt-6">No favorites yet</p>
          <p className="text-muted-foreground mt-2">Tap the heart on any product to save it here.</p>
          <Button asChild className="mt-6">
            <Link to="/shop">Discover the collection</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
