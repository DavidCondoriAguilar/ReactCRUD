import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ApiWebURL } from "../../config/constants";
import noImage from "../../assets/image/no-img.svg";
import "./ProductGrid.css";

export default function ProductCard({ item, itemVariants, handleAgregarAlCarrito, mostrarDatosVistaRapida }) {
  const originalPrice = parseFloat(item.precio) || 0;
  const discountedPrice = parseFloat(item.preciorebajado) || 0;
  const hasDiscount = discountedPrice > 0;

  return (
    <motion.div variants={itemVariants} className="col">
      <div className="card h-100 product-card border-0 bg-transparent rounded-0">
        
        {/* Contenedor de Imagen */}
        <figure className="img-wrapper mb-0">
          <img
            src={item.imagenchica === null ? noImage : ApiWebURL + item.imagenchica}
            alt={item.nombre}
            loading="lazy"
          />
          {hasDiscount && (
            <div className="discount-badge">
              -{((1 - discountedPrice / originalPrice) * 100).toFixed(0)}%
            </div>
          )}
          
          <div className="quick-view-overlay">
            <button 
              className="quick-view-btn"
              onClick={() => mostrarDatosVistaRapida(item.idproducto)}
            >
              VISTA RÁPIDA
            </button>
          </div>
        </figure>
        
        {/* Detalles del Producto */}
        <div className="card-body d-flex flex-column p-0 mt-3">
          <p className="text-muted small mb-1" style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>
            {item.categoria || "Colección Exclusiva"}
          </p>
          
          <Link to={"/productoDetalles/" + item.idproducto} className="text-decoration-none">
            <h6 className="card-title text-dark mb-2" style={{ fontSize: "0.9rem", fontWeight: "400", letterSpacing: "0.02em" }}>
              {item.nombre}
            </h6>
          </Link>

          <div className="d-flex align-items-center mb-3">
            <span className="text-dark fw-bold" style={{ fontSize: "0.95rem" }}>
              S/ {hasDiscount ? discountedPrice.toFixed(2) : originalPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="price-list">
                S/ {originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="mt-auto">
            <button
              className="add-cart-btn"
              onClick={(e) => handleAgregarAlCarrito(item, e)}
            >
              AÑADIR AL CARRITO
            </button>
          </div>
        </div>
        
      </div>
    </motion.div>
  );
}
