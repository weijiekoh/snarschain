import { Circuit, bigInt } from 'snarkjs'
import * as compile from 'circom'
import { pedersenHash, pedersenHashDouble, encodePedersen, joinEncodedHashes } from '../../src/crypto/pedersen'

const pedersen = require('../../circomlib/src/pedersenHash.js')
const babyJub = require('../../circomlib/src/babyjub.js')

describe('Pedersen hash', async () => {

    describe('single pedersen hash', async () => {
        let circuitDef: any
        let circuit: any
        beforeAll(async () => {
            const input = './circuits/pedersenHash_test.circom'
            circuitDef = await compile(input)
            circuit = new Circuit(circuitDef)
        })


        test('hash one 32-byte input and encode x and y into 32 bytes', async () => {
            const val = bigInt(2344)
            const result = pedersenHash(val)

            const witness = circuit.calculateWitness({ 
                in: val.toString(),
            })
            const xout = witness[circuit.getSignalIdx("main.out[0]")]
            const yout = witness[circuit.getSignalIdx("main.out[1]")]
            const encodedOut = witness[circuit.getSignalIdx("main.encoded")]

            expect(result.babyJubX.toString()).toEqual(xout.toString())
            expect(result.babyJubY.toString()).toEqual(yout.toString())
            expect(encodedOut.toString()).toEqual(result.encodedHash.toString())

        })
    })
 
    describe('join two hashes', async () => {
        let circuitDef: any
        let circuit: any
        beforeAll(async () => {
            const input = './circuits/joinHashes_test.circom'
            circuitDef = await compile(input)
            circuit = new Circuit(circuitDef)
        })

        test('snip and concatenate two 32-byte inputs with a circuit', async () => {
            const a = bigInt('1234')
            const b = bigInt('4321')
            const result = joinEncodedHashes(a, b)

            const witness = circuit.calculateWitness({ 
                left: a.toString(),
                right: b.toString(),
            })
            const out = witness[circuit.getSignalIdx("main.out")]

            expect(result.toString(16)).toEqual(out.toString(16))
            expect(result.toString()).toEqual(out.toString())
        })
    })

    describe('snip, concatenate, and hash two 32-byte inputs with a circuit', async () => {
        let circuitDef: any
        let circuit: any
        beforeAll(async () => {
            const input = './circuits/pedersenHashDouble_test.circom'
            circuitDef = await compile(input)
            circuit = new Circuit(circuitDef)
        })

        test('two 256-bit inputs', async () => {
            const a = bigInt('1234')
            const b = bigInt('4321')

            const result = pedersenHashDouble(a, b)

            const witness = circuit.calculateWitness({ 
                left: a.toString(),
                right: b.toString(),
            })
            const xout = witness[circuit.getSignalIdx("main.out[0]")]
            const yout = witness[circuit.getSignalIdx("main.out[1]")]
            const encodedOut = witness[circuit.getSignalIdx("main.encoded")]

            expect(result.babyJubX.toString()).toEqual(xout.toString())
            expect(result.babyJubY.toString()).toEqual(yout.toString())
            expect(encodedOut.toString()).toEqual(result.encodedHash.toString())
        })
    })
})
