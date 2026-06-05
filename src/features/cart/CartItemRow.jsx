import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function QuantityStepper({ value, min, onChange }) {
  const [local, setLocal] = useState(value);
  const timerRef = useRef(null);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  const commit = (v) => {
    const clamped = Math.max(min, parseInt(v, 10) || min);
    onChange(clamped);
  };

  const handleChange = (e) => {
    const raw = e.target.value;
    if (raw === "" || /^\d+$/.test(raw)) {
      setLocal(raw);
    }
  };

  const handleBlur = () => {
    commit(local);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      commit(local);
      e.target.blur();
    }
  };

  const step = (delta) => {
    const next = Math.max(min, (parseInt(local, 10) || min) + delta);
    setLocal(next);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onChange(next), 200);
  };

  return (
    <div className="d-inline-flex align-items-center border rounded-3 overflow-hidden" style={{ height: 34 }}>
      <button
        className="btn btn-link text-decoration-none px-1 px-sm-2 text-muted border-end rounded-0"
        style={{ lineHeight: 1, fontSize: "1rem", height: "100%" }}
        onClick={() => step(-1)}
        aria-label="Reducir cantidad"
      >
        <i className="bi bi-dash-lg"></i>
      </button>
      <input
        type="text"
        inputMode="numeric"
        className="text-center border-0 fw-semibold"
        style={{ width: 40, minWidth: 36, outline: "none", fontSize: "0.85rem", fontFamily: "'Outfit', sans-serif" }}
        value={local}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        aria-label="Cantidad"
      />
      <button
        className="btn btn-link text-decoration-none px-1 px-sm-2 text-muted border-start rounded-0"
        style={{ lineHeight: 1, fontSize: "1rem", height: "100%" }}
        onClick={() => step(1)}
        aria-label="Aumentar cantidad"
      >
        <i className="bi bi-plus-lg"></i>
      </button>
    </div>
  );
}

export default function CartItemRow({ item, tableRowVariants, updateQuantity, removeFromCart }) {
  return (
    <motion.tr
      variants={tableRowVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      layout
      className="border-bottom"
    >
      <td className="d-none d-md-table-cell text-muted fs-7">{item.idproducto}</td>
      <td className="py-3 py-md-4">
        <Link to={`/productoDetalles/${item.idproducto}`} className="text-decoration-none text-dark fw-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {item.nombre}
        </Link>
      </td>
      <td className="d-none d-sm-table-cell text-center fw-medium text-dark">
        S/ {parseFloat(item.precio).toFixed(2)}
      </td>
      <td className="text-center">
        <QuantityStepper
          value={item.cantidad}
          min={1}
          onChange={(v) => updateQuantity(item.idproducto, v)}
        />
      </td>
      <td className="text-end fw-bold text-dark" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(0.85rem, 2vw, 1rem)" }}>
        S/ {parseFloat(item.precio * item.cantidad).toFixed(2)}
      </td>
      <td className="text-center">
        <button
          className="btn btn-light btn-sm rounded-circle text-danger d-flex align-items-center justify-content-center mx-auto"
          style={{ width: 32, height: 32, transition: "all 0.2s" }}
          title="Eliminar"
          onClick={() => removeFromCart(item.idproducto)}
        >
          <i className="bi bi-trash3"></i>
        </button>
      </td>
    </motion.tr>
  );
}
