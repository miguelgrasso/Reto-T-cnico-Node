"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientDb = void 0;
const redis_1 = require("redis");
const clientDb = (0, redis_1.createClient)();
exports.clientDb = clientDb;
