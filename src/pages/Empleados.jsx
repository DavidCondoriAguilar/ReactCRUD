import { useEffect, useState, useCallback } from "react";
import { apiClient } from "../services/api";
import { ApiWebURL } from "../config/constants";
import { motion } from "framer-motion";
import PageTransition from "../components/ui/PageTransition";

export default function Empleados() {
  const [listaEmpleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);

  const leerServicio = useCallback(async () => {
    try {
      setCargando(true);
      const data = await apiClient.get("empleados.php");
      setEmpleados(data);
    } catch (error) {
      console.error("Error al obtener los empleados:", error);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    leerServicio();
  }, [leerServicio]);

  // Contenedor para animaciones escalonadas
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
  };

  // Tarjeta de empleado individual
  const cardVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const dibujarCuadricula = () => {
    if (listaEmpleados.length === 0) {
      return <div className="alert alert-info text-center w-100">No hay empleados registrados.</div>;
    }

    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4 justify-content-center"
      >
        {listaEmpleados.map((item) => (
          <motion.div variants={cardVariants} className="col" key={item.idempleado}>
            <div className="card h-100 shadow-sm border-0">
              <img
                src={`${ApiWebURL}${item.foto}`}
                className="card-img-top"
                alt={`Foto de ${item.nombres} ${item.apellidos}`}
                style={{ height: "260px", objectFit: "cover", objectPosition: "top center" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/300x260?text=Sin+Foto";
                }}
              />
              <div className="card-body p-3 d-flex flex-column justify-content-between bg-white" style={{ zIndex: 1 }}>
                <div>
                  <h6 className="card-title text-success fw-bold mb-1" style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.cargo}</h6>
                  <p className="card-text text-dark fw-semibold mb-0" style={{ fontSize: "0.95rem" }}>
                    {item.nombres} {item.apellidos}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <PageTransition>
      <section className="paddi">
        <div className="container">
          <div className="mb-5">
            <span className="text-primary fw-semibold text-uppercase tracking-wider fs-7">Corporate Crew & Talent</span>
            <h1 className="mt-1 mb-2 fw-bold text-dark">Directorio de Equipo</h1>
            <p className="text-muted" style={{ maxWidth: "600px" }}>
              Conoce al equipo multidisciplinario detrás de cámaras que hace posible cada superproducción y la expansión corporativa de AETHER Entertainment.
            </p>
          </div>
          
          {cargando ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Cargando empleados...</span>
              </div>
            </div>
          ) : (
            dibujarCuadricula()
          )}
        </div>
      </section>
    </PageTransition>
  );
}
