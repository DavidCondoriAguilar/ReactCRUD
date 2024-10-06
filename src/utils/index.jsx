export const ApiWebURL = "https://servicios.campus.pe/";

export const agregarCarrito = (item, cantidad) => {
  //IMPORTANTE
  item.cantidad = cantidad == null ? 1 : cantidad;

  //Comprobando si hay precio rebajado, reemplazamos por el precio default
  if (item.preciorebajado !== "0") {
    item.precio = item.preciorebajado;
  }

  let carrito = [];

  if (sessionStorage.getItem("carritocompras")) {
    carrito = JSON.parse(sessionStorage.getItem("carritocompras"));
    let index = -1;
    
    for (let i = 0; i < carrito.length; i++) {
      if (item.idproducto === carrito[i].idproducto) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      carrito.push(item);
      sessionStorage.setItem("carritocompras", JSON.stringify(carrito));
    } else {
      carrito[index].cantidad++;
      carrito[index].precioOriginal = item.precioOriginal;
      sessionStorage.setItem("carritocompras", JSON.stringify(carrito));
    }
  } else {
    carrito.push(item);
    sessionStorage.setItem("carritocompras", JSON.stringify(carrito));
  }
};
