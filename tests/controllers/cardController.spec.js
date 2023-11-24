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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cardController_1 = __importDefault(require("../../src/controllers/cardController"));
const cardService_1 = __importDefault(require("../../src/services/cardService"));
const jwt_handle_1 = require("../../src/utils/jwt.handle");
jest.mock('../../src/services/cardService');
jest.mock('../../src/utils/jwt.handle');
describe('CardController', () => {
    let app;
    beforeEach(() => {
        app = (0, express_1.default)();
        app.use(body_parser_1.default.json());
        app.post('/getCard', cardController_1.default.getCard);
        app.post('/', cardController_1.default.createCard);
    });
    it('should get a card', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { card_number: '4551708367301531', expiration_year: '2028', expiration_month: '07', email: 'test@gmail.com' };
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkX251bWJlciI6NDU1MTcwODM2NzMwMTUzMSwiY3Z2Ijo1MjMsImV4cGlyYXRpb25feWVhciI6IjIwMjgiLCJleHBpcmF0aW9uX21vbnRoIjoiMDciLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzAwNzgyNDg0LCJleHAiOjE3MDA3ODI1NDR9.TrTSx66AhD-sPUut_lCsOFQu_pUSE7JYl41erzhyZVA";
        cardService_1.default.getCard.mockReturnValueOnce(JSON.stringify(data));
        const res = yield (0, supertest_1.default)(app).post('/getCard').send({ token });
        expect(cardService_1.default.getCard).toHaveBeenCalledWith(token);
        expect(res.text).toBe(JSON.stringify(data));
    }));
    it('should handle card not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = "123456789";
        cardService_1.default.getCard.mockReturnValueOnce(null);
        const res = yield (0, supertest_1.default)(app).post('/getCard').send({ token });
        expect(cardService_1.default.getCard).toHaveBeenCalledWith(token);
        expect(res.status).toEqual(404);
    }));
    it('should handle error', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = new Error('TOKEN INVALID');
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkX251bWJlciI6NDU1MTcwODM2NzMwMTUzMSwiY3Z2Ijo1MjMsImV4cGlyYXRpb25feWVhciI6IjIwMjgiLCJleHBpcmF0aW9uX21vbnRoIjoiMDciLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzAwNzgyNDg0LCJleHAiOjE3MDA3ODI1NDR9.TrTSx66AhD-sPUut_lCsOFQu_pUSE7JYl41erzhyZVA";
        cardService_1.default.getCard.mockRejectedValue(error);
        const res = yield (0, supertest_1.default)(app).post('/getCard').send({ token });
        expect(cardService_1.default.getCard).toHaveBeenCalledWith(token);
        expect(res.status).toEqual(401);
    }));
    it('should throw an error if the token is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = '';
        jwt_handle_1.verifyToken.mockImplementation(() => {
            throw new Error('TOKEN INVALID');
        });
        yield expect(cardService_1.default.getCard(token)).rejects.toThrow('TOKEN INVALID');
    }));
    it('should handle valid token', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkX251bWJlciI6NDU1MTcwODM2NzMwMTUzMSwiY3Z2Ijo1MjMsImV4cGlyYXRpb25feWVhciI6IjIwMjgiLCJleHBpcmF0aW9uX21vbnRoIjoiMDciLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzAwNzgyNDg0LCJleHAiOjE3MDA3ODI1NDR9.TrTSx66AhD-sPUut_lCsOFQu_pUSE7JYl41erzhyZVA";
        const data = { card_number: 4551708367301531, cvv: 523, expiration_year: '2028', expiration_month: '07', email: 'test@gmail.com' };
        const cardToken = { token, card: data };
        jwt_handle_1.verifyToken.mockReturnValue(true);
        cardService_1.default.getCard.mockResolvedValue(JSON.stringify(cardToken));
        (0, jwt_handle_1.verifyToken)(token);
        const res = yield (0, supertest_1.default)(app).post('/getCard').send({ token });
        const resJson = JSON.parse(res.text);
        expect(jwt_handle_1.verifyToken).toHaveBeenCalledWith(token);
        expect(cardService_1.default.getCard).toHaveBeenCalledWith(token);
        expect(res.text).toEqual(JSON.stringify(cardToken));
    }));
    it('should create a card', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { card_number: 4551708367301531, cvv: 523, expiration_year: '2028', expiration_month: '07', email: 'test@gmail.com' };
        const createdCard = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkX251bWJlciI6NDU1MTcwODM2NzMwMTUzMSwiY3Z2Ijo1MjMsImV4cGlyYXRpb25feWVhciI6IjIwMjgiLCJleHBpcmF0aW9uX21vbnRoIjoiMDciLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzAwNzgyNDg0LCJleHAiOjE3MDA3ODI1NDR9.TrTSx66AhD-sPUut_lCsOFQu_pUSE7JYl41erzhyZVA";
        cardService_1.default.createCard.mockResolvedValue(createdCard);
        jwt_handle_1.generateToken.mockReturnValue(createdCard);
        const jwt = (0, jwt_handle_1.generateToken)(data);
        const res = yield (0, supertest_1.default)(app).post('/').send(data);
        expect(cardService_1.default.createCard).toHaveBeenCalledWith(data);
        expect(res.text).toEqual(createdCard);
        expect(jwt_handle_1.generateToken).toHaveBeenCalledWith(data);
        expect(jwt).toEqual(createdCard);
    }));
    it('should handle error', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = new Error('ERROR CREATING CARD');
        const data = { card_number: 4551708367301531, cvv: 523, expiration_year: '2028', expiration_month: '07', email: 'test@gmail.com' };
        cardService_1.default.createCard.mockRejectedValue(error);
        const res = yield (0, supertest_1.default)(app).post('/').send(data);
        expect(cardService_1.default.createCard).toHaveBeenCalledWith(data);
        expect(res.status).toEqual(500);
    }));
});
