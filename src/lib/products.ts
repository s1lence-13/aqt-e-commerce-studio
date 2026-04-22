import sweater from "@/assets/p-sweater.jpg";
import bag from "@/assets/p-bag.jpg";
import mug from "@/assets/p-mug.jpg";
import sneakers from "@/assets/p-sneakers.jpg";
import watch from "@/assets/p-watch.jpg";
import serum from "@/assets/p-serum.jpg";
import headphones from "@/assets/p-headphones.jpg";
import tee from "@/assets/p-tee.jpg";

export type Category = "apparel" | "home" | "accessories" | "tech" | "beauty";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  compareAt?: number;
  rating: number;
  reviewCount: number;
  image: string;
  tagline: string;
  description: string;
  details: string[];
  createdAt: number;
  popularity: number;
}

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "cashmere-crewneck",
    name: "Cashmere Crewneck",
    category: "apparel",
    price: 248,
    compareAt: 320,
    rating: 4.8,
    reviewCount: 142,
    image: sweater,
    tagline: "Mongolian cashmere, woven for everyday wear.",
    description:
      "A timeless crewneck in 100% Grade A cashmere. Soft, warm, and built to last seasons.",
    details: [
      "100% Grade A Mongolian cashmere",
      "Ribbed neckline, cuffs and hem",
      "Dry clean or hand wash cold",
    ],
    createdAt: 8,
    popularity: 96,
  },
  {
    id: "p2",
    slug: "minimal-leather-crossbody",
    name: "Minimal Leather Crossbody",
    category: "accessories",
    price: 189,
    rating: 4.7,
    reviewCount: 98,
    image: bag,
    tagline: "Vegetable-tanned leather, made to soften with time.",
    description:
      "A pared-back crossbody with adjustable strap and magnetic flap. Designed in Florence.",
    details: ["Full-grain Italian leather", "Adjustable cotton-lined strap", "Magnetic closure"],
    createdAt: 12,
    popularity: 88,
  },
  {
    id: "p3",
    slug: "stoneware-mug",
    name: "Stoneware Mug",
    category: "home",
    price: 28,
    rating: 4.9,
    reviewCount: 312,
    image: mug,
    tagline: "Hand-thrown in small batches.",
    description:
      "A weighty, comfortable mug glazed in matte cream. Microwave and dishwasher safe.",
    details: ["10oz capacity", "Glazed stoneware", "Made in Portugal"],
    createdAt: 3,
    popularity: 99,
  },
  {
    id: "p4",
    slug: "everyday-sneaker",
    name: "Everyday Sneaker",
    category: "apparel",
    price: 165,
    compareAt: 195,
    rating: 4.6,
    reviewCount: 211,
    image: sneakers,
    tagline: "Full-grain leather. Quietly considered.",
    description:
      "A clean court silhouette in supple leather with a cushioned footbed for all-day wear.",
    details: ["Full-grain leather upper", "Recycled rubber sole", "Removable cork insole"],
    createdAt: 20,
    popularity: 91,
  },
  {
    id: "p5",
    slug: "field-watch",
    name: "Field Watch",
    category: "accessories",
    price: 320,
    rating: 4.5,
    reviewCount: 67,
    image: watch,
    tagline: "Swiss movement, brushed steel case.",
    description:
      "A pared-down field watch with sapphire crystal and a vegetable-tanned leather strap.",
    details: ["Swiss quartz movement", "Sapphire crystal", "5 ATM water resistant"],
    createdAt: 30,
    popularity: 78,
  },
  {
    id: "p6",
    slug: "restorative-serum",
    name: "Restorative Serum",
    category: "beauty",
    price: 64,
    rating: 4.8,
    reviewCount: 489,
    image: serum,
    tagline: "Hydrate, balance, glow.",
    description:
      "A lightweight serum with hyaluronic acid and niacinamide. Gentle enough for daily use.",
    details: ["30ml amber glass bottle", "Vegan & cruelty-free", "Made in Australia"],
    createdAt: 5,
    popularity: 94,
  },
  {
    id: "p7",
    slug: "studio-headphones",
    name: "Studio Headphones",
    category: "tech",
    price: 289,
    compareAt: 349,
    rating: 4.7,
    reviewCount: 154,
    image: headphones,
    tagline: "Reference sound. Quiet design.",
    description:
      "Closed-back over-ear headphones with active noise cancellation and 40-hour battery.",
    details: ["Active noise cancellation", "40h battery life", "USB-C fast charging"],
    createdAt: 14,
    popularity: 86,
  },
  {
    id: "p8",
    slug: "essential-tee",
    name: "Essential Tee",
    category: "apparel",
    price: 48,
    rating: 4.6,
    reviewCount: 401,
    image: tee,
    tagline: "Garment-dyed pima cotton.",
    description:
      "A relaxed-fit tee in heavyweight pima cotton. Cut and sewn in Portugal.",
    details: ["Pima cotton, 220gsm", "Garment-dyed for softness", "Machine wash cold"],
    createdAt: 2,
    popularity: 92,
  },
];

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "apparel", label: "Apparel" },
  { id: "accessories", label: "Accessories" },
  { id: "home", label: "Home" },
  { id: "beauty", label: "Beauty" },
  { id: "tech", label: "Tech" },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
