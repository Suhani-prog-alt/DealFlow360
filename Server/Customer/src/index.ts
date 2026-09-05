import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/customer', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Customer backend running on port ${PORT}`);
});
