import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCart, useAuth } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — AQT" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { detailed, subtotal, clear, count } = useCart();
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"guest" | "account">(user ? "account" : "guest");
  const [submitting, setSubmitting] = useState(false);
  const shipping = subtotal > 80 ? 0 : 9;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = subtotal + shipping + tax;

  if (count === 0) {
    return (
      <div className="container-aqt py-32 text-center">
        <h1 className="font-display text-3xl">Your cart is empty</h1>
        <Button asChild className="mt-6">
          <Link to="/shop">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData(e.currentTarget);
    const email = data.get("email") as string;
    if (mode === "account" && !user) {
      signIn(email, data.get("name") as string);
    }
    setTimeout(() => {
      clear();
      toast.success("Order placed", { description: "A confirmation has been sent to your email." });
      navigate({ to: "/account" });
    }, 700);
  };

  return (
    <div className="container-aqt py-12 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl">Checkout</h1>

      <div className="mt-10 grid lg:grid-cols-[1fr_400px] gap-10">
        <form onSubmit={handleSubmit} className="space-y-10">
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-2xl">Contact</h2>
              <div className="flex gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => setMode("guest")}
                  className={`px-3 py-1.5 rounded-full transition-colors ${
                    mode === "guest" ? "bg-foreground text-background" : "text-muted-foreground"
                  }`}
                >
                  Guest
                </button>
                <button
                  type="button"
                  onClick={() => setMode("account")}
                  className={`px-3 py-1.5 rounded-full transition-colors ${
                    mode === "account" ? "bg-foreground text-background" : "text-muted-foreground"
                  }`}
                >
                  Create account
                </button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required defaultValue={user?.email} className="mt-1.5" />
              </div>
              {mode === "account" && (
                <div className="sm:col-span-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required defaultValue={user?.name} className="mt-1.5" />
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-5">Shipping</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="zip">ZIP</Label>
                <Input id="zip" name="zip" required className="mt-1.5" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" defaultValue="United States" required className="mt-1.5" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-5">Payment</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="card">Card number</Label>
                <Input id="card" name="card" placeholder="4242 4242 4242 4242" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="exp">Expiry</Label>
                <Input id="exp" name="exp" placeholder="MM / YY" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" name="cvc" placeholder="123" required className="mt-1.5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Demo only. No card is charged.
            </p>
          </section>

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? "Placing order…" : `Place order · $${total.toFixed(2)}`}
          </Button>
        </form>

        <aside className="bg-surface rounded-xl p-7 h-fit lg:sticky lg:top-24">
          <h2 className="font-display text-2xl">Order</h2>
          <ul className="mt-5 space-y-4 max-h-80 overflow-auto pr-1">
            {detailed.map(({ product, qty, lineTotal }) => (
              <li key={product.id} className="flex gap-3">
                <div className="w-14 h-16 rounded-md overflow-hidden bg-muted shrink-0">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-medium leading-tight">{product.name}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">Qty {qty}</p>
                </div>
                <p className="text-sm">${lineTotal.toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-6 pt-6 border-t border-border space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Tax</dt>
              <dd>${tax.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between pt-3 border-t border-border">
              <dt className="font-medium">Total</dt>
              <dd className="font-medium">${total.toFixed(2)}</dd>
            </div>
          </dl>
          <p className="mt-5 text-xs text-muted-foreground inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-accent" /> Secure checkout · 256-bit SSL
          </p>
        </aside>
      </div>
    </div>
  );
}
