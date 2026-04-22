import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { PRODUCTS, type Product } from "./products";

/* ---------------- Theme ---------------- */
type Theme = "light" | "dark";
interface ThemeCtx {
  theme: Theme;
  toggle: () => void;
}
const ThemeContext = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("aqt-theme")) as Theme | null;
    const initial: Theme =
      saved ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("aqt-theme", theme);
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === "light" ? "dark" : "light")), []);
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
};

/* ---------------- Cart ---------------- */
export interface CartItem {
  productId: string;
  qty: number;
}
interface CartCtx {
  items: CartItem[];
  add: (productId: string, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  detailed: { product: Product; qty: number; lineTotal: number }[];
}
const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aqt-cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("aqt-cart", JSON.stringify(items));
  }, [items]);

  const add = useCallback((productId: string, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { productId, qty }];
    });
  }, []);
  const remove = useCallback(
    (productId: string) => setItems((p) => p.filter((i) => i.productId !== productId)),
    []
  );
  const setQty = useCallback((productId: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.productId !== productId)
        : prev.map((i) => (i.productId === productId ? { ...i, qty } : i))
    );
  }, []);
  const clear = useCallback(() => setItems([]), []);

  const detailed = useMemo(() => {
    return items
      .map((it) => {
        const product = PRODUCTS.find((p) => p.id === it.productId);
        if (!product) return null;
        return { product, qty: it.qty, lineTotal: product.price * it.qty };
      })
      .filter((x): x is { product: Product; qty: number; lineTotal: number } => Boolean(x));
  }, [items]);

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
  const subtotal = useMemo(() => detailed.reduce((s, d) => s + d.lineTotal, 0), [detailed]);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, count, subtotal, detailed }}>
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};

/* ---------------- Wishlist ---------------- */
interface WishCtx {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
}
const WishContext = createContext<WishCtx | null>(null);
export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    try {
      const s = localStorage.getItem("aqt-wish");
      if (s) setIds(JSON.parse(s));
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("aqt-wish", JSON.stringify(ids));
  }, [ids]);
  const toggle = useCallback(
    (id: string) => setIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])),
    []
  );
  const has = useCallback((id: string) => ids.includes(id), [ids]);
  return <WishContext.Provider value={{ ids, toggle, has }}>{children}</WishContext.Provider>;
}
export const useWishlist = () => {
  const ctx = useContext(WishContext);
  if (!ctx) throw new Error("useWishlist must be inside WishlistProvider");
  return ctx;
};

/* ---------------- Auth (mock) ---------------- */
export interface User {
  email: string;
  name: string;
}
interface AuthCtx {
  user: User | null;
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
}
const AuthContext = createContext<AuthCtx | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    try {
      const s = localStorage.getItem("aqt-user");
      if (s) setUser(JSON.parse(s));
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    if (user) localStorage.setItem("aqt-user", JSON.stringify(user));
    else localStorage.removeItem("aqt-user");
  }, [user]);
  const signIn = useCallback(
    (email: string, name?: string) => setUser({ email, name: name ?? email.split("@")[0] }),
    []
  );
  const signOut = useCallback(() => setUser(null), []);
  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};

/* ---------------- Quick view ---------------- */
interface QuickViewCtx {
  open: (id: string) => void;
  close: () => void;
  productId: string | null;
}
const QuickViewContext = createContext<QuickViewCtx | null>(null);
export function QuickViewProvider({ children }: { children: ReactNode }) {
  const [productId, setProductId] = useState<string | null>(null);
  return (
    <QuickViewContext.Provider
      value={{
        productId,
        open: (id) => setProductId(id),
        close: () => setProductId(null),
      }}
    >
      {children}
    </QuickViewContext.Provider>
  );
}
export const useQuickView = () => {
  const ctx = useContext(QuickViewContext);
  if (!ctx) throw new Error("useQuickView must be inside QuickViewProvider");
  return ctx;
};
