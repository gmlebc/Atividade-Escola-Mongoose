import mongoose from "mongoose";
import { isValidCPF } from "./validCPF";

const { Schema } = mongoose;

// Schema do Professor
const ProfessorSchema = new Schema({
  nome: {
    type: String,
    maxlength: [45, "O nome do professor pode ter no máximo 45 caracteres"],
    required: [true, "O nome do professor é obrigatório"],
  },
  email: {
    type: String,
    maxlength: [60, "O e-mail pode ter no máximo 60 caracteres"],
    unique: true,
    required: [true, "O e-mail é obrigatório"],
    validate: {
      validator: function (value: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
      },
      message: (props: any) => `${props.value} não é um formato de e-mail válido`,
    },
  },
  cpf: {
    type: String,
    trim: true,
    minlength: [11, "O CPF precisa ter 11 caracteres"],
    maxlength: [11, "O CPF precisa ter 11 caracteres"],
    required: [true, "O CPF é obrigatório"],
    validate: {
      validator: function (value: string) {
        return isValidCPF(value);
      },
      message: (props: any) => `${props.value} não é um CPF válido`,
    },
  },
});

// Schema da Disciplina
const DisciplinaSchema = new Schema({
  descricao: {
    type: String,
    maxlength: [45, "A descrição da disciplina pode ter no máximo 45 caracteres"],
    required: [true, "A descrição da disciplina é obrigatória"],
  },
});

// Schema de associação entre Professor e Disciplina
const Professor_has_DisciplinaSchema = new Schema({
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professor",
    required: true,
    validate: {
      validator: async function (id: string) {
        const professor = await mongoose.model("Professor").findById(id);
        return !!professor;
      },
      message: "O ID do professor fornecido não existe",
    },
  },
  disciplina: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Disciplina",
    required: true,
    validate: {
      validator: async function (id: string) {
        const disciplina = await mongoose.model("Disciplina").findById(id);
        return !!disciplina;
      },
      message: "O ID da disciplina fornecido não existe",
    },
  },
});

// Compilando os modelos
const Professor = mongoose.model("Professor", ProfessorSchema, "professores");
const Disciplina = mongoose.model("Disciplina", DisciplinaSchema);
const Professor_has_Disciplina = mongoose.model(
  "Professor_has_Disciplina",
  Professor_has_DisciplinaSchema
);

export { Professor, Disciplina, Professor_has_Disciplina };
