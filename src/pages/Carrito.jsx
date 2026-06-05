import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/ui/PageTransition";
import CartItemRow from "../features/cart/CartItemRow";
import CartSummary from "../features/cart/CartSummary";
import "./Carrito.css";

export default function Carrito() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
  } = useCart();

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } }
  };

  const dibujarTabla = () => {
    return (
      <div className="table-responsive bg-white rounded-4 shadow-sm border p-2 p-md-3">
        <table className="table table-borderless align-middle mb-0">
          <thead className="border-bottom">
            <tr>
              <th className="d-none d-md-table-cell text-secondary fw-semibold text-uppercase fs-8 py-3" style={{ width: "100px", letterSpacing: "1px" }}>SKU</th>
              <th className="text-secondary fw-semibold text-uppercase fs-8 py-3" style={{ letterSpacing: "1px" }}>Producto</th>
              <th className="d-none d-sm-table-cell text-center text-secondary fw-semibold text-uppercase fs-8 py-3" style={{ width: "120px", letterSpacing: "1px" }}>Precio</th>
              <th className="text-center text-secondary fw-semibold text-uppercase fs-8 py-3" style={{ width: "140px", letterSpacing: "1px" }}>Cantidad</th>
              <th className="text-end text-secondary fw-semibold text-uppercase fs-8 py-3" style={{ width: "120px", letterSpacing: "1px" }}>Subtotal</th>
              <th className="text-center py-3" style={{ width: "60px" }}></th>
            </tr>
          </thead>

          <motion.tbody>
            <AnimatePresence>
              {cart.map((item) => (
                <CartItemRow
                  key={item.idproducto}
                  item={item}
                  tableRowVariants={tableRowVariants}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}
            </AnimatePresence>
          </motion.tbody>
        </table>
      </div>
    );
  };

  return (
    <PageTransition>
      <section className="py-4 py-md-5 bg-light min-vh-100">
        <div className="container py-lg-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 mb-md-5 text-center"
          >
            <span className="text-primary fw-semibold text-uppercase tracking-wider fs-7">Tu Selección</span>
            <h1 className="mt-1 mb-2 fw-bold text-dark" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(1.75rem, 5vw, 3rem)", letterSpacing: "-0.02em" }}>AETHER Boutique — Carrito</h1>
          </motion.div>

          {cart.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-5 bg-white rounded-4 shadow-sm border mx-auto"
              style={{ maxWidth: "600px" }}
            >
              <div className="mb-4 d-inline-flex align-items-center justify-content-center bg-light rounded-circle" style={{ width: "100px", height: "100px" }}>
                <i className="bi bi-bag-x fs-1 text-muted"></i>
              </div>
              <h3 className="fw-bold text-dark mb-3" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(1.25rem, 4vw, 1.75rem)" }}>Tu bolsa está vacía</h3>
              <p className="text-secondary mb-4 px-4">Aún no has agregado ningún coleccionable ni prop oficial a tu carrito de la Boutique.</p>
              <Link to="/tienda" className="btn btn-dark px-5 py-3 rounded-pill fw-bold text-uppercase" style={{ letterSpacing: "1px", transition: "transform 0.2s" }} onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                Explorar Catálogo
              </Link>
            </motion.div>
          ) : (
            <div className="row g-4 g-md-5">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="col-lg-8"
              >
                {dibujarTabla()}
              </motion.div>

              <CartSummary cart={cart} cartTotal={cartTotal} clearCart={clearCart} />
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
