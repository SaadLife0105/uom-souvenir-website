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
  { label: "Browse", href: "#shop" },
  { label: "Categories", href: "#categories" },
  { label: "How-to", href: "#steps" },
  { label: "Contact", href: "#contact" },
  { label: "FAQ", href: "#faq" },
];

export const categories: CategoryItem[] = [
  {
    title: "Apparel",
    description: "Premium sweatshirts, tees and UoM campus layers.",
    image: "/category-placeholder.svg",
    href: "#shop",
  },
  {
    title: "Drinkware",
    description: "Mugs, bottles and cups that carry university pride.",
    image: "/category-placeholder.svg",
    href: "#shop",
  },
  {
    title: "Accessories",
    description: "Bags, hats and campus-ready essentials.",
    image: "/category-placeholder.svg",
    href: "#shop",
  },
  {
    title: "Stationery",
    description: "Notebooks, pens and planners for every study session.",
    image: "/category-placeholder.svg",
    href: "#shop",
  },
  {
    title: "Gifts",
    description: "Collectibles and keepsakes made for UoM fans.",
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

export const bestSellers: ProductItem[] = [];

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
    description: "Pay at the UoM Finance Office and collect your reserved items when ready.",
  },
];

export const testimonials: TestimonialItem[] = [
  {
    name: "Person",
    role: "Student",
    review: "The hoodie is so comfortable and the design feels truly premium.",
    rating: 5,
    avatar: "/avatar-placeholder.svg",
  },
  {
    name: "Person",
    role: "Alumni",
    review: "The hoodie is so comfortable and the design feels truly premium.",
    rating: 5,
    avatar: "/avatar-placeholder.svg",
  },
  {
    name: "Person",
    role: "Faculty",
    review: "The hoodie is so comfortable and the design feels truly premium.",
    rating: 5,
    avatar: "/avatar-placeholder.svg",
  },
];

export const footerLinks = {
  contact: [
    "University of Mauritius, Réduit",
    "+230 1234 5678",
    "souvenir@uom.ac.mu",
  ],
};

export const shopProducts: ShopProduct[] = [
  { id: "1", name: "Mug", description: "Branded customised mug", colors: ["White"], price: 225, quantity: 8, isDisplayOnly: false, image: "/images/placeholder.png" },
  { id: "2", name: "Cap", description: "Gabardine cap", colors: ["Blue", "White"], price: 275, quantity: 27, isDisplayOnly: false, image: "/images/placeholder.png" },
  { id: "3", name: "Pen", description: "Corporate pen", colors: ["Blue", "Red", "Black"], price: 50, quantity: 76, isDisplayOnly: false, image: "/images/placeholder.png" },
  { id: "4", name: "Insulated Water Bottle", description: "Insulated bottle", colors: ["Red", "Green", "Black"], price: 550, quantity: 1, isDisplayOnly: true, image: "/images/placeholder.png" },
  { id: "5", name: "Jute Bag", description: "60th Anniversary Edition", colors: ["Natural Jute Beige"], price: null, quantity: 29, isDisplayOnly: false, image: "/images/placeholder.png" },
  { id: "6", name: "Keyring", description: "60th Anniversary Edition", colors: ["Silver"], price: 150, quantity: 16, isDisplayOnly: false, image: "/images/placeholder.png" },
  { id: "7", name: "Notebook A6", description: "Includes sticker notes", colors: ["Assorted"], price: 150, quantity: 1, isDisplayOnly: true, image: "/images/placeholder.png" },
  { id: "8", name: "Notebook A5", description: "60th Anniversary Edition", colors: ["Navy Blue", "Black"], price: 200, quantity: 9, isDisplayOnly: false, image: "/images/placeholder.png" },
  { id: "9", name: "Paperweight", description: "Recycled glass, round design", colors: ["Clear Glass"], price: 400, quantity: 1, isDisplayOnly: true, image: "/images/placeholder.png" },
  { id: "10", name: "Dodo Paperweight", description: "Recycled glass Dodo design", colors: ["Clear Glass"], price: 520, quantity: 1, isDisplayOnly: true, image: "/images/placeholder.png" },
  { id: "11", name: "Pen Drive", description: "32GB USB drive", colors: ["White"], price: 500, quantity: 14, isDisplayOnly: false, image: "/images/placeholder.png" },
  { id: "12", name: "Pen Holder", description: "60th Anniversary Edition", colors: ["Assorted"], price: null, quantity: 17, isDisplayOnly: false, image: "/images/placeholder.png" },
  { id: "13", name: "Pin", description: "60th Anniversary Edition", colors: ["Gold"], price: 150, quantity: 20, isDisplayOnly: false, image: "/images/placeholder.png" },
  { id: "14", name: "Polo Shirt", description: "University polo shirt", colors: ["Navy Blue", "Black"], price: 500, quantity: 27, isDisplayOnly: false, image: "/images/placeholder.png" },
  { id: "15", name: "Sweatshirt", description: "University sweatshirt", colors: ["Navy Blue", "Black"], price: 545, quantity: 39, isDisplayOnly: false, image: "/images/placeholder.png" },
  { id: "16", name: "Tie", description: "Pure silk with UoM tag", colors: ["Blue", "Beige", "Maroon"], price: 500, quantity: 10, isDisplayOnly: false, image: "/images/placeholder.png" },
  { id: "17", name: "T-Shirt", description: "University t-shirt", colors: ["Black", "White"], price: 285, quantity: 80, isDisplayOnly: false, image: "/images/placeholder.png" },
  { id: "18", name: "Tote Bag (Small)", description: "Features University logo", colors: ["Natural Beige"], price: 120, quantity: 2, isDisplayOnly: false, image: "/images/placeholder.png" },
  { id: "19", name: "Tote Bag (Large)", description: "Features University logo", colors: ["Natural Beige"], price: 145, quantity: 10, isDisplayOnly: false, image: "/images/placeholder.png" },
  { id: "20", name: "Umbrella", description: "University branded umbrella", colors: ["Navy Blue"], price: 520, quantity: 2, isDisplayOnly: false, image: "/images/placeholder.png" },
];
