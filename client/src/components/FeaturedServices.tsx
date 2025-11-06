import { ServiceCard } from "./ServiceCard";
import influencerImg from "@assets/generated_images/AI_Influencer_service_thumbnail_14717341.png";
import agentsImg from "@assets/generated_images/AI_Agents_service_thumbnail_f5a20d2c.png";
import microSaasImg from "@assets/generated_images/Micro-SaaS_service_thumbnail_e9a806ee.png";
import saasImg from "@assets/generated_images/SaaS_platform_service_thumbnail_34e42c59.png";
import appSaasImg from "@assets/generated_images/APP_SaaS_service_thumbnail_6bf5c22a.png";

export function FeaturedServices() {
  const services = [
    {
      id: "1",
      title: "Influenciador IA Premium",
      description: "Desenvolvimento completo de avatar virtual com IA generativa para criar conteúdo autêntico e engajador nas redes sociais.",
      category: "Influenciadores IA",
      price: "A partir de R$ 15.000",
      image: influencerImg,
      features: [
        "Avatar 3D personalizado",
        "Geração automática de conteúdo",
        "Integração com redes sociais",
      ],
    },
    {
      id: "2",
      title: "Agent IA Empresarial",
      description: "Assistente inteligente customizado para automatizar processos, atendimento ao cliente e análise de dados em tempo real.",
      category: "Agents IA",
      price: "A partir de R$ 25.000",
      image: agentsImg,
      features: [
        "Processamento de linguagem natural",
        "Integração com sistemas existentes",
        "Aprendizado contínuo",
      ],
    },
    {
      id: "3",
      title: "Micro-SaaS Analytics",
      description: "Plataforma SaaS focada em analytics e insights com IA para nichos específicos de mercado.",
      category: "Micro-SaaS",
      price: "A partir de R$ 20.000",
      image: microSaasImg,
      features: [
        "Dashboard intuitivo",
        "Análise preditiva com IA",
        "Relatórios automatizados",
      ],
    },
    {
      id: "4",
      title: "Plataforma SaaS Enterprise",
      description: "Solução SaaS completa e escalável para empresas, com infraestrutura robusta e recursos avançados de IA.",
      category: "SaaS",
      price: "A partir de R$ 50.000",
      image: saasImg,
      features: [
        "Arquitetura escalável",
        "Multi-tenancy",
        "Segurança avançada",
      ],
    },
    {
      id: "5",
      title: "APP SaaS Mobile",
      description: "Aplicativo móvel SaaS completo com backend integrado, notificações push e sincronização em tempo real.",
      category: "APP SaaS",
      price: "A partir de R$ 35.000",
      image: appSaasImg,
      features: [
        "iOS e Android nativos",
        "Sincronização offline",
        "Push notifications",
      ],
    },
    {
      id: "6",
      title: "Agent IA Suporte 24/7",
      description: "Sistema de atendimento automatizado com IA para suporte ao cliente 24/7, multilíngue e multi-canal.",
      category: "Agents IA",
      price: "A partir de R$ 18.000",
      image: agentsImg,
      features: [
        "Atendimento 24/7",
        "Multilíngue",
        "Integração omnichannel",
      ],
    },
  ];

  return (
    <section className="py-24 px-6" data-testid="section-featured-services">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-featured-title">
            Serviços em Destaque
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra nossas soluções mais populares e transforme seu negócio com tecnologia de ponta
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
