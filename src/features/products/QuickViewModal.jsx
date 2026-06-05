import { Modal, Button } from "react-bootstrap";
import { ApiWebURL } from "../../config/constants";
import noImage from "../../assets/image/no-img.svg";

export default function QuickViewModal({
  showQuickView,
  handleQuickViewClose,
  itemProducto,
  addToCart,
}) {
  if (!itemProducto) return null;

  const originalPrice = parseFloat(itemProducto.precio) || 0;
  const discountedPrice = parseFloat(itemProducto.preciorebajado) || 0;
  const hasDiscount = discountedPrice > 0;

  return (
    <Modal
      show={showQuickView}
      onHide={handleQuickViewClose}
      size="lg"
      centered
      className="premium-modal"
    >
      <Modal.Header closeButton className="border-0 pb-0"></Modal.Header>
      <Modal.Body className="pt-0">
        <div className="row g-5 align-items-center">
          <div
            className="col-md-5 text-center p-4 bg-light rounded-4 ms-3"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "350px",
            }}
          >
            <img
              src={
                itemProducto.imagengrande === null
                  ? noImage
                  : ApiWebURL + itemProducto.imagengrande
              }
              className="img-fluid"
              alt={itemProducto.nombre}
              loading="lazy"
              style={{
                maxHeight: "300px",
                objectFit: "contain",
                filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.1))",
              }}
            />
          </div>
          <div className="col-md-6 pe-4">
            <span
              className="badge bg-dark mb-3 px-3 py-2 text-uppercase"
              style={{ letterSpacing: "1px" }}
            >
              {itemProducto.categoria}
            </span>
            <h2
              className="fs-3 fw-bold text-dark mb-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {itemProducto.nombre}
            </h2>
            <p className="text-muted small mb-4">
              SKU: {itemProducto.idproducto} | Prov: {itemProducto.proveedor}
            </p>

            <div className="d-flex align-items-baseline gap-3 mb-4">
              <span
                className="fs-2 fw-bold text-dark"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                S/ {hasDiscount ? discountedPrice.toFixed(2) : originalPrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-muted text-decoration-line-through fs-5">
                  S/ {originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p
              className="text-secondary mb-4 pb-4 border-bottom"
              style={{ lineHeight: "1.7" }}
            >
              {itemProducto.detalle}
            </p>

            {itemProducto.unidadesenexistencia !== undefined && (
              <div className="d-flex align-items-center gap-2 mb-4">
                <div
                  className={`rounded-circle ${
                    itemProducto.unidadesenexistencia > 0 ? "bg-success" : "bg-danger"
                  }`}
                  style={{ width: "10px", height: "10px" }}
                ></div>
                <span className="fw-medium text-dark">
                  {itemProducto.unidadesenexistencia > 0 ? "En Stock" : "Agotado"}
                </span>
                <span className="text-muted small">
                  ({itemProducto.unidadesenexistencia} unidades disponibles)
                </span>
              </div>
            )}

            <Button
              variant="dark"
              size="lg"
              className="w-100 rounded-pill fw-bold py-3 text-uppercase shadow"
              style={{ letterSpacing: "1px", transition: "transform 0.2s" }}
              onClick={() => {
                addToCart(itemProducto, 1);
                handleQuickViewClose();
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              disabled={itemProducto.unidadesenexistencia === 0}
            >
              <i className="bi bi-cart-plus me-2 fs-5"></i>
              Agregar al Carrito
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
