import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Target, 
  Eye, 
  Heart, 
  Shield, 
  Zap, 
  Users, 
  Award,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Shield,
      title: "Segurança e Confiabilidade",
      description: "Implementamos as melhores práticas de segurança em todos os nossos projetos."
    },
    {
      icon: Zap,
      title: "Inovação Constante",
      description: "Sempre atualizados com as últimas tecnologias de IA e desenvolvimento."
    },
    {
      icon: Heart,
      title: "Foco no Cliente",
      description: "Seu sucesso é nossa prioridade. Trabalhamos até você estar 100% satisfeito."
    },
    {
      icon: Users,
      title: "Colaboração",
      description: "Trabalhamos lado a lado com você durante todo o processo."
    }
  ];

  const timeline = [
    {
      year: "2021",
      title: "Fundação",
      description: "Iniciamos nossa jornada focados em soluções de IA inovadoras."
    },
    {
      year: "2022",
      title: "Expansão",
      description: "Ampliamos nossa equipe e portfólio com projetos de grande escala."
    },
    {
      year: "2023",
      title: "Reconhecimento",
      description: "Premiados como uma das startups mais promissoras em IA."
    },
    {
      year: "2024",
      title: "Liderança",
      description: "Hoje somos referência em desenvolvimento de soluções de IA customizadas."
    }
  ];

  const stats = [
    { value: "150+", label: "Projetos Entregues" },
    { value: "98%", label: "Satisfação dos Clientes" },
    { value: "25+", label: "Tecnologias de IA" },
    { value: "24/7", label: "Suporte Dedicado" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24">
        <section className="py-20 px-6 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-4">Sobre Nós</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Transformando Visões em
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600">
                Realidade com IA
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Somos uma empresa especializada em criar soluções personalizadas de Inteligência Artificial 
              que impulsionam negócios e transformam indústrias.
            </p>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              {stats.map((stat, index) => (
                <Card key={index} className="p-6 text-center hover-elevate transition-all">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <Card className="p-8 hover-elevate transition-all">
                <Target className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-3xl font-bold mb-4">Nossa Missão</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Democratizar o acesso a soluções de IA de alta qualidade, tornando a tecnologia 
                  de ponta acessível para empresas de todos os tamanhos. Acreditamos que cada negócio 
                  merece ferramentas poderosas para crescer e inovar.
                </p>
              </Card>

              <Card className="p-8 hover-elevate transition-all">
                <Eye className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-3xl font-bold mb-4">Nossa Visão</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ser a referência global em desenvolvimento de soluções de IA personalizadas, 
                  reconhecidos pela qualidade, inovação e impacto positivo que geramos para nossos 
                  clientes e suas comunidades.
                </p>
              </Card>
            </div>

            <div className="mb-20">
              <h2 className="text-4xl font-bold text-center mb-12">Nossos Valores</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <Card key={index} className="p-6 hover-elevate transition-all">
                    <value.icon className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-20">
              <h2 className="text-4xl font-bold text-center mb-12">Nossa Jornada</h2>
              <div className="max-w-3xl mx-auto">
                {timeline.map((item, index) => (
                  <div key={index} className="flex gap-6 mb-8 relative">
                    {index !== timeline.length - 1 && (
                      <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-border"></div>
                    )}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                        {item.year}
                      </div>
                    </div>
                    <Card className="flex-1 p-6 hover-elevate transition-all">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-20">
              <Card className="p-8 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border-none">
                <div className="flex items-start gap-4 mb-6">
                  <Award className="h-12 w-12 text-primary flex-shrink-0" />
                  <div>
                    <h2 className="text-3xl font-bold mb-3">Por que Escolher a Gente?</h2>
                    <p className="text-muted-foreground mb-6">
                      Combinamos expertise técnica profunda com um compromisso genuíno com o sucesso dos nossos clientes.
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Equipe com certificações em IA e ML",
                    "Soluções 100% personalizadas",
                    "Suporte técnico dedicado 24/7",
                    "Metodologia ágil e transparente",
                    "Entrega dentro do prazo garantida",
                    "Código limpo e documentado"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="p-12 text-center bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white border-none">
              <h2 className="text-4xl font-bold mb-4">Pronto para Transformar seu Negócio?</h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Vamos conversar sobre como nossa expertise em IA pode impulsionar seus resultados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services">
                  <Button size="lg" variant="secondary" className="group">
                    Ver Nossos Serviços
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                    Fale Conosco
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
