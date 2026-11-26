import { Router } from "express";

import {
  status,
  sobre
} from "../controllers/sistemaController.js";

const router = Router();

router.get("/status", status);
router.get("/sobre", sobre);

export default router;