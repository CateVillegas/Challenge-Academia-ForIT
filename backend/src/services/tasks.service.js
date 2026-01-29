//Service: lógica de negocio

/*
Borrar son notitas para mi!!
En la carpeta services se define la lógica del negocio. 
Aunque hoy solo delegue al store, existe para evitar que los 
controllers dependan directamente de cómo se almacenan los datos 
y para permitir que la lógica crezca sin ensuciar la capa HTTP.
*/

const { getAllTasks, addTask }= require("../store/tasks.store");
const crypto = require("crypto");

// devuelve todas las tareas
function listTasks(){ 
    return getAllTasks();
}

// crea una nueva tarea
function createTask({title, description}){
    const newTask = {
        id: crypto.randomUUID(),
        title,
        description: description || "",
        completed: false,
        createdAt: new Date().toISOString(),
    };
    return addTask(newTask);
}

module.exports = {
    listTasks,
    createTask,
};
