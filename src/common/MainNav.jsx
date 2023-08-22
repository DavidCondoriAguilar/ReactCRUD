import { Link } from "react-router-dom";
import "./MainNav.css";

function MainNav() {
  return (
    <nav className="navbar navbar-expand-lg bg-light ">
      <div className="container ">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-3">
              <Link className="nav-link" to="/Inicio">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Inversiones">
                Inversiones
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Empleados">
                Empleados
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Proveedores">
                Proveedores
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Tienda">
                Tienda
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item mx-3">
              <Link className="nav-link" to="/Carrito">
              <i className="bi fw-bold fs-3 bi-cart" title="Carrito de compras"></i>
              </Link>
            </li>
          </ul>
          
        </div>
      </div>
    </nav>
  );
}

export default MainNav;
