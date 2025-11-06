import { Card } from "@/components/ui/card";
import { Sparkles, Bot, Cloud, Code, Smartphone, Zap } from "lucide-react";

const categories = [
  {
    icon: Sparkles,
    title: "Influenciadores IA",
    description: "Avatares virtuais personalizados com IA para engajamento nas redes sociais",
    color: "text-purple-500",
  },
  {
    icon: Bot,
    title: "Agents IA Prontos",
    description: "Assistentes inteligentes pré-configurados para automatizar tarefas",
    color: "text-blue-500",
  },
  {
    icon: Zap,
    title: "Agents Personalizados",
    description: "Desenvolvimento sob medida de agents IA para suas necessidades específicas",
    color: "text-cyan-500",
  },
  {
    icon: Code,
    title: "Micro-SaaS",
    description: "Soluções SaaS focadas e especializadas para nichos de mercado",
    color: "text-indigo-500",
  },
  {
    icon: Cloud,
    title: "SaaS Completo",
    description: "Plataformas SaaS empresariais robustas e escaláveis",
    color: "text-violet-500",
  },
  {
    icon: Smartphone,
    title: "APP SaaS",
    description: "Aplicativos móveis SaaS com backend completo e integrado",
    color: "text-purple-600",
  },
];

export function CategorySection() {
  return (
    <section className="py-24 px-6" data-testid="section-categories">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-categories-title">
            Categorias de Serviços
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-categories-subtitle">
            Explore nossa gama completa de soluções de IA projetadas para impulsionar seu negócio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="p-6 hover-elevate active-elevate-2 transition-all duration-300 hover:shadow-lg cursor-pointer"
              data-testid={`card-category-${index}`}
            >
              <category.icon className={`h-12 w-12 mb-4 ${category.color}`} />
              <h3 className="text-xl font-bold mb-2">{category.title}</h3>
              <p className="text-muted-foreground">{category.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
