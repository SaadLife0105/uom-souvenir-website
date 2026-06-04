export interface CategoryItem {
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface ProductItem {
  id: string;
  name: string;
  price: string;
  rating: number;
  image: string;
  category: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: "shield" | "leaf" | "delivery" | "lock";
}

export interface TestimonialItem {
  name: string;
  role: string;
  review: string;
  rating: number;
  avatar: string;
}

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#shop" },
  { label: "Categories", href: "#categories" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#footer" },
];

export const categories: CategoryItem[] = [
  {
    title: "Hoodies",
    description: "Soft campus layer for study sessions.",
    image: "/category-placeholder.svg",
    href: "#shop",
  },
  {
    title: "T-Shirts",
    description: "Lightweight essentials with UoM style.",
    image: "/category-placeholder.svg",
    href: "#shop",
  },
  {
    title: "Mugs",
    description: "Daily drinkware with university pride.",
    image: "/category-placeholder.svg",
    href: "#shop",
  },
  {
    title: "Accessories",
    description: "Campus-ready bags, caps and more.",
    image: "/category-placeholder.svg",
    href: "#shop",
  },
  {
    title: "Stationery",
    description: "Premium notebooks and study essentials.",
    image: "/category-placeholder.svg",
    href: "#shop",
  },
];

export const featuredProducts: ProductItem[] = [
  {
    id: "uom-hoodie",
    name: "UoM Signature Hoodie",
    price: "Rs 2,200",
    rating: 4.8,
    image: "/product-card.svg",
    category: "Hoodies",
  },
  {
    id: "uom-tee",
    name: "Campus Crew T-Shirt",
    price: "Rs 850",
    rating: 4.7,
    image: "/product-card.svg",
    category: "T-Shirts",
  },
  {
    id: "uom-mug",
    name: "Ceramic Campus Mug",
    price: "Rs 420",
    rating: 4.9,
    image: "/product-card.svg",
    category: "Mugs",
  },
  {
    id: "uom-notebook",
    name: "Planner Notebook",
    price: "Rs 690",
    rating: 4.6,
    image: "/product-card.svg",
    category: "Stationery",
  },
];

export const bestSellers: ProductItem[] = [
  {
    id: "uom-cap",
    name: "University Cap",
    price: "Rs 600",
    rating: 4.7,
    image: "/product-card.svg",
    category: "Accessories",
  },
  {
    id: "uom-backpack",
    name: "Campus Backpack",
    price: "Rs 1,780",
    rating: 4.8,
    image: "/product-card.svg",
    category: "Accessories",
  },
  {
    id: "uom-sweatshirt",
    name: "Heritage Sweatshirt",
    price: "Rs 1,980",
    rating: 4.9,
    image: "/product-card.svg",
    category: "Hoodies",
  },
  {
    id: "uom-stationery",
    name: "Desk Bundle",
    price: "Rs 990",
    rating: 4.7,
    image: "/product-card.svg",
    category: "Stationery",
  },
];

export const features: FeatureItem[] = [
  {
    title: "Official University Products",
    description: "Authentic souvenirs designed for UoM students and alumni.",
    icon: "shield",
  },
  {
    title: "High Quality Materials",
    description: "Comfortable fabrics and durable finishes made to last.",
    icon: "leaf",
  },
  {
    title: "Fast Delivery",
    description: "Campus pickup and express shipping options available.",
    icon: "delivery",
  },
  {
    title: "Secure Payments",
    description: "Safe checkout experience with trusted payment options.",
    icon: "lock",
  },
];

export const testimonials: TestimonialItem[] = [
  {
    name: "Amala Raj",
    role: "Computer Science Student",
    review:
      "The hoodie is so comfortable and the design feels truly premium. Delivery was quick and the quality exceeded expectations.",
    rating: 5,
    avatar: "/avatar-placeholder.svg",
  },
  {
    name: "Kevin Leung",
    role: "UoM Alumna",
    review:
      "I love the merchandise range — the mug and tote bag are perfect gifts. The store feels modern and easy to shop.",
    rating: 5,
    avatar: "/avatar-placeholder.svg",
  },
  {
    name: "Nadia Abbas",
    role: "Faculty Member",
    review:
      "Excellent materials and clean packaging. The campus collection is stylish and well made.",
    rating: 4,
    avatar: "/avatar-placeholder.svg",
  },
];

export const footerLinks = {
  quick: ["About", "Shop", "Categories", "Support"],
  categories: ["Hoodies", "T-Shirts", "Mugs", "Accessories", "Stationery"],
  contact: [
    "University of Mauritius, Réduit",
    "+230 1234 5678",
    "souvenir@uom.ac.mu",
  ],
};
