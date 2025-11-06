import { useState } from "react";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Package, 
  Users, 
  DollarSign, 
  Plus,
  Edit,
  Trash2
} from "lucide-react";

export default function Admin() {
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  const handleCreateService = () => {
    console.log("Creating service:", { serviceName, serviceDescription, servicePrice });
    setServiceName("");
    setServiceDescription("");
    setServicePrice("");
  };

  const stats = [
    { label: "Total de Serviços", value: "12", icon: Package, color: "text-blue-500" },
    { label: "Clientes Ativos", value: "48", icon: Users, color: "text-green-500" },
    { label: "Pedidos Este Mês", value: "23", icon: BarChart3, color: "text-purple-500" },
    { label: "Receita Total", value: "R$ 450k", icon: DollarSign, color: "text-cyan-500" },
  ];

  const services = [
    { id: 1, name: "Influenciador IA Premium", category: "Influenciadores IA", price: "R$ 15.000", status: "Ativo" },
    { id: 2, name: "Agent IA Empresarial", category: "Agents IA", price: "R$ 25.000", status: "Ativo" },
    { id: 3, name: "Micro-SaaS Analytics", category: "Micro-SaaS", price: "R$ 20.000", status: "Ativo" },
  ];

  const orders = [
    { id: 1, client: "Maria Silva", service: "Influenciador IA Premium", status: "Em Andamento", date: "2025-01-15" },
    { id: 2, client: "João Santos", service: "Agent IA Empresarial", status: "Concluído", date: "2025-01-10" },
    { id: 3, client: "Ana Costa", service: "Micro-SaaS Analytics", status: "Pendente", date: "2025-01-18" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2" data-testid="text-admin-title">
              Painel Administrativo
            </h1>
            <p className="text-muted-foreground">Gerencie serviços, pedidos e visualize estatísticas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6" data-testid={`card-stat-${index}`}>
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="services" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3" data-testid="tabs-admin">
              <TabsTrigger value="services">Serviços</TabsTrigger>
              <TabsTrigger value="orders">Pedidos</TabsTrigger>
              <TabsTrigger value="create">Criar Serviço</TabsTrigger>
            </TabsList>

            <TabsContent value="services" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Gerenciar Serviços</h2>
                <div className="space-y-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-4 border border-border rounded-md hover-elevate"
                      data-testid={`service-row-${service.id}`}
                    >
                      <div className="flex-1">
                        <div className="font-semibold">{service.name}</div>
                        <div className="text-sm text-muted-foreground">{service.category}</div>
                      </div>
                      <div className="text-right mr-4">
                        <div className="font-semibold">{service.price}</div>
                        <div className="text-sm text-green-500">{service.status}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" data-testid={`button-edit-${service.id}`}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" data-testid={`button-delete-${service.id}`}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Pedidos Recentes</h2>
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-border rounded-md hover-elevate"
                      data-testid={`order-row-${order.id}`}
                    >
                      <div className="flex-1">
                        <div className="font-semibold">{order.client}</div>
                        <div className="text-sm text-muted-foreground">{order.service}</div>
                      </div>
                      <div className="text-right mr-4">
                        <div className="text-sm">{order.date}</div>
                        <div className={`text-sm ${
                          order.status === "Concluído" ? "text-green-500" :
                          order.status === "Em Andamento" ? "text-blue-500" :
                          "text-yellow-500"
                        }`}>
                          {order.status}
                        </div>
                      </div>
                      <Button size="sm" variant="outline" data-testid={`button-view-order-${order.id}`}>
                        Ver Detalhes
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="create" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Criar Novo Serviço</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="service-name">Nome do Serviço</Label>
                    <Input
                      id="service-name"
                      placeholder="Ex: Agent IA Personalizado"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      data-testid="input-service-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="service-description">Descrição</Label>
                    <Textarea
                      id="service-description"
                      placeholder="Descreva o serviço em detalhes..."
                      value={serviceDescription}
                      onChange={(e) => setServiceDescription(e.target.value)}
                      rows={4}
                      data-testid="input-service-description"
                    />
                  </div>
                  <div>
                    <Label htmlFor="service-price">Preço</Label>
                    <Input
                      id="service-price"
                      placeholder="Ex: R$ 25.000"
                      value={servicePrice}
                      onChange={(e) => setServicePrice(e.target.value)}
                      data-testid="input-service-price"
                    />
                  </div>
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handleCreateService}
                    data-testid="button-create-service"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Criar Serviço
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
