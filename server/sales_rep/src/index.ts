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
  const openQuotations = await prisma.quotation.count({ where: { status: { in: ['Draft', 'Confirmed', 'Approved'] } } });

  res.json({
    pendingApprovals,
    openQuotations,
    atRiskDeals: 3,
    recentActivity: [
      { text: 'Dashboard loaded live data from Prisma DB', time: 'Just now' }
    ]
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

// --- NEW MOCK ENDPOINTS FOR HACKATHON WORKFLOW ---

// Admin Configuration
app.get('/api/admin/config', (req, res) => {
  res.json({
    success: true,
    config: {
      maxDiscountCeiling: 20,
      requireManagerApprovalThreshold: 10,
      autoFulfillmentEnabled: true
    }
  });
});

app.post('/api/admin/config', (req, res) => {
  res.json({ success: true, message: 'Configuration updated successfully' });
});

// Customer Negotiation
app.post('/api/negotiation', (req, res) => {
  const { quotationId, requestedDiscount, customerNotes } = req.body;
  res.json({
    success: true,
    message: 'Negotiation terms submitted to Sales Rep',
    status: 'Pending Rep Review',
    newTerms: { requestedDiscount, customerNotes }
  });
});

// Customer Confirmation
app.post('/api/quotations/:id/confirm', (req, res) => {
  res.json({
    success: true,
    message: 'Quotation confirmed by customer!',
    status: 'Confirmed',
    quotationId: req.params.id
  });
});

// Order Creation
app.post('/api/orders', (req, res) => {
  res.json({
    success: true,
    message: 'Order created successfully and sent to fulfillment',
    orderId: 'ORD-' + Math.floor(Math.random() * 10000),
    status: 'Processing'
  });
});

// Payment Processing
app.post('/api/payment', (req, res) => {
  res.json({
    success: true,
    message: 'Payment processed successfully',
    transactionId: 'TXN-' + Math.floor(Math.random() * 1000000),
    status: 'Paid'
  });
});

// Deal Health + Reporting
app.get('/api/reports/deal-health', (req, res) => {
  res.json({
    success: true,
    overallHealth: 'Good',
    metrics: {
      dealsWon: 45,
      dealsLost: 12,
      averageMargin: '34%',
      atRiskRevenue: '$45,000'
    },
    flaggedDeals: [
      { id: 'Q-102', customer: 'Global Tech', reason: 'High discount anomaly' },
      { id: 'Q-105', customer: 'Stark Ind.', reason: 'Stalled in negotiation for 14 days' }
    ]
  });
});

app.listen(port, () => {
  console.log(`Sales Rep API Server running on port ${port}`);
});
