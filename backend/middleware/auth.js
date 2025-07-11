import User from "../models/User.js";
import jtw from "jsonwebtoken";

export const proteger = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodificado = jtw.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodificado.id).select("-senha");
      return next();
    } catch (error) {
        console.error("Token verificação falhou: ", error.message);
      return res.status(401).json({ message: "Não autorizado, token não encontrado." });
    }
  }
  return res.status(401).json({ message: "Não autorizado, token inválido." });
};
