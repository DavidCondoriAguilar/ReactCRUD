import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CartSummary({ cart, cartTotal, clearCart }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="col-lg-4"
    >
      <div className="card shadow-sm border p-4 bg-white rounded-4 sticky-lg-top" style={{ top: "100px" }}>
        <h4 className="fw-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Resumen de Orden</h4>
        
        <div className="d-flex justify-content-between mb-3 text-secondary">
          <span>Subtotal ({cart.reduce((s, i) => s + i.cantidad, 0)} items)</span>
          <span className="fw-medium text-dark">S/ {cartTotal.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-4 pb-4 border-bottom text-secondary">
          <span>Envío Estimado</span>
          <span className="text-success fw-medium">Gratis</span>
        </div>
        
        <div className="d-flex justify-content-between mb-5">
          <span className="fs-5 fw-bold text-dark">Total</span>
          <span className="fs-3 fw-bold text-dark" style={{ fontFamily: "'Outfit', sans-serif", lineHeight: "1" }}>S/ {cartTotal.toFixed(2)}</span>
        </div>
        
        <Link
          to="/checkout"
          className="btn btn-dark w-100 py-3 mb-3 rounded-pill fw-bold text-uppercase d-flex align-items-center justify-content-center gap-2 shadow text-decoration-none"
          style={{ letterSpacing: "1px", transition: "all 0.3s" }}
        >
          Ir a Pagar <i className="bi bi-arrow-right"></i>
        </Link>
        
        <button
          className="btn btn-outline-danger w-100 py-2 rounded-pill fw-medium d-flex align-items-center justify-content-center gap-2"
          onClick={clearCart}
          style={{ transition: "all 0.2s" }}
        >
          <i className="bi bi-trash3"></i> Vaciar Bolsa
        </button>
      </div>
    </motion.div>
  );
}
