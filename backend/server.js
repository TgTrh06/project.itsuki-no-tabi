import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';

import { connectDB } from './db/connect.js';

import authRouter from './routes/auth.route.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // Set true is required since using JWT
}))

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});