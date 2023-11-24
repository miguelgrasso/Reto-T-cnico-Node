export interface Card {
    card_number: number;
    cvv: number;
    expiration_year: string;
    expiration_month: string;
    email: string;
  }
  

export interface CardToken  {
    card: Card;
    token: string;
}