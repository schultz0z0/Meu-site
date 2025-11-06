import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 px-6" data-testid="section-cta">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-lg bg-gradient-primary p-12 md:p-16 text-center">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" data-testid="text-cta-title">
              Pronto para Transformar seu Negócio?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Entre em contato conosco hoje e descubra como nossas soluções de IA podem impulsionar seus resultados
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold group"
                  data-testid="button-cta-contact"
                >
                  Fale Conosco
                  <MessageCircle className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg font-semibold group"
                  data-testid="button-cta-services"
                >
                  Ver Todos os Serviços
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
