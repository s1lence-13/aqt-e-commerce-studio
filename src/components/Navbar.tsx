import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ShoppingBag, Heart, User, Sun, Moon, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useCart, useTheme, useWishlist, useAuth } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV = [
  { to: "/shop", label: "Shop" },
  { to: "/shop", label: "New", search: { sort: "newest" as const } },
  { to: "/about", label: "About" },
];

export function Navbar() {
  const { count } = useCart();
  const { ids } = useWishlist();
  const { theme, toggle } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      navigate({ to: "/shop", search: { q: q.trim() } });
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/75 border-b border-border/60">
      <div className="container-aqt flex items-center justify-between h-16 md:h-20 gap-4">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden -ml-2" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[80vw] sm:w-80">
            <div className="flex flex-col gap-6 mt-8">
              <Logo />
              <nav className="flex flex-col gap-3 text-lg font-display">
                <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                <Link to="/shop" className="hover:text-accent transition-colors">Shop</Link>
                <Link to="/about" className="hover:text-accent transition-colors">About</Link>
                <Link to="/account" className="hover:text-accent transition-colors">Account</Link>
                <Link to="/wishlist" className="hover:text-accent transition-colors">Wishlist</Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        <Link to="/" className="flex items-center" aria-label="AQT home">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              search={n.search as never}
              className="relative py-1 text-foreground/80 hover:text-foreground transition-colors data-[status=active]:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          {/* Search */}
          <div className="hidden lg:block">
            <form onSubmit={submitSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search"
                className="pl-9 h-9 w-48 bg-muted/60 border-transparent focus-visible:bg-background"
              />
            </form>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggle}>
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          <Link to="/wishlist" aria-label="Wishlist" className="relative">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            {ids.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] rounded-full h-4 min-w-4 px-1 flex items-center justify-center font-medium">
                {ids.length}
              </span>
            )}
          </Link>

          <Link to="/account" aria-label="Account">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <Link to="/cart" aria-label="Cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] rounded-full h-4 min-w-4 px-1 flex items-center justify-center font-medium">
                {count}
              </span>
            )}
          </Link>

          {user && <span className="hidden xl:inline text-xs text-muted-foreground ml-2">Hi, {user.name}</span>}
        </div>
      </div>

      {searchOpen && (
        <div className="lg:hidden border-t border-border/60 bg-background">
          <div className="container-aqt py-3">
            <form onSubmit={submitSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products"
                className="pl-9"
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                onClick={() => setSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
