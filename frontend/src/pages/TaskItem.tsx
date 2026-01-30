//detalle de una task
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTasks } from "../services/tasksApi";
import type { Task } from "../types/task";

export default function TaskItem() {
  const { id } = useParams();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setError(null);
      setLoading(true);

      if (!id) {
        setTask(null);
        return;
      }

      const tasks = await getTasks();
      const found = tasks.find((t) => t.id === id) ?? null;
      setTask(found);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error desconocido";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // cuando cambia el id (si navegás entre detalles), vuelve a cargar
  }, [id]);

  if (loading) return <p>Cargando tarea...</p>;

  if (error) {
    return (
      <div>
        <p style={{ color: "crimson" }}>Error: {error}</p>
        <button onClick={load}>Reintentar</button>
        <div style={{ marginTop: 12 }}>
          <Link to="/">Volver</Link>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div>
        <h1>Tarea no encontrada</h1>
        <p>No existe una tarea con id: <b>{id}</b></p>
        <Link to="/">Volver</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{task.title}</h1>

      <p><b>ID:</b> {task.id}</p>
      <p><b>Descripción:</b> {task.description || "(sin descripción)"}</p>
      <p><b>Estado:</b> {task.completed ? "Completada ✅" : "Pendiente ⬜"}</p>
      <p><b>Creada:</b> {new Date(task.createdAt).toLocaleString()}</p>

      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <Link to="/">Volver</Link>
        <Link to={`/tasks/${task.id}/edit`}>Editar</Link>
      </div>
    </div>
  );
}
