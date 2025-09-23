// =======================
// Menú Principal en Node.js
// =======================

const { input, close } = require("./lib/nodeImperativo");
const { menuPrincipal, menuModificar, menuTareasAVer } = require("./lib/interfaz");
// const { setEntrada } = require('./lib/funciones');


// Lista de tareas en memoria

// [titulo principal, descipcion, 'terminado, en curso, pendiente y canceladas', 'facil, medio y dificil', vencimiento, creacion]

const arrayEstados = [
    "pendiente",
    "en progreso",
    "completada",
    "cancelada"
];
const arrayPrioridad = [
    "++----",
    "++++--",
    "++++++"
];

let tareas = [
    {
        titulo: "Lavar la ropa",
        descripcion: "Separar por colores y usar jabón líquido",
        estado: arrayEstados[0],
        prioridad: arrayPrioridad[1],
        fechaLimite: "2025-09-24",
        fechaInicio: "2025-09-23",
    },
    {
        titulo: "Comprar repuesto de la moto",
        descripcion: "Buscar bujía y filtro de aire en la ferretería de la esquina",
        estado: arrayEstados[1],
        prioridad: arrayPrioridad[2],
        fechaLimite: "2025-09-25",
        fechaInicio: "2025-09-22",
    },
    {
        titulo: "Pintar la casa",
        descripcion: "Empezar por el living, usar pintura lavable",
        estado: arrayEstados[0],
        prioridad: arrayPrioridad[2],
        fechaLimite: "2025-10-10",
        fechaInicio: "2025-09-28",
    },
    {
        titulo: "Hacer compras del súper",
        descripcion: "Leche, pan, yerba, fideos, y algo dulce",
        estado: arrayEstados[2],
        prioridad: arrayPrioridad[0],
        fechaLimite: "2025-09-22",
        fechaInicio: "2025-09-22",
    },
    {
        titulo: "Llevar al perro al veterinario",
        descripcion: "Control de vacunas y revisión general",
        estado: arrayEstados[0],
        prioridad: arrayPrioridad[1],
        fechaLimite: "2025-09-30",
        fechaInicio: "2025-09-23",
    },
];


const limpiarConsola = () => {
    console.clear();
}

const hayTareas = (tareas, estado) => {
    return tareas.some((tarea) => tarea.estado === estado);
}


// function hayTareas(tareas, estado) {
//     return tareas.some((tarea) => tarea.estado === estado);
// }

// Declaración de variables
let opMenuPrincipal;
let idTareasFiltradas = [], opVerDetalles;
let estadoFiltro;
let opModificarItemTarea;
let nuevoValorItemTarea;

