import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data (optional, be careful in production!)
  await prisma.approvalLog.deleteMany();
  await prisma.approvalRequest.deleteMany();
  await prisma.quotationItem.deleteMany();
  await prisma.quotation.deleteMany();
  await prisma.discountRule.deleteMany();
  await prisma.product.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const salesRep = await prisma.user.create({
    data: { name: 'Rahul (Sales Rep)', email: 'rahul@dealflow.com', role: 'Sales Rep' }
  });
  const manager = await prisma.user.create({
    data: { name: 'Palak (Manager)', email: 'palak@dealflow.com', role: 'Sales Manager' }
  });

  // Create Customers
  const goldCustomer = await prisma.customer.create({
    data: { name: 'ABC Industries', tier: 'Gold', industry: 'Tech' }
  });
  const silverCustomer = await prisma.customer.create({
    data: { name: 'Beta Industries', tier: 'Silver', industry: 'Manufacturing' }
  });

  // Create Products
  const hwProduct = await prisma.product.create({
    data: { name: 'Enterprise Server Rack', category: 'Hardware', price: 20000 }
  });
  const swProduct = await prisma.product.create({
    data: { name: 'Cloud Subscription (Annual)', category: 'Software', price: 10000 }
  });
  const svcProduct = await prisma.product.create({
    data: { name: 'Implementation Service', category: 'Services', price: 5000 }
  });

  // Create Discount Rules
  await prisma.discountRule.createMany({
    data: [
      { customerTier: 'Gold', productCategory: 'Hardware', maxDiscount: 15 },
      { customerTier: 'Gold', productCategory: 'Software', maxDiscount: 20 },
      { customerTier: 'Gold', productCategory: 'Services', maxDiscount: 10 },
      
      { customerTier: 'Silver', productCategory: 'Hardware', maxDiscount: 10 },
      { customerTier: 'Silver', productCategory: 'Software', maxDiscount: 15 },
      { customerTier: 'Silver', productCategory: 'Services', maxDiscount: 5 },
    ]
  });

  // Create a High-Risk Pending Quotation
  const qt1 = await prisma.quotation.create({
    data: {
      quotationId: 'QT-1024',
      status: 'Pending Approval',
      subtotal: 25000,
      discountAmt: 4500, // 18% overall
      finalAmount: 20500,
      blendedRisk: 78,
      customerId: goldCustomer.id,
      salesRepId: salesRep.id,
      items: {
        create: [
          { productId: hwProduct.id, quantity: 1, unitPrice: 20000, requestedDiscount: 18, subtotal: 16400 }, // Over 15% limit
          { productId: svcProduct.id, quantity: 1, unitPrice: 5000, requestedDiscount: 18, subtotal: 4100 }   // Over 10% limit
        ]
      }
    }
  });

  await prisma.approvalRequest.create({
    data: {
      approvalLevel: 'Manager',
      status: 'Pending',
      riskScore: 78,
      reason: 'Requested discount exceeds maximum limit for Services category (18% > 10%).',
      quotationId: qt1.id,
      requestedById: salesRep.id,
      assignedToId: manager.id
    }
  });

  // Create an Approved Quotation
  const qt2 = await prisma.quotation.create({
    data: {
      quotationId: 'QT-1025',
      status: 'Approved',
      subtotal: 10000,
      discountAmt: 1000, 
      finalAmount: 9000,
      blendedRisk: 15,
      customerId: silverCustomer.id,
      salesRepId: salesRep.id,
      items: {
        create: [
          { productId: swProduct.id, quantity: 1, unitPrice: 10000, requestedDiscount: 10, subtotal: 9000 }
        ]
      }
    }
  });

  await prisma.approvalLog.create({
    data: {
      action: 'Approved',
      reason: 'Looks good.',
      previousStatus: 'Pending Approval',
      newStatus: 'Approved',
      quotationId: qt2.id,
      userId: manager.id
    }
  });

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
