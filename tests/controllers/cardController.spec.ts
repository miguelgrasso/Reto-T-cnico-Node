import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import CardController from '../../src/controllers/cardController';
import CardService from '../../src/services/cardService';
import { generateToken, verifyToken } from '../../src/utils/jwt.handle';

jest.mock('../../src/services/cardService');
jest.mock('../../src/utils/jwt.handle');

describe('CardController', () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(bodyParser.json());
    app.post('/getCard', CardController.getCard);
    app.post('/', CardController.createCard);
  });

  it('should get a card', async () => {

    const data = { card_number: '4551708367301531', expiration_year: '2028', expiration_month: '07', email: 'test@gmail.com'};
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkX251bWJlciI6NDU1MTcwODM2NzMwMTUzMSwiY3Z2Ijo1MjMsImV4cGlyYXRpb25feWVhciI6IjIwMjgiLCJleHBpcmF0aW9uX21vbnRoIjoiMDciLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzAwNzgyNDg0LCJleHAiOjE3MDA3ODI1NDR9.TrTSx66AhD-sPUut_lCsOFQu_pUSE7JYl41erzhyZVA";
    (CardService.getCard as jest.Mock).mockReturnValueOnce(JSON.stringify(data));

    const res = await request(app).post('/getCard').send({token});

    expect(CardService.getCard).toHaveBeenCalledWith(token);
    expect(res.text).toBe(JSON.stringify(data));
  });

  it('should handle card not found', async () => {
    const token = "123456789";
    (CardService.getCard as jest.Mock).mockReturnValueOnce(null);

    const res = await request(app).post('/getCard').send({ token });

    expect(CardService.getCard).toHaveBeenCalledWith(token);
    expect(res.status).toEqual(404);
  });

  it('should handle error', async () => {
    const error = new Error('TOKEN INVALID');
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkX251bWJlciI6NDU1MTcwODM2NzMwMTUzMSwiY3Z2Ijo1MjMsImV4cGlyYXRpb25feWVhciI6IjIwMjgiLCJleHBpcmF0aW9uX21vbnRoIjoiMDciLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzAwNzgyNDg0LCJleHAiOjE3MDA3ODI1NDR9.TrTSx66AhD-sPUut_lCsOFQu_pUSE7JYl41erzhyZVA";
    (CardService.getCard as jest.Mock).mockRejectedValue(error);

    const res = await request(app).post('/getCard').send({ token });

    expect(CardService.getCard).toHaveBeenCalledWith(token);
    expect(res.status).toEqual(401);
  });

  it('should throw an error if the token is invalid', async () => {
    const token = '';

    (verifyToken as jest.Mock).mockImplementation(() => {
      throw new Error('TOKEN INVALID');
    });

    await expect(CardService.getCard(token)).rejects.toThrow('TOKEN INVALID');
  });

  it('should handle valid token', async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkX251bWJlciI6NDU1MTcwODM2NzMwMTUzMSwiY3Z2Ijo1MjMsImV4cGlyYXRpb25feWVhciI6IjIwMjgiLCJleHBpcmF0aW9uX21vbnRoIjoiMDciLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzAwNzgyNDg0LCJleHAiOjE3MDA3ODI1NDR9.TrTSx66AhD-sPUut_lCsOFQu_pUSE7JYl41erzhyZVA";
    const data = { card_number: 4551708367301531, cvv : 523, expiration_year: '2028', expiration_month: '07', email: 'test@gmail.com'};
    const cardToken = { token, card: data };
  
    (verifyToken as jest.Mock).mockReturnValue(true);
    (CardService.getCard as jest.Mock).mockResolvedValue(JSON.stringify(cardToken));
    verifyToken(token);
    const res = await request(app).post('/getCard').send({token});
    const resJson = JSON.parse(res.text);
    expect(verifyToken).toHaveBeenCalledWith(token);
    expect(CardService.getCard).toHaveBeenCalledWith(token);
    expect(res.text).toEqual(JSON.stringify(cardToken));
  });

  it('should create a card', async () => {
    const data = { card_number: 4551708367301531, cvv : 523, expiration_year: '2028', expiration_month: '07', email: 'test@gmail.com'};
    const createdCard = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkX251bWJlciI6NDU1MTcwODM2NzMwMTUzMSwiY3Z2Ijo1MjMsImV4cGlyYXRpb25feWVhciI6IjIwMjgiLCJleHBpcmF0aW9uX21vbnRoIjoiMDciLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzAwNzgyNDg0LCJleHAiOjE3MDA3ODI1NDR9.TrTSx66AhD-sPUut_lCsOFQu_pUSE7JYl41erzhyZVA";
    (CardService.createCard as jest.Mock).mockResolvedValue(createdCard);
    (generateToken as jest.Mock).mockReturnValue(createdCard);
    const jwt=generateToken(data);
    const res = await request(app).post('/').send(data);
    expect(CardService.createCard).toHaveBeenCalledWith(data);
    expect(res.text).toEqual(createdCard);
    expect(generateToken).toHaveBeenCalledWith(data);
    expect(jwt).toEqual(createdCard);
  });

  it('should handle error', async () => {
    const error = new Error('ERROR CREATING CARD');
    const data = { card_number: 4551708367301531, cvv : 523, expiration_year: '2028', expiration_month: '07', email: 'test@gmail.com'};
    (CardService.createCard as jest.Mock).mockRejectedValue(error);

    const res = await request(app).post('/').send(data);

    expect(CardService.createCard).toHaveBeenCalledWith(data);
    expect(res.status).toEqual(500);
  });

});