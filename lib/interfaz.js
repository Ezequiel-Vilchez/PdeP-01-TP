// Función para mostrar el menú
function menuPrincipal() {
    console.log("¿Qué deseas hacer?\n");

    console.log("[1] Ver Mis Tareas.");
    console.log("[2] Buscar una Tarea.");
    console.log("[3] Agregar una Tarea.");
    console.log("[4] Eliminar una Tarea.\n");
    
    console.log("[0] Salir.");
}

// Función para mostrar el menú de modificación
function menuModificar() {
    console.log(`¿Qué deseas modificar?\n`);

    console.log(`[1] Título`);
    console.log(`[2] Descripción`);
    console.log(`[3] Estado`);
    console.log(`[4] Prioridad`);
    console.log(`[5] Fecha Límite\n`);

    console.log(`[0] Volver al menú principal`);
}

function menuTareasAVer() {
    console.log("Qué tareas deseas ver? 📋\n");

    console.log("[1] Todas");
    console.log("[2] Pendientes");
    console.log("[3] En progreso");
    console.log("[4] Completadas");
    console.log("[5] Canceladas\n");

    console.log("[0] Volver al menú principal");
}

module.exports = {
    menuPrincipal,
    menuModificar,
    menuTareasAVer,
};