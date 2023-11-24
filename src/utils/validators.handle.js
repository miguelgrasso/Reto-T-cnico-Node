"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.luhnCheck = void 0;
const luhnCheck = (num) => {
    let arr = (num + '')
        .split('')
        .reverse()
        .map(x => parseInt(x));
    let lastDigit = arr.splice(0, 1)[0];
    let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val)), 0);
    sum += lastDigit;
    return sum % 10 === 0;
};
exports.luhnCheck = luhnCheck;
