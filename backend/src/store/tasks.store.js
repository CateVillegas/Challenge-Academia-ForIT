const tasks = [];

function getAllTasks(){
    return tasks; //devuelve el array completo
}

function addTask(task){
    tasks.push(task);
}

module.exports = { // para poder exportar a otros archivos
    getAllTasks, 
    addTask,
};
