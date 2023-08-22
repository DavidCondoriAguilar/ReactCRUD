/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "../style/Carrito.css"; // Estilos CSS personalizados

export default function Carrito() {
  const [itemsCarrito, setItemCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    leerDatosCarrito();
  }, []);

  const leerDatosCarrito = async () => {
    let datosCarrito = await JSON.parse(
      sessionStorage.getItem("carritocompras")
    );
    setItemCarrito(datosCarrito);
    if (datosCarrito !== null) {
      calcularTotal(datosCarrito);
    }
  };

  const vaciarCarrito = () => {
    sessionStorage.removeItem("carritocompras");
    setItemCarrito([]);
    setTotal(0);
  };

  const eliminarItem = (item) => {
    let carritoMenos = itemsCarrito.filter(
      (itemCarrito) => itemCarrito.idproducto !== item.idproducto
    );
    setItemCarrito(carritoMenos);
    sessionStorage.setItem("carritocompras", JSON.stringify(carritoMenos));
    calcularTotal(carritoMenos);
  };

  const actualizarCantidad = (cantidad, index) => {
    let carritoCantidad = [...itemsCarrito];
    carritoCantidad[index].cantidad = cantidad;
    setItemCarrito(carritoCantidad);
    calcularTotal(carritoCantidad);
    sessionStorage.setItem("carritocompras", JSON.stringify(carritoCantidad));
  };

  const calcularTotal = (datosCarrito) => {
    let suma = datosCarrito.reduce(
      (acumular, fila) => acumular + fila["precio"] * fila["cantidad"],
      0
    );
    setTotal(suma);
  };

  const dibujarTabla = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th className="text-center fw-bold">Código</th>
            <th>Nombre</th>
            <th className="text-center">Precio</th>
            <th className="text-center">Cantidad</th>
            <th className="text-end">Subtotal</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {itemsCarrito === null ? (
            <></>
          ) : (
            itemsCarrito.map((item, index) => (
              <tr key={item.idproducto}>
                <td className="text-center">{item.idproducto}</td>
                <td>{item.nombre}</td>
                <td className="text-center">
                  {Number(item.precio).toFixed(2)}
                </td>
                <td className="text-end form-css">
                  {/* {" "} */}
                  <input
                    type="number"
                    className="text-center form-control "
                    min="0"
                    value={item.cantidad}
                    onChange={(event) =>
                      actualizarCantidad(event.target.value, index)
                    }
                  />
                </td>
                <td className="text-end">
                  {Number(item.precio * item.cantidad).toFixed(2)}
                </td>
                <td className="text-center equis">
                  <i
                    className="bi bi-x-lg text-center"
                    title="Eliminar"
                    onClick={() => eliminarItem(item)}
                  ></i>
                </td>
              </tr>
            ))
          )}
        </tbody>

        <tfoot>
          <tr>
            <th colSpan="4" className="text-end">
              Total
            </th>
            <th className="text-end">{Number(total).toFixed(2)}</th>
          </tr>
        </tfoot>
        {itemsCarrito.length === 0 && (
          <p className="text-center ">El carrito está vacío. 😢</p>
        )}
      </table>
    );
  };

  return (
    <section className="paddi">
      <div className="container">
        <h1 className="mb-5">Carrito de compras</h1>
        <div className="row">
          <div className="col-md-10">{dibujarTabla()}</div>
          <div className="col-md-2">
            <button className="btn btn-danger" onClick={() => vaciarCarrito()}>
              Vaciar Carrito <i className="bi bi-trash fs-4"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
