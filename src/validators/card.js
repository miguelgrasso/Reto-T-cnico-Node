"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateCard = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../middleware/validate");
const validators_handle_1 = require("../utils/validators.handle");
const luhnValidator = (value) => {
    if (!(0, validators_handle_1.luhnCheck)(value)) {
        throw new Error('Invalid card number');
    }
    return true;
};
const cvvValidator = (cvv, { req }) => {
    const { card_number } = req.body;
    const firstDigit = card_number.toString()[0];
    let cvvLength = 3;
    if (firstDigit === '3')
        cvvLength = 4;
    if (cvv.toString().length !== cvvLength) {
        throw new Error('Invalid CVV');
    }
    return true;
};
const monthValidator = (value) => {
    const month = parseInt(value, 10);
    if (isNaN(month) || month < 1 || month > 12) {
        throw new Error('Invalid month');
    }
    return true;
};
const yearValidator = (value) => {
    const year = parseInt(value, 10);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < currentYear || year > currentYear + 5) {
        throw new Error('Invalid year');
    }
    return true;
};
const emailValidator = (value) => {
    const domain = value.split('@')[1];
    const validDomains = ['gmail.com', 'hotmail.com', 'yahoo.es'];
    if (!validDomains.includes(domain)) {
        throw new Error('Invalid email domain');
    }
    return true;
};
const validateCreateCard = [
    (0, express_validator_1.check)('card_number').isLength({ min: 13, max: 16 }).custom(luhnValidator),
    (0, express_validator_1.check)('cvv').custom(cvvValidator),
    (0, express_validator_1.check)('expiration_month').isLength({ min: 1, max: 2 }).custom(monthValidator),
    (0, express_validator_1.check)('expiration_year').isLength({ min: 4, max: 4 }).custom(yearValidator),
    (0, express_validator_1.check)('email').isLength({ min: 5, max: 100 }).isEmail().custom(emailValidator),
    (req, res, next) => {
        (0, validate_1.validateResult)(req, res, next);
    }
];
exports.validateCreateCard = validateCreateCard;
