import { useEffect, useState, useCallback } from "react";
import { useCart } from "../../context/CartContext";
import { apiClient } from "../../services/api";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";
import "./ProductGrid.css";

function Productos({ categoriaProductos }) {
  const [listaProductos, setListaProductos] = useState([]);
  const [itemProducto, setItemProducto] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  
  const { addToCart } = useCart();

  const leerServicio = useCallback(async (idcategoria) => {
    if (!idcategoria) return;
    try {
      setCargando(true);
      const data = await apiClient.get(`productos.php?idcategoria=${idcategoria}`);
      setListaProductos(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    leerServicio(categoriaProductos);
  }, [categoriaProductos, leerServicio]);

  const mostrarDatosVistaRapida = async (idproducto) => {
    try {
      const data = await apiClient.get(`productos.php?idproducto=${idproducto}`);
      if (data && data.length > 0) {
        setItemProducto(data[0]);
        setShowQuickView(true);
      }
    } catch (error) {
      console.error("Error al obtener detalles del producto:", error);
    }
  };

  const handleQuickViewClose = () => {
    setShowQuickView(false);
    setItemProducto(null);
  };

  const handleAgregarAlCarrito = (item, e) => {
    if (e) e.preventDefault();
    addToCart(item, 1);
  };

  // Contenedor para animaciones escalonadas
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  // Ítem individual para animación
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 70, damping: 15 },
    },
  };

  const dibujarCuadricula = () => {
    if (cargando) {
      return (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando productos...</span>
          </div>
        </div>
      );
    }

    if (listaProductos.length === 0) {
      return <div className="alert alert-info text-center my-4">No hay productos en esta categoría.</div>;
    }

    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-2 g-4"
      >
        {listaProductos.map((item) => (
          <ProductCard
            key={item.idproducto}
            item={item}
            itemVariants={itemVariants}
            handleAgregarAlCarrito={handleAgregarAlCarrito}
            mostrarDatosVistaRapida={mostrarDatosVistaRapida}
          />
        ))}
      </motion.div>
    );
  };

  return (
    <div className="container p-0">
      {dibujarCuadricula()}
      <QuickViewModal
        showQuickView={showQuickView}
        handleQuickViewClose={handleQuickViewClose}
        itemProducto={itemProducto}
        addToCart={addToCart}
      />
    </div>
  );
}

export default Productos;
