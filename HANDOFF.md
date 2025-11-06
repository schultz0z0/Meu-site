# 🚀 Handoff - Projeto AI Services Platform

## 📊 Status Atual do Projeto

### ✅ Implementado e Funcionando

**FASE 1: Fundação Sólida**
- ✅ Melhorias UX/UI
  - Hero com overlay escuro (bg-black/60) e text-shadow triplo para máxima legibilidade
  - Header adaptativo com transição suave (duration-500) e gradiente dinâmico
  - PageTransition com Framer Motion (fade in/out entre rotas)
  
- ✅ Sistema de Autenticação
  - Login com bcrypt + sessões express-session
  - Rota protegida `/admin` com middleware `requireAuth`
  - Hook `useAuth` para verificação de autenticação
  - Usuário padrão: `admin` / `admin`

- ✅ Página Sobre
  - Hero section completa
  - Timeline da empresa
  - Cards de valores e missão/visão
  - Estatísticas e call-to-action

**FASE 2: Admin & CRUD**
- ✅ Painel Admin conectado ao banco de dados
  - CRUD completo de serviços (Create, Read, Update, Delete)
  - Integração com React Query para cache e sincronização
  - Formulários de criação/edição com validação básica
  - Loading states e tratamento de erros

**FASE 3: CRM Completo**
- ✅ Gestão de Leads (`/admin` → tab CRM → Leads)
  - Funil visual com 6 estados: Novo → Contactado → Qualificado → Proposta → Ganho/Perdido
  - Criação, atualização e remoção de leads
  - Estatísticas: total, ganhos, em progresso, taxa de conversão
  
- ✅ Gestão de Clientes (`/admin` → tab CRM → Clientes)
  - Cadastro completo de clientes
  - Lifetime Value e Satisfação (rating 1-5)
  - Cards visuais com informações consolidadas
  
- ✅ Pipeline de Vendas (`/admin` → tab CRM → Pipeline)
  - Kanban drag & drop com HTML5 Drag API
  - 5 etapas pré-configuradas (Prospecção → Qualificação → Proposta → Negociação → Fechamento)
  - Métricas: valor total, valor ponderado, ticket médio, negócios ativos
  - Movimentação de deals entre etapas com persistência

### 🗄️ Banco de Dados

**Schema Completo (PostgreSQL via Replit/Neon):**
```
✅ users - Usuários do sistema
✅ admin_users - Administradores (seeded: admin/admin)
✅ services - Serviços oferecidos
✅ orders - Pedidos/contratos
✅ contacts - Formulário de contato
✅ leads - Leads do CRM
✅ customers - Clientes convertidos
✅ interactions - Histórico de interações
✅ pipeline_stages - Etapas do funil (seeded)
✅ deals - Negócios no pipeline
```

**Seed Automático:**
- Usuário admin criado automaticamente
- 5 etapas de pipeline criadas no primeiro boot

### 🎨 Stack Tecnológico

**Frontend:**
- React 18 + TypeScript
- Vite para build/dev
- Wouter para roteamento
- React Query (TanStack) para estado do servidor
- Framer Motion para animações
- Shadcn/ui + Radix UI para componentes
- Tailwind CSS para styling
- Lucide React para ícones

**Backend:**
- Node.js + Express
- TypeScript
- Drizzle ORM
- PostgreSQL (Neon)
- Bcrypt para hashing de senhas
- Express Session para autenticação

**Validação:**
- Zod schemas em `shared/schema.ts`

---

## ⚠️ PROBLEMAS CRÍTICOS IDENTIFICADOS

### 1. Falta Validação Zod nos Forms
**Problema:** Forms do Admin e CRM usam `any` e `fetch` manual, ignorando os schemas Zod.

**Localização:**
- `client/src/pages/Admin.tsx` (linhas 60-85)
- `client/src/components/crm/LeadsManager.tsx` (linhas 64-77)
- `client/src/components/crm/CustomersManager.tsx` (linhas 47-60)

**Impacto:** Dados inválidos podem ser enviados para o backend, causando erros silenciosos.

