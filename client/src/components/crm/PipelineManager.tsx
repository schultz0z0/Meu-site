import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners } from "@dnd-kit/core";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, DollarSign, TrendingUp, Calendar, Target, Plus, GripVertical } from "lucide-react";

interface Deal {
  id: string;
  title: string;
  leadId?: string;
  customerId?: string;
  value: number;
  stageId: string;
  probability?: number;
  expectedCloseDate?: string;
  notes?: string;
  createdAt: string;
}

interface PipelineStage {
  id: string;
  name: string;
  order: number;
  color?: string;
}

export function PipelineManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [probability, setProbability] = useState("50");

  const { data: deals = [], isLoading: dealsLoading } = useQuery<Deal[]>({
    queryKey: ["/api/admin/deals"],
  });

  const { data: stages = [], isLoading: stagesLoading } = useQuery<PipelineStage[]>({
    queryKey: ["/api/admin/pipeline-stages"],
  });

  const updateDealMutation = useMutation({
    mutationFn: async ({ id, stageId }: { id: string; stageId: string }) => {
      const response = await fetch(`/api/admin/deals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stageId }),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Erro ao atualizar negócio");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/deals"] });
      toast({ title: "Negócio movido com sucesso!" });
    },
  });

  const createDealMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/admin/deals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Erro ao criar negócio");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/deals"] });
      toast({ title: "Negócio criado com sucesso!" });
      resetForm();
    },
  });

  const handleDragStart = (event: DragStartEvent) => {
    const deal = deals.find(d => d.id === event.active.id);
    if (deal) {
      setActiveDeal(deal);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveDeal(null);
      return;
    }

    const dealId = active.id as string;
    const newStageId = over.id as string;

    const deal = deals.find(d => d.id === dealId);
    if (deal && deal.stageId !== newStageId) {
      updateDealMutation.mutate({ id: dealId, stageId: newStageId });
    }

    setActiveDeal(null);
  };

  const handleSubmit = () => {
    if (!stages.length) return;
    createDealMutation.mutate({
      title,
      value: parseInt(value),
      probability: parseInt(probability),
      stageId: stages[0].id,
    });
  };

  const resetForm = () => {
    setTitle("");
    setValue("");
    setProbability("50");
    setShowForm(false);
  };

  const isLoading = dealsLoading || stagesLoading;

  const dealsByStage = stages.map(stage => ({
    ...stage,
    deals: deals.filter(deal => deal.stageId === stage.id),
    totalValue: deals
      .filter(deal => deal.stageId === stage.id)
      .reduce((sum, deal) => sum + deal.value, 0),
  }));

  const totalPipelineValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const avgDealValue = deals.length > 0 ? totalPipelineValue / deals.length : 0;
  const weightedValue = deals.reduce((sum, deal) => sum + (deal.value * (deal.probability || 50) / 100), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Pipeline de Vendas</h2>
          <p className="text-muted-foreground">Arraste e solte negócios entre as etapas</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Negócio
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Criar Novo Negócio</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="deal-title">Título</Label>
              <Input
                id="deal-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nome do negócio"
              />
            </div>
            <div>
              <Label htmlFor="deal-value">Valor (R$)</Label>
              <Input
                id="deal-value"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="15000"
              />
            </div>
            <div>
              <Label htmlFor="deal-probability">Probabilidade (%)</Label>
              <Input
                id="deal-probability"
                type="number"
                min="0"
                max="100"
                value={probability}
                onChange={(e) => setProbability(e.target.value)}
                placeholder="50"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSubmit} disabled={!title || !value}>
              Criar Negócio
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Cancelar
            </Button>
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-5 w-5 text-primary" />
            <div className="text-sm text-muted-foreground">Total em Pipeline</div>
          </div>
          <div className="text-3xl font-bold text-primary">
            R$ {(totalPipelineValue / 1000).toFixed(1)}k
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <div className="text-sm text-muted-foreground">Valor Ponderado</div>
          </div>
          <div className="text-3xl font-bold text-green-500">
            R$ {(weightedValue / 1000).toFixed(1)}k
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-5 w-5 text-blue-500" />
            <div className="text-sm text-muted-foreground">Ticket Médio</div>
          </div>
          <div className="text-3xl font-bold text-blue-500">
            R$ {(avgDealValue / 1000).toFixed(1)}k
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-5 w-5 text-purple-500" />
            <div className="text-sm text-muted-foreground">Negócios Ativos</div>
          </div>
          <div className="text-3xl font-bold text-purple-500">
            {deals.length}
          </div>
        </Card>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : stages.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            Configure as etapas do pipeline primeiro.
          </p>
        </Card>
      ) : (
        <DndContext
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {dealsByStage.map((stage) => (
              <DroppableColumn
                key={stage.id}
                id={stage.id}
                title={stage.name}
                count={stage.deals.length}
                totalValue={stage.totalValue}
              >
                {stage.deals.map((deal) => (
                  <DraggableDeal key={deal.id} deal={deal} />
                ))}
              </DroppableColumn>
            ))}
          </div>
          <DragOverlay>
            {activeDeal && <DealCard deal={activeDeal} isDragging />}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  );
}

function DroppableColumn({ id, title, count, totalValue, children }: any) {
  return (
    <div
      data-droppable-id={id}
      className="relative"
      onDragOver={(e) => {
        e.preventDefault();
        const target = e.currentTarget;
        target.classList.add("ring-2", "ring-primary", "ring-offset-2");
      }}
      onDragLeave={(e) => {
        const target = e.currentTarget as HTMLElement;
        target.classList.remove("ring-2", "ring-primary", "ring-offset-2");
      }}
      onDrop={(e) => {
        const target = e.currentTarget as HTMLElement;
        target.classList.remove("ring-2", "ring-primary", "ring-offset-2");
      }}
    >
      <Card className="p-4 min-h-[400px]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">{title}</h3>
          <span className="text-xs text-muted-foreground">{count}</span>
        </div>
        <div className="text-sm text-muted-foreground mb-4">
          R$ {(totalValue / 1000).toFixed(1)}k
        </div>
        <div className="space-y-2">
          {children}
        </div>
      </Card>
    </div>
  );
}

function DraggableDeal({ deal }: { deal: Deal }) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("dealId", deal.id);
        const target = e.currentTarget as HTMLElement;
        target.style.opacity = "0.5";
      }}
      onDragEnd={(e) => {
        const target = e.currentTarget as HTMLElement;
        target.style.opacity = "1";
        
        const dropTarget = document.elementsFromPoint(e.clientX, e.clientY)
          .find(el => el.hasAttribute("data-droppable-id"));
        
        if (dropTarget) {
          const newStageId = dropTarget.getAttribute("data-droppable-id");
          if (newStageId && newStageId !== deal.stageId) {
            window.dispatchEvent(new CustomEvent("deal-dropped", {
              detail: { dealId: deal.id, stageId: newStageId }
            }));
          }
        }
      }}
    >
      <DealCard deal={deal} />
    </div>
  );
}

function DealCard({ deal, isDragging = false }: { deal: Deal; isDragging?: boolean }) {
  return (
    <div
      className={`p-3 border border-border rounded-md hover-elevate bg-card cursor-grab active:cursor-grabbing ${
        isDragging ? "rotate-3 shadow-lg" : ""
      }`}
    >
      <div className="flex items-start gap-2 mb-2">
        <GripVertical className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
        <div className="font-semibold text-sm flex-1">{deal.title}</div>
      </div>
      <div className="flex items-center gap-1 text-xs text-green-600 font-semibold mb-1">
        <DollarSign className="h-3 w-3" />
        R$ {(deal.value / 1000).toFixed(1)}k
      </div>
      {deal.probability !== undefined && (
        <div className="text-xs text-muted-foreground">
          Prob: {deal.probability}%
        </div>
      )}
      {deal.expectedCloseDate && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
          <Calendar className="h-3 w-3" />
          {new Date(deal.expectedCloseDate).toLocaleDateString('pt-BR')}
        </div>
      )}
    </div>
  );
}
