import { listMovements } from './src/services/stock.service.js';
import * as productService from './src/services/product.service.js';

async function test() {
  try {
    console.log("Testing listMovements...");
    const movements = await listMovements({ page: 1, limit: 50 });
    console.log("Movements success:", movements.data.length);
  } catch (err: any) {
    console.error("Error in listMovements:");
    console.error(err);
  }

  try {
    console.log("Testing listProducts...");
    const products = await productService.listProducts({ page: 1, limit: 100 });
    console.log("Products success:", products.data.length);
  } catch (err: any) {
    console.error("Error in listProducts:");
    console.error(err);
  }
}

test().catch(console.error).finally(() => process.exit(0));
