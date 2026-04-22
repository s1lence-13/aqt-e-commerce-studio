import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Package, User as UserIcon } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account — AQT" }] }),
  component: AccountPage,
});

function AccountPage() {
  const { user, signIn, signOut } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  if (!user) {
    return (
      <div className="container-aqt py-16 md:py-24">
        <div className="max-w-md mx-auto">
          <h1 className="font-display text-4xl text-center">
            {mode === "signin" ? "Sign in" : "Create account"}
          </h1>
          <p className="text-center text-muted-foreground mt-2">
            Welcome to AQT.
          </p>
          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              signIn(data.get("email") as string, data.get("name") as string);
              navigate({ to: "/account" });
            }}
          >
            {mode === "signup" && (
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required className="mt-1.5" />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required className="mt-1.5" />
            </div>
            <Button type="submit" className="w-full" size="lg">
              {mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "signin" ? "New to AQT?" : "Already have an account?"}{" "}
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-accent hover:underline underline-offset-4"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-aqt py-12 md:py-16">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
            Welcome back
          </p>
          <h1 className="font-display text-4xl md:text-5xl mt-3">{user.name}</h1>
          <p className="text-muted-foreground mt-1">{user.email}</p>
        </div>
        <Button variant="outline" onClick={signOut}>
          Sign out
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <section className="bg-surface rounded-xl p-7">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-accent" />
            <h2 className="font-display text-2xl">Order history</h2>
          </div>
          <ul className="mt-5 divide-y divide-border">
            {[
              { id: "AQT-1042", date: "Apr 12, 2026", total: 248.0, status: "Delivered" },
              { id: "AQT-0987", date: "Feb 02, 2026", total: 92.0, status: "Delivered" },
              { id: "AQT-0901", date: "Dec 18, 2025", total: 376.5, status: "Delivered" },
            ].map((o) => (
              <li key={o.id} className="py-4 flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{o.id}</p>
                  <p className="text-xs text-muted-foreground">{o.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${o.total.toFixed(2)}</p>
                  <p className="text-xs text-accent">{o.status}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            to="/shop"
            className="mt-4 inline-block text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
          >
            Browse new arrivals
          </Link>
        </section>

        <section className="bg-surface rounded-xl p-7">
          <div className="flex items-center gap-2">
            <UserIcon className="h-4 w-4 text-accent" />
            <h2 className="font-display text-2xl">Profile</h2>
          </div>
          <div className="mt-5 grid gap-4">
            <div>
              <Label htmlFor="pname">Name</Label>
              <Input id="pname" defaultValue={user.name} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="pemail">Email</Label>
              <Input id="pemail" type="email" defaultValue={user.email} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="paddr">Default address</Label>
              <Input id="paddr" placeholder="Add an address" className="mt-1.5" />
            </div>
            <Button className="w-full mt-2">Save changes</Button>
          </div>
        </section>
      </div>
    </div>
  );
}
