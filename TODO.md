# 📝 TODO - Próximos Passos

## 🔴 CRÍTICO (Fazer PRIMEIRO)

### 1. Refatorar Forms com React Hook Form + Zod
**Por quê:** Atualmente os forms usam `any` e não validam dados antes de enviar para o backend, causando possíveis erros silenciosos.

**Arquivos a modificar:**
- [ ] `client/src/pages/Admin.tsx` - Form de criar/editar serviço
- [ ] `client/src/components/crm/LeadsManager.tsx` - Form de criar lead
- [ ] `client/src/components/crm/CustomersManager.tsx` - Form de criar cliente
- [ ] `client/src/components/crm/PipelineManager.tsx` - Form de criar deal

**Exemplo de implementação:**
```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertServiceSchema } from "@shared/schema";

const form = useForm({
  resolver: zodResolver(insertServiceSchema),
  defaultValues: {
    title: "",
    description: "",
    category: "",
    price: "",
    image: "",
    features: [],
    deliverables: [],
    isActive: true,
  }
});

const onSubmit = (data) => {
  createMutation.mutate(data); // Data já validado!
};
```

**Recursos:**
- Shadcn Form components: `npx shadcn-ui@latest add form`
- Docs: https://react-hook-form.com/get-started

---

### 2. Criar Helper de API Tipado
**Por quê:** Evitar código duplicado de `fetch` em cada componente e garantir type-safety.

**Arquivo a criar:** `client/src/lib/api.ts`

```typescript
import { z } from "zod";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T extends z.ZodType>(
  url: string,
  options?: RequestInit,
  schema?: T
): Promise<T extends z.ZodType ? z.infer<T> : any> {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(response.status, error.message || response.statusText);
  }

  const data = await response.json();

  if (schema) {
    return schema.parse(data);
  }

  return data;
}

// Helpers específicos
export const api = {
  get: <T extends z.ZodType>(url: string, schema?: T) =>
    apiRequest(url, { method: "GET" }, schema),

  post: <T extends z.ZodType>(url: string, body: any, schema?: T) =>
    apiRequest(url, { method: "POST", body: JSON.stringify(body) }, schema),

  put: <T extends z.ZodType>(url: string, body: any, schema?: T) =>
    apiRequest(url, { method: "PUT", body: JSON.stringify(body) }, schema),

  delete: <T extends z.ZodType>(url: string, schema?: T) =>
    apiRequest(url, { method: "DELETE" }, schema),
};
```

**Usar assim:**
```typescript
import { api } from "@/lib/api";
import { insertServiceSchema } from "@shared/schema";

// Antes:
const response = await fetch("/api/admin/services", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
  credentials: "include",
});
const service = await response.json();

// Depois:
const service = await api.post("/api/admin/services", data);
```

---

### 3. Substituir Fetch Manual por API Helper
**Por quê:** Código mais limpo, type-safe e manutenível.

**Arquivos a modificar:**
- [ ] Todas mutations em `Admin.tsx`
- [ ] Todas mutations em `LeadsManager.tsx`
- [ ] Todas mutations em `CustomersManager.tsx`
- [ ] Todas mutations em `PipelineManager.tsx`

---

## 🟡 ALTA PRIORIDADE

### 4. Dashboard de Analytics
**Objetivo:** Visualização de métricas de negócio.

**Criar:** `client/src/components/admin/AnalyticsDashboard.tsx`

**Métricas a exibir:**
- Total de vendas por mês (gráfico de linha)
- Taxa de conversão de leads (funil)
- Receita total e projetada
- Top 5 serviços mais vendidos
- Leads por origem (gráfico de pizza)

**Bibliotecas:**
- Recharts (já instalado): https://recharts.org/
- Usar Card do Shadcn para layout

**Backend necessário:**
- [ ] Criar rota `/api/admin/analytics` que retorna dados agregados
- [ ] Queries SQL para calcular métricas

**Exemplo de query:**
```typescript
// Em storage.ts
async getAnalytics() {
  const leadsByMonth = await db
    .select({
      month: sql`DATE_TRUNC('month', created_at)`,
      count: sql`COUNT(*)`,
    })
    .from(leads)
    .groupBy(sql`DATE_TRUNC('month', created_at)`);
    
  return { leadsByMonth, ... };
}
```

---

### 5. Sistema de Banners Dinâmicos
**Objetivo:** Admin pode editar o hero da homepage sem code.