// Función principal (main)
async function main() {

    limpiarConsola();

    const nombre = await input("¿Cuál es tu nombre? \n\n> ");

    limpiarConsola();

    console.log(`¡Hola ${nombre}!\n`);

    do {
        menuPrincipal();
        opMenuPrincipal = parseInt(await input("\n> "), 10);

        switch (opMenuPrincipal) {

            // [1] Ver Mis Tareas.
            case 1:
                if (tareas.length === 0) {
                    limpiarConsola();
                    console.log(`Excelente ${nombre}, no tienes tareas pendientes. 🎉`);
                    await input("\nPresiona ENTER para continuar...");
                    limpiarConsola();
                    break;
                } else {
                    limpiarConsola();

                    let opFiltro;

                    do {
                        limpiarConsola();

                        menuTareasAVer();
                        // Pedir al usuario que elija una opción
                        opFiltro = parseInt(await input("\n> "), 10);

                        // Validar la entrada del usuario sea un número entre 0 y 5
                        if (isNaN(opFiltro) || opFiltro < 0 || opFiltro > 5) {
                            limpiarConsola();
                            console.log("\nOpción inválida. Por favor, ingrese una opción del menú.");
                            await input("\nPresiona ENTER para continuar...");
                        }

                        // Salir si el usuario elige 0
                        if (opFiltro === 0) {
                            limpiarConsola();
                            break;
                        }
                    } while (isNaN(opFiltro) || opFiltro < 0 || opFiltro > 5);



                    // Guardar el estado seleccionado para filtrar
                    if (opFiltro === 1) {
                        estadoFiltro = "todas";
                    } else if (opFiltro === 2) {
                        estadoFiltro = arrayEstados[0];
                    } else if (opFiltro === 3) {
                        estadoFiltro = arrayEstados[1];
                    } else if (opFiltro === 4) {
                        estadoFiltro = arrayEstados[2];
                    } else if (opFiltro === 5) {
                        estadoFiltro = arrayEstados[3];
                    } else if (opFiltro === 0) {
                        break; // Volver al menú principal
                    } else {
                        limpiarConsola();
                        console.log("Opción inválida. Por favor, ingrese una opción del menú.");
                        await input("\nPresiona ENTER para continuar...");
                        limpiarConsola();
                        break;
                    }

                    limpiarConsola();

                    // Mostrar las tareas filtradas
                    let mostrarDetalles = false; // <-- Agrega esta variable de control
                    do {
                        idTareasFiltradas = []; // <-- Vacía el array antes de cada filtrado

                        // Muestra al usuario las tareas según el filtro seleccionado
                        if (estadoFiltro === "todas") {
                            console.log(`${nombre}, todas tus tareas son las siguientes: 👀\n`);
                            tareas.forEach((tarea, index) => {
                                console.log(`[${index}] - ${tarea.titulo}`);
                                idTareasFiltradas.push(index);
                            });
                            mostrarDetalles = true;
                        } else {
                            if (!hayTareas(tareas, estadoFiltro)) {
                                console.log(`No hay tareas con estado "${estadoFiltro}".`);
                                await input("\nPresiona ENTER para continuar...");
                                limpiarConsola();
                                mostrarDetalles = false;
                                break; // Sale del bucle y NO pregunta por modificar
                            } else {
                                console.log(`${nombre}, tus tareas ${estadoFiltro} son las siguientes: 👀\n`);
                                tareas.forEach((tarea, index) => {
                                    if (estadoFiltro === tarea.estado) {
                                        console.log(`[${index}] - ${tarea.titulo}`);
                                        idTareasFiltradas.push(index);
                                    }
                                });
                                mostrarDetalles = true;
                            }
                        }

                        // Pedir al usuario que ingrese el ID de la tarea para ver más detalles
                        opVerDetalles = await input(
                            `\nIngrese el ID para ver más detalles.\n\n> `
                        );

                        // Validar que el ID ingresado sea válido
                        if (idTareasFiltradas.includes(parseInt(opVerDetalles, 10))) {
                            tareas.forEach((tarea, index) => {
                                if (index == opVerDetalles) {
                                    limpiarConsola();
                                    console.log(`Detalles de la tarea:\n`);
                                    console.log(`Título: ${tarea.titulo}`);
                                    console.log(`Descripción: ${tarea.descripcion}`);
                                    console.log(`Estado: ${tarea.estado}`);
                                    console.log(`Prioridad: ${tarea.prioridad}`);
                                    console.log(`Fecha de Inicio: ${tarea.fechaInicio}`);
                                    console.log(`Fecha Límite: ${tarea.fechaLimite}`);
                                }
                            });
                        } else {
                            console.log("\nID de tarea inválido.");
                            await input("\nPresiona ENTER para continuar...");
                            limpiarConsola();
                        }
                    } while (!idTareasFiltradas.includes(parseInt(opVerDetalles, 10)));

                    // Solo pregunta si mostrarDetalles es true
                    if (mostrarDetalles) {
                        // Pregunta al usuario si desea modificar algún campo
                        console.log(`\n¿Deseas modificar algun ítem de la tarea?\n`);
                        console.log(`[1] Sí`);
                        console.log(`[2] No`);

                        // Leer la opción del usuario
                        let opModificar = parseInt(await input("\n> "), 10);

                        // Validar la entrada del usuario
                        if (opModificar === 1) {
                            limpiarConsola();
                            menuModificar();

                            // Leer la opción del usuario
                            opModificarItemTarea = parseInt(await input("\n> "), 10);

                            switch (opModificarItemTarea) {
                                // Modificar título
                                case 1:
                                    nuevoValorItemTarea = await input(`\nNuevo Título:\n\n> `);
                                    tareas[opVerDetalles].titulo = nuevoValorItemTarea;
                                    console.log("\nTítulo actualizado con éxito.");
                                    await input("\nPresiona ENTER para continuar...");
                                    limpiarConsola();
                                    break;

                                // Modificar descripción
                                case 2:
                                    nuevoValorItemTarea = await input(`Nueva Descripción:\n\n> `);
                                    tareas[opVerDetalles].descripcion = nuevoValorItemTarea;
                                    console.log("\nDescripción actualizada con éxito.");
                                    await input("\nPresiona ENTER para continuar...");
                                    limpiarConsola();
                                    break;

                                // Modificar estado
                                case 3:

                                    let opEstado;

                                    do {
                                        limpiarConsola();
                                        console.log("Ingrese el nuevo estado:\n");
                                        console.log(`[0] - ${arrayEstados[0]}`);
                                        console.log(`[1] - ${arrayEstados[1]}`);
                                        console.log(`[2] - ${arrayEstados[2]}`);
                                        console.log(`[3] - ${arrayEstados[3]}`);

                                        opEstado = parseInt(await input(`\n> `));

                                        if (opEstado < 0 || opEstado > 3) {
                                            console.log("\nOpción inválida. Por favor vuelva a intentar.");
                                            await input("\nPresiona ENTER para intentar de nuevo...");
                                            limpiarConsola();
                                        } else {
                                            tareas[opVerDetalles].estado = arrayEstados[opEstado];
                                            console.log("\nEstado actualizado con éxito.");
                                            await input("\nPresiona ENTER para continuar...");
                                            limpiarConsola();
                                        }

                                    } while (opEstado < 0 || opEstado > 3);
                                    break;

                                // Modificar prioridad
                                case 4:

                                    let opPrioridad;

                                    do {
                                        limpiarConsola();
                                        console.log("Nueva Prioridad:\n");
                                        console.log(`[0]  ${arrayPrioridad[0]}`);
                                        console.log(`[1]  ${arrayPrioridad[1]}`);
                                        console.log(`[2]  ${arrayPrioridad[2]}`);

                                        opPrioridad = parseInt(await input(`\n> `));

                                        if (opPrioridad >= 0 && opPrioridad <= 3) {
                                            tareas[opVerDetalles].prioridad = arrayPrioridad[opPrioridad];
                                            console.log("\nPrioridad actualizada con éxito.");
                                            await input("\nPresiona ENTER para continuar...");
                                            limpiarConsola();
                                        } else {
                                            console.log("\nPrioridad inválida. No se realizaron cambios.");
                                            await input("\nPresiona ENTER para continuar...");
                                            limpiarConsola();
                                        }
                                    } while (!(opPrioridad >= 0 && opPrioridad <= 3))

                                    break;

                                // Modificar fecha límite
                                // Falta terminar
                                case 5:
                                    nuevoValorItemTarea = await input(
                                        `Nueva Fecha Límite (YYYY-MM-DD):\n\n> `
                                    );
                                    if (!isNaN(Date.parse(nuevoValorItemTarea))) {
                                        tareas[opVerDetalles].fechaLimite = nuevoValorItemTarea;
                                        console.log("\nFecha Límite actualizada con éxito.");
                                        await input("\nPresiona ENTER para continuar...");
                                        limpiarConsola();
                                    } else {
                                        console.log("\nFecha inválida. No se realizaron cambios.");
                                        await input("\nPresiona ENTER para continuar...");
                                        limpiarConsola();
                                    }
                                    break;

                                // Volver al menú principal
                                case 0:
                                    console.log("\nVolviendo al menú principal...");
                                    break;

                                // Opción inválida
                                default:
                                    console.log("\nOpción inválida. No se realizaron cambios.");
                                    break;
                            }
                        } else if (opModificar === 2) {
                            // El usuario no desea modificar nada. Volver al menú principal.
                            limpiarConsola();
                            break;
                        } else {
                            // Opción inválida
                            console.log("\nOpción inválida. Volviendo al menú principal...");
                            await input("\nPresiona ENTER para continuar...");
                            limpiarConsola();
                        }
                    }
                }
                break;

            // [2] Buscar una Tarea.
            case 2:
                limpiarConsola();

                if (tareas.length === 0) {
                    console.log(
                        "Tu lista de tareas está vacía. No hay nada que buscar. 🔍"
                    );
                    await input("\nPresiona ENTER para continuar...");
                    limpiarConsola();
                    break;
                }

                const terminoBusqueda = await input(
                    `Por favor ${nombre}, ingresa el término de búsqueda:\n\n> `
                );

                const resultados = tareas.filter((tarea) =>
                    tarea.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase())
                );

                if (resultados.length > 0) {
                    console.log("\nResultados de la búsqueda:\n");

                    resultados.forEach((tarea) => {
                        console.log(`- ${tarea.titulo}`);
                    });
                } else {
                    console.log(
                        "\nNo se encontraron tareas que coincidan con la búsqueda."
                    );
                }

                await input("\nPresiona ENTER para continuar...");
                limpiarConsola();
                break;

            // [3] Agregar una Tarea.
            case 3:
                limpiarConsola();
                console.log("Agregar una Tarea ➕\n");

                // Variables locales para agregar tareas.
                let titulo, descripcion, estado, prioridad, fechaLimite;
                let opEstado, opPrioridad;


                // Agregando título.
                do {
                    titulo = await input(`Por favor ${nombre}, ingrese el título de la nueva tarea\n\n> `);

                    if (titulo.trim() === "") {
                        console.log("\nEl título de la tarea no puede estar vacío.");
                        await input("\nPresiona ENTER para intentar de nuevo...");
                        limpiarConsola();
                    }
                } while (titulo.trim() === "");
                limpiarConsola();

                // Agregando descrición.
                do {
                    descripcion = await input(`Por favor ${nombre}, ingrese la descripción de la nueva tarea\n\n> `);

                    if (descripcion.trim() === "") {
                        console.log("\nLa descripción de la tarea no puede estar vacía.");
                        await input("\nPresiona ENTER para intentar de nuevo...");
                        limpiarConsola();
                    }
                } while (descripcion.trim() === "");
                limpiarConsola();

                // Agregando estado.
                do {
                    console.log("Ingrese el estado:\n");
                    console.log(`[0] - ${arrayEstados[0]}`);
                    console.log(`[1] - ${arrayEstados[1]}`);
                    console.log(`[2] - ${arrayEstados[2]}`);
                    console.log(`[3] - ${arrayEstados[3]}`);

                    opEstado = parseInt(await input(`\n> `));

                    if (opEstado < 0 || opEstado > 3) {
                        console.log("\nOpción inválida. Por favor vuelva a intentar.");
                        await input("\nPresiona ENTER para intentar de nuevo...");
                        limpiarConsola();
                    } else {
                        estado = arrayEstados[opEstado];
                        limpiarConsola();
                    }

                } while (opEstado < 0 || opEstado > 3);
                limpiarConsola();

                // Agregando prioridad.
                do {
                    console.log("Nueva Prioridad:\n");
                    console.log(`[0]  ${arrayPrioridad[0]}`);
                    console.log(`[1]  ${arrayPrioridad[1]}`);
                    console.log(`[2]  ${arrayPrioridad[2]}`);

                    opPrioridad = parseInt(await input(`\n> `));

                    if (opPrioridad >= 0 && opPrioridad <= 3) {
                        prioridad = arrayPrioridad[opPrioridad];
                        limpiarConsola();
                    } else {
                        console.log("\nPrioridad inválida. No se realizaron cambios.");
                        await input("\nPresiona ENTER para continuar...");
                        limpiarConsola();
                    }
                } while (!(opPrioridad >= 0 && opPrioridad <= 3))

                // Agregando fecha inicio.
                const fechaInicio = new Date().toISOString().split("T")[0]; // Fecha actual en formato YYYY-MM-DD

                // Agregando fecha fin.
                do {
                    fechaLimite = await input(
                        `Por favor ${nombre}, ingrese la fecha límite de la nueva tarea (YYYY-MM-DD)\n\n> `
                    );
                } while (isNaN(Date.parse(fechaLimite)));

                tareas.push({
                    titulo,
                    descripcion,
                    estado,
                    prioridad,
                    fechaLimite,
                    fechaInicio,
                });
                console.log(`\nTarea agregada con éxito.`);

                await input("\nPresiona ENTER para continuar...");
                limpiarConsola();
                break;

            // [4] Eliminar una Tarea.
            case 4:
                limpiarConsola();

                if (tareas.length === 0) {
                    console.log(
                        "Tu lista de tareas está vacía. No hay nada que eliminar. 🗑️"
                    );
                    await input("\nPresiona ENTER para continuar...");
                    limpiarConsola();
                    break;
                } else {
                    let idBorrar;

                    do {
                        console.log("Eliminar una Tarea ❌\n");
                        tareas.forEach((tarea, index) => {
                            console.log(`[${index}] ${tarea.titulo}`);
                        });

                        console.log(
                            `\nPor favor ${nombre}, ingrese el ID del item a borrar.\n`
                        );
                        idBorrar = await input("> ");
                        idBorrar = parseInt(idBorrar, 10);

                        if (!isNaN(idBorrar) && idBorrar >= 0 && idBorrar < tareas.length) {
                            tareas.splice(idBorrar, 1);
                            console.log("\nTarea eliminada con éxito.");
                            break;
                        } else {
                            console.log("\nID de tarea inválido.");
                            await input("\nPresiona ENTER para intentar de nuevo...");
                            limpiarConsola();
                        }
                        limpiarConsola();
                    } while (
                        isNaN(idBorrar) ||
                        idBorrar < 0 ||
                        idBorrar >= tareas.length
                    );
                }
                await input("\nPresiona ENTER para continuar...");
                limpiarConsola();
                break;

            // [0] Salir.
            case 0:
                limpiarConsola();
                break;

            // Opción inválida.
            default:
                limpiarConsola();
                console.log("Opción inválida. Por favor, ingrese una opción del menú.");
                await input("\nPresiona ENTER para continuar...");
                limpiarConsola();
                break;
        }
    } while (opMenuPrincipal !== 0);

    close();
}

// Ejecutar el programa
main();
