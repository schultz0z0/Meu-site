import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LeadsManager } from "@/components/crm/LeadsManager";
import { CustomersManager } from "@/components/crm/CustomersManager";
import { PipelineManager } from "@/components/crm/PipelineManager";
import { 
  BarChart3, 
  Package, 
  Plus,
  Edit,
  Trash2,
  Loader2,
  TrendingUp,
  Activity
} from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  image: string;
  features: string[];
  deliverables: string[];
  details?: string;
  isActive: boolean;
}

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [features, setFeatures] = useState("");
  const [deliverables, setDeliverables] = useState("");
  const [editingService, setEditingService] = useState<Service | null>(null);

  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/admin/services"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Erro ao criar serviço");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
      toast({ title: "Serviço criado com sucesso!" });
      resetForm();
    },
    onError: () => {
      toast({ title: "Erro ao criar serviço", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Erro ao atualizar serviço");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
      toast({ title: "Serviço atualizado com sucesso!" });
      resetForm();
      setEditingService(null);
    },
    onError: () => {
      toast({ title: "Erro ao atualizar serviço", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Erro ao deletar serviço");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
      toast({ title: "Serviço deletado com sucesso!" });
    },
    onError: () => {
      toast({ title: "Erro ao deletar serviço", variant: "destructive" });
    },
  });

  const handleSubmit = () => {
    const data = {
      title,
      description,
      category,
      price,
      image: image || "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
      features: features.split("\n").filter(f => f.trim()),
      deliverables: deliverables.split("\n").filter(d => d.trim()),
      isActive: true,
    };

    if (editingService) {
      updateMutation.mutate({ id: editingService.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setTitle(service.title);
    setDescription(service.description);
    setCategory(service.category);
    setPrice(service.price);
    setImage(service.image);
    setFeatures(service.features.join("\n"));
    setDeliverables(service.deliverables.join("\n"));
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja deletar este serviço?")) {
      deleteMutation.mutate(id);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setPrice("");
    setImage("");
    setFeatures("");
    setDeliverables("");
    setEditingService(null);
  };

  const stats = [
    { label: "Total de Serviços", value: services.length.toString(), icon: Package, color: "text-blue-500" },
    { label: "Serviços Ativos", value: services.filter(s => s.isActive).length.toString(), icon: Activity, color: "text-green-500" },
    { label: "Categorias", value: new Set(services.map(s => s.category)).size.toString(), icon: BarChart3, color: "text-purple-500" },
    { label: "Em Destaque", value: services.slice(0, 3).length.toString(), icon: TrendingUp, color: "text-cyan-500" },
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
              <TabsTrigger value="crm">CRM</TabsTrigger>
              <TabsTrigger value="create">{editingService ? "Editar" : "Criar"} Serviço</TabsTrigger>
            </TabsList>

            <TabsContent value="services" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Gerenciar Serviços</h2>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : services.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">Nenhum serviço cadastrado ainda.</p>
                ) : (
                  <div className="space-y-3">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between p-4 border border-border rounded-md hover-elevate"
                        data-testid={`service-row-${service.id}`}
                      >
                        <div className="flex-1">
                          <div className="font-semibold">{service.title}</div>
                          <div className="text-sm text-muted-foreground">{service.category}</div>
                        </div>
                        <div className="text-right mr-4">
                          <div className="font-semibold">{service.price}</div>
                          <div className={`text-sm ${service.isActive ? 'text-green-500' : 'text-red-500'}`}>
                            {service.isActive ? 'Ativo' : 'Inativo'}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleEdit(service)}
                            data-testid={`button-edit-${service.id}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleDelete(service.id)}
                            disabled={deleteMutation.isPending}
                            data-testid={`button-delete-${service.id}`}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="crm" className="space-y-4">
              <Tabs defaultValue="leads" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="leads">Leads</TabsTrigger>
                  <TabsTrigger value="customers">Clientes</TabsTrigger>
                  <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
                </TabsList>
                <TabsContent value="leads">
                  <LeadsManager />
                </TabsContent>
                <TabsContent value="customers">
                  <CustomersManager />
                </TabsContent>
                <TabsContent value="pipeline">
                  <PipelineManager />
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="create" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">
                  {editingService ? "Editar Serviço" : "Criar Novo Serviço"}
                </h2>
                {editingService && (
                  <div className="mb-4 p-3 bg-primary/10 rounded-md flex items-center justify-between">
                    <span className="text-sm">Editando: <strong>{editingService.title}</strong></span>
                    <Button size="sm" variant="ghost" onClick={resetForm}>Cancelar</Button>
                  </div>
                )}
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="service-title">Título do Serviço</Label>
                      <Input
                        id="service-title"
                        placeholder="Ex: Influenciador IA Premium"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        data-testid="input-service-title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="service-category">Categoria</Label>
                      <Input
                        id="service-category"
                        placeholder="Ex: Influenciadores IA"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        data-testid="input-service-category"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="service-description">Descrição</Label>
                    <Textarea
                      id="service-description"
                      placeholder="Descreva o serviço em detalhes..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      data-testid="input-service-description"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="service-price">Preço</Label>
                      <Input
                        id="service-price"
                        placeholder="Ex: A partir de R$ 15.000"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        data-testid="input-service-price"
                      />
                    </div>
                    <div>
                      <Label htmlFor="service-image">URL da Imagem</Label>
                      <Input
                        id="service-image"
                        placeholder="https://..."
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        data-testid="input-service-image"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="service-features">Recursos (um por linha)</Label>
                    <Textarea
                      id="service-features"
                      placeholder="Avatar 3D hiper-realista&#10;Geração automática de conteúdo&#10;Integração com redes sociais"
                      value={features}
                      onChange={(e) => setFeatures(e.target.value)}
                      rows={4}
                      data-testid="input-service-features"
                    />
                  </div>
                  <div>
                    <Label htmlFor="service-deliverables">Entregas (uma por linha)</Label>
                    <Textarea
                      id="service-deliverables"
                      placeholder="Avatar 3D completo&#10;Plataforma de gerenciamento&#10;Documentação completa"
                      value={deliverables}
                      onChange={(e) => setDeliverables(e.target.value)}
                      rows={4}
                      data-testid="input-service-deliverables"
                    />
                  </div>
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handleSubmit}
                    disabled={!title || !description || !category || !price || createMutation.isPending || updateMutation.isPending}
                    data-testid="button-submit-service"
                  >
                    {(createMutation.isPending || updateMutation.isPending) ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        {editingService ? <Edit className="mr-2 h-5 w-5" /> : <Plus className="mr-2 h-5 w-5" />}
                        {editingService ? "Atualizar Serviço" : "Criar Serviço"}
                      </>
                    )}
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
