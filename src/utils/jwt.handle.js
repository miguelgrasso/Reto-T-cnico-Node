"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "token.01010101";
//manejar card como nulo
const generateToken = (card) => {
    if (!card)
        throw new Error("NO CARD");
    const jwt = (0, jsonwebtoken_1.sign)(card, JWT_SECRET, {
        expiresIn: "1m",
    });
    return jwt;
};
exports.generateToken = generateToken;
const verifyToken = (jwt) => {
    const isOk = (0, jsonwebtoken_1.verify)(jwt, JWT_SECRET);
    return isOk;
};
exports.verifyToken = verifyToken;
