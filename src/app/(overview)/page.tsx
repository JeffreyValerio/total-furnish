import { About, BestSellers, Collections, Customers, FeaturesProducts, Hero, Offert, Services, Trending } from "@/components";


export const metadata = {
  title: 'Página principal',
  description: 'Página principal',
};
export default function HomePage() {
  return (
    <div>
      <Hero />

      <Services />

      <BestSellers />

      <About />

      <FeaturesProducts />

      {/* <p>testimonials</p> */}

      <Collections />

      {/* <p>suscribe</p> */}

      <Trending />

      <Offert />

      {/* <p>articles</p> */}

      <Customers />
    </div>
  );
}