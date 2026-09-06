import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import smartLogicRouter from './ai/smart_logic';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// AI / Smart Logic features
app.use('/api/smart-logic', smartLogicRouter);

const JWT_SECRET = 'hackathon_secret_key_dealflow360';

// Simple hashing utility replacement for the demo since bcrypt takes time to compute
// Actually we will just mock the bcrypt compare for the demo to avoid real salt issues on quick tests
app.post('/api/login', (req, res) => {
  const { email, password, role } = req.body;
  
  setTimeout(async () => {
    const token = jwt.sign(
      { email, role, authenticatedAt: new Date().toISOString() }, 
      JWT_SECRET, 
      { expiresIn: '8h' }
    );
    
    return res.json({ success: true, message: 'Authentication successful', token });
  }, 800);
});

// Dashboard stats
app.get('/api/dashboard/stats', async (req, res) => {
  const pendingApprovals = await prisma.quotation.count({ where: { status: 'Pending Approval' } });
  const openQuotations = await prisma.quotation.count({ where: { status: { in: ['Draft', 'Confirmed', 'Approved', 'Under Negotiation'] } } });

  const actions = ['Quotation Created', 'Discount Approved', 'Order Shipped', 'Invoice Paid', 'Customer Negotiated', 'Product Added'];
  const recentActivity = Array.from({ length: 150 }, (_, i) => ({
    text: `${actions[Math.floor(Math.random() * actions.length)]} by ${['John Doe', 'Jane Smith', 'System', 'Finance Dept'][Math.floor(Math.random() * 4)]}`,
    time: new Date(Date.now() - Math.random() * 1000000000).toISOString().split('T')[0]
  }));

  res.json({
    pendingApprovals,
    openQuotations,
    atRiskDeals: 3,
    recentActivity
  });
});

