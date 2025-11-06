import { storage } from "./storage";
import bcrypt from "bcryptjs";

export async function seedAdmin() {
  try {
    const existingAdmin = await storage.getAdminUserByUsername("admin");
    
    if (existingAdmin) {
      console.log("✓ Admin user already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin", 10);
    
    await storage.createAdminUser({
      username: "admin",
      password: hashedPassword,
    });

    console.log("✓ Admin user created successfully (username: admin, password: admin)");
  } catch (error) {
    console.error("Error seeding admin:", error);
  }
}
