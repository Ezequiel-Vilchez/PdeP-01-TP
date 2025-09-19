// =======================
// Menú Principal en Node.js
// =======================

const { input, close } = require("./lib/nodeImperativo");

// Lista de tareas en memoria
let tareas = [];

// Función para mostrar el menú
function mostrarMenu() {
  console.log("¿Qué deseas hacer?\n");
  console.log("[1] Ver Mis Tareas.");
  console.log("[2] Buscar una Tarea.");
  console.log("[3] Agregar una Tarea.");
  console.log("[4] Eliminar una Tarea.\n");
  console.log("[0] Salir.");
}

// Función principal (main)
async function main() {

  let opcion;
  console.clear();

  const nombre = await input("¿Cuál es tu nombre? \n\n> ");

  console.clear();


  console.log(`¡Hola ${nombre}!\n`);

  do {
    mostrarMenu();
    opcion = parseInt(await input("\n> "), 10);

    switch (opcion) {
      case 1:
        console.clear();

        if (tareas.length === 0) {
          console.log(`Excelente ${nombre}, no tienes tareas pendientes. 🎉`);
          await input("\nPresiona ENTER para continuar...");
          console.clear();
          break;
        } else {
          console.log(`${nombre}, tus tareas son las siguientes: 👀\n`);
          for (const tarea of Object.values(tareas)) {
            console.log(`- ${tarea}`);
          }

        }

        await input("\nPresiona ENTER para continuar...");
        console.clear();
        break;

      case 2:
        console.clear();

        if (tareas.length === 0) {
          console.log("Tu lista de tareas está vacía. No hay nada que buscar. 🧐");
          await input("\nPresiona ENTER para continuar...");
          console.clear();
          break;
        } else {
          console.log("Buscar una Tarea 🔍\n");

          const busqueda = await input("Ingrese el término de búsqueda: ");
          const resultados = Object.entries(tareas).filter(([id, tarea]) =>
            tarea.toLowerCase().includes(busqueda.toLowerCase())
          );

          if (resultados.length > 0) {
            console.log("\nResultados de la búsqueda:\n");
            resultados.forEach(([id, tarea]) => {
              console.log(`- ${tarea}`);
            });
          } else {
            console.log("\nNo se encontraron tareas que coincidan con la búsqueda.");
          }
        }
        await input("\nPresiona ENTER para continuar...");
        console.clear();
        break;

      case 3:

        console.clear();
        console.log("Agregar una Tarea ➕\n");
        const nuevaTarea = await input(`Por favor ${nombre}, ingrese la descripción de la nueva tarea\n\n> `);

        if (nuevaTarea.trim() === "") {
          console.log("\nLa descripción de la tarea no puede estar vacía.");
        } else {
          tareas.push(nuevaTarea);
          console.log(`\nTarea agregada con éxito.`);
        }

        await input("\nPresiona ENTER para continuar...");
        console.clear();
        break;

      case 4:
        console.clear();

        if (tareas.length === 0) {
          console.log("Tu lista de tareas está vacía. No hay nada que eliminar. 🗑️");
          await input("\nPresiona ENTER para continuar...");
          console.clear();
          break;
        } else {

          console.log("Eliminar una Tarea ❌\n");
          tareas.forEach((tarea, index) => {
            console.log(`[${index}] ${tarea}`);
          });

          const idEliminar = await input("\nIngrese el ID de la tarea a eliminar: ");
          const idNum = parseInt(idEliminar, 10);

          if (!isNaN(idNum) && idNum >= 0 && idNum < tareas.length) {
            tareas.splice(idNum, 1);
            console.log("\nTarea eliminada con éxito.");
          } else {
            console.log("\nID de tarea inválido.");
          }
        }
        await input("\nPresiona ENTER para continuar...");
        console.clear();
        break;

      case 0:
        console.clear();
        break;

      default:
        console.log("Opción inválida. Por favor, ingrese una opción del menú.");
    }

  } while (opcion !== 0);

  close();
}

// Ejecutar el programa
main();
