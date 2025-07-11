import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { proteger } from "../middleware/auth.js"; 

const router = express.Router(); 

// Rota para obter informações do usuário
router.get("/eu", proteger, async (req, res) => {
  res.status(200).json(req.user);
});

// Rota para registro de usuário
router.post('/registro', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        if (!nome || !email || !senha) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        const userExistente = await User.findOne({email})
        if (userExistente) {
            return res.status(400).json({ message: 'Usuário já existe.' });
        }

        const user = await User.create({nome, email, senha});
        const token = gerarToken(user._id);
        return res.status(201).json({id:user._id, nome : user.nome, email: user.email, token });
    } catch (error) {
        return res.status(500).json({ message: 'Erro no servidor.' });
    }
})

// Rota para login de usuário
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
      const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(senha))) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }
        const token = gerarToken(user._id);
        return res.status(200).json({ id: user._id, nome: user.nome, email: user.email, token });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.' });
    }
});

// Gerar token JWT
const gerarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export default router;