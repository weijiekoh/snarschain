import {bigInt} from 'snarkjs'
const pedersen = require('../../circomlib/src/pedersenHash.js')
const babyJub = require('../../circomlib/src/babyjub.js')

interface IPedersenHash {
    encodedHash: bigInt,
    babyJubX: bigInt,
    babyJubY: bigInt,
}

const pedersenHash = (val: bigInt): IPedersenHash => {
    const buff = bigInt.leInt2Buff(val, 32)
    const hashed = pedersen.hash(buff)
    const hashAsInt = bigInt.leBuff2int(hashed)
    const result = babyJub.unpackPoint(hashed)
    const encodedHash = encodePedersen(result)

    return {
        encodedHash,
        babyJubX: result[0],
        babyJubY: result[1],
    }
}

const pedersenHashDouble = (a: bigInt, b: bigInt): IPedersenHash => {
    return pedersenHash(joinEncodedHashes(a, b))
}

const joinEncodedHashes = (a: bigInt, b: bigInt): bigInt => {
    const bufA = bigInt.leInt2Buff(a, 32)
    const bufB = bigInt.leInt2Buff(b, 32)
    const resultBuf = Buffer.alloc(32);

    for (let i=0; i<16; i++) {
        resultBuf[i+16] = bufA[i];
        resultBuf[i] = bufB[i];
    }

    const result = bigInt.leBuff2int(resultBuf)

    return result
}

const encodePedersen = (unpackedPoint: bigInt[]): bigInt => {
    const xBuff = bigInt.leInt2Buff(unpackedPoint[0], 32)
    const yBuff = bigInt.leInt2Buff(unpackedPoint[1], 32)

    const result = Buffer.alloc(32)

    result[31] = yBuff[31];

    for (let i=0; i<31; i++) {
        result[i] = xBuff[i];
    }
    return bigInt.leBuff2int(result, 32)
}


export {
    pedersenHash,
    pedersenHashDouble,
    encodePedersen,
    joinEncodedHashes,
}
