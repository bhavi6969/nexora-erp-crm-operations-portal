import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const u = await prisma.user.findFirst();
  console.log('USER:', u);
}
main().finally(()=>prisma.$disconnect());
