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
        estado: "cancelada",
        prioridad: 2,
        fechaLimite: "2024-12-31",
        fechaInicio: "2024-06-01"
    },
    {
        titulo: "JavaScript",
        descripcion: "Dominar JavaScript y sus frameworks",
        estado: "en progreso",
        prioridad: 3,
        fechaLimite: "2024-11-30",
        fechaInicio: "2024-06-05"
    },
    {
        titulo: "Python",
        descripcion: "Aprender Python para análisis de datos",
        estado: "completada",
        prioridad: 1,
        fechaLimite: "2024-10-15",
        fechaInicio: "2024-05-20"
    },
    {
        titulo: "HTML",
        descripcion: "Aprender HTML y CSS",
        estado: "pendiente",
        prioridad: 2,
        fechaLimite: "2024-12-31",
        fechaInicio: "2024-06-01"
    }
];

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
            console.log(`- ${tarea.titulo}`);
          }

        }

        await input("\nPresiona ENTER para continuar...");
        console.clear();
        break;

case 2:
        console.clear();

        if (tareas.length === 0) {
          console.log("Tu lista de tareas está vacía. No hay nada que buscar. 🔍");
          await input("\nPresiona ENTER para continuar...");
          console.clear();
          break;
        }

        const terminoBusqueda = await input(`Por favor ${nombre}, ingresa el término de búsqueda:\n\n> `);
        
        const resultados = tareas.filter(tarea =>
          tarea.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase())
        );

        if (resultados.length > 0) {
          console.log("\nResultados de la búsqueda:\n");

          resultados.forEach(tarea => {
            console.log(`- ${tarea.titulo}`);
          });

        } else {
          console.log("\nNo se encontraron tareas que coincidan con la búsqueda.");
        }

        await input("\nPresiona ENTER para continuar...");
        console.clear();
        break;
        
      case 3:

        console.clear();
        console.log("Agregar una Tarea ➕\n");

      let titulo = "";
      do {
        titulo = await input(`Por favor ${nombre}, ingrese el título de la nueva tarea\n\n> `);

        if (titulo.trim() === "") {
          console.log("\nEl título de la tarea no puede estar vacío.");

          await input("\nPresiona ENTER para intentar de nuevo...");
          console.clear();
        }
      } while (titulo.trim() === "");

      console.clear();

      do {
        descripcion = await input(`Por favor ${nombre}, ingrese la descripción de la nueva tarea\n\n> `);

        if (descripcion.trim() === "") {
          console.log("\nLa descripción de la tarea no puede estar vacía.");

          await input("\nPresiona ENTER para intentar de nuevo...");
          console.clear();
        }
      } while (descripcion.trim() === "");

      console.clear();

      do {
        estado = await input(`Por favor ${nombre}, ingrese el estado de la nueva tarea (pendiente, en progreso, completada, cancelada)\n\n> `);

        if (["pendiente", "en progreso", "completada", "cancelada"].includes(estado.trim())) {
          break;
        } else {
          console.log("\nEstado inválido. Por favor, ingrese un estado válido.");
          await input("\nPresiona ENTER para intentar de nuevo...");
          console.clear();
        }
      } while (estado.trim() === "" || !["pendiente", "en progreso", "completada", "cancelada"].includes(estado.trim()));

      console.clear();

      do {
        prioridad = await input(`Por favor ${nombre}, ingrese la prioridad de la nueva tarea (1-3)\n\n> `);

        if (["1", "2", "3"].includes(prioridad.trim())) {
          console.clear();
          break;
        } else {
          console.log("\nPrioridad inválida. Por favor, ingrese una prioridad válida (1, 2 o 3).");
          await input("\nPresiona ENTER para intentar de nuevo...");
          console.clear();
        }
      } while (prioridad.trim() === "" || !["1", "2", "3"].includes(prioridad.trim()));

      console.clear();

      const fechaLimite = await input(`Por favor ${nombre}, ingrese la fecha límite de la nueva tarea (YYYY-MM-DD)\n\n> `);
      const fechaInicio = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD

      tareas.push({
        titulo,
        descripcion,
        estado,
        prioridad: parseInt(prioridad, 10),
        fechaLimite,
        fechaInicio
      });
      console.log(`\nTarea agregada con éxito.`);

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
        console.clear();
        console.log("Opción inválida. Por favor, ingrese una opción del menú.");
        await input("\nPresiona ENTER para continuar...");
        console.clear();
        break;
    }

  } while (opcion !== 0);

  close();
}

// Ejecutar el programa
main();
