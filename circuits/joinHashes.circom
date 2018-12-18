include "../node_modules/cirpedersen/circuits/bitify.circom";

//  Concat the 16 most significant bytes of each input into a single 32-byte output

template JoinHashes() {
    signal input left;
    signal input right;
    signal input out;

    component leftAsBits = Num2Bits(256);
    component rightAsBits = Num2Bits(256);
    leftAsBits.in <== left;
    rightAsBits.in <== right;

    component b2n = Bits2Num(256);
    for (var i=0; i<128; i++) {
        b2n.in[i + 128] <== leftAsBits.out[i];
        b2n.in[i] <== rightAsBits.out[i];
    }

    out <== b2n.out;
}
