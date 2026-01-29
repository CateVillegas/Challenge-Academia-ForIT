//Controller: lógica de HTTP
/* 
el controller recibe un pedido HTTP, decide que hacer con 
ese pedido y devuelve una respuesta HTTP. 
En este caso, el controller recibe el pedido de obtener 
todas las tareas, pide al service que le devuelva las tareas 
y responde al cliente con un JSON que contiene las tareas.
*/


const { listTasks } = require("../services/tasks.service"); //“Traeme la función listTasks desde el archivo del service.”

// maneja la petición de obtener todas las tareas
function getTasks(req, res, next){
    const tasks = listTasks();
    res.status(200).json(tasks);

}

module.exports = {
    getTasks,
};