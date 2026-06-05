import { motion } from "framer-motion";

function PageHeader({ badge, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center mb-5"
    >
      {badge && (
        <span className="badge bg-dark bg-opacity-10 text-dark px-3 py-2 mb-3 rounded-pill text-uppercase fs-7 fw-semibold">
          {badge}
        </span>
      )}
      <h1 className="fw-bold text-dark mb-3 display-5" style={{ fontFamily: "'Outfit', sans-serif" }}>
        {title}
      </h1>
      {description && (
        <p className="text-secondary mx-auto mb-0" style={{ maxWidth: "580px", fontSize: "1.05rem" }}>
          {description}
        </p>
      )}
    </motion.div>
  );
}

export default PageHeader;
