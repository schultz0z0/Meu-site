import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import influencerImg from "@assets/generated_images/AI_Influencer_service_thumbnail_14717341.png";
import agentsImg from "@assets/generated_images/AI_Agents_service_thumbnail_f5a20d2c.png";
import microSaasImg from "@assets/generated_images/Micro-SaaS_service_thumbnail_e9a806ee.png";
import saasImg from "@assets/generated_images/SaaS_platform_service_thumbnail_34e42c59.png";
import appSaasImg from "@assets/generated_images/APP_SaaS_service_thumbnail_6bf5c22a.png";

export default function Services() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const allServices = [
    {
      id: "1",
      title: "Influenciador IA Premium",
      description: "Desenvolvimento completo de avatar virtual com IA generativa para criar conteúdo autêntico e engajador nas redes sociais.",
      category: "Influenciadores IA",
      price: "A partir de R$ 15.000",
      image: influencerImg,
      features: ["Avatar 3D personalizado", "Geração automática de conteúdo", "Integração com redes sociais"],
    },
    {
      id: "2",
      title: "Agent IA Empresarial",
      description: "Assistente inteligente customizado para automatizar processos, atendimento ao cliente e análise de dados.",
      category: "Agents IA",
      price: "A partir de R$ 25.000",
      image: agentsImg,
      features: ["Processamento de linguagem natural", "Integração com sistemas", "Aprendizado contínuo"],
    },
    {
      id: "3",
      title: "Micro-SaaS Analytics",
      description: "Plataforma SaaS focada em analytics e insights com IA para nichos específicos de mercado.",
      category: "Micro-SaaS",
      price: "A partir de R$ 20.000",
      image: microSaasImg,
      features: ["Dashboard intuitivo", "Análise preditiva com IA", "Relatórios automatizados"],
    },
    {
      id: "4",
      title: "Plataforma SaaS Enterprise",
      description: "Solução SaaS completa e escalável para empresas com infraestrutura robusta.",
      category: "SaaS",
      price: "A partir de R$ 50.000",
      image: saasImg,
      features: ["Arquitetura escalável", "Multi-tenancy", "Segurança avançada"],
    },
    {
      id: "5",
      title: "APP SaaS Mobile",
      description: "Aplicativo móvel SaaS completo com backend integrado e sincronização em tempo real.",
      category: "APP SaaS",
      price: "A partir de R$ 35.000",
      image: appSaasImg,
      features: ["iOS e Android nativos", "Sincronização offline", "Push notifications"],
    },
    {
      id: "6",
      title: "Agent IA Suporte 24/7",
      description: "Sistema de atendimento automatizado com IA para suporte ao cliente 24/7.",
      category: "Agents IA",
      price: "A partir de R$ 18.000",
      image: agentsImg,
      features: ["Atendimento 24/7", "Multilíngue", "Integração omnichannel"],
    },
  ];

  const filteredServices = allServices.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24">
        <div className="bg-gradient-primary py-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" data-testid="text-services-title">
              Nossos Serviços
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Explore nossa gama completa de soluções de IA
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Buscar serviços..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="input-search-services"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-64" data-testid="select-category">
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="Influenciadores IA">Influenciadores IA</SelectItem>
                <SelectItem value="Agents IA">Agents IA</SelectItem>
                <SelectItem value="Micro-SaaS">Micro-SaaS</SelectItem>
                <SelectItem value="SaaS">SaaS</SelectItem>
                <SelectItem value="APP SaaS">APP SaaS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">Nenhum serviço encontrado</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                data-testid="button-clear-filters"
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
