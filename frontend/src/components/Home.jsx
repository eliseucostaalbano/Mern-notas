import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [notas, setNotas] = useState([]);
  const [error, setError] = useState("");

  const pegarNotas = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Usuário não autenticado");
        return;
      }
      const { data } = await axios.get("/api/notas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(data);
      setNotas(data);
    } catch (error) {
      setError("Erro ao pegar notas: " + error.message);
    }
  };
  useEffect(() => {
    pegarNotas();
  }, []);
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
      <button className="fixed bottom-6 right-6 bg-gray-800 text-white w-14 h-14 text-3xl rounded-full shadow-lg hover:bg-gray-900 flex items-center justify-center">
        <span  className="flex items-center justify-center h-full w-full pb-2">+</span>
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notas.map((nota) => (
          <div className="bg-gray-800 p-4 rounded-lg shadow-md" key={nota._id}>
            <h3 className="text-lg font-medium text-white mb-2">
              {nota.titulo}
            </h3>
            <p className="text-gray-300 mb-4">{nota.conteudo}</p>
            <p className="text-sm text-gray-400 mb-4">
              {new Date(nota.createdAt).toLocaleDateString()}
            </p>
            <div className="flex space-x-2">
              <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
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
