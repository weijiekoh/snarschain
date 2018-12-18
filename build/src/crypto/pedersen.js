"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const snarkjs_1 = require("snarkjs");
const pedersen = require('../../circomlib/src/pedersenHash.js');
const babyJub = require('../../circomlib/src/babyjub.js');
const pedersenHash = (val) => {
    const buff = snarkjs_1.bigInt.leInt2Buff(val, 32);
    const hashed = pedersen.hash(buff);
    const hashAsInt = snarkjs_1.bigInt.leBuff2int(hashed);
    const result = babyJub.unpackPoint(hashed);
    const encodedHash = encodePedersen(result);
    return {
        encodedHash,
        babyJubX: result[0],
        babyJubY: result[1],
    };
};
exports.pedersenHash = pedersenHash;
const pedersenHashDouble = (a, b) => {
    return pedersenHash(joinEncodedHashes(a, b));
};
exports.pedersenHashDouble = pedersenHashDouble;
const joinEncodedHashes = (a, b) => {
    const bufA = snarkjs_1.bigInt.leInt2Buff(a, 32);
    const bufB = snarkjs_1.bigInt.leInt2Buff(b, 32);
    const resultBuf = Buffer.alloc(32);
    for (let i = 0; i < 16; i++) {
        resultBuf[i + 16] = bufA[i];
        resultBuf[i] = bufB[i];
    }
    const result = snarkjs_1.bigInt.leBuff2int(resultBuf);
    return result;
};
exports.joinEncodedHashes = joinEncodedHashes;
const encodePedersen = (unpackedPoint) => {
    const xBuff = snarkjs_1.bigInt.leInt2Buff(unpackedPoint[0], 32);
    const yBuff = snarkjs_1.bigInt.leInt2Buff(unpackedPoint[1], 32);
    const result = Buffer.alloc(32);
    result[31] = yBuff[31];
    for (let i = 0; i < 31; i++) {
        result[i] = xBuff[i];
    }
    return snarkjs_1.bigInt.leBuff2int(result, 32);
};
exports.encodePedersen = encodePedersen;
//# sourceMappingURL=pedersen.js.map