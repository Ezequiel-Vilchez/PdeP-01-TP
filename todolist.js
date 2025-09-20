// =======================
// Menú Principal en Node.js
// =======================

const { input, close } = require("./lib/nodeImperativo");

// Lista de tareas en memoria

// [titulo principal, descipcion, 'terminado, en curso, pendiente y canceladas', 'facil, medio y dificil', vencimiento, creacion]

let tareas = [
    {
        titulo: "Java",
        descripcion: "Aprender Java desde cero",
        estado: "en progreso",
        prioridad: 2,
        fechaLimite: "2024-12-31",
        fechaInicio: "2024-06-01",
    },
    {
        titulo: "JavaScript",
        descripcion: "Dominar JavaScript y sus frameworks",
        estado: "en progreso",
        prioridad: 3,
        fechaLimite: "2024-11-30",
        fechaInicio: "2024-06-05",
    },
    {
        titulo: "Python",
        descripcion: "Aprender Python para análisis de datos",
        estado: "completada",
        prioridad: 1,
        fechaLimite: "2024-10-15",
        fechaInicio: "2024-05-20",
    },
    {
        titulo: "HTML",
        descripcion: "Aprender HTML y CSS",
        estado: "pendiente",
        prioridad: 2,
        fechaLimite: "2024-12-31",
        fechaInicio: "2024-06-01",
    },
    {
        titulo: "C++",
        descripcion: "Aprender C++ para desarrollo de sistemas",
        estado: "pendiente",
        prioridad: 3,
        fechaLimite: "2025-01-15",
        fechaInicio: "2024-06-10",
    },
];

function limpiarConsola() {
    console.clear();
}


// Función para mostrar el menú
function mostrarMenuPrincipal() {
    console.log("¿Qué deseas hacer?\n");
    console.log("[1] Ver Mis Tareas.");
    console.log("[2] Buscar una Tarea.");
    console.log("[3] Agregar una Tarea.");
    console.log("[4] Eliminar una Tarea.\n");
    console.log("[0] Salir.");
}

// Función para mostrar el menú de modificación
function mostrarMenuModificar() {
    console.log(`¿Qué deseas modificar?\n`);
    console.log(`[1] Título`);
    console.log(`[2] Descripción`);
    console.log(`[3] Estado`);
    console.log(`[4] Prioridad`);
    console.log(`[5] Fecha Límite\n`);
    console.log(`[0] Volver al menú principal`);
}

function hayTareas(tareas, estado) {
    return tareas.some((tarea) => tarea.estado === estado);
}


