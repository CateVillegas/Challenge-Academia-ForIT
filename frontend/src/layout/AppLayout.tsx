import { Link, Outlet } from "react-router-dom";

export default function AppLayout() {
    return (
        <div style={{ padding:24 }}>
            <header style={{marginBottom:24}}>
                <h2 style={{margin:0}}>Task App </h2>

                <nav style={{display: "flex", gap:12, marginTop:10}}>
                    <Link to="/">Lista</Link>
                    <Link to="/tasks/new">Nueva Tarea</Link>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}