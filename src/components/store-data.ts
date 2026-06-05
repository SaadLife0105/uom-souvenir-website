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

export interface WorkflowStepItem {
  step: number;
  title: string;
  description: string;
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
  { label: "Browse", href: "#shop" },
  { label: "Cart", href: "/cart" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
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
];

export const workflowSteps: WorkflowStepItem[] = [
  {
    step: 1,
    title: "Browse & Reserve",
    description: "Add your favorite UOM souvenirs (mugs, pens, pins) to your digital cart.",
  },
  {
    step: 2,
    title: "Get Digital Receipt",
    description: "Confirm your cart to automatically receive a formatted invoice/receipt via email.",
  },
  {
    step: 3,
    title: "Pay & Collect",
    description: "Bring your digital or printed email receipt to the UOM Finance Office to complete payment and collect your items.",
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
  quick: ["About", "Browse", "Support"],
  contact: [
    "University of Mauritius, Réduit",
    "+230 1234 5678",
    "souvenir@uom.ac.mu",
  ],
};
