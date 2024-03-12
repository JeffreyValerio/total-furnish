import { getPaginatedProducts } from "@/actions";
import { About, BestSellers, Collections, Customers, FeaturesProducts, Hero, Offert, Process, Services, Trending } from "@/components";

export const metadata = {
  title: 'Página principal',
  description: 'Página principal',
};


interface Props {
  searchParams: {
    page?: string
  }
}

export default async function HomePage({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { products, totalPages } = await getPaginatedProducts({ page })

  return (
    <div>
      <Hero />

      <Services />

      <BestSellers />

      <FeaturesProducts products={products} />

      <About />

      {/* <p>testimonials</p> */}

      <Collections />

      {/* <p>suscribe</p> */}

      <Trending products={products}/>

      <Process />

      <Offert />

      {/* <p>articles</p> */}

      <Customers />
    </div>
  );
}