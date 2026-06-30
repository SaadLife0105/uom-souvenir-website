import type { StaticImageData } from "next/image";
import { goldHex, redHex } from "@/constants/variables";
import gownAndHat from "@/app/images/category/gownandhat-nobg.png";
import notebookAndPen from "@/app/images/category/notebookandpen-nobg.png";
import hoodieAndShoes from "@/app/images/category/hoodieandshoes-nobg.png";
import laptopAndCase from "@/app/images/category/laptopandcase-nobg.png";
import bagBestseller from "@/app/images/best sellers/bagbestseller.png";
import gownBestseller from "@/app/images/best sellers/gownbestseller.png";
import hoodieBestseller from "@/app/images/best sellers/hoodiebestseller.png";
import mugBestseller from "@/app/images/best sellers/mugbestseller.png";
import notebookBestseller from "@/app/images/best sellers/notebookbestseller.png";

export interface CategoryItem {
  title: string;
  description: string;
  image: StaticImageData;
  href: string;
  bgColor: string;
  textColor: string;
}

export interface ShopProduct {
  id: string;
  name: string;
  description: string;
  colors: string[];
  price: number | null;
  quantity: number;
  isDisplayOnly: boolean;
  image: string;
}

export interface WorkflowStepItem {
  step: number;
  title: string;
  description: string;
}

export const navLinks = [
  { label: "Browse", href: "#shop" },
  { label: "Categories", href: "#categories" },
  { label: "How-to", href: "#steps" },
  { label: "Contact", href: "#contact" },
  { label: "FAQ", href: "#faq" },
];

export const categories: CategoryItem[] = [
  {
    title: "Graduation",
    description: "Celebrate your milestone with signature graduation keepsakes.",
    image: gownAndHat,
    href: "/shop",
    bgColor: goldHex,
    textColor: "white",
  },
  {
    title: "Stationery",
    description: "Notebooks, planners and writing essentials for every study session.",
    image: notebookAndPen,
    href: "/shop",
    bgColor: redHex,
    textColor: "white",
  },
  {
    title: "Clothing",
    description: "Campus-ready hoodies, tees and premium UoM apparel.",
    image: hoodieAndShoes,
    href: "/shop",
    bgColor: goldHex,
    textColor: "white",
  },
  {
    title: "Accessory",
    description: "Stylish bags, cases and campus accessories for every day.",
    image: laptopAndCase,
    href: "/shop",
    bgColor: redHex,
    textColor: "white",
  },
];

export interface BestSellerCampaign {
  id: string;
  title: string;
  image: StaticImageData;
  buttons: { label: string; href: string }[];
}

export const bestSellers: BestSellerCampaign[] = [
  {
    id: "bs-mug",
    title: "Mug",
    image: mugBestseller,
    buttons: [{ label: "Order Now", href: "/shop" }],
  },
  {
    id: "bs-bag",
    title: "Bag",
    image: bagBestseller,
    buttons: [{ label: "Order Now", href: "/shop" }],
  },
  {
    id: "bs-hoodie",
    title: "Hoodie",
    image: hoodieBestseller,
    buttons: [{ label: "Order Now", href: "/shop" }],
  },
  {
    id: "bs-notebook",
    title: "Notebook",
    image: notebookBestseller,
    buttons: [{ label: "Order Now", href: "/shop" }],
  },
  {
    id: "bs-gown",
    title: "Gown",
    image: gownBestseller,
    buttons: [{ label: "Order Now", href: "/shop" }],
  },
];

export const workflowSteps: WorkflowStepItem[] = [
  {
    step: 1,
    title: "Browse Items",
    description: "Explore souvenirs, compare campus favourites and add the best picks to your cart.",
  },
  {
    step: 2,
    title: "Get an Invoice",
    description: "Generate a clear invoice from your selections and confirm your reservation details.",
  },
  {
    step: 3,
    title: "Pay and Pick Up",
    description: "Pay and collect your items before the validation date on the invoice.",
  },
];

export const footerLinks = {
  shop: ["All Products", "Apparel", "Accessories", "Stationery"],
  support: ["How to Order", "Payment", "FAQs", "Contact Us"],
  company: ["About UoM", "Terms & Conditions", "Privacy Policy"],
};
