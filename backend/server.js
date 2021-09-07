import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import ghostRoutes from './routes/ghostRoutes.js';

// Loading environmental variables
dotenv.config();

// Connecting to MongoDB database
connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/phasmo', ghostRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
