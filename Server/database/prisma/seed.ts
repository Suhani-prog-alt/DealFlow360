import "dotenv/config";
import { PrismaClient } from '../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { faker } from '@faker-js/faker';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function clearDatabase() {
  console.log("Clearing database...");
  const tableNames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = tableNames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"public"."${name}"`)
    .join(', ');

  try {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
    console.log("Database cleared.");
  } catch (error) {
    console.log({ error });
  }
}

async function main() {
  await clearDatabase();
  console.log('Seeding 20 rows per table...');

  // 1. Users
  const userRoles = ["SALES_REP", "MANAGER", "FINANCE", "OPERATIONS", "ADMIN"];
  const usersData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email() + i,
    passwordHash: 'hashed_password',
    role: faker.helpers.arrayElement(userRoles) as any,
  }));
  await prisma.user.createMany({ data: usersData });

  // 2. Customers
  const customerTiers = ["STANDARD", "SILVER", "GOLD", "PLATINUM"];
  const customersData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    companyName: faker.company.name(),
    contactName: faker.person.fullName(),
    email: faker.internet.email() + i,
    phone: faker.phone.number(),
    tier: faker.helpers.arrayElement(customerTiers) as any,
    address: faker.location.streetAddress(),
  }));
  await prisma.customer.createMany({ data: customersData });

  // 3. Products
  const productsData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName() + i,
    sku: faker.string.alphanumeric(10) + i,
    category: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    unitPrice: faker.number.float({ min: 10, max: 1000, fractionDigits: 2 }),
    isActive: true,
  }));
  await prisma.product.createMany({ data: productsData });

  // 4. Warehouses
  const warehousesData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    name: `Warehouse ${i}`,
    location: faker.location.city(),
  }));
  await prisma.warehouse.createMany({ data: warehousesData });

  // 5. SubscriptionPlans
  const intervals = ["MONTHLY", "QUARTERLY", "YEARLY"];
  const subPlansData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    name: `Plan ${i}`,
    description: faker.lorem.sentence(),
    price: faker.number.float({ min: 50, max: 500, fractionDigits: 2 }),
    billingInterval: faker.helpers.arrayElement(intervals) as any,
    isActive: true,
  }));
  await prisma.subscriptionPlan.createMany({ data: subPlansData });

  // 6. DiscountTiers
  const discountTiersData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    name: `Tier ${i}`,
    customerTier: faker.helpers.arrayElement(customerTiers) as any,
    minDiscount: faker.number.float({ min: 0, max: 10, fractionDigits: 2 }),
    maxDiscount: faker.number.float({ min: 11, max: 30, fractionDigits: 2 }),
    approvalLevel: faker.number.int({ min: 1, max: 3 }),
  }));
  await prisma.discountTier.createMany({ data: discountTiersData });

  // 7. ApprovalRules
  const approvalRulesData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    name: `Rule ${i}`,
    minDiscount: faker.number.float({ min: 0, max: 10, fractionDigits: 2 }),
    maxDiscount: faker.number.float({ min: 11, max: 30, fractionDigits: 2 }),
    requiredRole: faker.helpers.arrayElement(userRoles) as any,
    priority: i + 1,
    isActive: true,
  }));
  await prisma.approvalRule.createMany({ data: approvalRulesData });

  // 8. PriceLists
  const priceListsData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    name: `PriceList ${i}`,
    description: faker.lorem.sentence(),
    isActive: true,
  }));
  await prisma.priceList.createMany({ data: priceListsData });

  // DEPENDENCIES LEVEL 2
  // 9. Inventory (20 rows)
  const inventoryData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    productId: productsData[i].id,
    warehouseId: warehousesData[i].id,
    quantity: faker.number.int({ min: 100, max: 1000 }),
    reservedQuantity: faker.number.int({ min: 0, max: 50 }),
    reorderLevel: faker.number.int({ min: 10, max: 20 }),
  }));
  await prisma.inventory.createMany({ data: inventoryData });

  // 10. PriceListItems
  const priceListItemsData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    priceListId: priceListsData[i].id,
    productId: productsData[i].id,
    price: faker.number.float({ min: 10, max: 1000, fractionDigits: 2 }),
  }));
  await prisma.priceListItem.createMany({ data: priceListItemsData });

  // 11. Quotations
  const quotationStatuses = ["DRAFT", "PENDING_APPROVAL", "APPROVED", "REJECTED", "SENT", "NEGOTIATION", "ACCEPTED", "EXPIRED"];
  const quotationsData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    quoteNumber: `QT-${i}-${Date.now()}`,
    customerId: customersData[i].id,
    createdById: usersData[i].id,
    status: faker.helpers.arrayElement(quotationStatuses) as any,
    subtotal: 1000,
    discountAmount: 100,
    totalAmount: 900,
  }));
  await prisma.quotation.createMany({ data: quotationsData });

  // 12. Deals
  const dealStatuses = ["DRAFT", "QUOTED", "NEGOTIATING", "CLOSED_WON", "CLOSED_LOST"];
  const dealsData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    customerId: customersData[i].id,
    salesRepId: usersData[i].id,
    status: faker.helpers.arrayElement(dealStatuses) as any,
    totalAmount: faker.number.float({ min: 1000, max: 10000, fractionDigits: 2 }),
  }));
  await prisma.deal.createMany({ data: dealsData });

  // 13. Subscriptions
  const subscriptionStatuses = ["ACTIVE", "PAUSED", "CANCELLED", "EXPIRED"];
  const subscriptionsData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    subscriptionNumber: `SUB-${i}-${Date.now()}`,
    customerId: customersData[i].id,
    planId: subPlansData[i].id,
    status: faker.helpers.arrayElement(subscriptionStatuses) as any,
    startDate: new Date(),
    nextBillingDate: new Date(),
  }));
  await prisma.subscription.createMany({ data: subscriptionsData });


  // DEPENDENCIES LEVEL 3
  // 14. QuotationItems
  const quotationItemsData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    quotationId: quotationsData[i].id,
    productId: productsData[i].id,
    quantity: 5,
    unitPrice: 200,
    requestedDiscountPercent: 10,
    approvedDiscountPercent: 10,
    finalPrice: 180,
  }));
  await prisma.quotationItem.createMany({ data: quotationItemsData });

  // 15. Approvals
  const approvalStatuses = ["PENDING", "APPROVED", "REJECTED"];
  const approvalsData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    quotationId: quotationsData[i].id,
    approvalRuleId: approvalRulesData[i].id,
    approverId: usersData[i].id,
    status: faker.helpers.arrayElement(approvalStatuses) as any,
  }));
  await prisma.approval.createMany({ data: approvalsData });

  // 16. Negotiations
  const negotiationStatuses = ["OPEN", "COUNTER_OFFER", "ACCEPTED", "REJECTED", "CANCELLED"];
  const negotiationsData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    quotationId: quotationsData[i].id,
    customerId: customersData[i].id,
    productId: productsData[i].id,
    status: faker.helpers.arrayElement(negotiationStatuses) as any,
    requestedDiscountPercent: 15,
  }));
  await prisma.negotiation.createMany({ data: negotiationsData });

  // 17. Orders
  const orderStatuses = ["DRAFT", "CONFIRMED", "PROCESSING", "PARTIALLY_FULFILLED", "FULFILLED", "CANCELLED"];
  const ordersData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    orderNumber: `ORD-${i}-${Date.now()}`,
    quotationId: quotationsData[i].id,
    customerId: customersData[i].id,
    status: faker.helpers.arrayElement(orderStatuses) as any,
    subtotal: 900,
    discountAmount: 0,
    totalAmount: 900,
  }));
  await prisma.order.createMany({ data: ordersData });

  // 18. Billings
  const billingsData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    dealId: dealsData[i].id,
    subtotal: 5000,
    taxAmount: 500,
    discountAmount: 0,
    totalAmount: 5500,
  }));
  await prisma.billing.createMany({ data: billingsData });

  // 19. DiscountApprovals
  const discountAppStatuses = ["PENDING", "APPROVED", "REJECTED"];
  const discountApprovalsData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    dealId: dealsData[i].id,
    requestedBy: usersData[i].id,
    approvedBy: usersData[i].id,
    status: faker.helpers.arrayElement(discountAppStatuses) as any,
    discountPct: 12,
  }));
  await prisma.discountApproval.createMany({ data: discountApprovalsData });

  // 20. BillingSchedules
  const billingSchedulesData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    subscriptionId: subscriptionsData[i].id,
    billingDate: new Date(),
    amount: 100,
  }));
  await prisma.billingSchedule.createMany({ data: billingSchedulesData });


  // DEPENDENCIES LEVEL 4
  // 21. ApprovalHistory
  const approvalHistoriesData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    approvalId: approvalsData[i].id,
    action: faker.helpers.arrayElement(approvalStatuses) as any,
    performedBy: usersData[i].id,
  }));
  await prisma.approvalHistory.createMany({ data: approvalHistoriesData });

  // 22. OrderItems
  const orderItemsData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    orderId: ordersData[i].id,
    productId: productsData[i].id,
    quantity: 2,
    unitPrice: 450,
    discountPercent: 0,
    finalPrice: 900,
  }));
  await prisma.orderItem.createMany({ data: orderItemsData });

  // 23. Invoices
  const invoiceStatuses = ["DRAFT", "ISSUED", "PAID", "PARTIALLY_PAID", "OVERDUE", "CANCELLED"];
  const invoicesData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    invoiceNumber: `INV-${i}-${Date.now()}`,
    billingId: billingsData[i].id,
    customerId: customersData[i].id,
    subscriptionId: subscriptionsData[i].id,
    orderId: ordersData[i].id,
    status: faker.helpers.arrayElement(invoiceStatuses) as any,
    subtotal: 5500,
    taxAmount: 0,
    discountAmount: 0,
    totalAmount: 5500,
  }));
  await prisma.invoice.createMany({ data: invoicesData });

  // DEPENDENCIES LEVEL 5
  // 24. InvoiceItems
  const invoiceItemsData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    invoiceId: invoicesData[i].id,
    productId: productsData[i].id,
    quantity: 1,
    unitPrice: 5500,
    totalPrice: 5500,
  }));
  await prisma.invoiceItem.createMany({ data: invoiceItemsData });

  // 25. Payments
  const paymentStatuses = ["PENDING", "SUCCESS", "FAILED", "REFUNDED"];
  const paymentsData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    invoiceId: invoicesData[i].id,
    amount: 5500,
    status: faker.helpers.arrayElement(paymentStatuses) as any,
  }));
  await prisma.payment.createMany({ data: paymentsData });

  // 26. Fulfillments
  const fulfillmentStatuses = ["PENDING", "PACKED", "SHIPPED", "DELIVERED", "CANCELLED"];
  const fulfillmentsData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    fulfillmentNumber: `FUL-${i}-${Date.now()}`,
    orderId: ordersData[i].id,
    warehouseId: warehousesData[i].id,
    status: faker.helpers.arrayElement(fulfillmentStatuses) as any,
  }));
  await prisma.fulfillment.createMany({ data: fulfillmentsData });

  // 27. Backorders
  const backorderStatuses = ["OPEN", "FULFILLED", "CANCELLED"];
  const backordersData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    orderId: ordersData[i].id,
    orderItemId: orderItemsData[i].id,
    quantity: 1,
    status: faker.helpers.arrayElement(backorderStatuses) as any,
  }));
  await prisma.backorder.createMany({ data: backordersData });

  // DEPENDENCIES LEVEL 6
  // 28. FulfillmentItems
  const fulfillmentItemsData = Array.from({ length: 20 }).map((_, i) => ({
    id: faker.string.uuid(),
    fulfillmentId: fulfillmentsData[i].id,
    orderItemId: orderItemsData[i].id,
    quantity: 2,
  }));
  await prisma.fulfillmentItem.createMany({ data: fulfillmentItemsData });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
