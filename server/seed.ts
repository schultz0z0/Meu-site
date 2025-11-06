import { storage } from "./storage";
import bcrypt from "bcryptjs";

export async function seedAdmin() {
  try {
    const existingAdmin = await storage.getAdminUserByUsername("admin");
    
    if (existingAdmin) {
      console.log("✓ Admin user already exists");
    } else {
      const hashedPassword = await bcrypt.hash("admin", 10);
      
      await storage.createAdminUser({
        username: "admin",
        password: hashedPassword,
      });

      console.log("✓ Admin user created successfully (username: admin, password: admin)");
    }

    const existingStages = await storage.getAllPipelineStages();
    
    if (existingStages.length === 0) {
      const stages = [
        { name: "Prospecção", order: 1, color: "#3b82f6" },
        { name: "Qualificação", order: 2, color: "#8b5cf6" },
        { name: "Proposta", order: 3, color: "#f59e0b" },
        { name: "Negociação", order: 4, color: "#10b981" },
        { name: "Fechamento", order: 5, color: "#06b6d4" },
      ];

      for (const stage of stages) {
        await storage.createPipelineStage(stage);
      }
      
      console.log("✓ Pipeline stages created successfully");
    } else {
      console.log("✓ Pipeline stages already exist");
    }
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}
