import { useState, useEffect, useMemo, useCallback } from "react";
import { apiClient } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/ui/PageTransition";
import "./Proveedores.css"; // Usando CSS regular

// Componente principal
export default function Proveedores() {
  const [cargando, setCargando] = useState(true);
  const [listaProveedoresOriginal, setListaProveedoresOriginal] = useState([]);
  const [textoBuscar, setTextoBuscar] = useState("");
  const [ascendente, setAscendente] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Obtener datos del servicio utilizando apiClient
  useEffect(() => {
    const leerServicio = async () => {
      try {
        setCargando(true);
        const data = await apiClient.get("proveedores.php");
        setListaProveedoresOriginal(data);
      } catch (error) {
        console.error("Error al cargar los proveedores:", error);
      } finally {
        setCargando(false);
      }
    };
    leerServicio();
  }, []);

  // Manejo del cambio en el texto de búsqueda
  const handleSearchChange = useCallback((event) => {
    setTextoBuscar(event.target.value.toLowerCase());
    setCurrentPage(1); // Reinicia la página al cambiar el filtro de búsqueda
  }, []);

  // Ordenación y filtrado de la lista de proveedores
  const listaFiltradaYOrdenada = useMemo(() => {
    const filtrada = listaProveedoresOriginal.filter((item) =>
      item.nombreempresa.toLowerCase().startsWith(textoBuscar)
    );

    const ordenada = filtrada.sort((a, b) => {
      const valorA = a.nombreempresa || "";
      const valorB = b.nombreempresa || "";
      return ascendente ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
    });

    return ordenada;
  }, [listaProveedoresOriginal, textoBuscar, ascendente]);

  // Obtener los proveedores de la página actual
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return listaFiltradaYOrdenada.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, listaFiltradaYOrdenada]);

  // Manejo del cambio de página
  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  // Alternar el orden ascendente/descendente
  const toggleAscendente = useCallback(() => {
    setAscendente((prev) => !prev);
  }, []);

  // Componente de la tabla de proveedores
  const TablaProveedores = () => (
    <div className="table-responsive card border-0 shadow-sm overflow-hidden bg-white">
      <table className="table table-striped table-hover align-middle mb-0">
        <thead>
          <tr>
            <th>ID</th>
            <th onClick={toggleAscendente} style={{ cursor: "pointer", userSelect: "none" }}>
              Empresa {ascendente ? "↑" : "↓"}
            </th>
            <th>Contacto</th>
            <th>Cargo</th>
            <th>Ciudad</th>
          </tr>
        </thead>
        <motion.tbody 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {currentItems.map((item) => (
            <tr key={item.idproveedor}>
              <td>{item.idproveedor}</td>
              <td className="fw-semibold text-dark">{item.nombreempresa}</td>
              <td>{item.nombrecontacto}</td>
              <td>{item.cargocontacto}</td>
              <td>{item.ciudad}</td>
            </tr>
          ))}
        </motion.tbody>
      </table>
    </div>
  );

  // Componente de paginación
  const Paginacion = () => {
    const totalPages = Math.ceil(listaFiltradaYOrdenada.length / itemsPerPage);
    if (totalPages <= 1) return null;
    
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center mt-4 mb-0">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
              <button onClick={() => handlePageChange(index + 1)} className="page-link shadow-none">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  return (
    <PageTransition>
      <section className="proveedores-section paddi">
        <div className="container">
          <div className="mb-5">
            <span className="text-primary fw-semibold text-uppercase tracking-wider fs-7">Partners & Studios</span>
            <h1 className="mt-1 mb-2 fw-bold text-dark">Partners de Producción</h1>
            <p className="text-muted" style={{ maxWidth: "600px" }}>
              Directorio oficial de estudios VFX, agencias de casting, abastecimiento de utilería y productoras asociadas a AETHER Entertainment.
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-4"
          >
            <input
              value={textoBuscar}
              onChange={handleSearchChange}
              type="text"
              className="form-control py-2 px-3 shadow-none"
              placeholder="🔍 Buscar empresa proveedora..."
            />
          </motion.div>

          {cargando ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando proveedores...</span>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {listaFiltradaYOrdenada.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="alert alert-info text-center py-4"
                >
                  No se encontraron proveedores que coincidan con la búsqueda.
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <TablaProveedores />
                  <Paginacion />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
