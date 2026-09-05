import { Router, Request, Response } from 'express';

const router = Router();

// AI Feature 1: Upsell/Cross-sell Recommendation Engine
router.post('/recommendations', (req: Request, res: Response) => {
  const { currentItems } = req.body;
  
  // Example AI mock response combining co-purchase history, promotions, and margin thresholds
  const recommendations = [
    { product: 'Laptop Bag', marginImpact: '+12%', score: 0.95, reason: 'High co-purchase history with Laptops' },
    { product: 'Extended Warranty', marginImpact: '+40%', score: 0.88, reason: 'High margin, meets minimum margin threshold' },
    { product: 'Mouse', marginImpact: '+8%', score: 0.92, reason: 'Frequently bought together' },
    { product: 'Installation Service', marginImpact: '+50%', score: 0.75, reason: 'Active promotion' }
  ];

  // Rank by a combination of score and margin impact
  const ranked = recommendations.sort((a, b) => b.score - a.score);

  res.json({
    success: true,
    recommendations: ranked
  });
});

// AI Feature 2: Discount Anomaly Detection
router.post('/discount-anomaly', (req: Request, res: Response) => {
  const { repId, currentDiscount } = req.body;
  
  // AI model would fetch the rep's historical average here
  const historicalAverage = 6.0; // 6%
  const threshold = 5.0; // 5% above historical average is an anomaly
  
  const isAnomaly = currentDiscount > (historicalAverage + threshold);
  
  res.json({
    success: true,
    historicalAverage,
    currentDiscount,
    isAnomaly,
    alert: isAnomaly 
      ? '🚨 Anomaly detected: Discount is significantly above historical average. Flagging for Manager Dashboard.' 
      : 'Normal discount behavior.'
  });
});

// AI Feature 3: Deal Health
router.post('/deal-health', (req: Request, res: Response) => {
  const { quoteInactiveDays, customerNegotiation, currentDiscount, deliveryDelayDays } = req.body;
  
  let riskScore = 0;
  const signals = [];

  // Deal Health scoring logic based on multiple signals
  if (quoteInactiveDays >= 7) {
    riskScore += 30;
    signals.push('Stalled deal: Quote inactive for 7+ days');
  }
  if (customerNegotiation === 'high') {
    riskScore += 20;
    signals.push('High customer negotiation');
  }
  if (currentDiscount > 15) {
    riskScore += 25;
    signals.push('Discount anomaly detected');
  }
  if (deliveryDelayDays > 0) {
    riskScore += 25;
    signals.push('Delivery-promise slippage');
  }

  let health = '🟢 Healthy';
  if (riskScore >= 70) {
    health = '🔴 Critical';
  } else if (riskScore >= 40) {
    health = '🟡 At Risk';
  }

  res.json({
    success: true,
    healthStatus: health,
    riskScore,
    signals
  });
});

export default router;
