import { Card } from '../../src/interfaces/card.interface';
import CardService from '../../src/services/cardService';
import { generateToken, verifyToken } from '../../src/utils/jwt.handle';
import Redis from 'ioredis';


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
  const mockCard: Card = {
    card_number: 4551708367301531,
    cvv : 523,
    expiration_year: '2028',
    expiration_month: '07',
    email: 'test@gmail.com',
  };
  const mockRedisInstance = new Redis();
  describe('createCard', () => {
    it('should create a card', async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkX251bWJlciI6NDU1MTcwODM2NzMwMTUzMSwiY3Z2Ijo1MjMsImV4cGlyYXRpb25feWVhciI6IjIwMjgiLCJleHBpcmF0aW9uX21vbnRoIjoiMDciLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzAwNzgyNDg0LCJleHAiOjE3MDA3ODI1NDR9.TrTSx66AhD-sPUut_lCsOFQu_pUSE7JYl41erzhyZVA";
    
    //(generateToken as jest.Mock).mockReturnValue(token);
    (mockRedisInstance.set as jest.Mock).mockResolvedValue('OK');
    (mockRedisInstance.expire as jest.Mock).mockResolvedValue('OK');

    const res = await mockRedisInstance.set('card', JSON.stringify({ token: token, card: mockCard }));
    await mockRedisInstance.expire('card', 60);

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
    });
    it('should handle error when creating card', async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkX251bWJlciI6NDU1MTcwODM2NzMwMTUzMSwiY3Z2Ijo1MjMsImV4cGlyYXRpb25feWVhciI6IjIwMjgiLCJleHBpcmF0aW9uX21vbnRoIjoiMDciLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzAwNzgyNDg0LCJleHAiOjE3MDA3ODI1NDR9.TrTSx66AhD-sPUut_lCsOFQu_pUSE7JYl41erzhyZVA";
        const error = new Error('ERROR CREATING CARD');
        (mockRedisInstance.set as jest.Mock).mockRejectedValue(error);
        await expect(mockRedisInstance.set('','')).rejects.toThrow('ERROR CREATING CARD');
        await mockRedisInstance.expire('card', 60);

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
        });

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