import { NextFunction, Request, Response } from "express";

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token  = req.headers.authorization || "";
  const tokenvalue = token.split(" ").pop();
  if (tokenvalue!="Secret") {
    res.status(401).send({ message: "Token not found" });
  } else {
    next();
  }
}

export { checkToken };