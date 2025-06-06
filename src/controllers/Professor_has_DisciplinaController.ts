import { Request, Response } from "express";
import { Professor_has_Disciplina } from "../models";

class Professor_has_DisciplinaController {
  // Criação de novo vínculo professor-disciplina
  public async create(req: Request, res: Response): Promise<any> {
    const { professor, disciplina } = req.body;

    try {
      const document = new Professor_has_Disciplina({ professor, disciplina });
      const response = await document.save(); // Validações aplicadas automaticamente
      return res.json(response);
    } catch (error: any) {
      if (error?.errors?.["professor"]) {
        return res.json({ message: error.errors["professor"].message });
      } else if (error?.errors?.["disciplina"]) {
        return res.json({ message: error.errors["disciplina"].message });
      }
      return res.json({ message: error.message });
    }
  }

  // Listagem de todos os vínculos
  public async list(_: Request, res: Response): Promise<any> {
    try {
      const objects = await Professor_has_Disciplina.find()
        .populate("professor")
        .populate("disciplina")
        .select("professor disciplina")
        .sort({ nome: "asc" });
      return res.json(objects);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  // Exclusão de um vínculo
  public async delete(req: Request, res: Response): Promise<any> {
    const { id: _id } = req.body;

    try {
      const object = await Professor_has_Disciplina.findByIdAndDelete(_id);
      if (object) {
        return res.json({ message: "Registro excluído com sucesso" });
      } else {
        return res.json({ message: "Registro inexistente" });
      }
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  // Atualização de vínculo
  public async update(req: Request, res: Response): Promise<any> {
    const { id, professor, disciplina } = req.body;

    try {
      const document = await Professor_has_Disciplina.findById(id);
      if (!document) {
        return res.json({ message: "Registro inexistente!" });
      }

      document.professor = professor;
      document.disciplina = disciplina;

      const response = await document.save(); // Validações aplicadas
      return res.json(response);
    } catch (error: any) {
      if (error?.errors?.["professor"]) {
        return res.json({ message: error.errors["professor"].message });
      } else if (error?.errors?.["disciplina"]) {
        return res.json({ message: error.errors["disciplina"].message });
      }
      return res.json({ message: error.message });
    }
  }
}

export default new Professor_has_DisciplinaController();
