import { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);

  // Cargar carrito inicial desde sessionStorage
  useEffect(() => {
    try {
      const storedCart = sessionStorage.getItem("carritocompras");
      if (storedCart) {
        const parsed = JSON.parse(storedCart);
        const hasCorruptData = parsed.some(
          (item) => Number(item.precio) === 0 && Number(item.idproducto) > 0
        );
        if (hasCorruptData) {
          sessionStorage.removeItem("carritocompras");
          return;
        }
        const normalized = parsed.map((item) => ({
          ...item,
          precio: Number(item.precio) || 0,
          cantidad: Number(item.cantidad) || 1,
        }));
        setCart(normalized);
      }
    } catch (error) {
      console.error("Error al cargar el carrito de sessionStorage:", error);
    }
  }, []);

  // Guardar en sessionStorage cuando el carrito cambie
  const saveCart = (newCart) => {
    setCart(newCart);
    sessionStorage.setItem("carritocompras", JSON.stringify(newCart));
  };

  const showNotification = (product) => {
    const name = product.nombre || product.nombreproducto || "Producto";
    setNotification(`Añadido: ${name}`);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addToCart = (product, quantity = 1) => {
    const qty = Number(quantity) || 1;
    
    const finalProduct = {
      ...product,
      precio: (parseFloat(product.preciorebajado) || 0) > 0
        ? parseFloat(product.preciorebajado)
        : parseFloat(product.precio) || 0,
      cantidad: qty
    };

    const existingIndex = cart.findIndex((item) => item.idproducto === finalProduct.idproducto);

    if (existingIndex === -1) {
      saveCart([...cart, finalProduct]);
    } else {
      const updatedCart = [...cart];
      updatedCart[existingIndex].cantidad += qty;
      saveCart(updatedCart);
    }

    showNotification(finalProduct);
  };

  const updateQuantity = (productId, quantity) => {
    const parsed = parseInt(quantity, 10);
    const qty = isNaN(parsed) || parsed < 1 ? 1 : parsed;
    const updatedCart = cart.map((item) =>
      item.idproducto === productId ? { ...item, cantidad: qty } : item
    );
    saveCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.idproducto !== productId);
    saveCart(updatedCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  // Calcular total acumulado de dinero
  const cartTotal = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  // Calcular total acumulado de items
  const cartCount = cart.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
      
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
            style={{
              position: "fixed",
              bottom: "40px",
              right: "40px",
              background: "#000000",
              border: "1px solid #000000",
              color: "#ffffff",
              padding: "16px 32px",
              borderRadius: "0px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              zIndex: 99999,
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              fontWeight: 300
            }}
          >
            <div style={{
              width: "24px", height: "24px",
              border: "1px solid #ffffff",
              borderRadius: "0px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <i className="bi bi-check" style={{ color: "#fff", fontSize: "1.2rem" }}></i>
            </div>
            {notification}
          </motion.div>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
}
