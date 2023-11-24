import { sign, verify } from 'jsonwebtoken';
import { generateToken, verifyToken } from '../../src/utils/jwt.handle'
import { Card } from '../../src/interfaces/card.interface';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

describe('jwt.handle', () => {
  const JWT_SECRET = 'token.01010101';
  const mockCard: Card = {
    card_number: 4551708367301531,
    cvv : 523,
    expiration_year: '2028',
    expiration_month: '07',
    email: 'test@gmail.com',
  };

  describe('generateToken', () => {
    it('should generate a token', () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkX251bWJlciI6NDU1MTcwODM2NzMwMTUzMSwiY3Z2Ijo1MjMsImV4cGlyYXRpb25feWVhciI6IjIwMjgiLCJleHBpcmF0aW9uX21vbnRoIjoiMDciLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzAwNzgyNDg0LCJleHAiOjE3MDA3ODI1NDR9.TrTSx66AhD-sPUut_lCsOFQu_pUSE7JYl41erzhyZVA";
      (sign as jest.Mock).mockReturnValue(token);

      const jwt = generateToken(mockCard);

      expect(sign).toHaveBeenCalledWith(mockCard, JWT_SECRET, { expiresIn: '1m' });
      expect(jwt).toBe(token);
    });
    it('should handle error in generate a token', () => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkX251bWJlciI6NDU1MTcwODM2NzMwMTUzMSwiY3Z2Ijo1MjMsImV4cGlyYXRpb25feWVhciI6IjIwMjgiLCJleHBpcmF0aW9uX21vbnRoIjoiMDciLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzAwNzgyNDg0LCJleHAiOjE3MDA3ODI1NDR9.TrTSx66AhD-sPUut_lCsOFQu_pUSE7JYl41erzhyZVA";
      const error = new Error('NO CARD');
      (sign as jest.Mock).mockRejectedValue(error);
       expect(generateToken({
          card_number: 0,
          cvv: 0,
          expiration_year: '',
          expiration_month: '',
          email: ''
      })).rejects.toThrow('NO CARD');
    });
  });

  describe('verifyToken', () => {
    it('should verify a token', () => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkX251bWJlciI6NDU1MTcwODM2NzMwMTUzMSwiY3Z2Ijo1MjMsImV4cGlyYXRpb25feWVhciI6IjIwMjgiLCJleHBpcmF0aW9uX21vbnRoIjoiMDciLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzAwNzgyNDg0LCJleHAiOjE3MDA3ODI1NDR9.TrTSx66AhD-sPUut_lCsOFQu_pUSE7JYl41erzhyZVA";
      (verify as jest.Mock).mockReturnValue(true);

      const isOk = verifyToken(token);

      expect(verify).toHaveBeenCalledWith(token, JWT_SECRET);
      expect(isOk).toBe(true);
    });
  });
});