import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const link = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB conectado com sucesso`);
  } catch (error) {
    console.error(`Erro ao conectar ao MongoDB: ${error.message}`);
    process.exit(1);
  }
};