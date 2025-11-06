import { useRoute, Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Check, Star, Shield, Clock, Award, TrendingUp, Users2, Sparkles, AlertCircle } from "lucide-react";
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
    slotsAvailable: 3,
  };

  const testimonials = [
    {
      name: "Maria Silva",
      company: "Tech Innovations",
      rating: 5,
      comment: "Transformou completamente nossa presença digital. O influenciador IA superou todas as expectativas!",
      image: "MS"
    },
    {
      name: "João Santos",
      company: "Digital Marketing Pro",
      rating: 5,
      comment: "ROI incrível! Triplicamos nosso engajamento em apenas 2 meses.",
      image: "JS"
    }
  ];

  const guarantees = [
    {
      icon: Shield,
      title: "Garantia de Satisfação",
      description: "100% de reembolso se não ficar satisfeito nos primeiros 30 dias"
    },
    {
      icon: Award,
      title: "Qualidade Certificada",
      description: "Equipe certificada em IA/ML por instituições reconhecidas"
    },
    {
      icon: Clock,
      title: "Entrega Garantida",
      description: "Prazo cumprido ou você recebe 20% de desconto"
    }
  ];

  const faqs = [
    {
      question: "Quanto tempo leva para implementar?",
      answer: "O projeto completo leva entre 6-8 semanas, incluindo desenvolvimento, testes e treinamento da sua equipe."
    },
    {
      question: "Preciso de conhecimento técnico?",
      answer: "Não! Fornecemos treinamento completo e uma interface intuitiva. Nossa equipe cuida de toda a parte técnica."
    },
    {
      question: "O que está incluído no suporte?",
      answer: "Suporte 24/7 via chat, email e telefone. Atualizações regulares e manutenção preventiva incluídas."
    },
    {
      question: "Posso personalizar depois?",
      answer: "Sim! A solução é 100% customizável. Você pode ajustar personalidade, tom de voz e aparência a qualquer momento."
    },
    {
      question: "Como funciona o pagamento?",
      answer: "Oferecemos planos flexíveis: pagamento único ou parcelado em até 12x. Sem taxas ocultas."
    }
  ];

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

          <Card className="p-6 mb-12 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border-orange-200 dark:border-orange-800">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-orange-900 dark:text-orange-100">
                  Atenção: Apenas {service.slotsAvailable} vagas disponíveis este mês!
                </h3>
                <p className="text-orange-800 dark:text-orange-200 mb-4">
                  Devido à alta demanda e ao processo personalizado, aceitamos apenas um número limitado de projetos por mês. 
                  Garanta sua vaga agora antes que esgotem!
                </p>
                <div className="flex items-center gap-2 text-sm text-orange-700 dark:text-orange-300">
                  <Users2 className="h-4 w-4" />
                  <span className="font-semibold">23 pessoas visualizaram este serviço nas últimas 24h</span>
                </div>
              </div>
            </div>
          </Card>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">O Que Nossos Clientes Dizem</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 hover-elevate transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {testimonial.image}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.comment}"</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Nossas Garantias</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {guarantees.map((guarantee, index) => (
                <Card key={index} className="p-6 text-center hover-elevate transition-all">
                  <guarantee.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{guarantee.title}</h3>
                  <p className="text-sm text-muted-foreground">{guarantee.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Perguntas Frequentes</h2>
            <Card className="p-6 max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>

          <Card className="p-12 text-center bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white border-none mb-12">
            <Sparkles className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Pronto para Começar?</h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Transforme sua presença digital com IA de última geração. Nossa equipe está pronta para criar a solução perfeita para você.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="group">
                Contratar Agora
                <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              </Button>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                  Falar com Especialista
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/80">
              <TrendingUp className="h-4 w-4" />
              <span>Mais de 150 projetos entregues com sucesso</span>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
