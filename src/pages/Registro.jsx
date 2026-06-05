import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { apiClient } from "../services/api";
import { motion } from "framer-motion";
import PageTransition from "../components/ui/PageTransition";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css"; // Reutilizamos los estilos minimalistas

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [cargando, setCargando] = useState(false);

  const registrarUsuario = async (event) => {
    event.preventDefault();
    if (!nombre.trim() || !usuario.trim() || !clave.trim()) {
      toast.warning("Por favor completa todos los campos");
      return;
    }

    // Aquí iría el endpoint real de registro (ej. "registro.php")
    // Como es un demo, simularemos el comportamiento de registro
    setCargando(true);
    
    setTimeout(() => {
      setCargando(false);
      toast.success("Cuenta creada exitosamente (Modo Demo)");
      setTimeout(() => {
        setRedirect(true);
      }, 1500);
    }, 1200);
  };

  if (redirect) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <PageTransition>
      <div className="login-page-container">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="w-100 d-flex justify-content-center"
        >
          <div className="login-wrapper">
            
            <div className="login-header">
              <h2 className="login-logo">Aether</h2>
              <span className="login-subtitle">New Corporate Profile</span>
            </div>

            <form onSubmit={registrarUsuario}>
              
              <div className="login-input-box">
                <input
                  type="text"
                  className="login-input"
                  placeholder="Nombre completo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
                <i className="bi bi-person-badge login-icon"></i>
              </div>

              <div className="login-input-box">
                <input
                  type="text"
                  className="login-input"
                  placeholder="Nombre de Usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                />
                <i className="bi bi-person login-icon"></i>
              </div>
              
              <div className="login-input-box">
                <input
                  type={showPassword ? "text" : "password"}
                  className="login-input"
                  placeholder="Contraseña"
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                  required
                />
                <i className="bi bi-lock login-icon"></i>
              </div>
              
              <div className="login-check-container justify-content-between">
                <div className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="checkMostrar"
                    className="login-check-input"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                  />
                  <label htmlFor="checkMostrar" className="login-check-label">
                    Mostrar contraseña
                  </label>
                </div>
                
                <Link to="/login" className="login-check-label text-decoration-none" style={{ fontWeight: 500 }}>
                  Ya tengo cuenta
                </Link>
              </div>

              <button 
                type="submit" 
                className="login-btn"
                disabled={cargando}
              >
                {cargando ? "Registrando..." : "Crear Perfil"}
              </button>
              
              <div className="test-environment-notice mt-4">
                <div className="test-notice-title">
                  <i className="bi bi-info-circle me-2"></i>Aviso de Demo
                </div>
                <p className="test-notice-text">
                  El registro es simulado en este entorno de prueba para evitar el almacenamiento de datos reales en la base de datos de exhibición.
                </p>
              </div>
            </form>

          </div>
        </motion.div>

        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastStyle={{
            borderRadius: '0px',
            border: '1px solid #000',
            fontFamily: "'Inter', sans-serif",
            textTransform: 'uppercase',
            fontSize: '0.8rem',
            letterSpacing: '0.05em'
          }}
        />
      </div>
    </PageTransition>
  );
}
