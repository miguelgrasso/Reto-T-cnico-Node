import { Request, Response, response } from "express";
import CardService from "../services/cardService";
import { handleHttp401, handleHttp404, handleHttp500 } from "../utils/error.handle";

class CardController {
  async createCard({ body }: Request, res: Response){
    try {
      const responseCard = await CardService.createCard(body);
      //console.log("responseCard", responseCard);
      res.send(responseCard);
    } catch (e) {
      if (e instanceof Error) {
        handleHttp500(res, e.message);
      }
    }
  }

  async getCard({ body }: Request, res: Response){
    try {
      const token = body.token;
      console.log("body controller",body);
      const responseCard = await CardService.getCard(token);
      const data = responseCard ? responseCard : handleHttp404(res, "CARD NOT FOUND");
      res.send(data)
    } catch (e) {
      if (e instanceof Error) {
        handleHttp401(res, e.message);
      }
    }
  }
}

export default new CardController();

