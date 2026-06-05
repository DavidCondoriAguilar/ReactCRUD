import { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "../components/ui/PageTransition";

export default function Inversiones() {
  const [inversiones] = useState([
    { id: 1, sector: "Sci-Fi Franchise", monto: "S/ 450,000", retorno: "+18.4%", riesgo: "Moderado", estado: "Activo", color: "#0284c7" },
    { id: 2, sector: "Drama Independiente", monto: "S/ 120,000", retorno: "+12.1%", riesgo: "Bajo", estado: "Activo", color: "#10b981" },
    { id: 3, sector: "Animación 3D (CGI)", monto: "S/ 600,000", retorno: "+9.8%", riesgo: "Bajo", estado: "Estable", color: "#6366f1" },
    { id: 4, sector: "Marketing & PR", monto: "S/ 180,000", retorno: "+22.5%", riesgo: "Alto", estado: "Activo", color: "#f59e0b" },
  ]);

  // Contenedor para animaciones escalonadas
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  // Ítem individual para animación escalonada
  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.16, 1, 0.3, 1],
        duration: 0.5,
      },
    },
  };

  return (
    <PageTransition>
      <section className="paddi">
        <div className="container">
          {/* Header de la Sección */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-5"
          >
            <span className="text-primary fw-semibold text-uppercase tracking-wider fs-7">Rendimiento en Taquilla</span>
            <h1 className="mt-1 mb-2 fw-bold text-dark">Box Office & Inversiones</h1>
            <p className="text-muted" style={{ maxWidth: "600px" }}>
              Monitoreo y administración en tiempo real de los presupuestos de producción y recaudación global de AETHER Entertainment.
            </p>
          </motion.div>

          {/* Dashboard de KPIs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="row g-4 mb-5"
          >
            <motion.div variants={cardVariants} className="col-md-4">
              <div className="card border-0 shadow-sm p-4 bg-white">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="text-secondary fw-medium">Presupuesto de Producción</span>
                  <i className="bi bi-wallet2 text-primary fs-4"></i>
                </div>
                <h2 className="mb-1 text-dark fw-bold">S/ 1,350,000</h2>
                <span className="text-success fs-7 fw-semibold">
                  <i className="bi bi-arrow-down-right me-1"></i>-14.2% este año (Ahorro)
                </span>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} className="col-md-4">
              <div className="card border-0 shadow-sm p-4 bg-white">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="text-secondary fw-medium">Retorno en Taquilla (ROI)</span>
                  <i className="bi bi-graph-up-arrow text-success fs-4"></i>
                </div>
                <h2 className="mb-1 text-dark fw-bold">15.7%</h2>
                <span className="text-success fs-7 fw-semibold">
                  <i className="bi bi-arrow-up-right me-1"></i>+2.1% vs Estrenos Q4 2025
                </span>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} className="col-md-4">
              <div className="card border-0 shadow-sm p-4 bg-white">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="text-secondary fw-medium">Proyectos Activos</span>
                  <i className="bi bi-camera-reels text-warning fs-4"></i>
                </div>
                <h2 className="mb-1 text-dark fw-bold">4 Franquicias</h2>
                <span className="text-muted fs-7">Riesgo general: Bajo a Moderado</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Gráfico y Distribución de Activos */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="row g-4 mb-5"
          >
            <motion.div variants={cardVariants} className="col-lg-6">
              <div className="card border-0 shadow-sm p-4 bg-white h-100">
                <h4 className="mb-4 text-dark fw-semibold">Distribución del Presupuesto</h4>
                
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-1 fs-7 fw-medium text-secondary">
                    <span>Sci-Fi Franchise</span>
                    <span>29%</span>
                  </div>
                  <div className="progress" style={{ height: "8px", borderRadius: "4px" }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "29%" }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                      className="progress-bar bg-primary" 
                      role="progressbar" 
                      style={{ borderRadius: "4px" }} 
                      aria-valuenow="29" 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    ></motion.div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-1 fs-7 fw-medium text-secondary">
                    <span>Animación 3D (CGI)</span>
                    <span>38.7%</span>
                  </div>
                  <div className="progress" style={{ height: "8px", borderRadius: "4px" }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "38.7%" }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                      className="progress-bar" 
                      role="progressbar" 
                      style={{ borderRadius: "4px", backgroundColor: "#6366f1" }} 
                      aria-valuenow="38.7" 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    ></motion.div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-1 fs-7 fw-medium text-secondary">
                    <span>Drama Independiente</span>
                    <span>20.6%</span>
                  </div>
                  <div className="progress" style={{ height: "8px", borderRadius: "4px" }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "20.6%" }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                      className="progress-bar bg-success" 
                      role="progressbar" 
                      style={{ borderRadius: "4px" }} 
                      aria-valuenow="20.6" 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    ></motion.div>
                  </div>
                </div>

                <div className="mb-0">
                  <div className="d-flex justify-content-between mb-1 fs-7 fw-medium text-secondary">
                    <span>Marketing & PR</span>
                    <span>11.7%</span>
                  </div>
                  <div className="progress" style={{ height: "8px", borderRadius: "4px" }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "11.7%" }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                      className="progress-bar bg-warning" 
                      role="progressbar" 
                      style={{ borderRadius: "4px" }} 
                      aria-valuenow="11.7" 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} className="col-lg-6">
              <div className="card border-0 shadow-sm p-4 bg-white h-100">
                <h4 className="mb-4 text-dark fw-semibold">Detalle de Proyectos</h4>
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Género / Sector</th>
                        <th className="text-end">Presupuesto</th>
                        <th className="text-end">Retorno</th>
                        <th className="text-center">Riesgo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inversiones.map((inv) => (
                        <tr key={inv.id}>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <span className="rounded-circle d-inline-block" style={{ width: "8px", height: "8px", backgroundColor: inv.color }}></span>
                              <span className="fw-semibold text-dark">{inv.sector}</span>
                            </div>
                          </td>
                          <td className="text-end">{inv.monto}</td>
                          <td className="text-end text-success fw-semibold">{inv.retorno}</td>
                          <td className="text-center">
                            <span 
                              className={`badge`} 
                              style={{ 
                                fontSize: "0.75rem", 
                                padding: "0.25em 0.6em", 
                                backgroundColor: inv.riesgo === "Bajo" ? "#d1fae5" : inv.riesgo === "Moderado" ? "#e0f2fe" : "#fee2e2", 
                                color: inv.riesgo === "Bajo" ? "#065f46" : inv.riesgo === "Moderado" ? "#0369a1" : "#991b1b" 
                              }}
                            >
                              {inv.riesgo}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
