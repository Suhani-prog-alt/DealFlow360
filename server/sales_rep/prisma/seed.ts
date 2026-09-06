import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Create dummy products
  const products = await Promise.all([
    prisma.product.create({ data: { name: 'Enterprise Server X1', category: 'Hardware', price: 5000, discountCeiling: 15, margin: 40 } }),
    prisma.product.create({ data: { name: 'Cloud Storage 10TB', category: 'Software', price: 1200, discountCeiling: 25, margin: 80, isSubscription: true } }),
    prisma.product.create({ data: { name: 'Security Suite Pro', category: 'Software', price: 800, discountCeiling: 20, margin: 75, isSubscription: true } }),
    prisma.product.create({ data: { name: 'Networking Switch V2', category: 'Hardware', price: 2500, discountCeiling: 10, margin: 30 } })
  ]);

  const customers = ['Acme Corp', 'Beta Ltd', 'Gamma Inc', 'Delta LLC', 'Epsilon Co'];
  const tiers = ['Bronze', 'Silver', 'Gold'];
  const statuses = ['Draft', 'Pending Approval', 'Approved', 'Under Negotiation', 'Accepted', 'Rejected'];

  for (let i = 0; i < 150; i++) {
    const cust = customers[Math.floor(Math.random() * customers.length)];
    const tier = tiers[Math.floor(Math.random() * tiers.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const p = products[Math.floor(Math.random() * products.length)];
    const qty = Math.floor(Math.random() * 10) + 1;
    const discount = Math.floor(Math.random() * 20);
    const amount = (p.price * qty) * (1 - (discount/100));
    
    await prisma.quotation.create({
      data: {
        customerName: cust,
        customerTier: tier,
        status: status,
        blendedRiskScore: Math.floor(Math.random() * 100),
        totalAmount: amount,
        items: {
          create: [{
            productId: p.id,
            quantity: qty,
            discountGiven: discount
          }]
        }
      }
    });
  }

  console.log('Successfully seeded 150 dummy quotations!');
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
