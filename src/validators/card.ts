import { CustomValidator, check } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { validateResult } from '../middleware/validate';
import { luhnCheck } from '../utils/validators.handle';

const luhnValidator: CustomValidator = (value: string) => {
    if (!luhnCheck(value)) {
        throw new Error('Invalid card number');
    }
    return true;
};

const cvvValidator: CustomValidator = (cvv: number, { req }) => {
    const { card_number } = req.body;
    const firstDigit = card_number.toString()[0];
    let cvvLength = 3;
    if(firstDigit === '3')
        cvvLength = 4;
    if (cvv.toString().length !== cvvLength) {
        throw new Error('Invalid CVV');
    }
    return true;
}

const monthValidator: CustomValidator = (value: string) => {
    const month = parseInt(value, 10);
    if (isNaN(month) || month < 1 || month > 12) {
        throw new Error('Invalid month');
    }
    return true;
};

const yearValidator: CustomValidator = (value: string) => {
    const year = parseInt(value, 10);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < currentYear || year > currentYear + 5) {
        throw new Error('Invalid year');
    }
    return true;
};

const emailValidator: CustomValidator = (value: string) => {
    const domain = value.split('@')[1];
    const validDomains = ['gmail.com', 'hotmail.com', 'yahoo.es'];
    if (!validDomains.includes(domain)) {
        throw new Error('Invalid email domain');
    }
    return true;
};

const validateCreateCard = [ 
    check('card_number').isLength({ min: 13, max: 16 }).custom(luhnValidator),
    check('cvv').custom(cvvValidator),
    check('expiration_month').isLength({ min: 1, max: 2 }).custom(monthValidator),
    check('expiration_year').isLength({ min: 4, max: 4 }).custom(yearValidator),
    check('email').isLength({ min: 5, max: 100 }).isEmail().custom(emailValidator),
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next)
    }
]

export { validateCreateCard };