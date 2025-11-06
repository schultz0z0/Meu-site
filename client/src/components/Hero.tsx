import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@assets/generated_images/AI_workspace_hero_background_44c96975.png";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="section-hero">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6 shadow-lg"
          initial="initial"
          animate="animate"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <Sparkles className="h-4 w-4 text-white" />
          <span className="text-sm font-medium text-white">Impulsione seu negócio com IA</span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
          data-testid="text-hero-title"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Soluções de IA
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300">
            Sob Medida
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm"
          data-testid="text-hero-subtitle"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Transforme sua visão em realidade com IA de ponta
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/services">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 px-8 py-6 text-lg font-semibold group transition-all hover:scale-105"
              data-testid="button-explore-services"
            >
              Explorar Serviços
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <a href="#contact">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg font-semibold transition-all hover:scale-105"
              data-testid="button-contact"
            >
              Fale Conosco
            </Button>
          </a>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          initial="initial"
          animate="animate"
          variants={fadeIn}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {[
            { label: "Projetos Entregues", value: "150+" },
            { label: "Clientes Satisfeitos", value: "98%" },
            { label: "Tecnologias IA", value: "25+" },
            { label: "Suporte 24/7", value: "100%" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
              data-testid={`stat-${index}`}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
