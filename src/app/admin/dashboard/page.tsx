import { Card } from "./ui/Card";
import { DicesIcon, FactoryIcon, ShieldCheckIcon, ShoppingBagIcon, TagsIcon } from "lucide-react";
import { getPaginatedBrands, getPaginatedCategories, getPaginatedProducts, getPaginatedSuppliers, getPaginatedWarranties } from "@/actions";
import { Heading } from "@/components";

export const metadata = {
  title: 'Dashboard Admin',
  description: 'Dashboard Admin',
};

export default async function DashboardPage() {

  // const [brandsData, categoriesData, warrantiesData, productsData, supplierData] = await Promise.all([
  //   getPaginatedBrands({}),
  //   getPaginatedCategories({}),
  //   getPaginatedWarranties({}),
  //   getPaginatedProducts({}),
  //   getPaginatedSuppliers({})
  // ]);

  // const { totalBrands } = brandsData;
  // const { totalCategories } = categoriesData;
  // const { totalWarranties } = warrantiesData
  // const { totalProducts } = productsData;
  // const { totalSuppliers } = supplierData;

  const totalBrands = 1;
  const totalCategories = 1;
  const totalWarranties = 1
  const totalProducts = 1;
  const totalSuppliers = 1;

  const cards = [
    { name: 'marcas', icon: <DicesIcon strokeWidth={1} size={30} />, count: totalBrands, href: 'brands' },
    { name: 'categorías', icon: <TagsIcon strokeWidth={1} size={30} />, count: totalCategories, href: 'categories' },
    { name: 'garantías', icon: <ShieldCheckIcon strokeWidth={1} size={30} />, count: totalWarranties, href: 'warranties' },
    { name: 'proveedores', icon: <FactoryIcon strokeWidth={1} size={30} />, count: totalSuppliers, href: 'suppliers' },
    { name: 'productos', icon: <ShoppingBagIcon strokeWidth={1} size={30} />, count: totalProducts, href: 'products' },
  ]

  return (
    <div className="p-8">

      <Heading heading="Dashboard" subheading="Módulo principal" />
      <div className="p-8 rounded-md bg-slate-100 h-fit">
        <div className="grid grid-cols-4 gap-x-4 gap-y-10 h-full">

          {cards.map(card => (
            <Card key={card.name} {...card} />
          ))}

        </div>
      </div>
    </div>
  );
}