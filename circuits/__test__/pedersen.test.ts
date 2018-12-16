import * as snarkjs from 'snarkjs'
import * as compile from 'circom'
const pedersen = require('../../circomlib/src/pedersenHash.js')
const babyJub = require('../../circomlib/src/babyjub.js')

describe('Pedersen hash', async () => {
    let circuitDef: any
    let circuit: any
    beforeAll(async () => {
        const input = './circuits/pedersenHash.circom'
        circuitDef = await compile(input)
        circuit = new snarkjs.Circuit(circuitDef)
    })

    describe('input and output lengths', async () => {
        test('254-bit input', async () => {
            const witness = circuit.calculateWitness({ in: 0 })
            const xout = witness[circuit.getSignalIdx("main.out[0]")]
            const yout = witness[circuit.getSignalIdx("main.out[1]")]
            console.log(xout)
            console.log(yout)

            const zeroBuf = Buffer.alloc(32)
            console.log(babyJub.unpackPoint(pedersen.hash(zeroBuf)))
        })
    })
})
