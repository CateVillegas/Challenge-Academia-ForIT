//Controller: lógica de HTTP
/* 
el controller recibe un pedido HTTP, decide que hacer con 
ese pedido y devuelve una respuesta HTTP. 
En este caso, el controller recibe el pedido de obtener 
todas las tareas, pide al service que le devuelva las tareas 
y responde al cliente con un JSON que contiene las tareas.
*/


const { listTasks, createTask, editTask, removeTask } = require("../services/tasks.service"); //“Traeme la función listTasks desde el archivo del service.”

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

//PUT /api/tasks/:id
function putTask(req, res, next){
    const { id } = req.params;
    const { title, description, completed } = req.body;

    //body vacio o sin campos validos
    const hasAnyField =
        title !== undefined ||
        description !== undefined ||
        completed !== undefined;

    if(!hasAnyField){
        return next({ status: 400, message: "body is empty"});
    }

    // validación básica: si title viene, que no sea vacío
    if (title !== undefined && title.trim() === "") {
        return next({ status: 400, message: "title cannot be empty" });
    }

    // validación básica: si completed viene, que sea boolean
    if (completed !== undefined && typeof completed !== "boolean") {
        return next({ status: 400, message: "completed must be boolean" });
    }

    const updated = editTask(id, { title, description, completed });

    if(!updated){
        return next({ status: 404, message: "task not found"});
    }

    res.status(200).json(updated);

    }

// DELETE /api/tasks/:id
function deleteTask(req, res, next){
    const { id } = req.params;
    const deleted = removeTask(id);

    if(!deleted){
        return next({ status: 404, message: "task not found"});
    }

    return res.status(204).send();
}

module.exports = {
    getTasks,
    postTask,
    putTask,
    deleteTask,
};