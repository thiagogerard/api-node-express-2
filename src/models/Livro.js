import autopopulate from "mongoose-autopopulate";
import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: { type: String },
    titulo: {
      type: String,
      required: [true, "O titulo do livro é obrigatório"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'autores',
      required: [true, "O(A) autor(a) do livro é obrigatório"],
      autopopulate: { select: "nome" }
    },
    editora: {
      type: String,
      required: [true, "A editora do livro é obrigatório"],
      enum: {
        values: ["Casa do codigo", "Alura"],
        message: "A editora {VALUE} nao e um valor permitido"
      }
    },
    numeroPaginas: {
      type: Number,
      validate: {
          validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message: "o numero de paginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
      }
    }
  }
);

livroSchema.plugin(autopopulate);

const livros = mongoose.model('livros', livroSchema);

export default livros;