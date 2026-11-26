import { Router } from "express";

import {
  enviarMensagem,
  listarMensagens,
  buscarMensagem,
  totalMensagens
} from "../controllers/mensagemController.js";

export const envioRoutes = Router();

envioRoutes.post("/mensagens", enviarMensagem);

export const consultaRoutes = Router();

consultaRoutes.get("/mensagens", listarMensagens);
consultaRoutes.get("/mensagens/:id", buscarMensagem);
consultaRoutes.get("/total-mensagens", totalMensagens);