import "dotenv/config";
import { PrismaClient } from './generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

async function testConnection() {
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  console.log("Testing database connection...");
  try {
    const users = await prisma.user.findMany();
    console.log("✅ Database connection successful!");
    console.log(`Found ${users.length} users in the database:`);
    console.table(users.map(u => ({ Name: u.name, Email: u.email, Role: u.role })));
  } catch (error) {
    console.error("❌ Connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
