import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 2621;

const app = express();
app.use(express.json());

app.use('/api/user', authRoutes);

app.get('/', (req, res) => {
  res.send('Ola, mundo! Servidor rodando com Express e Nodemon.');
});

connectDB();

app.listen(PORT, () => { 
  console.log(`Servidor rodando na porta ${PORT}`);
});
