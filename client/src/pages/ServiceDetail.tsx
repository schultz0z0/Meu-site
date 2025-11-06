import { useRoute, Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Check, Star } from "lucide-react";
import influencerImg from "@assets/generated_images/AI_Influencer_service_thumbnail_14717341.png";

export default function ServiceDetail() {
  const [, params] = useRoute("/service/:id");

  const service = {
    id: params?.id || "1",
    title: "Influenciador IA Premium",
    description: "Desenvolvimento completo de avatar virtual com IA generativa para criar conteúdo autêntico e engajador nas redes sociais.",
    category: "Influenciadores IA",
    price: "A partir de R$ 15.000",
    image: influencerImg,
    longDescription: "Nosso serviço de Influenciador IA Premium representa o que há de mais avançado em criação de personalidades virtuais. Utilizando tecnologias de IA generativa de última geração, criamos avatares únicos que podem gerar conteúdo autêntico, interagir com audiências e construir uma presença online consistente e engajadora.",
    features: [
      "Avatar 3D hiper-realista personalizado",
      "Geração automática de conteúdo usando GPT-4",
      "Integração completa com redes sociais",
      "Sistema de agendamento inteligente",
      "Análise de engajamento com IA",
      "Suporte e manutenção contínua",
    ],
    deliverables: [
      "Avatar 3D completo com animações",
      "Plataforma de gerenciamento",
      "Integração com Instagram, TikTok e YouTube",
      "Documentação completa",
      "Treinamento da equipe",
    ],
    timeline: "6-8 semanas",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Link href="/services">
            <Button variant="ghost" className="mb-6 hover-elevate" data-testid="button-back">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Serviços
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div>
              <img
                src={service.image}
                alt={service.title}
                className="w-full rounded-lg shadow-lg"
                data-testid="img-service-detail"
              />
            </div>

            <div className="space-y-6">
              <div>
                <Badge className="mb-3" data-testid="badge-category">
                  {service.category}
                </Badge>
                <h1 className="text-4xl font-bold mb-4" data-testid="text-service-title">
                  {service.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  {service.description}
                </p>
                <div className="text-3xl font-bold text-primary mb-6" data-testid="text-price">
                  {service.price}
                </div>
              </div>

              <Card className="p-6 bg-muted/30">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">Prazo de Entrega:</span>
                  <span>{service.timeline}</span>
                </div>
                <Button size="lg" className="w-full" data-testid="button-hire">
                  Contratar Serviço
                </Button>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="overview" className="mb-12">
            <TabsList className="grid w-full grid-cols-3" data-testid="tabs-service-detail">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="features">Recursos</TabsTrigger>
              <TabsTrigger value="deliverables">Entregas</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Sobre Este Serviço</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {service.longDescription}
                </p>
              </Card>
            </TabsContent>
            <TabsContent value="features" className="mt-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Recursos Inclusos</h2>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </TabsContent>
            <TabsContent value="deliverables" className="mt-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">O Que Você Receberá</h2>
                <ul className="space-y-3">
                  {service.deliverables.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
