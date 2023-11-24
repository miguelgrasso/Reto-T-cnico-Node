"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cardService_1 = __importDefault(require("../services/cardService"));
const error_handle_1 = require("../utils/error.handle");
class CardController {
    createCard({ body }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log("body", body);
                const responseCard = yield cardService_1.default.createCard(body);
                //console.log("responseCard", responseCard);
                res.send(responseCard);
            }
            catch (e) {
                //console.log("Een el catch");
                if (e instanceof Error) {
                    (0, error_handle_1.handleHttp500)(res, e.message);
                }
            }
        });
    }
    getCard({ body }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = body.token;
                console.log("body controller", body);
                //console.log("response",res);
                const responseCard = yield cardService_1.default.getCard(token);
                const data = responseCard ? responseCard : (0, error_handle_1.handleHttp404)(res, "CARD NOT FOUND");
                res.send(data);
            }
            catch (e) {
                if (e instanceof Error) {
                    (0, error_handle_1.handleHttp401)(res, e.message);
                }
            }
        });
    }
}
exports.default = new CardController();
