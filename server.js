import express from "express";
import { envioRoutes, consultaRoutes } from "./routes/mensagemRoutes.js";
import sistemaRoutes from "./routes/sistemaRoutes.js";


const app = express();
const PORT = 3000;


app.use(express.json());
app.use(envioRoutes);
app.use(express.static("views"));
app.use(sistemaRoutes);
app.use(consultaRoutes);


// ── [SPRINT 01 — SERVIDOR: iniciado na porta 3000; mantido ao longo das aulas] ──
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor em http://localhost:${PORT}`);
});