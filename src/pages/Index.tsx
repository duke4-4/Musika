import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <FeaturedProducts />
      <CategoryShowcase />
    </Layout>
  );
};


export default Index;
