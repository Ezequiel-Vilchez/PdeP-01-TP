// =======================
// Menú Principal en Node.js
// =======================

const { input, close } = require("./lib/nodeImperativo");

// Lista de tareas en memoria
let tareas = [];

// Función para mostrar el menú
function mostrarMenu() {
  console.log("\n¡Hola Olivia!");
  console.log("¿Qué deseas hacer?");
  console.log("[1] Ver Mis Tareas.");
  console.log("[2] Buscar una Tarea.");
  console.log("[3] Agregar una Tarea.");
  console.log("[0] Salir.");
}

// Función principal (main)
async function main() {
  let opcion;

  do {
    mostrarMenu();
    opcion = await input("> ");

    switch (opcion) {
      case "1":
          console.log("👀 Ver mis tareas");
        break;

      case "2":
        console.log("🔍 Buscar una Tarea");
        break;

      case "3":
        console.log("➕ Agregar una Tarea");
        break;

      case "0":
        console.log("👋 Saliendo del sistema...");
        break;

      default:
        console.log("Opción inválida. Por favor, ingrese una opción del menú.");
    }

  } while (opcion !== "0");

  close();
}

// Ejecutar el programa
main();
