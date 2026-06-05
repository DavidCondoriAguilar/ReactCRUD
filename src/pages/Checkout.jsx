import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const PAYPAL_CLIENT_ID = "sb";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "Lima",
    country: "Perú",
    zip: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const updateForm = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const shipping = 0;
  const tax = useMemo(() => cartTotal * 0.18, [cartTotal]);
  const grandTotal = cartTotal + shipping + tax;

  useEffect(() => {
    if (cart.length === 0 && !completed) {
      navigate("/carrito");
    }
  }, [cart, completed, navigate]);

  useEffect(() => {
    if (paymentMethod === "paypal" && !paypalLoaded) {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
      script.async = true;
      script.onload = () => {
        setPaypalLoaded(true);
        setTimeout(() => {
          const container = document.getElementById("paypal-button-container");
          if (container && window.paypal) {
            window.paypal.Buttons({
              createOrder: (_data, actions) =>
                actions.order.create({
                  purchase_units: [
                    {
                      amount: { value: grandTotal.toFixed(2) },
                      description: "AETHER Entertainment - Compra",
                    },
                  ],
                }),
              onApprove: (_data, actions) =>
                actions.order.capture().then(() => {
                  setProcessing(false);
                  setCompleted(true);
                  clearCart();
                }),
              onError: () => {
                setProcessing(false);
                alert("Hubo un error al procesar el pago. Intenta de nuevo.");
              },
            }).render("#paypal-button-container");
          }
        }, 500);
      };
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [paymentMethod, paypalLoaded, grandTotal, clearCart]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (paymentMethod !== "paypal") {
      setProcessing(true);
      await new Promise((r) => setTimeout(r, 2000));
      setProcessing(false);
      setCompleted(true);
      clearCart();
    }
  };

  if (completed) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh", padding: "1.5rem" }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-center w-100"
          style={{ maxWidth: 500 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            className="d-inline-flex align-items-center justify-content-center mb-4"
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #10b981, #059669)",
              color: "white",
              fontSize: "2rem",
            }}
          >
            <i className="bi bi-check-lg"></i>
          </motion.div>
          <h1 className="fw-bold mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>¡Compra Confirmada!</h1>
          <p className="text-muted mb-2">
            Gracias por tu compra, <strong>{form.fullName || "cliente"}</strong>.
          </p>
          <p className="text-muted mb-4" style={{ fontSize: "0.9rem" }}>
            Recibirás un correo con los detalles de tu pedido en <strong>{form.email || "tu correo"}</strong>.
          </p>
          <div
            className="mb-4 p-3 rounded-3 d-inline-block w-100 w-sm-auto"
            style={{ background: "var(--bg-tertiary)", fontSize: "0.85rem" }}
          >
            <i className="bi bi-truck me-2 text-primary"></i>
            Tiempo estimado de entrega: 5-7 días hábiles
          </div>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link to="/tienda" className="btn btn-dark rounded-pill px-4 py-2">
              Seguir Comprando
            </Link>
            <Link to="/" className="btn btn-outline-secondary rounded-pill px-4 py-2">
              Ir al Inicio
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      <div className="container py-3 py-md-4">
        <div className="mb-3 mb-md-4">
          <Link
            to="/carrito"
            className="text-decoration-none text-muted d-inline-flex align-items-center gap-2"
            style={{ fontSize: "0.9rem" }}
          >
            <i className="bi bi-arrow-left"></i> Volver al carrito
          </Link>
        </div>

        <div className="d-flex justify-content-center mb-4 mb-md-5 px-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="d-flex align-items-center">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle fw-bold"
                style={{
                  width: "clamp(28px, 5vw, 36px)",
                  height: "clamp(28px, 5vw, 36px)",
                  fontSize: "clamp(0.75rem, 2vw, 0.85rem)",
                  background:
                    step >= s ? "var(--accent-primary)" : "var(--bg-tertiary)",
                  color: step >= s ? "white" : "var(--text-muted)",
                  border: `2px solid ${step >= s ? "var(--accent-primary)" : "var(--border-color)"}`,
                  transition: "all 0.3s ease",
                }}
              >
                {step > s ? <i className="bi bi-check"></i> : s}
              </div>
              {s < 3 && (
                <div
                  className="d-none d-sm-block"
                  style={{
                    width: "clamp(24px, 8vw, 80px)",
                    height: 2,
                    background:
                      step > s ? "var(--accent-primary)" : "var(--border-color)",
                    transition: "background 0.3s ease",
                  }}
                />
              )}
              {s < 3 && (
                <div
                  className="d-sm-none"
                  style={{
                    width: "clamp(12px, 4vw, 24px)",
                    height: 2,
                    background:
                      step > s ? "var(--accent-primary)" : "var(--border-color)",
                    transition: "background 0.3s ease",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && (
                  <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4">
                    <h4 className="fw-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Información de Envío
                    </h4>
                    <div className="row g-3">
                      <div className="col-sm-6">
                        <label className="form-label fw-medium text-secondary" style={{ fontSize: "0.85rem" }}>Nombre Completo</label>
                        <input type="text" className="form-control" placeholder="Juan Pérez" value={form.fullName} onChange={updateForm("fullName")} required />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label fw-medium text-secondary" style={{ fontSize: "0.85rem" }}>Correo Electrónico</label>
                        <input type="email" className="form-control" placeholder="juan@email.com" value={form.email} onChange={updateForm("email")} required />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label fw-medium text-secondary" style={{ fontSize: "0.85rem" }}>Teléfono</label>
                        <input type="tel" className="form-control" placeholder="+51 999 999 999" value={form.phone} onChange={updateForm("phone")} required />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-medium text-secondary" style={{ fontSize: "0.85rem" }}>Dirección</label>
                        <input type="text" className="form-control" placeholder="Av. Principal 123" value={form.address} onChange={updateForm("address")} required />
                      </div>
                      <div className="col-sm-4">
                        <label className="form-label fw-medium text-secondary" style={{ fontSize: "0.85rem" }}>Ciudad</label>
                        <input type="text" className="form-control" value={form.city} onChange={updateForm("city")} />
                      </div>
                      <div className="col-sm-4">
                        <label className="form-label fw-medium text-secondary" style={{ fontSize: "0.85rem" }}>País</label>
                        <input type="text" className="form-control" value={form.country} onChange={updateForm("country")} />
                      </div>
                      <div className="col-sm-4">
                        <label className="form-label fw-medium text-secondary" style={{ fontSize: "0.85rem" }}>Código Postal</label>
                        <input type="text" className="form-control" placeholder="15001" value={form.zip} onChange={updateForm("zip")} />
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mt-4">
                      <button className="btn btn-dark rounded-pill px-4 px-md-5 py-2 w-100 w-sm-auto" onClick={() => setStep(2)}>
                        Continuar al Pago
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4">
                    <h4 className="fw-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Método de Pago
                    </h4>

                    <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-3 mb-4">
                      {[
                        { id: "card", label: "Tarjeta", icon: "bi-credit-card" },
                        { id: "paypal", label: "PayPal", icon: "bi-paypal" },
                        { id: "mercadopago", label: "Mercado Pago", icon: "bi-currency-dollar" },
                      ].map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setPaymentMethod(m.id)}
                          className="btn d-flex align-items-center justify-content-center gap-2 rounded-pill px-4 py-2"
                          style={{
                            border: `2px solid ${paymentMethod === m.id ? "var(--accent-primary)" : "var(--border-color)"}`,
                            background: paymentMethod === m.id ? "var(--accent-primary-light)" : "transparent",
                            color: paymentMethod === m.id ? "var(--accent-primary)" : "var(--text-secondary)",
                            fontWeight: paymentMethod === m.id ? 600 : 500,
                            transition: "all 0.2s ease",
                          }}
                        >
                          <i className={`bi ${m.icon}`}></i>
                          {m.label}
                        </button>
                      ))}
                    </div>

                    {paymentMethod === "card" && (
                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label fw-medium text-secondary" style={{ fontSize: "0.85rem" }}>Número de Tarjeta</label>
                          <input type="text" className="form-control" placeholder="4242 4242 4242 4242" maxLength={19} value={form.cardNumber} onChange={updateForm("cardNumber")} />
                        </div>
                        <div className="col-sm-6">
                          <label className="form-label fw-medium text-secondary" style={{ fontSize: "0.85rem" }}>Vencimiento</label>
                          <input type="text" className="form-control" placeholder="MM/AA" maxLength={5} value={form.cardExpiry} onChange={updateForm("cardExpiry")} />
                        </div>
                        <div className="col-sm-6">
                          <label className="form-label fw-medium text-secondary" style={{ fontSize: "0.85rem" }}>CVV</label>
                          <input type="text" className="form-control" placeholder="123" maxLength={4} value={form.cardCvv} onChange={updateForm("cardCvv")} />
                        </div>
                        <div className="col-12">
                          <label className="form-label fw-medium text-secondary" style={{ fontSize: "0.85rem" }}>Titular de la Tarjeta</label>
                          <input type="text" className="form-control" placeholder="Juan Pérez" value={form.cardName} onChange={updateForm("cardName")} />
                        </div>
                        <div className="col-12 mt-3">
                          <div className="p-3 rounded-3" style={{ background: "var(--bg-tertiary)", fontSize: "0.85rem" }}>
                            <i className="bi bi-shield-lock me-2 text-success"></i>
                            Tus datos están protegidos con encriptación SSL de 256 bits.
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "paypal" && (
                      <div className="text-center py-4">
                        <i className="bi bi-paypal mb-3 d-block" style={{ fontSize: "3rem", color: "#003087" }}></i>
                        <p className="text-muted mb-4" style={{ fontSize: "0.9rem" }}>
                          Serás redirigido a PayPal para completar el pago de forma segura.
                        </p>
                        <div className="paypal-button-container" id="paypal-button-container"></div>
                        {!paypalLoaded && (
                          <div className="text-center py-3">
                            <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                            <span className="text-muted" style={{ fontSize: "0.85rem" }}>Cargando PayPal...</span>
                          </div>
                        )}
                      </div>
                    )}

                    {paymentMethod === "mercadopago" && (
                      <div className="py-3">
                        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3 mb-4 p-3 rounded-3" style={{ background: "var(--bg-tertiary)" }}>
                          <i className="bi bi-info-circle text-primary fs-5 flex-shrink-0"></i>
                          <div style={{ fontSize: "0.85rem" }}>
                            <strong>Modo de Prueba</strong>
                            <br />
                            <span className="text-muted">Usa la tarjeta de prueba: <strong>5031 7557 3453 0604</strong> — CVV: <strong>123</strong> — Vencimiento: <strong>11/25</strong></span>
                          </div>
                        </div>
                        <div className="row g-3">
                          <div className="col-12">
                            <label className="form-label fw-medium text-secondary" style={{ fontSize: "0.85rem" }}>Número de Tarjeta</label>
                            <input type="text" className="form-control" placeholder="5031 7557 3453 0604" value={form.cardNumber} onChange={updateForm("cardNumber")} />
                          </div>
                          <div className="col-sm-6">
                            <label className="form-label fw-medium text-secondary" style={{ fontSize: "0.85rem" }}>Vencimiento</label>
                            <input type="text" className="form-control" placeholder="11/25" value={form.cardExpiry} onChange={updateForm("cardExpiry")} />
                          </div>
                          <div className="col-sm-6">
                            <label className="form-label fw-medium text-secondary" style={{ fontSize: "0.85rem" }}>CVV</label>
                            <input type="text" className="form-control" placeholder="123" value={form.cardCvv} onChange={updateForm("cardCvv")} />
                          </div>
                          <div className="col-12">
                            <label className="form-label fw-medium text-secondary" style={{ fontSize: "0.85rem" }}>Documento</label>
                            <input type="text" className="form-control" placeholder="DNI: 12345678" />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-stretch align-items-sm-center mt-4 pt-3 border-top gap-3 gap-sm-0">
                      <button className="btn btn-outline-secondary rounded-pill px-4 py-2" onClick={() => setStep(1)}>
                        <i className="bi bi-arrow-left me-1"></i> Atrás
                      </button>
                      <button
                        className="btn btn-dark rounded-pill px-5 py-2 d-flex align-items-center justify-content-center gap-2"
                        onClick={handlePlaceOrder}
                        disabled={processing || (paymentMethod === "paypal" && !paypalLoaded)}
                      >
                        {processing ? (
                          <>
                            <span className="spinner-border spinner-border-sm"></span>
                            Procesando...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-lock"></i>
                            Pagar S/ {grandTotal.toFixed(2)}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4">
              <h5 className="fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Resumen del Pedido</h5>
              {cart.map((item) => (
                <div key={item.idproducto} className="d-flex gap-3 mb-3 pb-3 border-bottom" style={{ fontSize: "0.85rem" }}>
                  <div
                    className="flex-shrink-0 d-flex align-items-center justify-content-center rounded-3 bg-light"
                    style={{ width: 48, height: 48, fontSize: "0.75rem", color: "var(--text-muted)" }}
                  >
                    <i className="bi bi-box"></i>
                  </div>
                  <div className="flex-grow-1 min-w-0">
                    <div className="fw-medium text-truncate">{item.nombre}</div>
                    <div className="text-muted">
                      S/ {Number(item.precio).toFixed(2)} x {item.cantidad}
                    </div>
                  </div>
                  <div className="fw-semibold flex-shrink-0">
                    S/ {(item.precio * item.cantidad).toFixed(2)}
                  </div>
                </div>
              ))}
              <div style={{ fontSize: "0.9rem" }}>
                <div className="d-flex justify-content-between py-1 text-muted">
                  <span>Subtotal</span>
                  <span>S/ {cartTotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between py-1 text-muted">
                  <span>Envío</span>
                  <span className="text-success">Gratis</span>
                </div>
                <div className="d-flex justify-content-between py-1 text-muted">
                  <span>IGV (18%)</span>
                  <span>S/ {tax.toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold" style={{ fontSize: "1.1rem" }}>
                  <span>Total</span>
                  <span style={{ color: "var(--accent-primary)" }}>S/ {grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4 mt-3" style={{ fontSize: "0.85rem" }}>
              <h6 className="fw-semibold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Garantía AETHER</h6>
              <div className="d-flex align-items-center gap-2 mb-2 text-muted">
                <i className="bi bi-shield-check text-success"></i>
                Compra 100% segura
              </div>
              <div className="d-flex align-items-center gap-2 mb-2 text-muted">
                <i className="bi bi-arrow-return-left text-primary"></i>
                Devolución gratuita en 30 días
              </div>
              <div className="d-flex align-items-center gap-2 text-muted">
                <i className="bi bi-headset text-warning"></i>
                Soporte 24/7
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
