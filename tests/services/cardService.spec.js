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
jest.mock('../../src/utils/jwt.handle');
jest.mock('ioredis', () => {
    return jest.fn().mockImplementation(() => {
        return {
            set: jest.fn(),
            get: jest.fn(),
            expire: jest.fn(),
        };
    });
});
describe('CardService', () => {
    const mockCard = {
        card_number: 4551708367301531,
        cvv: 523,
        expiration_year: '2028',
        expiration_month: '07',
        email: 'test@gmail.com',
    };
    const mockRedisInstance = new ioredis_1.default();
    describe('createCard', () => {
        it('should create a card', () => __awaiter(void 0, void 0, void 0, function* () {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkX251bWJlciI6NDU1MTcwODM2NzMwMTUzMSwiY3Z2Ijo1MjMsImV4cGlyYXRpb25feWVhciI6IjIwMjgiLCJleHBpcmF0aW9uX21vbnRoIjoiMDciLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzAwNzgyNDg0LCJleHAiOjE3MDA3ODI1NDR9.TrTSx66AhD-sPUut_lCsOFQu_pUSE7JYl41erzhyZVA";
            //(generateToken as jest.Mock).mockReturnValue(token);
            mockRedisInstance.set.mockResolvedValue('OK');
            mockRedisInstance.expire.mockResolvedValue('OK');
            const res = yield mockRedisInstance.set('card', JSON.stringify({ token: token, card: mockCard }));
            yield mockRedisInstance.expire('card', 60);
            //expect(generateToken).toHaveBeenCalledWith(mockCard);
            expect(mockRedisInstance.set).toHaveBeenCalledWith('card', JSON.stringify({ token, card: mockCard }));
            expect(mockRedisInstance.expire).toHaveBeenCalledWith('card', 60);
            expect(res).toBe('OK');
            /*const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkX251bWJlciI6NDU1MTcwODM2NzMwMTUzMSwiY3Z2Ijo1MjMsImV4cGlyYXRpb25feWVhciI6IjIwMjgiLCJleHBpcmF0aW9uX21vbnRoIjoiMDciLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzAwNzgyNDg0LCJleHAiOjE3MDA3ODI1NDR9.TrTSx66AhD-sPUut_lCsOFQu_pUSE7JYl41erzhyZVA";
            const mockRedisInstance = new Redis();
            (mockRedisInstance.set as jest.Mock).mockResolvedValue('OK');
            //const redisSetSpy = jest.spyOn(Redis.prototype, 'set');
            //const redisExpireSpy = jest.spyOn(Redis.prototype, 'expire');
      
            const res = await mockRedisInstance.set('card', JSON.stringify({ token: token, card: mockCard }));
            await mockRedisInstance.expire('card', 60);
            //expect(generateToken).toHaveBeenCalledWith(mockCard);
            expect(mockRedisInstance.set).toHaveBeenCalledWith('card', JSON.stringify({ token: token , card: mockCard }));
            expect(mockRedisInstance.expire).toHaveBeenCalledWith('card', 60);
            expect(res).toBe('OK');*/
        }));
        it('should handle error when creating card', () => __awaiter(void 0, void 0, void 0, function* () {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkX251bWJlciI6NDU1MTcwODM2NzMwMTUzMSwiY3Z2Ijo1MjMsImV4cGlyYXRpb25feWVhciI6IjIwMjgiLCJleHBpcmF0aW9uX21vbnRoIjoiMDciLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzAwNzgyNDg0LCJleHAiOjE3MDA3ODI1NDR9.TrTSx66AhD-sPUut_lCsOFQu_pUSE7JYl41erzhyZVA";
            const error = new Error('ERROR CREATING CARD');
            mockRedisInstance.set.mockRejectedValue(error);
            yield expect(mockRedisInstance.set('', '')).rejects.toThrow('ERROR CREATING CARD');
            yield mockRedisInstance.expire('card', 60);
            /*const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkX251bWJlciI6NDU1MTcwODM2NzMwMTUzMSwiY3Z2Ijo1MjMsImV4cGlyYXRpb25feWVhciI6IjIwMjgiLCJleHBpcmF0aW9uX21vbnRoIjoiMDciLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzAwNzgyNDg0LCJleHAiOjE3MDA3ODI1NDR9.TrTSx66AhD-sPUut_lCsOFQu_pUSE7JYl41erzhyZVA";
            const mockRedisInstance = new Redis();
            (mockRedisInstance.set as jest.Mock).mockResolvedValue('OK');
            //const redisSetSpy = jest.spyOn(Redis.prototype, 'set');
            //const redisExpireSpy = jest.spyOn(Redis.prototype, 'expire');
      
            const res = await mockRedisInstance.set('card', JSON.stringify({ token: token, card: mockCard }));
            await mockRedisInstance.expire('card', 60);
            //expect(generateToken).toHaveBeenCalledWith(mockCard);
            expect(mockRedisInstance.set).toHaveBeenCalledWith('card', JSON.stringify({ token: token , card: mockCard }));
            expect(mockRedisInstance.expire).toHaveBeenCalledWith('card', 60);
            expect(res).toBe('OK');*/
        }));
        /*it('should handle error a creating card', async () => {
    
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkX251bWJlciI6NDU1MTcwODM2NzMwMTUzMSwiY3Z2Ijo1MjMsImV4cGlyYXRpb25feWVhciI6IjIwMjgiLCJleHBpcmF0aW9uX21vbnRoIjoiMDciLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzAwNzgyNDg0LCJleHAiOjE3MDA3ODI1NDR9.TrTSx66AhD-sPUut_lCsOFQu_pUSE7JYl41erzhyZVA";
            const mockRedisInstance = new Redis();
            //(mockRedisInstance.set as jest.Mock).mockResolvedValue('OK');
            (mockRedisInstance.set as jest.Mock).mockImplementation(() => {
                throw new Error('TOKEN INVALID');
              });
              await expect(mockRedisInstance.set('','')).rejects.toThrow('TOKEN INVALID');
          });*/
    });
    /*describe('getCard', () => {
      it('should get a card', async () => {
        (verifyToken as jest.Mock).mockResolvedValue(true);
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkX251bWJlciI6NDU1MTcwODM2NzMwMTUzMSwiY3Z2Ijo1MjMsImV4cGlyYXRpb25feWVhciI6IjIwMjgiLCJleHBpcmF0aW9uX21vbnRoIjoiMDciLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzAwNzgyNDg0LCJleHAiOjE3MDA3ODI1NDR9.TrTSx66AhD-sPUut_lCsOFQu_pUSE7JYl41erzhyZVA";
        const mockRedisInstance = new Redis();
        const res = await mockRedisInstance.get('card');
        console.log("res",await mockRedisInstance.get('card'));
        const isValid = verifyToken(token);
        expect(verifyToken).toHaveBeenCalledWith(token);
        expect(mockRedisInstance.get).toHaveBeenCalledWith('card');
        expect(isValid).toEqual(mockCard);
        expect(res).toEqual(mockCard);
      });
    });*/
});
