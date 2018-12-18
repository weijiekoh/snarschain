"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const snarkjs = require("snarkjs");
const compile = require("circom");
const pedersen = require('../../circomlib/src/pedersenHash.js');
const babyJub = require('../../circomlib/src/babyjub.js');
const encodePedersen = (unpackedPoint) => {
    const xBuff = snarkjs.bigInt.leInt2Buff(unpackedPoint[0], 32);
    const yBuff = snarkjs.bigInt.leInt2Buff(unpackedPoint[1], 32);
    const result = Buffer.alloc(32);
    result[31] = yBuff[31];
    for (let i = 0; i < 31; i++) {
        result[i] = xBuff[i];
    }
    return snarkjs.bigInt.leBuff2int(result, 32);
};
describe('Pedersen hash', async () => {
    //describe('single pedersen hash', async () => {
    //let circuitDef: any
    //let circuit: any
    //beforeAll(async () => {
    //const input = './circuits/pedersenHash_test.circom'
    //circuitDef = await compile(input)
    //circuit = new snarkjs.Circuit(circuitDef)
    //})
    //const val = snarkjs.bigInt(1)
    //test('256-bit input', async () => {
    //const buff = snarkjs.bigInt.leInt2Buff(val, 32)
    //const hashed = pedersen.hash(buff)
    //const hashAsInt = snarkjs.bigInt.leBuff2int(hashed)
    //const result = babyJub.unpackPoint(hashed)
    //const encodedHash = encodePedersen(result)
    //console.log('input bytes', buff.length)
    //console.log('x', result[0].toString(16))
    //console.log('y', result[1].toString(16))
    //console.log('j', encodedHash.toString(16))
    //const witness = circuit.calculateWitness({ 
    //in: val.toString(),
    //})
    //const xout = witness[circuit.getSignalIdx("main.out[0]")]
    //const yout = witness[circuit.getSignalIdx("main.out[1]")]
    //const encodedOut = witness[circuit.getSignalIdx("main.encoded")]
    //console.log('c', encodedOut.toString(16))
    //expect(result[0].toString()).toEqual(xout.toString())
    //expect(result[1].toString()).toEqual(yout.toString())
    //expect(encodedOut.toString()).toEqual(encodedHash.toString())
    //})
    //})
    describe('double pedersen hash', async () => {
        let circuitDef;
        let circuit;
        beforeAll(async () => {
            const input = './circuits/pedersenHashDouble_test.circom';
            circuitDef = await compile(input);
            circuit = new snarkjs.Circuit(circuitDef);
        });
        test('two 256-bit inputs', async () => {
        });
    });
});
//# sourceMappingURL=pedersen.test.js.map