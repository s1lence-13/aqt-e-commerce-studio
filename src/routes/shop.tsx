import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/products";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, X } from "lucide-react";

type Sort = "newest" | "popular" | "price-asc" | "price-desc";
interface Search {
  category?: Category | "all";
  sort?: Sort;
  min?: number;
  max?: number;
  rating?: number;
  q?: string;
}

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: (s.category as Search["category"]) ?? undefined,
    sort: (s.sort as Sort) ?? undefined,
    min: s.min ? Number(s.min) : undefined,
    max: s.max ? Number(s.max) : undefined,
    rating: s.rating ? Number(s.rating) : undefined,
    q: (s.q as string) ?? undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop — AQT" },
      { name: "description", content: "Browse the AQT collection: apparel, accessories, home and more." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const update = (patch: Partial<Search>) => {
    navigate({ search: (prev) => ({ ...prev, ...patch }) });
  };

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (search.category && search.category !== "all") {
      list = list.filter((p) => p.category === search.category);
    }
    if (search.q) {
      const q = search.q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.includes(q)
      );
    }
    if (search.min != null) list = list.filter((p) => p.price >= search.min!);
    if (search.max != null) list = list.filter((p) => p.price <= search.max!);
    if (search.rating != null) list = list.filter((p) => p.rating >= search.rating!);

    switch (search.sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case "popular":
      default:
        list.sort((a, b) => b.popularity - a.popularity);
    }
    return list;
  }, [search]);

  const min = search.min ?? 0;
  const max = search.max ?? 400;

  return (
    <div className="container-aqt py-12 md:py-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
            All collections
          </p>
          <h1 className="font-display text-4xl md:text-5xl mt-3">Shop</h1>
          <p className="text-muted-foreground mt-2">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
            {search.q && (
              <>
                {" "}for <span className="text-foreground">"{search.q}"</span>
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Sort</span>
          <Select
            value={search.sort ?? "popular"}
            onValueChange={(v) => update({ sort: v as Sort })}
          >
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Popularity</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to high</SelectItem>
              <SelectItem value="price-desc">Price: High to low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-10">
        {/* Filters */}
        <aside className="space-y-8 lg:sticky lg:top-24 self-start">
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Category
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => update({ category: "all" })}
                  className={`hover:text-accent transition-colors ${
                    !search.category || search.category === "all" ? "text-accent" : ""
                  }`}
                >
                  All
                </button>
              </li>
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => update({ category: c.id })}
                    className={`hover:text-accent transition-colors ${
                      search.category === c.id ? "text-accent" : ""
                    }`}
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Price
            </h3>
            <Slider
              value={[min, max]}
              min={0}
              max={400}
              step={10}
              onValueChange={([a, b]) => update({ min: a, max: b })}
            />
            <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
              <span>${min}</span>
              <span>${max}</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Rating
            </h3>
            <ul className="space-y-2 text-sm">
              {[4.5, 4, 3.5].map((r) => (
                <li key={r}>
                  <button
                    onClick={() =>
                      update({ rating: search.rating === r ? undefined : r })
                    }
                    className={`flex items-center gap-1.5 hover:text-accent transition-colors ${
                      search.rating === r ? "text-accent" : ""
                    }`}
                  >
                    <Star className="h-3.5 w-3.5 fill-current text-accent" />
                    {r} & up
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {(search.category || search.rating || search.min || search.max || search.q) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                navigate({
                  search: () => ({
                    category: undefined,
                    rating: undefined,
                    min: undefined,
                    max: undefined,
                    q: undefined,
                    sort: search.sort,
                  }),
                })
              }
              className="text-muted-foreground"
            >
              <X className="h-3.5 w-3.5 mr-1" /> Clear filters
            </Button>
          )}
        </aside>

        <div>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="font-display text-2xl">Nothing here yet.</p>
              <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
              <Button asChild variant="outline" className="mt-6">
                <Link to="/shop">Reset</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
