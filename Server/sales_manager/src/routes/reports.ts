import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/dashboard-metrics', async (req: Request, res: Response) => {
  try {
    const productsCount = await prisma.product.count();
    const discountRulesCount = await prisma.discountRule.count();
    const warehousesCount = await prisma.warehouse.count();
    
    // For now we mock at-risk configs
    const atRiskConfigs = 0;

    res.json({
      products: productsCount,
      discountRules: discountRulesCount,
      warehouses: warehousesCount,
      atRiskConfigs
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard metrics' });
  }
});

router.get('/audit-logs', async (req: Request, res: Response) => {
  try {
    const logs = await prisma.approvalLog.findMany({
      include: {
        user: true,
        quotation: true
      },
      orderBy: { timestamp: 'desc' },
      take: 50
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

export default router;
