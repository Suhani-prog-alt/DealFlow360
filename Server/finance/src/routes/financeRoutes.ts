import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Finance routes coming soon' });
});

router.get('/revenue', (req, res) => {
  const dummyRevenue = [
    { month: 'Jan', revenue: 4000, expenses: 2400 },
    { month: 'Feb', revenue: 3000, expenses: 1398 },
    { month: 'Mar', revenue: 2000, expenses: 9800 },
    { month: 'Apr', revenue: 2780, expenses: 3908 },
    { month: 'May', revenue: 1890, expenses: 4800 },
    { month: 'Jun', revenue: 2390, expenses: 3800 },
    { month: 'Jul', revenue: 3490, expenses: 4300 },
  ];
  res.json(dummyRevenue);
});

router.post('/action', (req, res) => {
  const { action, payload } = req.body;
  res.json({ success: true, message: `Action ${action} processed successfully.`, payload });
});

export default router;
