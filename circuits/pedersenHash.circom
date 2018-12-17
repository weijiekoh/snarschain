include "../node_modules/cirpedersen/circuits/pedersen.circom";
include "./packPoint.circom";

template Main() {
    signal input in;
    signal output out[2];
    signal output packed;

    component n2b = Num2Bits_strict();
    n2b.in <== in;

    component pedersen = Pedersen(254);
    for (var m=0; m<254; m++) {
        pedersen.in[m] <-- n2b.out[m];
    }
    
    out[0] <== pedersen.out[0];
    out[1] <== pedersen.out[1];

    component pack = PackPoint(256);
    pack.in[0] <== pedersen.out[0];
    pack.in[1] <== pedersen.out[1];
    packed <== pack.out;
}

component main = Main();
