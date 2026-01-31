//Service: lógica de negocio

const { getAllTasks, addTask, updateTaskById, deleteTaskById }= require("../store/tasks.store");
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

// edita una tarea por id
function editTask(id, payload){
    const allowed= {};
    if(payload.title !== undefined) allowed.title= payload.title;
    if(payload.description !== undefined) allowed.description = payload.description;
    if(payload.completed !== undefined) allowed.completed = payload.completed;

    return updateTaskById(id, allowed);
}

// elimina una tarea por id
function removeTask(id){
    return deleteTaskById(id);
}

module.exports = {
    listTasks,
    createTask,
    editTask,
    removeTask,
};
