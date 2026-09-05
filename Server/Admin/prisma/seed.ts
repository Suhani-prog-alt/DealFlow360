import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear
  await prisma.auditLog.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.discountRule.deleteMany();
  await prisma.warehouse.deleteMany();
  await prisma.approvalChain.deleteMany();
  await prisma.subscriptionPlan.deleteMany();

  // Create Categories
  const hw = await prisma.category.create({ data: { name: 'Hardware' } });
  const sv = await prisma.category.create({ data: { name: 'Services' } });
  const sub = await prisma.category.create({ data: { name: 'Subscriptions' } });

  // Create Products
  await prisma.product.create({ data: { name: 'Enterprise Laptop', type: 'HARDWARE', price: 1500, unit: 'pcs', tax: 0.1, categoryId: hw.id } });
  await prisma.product.create({ data: { name: 'Server Rack', type: 'HARDWARE', price: 5000, unit: 'pcs', tax: 0.1, categoryId: hw.id } });
  await prisma.product.create({ data: { name: 'Implementation Service', type: 'SERVICE', price: 2000, unit: 'hrs', tax: 0, categoryId: sv.id } });

  // Create Discount Rules
  await prisma.discountRule.create({ data: { customerTier: 'Bronze', maxDiscount: 5 } });
  await prisma.discountRule.create({ data: { customerTier: 'Silver', maxDiscount: 10 } });
  await prisma.discountRule.create({ data: { customerTier: 'Gold', maxDiscount: 15 } });
  await prisma.discountRule.create({ data: { customerTier: 'Gold', categoryId: sv.id, maxDiscount: 10 } }); // stricter on services

  // Create Warehouses
  await prisma.warehouse.create({ data: { name: 'Main Depot', location: 'New York', shippingWeight: 5000 } });
  await prisma.warehouse.create({ data: { name: 'West Coast Hub', location: 'Los Angeles', shippingWeight: 3000 } });

  // Create Approval Chains
  await prisma.approvalChain.create({ data: { name: 'Manager Review', level: 1, threshold: 10, role: 'MANAGER' } });
  await prisma.approvalChain.create({ data: { name: 'Finance Review', level: 2, threshold: 15, role: 'FINANCE' } });

  // Create Subscriptions
  await prisma.subscriptionPlan.create({ data: { name: 'Cloud Backup 1TB', frequency: 'MONTHLY', prorationRule: 'Daily', cancelRule: 'End of Cycle' } });
  await prisma.subscriptionPlan.create({ data: { name: 'Enterprise Support', frequency: 'YEARLY', prorationRule: 'Monthly', cancelRule: 'Immediate with fee' } });

  console.log('Seed data inserted');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
