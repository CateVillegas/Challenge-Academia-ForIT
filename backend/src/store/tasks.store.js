const tasks = [];

function getAllTasks(){
    return tasks; //devuelve el array completo
}

// agrega una tarea al array
function addTask(task){
    tasks.push(task);
}

// busca una tarea por id
function findTaskById(id){
    return tasks.find((t) => t.id === id);
}

// actualiza una tarea por id
function updateTaskById(id, updates){
    const task = findTaskById(id);
    if(!task) return null;
    Object.assign(task, updates);
    return task;
}

// elimina una tarea por id
function deleteTaskById(id){
    const index = tasks.findIndex((t) => t.id === id);
    if(index === -1) return false;

    tasks.splice(index, 1);
    return true;
}

module.exports = { // para poder exportar a otros archivos
    getAllTasks, 
    addTask,
    findTaskById,
    updateTaskById,
    deleteTaskById,
};
