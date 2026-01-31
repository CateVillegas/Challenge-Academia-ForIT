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
  }, [id]);

  if (loading) return <p className="muted">Cargando tarea...</p>;

  if (error) {
    return (
      <div className="card cardPad">
        <div className="error">Error: {error}</div>
        <div className="row" style={{ marginTop: 12 }}>
          <button className="button" onClick={load}>Reintentar</button>
          <Link className="button" to="/">Volver</Link>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="card cardPad">
        <h1 className="h1">Tarea no encontrada</h1>
        <p className="muted">
          No existe una tarea con id: <b>{id}</b>
        </p>
        <div className="row" style={{ marginTop: 12 }}>
          <Link className="button" to="/">Volver</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card cardPad">
      <div className="sectionHead">
        <div>
          <h1 className="h1" style={{ marginBottom: 6 }}>{task.title}</h1>
          <div className="muted">
            {task.description ? task.description : "(sin descripción)"}
          </div>
        </div>

        <span className={`badge ${task.completed ? "badgeDone" : ""}`}>
          {task.completed ? "Completada" : "Pendiente"}
        </span>
      </div>

      <div className="muted" style={{ marginTop: 10 }}>
        <div><b>ID:</b> {task.id}</div>
        <div><b>Creada:</b> {new Date(task.createdAt).toLocaleString()}</div>
      </div>

      <div className="row" style={{ marginTop: 16 }}>
        <Link className="button" to="/">Volver</Link>
        <Link className="button buttonPrimary" to={`/tasks/${task.id}/edit`}>Editar</Link>
      </div>
    </div>
  );
}
