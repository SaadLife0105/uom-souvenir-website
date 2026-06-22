import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { productDetails } from './schema';
import 'dotenv/config';

// 1. Initialize database connection
if (!process.env.DIRECT_URL) {
  throw new Error('DIRECT_URL is missing from .env.local');
}
const sql = neon(process.env.DIRECT_URL);
const db = drizzle(sql);

// 2. Helper function to generate SSXxxxx IDs
function generateReferenceID() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomLetter = letters[Math.floor(Math.random() * letters.length)];
  const randomNumbers = Math.floor(1000 + Math.random() * 9000); // 4 digit number
  return `SS${randomLetter}${randomNumbers}`;
}

// 3. The categorized product data
const inventory = [
  { name: "Mug", description: "Branded customised mug", category: "Drinkware", colors: "White", price: 225, stock: 8, isDisplayItem: false },
  { name: "Cap", description: "Gabardine cap", category: "Apparel", colors: "Blue, White", price: 275, stock: 27, isDisplayItem: false },
  { name: "Pen", description: "Corporate pen", category: "Stationery", colors: "Blue, Red, Black", price: 50, stock: 76, isDisplayItem: false },
  { name: "Insulated Water Bottle", description: "Insulated bottle", category: "Drinkware", colors: "Red, Green, Black", price: 550, stock: 1, isDisplayItem: true },
  { name: "Jute Bag", description: "60th Anniversary Edition", category: "Bags", colors: "Natural Jute Beige", price: null, stock: 29, isDisplayItem: false },
  { name: "Keyring", description: "60th Anniversary Edition", category: "Accessories", colors: "Silver", price: 150, stock: 16, isDisplayItem: false },
  { name: "Notebook A6", description: "Includes sticker notes", category: "Stationery", colors: "Assorted", price: 150, stock: 1, isDisplayItem: true },
  { name: "Notebook A5", description: "60th Anniversary Edition", category: "Stationery", colors: "Navy Blue, Black", price: 200, stock: 9, isDisplayItem: false },
  { name: "Paperweight", description: "Recycled glass, round design", category: "Stationery", colors: "Clear Glass", price: 400, stock: 1, isDisplayItem: true },
  { name: "Dodo Paperweight", description: "Recycled glass Dodo design", category: "Stationery", colors: "Clear Glass", price: 520, stock: 1, isDisplayItem: true },
  { name: "Pen Drive", description: "32GB USB drive", category: "Tech", colors: "White", price: 500, stock: 14, isDisplayItem: false },
  { name: "Pen Holder", description: "60th Anniversary Edition", category: "Stationery", colors: "Assorted", price: null, stock: 17, isDisplayItem: false },
  { name: "Pin", description: "60th Anniversary Edition", category: "Accessories", colors: "Gold", price: 150, stock: 20, isDisplayItem: false },
  { name: "Polo Shirt", description: "University polo shirt", category: "Apparel", colors: "Navy Blue, Black", price: 500, stock: 27, isDisplayItem: false },
  { name: "Sweatshirt", description: "University sweatshirt", category: "Apparel", colors: "Navy Blue, Black", price: 545, stock: 39, isDisplayItem: false },
  { name: "Tie", description: "Pure silk with UoM tag", category: "Apparel", colors: "Blue, Beige, Maroon", price: 500, stock: 10, isDisplayItem: false },
  { name: "T-Shirt", description: "University t-shirt", category: "Apparel", colors: "Black, White", price: 285, stock: 80, isDisplayItem: false },
  { name: "Tote Bag (Small)", description: "Features University logo", category: "Bags", colors: "Natural Beige", price: 120, stock: 2, isDisplayItem: false },
  { name: "Tote Bag (Large)", description: "Features University logo", category: "Bags", colors: "Natural Beige", price: 145, stock: 10, isDisplayItem: false },
  { name: "Umbrella", description: "University branded umbrella", category: "Accessories", colors: "Navy Blue", price: 520, stock: 2, isDisplayItem: false }
];

async function seed() {
  console.log("🌱 Seeding database...");
  
  try {
    for (const item of inventory) {
      const newItem = {
        ...item,
        id: generateReferenceID(), // Injects the custom SSXxxxx ID
      };
      
      await db.insert(productDetails).values(newItem);
      console.log(`✅ Inserted: ${newItem.name} (${newItem.id})`);
    }
    console.log("🎉 Seeding complete!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
}

seed();