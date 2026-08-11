import { signToken } from './src/utils/jwt.js';

async function testApi() {
  const token = signToken({ userId: "test-user-id", role: "WAREHOUSE" } as any);
  const headers = { Authorization: `Bearer ${token}` };

  console.log("Fetching /api/stock/movements?limit=50...");
  try {
    const res1 = await fetch("http://localhost:5000/api/stock/movements?limit=50", { headers });
    const text1 = await res1.text();
    console.log("Stock Status:", res1.status);
    console.log("Stock Body:", text1.slice(0, 500));
  } catch (err) {
    console.error("Stock error:", err);
  }

  console.log("Fetching /api/products?limit=100...");
  try {
    const res2 = await fetch("http://localhost:5000/api/products?limit=100", { headers });
    const text2 = await res2.text();
    console.log("Products Status:", res2.status);
    console.log("Products Body:", text2.slice(0, 500));
  } catch (err) {
    console.error("Products error:", err);
  }
}

testApi();
