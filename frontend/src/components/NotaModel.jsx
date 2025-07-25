import { useEffect, useState } from "react";
import axios from "axios";

const NotaModel = ({ isOpen, onClose, nota, onSave }) => {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTitulo(nota ? nota.titulo : "");
    setConteudo(nota ? nota.conteudo : "");
    setError("");
  }, [nota]);

  const lidarSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Usuário não autenticado");
        return;
      }
      const payload = { titulo, conteudo };
      const config  = {headers: { Authorization: `Bearer ${token}`}}
      if (nota) {
        const { data } = await axios.put(`/api/notas/${nota._id}`, payload, config);
        onSave(data);
      } else {
        const { data } = await axios.post("/api/notas", payload, config);
        onSave(data);
      }
      setTitulo("");
      setConteudo("");
      setError("");
      onClose();
    } catch (error) {
      console.log("erro na nota salva", error);
      setError("Falha ao salvar nota");
    }
  }
   if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-4">
          {nota ? "Editar Nota" : "Criar Nota"}
        </h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <form onSubmit={lidarSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Título da Nota"
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <textarea
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              placeholder="Conteúdo da Nota"
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>
          <div className="flex space-x-2">
            <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              {nota ? "Atualizar Nota" : "Criar Nota"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotaModel;
