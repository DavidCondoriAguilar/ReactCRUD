import { useParams } from "react-router-dom";
import noImage from "./../assets/image/no-img.jpg";
import { ApiWebURL, agregarCarrito } from "../utils";
import { Button, ToastContainer, Toast } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function ProductoDetalles() {
  const [itemProducto, setListaProductos] = useState([]);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  let params = useParams();

  useEffect(() => {
    leerServicio();
  }, []);

  const handleClick = () => {
    agregarCarrito(itemProducto,cantidad);
    setIsToastOpen(true);
    setTimeout(() => setIsToastOpen(false), 2000);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const leerServicio = () => {
    const rutaServicio =
      ApiWebURL + "productos.php?idproducto=" + params.idproducto;

    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListaProductos(data[0]);
      });
  };

  const estilosH1 = {
    fontWeight: "bold",
    color: "#175f4e",
    marginBottom: "5px",
    borderBottom: "3px solid #175f4e",
    paddingBottom: "5px",
    display: "inline-block",
  };

  return (
    <section className="paddi">
      <div className="container">
        <h1 style={estilosH1} className="text-center mb-5">
          {itemProducto.nombre}
        </h1>
        <div className="row">
          <div className="col-md-6">
            <img
              src={
                itemProducto.imagengrande === null
                  ? noImage
                  : ApiWebURL + itemProducto.imagengrande
              }
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <table className="table">
              <tbody>
                <tr>
                  <th>Detalle</th>
                  <td>{itemProducto.detalle}</td>
                </tr>
                <tr>
                  <th>Precio</th>
                  <td>
                    {" "}
                    S/{" "}
                    {itemProducto.preciorebajado === "0"
                      ? parseFloat(itemProducto.precio).toFixed(2)
                      : parseFloat(itemProducto.preciorebajado).toFixed(2)}
                    <span className="precio-lista">
                      {itemProducto.preciorebajado !== "0"
                        ? "(S/ " +
                          parseFloat(itemProducto.precio).toFixed(2) +
                          ")"
                        : ""}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>Stock</th>
                  <td>{itemProducto.unidadesenexistencia}</td>
                </tr>
                <tr>
                  <th>Categoría</th>
                  <td>{itemProducto.categoria}</td>
                </tr>
                <tr>
                  <th>Proveedores</th>
                  <td>{itemProducto.proveedor}</td>
                </tr>
                <tr>
                  <th>Atención al cliente</th>
                  <td>{itemProducto.telefono}</td>
                </tr>
                <tr>
                  <th>País</th>
                  <td>{itemProducto.pais}</td>
                </tr>
              </tbody>
            </table>


            <div className="row mb-3 g-3">
              <div className="col-auto text-center">
                <label className="col-form-label mt-3">Cantidad</label>
              </div>

              <div className="col-auto py-3">
                <input
                  type="number"
                  placeholder="Cantidad"
                  min={1}
                  value={cantidad}
                  className="form-control text-center text-bg-primary"
                  onChange={(event) => setCantidad(event.target.value)}
                />
              </div>
              <Button className="col-auto m-auto pb-1 btn btn-primary" onClick={handleClick}>
                Agregar al carrito
              </Button>
            </div>

            <h3>Descripción</h3>
            <div className="fs-6"
              dangerouslySetInnerHTML={{ __html: itemProducto.descripcion }}
            ></div>
          </div>
        </div>
      </div>


      {/* Toast para la notificación */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={isToastOpen}
          onClose={() => setIsToastOpen(false)}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="mr-auto text-success">Agregado</strong>
          </Toast.Header>
          <Toast.Body>Producto agregado al carrito.</Toast.Body>
        </Toast>
      </ToastContainer>
    </section>
  );
}

// 1:25