**Solução Necessária:**
```typescript
// ANTES (errado):
const data = { title, description, category, price };
createMutation.mutate(data);

// DEPOIS (correto):
import { insertServiceSchema } from "@shared/schema";

const result = insertServiceSchema.safeParse({
  title, description, category, price, // ...
});

if (!result.success) {
  toast({ title: "Dados inválidos", variant: "destructive" });
  return;
}

createMutation.mutate(result.data);
```

### 2. Forms sem React Hook Form
**Problema:** Usando `useState` individual para cada campo ao invés de `useForm`.

**Localização:** Mesmos arquivos acima.

**Impacto:** 
- Sem validação em tempo real
- Código verboso e repetitivo
- Difícil manter consistência

**Solução Necessária:**
```typescript
// ANTES (errado):
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");

// DEPOIS (correto):
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const form = useForm({
  resolver: zodResolver(insertServiceSchema),
  defaultValues: { title: "", description: "" }
});
```

### 3. Falta Helper de API Tipado
**Problema:** Cada componente faz `fetch` manual sem helpers centralizados.

**Solução Necessária:**
Criar `client/src/lib/api.ts`:
```typescript
import { z } from "zod";

export async function apiRequest<T extends z.ZodType>(
  url: string,
  schema: T,
  options?: RequestInit
): Promise<z.infer<T>> {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  
  const data = await response.json();
  return schema.parse(data);
}
```

---

## 📋 TAREFAS PENDENTES (Prioridade)

### 🔴 CRÍTICO - Implementar AGORA

1. **Refatorar Admin Forms com React Hook Form + Zod**
   - Arquivo: `client/src/pages/Admin.tsx`
   - Substituir useState por useForm
   - Adicionar validação com zodResolver
   - Usar schemas de `shared/schema.ts`
   - Tempo estimado: 2-3 horas

2. **Refatorar CRM Forms com React Hook Form + Zod**
   - Arquivos: `LeadsManager.tsx`, `CustomersManager.tsx`, `PipelineManager.tsx`
   - Mesma estratégia do item 1
   - Tempo estimado: 3-4 horas

3. **Criar Helper de API Tipado**
   - Arquivo: `client/src/lib/api.ts`
   - Substituir todas chamadas fetch manuais
   - Adicionar tratamento de erro centralizado
   - Tempo estimado: 2 horas

### 🟡 ALTA PRIORIDADE - Próximas Features

4. **Dashboard de Analytics**
   - Criar `client/src/components/admin/AnalyticsDashboard.tsx`
   - Gráficos com Recharts (já instalado)
   - Métricas: vendas por mês, conversão de leads, receita, top serviços
   - Tempo estimado: 4-6 horas

5. **Sistema de Banners Dinâmicos**
   - Tabela `hero_banners` no schema
   - CRUD no Admin
   - Hero component buscar banner ativo da API
   - Upload de imagens (item 6)
   - Tempo estimado: 3-4 horas

6. **Biblioteca de Mídia com Upload**
   - Integração com Replit Object Storage OU Supabase Storage
   - Tabela `media_library`
   - Interface drag & drop para upload
   - Gerenciador de arquivos visual
   - Tempo estimado: 5-7 horas

### 🟢 BAIXA PRIORIDADE - Melhorias

7. **CMS Avançado**
   - Páginas editáveis (FAQ, Termos, Política)
   - Editor rich text (TipTap ou similar)
   - Blog/artigos com SEO
   - Tempo estimado: 6-8 horas

8. **Sistema de Notificações**
   - Email notifications (Resend ou similar)
   - In-app notifications
   - Tempo estimado: 4-5 horas

9. **Multi-idioma (i18n)**
   - react-i18next
   - PT-BR + EN
   - Tempo estimado: 3-4 horas

10. **PWA**
    - Service Worker
    - Manifest.json
    - Offline support básico
    - Tempo estimado: 2-3 horas

---

## 🏗️ Arquitetura e Padrões

