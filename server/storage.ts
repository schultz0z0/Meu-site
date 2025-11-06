import { 
  type User, 
  type InsertUser,
  type AdminUser,
  type InsertAdminUser,
  type Service,
  type InsertService,
  type Order,
  type InsertOrder,
  type Contact,
  type InsertContact
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Admin User methods
  getAdminUser(id: string): Promise<AdminUser | undefined>;
  getAdminUserByUsername(username: string): Promise<AdminUser | undefined>;
  createAdminUser(adminUser: InsertAdminUser): Promise<AdminUser>;
  
  // Service methods
  getAllServices(): Promise<Service[]>;
  getActiveServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: string): Promise<boolean>;
  
  // Order methods
  getAllOrders(): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  getOrdersByStatus(status: string): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
  
  // Contact methods (CRM)
  getAllContacts(): Promise<Contact[]>;
  getContact(id: string): Promise<Contact | undefined>;
  getContactsByStatus(status: string): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContactStatus(id: string, status: string): Promise<Contact | undefined>;
}

import { db } from "./db";
import { users, adminUsers, services, orders, contacts } from "@shared/schema";
import { eq } from "drizzle-orm";

export class DBStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getAdminUser(id: string): Promise<AdminUser | undefined> {
    const result = await db.select().from(adminUsers).where(eq(adminUsers.id, id)).limit(1);
    return result[0];
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    const result = await db.select().from(adminUsers).where(eq(adminUsers.username, username)).limit(1);
    return result[0];
  }

  async createAdminUser(insertAdminUser: InsertAdminUser): Promise<AdminUser> {
    const result = await db.insert(adminUsers).values(insertAdminUser).returning();
    return result[0];
  }

  async getAllServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getActiveServices(): Promise<Service[]> {
    return await db.select().from(services).where(eq(services.isActive, true));
  }

  async getService(id: string): Promise<Service | undefined> {
    const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
    return result[0];
  }

  async createService(insertService: InsertService): Promise<Service> {
    const result = await db.insert(services).values(insertService).returning();
    return result[0];
  }

  async updateService(id: string, updateData: Partial<InsertService>): Promise<Service | undefined> {
    const result = await db.update(services)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(services.id, id))
      .returning();
    return result[0];
  }

  async deleteService(id: string): Promise<boolean> {
    const result = await db.delete(services).where(eq(services.id, id)).returning();
    return result.length > 0;
  }

  async getAllOrders(): Promise<Order[]> {
    return await db.select().from(orders);
  }

  async getOrder(id: string): Promise<Order | undefined> {
    const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
    return result[0];
  }

  async getOrdersByStatus(status: string): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.status, status));
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const result = await db.insert(orders).values(insertOrder).returning();
    return result[0];
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const result = await db.update(orders)
      .set({ status, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return result[0];
  }

  async getAllContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }

  async getContact(id: string): Promise<Contact | undefined> {
    const result = await db.select().from(contacts).where(eq(contacts.id, id)).limit(1);
    return result[0];
  }

  async getContactsByStatus(status: string): Promise<Contact[]> {
    return await db.select().from(contacts).where(eq(contacts.status, status));
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const result = await db.insert(contacts).values(insertContact).returning();
    return result[0];
  }

  async updateContactStatus(id: string, status: string): Promise<Contact | undefined> {
    const result = await db.update(contacts)
      .set({ status })
      .where(eq(contacts.id, id))
      .returning();
    return result[0];
  }
}

export const storage = new DBStorage();
