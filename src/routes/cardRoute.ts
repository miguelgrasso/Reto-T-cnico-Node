import { Request, Response, Router } from "express";
import CardController from "../controllers/cardController";
import { checkToken } from "../middleware/session";
import { validateCreateCard } from "../validators/card";

const router = Router();

router.post("/", validateCreateCard, CardController.createCard);
router.post("/getCard", checkToken, CardController.getCard);

export { router };