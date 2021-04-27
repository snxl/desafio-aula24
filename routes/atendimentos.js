import atendimentosController from "../controller/pagesController.js";
import express from "express"
const router = express.Router();

router.get("/", atendimentosController.atendimentosGET)
router.get("/:id", atendimentosController.atendimentosGETEspecifico)
router.post("/", atendimentosController.atendimentosPOST)
router.patch("/:id", atendimentosController.atendimentosPatch)
router.delete("/:id", atendimentosController.atendimentosDelete)
export default router