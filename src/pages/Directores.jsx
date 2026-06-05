import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/ui/PageTransition";
import DirectorModals from "../features/directors/DirectorModals";
import { useDirectorCrud } from "../features/directors/useDirectorCrud";
import "react-toastify/dist/ReactToastify.css";

export default function Directores() {
  const {
    listaDirectores, cargando,
    form, modal,
    prepararInsertar, prepararEditar, prepararEliminar,
    handleInsert, handleUpdate, handleDelete,
    leerServicio,
  } = useDirectorCrud();

  useEffect(() => {
    leerServicio();
  }, [leerServicio]);

  const dibujarTablaDirectores = () => (
    <div className="table-responsive card border-0 shadow-sm overflow-hidden bg-white">
      <table className="table table-striped table-hover align-middle mb-0">
        <thead>
          <tr>
            <th>ID Director</th>
            <th>Nombres</th>
            <th>Películas</th>
            <th className="text-center" style={{ width: "120px" }}>Acciones</th>
          </tr>
        </thead>
        <motion.tbody 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence>
            {listaDirectores.map((item) => (
              <motion.tr 
                key={item.iddirector}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
              >
                <td>{item.iddirector}</td>
                <td className="fw-semibold text-dark">{item.nombres}</td>
                <td>{item.peliculas}</td>
                <td className="text-center">
                  <div className="d-flex justify-content-center gap-3">
                    <i
                      className="bi bi-pencil-fill text-primary fs-5"
                      style={{ cursor: "pointer", transition: "transform 0.2s" }}
                      onClick={() => prepararEditar(item)}
                      title="Editar"
                      onMouseOver={(e) => e.target.style.transform = "scale(1.15)"}
                      onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                    ></i>
                    <i
                      className="bi bi-x-lg text-danger fs-5"
                      style={{ cursor: "pointer", transition: "transform 0.2s" }}
                      onClick={() => prepararEliminar(item)}
                      title="Eliminar"
                      onMouseOver={(e) => e.target.style.transform = "scale(1.15)"}
                      onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                    ></i>
                  </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </motion.tbody>
      </table>
    </div>
  );

  return (
    <PageTransition>
      <section className="paddi">
        <div className="container">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-5">
            <div>
              <span className="text-primary fw-semibold text-uppercase tracking-wider fs-7">Administración</span>
              <h1 className="mt-1 mb-2 fw-bold text-dark">Directores de Cine</h1>
              <p className="text-muted mb-0" style={{ maxWidth: "600px" }}>
                Gestión y registro en tiempo real de los directores cinematográficos asociados y sus principales obras.
              </p>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-success d-flex align-items-center gap-2 py-2 px-3 shadow-sm"
                onClick={prepararInsertar}
              >
                <i className="bi bi-plus-lg"></i> Agregar Director
              </button>
            </div>
          </div>

          {cargando ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Cargando directores...</span>
              </div>
            </div>
          ) : listaDirectores.length === 0 ? (
            <div className="alert alert-info text-center py-4">No hay directores registrados.</div>
          ) : (
            dibujarTablaDirectores()
          )}
        </div>

        <DirectorModals
          form={form}
          modal={modal}
          handleInsert={handleInsert}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </section>
    </PageTransition>
  );
}
