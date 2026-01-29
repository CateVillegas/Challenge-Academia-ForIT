//Service: lógica de negocio

/*
Borrar son notitas para mi!!
En la carpeta services se define la lógica del negocio. 
Aunque hoy solo delegue al store, existe para evitar que los 
controllers dependan directamente de cómo se almacenan los datos 
y para permitir que la lógica crezca sin ensuciar la capa HTTP.
*/

const { getAllTasks }= require("../store/tasks.store");

// devuelve todas las tareas
function listTasks(){ 
    return getAllTasks();
}

module.exports = {
    listTasks,
};
