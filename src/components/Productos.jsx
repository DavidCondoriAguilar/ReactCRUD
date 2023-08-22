/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Productos.css";
import noImage from "./../assets/image/no-img.jpg";
import { Link } from "react-router-dom";
import { ApiWebURL, agregarCarrito } from "../utils";


function Productos(props) {
  const [listaProductos, setListaProductos] = useState([]);
  const [itemProducto, setItemProducto] = useState([]);

  useEffect(() => {
    leerServicio(props.categoriaProductos);
  }, [props.categoriaProductos]);

  const leerServicio = (idcategoria) => {
    const rutaServicio =
    ApiWebURL + "productos.php?idcategoria=" + idcategoria;

    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        setListaProductos(data);
      });
  };

  
  

  const mostrarDatosVistaRapida = (idproducto) => {
    const rutaServicio =
    ApiWebURL + "productos.php?idproducto=" + idproducto;

    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setItemProducto(data[0]);
      });
  };

  const dibujarCuadricula = () => {
    return (
      <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-2 g-4">
        {listaProductos.map((item) => (
          <div
            className="col"
            key={item.idproducto}
          >
            <div className="card h-100">
              <figure className="img-content">
                <img
                  src={
                    item.imagenchica === null
                      ? noImage
                      : ApiWebURL + item.imagenchica
                  }
                  className="card-img-top img-fluid"
                />
                {item.preciorebajado !== "0" ? (
                  <div className="porcentaje-descuento">
                    {((1 - item.preciorebajado / item.precio) * 100).toFixed(0)}{" "}
                    %
                  </div>
                ) : (
                  ""
                )}
                <div className="vista-rapida">
                  <i
                    className="fs-3 bi bi-eye text-white"
                    data-bs-toggle="modal"
                    data-bs-target="#vistaRapidaModal"
                    onClick={() => mostrarDatosVistaRapida(item.idproducto)}
                  ></i>
                </div>
              </figure>
              <div className="card-body">
                <Link to={"/productoDetalles/" + item.idproducto}>
                  <h5 className="card-title fs-5">{item.nombre}</h5>
                </Link>

                <p className="card-text fs-6">
                  S/{" "}
                  {item.preciorebajado === "0"
                    ? parseFloat(item.precio).toFixed(2)
                    : parseFloat(item.preciorebajado).toFixed(2)}
                  <span className="precio-lista">
                    {item.preciorebajado !== "0"
                      ? "(S/ " + parseFloat(item.precio).toFixed(2) + ")"
                      : ""}
                  </span>
                  <i
                    className="bi bi-basket-fill mx-2 btnCarrito"
                    title="Añadir al carrito"
                    onClick={() => agregarCarrito(item)}
                  ></i>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  

  const dibujarVistaRapida = () => {
    return (
      <div
        className="modal fade"
        id="vistaRapidaModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {itemProducto.nombre}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <img
                    src={
                      itemProducto.imagengrande === null
                        ? noImage
                        :ApiWebURL +
                          itemProducto.imagengrande
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
                            : parseFloat(itemProducto.preciorebajado).toFixed(
                                2
                              )}
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
                        <th>Categoría</th>
                        <td>{itemProducto.categoria}</td>
                      </tr>
                      <tr>
                        <th>Proveedores</th>
                        <td>{itemProducto.proveedor}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => agregarCarrito(itemProducto)}>
                Ir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="container">
      {dibujarCuadricula()} {dibujarVistaRapida()}
    </div>
  );
}

export default Productos;
