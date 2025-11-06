import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Loader2, 
  Mail,
  Phone,
  Building2,
  DollarSign,
  Star,
  User
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  lifetimeValue?: number;
  satisfaction?: number;
  status: string;
  notes?: string;
  createdAt: string;
}

export function CustomersManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");

  const { data: customers = [], isLoading } = useQuery<Customer[]>({
    queryKey: ["/api/admin/customers"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/admin/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Erro ao criar cliente");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/customers"] });
      toast({ title: "Cliente criado com sucesso!" });
      resetForm();
    },
  });

  const handleSubmit = () => {
    createMutation.mutate({ 
      name, 
      email, 
      phone, 
      company, 
      notes, 
      status: "active",
      lifetimeValue: 0,
      satisfaction: 5 
    });
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setNotes("");
    setShowForm(false);
  };

  const totalValue = customers.reduce((sum, c) => sum + (c.lifetimeValue || 0), 0);
  const avgSatisfaction = customers.length > 0 
    ? customers.reduce((sum, c) => sum + (c.satisfaction || 0), 0) / customers.length 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Gestão de Clientes</h2>
          <p className="text-muted-foreground">Histórico e relacionamento</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Adicionar Novo Cliente</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="customer-name">Nome</Label>
              <Input
                id="customer-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome completo"
              />
            </div>
            <div>
              <Label htmlFor="customer-email">Email</Label>
              <Input
                id="customer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@exemplo.com"
              />
            </div>
            <div>
              <Label htmlFor="customer-phone">Telefone</Label>
              <Input
                id="customer-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(00) 00000-0000"
              />
            </div>
            <div>
              <Label htmlFor="customer-company">Empresa</Label>
              <Input
                id="customer-company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Nome da empresa"
              />
            </div>
          </div>
          <div className="mb-4">
            <Label htmlFor="customer-notes">Observações</Label>
            <Textarea
              id="customer-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Anotações sobre o cliente..."
              rows={3}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSubmit} disabled={!name || !email}>
              <User className="mr-2 h-4 w-4" />
              Criar Cliente
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Cancelar
            </Button>
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="text-3xl font-bold">{customers.length}</div>
          <div className="text-sm text-muted-foreground">Total de Clientes</div>
        </Card>
        <Card className="p-6">
          <div className="text-3xl font-bold text-green-500">
            {customers.filter(c => c.status === "active").length}
          </div>
          <div className="text-sm text-muted-foreground">Clientes Ativos</div>
        </Card>
        <Card className="p-6">
          <div className="text-3xl font-bold text-blue-500">
            R$ {(totalValue / 1000).toFixed(1)}k
          </div>
          <div className="text-sm text-muted-foreground">Lifetime Value Total</div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-1">
            <div className="text-3xl font-bold text-yellow-500">{avgSatisfaction.toFixed(1)}</div>
            <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
          </div>
          <div className="text-sm text-muted-foreground">Satisfação Média</div>
        </Card>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : customers.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">Nenhum cliente cadastrado ainda.</p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {customers.map((customer) => (
            <Card key={customer.id} className="p-6 hover-elevate transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg">{customer.name}</h3>
                  {customer.company && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Building2 className="h-3 w-3" />
                      {customer.company}
                    </div>
                  )}
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  customer.status === "active" ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500"
                }`}>
                  {customer.status === "active" ? "Ativo" : "Inativo"}
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{customer.email}</span>
                </div>
                {customer.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{customer.phone}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-1 text-sm">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span className="font-semibold">R$ {(customer.lifetimeValue || 0) / 1000}k</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3 w-3 ${
                        i < (customer.satisfaction || 0) 
                          ? "text-yellow-500 fill-yellow-500" 
                          : "text-gray-300"
                      }`} 
                    />
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
