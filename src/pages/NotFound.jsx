import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: "60vh", padding: "2rem" }}>
      <i className="bi bi-compass text-muted mb-3" style={{ fontSize: "4rem" }}></i>
      <h1 className="fw-bold mb-2 display-4" style={{ fontFamily: "'Outfit', sans-serif" }}>404</h1>
      <p className="text-muted fs-5 mb-0">Página no encontrada</p>
      <p className="text-muted mb-4">La ruta a la que intentas acceder no existe.</p>
      <Link to="/" className="btn btn-dark px-4 py-2 rounded-pill">
        Volver al Inicio
      </Link>
    </div>
  );
}
