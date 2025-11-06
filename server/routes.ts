import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcryptjs";

// Auth Middleware
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.adminUserId) {
    return res.status(401).json({ message: "Não autorizado" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Auth Routes
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Usuário e senha são obrigatórios" });
      }

      const admin = await storage.getAdminUserByUsername(username);
      
      if (!admin) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const validPassword = await bcrypt.compare(password, admin.password);
      
      if (!validPassword) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      req.session.adminUserId = admin.id;
      
      return res.json({ 
        message: "Login realizado com sucesso",
        user: {
          id: admin.id,
          username: admin.username
        }
      });
    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).json({ message: "Erro no servidor" });
    }
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Erro ao fazer logout" });
      }
      res.json({ message: "Logout realizado com sucesso" });
    });
  });

  app.get("/api/auth/me", async (req: Request, res: Response) => {
    if (!req.session.adminUserId) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    try {
      const admin = await storage.getAdminUser(req.session.adminUserId);
      
      if (!admin) {
        req.session.destroy(() => {});
        return res.status(401).json({ message: "Usuário não encontrado" });
      }

      return res.json({
        id: admin.id,
        username: admin.username
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro no servidor" });
    }
  });

  // Services Routes (Protected)
  app.get("/api/services", async (_req: Request, res: Response) => {
    try {
      const services = await storage.getActiveServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar serviços" });
    }
  });

  app.get("/api/services/:id", async (req: Request, res: Response) => {
    try {
      const service = await storage.getService(req.params.id);
      if (!service) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar serviço" });
    }
  });

  // Admin Routes (Protected)
  app.get("/api/admin/services", requireAuth, async (_req: Request, res: Response) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar serviços" });
    }
  });

  app.post("/api/admin/services", requireAuth, async (req: Request, res: Response) => {
    try {
      const service = await storage.createService(req.body);
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar serviço" });
    }
  });

  app.put("/api/admin/services/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const service = await storage.updateService(req.params.id, req.body);
      if (!service) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar serviço" });
    }
  });

  app.delete("/api/admin/services/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const deleted = await storage.deleteService(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }
      res.json({ message: "Serviço deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar serviço" });
    }
  });

  // Orders Routes (Protected)
  app.get("/api/admin/orders", requireAuth, async (_req: Request, res: Response) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar pedidos" });
    }
  });

  app.post("/api/orders", async (req: Request, res: Response) => {
    try {
      const order = await storage.createOrder(req.body);
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar pedido" });
    }
  });

  // Contacts Routes (Protected)
  app.get("/api/admin/contacts", requireAuth, async (_req: Request, res: Response) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar contatos" });
    }
  });

  app.post("/api/contacts", async (req: Request, res: Response) => {
    try {
      const contact = await storage.createContact(req.body);
      res.json(contact);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar contato" });
    }
  });

  // CRM - Leads Routes (Protected)
  app.get("/api/admin/leads", requireAuth, async (_req: Request, res: Response) => {
    try {
      const leads = await storage.getAllLeads();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar leads" });
    }
  });

  app.post("/api/admin/leads", requireAuth, async (req: Request, res: Response) => {
    try {
      const lead = await storage.createLead(req.body);
      res.json(lead);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar lead" });
    }
  });

  app.put("/api/admin/leads/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const lead = await storage.updateLead(req.params.id, req.body);
      if (!lead) {
        return res.status(404).json({ message: "Lead não encontrado" });
      }
      res.json(lead);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar lead" });
    }
  });

  app.delete("/api/admin/leads/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const deleted = await storage.deleteLead(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Lead não encontrado" });
      }
      res.json({ message: "Lead deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar lead" });
    }
  });

  // CRM - Customers Routes (Protected)
  app.get("/api/admin/customers", requireAuth, async (_req: Request, res: Response) => {
    try {
      const customers = await storage.getAllCustomers();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar clientes" });
    }
  });

  app.post("/api/admin/customers", requireAuth, async (req: Request, res: Response) => {
    try {
      const customer = await storage.createCustomer(req.body);
      res.json(customer);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar cliente" });
    }
  });

  app.put("/api/admin/customers/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const customer = await storage.updateCustomer(req.params.id, req.body);
      if (!customer) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
      res.json(customer);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar cliente" });
    }
  });

  // CRM - Interactions Routes (Protected)
  app.get("/api/admin/interactions", requireAuth, async (_req: Request, res: Response) => {
    try {
      const interactions = await storage.getAllInteractions();
      res.json(interactions);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar interações" });
    }
  });

  app.post("/api/admin/interactions", requireAuth, async (req: Request, res: Response) => {
    try {
      const interaction = await storage.createInteraction(req.body);
      res.json(interaction);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar interação" });
    }
  });

  // CRM - Pipeline Stages Routes (Protected)
  app.get("/api/admin/pipeline-stages", requireAuth, async (_req: Request, res: Response) => {
    try {
      const stages = await storage.getAllPipelineStages();
      res.json(stages);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar etapas do pipeline" });
    }
  });

  app.post("/api/admin/pipeline-stages", requireAuth, async (req: Request, res: Response) => {
    try {
      const stage = await storage.createPipelineStage(req.body);
      res.json(stage);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar etapa do pipeline" });
    }
  });

  // CRM - Deals Routes (Protected)
  app.get("/api/admin/deals", requireAuth, async (_req: Request, res: Response) => {
    try {
      const deals = await storage.getAllDeals();
      res.json(deals);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar negócios" });
    }
  });

  app.post("/api/admin/deals", requireAuth, async (req: Request, res: Response) => {
    try {
      const deal = await storage.createDeal(req.body);
      res.json(deal);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar negócio" });
    }
  });

  app.put("/api/admin/deals/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const deal = await storage.updateDeal(req.params.id, req.body);
      if (!deal) {
        return res.status(404).json({ message: "Negócio não encontrado" });
      }
      res.json(deal);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar negócio" });
    }
  });

  app.delete("/api/admin/deals/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const deleted = await storage.deleteDeal(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Negócio não encontrado" });
      }
      res.json({ message: "Negócio deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar negócio" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
