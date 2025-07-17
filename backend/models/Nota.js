import mongoose from "mongoose";

const notaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    conteudo: {
      type: String,
      required: true,
    },
    criador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true } 
);

const Nota = mongoose.model("Nota", notaSchema);

export default Nota;