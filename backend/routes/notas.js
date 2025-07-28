import express from 'express';
import Nota from '../models/Nota.js';
import { proteger } from '../middleware/auth.js';

const router = express.Router();

router.get('/', proteger, async (req, res) => {
  try {
    const notas = await Nota.find({ criador: req.user._id });
    res.json(notas);
  } catch (error) {
    console.error("Erro ao buscar notas: ", error.message);
    res.status(500).json({ message: "Erro ao buscar notas." });
  }
});

router.get('/:id', proteger, async (req, res) => {
  try {
    const nota = await Nota.findById(req.params.id);
    if (!nota) {
      return res.status(404).json({ message: "Nota não encontrada." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar nota." });
  }
});


router.post('/', proteger, async (req, res) => {
  const { titulo, conteudo } = req.body;

  if (!titulo || !conteudo) {
    return res.status(400).json({ message: "Título e conteúdo são obrigatórios." });
  }

  try {
    const novaNota = new Nota({
      titulo,
      conteudo,
      criador: req.user._id
    });

    await novaNota.save();
    res.status(201).json(novaNota);
  } catch (error) {
    console.error("Erro ao criar nota: ", error.message);
    res.status(500).json({ message: "Erro ao criar nota." });
  }
});

router.put('/:id', proteger, async (req, res) => {
  const { titulo, conteudo } = req.body;

  try {
    const nota = await Nota.findById(req.params.id);
    if (!titulo || !conteudo) {
    return res.status(400).json({ message: "Título e conteúdo são obrigatórios." });
  }
    if (nota.criador.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Nota não encontrada." });
    }

    nota.titulo = titulo || nota.titulo;
    nota.conteudo = conteudo || nota.conteudo;

   const notaAtualizada = await nota.save();
    res.json(notaAtualizada);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar nota." });
  }
});

router.delete('/:id', proteger, async (req, res) => { 
    try {
        const nota = await Nota.findById(req.params.id);
        if (!nota) {
        return res.status(404).json({ message: "Nota não encontrada." });
        }
    
        if (nota.criador.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Acesso negado." });
        }
    
        await nota.deleteOne();
        res.json({ message: "Nota deletada com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar nota." });
    }
});

export default router;