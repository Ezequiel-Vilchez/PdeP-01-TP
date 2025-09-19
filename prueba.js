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

// console.log("---------------------------------------------------");
// console.log(tareas[1].titulo);
// console.log(tareas[1].descripcion);
// console.log(tareas[1].estado);
// console.log(tareas[1].prioridad);
// console.log(tareas[1].fechaLimite);
// console.log(tareas[1].fechaInicio);
// console.log("---------------------------------------------------");

// console.log(new Date().toISOString().split('T')[0]);

// const miLista = [{
//     titulo: "PHP",
//     descripcion: "Aprender PHP desde cero"
// }];

// miLista.push({
//     titulo: "Java",
//     descripcion: "Aprender Java desde cero"
// });

// console.log(miLista);

// console.log(new Date());

const fechaIngresada = new Date("2025-09-19");
const fechaActual = new Date();

console.log(fechaIngresada.getDate());
console.log(fechaActual);

if (fechaIngresada > fechaActual) {
    console.log("La fecha ingresada es mayor a la actual");
} else {
    console.log("La fecha ingresada es menor a la actual");
}