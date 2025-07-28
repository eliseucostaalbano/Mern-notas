import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import notasRoutes from './routes/notas.js';
import { connectDB } from "./config/db.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 2621;
const app = express();
app.use(express.json());

app.use('/api/user', authRoutes);
app.use('/api/notas', notasRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

connectDB();

app.listen(PORT, () => { 
  console.log(`Servidor rodando na porta ${PORT}`);
});
