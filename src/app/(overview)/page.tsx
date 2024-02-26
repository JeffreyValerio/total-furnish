import { About, Collections, FeaturesProducts, Hero, Services } from "@/components";


export const metadata = {
  title: 'Página principal',
  description: 'Página principal',
};
export default function HomePage() {
  return (
    <div>
      <Hero />

      <Services />

      <About />

      <FeaturesProducts />

      <p>testimonials</p>

      <Collections />

      <p>suscribe</p>
      <p>trending</p>
      <p>articles</p>
      <p>brands</p>
    </div>
  );
}