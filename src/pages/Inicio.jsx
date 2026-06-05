import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "../components/ui/PageTransition";
import "./Inicio.css";

export default function Inicio() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    },
  };

  return (
    <PageTransition>
      <div className="fashion-inicio">
        <motion.div 
          className="fashion-container"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants} className="fashion-badge">
            The New Collection
          </motion.div>

          <motion.h1 variants={itemVariants} className="fashion-title">
            Aether
          </motion.h1>

          <motion.p variants={itemVariants} className="fashion-sub-title">
            Redefiniendo la elegancia cinematográfica a través de una experiencia sensorial absoluta. Descubre el arte detrás de cada producción.
          </motion.p>

          <motion.div variants={itemVariants} className="fashion-action-grid">
            <Link to="/tienda" className="fashion-btn-primary">
              Boutique
            </Link>
            <Link to="/inversiones" className="fashion-btn-secondary">
              Editorial
            </Link>
          </motion.div>

          <motion.div variants={containerVariants} className="fashion-cards-container">
            <motion.div variants={itemVariants} className="fashion-card">
              <div className="fashion-card-icon">
                <i className="bi bi-camera"></i>
              </div>
              <h3 className="fashion-card-title">Atelier Visual</h3>
              <p className="fashion-card-text">
                Una aproximación artesanal a la creación de imágenes donde cada fotograma es esculpido con precisión de alta costura.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="fashion-card">
              <div className="fashion-card-icon">
                <i className="bi bi-gem"></i>
              </div>
              <h3 className="fashion-card-title">Colección Exclusiva</h3>
              <p className="fashion-card-text">
                Piezas maestras atemporales curadas para ofrecer experiencias estéticas inigualables en 70mm.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="fashion-card">
              <div className="fashion-card-icon">
                <i className="bi bi-globe"></i>
              </div>
              <h3 className="fashion-card-title">Impacto Global</h3>
              <p className="fashion-card-text">
                Obras concebidas en nuestro estudio que trascienden fronteras y dictan las tendencias del arte contemporáneo.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
