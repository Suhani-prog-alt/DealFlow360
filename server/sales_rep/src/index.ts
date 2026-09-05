import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = process.env.PORT || 3001;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Dashboard stats
app.get('/api/dashboard/stats', (req, res) => {
  res.json({
    pendingApprovals: 4,
    openQuotations: 12,
    atRiskDeals: 3,
    recentActivity: [
      { text: 'Acme Corp quotation approved by finance', time: '09:42' },
      { text: 'Beta Industries requested a discount change', time: '09:10' }
    ]
  });
});

// Submit a new quotation and calculate Blended Risk Score
app.post('/api/quotations', async (req, res) => {
  try {
    const { customerName, customerTier, items } = req.body;
    
    // In a real scenario we'd fetch the products from DB to get their maxDiscount
    // Here we'll rely on the payload for the hackathon demo, or mock it
    let riskScore = 0;
    let totalAmount = 0;
    
    for (const item of items) {
      // Mock check against ceiling
      const ceiling = item.product.maxDiscount;
      if (item.discount > ceiling) {
        riskScore += (item.discount - ceiling);
      }
      totalAmount += (item.product.price * item.qty * (1 - item.discount / 100));
    }
    
    const status = riskScore > 0 ? 'Pending Approval' : 'Approved';
    
    // We would normally create the quotation in DB via prisma here
    // const newQuote = await prisma.quotation.create({...})
    
    res.json({
      success: true,
      message: status === 'Approved' ? 'Quotation auto-approved!' : 'Quotation requires manager approval.',
      riskScore,
      status,
      totalAmount
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to process quotation' });
  }
});

// Fetch pending approvals for the rep
app.get('/api/approvals', (req, res) => {
  // Mock data for approvals
  res.json({
    approvals: [
      { id: '1', customer: 'Acme Corp', riskScore: 8, status: 'Pending Manager' },
      { id: '2', customer: 'TechFlow', riskScore: 12, status: 'Pending Finance' }
    ]
  });
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
    estimatedShipments: Object.keys(split).filter(k => split[k].length > 0).length
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

app.listen(port, () => {
  console.log(`Sales Rep API Server running on port ${port}`);
});
