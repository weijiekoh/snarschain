include "../node_modules/cirpedersen/circuits/pedersen.circom";
include "../node_modules/cirpedersen/circuits/bitify.circom";

template Main() {
    signal input in;
    signal output out[2];

    component n2b = Num2Bits(254);
    n2b.in <== in;

    component pedersen = Pedersen(254);
    for (var i=0; i<254; i++) {
        pedersen.in[i] <-- n2b.out[i];
    }
    
    out[0] <-- pedersen.out[0];
    out[1] <-- pedersen.out[1];
}

component main = Main();
