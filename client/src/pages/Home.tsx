import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategorySection } from "@/components/CategorySection";
import { FeaturedServices } from "@/components/FeaturedServices";
import { Testimonials } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <CategorySection />
        <FeaturedServices />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
