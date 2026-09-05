import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

const handleError = (res: Response, error: unknown, message: string) => {
  console.error(message, error);
  res.status(500).json({ error: message });
};

router.get('/products', async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    handleError(res, error, 'Failed to fetch products');
  }
});

router.post('/products', async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.create({ data: req.body });
    res.status(201).json(product);
  } catch (error) {
    handleError(res, error, 'Failed to create product');
  }
});

router.get('/pricelists', async (req: Request, res: Response) => {
  try {
    const priceLists = await prisma.priceList.findMany();
    res.json(priceLists);
  } catch (error) {
    handleError(res, error, 'Failed to fetch price lists');
  }
});

router.post('/pricelists', async (req: Request, res: Response) => {
  try {
    const priceList = await prisma.priceList.create({ data: req.body });
    res.status(201).json(priceList);
  } catch (error) {
    handleError(res, error, 'Failed to create price list');
  }
});

router.get('/discount-tiers', async (req: Request, res: Response) => {
  try {
    const tiers = await prisma.discountRule.findMany();
    res.json(tiers);
  } catch (error) {
    handleError(res, error, 'Failed to fetch discount tiers');
  }
});

router.post('/discount-tiers', async (req: Request, res: Response) => {
  try {
    const tier = await prisma.discountRule.create({ data: req.body });
    res.status(201).json(tier);
  } catch (error) {
    handleError(res, error, 'Failed to create discount tier');
  }
});

router.get('/approval-chains', async (req: Request, res: Response) => {
  try {
    const chains = await prisma.approvalChain.findMany();
    res.json(chains);
  } catch (error) {
    handleError(res, error, 'Failed to fetch approval chains');
  }
});

router.post('/approval-chains', async (req: Request, res: Response) => {
  try {
    const chain = await prisma.approvalChain.create({ data: req.body });
    res.status(201).json(chain);
  } catch (error) {
    handleError(res, error, 'Failed to create approval chain');
  }
});

router.get('/warehouses', async (req: Request, res: Response) => {
  try {
    const warehouses = await prisma.warehouse.findMany();
    res.json(warehouses);
  } catch (error) {
    handleError(res, error, 'Failed to fetch warehouses');
  }
});

router.post('/warehouses', async (req: Request, res: Response) => {
  try {
    const warehouse = await prisma.warehouse.create({ data: req.body });
    res.status(201).json(warehouse);
  } catch (error) {
    handleError(res, error, 'Failed to create warehouse');
  }
});

router.get('/subscriptions', async (req: Request, res: Response) => {
  try {
    const plans = await prisma.subscriptionPlan.findMany();
    res.json(plans);
  } catch (error) {
    handleError(res, error, 'Failed to fetch subscription plans');
  }
});

router.post('/subscriptions', async (req: Request, res: Response) => {
  try {
    const plan = await prisma.subscriptionPlan.create({ data: req.body });
    res.status(201).json(plan);
  } catch (error) {
    handleError(res, error, 'Failed to create subscription plan');
  }
});

router.get('/upsell-rules', async (req: Request, res: Response) => {
  try {
    const rules = await prisma.upsellRule.findMany({
      include: {
        primaryProduct: true,
        suggestedProduct: true
      }
    });
    res.json(rules);
  } catch (error) {
    handleError(res, error, 'Failed to fetch upsell rules');
  }
});

router.post('/upsell-rules', async (req: Request, res: Response) => {
  try {
    const rule = await prisma.upsellRule.create({ data: req.body });
    res.status(201).json(rule);
  } catch (error) {
    handleError(res, error, 'Failed to create upsell rule');
  }
});

export default router;
