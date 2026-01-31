import { Link, Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="container">
      <header className="header">
        <div className="brandWrap">
          <Link to="/" className="brand">Lista de Tareas</Link>
          <div className="subtitle">Gestioná tus tareas diarias</div>
        </div>

        <nav className="nav">
          <Link className="navLink navLinkActivePurple" to="/">Lista</Link>
          <Link className="navLink" to="/tasks/new">Nueva tarea</Link>
        </nav>
      </header>

      <Outlet />
    </div>
  );
}
