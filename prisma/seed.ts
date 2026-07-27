import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";


const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const plans = [
  {
    name: "FREE",
    price: 0,
    credits: 50,
    duration: 30,
  },
  {
    name: "STARTER",
    price: 1000,
    credits: 500,
    duration: 30,
  },
  {
    name: "PRO",
    price: 2500,
    credits: 2000,
    duration: 30,
  },
];

async function main() {
  for (const plan of plans) {
    await prisma.plan.upsert({
      where: {
        name: plan.name,
      },
      update: plan,
      create: plan,
    });
  }

  console.log("✅ Plans seeded successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
