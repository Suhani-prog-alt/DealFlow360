import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import financeRoutes from './routes/financeRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/finance', financeRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'DealFlow360 API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
