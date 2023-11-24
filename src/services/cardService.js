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
const ioredis_1 = __importDefault(require("ioredis"));
const jwt_handle_1 = require("../utils/jwt.handle");
const redis = new ioredis_1.default();
class CardService {
    createCard(card) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = (0, jwt_handle_1.generateToken)(card);
                const data = {
                    token,
                    card
                };
                yield redis.set("card", JSON.stringify(data));
                yield redis.expire("card", 60);
                return token;
            }
            catch (e) {
                console.error(e);
                throw new Error('ERROR CREATING CARD');
            }
        });
    }
    getCard(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isOk = (0, jwt_handle_1.verifyToken)(token);
            }
            catch (e) {
                throw new Error('TOKEN INVALID');
            }
            const responseCard = yield redis.get("card");
            if (responseCard) {
                const cardData = JSON.parse(responseCard);
                if (cardData.token !== token)
                    throw new Error('NOT FOUND CARD');
                const data = {
                    card_number: cardData.card.card_number,
                    expiration_year: cardData.card.expiration_year,
                    expiration_month: cardData.card.expiration_month,
                    email: cardData.card.email,
                };
                return data;
            }
            else {
                throw new Error('NOT FOUND CARD');
            }
        });
    }
}
exports.default = new CardService();
