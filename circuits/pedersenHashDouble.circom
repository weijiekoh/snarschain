include "./pedersenHash.circom";
include "./joinHashes.circom";
include "../node_modules/cirpedersen/circuits/bitify.circom";

template PedersenHashDouble() {
    signal input left;
    signal input right;
    signal output out[2];
    signal output encoded;

    component jh = JoinHashes();
    jh.left <== left;
    jh.right <== right;

    component n2b = Num2Bits(256);
    n2b.in <== jh.out;
    
    component pedersen = Pedersen(256);
    for (var m=0; m<256; m++) {
        pedersen.in[m] <-- n2b.out[m];
    }

    out[0] <== pedersen.out[0];
    out[1] <== pedersen.out[1];

    component encoder = EncodePedersenPoint();
    encoder.x <== pedersen.out[0];
    encoder.y <== pedersen.out[1];
    encoded <== encoder.out;
}
