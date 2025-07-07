import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    senha: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("senha")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
});

userSchema.methods.matchPassword = async function (senhaEscrita) {
    return await bcrypt.compare(senhaEscrita, this.senha);
};

const User = mongoose.model("User", userSchema);

export default User;
