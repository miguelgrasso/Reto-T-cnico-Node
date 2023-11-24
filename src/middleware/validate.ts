import { validationResult } from "express-validator"
import { NextFunction, Request, Response } from "express";

const validateResult = (req: Request, res: Response, next: NextFunction) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (err) {
        return res.status(403).send({ errors: (err as any).array() });
    }
}

export { validateResult };