// Función principal (main)
async function main() {
    // Declaración de variables
    let opMenuPrincipal;
    let idTareasFiltradas = [], opVerDetalles;
    let estadoFiltro;
    let opModificarItemTarea;
    let nuevoValorItemTarea;


    limpiarConsola();

    const nombre = await input("¿Cuál es tu nombre? \n\n> ");

    limpiarConsola();

    console.log(`¡Hola ${nombre}!\n`);

    do {
        mostrarMenuPrincipal();
        opMenuPrincipal = parseInt(await input("\n> "), 10);

        switch (opMenuPrincipal) {
            case 1:
                if (tareas.length === 0) {
                    console.log(`Excelente ${nombre}, no tienes tareas pendientes. 🎉`);
                    await input("\nPresiona ENTER para continuar...");
                    limpiarConsola();
                    break;
                } else {
                    limpiarConsola();

                    let opFiltro;

                    do {
                        limpiarConsola();
                        console.log("Qué tareas deseas ver? 📋\n");
                        console.log("[1] Todas");
                        console.log("[2] Pendientes");
                        console.log("[3] En progreso");
                        console.log("[4] Completadas");
                        console.log("[5] Canceladas\n");
                        console.log("[0] Volver al menú principal");

                        // Pedir al usuario que elija una opción
                        opFiltro = parseInt(await input("\n> "), 10);

                        // Validar la entrada del usuario sea un número entre 0 y 5
                        if (isNaN(opFiltro) || opFiltro < 0 || opFiltro > 5) {
                            limpiarConsola();
                            console.log("Opción inválida. Por favor, ingrese una opción del menú.");
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
                        estadoFiltro = "pendiente";
                    } else if (opFiltro === 3) {
                        estadoFiltro = "en progreso";
                    } else if (opFiltro === 4) {
                        estadoFiltro = "completada";
                    } else if (opFiltro === 5) {
                        estadoFiltro = "cancelada";
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
                            mostrarMenuModificar();

                            // Leer la opción del usuario
                            opModificarItemTarea = parseInt(await input("\n> "), 10);

                            switch (opModificarItemTarea) {
                                // Modificar título
                                case 1:
                                    nuevoValorItemTarea = await input(`Nuevo Título:\n\n> `);
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
                                    nuevoValorItemTarea = await input(
                                        `\nPor favor, ingrese el nuevo estado (pendiente, en progreso, completada, cancelada):\n\n> `
                                    );
                                    if (
                                        [
                                            "pendiente",
                                            "en progreso",
                                            "completada",
                                            "cancelada",
                                        ].includes(nuevoValorItemTarea.trim())
                                    ) {
                                        tareas[opVerDetalles].estado = nuevoValorItemTarea;
                                        console.log("\nEstado actualizado con éxito.");
                                        await input("\nPresiona ENTER para continuar...");
                                        limpiarConsola();
                                    } else {
                                        console.log("\nEstado inválido. No se realizaron cambios.");
                                        await input("\nPresiona ENTER para continuar...");
                                        limpiarConsola();
                                    }
                                    break;

                                // Modificar prioridad
                                case 4:
                                    nuevoValorItemTarea = await input(`Nueva Prioridad (1-3):\n\n> `);
                                    if (["1", "2", "3"].includes(nuevoValorItemTarea.trim())) {
                                        tareas[opVerDetalles].prioridad = parseInt(nuevoValorItemTarea, 10);
                                        console.log("\nPrioridad actualizada con éxito.");
                                        await input("\nPresiona ENTER para continuar...");
                                        limpiarConsola();
                                    } else {
                                        console.log(
                                            "\nPrioridad inválida. No se realizaron cambios."
                                        );
                                        await input("\nPresiona ENTER para continuar...");
                                        limpiarConsola();
                                    }
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

            case 3:
                limpiarConsola();
                console.log("Agregar una Tarea ➕\n");

                let titulo, descripcion, estado, prioridad, fechaLimite;

                do {
                    titulo = await input(
                        `Por favor ${nombre}, ingrese el título de la nueva tarea\n\n> `
                    );

                    if (titulo.trim() === "") {
                        console.log("\nEl título de la tarea no puede estar vacío.");

                        await input("\nPresiona ENTER para intentar de nuevo...");
                        limpiarConsola();
                    }
                } while (titulo.trim() === "");

                limpiarConsola();

                do {
                    descripcion = await input(
                        `Por favor ${nombre}, ingrese la descripción de la nueva tarea\n\n> `
                    );

                    if (descripcion.trim() === "") {
                        console.log("\nLa descripción de la tarea no puede estar vacía.");

                        await input("\nPresiona ENTER para intentar de nuevo...");
                        limpiarConsola();
                    }
                } while (descripcion.trim() === "");

                limpiarConsola();

                do {
                    estado = await input(
                        `Por favor ${nombre}, ingrese el estado de la nueva tarea (pendiente, en progreso, completada, cancelada)\n\n> `
                    );

                    if (
                        ["pendiente", "en progreso", "completada", "cancelada"].includes(
                            estado.trim()
                        )
                    ) {
                        break;
                    } else {
                        console.log(
                            "\nEstado inválido. Por favor, ingrese un estado válido."
                        );
                        await input("\nPresiona ENTER para intentar de nuevo...");
                        limpiarConsola();
                    }
                } while (
                    estado.trim() === "" ||
                    !["pendiente", "en progreso", "completada", "cancelada"].includes(
                        estado.trim()
                    )
                );

                limpiarConsola();

                do {
                    prioridad = await input(
                        `Por favor ${nombre}, ingrese la prioridad de la nueva tarea (1-3)\n\n> `
                    );

                    if (["1", "2", "3"].includes(prioridad.trim())) {
                        limpiarConsola();
                        break;
                    } else {
                        console.log(
                            "\nPrioridad inválida. Por favor, ingrese una prioridad válida (1, 2 o 3)."
                        );
                        await input("\nPresiona ENTER para intentar de nuevo...");
                        limpiarConsola();
                    }
                } while (
                    prioridad.trim() === "" ||
                    !["1", "2", "3"].includes(prioridad.trim())
                );

                limpiarConsola();

                const fechaInicio = new Date().toISOString().split("T")[0]; // Fecha actual en formato YYYY-MM-DD
                do {
                    fechaLimite = await input(
                        `Por favor ${nombre}, ingrese la fecha límite de la nueva tarea (YYYY-MM-DD)\n\n> `
                    );
                } while (isNaN(Date.parse(fechaLimite)));

                tareas.push({
                    titulo,
                    descripcion,
                    estado,
                    prioridad: parseInt(prioridad, 10),
                    fechaLimite,
                    fechaInicio,
                });
                console.log(`\nTarea agregada con éxito.`);

                await input("\nPresiona ENTER para continuar...");
                limpiarConsola();
                break;

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

            case 0:
                limpiarConsola();
                break;

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
