"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const cardController_1 = __importDefault(require("../controllers/cardController"));
const session_1 = require("../middleware/session");
const card_1 = require("../validators/card");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/", session_1.checkToken, card_1.validateCreateCard, cardController_1.default.createCard);
router.post("/getCard", session_1.checkToken, cardController_1.default.getCard);
