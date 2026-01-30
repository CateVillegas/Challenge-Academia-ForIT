/*
el backend ya tiene un “contrato” implícito (la estructura JSON de Task). 
En front lo hacemos explícito con TypeScript para autocompletado y evitar errores 
*/

export type Task = {
    id:string;
    title:string;
    description:string;
    completed:boolean;
    createdAt:string; // ISO date string
};

//Es la forma del objeto que el frontend manda al backend cuando crea una tarea.
export type CreateTaskPayload = {
    title:string;
    description?:string;
};

//body que mando al backend cuando edito una tarea (parcial pq puedo cambiar uno ovarios campos)
export type UpdateTaskPayload = Partial<
    Pick<Task, "title" | "description" | "completed">
>;