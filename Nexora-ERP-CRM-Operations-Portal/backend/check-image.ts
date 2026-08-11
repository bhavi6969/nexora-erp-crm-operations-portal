import prisma from './src/config/db.js';

async function check() {
  const p = await prisma.product.findMany({ where: { imageUrl: { not: null } } });
  console.log("Products with imageUrl:", p.length);
  process.exit(0);
}
check();
