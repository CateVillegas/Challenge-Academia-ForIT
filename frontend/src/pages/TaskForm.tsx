//pantalla de crear/editar
//es el mismo componente para crear y editar, y le pasamos un mode (para evitar duplicar pantallas)
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { createTask, getTasks, updateTask } from "../services/tasksApi";
import type { Task } from "../types/task";

type Props = {
  mode: "create" | "edit";
};

export default function TaskForm({ mode }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [prefillLoading, setPrefillLoading] = useState(mode === "edit");
  const [error, setError] = useState<string | null>(null);

  // 1) Precargar datos si estamos en modo edit
  useEffect(() => {
    async function prefill() {
      if (mode !== "edit") return;

      try {
        setError(null);
        setPrefillLoading(true);

        if (!id) {
          setError("Falta el id en la URL");
          return;
        }

        const tasks = await getTasks();
        const task = tasks.find((t) => t.id === id);

        if (!task) {
          setError("Tarea no encontrada");
          return;
        }

        setTitle(task.title);
        setDescription(task.description);
        setCompleted(task.completed);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Error desconocido";
        setError(msg);
      } finally {
        setPrefillLoading(false);
      }
    }

    prefill();
  }, [mode, id]);

  // 2) Submit: create o edit según modo
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      setError("El título es obligatorio");
      return;
    }

    try {
      setError(null);
      setLoading(true);

      if (mode === "create") {
        await createTask({ title, description });
        navigate("/");
        return;
      }

      // modo edit
      if (!id) {
        setError("Falta el id en la URL");
        return;
      }

      await updateTask(id, { title, description, completed });
      navigate(`/tasks/${id}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error desconocido";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  if (prefillLoading) return <p>Cargando datos de la tarea...</p>;

  return (
    <div>
      <h1>{mode === "create" ? "Nueva tarea" : "Editar tarea"}</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Título
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </label>
        </div>

        <div>
          <label>
            Descripción
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </label>
        </div>

        {mode === "edit" && (
          <div>
            <label>
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                disabled={loading}
              />
              Completada
            </label>
          </div>
        )}

        {error && <p style={{ color: "crimson" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>

        <div style={{ marginTop: 12 }}>
          <Link to={mode === "edit" && id ? `/tasks/${id}` : "/"}>Cancelar</Link>
        </div>
      </form>
    </div>
  );
}
