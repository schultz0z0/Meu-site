import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@assets/generated_images/Hero_background_futuristic_workspace_f359338e.png";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="section-hero">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full mb-6 shadow-lg">
          <Sparkles className="h-4 w-4 text-white" />
          <span className="text-sm font-medium text-white text-shadow-hero">Impulsione seu negócio com IA</span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-shadow-hero" data-testid="text-hero-title">
          Soluções de IA
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300 drop-shadow-[0_2px_10px_rgba(168,85,247,0.5)]">
            Sob Medida
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white mb-12 max-w-2xl mx-auto text-shadow-hero leading-relaxed" data-testid="text-hero-subtitle">
          Transforme sua visão em realidade com IA de ponta
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/services">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 border-2 border-white px-8 py-6 text-lg font-semibold group"
              data-testid="button-explore-services"
            >
              Explorar Serviços
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg font-semibold"
              data-testid="button-contact"
            >
              Fale Conosco
            </Button>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { label: "Projetos Entregues", value: "150+" },
            { label: "Clientes Satisfeitos", value: "98%" },
            { label: "Tecnologias IA", value: "25+" },
            { label: "Suporte 24/7", value: "100%" },
          ].map((stat, index) => (
            <div key={index} className="text-center" data-testid={`stat-${index}`}>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
