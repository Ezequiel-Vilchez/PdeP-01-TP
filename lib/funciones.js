// Numer() ---> Convierte un string a número
// parseInt() ---> Convierte un string a entero
// parseFloat() ---> Convierte un string a float
// isNaN() ---> Devuelve true si el valor no es un número
// isInteger() ---> Devuelve true si el valor es un entero

// String() ---> Convierte un número a string


// No trabaja con objetos
const setEntrada = (entrada) => {

    // Casos en donde no se modifica la entrada
    if (entrada === "") { return entrada; }
    if (entrada === undefined) { return entrada; }
    if (entrada === null) { return null; }

    // Almacena temporalmente entrada original antes de manupularlo
    const temporal = entrada;

    // Intenta convertir el entrada en un número.
    entrada = Number(entrada);

    // Pregunta si es un número
    if (!isNaN(entrada)) {

        // Pregunta si es un número entero
        if (Number.isInteger(entrada)) {

            // retorna un número entero
            return entrada;
        } else {

            // Retorna un número flotante
            return entrada;
        }
    } else {

        // Descarta manupulaciones de entrada (resultado string)
        entrada = temporal;
        return entrada;
    }
};

module.exports = { setEntrada };