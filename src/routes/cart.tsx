import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — AQT" }] }),
  component: CartPage,
});

function CartPage() {
  const { detailed, setQty, remove, subtotal, count } = useCart();
  const shipping = subtotal > 80 || subtotal === 0 ? 0 : 9;
  const total = subtotal + shipping;

  if (count === 0) {
    return (
      <div className="container-aqt py-24 md:py-32 text-center">
        <ShoppingBag className="h-10 w-10 mx-auto text-muted-foreground" />
        <h1 className="font-display text-4xl mt-6">Your cart is empty</h1>
        <p className="text-muted-foreground mt-3">Find something you'll keep for years.</p>
        <Button asChild size="lg" className="mt-8 rounded-full px-8">
          <Link to="/shop">Shop the collection</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-aqt py-12 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl">Cart</h1>
      <p className="text-muted-foreground mt-2">
        {count} {count === 1 ? "item" : "items"}
      </p>

      <div className="mt-10 grid lg:grid-cols-[1fr_380px] gap-10">
        <div className="divide-y divide-border border-y border-border">
          {detailed.map(({ product, qty, lineTotal }) => (
            <div key={product.id} className="py-6 flex gap-5">
              <Link
                to="/product/$slug"
                params={{ slug: product.slug }}
                className="w-24 h-28 sm:w-28 sm:h-32 rounded-md overflow-hidden bg-muted shrink-0"
              >
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </Link>
              <div className="flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      to="/product/$slug"
                      params={{ slug: product.slug }}
                      className="font-display text-lg hover:text-accent transition-colors"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground capitalize mt-0.5">
                      {product.category}
                    </p>
                  </div>
                  <button
                    onClick={() => remove(product.id)}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="Remove"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto pt-4 flex items-end justify-between">
                  <div className="inline-flex items-center border border-border rounded-md">
                    <button
                      onClick={() => setQty(product.id, qty - 1)}
                      className="h-9 w-9 flex items-center justify-center hover:bg-muted"
                      aria-label="Decrease"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm">{qty}</span>
                    <button
                      onClick={() => setQty(product.id, qty + 1)}
                      className="h-9 w-9 flex items-center justify-center hover:bg-muted"
                      aria-label="Increase"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${lineTotal.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">${product.price} each</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="bg-surface rounded-xl p-7 h-fit lg:sticky lg:top-24">
          <h2 className="font-display text-2xl">Summary</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd>
            </div>
            <div className="flex justify-between pt-3 border-t border-border">
              <dt className="font-medium">Total</dt>
              <dd className="font-medium">${total.toFixed(2)}</dd>
            </div>
          </dl>
          <Button asChild size="lg" className="w-full mt-7">
            <Link to="/checkout">Checkout</Link>
          </Button>
          <Link
            to="/shop"
            className="block text-center mt-4 text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