// Submit a new quotation and calculate Blended Risk Score
app.post('/api/quotations', async (req, res) => {
  try {
    const { customerName, customerTier, items } = req.body;
    
    let riskScore = 0;
    let totalAmount = 0;
    
    for (const item of items) {
      const ceiling = item.product.maxDiscount || 10;
      if (item.discount > ceiling) {
        riskScore += (item.discount - ceiling);
      }
      totalAmount += (item.product.price * item.qty * (1 - item.discount / 100));
    }
    
    const status = riskScore > 0 ? 'Pending Approval' : 'Approved';
    
    // Save to actual database
    const newQuote = await prisma.quotation.create({
      data: {
        customerName: customerName || 'Unknown Customer',
        customerTier: customerTier || 'Standard',
        status,
        blendedRiskScore: riskScore,
        totalAmount,
        items: {
          create: items.map((item: any) => ({
            quantity: item.qty,
            discountGiven: item.discount,
            product: {
              connectOrCreate: {
                where: { id: item.product.id },
                create: {
                  id: item.product.id,
                  name: item.product.name,
                  category: item.product.category || 'General',
                  price: item.product.price || 0,
                  discountCeiling: item.product.maxDiscount || 10,
                  margin: 20
                }
              }
            }
          }))
        }
      }
    });
    
    res.json({
      success: true,
      message: status === 'Approved' ? 'Quotation auto-approved!' : 'Quotation requires manager approval.',
      riskScore,
      status,
      totalAmount,
      quotation: newQuote
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to process quotation' });
  }
});

// Fetch pending approvals for the rep
app.get('/api/approvals', async (req, res) => {
  try {
    const { status } = req.query;
    let whereClause: any = {};
    if (status === 'pending') whereClause = { status: 'Pending Approval' };
    else if (status === 'approved') whereClause = { status: 'Approved' };
    else if (status === 'rejected') whereClause = { status: 'Rejected' };
    else if (status === 'all') whereClause = {}; 
    else if (status) whereClause = { status: status };
    else whereClause = { status: { not: 'Draft' } };

    const approvals = await prisma.quotation.findMany({
      where: whereClause,
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({
      approvals: approvals.map(a => ({
        id: a.id,
        customer: a.customerName,
        riskScore: a.blendedRiskScore,
        status: a.status,
        totalAmount: a.totalAmount,
        createdAt: a.createdAt
      }))
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch approvals' });
  }
});

// Update Quotation Status
app.patch('/api/quotations/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await prisma.quotation.update({
      where: { id: req.params.id },
      data: { status }
    });
    res.json({ success: true, quotation: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to update status' });
  }
});

// Get all quotations (for customer)
app.get('/api/quotations', async (req, res) => {
  try {
    const quotations = await prisma.quotation.findMany({
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(quotations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quotations' });
  }
});

// Get single quotation by ID
app.get('/api/quotations/:id', async (req, res) => {
  try {
    const quotation = await prisma.quotation.findUnique({
      where: { id: req.params.id },
      include: { items: { include: { product: true } } }
    });
    if (!quotation) return res.status(404).json({ error: 'Not found' });
    res.json(quotation);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quotation' });
  }
});

// Fulfillment Split Logic
app.post('/api/fulfillment/split', (req, res) => {
  const { items } = req.body;
  
  // Basic mock split logic for the hackathon
  // Normally this would query warehouse stock levels
  const split = {
    'Main Warehouse': items.filter((_: any, i: number) => i % 2 === 0),
    'East Depot': items.filter((_: any, i: number) => i % 2 !== 0)
  };
  
  res.json({
    success: true,
    suggestedSplit: split,
    estimatedShipments: Object.keys(split).filter(k => (split as any)[k].length > 0).length
  });
});

// Subscriptions & Billing Schedule
app.get('/api/subscriptions/:customerId', (req, res) => {
  res.json({
    activePlans: [
      { product: 'DealFlow Pro License (Yearly)', nextBillingDate: '2027-01-01', amount: 1200 }
    ]
  });
});

// --- MOCK GENERATORS FOR HACKATHON WORKFLOW ---
const customersList = ['Acme Corp', 'Beta Ltd', 'Gamma Inc', 'Delta LLC', 'Epsilon Co', 'Stark Ind.', 'Wayne Ent.', 'Cyberdyne', 'Massive Dynamic', 'Initech'];

app.get('/api/orders', (req, res) => {
  const orders = Array.from({ length: 150 }, (_, i) => ({
    id: `ORD-${1000 + i}`,
    customer: customersList[i % customersList.length],
    amount: Math.floor(Math.random() * 50000) + 1000,
    status: ['Processing', 'Shipped', 'Delivered', 'Backordered'][Math.floor(Math.random() * 4)],
    date: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0]
  }));
  res.json({ success: true, orders });
});

app.get('/api/invoices', (req, res) => {
  const invoices = Array.from({ length: 150 }, (_, i) => ({
    id: `INV-${5000 + i}`,
    orderId: `ORD-${1000 + i}`,
    customer: customersList[i % customersList.length],
    amount: Math.floor(Math.random() * 50000) + 1000,
    status: ['Draft', 'Sent', 'Paid', 'Overdue'][Math.floor(Math.random() * 4)],
    dueDate: new Date(Date.now() + Math.random() * 5000000000).toISOString().split('T')[0]
  }));
  res.json({ success: true, invoices });
});

app.get('/api/subscriptions', (req, res) => {
  const subscriptions = Array.from({ length: 150 }, (_, i) => ({
    id: `SUB-${9000 + i}`,
    customer: customersList[i % customersList.length],
    plan: ['Basic Monthly', 'Pro Yearly', 'Enterprise', 'Support Tier 1'][Math.floor(Math.random() * 4)],
    status: ['Active', 'Active', 'Past Due', 'Cancelled'][Math.floor(Math.random() * 4)],
    mrr: Math.floor(Math.random() * 5000) + 100,
    nextBillingDate: new Date(Date.now() + Math.random() * 2000000000).toISOString().split('T')[0]
  }));
  res.json({ success: true, subscriptions });
});

app.get('/api/activities', (req, res) => {
  const actions = ['Quotation Created', 'Discount Approved', 'Order Shipped', 'Invoice Paid', 'Customer Negotiated', 'Product Added'];
  const activities = Array.from({ length: 150 }, (_, i) => ({
    id: `ACT-${i}`,
    user: ['John Doe', 'Jane Smith', 'System', 'Finance Dept'][Math.floor(Math.random() * 4)],
    action: actions[Math.floor(Math.random() * actions.length)],
    entity: `Entity-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date(Date.now() - Math.random() * 1000000000).toISOString()
  }));
  res.json({ success: true, activities });
});

app.listen(port, () => {
  console.log(`Sales Rep API Server running on port ${port}`);
});
