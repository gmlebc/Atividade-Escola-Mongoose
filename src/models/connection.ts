import mongoose from "mongoose";

// URI de conexão: IP, porta e nome do banco
const uri = "mongodb://127.0.0.1:27017/bdaula";

export default function connect() {
  // Manipuladores de eventos da conexão
  mongoose.connection.on("connected", () => console.log("MongoDB: connected"));
  mongoose.connection.on("open", () => console.log("MongoDB: open"));
  mongoose.connection.on("disconnected", () => console.log("MongoDB: disconnected"));
  mongoose.connection.on("reconnected", () => console.log("MongoDB: reconnected"));
  mongoose.connection.on("disconnecting", () => console.log("MongoDB: disconnecting"));
  mongoose.connection.on("close", () => console.log("MongoDB: close"));

  // Estabelece a conexão
  mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    })
    .then(() => console.log("MongoDB: conexão estabelecida"))
    .catch((e) => {
      console.error("MongoDB: erro ao conectar ->", e.message);
    });

  // Encerramento da aplicação
  process.on("SIGINT", async () => {
    try {
      console.log("MongoDB: encerrando conexão...");
      await mongoose.connection.close();
      process.exit(0);
    } catch (error) {
      console.error("MongoDB: erro ao encerrar conexão:", error);
      process.exit(1);
    }
  });
}
