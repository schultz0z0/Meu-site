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
  Edit, 
  Trash2, 
  Loader2, 
  UserPlus,
  Mail,
  Phone,
  Building2,
  TrendingUp
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: string;
  status: string;
  score?: number;
  notes?: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-500",
  contacted: "bg-yellow-500",
  qualified: "bg-purple-500",
  proposal: "bg-orange-500",
  won: "bg-green-500",
  lost: "bg-red-500",
};

const statusLabels: Record<string, string> = {
  new: "Novo",
  contacted: "Contactado",
  qualified: "Qualificado",
  proposal: "Proposta",
  won: "Ganho",
  lost: "Perdido",
};

export function LeadsManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [source, setSource] = useState("website");
  const [notes, setNotes] = useState("");

  const { data: leads = [], isLoading } = useQuery<Lead[]>({
    queryKey: ["/api/admin/leads"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Erro ao criar lead");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/leads"] });
      toast({ title: "Lead criado com sucesso!" });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await fetch(`/api/admin/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Erro ao atualizar lead");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/leads"] });
      toast({ title: "Status atualizado!" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/leads/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Erro ao deletar lead");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/leads"] });
      toast({ title: "Lead deletado!" });
    },
  });

  const handleSubmit = () => {
    createMutation.mutate({ name, email, phone, company, source, notes, status: "new" });
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setSource("website");
    setNotes("");
    setShowForm(false);
  };

  const leadsByStatus = Object.keys(statusLabels).map(status => ({
    status,
    label: statusLabels[status],
    leads: leads.filter(lead => lead.status === status),
    color: statusColors[status],
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Gestão de Leads</h2>
          <p className="text-muted-foreground">Funil visual de qualificação</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Lead
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Adicionar Novo Lead</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="lead-name">Nome</Label>
              <Input
                id="lead-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome completo"
              />
            </div>
            <div>
              <Label htmlFor="lead-email">Email</Label>
              <Input
                id="lead-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@exemplo.com"
              />
            </div>
            <div>
              <Label htmlFor="lead-phone">Telefone</Label>
              <Input
                id="lead-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(00) 00000-0000"
              />
            </div>
            <div>
              <Label htmlFor="lead-company">Empresa</Label>
              <Input
                id="lead-company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Nome da empresa"
              />
            </div>
          </div>
          <div className="mb-4">
            <Label htmlFor="lead-notes">Observações</Label>
            <Textarea
              id="lead-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Anotações sobre o lead..."
              rows={3}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSubmit} disabled={!name || !email}>
              <UserPlus className="mr-2 h-4 w-4" />
              Criar Lead
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Cancelar
            </Button>
          </div>
        </Card>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {leadsByStatus.map(({ status, label, leads, color }) => (
            <Card key={status} className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-3 h-3 rounded-full ${color}`}></div>
                <h3 className="font-semibold text-sm">{label}</h3>
                <span className="ml-auto text-xs text-muted-foreground">
                  {leads.length}
                </span>
              </div>
              <div className="space-y-2">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-3 border border-border rounded-md hover-elevate text-sm"
                  >
                    <div className="font-semibold mb-1">{lead.name}</div>
                    {lead.company && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <Building2 className="h-3 w-3" />
                        {lead.company}
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Mail className="h-3 w-3" />
                      {lead.email}
                    </div>
                    {lead.phone && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <Phone className="h-3 w-3" />
                        {lead.phone}
                      </div>
                    )}
                    <div className="flex gap-1 mt-2">
                      <select
                        value={lead.status}
                        onChange={(e) => updateMutation.mutate({ id: lead.id, status: e.target.value })}
                        className="flex-1 text-xs p-1 border border-border rounded bg-background"
                      >
                        {Object.entries(statusLabels).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => deleteMutation.mutate(lead.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold">{leads.length}</div>
          <div className="text-sm text-muted-foreground">Total de Leads</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-green-500">
            {leads.filter(l => l.status === "won").length}
          </div>
          <div className="text-sm text-muted-foreground">Leads Ganhos</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-blue-500">
            {leads.filter(l => ["new", "contacted", "qualified", "proposal"].includes(l.status)).length}
          </div>
          <div className="text-sm text-muted-foreground">Em Progresso</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-purple-500">
            {leads.length > 0 ? Math.round((leads.filter(l => l.status === "won").length / leads.length) * 100) : 0}%
          </div>
          <div className="text-sm text-muted-foreground">Taxa de Conversão</div>
        </Card>
      </div>
    </div>
  );
}
