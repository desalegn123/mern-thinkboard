import express from 'express';
const app = express();
import { connectDB } from './config/db.js';
import noteRoutes from './routes/noteRoutes.js';
import dotenv from 'dotenv';
import Ratelimiter from '../middilware/RateLimiter.js';
import cors from "cors"
dotenv.config();
app.use(express.json());
app.use(Ratelimiter)
app.use(cors({
  origin:"http://localhost:5173"
}))
// app.use((req, res, next)=>{
//   console.log(`req method is: ${req.method} req URL is: ${req.url}`)
//   next()
// })
app.use('/api/notes',    noteRoutes);

const PORT = process.env.PORT || 5000;
connectDB().then(()=>{
  app.listen(PORT, () => {
    console.log('server is running on PORT:', PORT);
  });

})


