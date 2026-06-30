import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ShopContent from '@/components/shop/ShopContent';
import { getShopProducts } from '@/db/queries';

export default async function ShopPage() {
  const products = await getShopProducts();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <ShopContent products={products} />
      </main>
      <Footer />
    </div>
  );
}
