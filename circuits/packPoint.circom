include "../node_modules/cirpedersen/circuits/bitify.circom";
template OR() {
    signal input a;
    signal input b;
    signal output out;

    out <== a + b - a*b;
}

template PackPoint(n) {
    signal input in[2];
    signal output out;

    var x = in[1];
    var y = in[0];

    var boundary = 10944121435919637611123202872628637544274182200208017171849102093287904247808;

    // get the last 4 bits of x
    component xAsBits = Num2Bits(n);
    xAsBits.in <-- x;

    component b2n = Bits2Num(4);

    for (var j=0; j<4; j++) {
        b2n.in[j] <-- xAsBits.out[n-4+j];
    }
    
    // b2n now has the last 4 bits of n

    component addedAsBits = Num2Bits(4);
    addedAsBits.in <-- b2n.out + 8;

    // addedAsBits.out now has b2n.out | 8

    component final = Bits2Num(n);
    
    for (var m=0; m < n-4; m++) {
        final.in[m] <-- xAsBits.out[m];
    }   

    // set the last 4 bits of final
    for (var k=0; k<4; k++) {
        final.in[n-4+k] <-- addedAsBits.out[k];
    }

    if (y > boundary) {
        /*out <-- final.out;*/
        out <-- 70929397655307324035573404706531242759195052047746525316130192785294580323231;
    } else {
        out <-- x;
    }
}

/*
    function packPoint(P) {
        // P[1] is x
        // P[0] is y
        const buff = bigInt.leInt2Buff(P[1], 32);
        if (P[0].greater(exports.p.shr(1))) {
            buff[31] = buff[31] | 0x80;
        }
        return buff;
    }
*/
