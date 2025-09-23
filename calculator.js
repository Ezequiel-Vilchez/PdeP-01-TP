
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Que quiere hacer: 1.suma - 2.resta - 3.multiplicación - 4.division? ", (opcion) => {
    opcion = parseInt(opcion);

    if (!isNaN(opcion) && opcion >= 1 && opcion <= 4) {
        rl.question("Ingrese el primer numero ", (n1) => {
            n1 = parseFloat(n1);
            if (!isNaN(n1)) {
                rl.question("Ingrese el segundo numero ", (n2) => {
                    n2 = parseFloat(n2);
                    if (!isNaN(n2)) {
                        let resultado;
                        switch (opcion) {
                            case 1:
                                resultado = n1 + n2;
                                break;
                            case 2:
                                resultado = n1 - n2;
                                break;
                            case 3:
                                resultado = n1 * n2;
                                break
                            case 4:
                                if (n2 !== 0) {
                                    resultado = n1 / n2;
                                } else {
                                    resultado = ("Error");
                                }
                                break;
                            default:
                                resultado = ("opcion no valida");
                        }
                        console.log("El resultado es: " + resultado);
                        rl.close();
                    } else {
                        console.log("Error: Entrada no valida");
                        rl.close();
                    }
                });
            } else {
                console.log("Error: Entrada no valida");
                rl.close();
            }
        });
    } else {
        console.log("Error: Entrada no valida");
        rl.close();
    }
});