"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
const checkToken = (req, res, next) => {
    const token = req.headers.authorization || "";
    const tokenvalue = token.split(" ").pop();
    if (tokenvalue != "Secret") {
        res.status(401).send({ message: "Token not found" });
    }
    else {
        next();
    }
};
exports.checkToken = checkToken;
