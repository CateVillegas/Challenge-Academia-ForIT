import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import TaskList from "./pages/TaskList";
import TaskItem from "./pages/TaskItem";
import TaskForm from "./pages/TaskForm";

export default function App() {
  return (
    <Routes>
      {/* Para todas las rutas hijas, renderizá primero <AppLayout /> */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<TaskList />} />
        <Route path="/tasks/new" element={<TaskForm mode="create" />} />
        <Route path="/tasks/:id" element={<TaskItem />} />
        <Route path="/tasks/:id/edit" element={<TaskForm mode="edit" />} />

        {/* Si la URL no existe, volvemos a "/" */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
