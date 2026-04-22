import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube } from "lucide-react";
import { Logo } from "./Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="mt-24 md:mt-32 bg-surface text-surface-foreground">
      <div className="container-aqt py-16 md:py-24">
        <div className="grid gap-12 md:gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo className="text-3xl" />
            <p className="mt-5 max-w-sm text-muted-foreground leading-relaxed">
              Considered objects for a quieter everyday. Designed in studio, made in small batches.
            </p>

            <form
              className="mt-8 max-w-sm"
              onSubmit={(e) => {
                e.preventDefault();
                if (!email) return;
                toast.success("Thanks for subscribing", { description: "Welcome to AQT." });
                setEmail("");
              }}
            >
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Newsletter
              </label>
              <div className="mt-2 flex gap-2">
                <Input
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/60"
                />
                <Button type="submit">Subscribe</Button>
              </div>
            </form>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <FooterCol
              title="Shop"
              links={[
                { to: "/shop", label: "All Products" },
                { to: "/shop", label: "New", search: { sort: "newest" } },
                { to: "/shop", label: "Bestsellers", search: { sort: "popular" } },
              ]}
            />
            <FooterCol
              title="Company"
              links={[
                { to: "/about", label: "About" },
                { to: "/about", label: "Contact" },
                { to: "/about", label: "Stockists" },
              ]}
            />
            <FooterCol
              title="Support"
              links={[
                { to: "/about", label: "Shipping" },
                { to: "/about", label: "Returns" },
                { to: "/about", label: "Privacy" },
              ]}
            />
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/60 flex flex-col-reverse md:flex-row gap-6 items-start md:items-center justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AQT Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-muted-foreground">
            <a href="#" aria-label="Instagram" className="hover:text-foreground transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-foreground transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Youtube" className="hover:text-foreground transition-colors">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string; search?: Record<string, string> }[];
}) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              to={l.to}
              search={l.search as never}
              className="hover:text-accent transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
