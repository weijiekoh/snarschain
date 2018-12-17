import * as snarkjs from 'snarkjs'
import * as compile from 'circom'
const pedersen = require('../../circomlib/src/pedersenHash.js')
const babyJub = require('../../circomlib/src/babyjub.js')

describe('Pedersen hash', async () => {
    let circuitDef: any
    let circuit: any
    beforeAll(async () => {
        console.log(babyJub.p.shr(snarkjs.bigInt(1)))
        const input = './circuits/pedersenHash.circom'
        circuitDef = await compile(input)
        circuit = new snarkjs.Circuit(circuitDef)
    })

    describe('input and output lengths', async () => {
        const val = snarkjs.bigInt(4)
        test('254-bit input', async () => {
            const buff = snarkjs.bigInt.leInt2Buff(val, 32)
            const hashed = pedersen.hash(buff)
            const hashAsInt = snarkjs.bigInt.leBuff2int(hashed)
            const result = babyJub.unpackPoint(hashed)

            console.log('y', result[1].toString(16))
            console.log('p', hashAsInt.toString(16))

            const witness = circuit.calculateWitness({ 
                in: val.toString(),
            })
            const xout = witness[circuit.getSignalIdx("main.out[0]")]
            const yout = witness[circuit.getSignalIdx("main.out[1]")]
            const packedOut = witness[circuit.getSignalIdx("main.packed")]

            console.log('c', packedOut.toString(16))

            expect(result[0].toString()).toEqual(xout.toString())
            expect(result[1].toString()).toEqual(yout.toString())
            expect(packedOut.toString()).toEqual(hashAsInt.toString())

        })
    })
})
