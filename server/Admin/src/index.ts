import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// 1. Dashboard
app.get('/api/v1/dashboard', async (req, res) => {
  try {
    const productsCount = await prisma.product.count({ where: { isActive: true } });
    const rulesCount = await prisma.discountRule.count();
    const plansCount = await prisma.subscriptionPlan.count({ where: { isActive: true } });
    const warehousesCount = await prisma.warehouse.count({ where: { isActive: true } });
    res.json({ productsCount, rulesCount, plansCount, warehousesCount });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 2. Products
app.get('/api/v1/products', async (req, res) => {
  try {
    const data = await prisma.product.findMany({ include: { category: true } });
    res.json(data);
  } catch (err) { res.status(500).json({ error: 'Failed to fetch products' }); }
});

// 3. Price Lists
app.get('/api/v1/pricing', async (req, res) => {
  try {
    const data = await prisma.priceList.findMany();
    res.json(data);
  } catch (err) { res.status(500).json({ error: 'Failed' }); }
});

// 4. Discount Tiers
app.get('/api/v1/discounts/rules', async (req, res) => {
  try {
    const data = await prisma.discountRule.findMany();
    res.json(data);
  } catch (err) { res.status(500).json({ error: 'Failed' }); }
});

app.post('/api/v1/discounts/simulate', async (req, res) => {
  try {
    const { customerTier, categoryId, requestedDiscount } = req.body;
    
    // Find applicable rule
    const rule = await prisma.discountRule.findFirst({
      where: {
        customerTier,
        OR: [{ categoryId }, { categoryId: null }]
      },
      orderBy: { categoryId: 'desc' }
    });

    if (!rule) {
      return res.json({ allowedDiscount: 0, exceededBy: requestedDiscount, riskLevel: 'High', requiredApprovals: ['MANAGER'] });
    }

    const allowedDiscount = rule.maxDiscount;
    const exceededBy = requestedDiscount > allowedDiscount ? requestedDiscount - allowedDiscount : 0;
    
    let riskLevel = 'Low';
    let requiredApprovals: string[] = [];
    
    if (exceededBy > 0) {
      const chains = await prisma.approvalChain.findMany({
        where: { isActive: true },
        orderBy: { level: 'asc' }
      });
      
      riskLevel = exceededBy > 5 ? 'High' : 'Medium';
      
      chains.forEach(chain => {
        if (requestedDiscount >= chain.threshold) {
          requiredApprovals.push(chain.role);
        }
      });
    }

    res.json({ allowedDiscount, exceededBy, riskLevel, requiredApprovals });
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

// 5. Approvals
app.get('/api/v1/approvals/chains', async (req, res) => {
  try {
    const data = await prisma.approvalChain.findMany();
    res.json(data);
  } catch (err) { res.status(500).json({ error: 'Failed' }); }
});

// 6. Warehouses
app.get('/api/v1/warehouses', async (req, res) => {
  try {
    const data = await prisma.warehouse.findMany();
    res.json(data);
  } catch (err) { res.status(500).json({ error: 'Failed' }); }
});

// 7. Subscriptions
app.get('/api/v1/subscriptions', async (req, res) => {
  try {
    const data = await prisma.subscriptionPlan.findMany();
    res.json(data);
  } catch (err) { res.status(500).json({ error: 'Failed' }); }
});

// 8. Upsell Rules
app.get('/api/v1/upsells', async (req, res) => {
  try {
    const data = await prisma.upsellRule.findMany();
    res.json(data);
  } catch (err) { res.status(500).json({ error: 'Failed' }); }
});

// 9. Audit Logs
app.get('/api/v1/audit', async (req, res) => {
  try {
    const data = await prisma.auditLog.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(data);
  } catch (err) { res.status(500).json({ error: 'Failed' }); }
});

// Generic POST and DELETE for all models (for hackathon demo CRUD)
const modelMap: Record<string, any> = {
  'products': prisma.product,
  'pricing': prisma.priceList,
  'discounts/rules': prisma.discountRule,
  'approvals/chains': prisma.approvalChain,
  'warehouses': prisma.warehouse,
  'subscriptions': prisma.subscriptionPlan,
  'upsells': prisma.upsellRule
};

Object.keys(modelMap).forEach(modelStr => {
  app.post(`/api/v1/${modelStr}`, async (req: any, res) => {
    try {
      const data = { ...req.body };
      for (const key in data) {
        if (typeof data[key] === 'string' && !isNaN(Number(data[key])) && data[key] !== '') {
          data[key] = Number(data[key]);
        }
      }
      const created = await modelMap[modelStr].create({ data });
      await prisma.auditLog.create({
        data: { user: 'Admin', action: 'CREATE', entity: modelStr, entityId: created.id, details: JSON.stringify(data) }
      });
      res.json(created);
    } catch (e) { res.status(400).json({ error: 'Bad Request' }); }
  });

  app.delete(`/api/v1/${modelStr}/:id`, async (req: any, res) => {
    try {
      await modelMap[modelStr].delete({ where: { id: req.params.id } });
      await prisma.auditLog.create({
        data: { user: 'Admin', action: 'DELETE', entity: modelStr, entityId: req.params.id, details: 'Deleted record' }
      });
      res.json({ success: true });
    } catch (e) { res.status(400).json({ error: 'Bad Request' }); }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