**Steps:**

**A. Backend:**
- [ ] Adicionar tabela `hero_banners` em `shared/schema.ts`:
```typescript
export const heroBanners = pgTable("hero_banners", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  ctaText: text("cta_text").notNull(),
  ctaLink: text("cta_link").notNull(),
  backgroundImage: text("background_image").notNull(),
  isActive: boolean("is_active").notNull().default(false),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

- [ ] Adicionar métodos em `storage.ts`
- [ ] Adicionar rotas em `routes.ts`
- [ ] Rodar `npm run db:push`

**B. Admin UI:**
- [ ] Criar tab "Banners" no Admin
- [ ] CRUD de banners (usar react-hook-form!)
- [ ] Toggle "ativo" para ativar/desativar

**C. Frontend:**
- [ ] Modificar `Hero.tsx` para buscar banner ativo da API
- [ ] Usar React Query para cache
- [ ] Fallback para banner estático se API falhar

---

### 6. Biblioteca de Mídia com Upload
**Objetivo:** Upload de imagens para usar em serviços e banners.

**Opções de Storage:**

**Opção A: Replit Object Storage (Recomendado)**
- Integrado ao Replit
- Setup mais simples
- Docs: https://docs.replit.com/hosting/deployments/object-storage

**Opção B: Supabase Storage**
- Mais recursos (transformação de imagem, CDN)
- Requer conta Supabase
- Docs: https://supabase.com/docs/guides/storage

**Steps:**

- [ ] Decidir entre Opção A ou B
- [ ] Instalar SDK: `npm install @replit/object-storage` OU `@supabase/storage-js`
- [ ] Criar tabela `media_library` em schema:
```typescript
export const mediaLibrary = pgTable("media_library", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  filename: text("filename").notNull(),
  url: text("url").notNull(),
  mimeType: text("mime_type").notNull(),
  size: integer("size").notNull(), // bytes
  uploadedBy: varchar("uploaded_by").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

- [ ] Backend: rota `/api/admin/media/upload` com Multer
- [ ] Frontend: componente drag & drop (react-dropzone)
- [ ] Grid de imagens com preview
- [ ] Copiar URL ao clicar

**Exemplo de upload:**
```typescript
// Backend (routes.ts)
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/admin/media/upload", requireAuth, upload.single("file"), async (req, res) => {
  const file = req.file;
  
  // Upload to object storage
  const url = await uploadToStorage(file);
  
  // Save metadata to DB
  const media = await storage.createMedia({
    filename: file.originalname,
    url,
    mimeType: file.mimetype,
    size: file.size,
    uploadedBy: req.session.adminUserId,
  });
  
  res.json(media);
});
```

---

## 🟢 BAIXA PRIORIDADE (Quando tudo acima estiver pronto)

### 7. CMS Avançado - Páginas Editáveis
- Rich text editor (TipTap ou Lexical)
- Salvar conteúdo como JSON
- Renderizar dinamicamente

### 8. Blog/Artigos com SEO
- Tabela `blog_posts`
- Slug único
- Meta tags dinâmicas
- Sitemap automático

### 9. Sistema de Notificações
- Email (Resend ou SendGrid)
- In-app toast notifications
- WebSockets para real-time (opcional)

### 10. Multi-idioma (i18n)
- react-i18next
- Detectar idioma do browser
- Switcher no header

### 11. PWA
- Service Worker
- Manifest.json
- Ícones para mobile
- Offline fallback

---

## 🧪 Testing Checklist

Após cada feature:
- [ ] Funciona no frontend?
- [ ] API retorna dados corretos?
- [ ] Validação Zod funcionando?
- [ ] Loading states corretos?
- [ ] Tratamento de erro adequado?
- [ ] Mobile responsive?

---

## 📚 Recursos Úteis

**Componentes:**
- Shadcn/ui Gallery: https://ui.shadcn.com/examples
- Radix Primitives: https://www.radix-ui.com/primitives

**APIs:**
- React Query patterns: https://tkdodo.eu/blog/practical-react-query
- Zod examples: https://zod.dev/?id=table-of-contents

**Design:**
- Tailwind docs: https://tailwindcss.com/docs
- Lucide icons: https://lucide.dev/

---

**Última revisão:** 6 nov 2024  
**Próxima revisão:** Após completar itens 1-3
