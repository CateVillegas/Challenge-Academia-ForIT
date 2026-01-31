import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { deleteTask, getTasks } from "../services/tasksApi";
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

  async function handleDelete(id: string) {
    const ok = confirm("¿Seguro que querés eliminar esta tarea?");
    if (!ok) return;

    try {
      setError(null);
      await deleteTask(id);
      await load();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error desconocido";
      setError(msg);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.completed).length;
    const pending = total - done;
    return { total, done, pending };
  }, [tasks]);

  if (loading) return <p className="muted">Cargando tareas...</p>;

  return (
    <div>
      {/* === Cards de estadísticas === */}
      <div className="grid3">
        {/* Pendientes → LILA */}
        <div className="card cardPad cardBorderPending">
          <div className="statTop">
            <div>
              <div className="statLabel">Tareas pendientes</div>
              <div className="statValue">{stats.pending}</div>
            </div>
            <div className="statPill">○</div>
          </div>
        </div>

        {/* Total → AMARILLO */}
        <div className="card cardPad cardBorderTotal">
          <div className="statTop">
            <div>
              <div className="statLabel">Total tareas</div>
              <div className="statValue">{stats.total}</div>
            </div>
            <div className="statPill">≡</div>
          </div>
        </div>

        {/* Completadas → VERDE */}
        <div className="card cardPad cardBorderDone">
          <div className="statTop">
            <div>
              <div className="statLabel">Completadas</div>
              <div className="statValue">{stats.done}</div>
            </div>
            <div className="statPill">✓</div>
          </div>
        </div>
      </div>

      {/* === Lista de tareas === */}
      <div className="card cardPad">
        <div className="sectionHead">
          <div>
            <h2 className="h2">Mis tareas</h2>
            <div className="muted">Administrá tu lista de tareas</div>
          </div>

          <Link className="button buttonPrimary" to="/tasks/new">
            + Nueva tarea
          </Link>
        </div>

        {error && <div className="error">Error: {error}</div>}

        {tasks.length === 0 ? (
          <p className="muted">No hay tareas todavía.</p>
        ) : (
          <ul className="list">
            {tasks.map((t) => (
              <li key={t.id} className="item">
                <div className="itemTop">
                  <Link className="itemTitle" to={`/tasks/${t.id}`}>
                    {t.title}
                  </Link>

                  <span
                    className={
                      t.completed
                        ? "badge badgeDone"
                        : "badge badgePending"
                    }
                  >
                    {t.completed ? "Completada" : "Pendiente"}
                  </span>
                </div>

                <div className="muted">
                  {t.description ? t.description : "(sin descripción)"}
                </div>

                <div
                  className="row"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className="muted">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </div>

                  <div className="row">
                    <Link className="button" to={`/tasks/${t.id}/edit`}>
                      Editar
                    </Link>
                    <button
                      className="button buttonDanger"
                      onClick={() => handleDelete(t.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
