import { Response } from "express";

const handleHttp500 = (res: Response, error: string, errorRaw?: any) => {
  res.status(500);
  res.send({ error });
};

const handleHttp404= (res: Response, error: string, errorRaw?: any) => {
    res.status(404);
    res.send({ error });
  };

const handleHttp401= (res: Response, error: string, errorRaw?: any) => {
res.status(401);
res.send({ error });
};
export { handleHttp500,handleHttp404,handleHttp401 };
