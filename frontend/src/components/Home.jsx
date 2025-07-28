import axios from "axios";
import { useEffect, useState } from "react";
import NotaModel from "./NotaModel";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [notas, setNotas] = useState([]);
  const [error, setError] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [editarNota, setEditarNota] = useState(null);
  const localização = useLocation();

  const pegarNotas = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Usuário não autenticado");
        return;
      }
      const buscaParams = new URLSearchParams(localização.search);
      const busca = buscaParams.get("busca") || "";
      const { data } = await axios.get("/api/notas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const notasFiltradas = busca
        ? data.filter(
            (nota) =>
              nota.titulo.toLowerCase().includes(busca.toLowerCase()) ||
              nota.conteudo.toLowerCase().includes(busca.toLowerCase())
          )
        : data;
      // console.log(data);
      setNotas(notasFiltradas);
    } catch (error) {
      setError("Erro ao pegar notas: " + error.message);
    }
  };

  const lidarEditar = async (nota) => {
    setEditarNota(nota);
    setIsModelOpen(true);
  };

  useEffect(() => {
    pegarNotas();
  }, [localização.search]);

  const lidarNotaSalva = (novaNota) => {
    if (editarNota) {
      setNotas(
        notas.map((nota) => (nota._id === novaNota._id ? novaNota : nota))
      );
    } else {
      setNotas([...notas, novaNota]);
    }

    setEditarNota(null);
    setIsModelOpen(false);
  };

  const lidarDeletar = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Usuário não autenticado");
        return;
      }
      await axios.delete(`/api/notas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotas(notas.filter((nota) => nota._id !== id));
    } catch (error) {
      setError("Erro ao deletar nota: " + error.message);
    }
  };
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-500">
      {error && <p className="text-red-400 mb-4">{error}</p>}
      <NotaModel
        isOpen={isModelOpen}
        onClose={() => {
          setIsModelOpen(false);
          setEditarNota(null);
        }}
        nota={editarNota}
        onSave={lidarNotaSalva}
      />
      <button
        onClick={() => setIsModelOpen(true)}
        className="fixed bottom-6 right-6 bg-gray-800 text-white w-14 h-14 text-3xl rounded-full shadow-lg hover:bg-gray-900 flex items-center justify-center"
      >
        <span className="flex items-center justify-center h-full w-full pb-2">
          +
        </span>
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notas.map((nota) => (
          <div className="bg-gray-800 p-4 rounded-lg shadow-md" key={nota._id}>
            <h3 className="text-lg font-medium text-white mb-2">
              {nota.titulo}
            </h3>
            <p className="text-gray-300 mb-4">{nota.conteudo}</p>
            <p className="text-sm text-gray-400 mb-4">
              {new Date(nota.updatedAt).toLocaleDateString()}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => lidarEditar(nota)}
                className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
              >
                Editar
              </button>
              <button
                onClick={() => lidarDeletar(nota._id)}
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
