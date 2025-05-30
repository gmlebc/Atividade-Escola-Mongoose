import { Router } from "express";
import controller from "../controllers/DisciplinaController";

const routes = Router();

// Rotas de Disciplina
routes.post("/", controller.create);
routes.get("/", controller.list);
routes.delete("/", controller.delete);
routes.put("/", controller.update);

export default routes;
