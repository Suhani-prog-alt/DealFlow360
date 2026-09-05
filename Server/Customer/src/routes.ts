import { Router } from 'express';

const router = Router();

// Mock Data (In-Memory)
const quotations = [
  { id: "q1", quoteNumber: "Q-1042", status: "Awaiting Customer", total: 10500 },
  { id: "q2", quoteNumber: "Q-1038", status: "Under Negotiation", total: 14250 }
];

const negotiations = [
  { id: "n1", quoteId: "q2", messages: [
    { sender: "Customer", text: "Can you provide a better discount on the server rack?" }
  ]}
];

const notifications = [
  { id: "not1", message: "Quotation Q-1042 is awaiting your response.", read: false }
];

router.get('/quotations', (req, res) => {
  res.json({ success: true, data: quotations });
});

router.get('/quotations/:id', (req, res) => {
  const quote = quotations.find(q => q.id === req.params.id);
  if (!quote) {
      res.status(404).json({ success: false, message: 'Not found' });
      return;
  }
  res.json({ success: true, data: quote });
});

router.post('/quotations/:id/confirm', (req, res) => {
  const quote = quotations.find(q => q.id === req.params.id);
  if (!quote) {
      res.status(404).json({ success: false, message: 'Not found' });
      return;
  }
  quote.status = "Accepted";
  res.json({ success: true, data: quote });
});

router.get('/negotiations', (req, res) => {
  res.json({ success: true, data: negotiations });
});

router.post('/negotiations', (req, res) => {
  const { quoteId, message, counterDiscount, lineId } = req.body;
  const quote = quotations.find(q => q.id === quoteId);
  if (quote) {
    quote.status = 'Under Negotiation';
  }
  let neg = negotiations.find(n => n.quoteId === quoteId);
  if (!neg) {
    neg = { id: `n${Date.now()}`, quoteId, messages: [] };
    negotiations.push(neg);
  }
  neg.messages.push({ sender: 'Customer', text: message, counterDiscount, lineId } as any);
  res.json({ success: true, data: neg });
});

router.get('/notifications', (req, res) => {
  res.json({ success: true, data: notifications });
});

export default router;
