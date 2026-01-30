import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTasks } from "../services/tasksApi";
import type { Task } from "../types/task";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setError(null);
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error desconocido";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return (
    <div>
      <p style={{ color: "crimson" }}>Error: {error}</p>
      <button onClick={load}>Reintentar</button>
    </div>
  );

  return (
    <div>
      <h1>TaskList</h1>

      <div style={{ marginBottom: 12 }}>
        <Link to="/tasks/new">+ Nueva tarea</Link>
      </div>

      {tasks.length === 0 ? (
        <p>No hay tareas todavía.</p>
      ) : (
        <ul>
          {tasks.map((t) => (
            <li key={t.id} style={{ marginBottom: 8 }}>
              <Link to={`/tasks/${t.id}`}>{t.title}</Link>{" "}
              {t.completed ? "✅" : "⬜"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
