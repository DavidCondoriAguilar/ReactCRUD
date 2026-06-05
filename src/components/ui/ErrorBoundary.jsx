import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "50vh", padding: "2rem" }}>
          <i className="bi bi-exclamation-triangle text-muted mb-3" style={{ fontSize: "4rem" }}></i>
          <h2 className="fw-bold mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Algo salió mal</h2>
          <p className="text-muted mb-4 text-center">
            {this.props.message || "Ocurrió un error inesperado. Intenta recargar la página."}
          </p>
          <button
            className="btn btn-dark px-4 py-2 rounded-pill"
            onClick={() => window.location.reload()}
          >
            Recargar página
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