### Estrutura de Diretórios
```
client/src/
├── components/
│   ├── ui/           # Shadcn/ui components
│   ├── crm/          # CRM-specific components
│   ├── Header.tsx
│   ├── Hero.tsx
│   └── ...
├── pages/
│   ├── Admin.tsx     # Painel admin principal
│   ├── Home.tsx
│   └── ...
├── hooks/
│   ├── useAuth.ts
│   └── use-toast.ts
├── lib/
│   ├── queryClient.ts
│   └── utils.ts
└── App.tsx

server/
├── db.ts             # Conexão Drizzle
├── storage.ts        # Data access layer
├── routes.ts         # Express routes
├── seed.ts           # Database seeding
└── index.ts          # Server entry

shared/
└── schema.ts         # Drizzle schemas + Zod validation
```

### Convenções de Código

**1. Componentes:**
- PascalCase para nomes
- Export named functions
- Props tipadas com interface
- Usar Shadcn/ui sempre que possível

**2. Hooks:**
- Prefixo `use`
- Um hook = uma responsabilidade
- Retornar objeto ou array consistente

**3. API Routes:**
- `/api/public/*` - Rotas públicas
- `/api/admin/*` - Rotas protegidas (requireAuth)
- RESTful: GET, POST, PUT, DELETE

**4. Database:**
- Migrations via `npm run db:push`
- Nunca mutar schema.ts sem migration
- Usar Drizzle ORM, não SQL direto

**5. Validação:**
- Zod schemas em `shared/schema.ts`
- Validar no frontend E backend
- Schemas reutilizáveis (insert, update, select)

---

## 🔧 Comandos Úteis

```bash
# Development
npm run dev                 # Start dev server

# Database
npm run db:push            # Push schema changes to DB

# Build
npm run build              # Build for production
npm start                  # Run production build

# Check types
npm run check              # TypeScript check
```

---

## 🐛 Debugging

### Logs do Servidor
```bash
# Verificar logs do Express
# Logs aparecem no console do Replit
```

### Banco de Dados
1. Abrir Database tab no Replit
2. Conectar ao dev database
3. Rodar queries diretamente

### React Query DevTools
- Adicionar `<ReactQueryDevtools />` no App.tsx
- Ver cache, refetch, mutations em tempo real

---

## 🔐 Segurança

### Implementado
- ✅ Bcrypt para senhas
- ✅ HttpOnly cookies para sessões
- ✅ CORS configurado
- ✅ Middleware de autenticação

### Pendente
- ⚠️ Rate limiting (adicionar express-rate-limit)
- ⚠️ CSRF protection
- ⚠️ Input sanitization
- ⚠️ SQL injection protection (Drizzle ajuda, mas validar inputs)

---

## 📞 Onde Pedir Ajuda

**Documentação:**
- React Query: https://tanstack.com/query/latest
- Drizzle ORM: https://orm.drizzle.team/
- Shadcn/ui: https://ui.shadcn.com/
- Zod: https://zod.dev/

**Código de Referência:**
- `ServiceDetail.tsx` - Exemplo de página completa
- `useAuth.ts` - Padrão de custom hook
- `routes.ts` - Estrutura de API routes

---

## ✅ Checklist para Próximo Dev

Antes de começar:
- [ ] Ler este HANDOFF.md completamente
- [ ] Rodar `npm install`
- [ ] Rodar `npm run dev` e verificar que funciona
- [ ] Logar no admin (admin/admin)
- [ ] Testar CRUD de serviços
- [ ] Testar CRM (criar lead, mover no pipeline)
- [ ] Ler feedback do Architect (críticas sobre validação)

Primeiro dia:
- [ ] Implementar helper de API (`lib/api.ts`)
- [ ] Refatorar Admin form para usar react-hook-form
- [ ] Testar criação de serviço com validação

Segunda semana:
- [ ] Refatorar todos CRM forms
- [ ] Implementar Dashboard de Analytics
- [ ] Começar sistema de mídia/upload

---

**Última atualização:** 6 de novembro de 2024  
**Desenvolvedor anterior:** Replit AI Agent  
**Status:** Pronto para handoff com correções críticas pendentes
