//pantalla de crear/editar
//es el mismo componente para crear y editar, y le pasamos un mode (para evitar duplicar pantallas)

type Props = {
  mode: "create" | "edit";
};

export default function TaskForm({ mode }: Props) {
  return <h1>{mode === "create" ? "Nueva tarea" : "Editar tarea"}</h1>;
}
