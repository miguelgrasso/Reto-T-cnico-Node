import { Card, CardToken } from "../interfaces/card.interface";

import Redis from 'ioredis';
import { generateToken, verifyToken } from "../utils/jwt.handle";

const redis = new Redis();


class CardService {
    async createCard (card : Card)  {

        try {
            const token = generateToken(card);
            const data = {
                token,
                card
            }
            await redis.set("card", JSON.stringify(data));
            await redis.expire("card", 60);
            return token;
        } catch (e) {
            console.error(e);
            throw new Error('ERROR CREATING CARD');
        }
    }
    
    async getCard(token: string) {

        try{
            const isOk = verifyToken(token);
        }catch(e){
            throw new Error('TOKEN INVALID');
        }
        const responseCard = await redis.get("card");
        if (responseCard) {
            const cardData = JSON.parse(responseCard) as CardToken;
            if(cardData.token !== token) throw new Error('NOT FOUND CARD');
            const data = {
                card_number: cardData.card.card_number,
                expiration_year: cardData.card.expiration_year,
                expiration_month: cardData.card.expiration_month,
                email: cardData.card.email,
            }
            return data;
        } else {
            throw new Error('NOT FOUND CARD');
        }
    }
  }
  
  export default new CardService();