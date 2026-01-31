import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createTask, getTasks, updateTask } from "../services/tasksApi";

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

  if (prefillLoading) return <p className="muted">Cargando datos...</p>;

  return (
    <div className="card cardPad">
      <div className="sectionHead">
        <div>
          <h1 className="h1">{mode === "create" ? "Nueva tarea" : "Editar tarea"}</h1>
          <div className="muted">
            {mode === "create" ? "Creá una nueva tarea" : "Modificá tu tarea"}
          </div>
        </div>
      </div>

      {error && <div className="error">Error: {error}</div>}

      <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <div>
            <div className="muted" style={{ marginBottom: 6 }}>Título</div>
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              placeholder="Ej: Comprar leche"
            />
          </div>

          <div>
            <div className="muted" style={{ marginBottom: 6 }}>Descripción</div>
            <input
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              placeholder="Ej: Ir al súper"
            />
          </div>

          {mode === "edit" && (
            <label className="row" style={{ gap: 10 }}>
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                disabled={loading}
              />
              <span>Marcar como completada</span>
            </label>
          )}
        </div>

        <div className="row" style={{ marginTop: 16, justifyContent: "space-between" }}>
          <Link className="button" to={mode === "edit" && id ? `/tasks/${id}` : "/"}>
            Cancelar
          </Link>

          <button className="button buttonPrimary" type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
