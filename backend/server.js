import express from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 2621;

const app = express();

app.get('/', (req, res) => {
  res.send('Ola, mundo! Servidor rodando com Express e Nodemon.');
});



app.listen(PORT, () => { 
  console.log(`Servidor rodando na porta ${PORT}`);
});