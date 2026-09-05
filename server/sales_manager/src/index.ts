import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

import configRoutes from './routes/config';
import reportsRoutes from './routes/reports';

const PORT = process.env.PORT || 5000;

app.use('/api/config', configRoutes);
app.use('/api/reports', reportsRoutes);

// Get pending approvals
app.get('/api/approvals', async (req: Request, res: Response) => {
  try {
    const approvals = await prisma.approvalRequest.findMany({
      include: {
        quotation: {
          include: {
            customer: true,
            salesRep: true
          }
        },
        requestedBy: true
      }
    });
    res.json(approvals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch approvals' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
