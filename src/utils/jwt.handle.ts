import { sign, verify } from "jsonwebtoken";
import { Card } from "../interfaces/card.interface";

const JWT_SECRET = process.env.JWT_SECRET || "token.01010101";
//manejar card como nulo

const generateToken = (card: Card) => {
      if (!card) throw new Error("NO CARD");
      const jwt = sign(card, JWT_SECRET, {
        expiresIn: "1m",
      });
      return jwt;

  };
  
  const verifyToken = (jwt: string) => {
    const isOk = verify(jwt, JWT_SECRET);
    return isOk;
  };
  
  export { generateToken, verifyToken };