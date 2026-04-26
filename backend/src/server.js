import express from 'express';
const app = express();
import { connectDB } from './config/db.js';
import noteRoutes from './routes/noteRoutes.js';
import dotenv from 'dotenv';
import Ratelimiter from '../middilware/RateLimiter.js';
import cors from 'cors';
import path from 'path';
dotenv.config();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: 'http://localhost:5173',
    })
  );
}
app.use(express.json());
app.use(Ratelimiter);
app.use('/api/notes', noteRoutes);

// app.use((req, res, next)=>{
//   console.log(`req method is: ${req.method} req URL is: ${req.url}`)
//   next()
// })



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('server is running on PORT:', PORT);
  });
});
