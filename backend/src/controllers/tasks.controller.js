//Controller: lógica de HTTP
/* 
el controller recibe un pedido HTTP, decide que hacer con 
ese pedido y devuelve una respuesta HTTP. 
En este caso, el controller recibe el pedido de obtener 
todas las tareas, pide al service que le devuelva las tareas 
y responde al cliente con un JSON que contiene las tareas.
*/


const { listTasks, createTask } = require("../services/tasks.service"); //“Traeme la función listTasks desde el archivo del service.”

// GET /api/tasks
function getTasks(req, res, next){
    const tasks = listTasks();
    res.status(200).json(tasks);

}

//POST /api/tasks
function postTask(req, res, next){
    const { title, description } = req.body;
    if(!title || title.trim() === ""){
        return next({ status:400, message: "title is required"});
    }
    const newTask = createTask({ title, description});
    res.status(201).json(newTask);
}


module.exports = {
    getTasks,
    postTask,
};