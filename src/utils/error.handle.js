"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHttp401 = exports.handleHttp404 = exports.handleHttp500 = void 0;
const handleHttp500 = (res, error, errorRaw) => {
    res.status(500);
    res.send({ error });
};
exports.handleHttp500 = handleHttp500;
const handleHttp404 = (res, error, errorRaw) => {
    res.status(404);
    res.send({ error });
};
exports.handleHttp404 = handleHttp404;
const handleHttp401 = (res, error, errorRaw) => {
    res.status(401);
    res.send({ error });
};
exports.handleHttp401 = handleHttp401;
