import DOMPurify from "dompurify";
import { useParams, Link } from "react-router-dom";
import noImage from "./../assets/image/no-img.svg";
import { useCart } from "../context/CartContext";
import { useFetch } from "../hooks/useFetch";
import { getPricing } from "../utils/pricing";
import { ApiWebURL } from "../config/constants";
import { ToastContainer, Toast } from "react-bootstrap";
import { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "../components/ui/PageTransition";

export default function ProductoDetalles() {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  const { idproducto } = useParams();
  const { addToCart } = useCart();
  const { data: productos, loading, error } = useFetch(`productos.php?idproducto=${idproducto}`);
  const itemProducto = productos && productos.length > 0 ? productos[0] : null;
  const pricing = getPricing(itemProducto);

  const handleClick = () => {
    if (itemProducto) {
      addToCart(itemProducto, cantidad);
      setIsToastOpen(true);
    }
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
          <div className="spinner-border text-dark" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Cargando detalles...</span>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (error || !itemProducto) {
    return (
      <PageTransition>
        <div className="container py-5 text-center" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <i className="bi bi-exclamation-circle text-muted mb-3" style={{ fontSize: "3rem" }}></i>
          <h2 className="text-dark mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Producto no encontrado</h2>
          <p className="text-secondary mb-4">El producto que buscas no existe o ha sido retirado de nuestro catálogo.</p>
          <Link to="/tienda" className="btn btn-dark px-4 py-2 rounded-pill">
            Explorar Colección
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="py-5 bg-white">
        <div className="container py-lg-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4 pb-2 border-bottom"
          >
            <Link to="/tienda" className="text-decoration-none text-muted fw-medium d-inline-flex align-items-center gap-2 hover-text-dark" style={{ transition: "color 0.2s" }}>
              <i className="bi bi-arrow-left"></i> Volver a la Colección
            </Link>
          </motion.div>

          <div className="row g-5 align-items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="col-lg-6"
            >
              <div className="bg-light rounded-4 d-flex align-items-center justify-content-center position-relative overflow-hidden" style={{ minHeight: "500px" }}>
                 {pricing.hasDiscount && (
                    <div className="position-absolute top-0 start-0 m-4 badge bg-danger fs-6 px-3 py-2 shadow-sm" style={{ zIndex: 1, letterSpacing: "1px" }}>
                      {pricing.discountPercent}% OFF
                    </div>
                  )}
                <img
                  src={
                    itemProducto.imagengrande === null
                      ? noImage
                      : ApiWebURL + itemProducto.imagengrande
                  }
                  className="img-fluid"
                  alt={itemProducto.nombre}
                  style={{ maxHeight: "450px", objectFit: "contain", filter: "drop-shadow(0px 20px 30px rgba(0,0,0,0.1))" }}
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="col-lg-6 ps-lg-5"
            >
              <div className="mb-3 d-flex align-items-center gap-3">
                <span className="badge bg-dark px-3 py-2 text-uppercase tracking-wider fs-8">{itemProducto.categoria}</span>
                <span className="text-muted small"><i className="bi bi-box me-1"></i> Stock: {itemProducto.unidadesenexistencia}</span>
              </div>
              
              <h1 className="fw-bold text-dark mb-3 display-5" style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.02em" }}>
                {itemProducto.nombre}
              </h1>
              
              <p className="text-secondary fs-5 mb-4" style={{ lineHeight: "1.6" }}>{itemProducto.detalle}</p>

              <div className="d-flex align-items-end gap-3 mb-5 pb-4 border-bottom">
                <span className="fw-bold text-dark" style={{ fontSize: "2.5rem", fontFamily: "'Outfit', sans-serif", lineHeight: "1" }}>
                  S/ {pricing.effectivePrice.toFixed(2)}
                </span>
                {pricing.hasDiscount && (
                  <span className="text-muted text-decoration-line-through mb-1" style={{ fontSize: "1.25rem" }}>
                    S/ {pricing.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="row g-3 align-items-center mb-5">
                <div className="col-auto">
                  <div className="input-group" style={{ width: "130px" }}>
                    <button className="btn btn-outline-secondary px-3" type="button" onClick={() => setCantidad(Math.max(1, cantidad - 1))}>-</button>
                    <input
                      type="number"
                      className="form-control text-center px-0 border-secondary"
                      value={cantidad}
                      onChange={(event) => setCantidad(Math.max(1, parseInt(event.target.value) || 1))}
                    />
                    <button className="btn btn-outline-secondary px-3" type="button" onClick={() => setCantidad(cantidad + 1)}>+</button>
                  </div>
                </div>
                <div className="col">
                  <button 
                    className="btn btn-dark w-100 py-3 rounded-pill fw-bold text-uppercase d-flex align-items-center justify-content-center gap-2" 
                    onClick={handleClick}
                    style={{ letterSpacing: "1px", transition: "all 0.3s" }}
                  >
                    <i className="bi bi-bag-plus fs-5"></i> Agregar a la Bolsa
                  </button>
                </div>
              </div>

              <div className="bg-light p-4 rounded-4 mb-4">
                <h5 className="fw-semibold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Información del Proveedor</h5>
                <ul className="list-unstyled mb-0 text-secondary">
                  <li className="mb-2"><i className="bi bi-building me-2"></i> {itemProducto.proveedor}</li>
                  {itemProducto.pais && <li className="mb-2"><i className="bi bi-globe-americas me-2"></i> {itemProducto.pais}</li>}
                  {itemProducto.telefono && <li><i className="bi bi-telephone me-2"></i> {itemProducto.telefono}</li>}
                </ul>
              </div>

            </motion.div>
          </div>
          
          {itemProducto.descripcion && (
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5 }}
               className="row mt-5 pt-5"
             >
               <div className="col-12 col-lg-8 mx-auto text-center">
                  <h3 className="fw-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Acerca de este producto</h3>
                  <div
                    className="text-secondary lh-lg fs-6"
                    style={{ textAlign: "justify" }}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(itemProducto.descripcion) }}
                  ></div>
               </div>
             </motion.div>
          )}

        </div>

        <ToastContainer position="bottom-end" className="p-4 position-fixed" style={{ zIndex: 1050 }}>
          <Toast
            show={isToastOpen}
            onClose={() => setIsToastOpen(false)}
            delay={3000}
            autohide
            className="border-0 shadow-lg"
          >
            <Toast.Header closeButton className="border-0 bg-dark text-white rounded-top">
              <i className="bi bi-check-circle-fill text-success me-2"></i>
              <strong className="me-auto" style={{ fontFamily: "'Outfit', sans-serif" }}>AETHER GROUP</strong>
            </Toast.Header>
            <Toast.Body className="bg-white rounded-bottom">
              <span className="fw-medium text-dark">{cantidad}x {itemProducto.nombre}</span> añadido a tu bolsa.
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </section>
    </PageTransition>
  );
}
