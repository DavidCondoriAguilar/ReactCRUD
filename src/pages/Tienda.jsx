import { useEffect, useState } from "react";
import Productos from "../components/Productos";
import { ApiWebURL } from "../utils";

export default function Tienda() {
  const [listaCategorias, setListaCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]);

  // Utilizamos el hook useEffect para hacer una llamada a una API cada vez que el componente se renderiza o actualiza.
  useEffect(() => {
    // Llamamos a la función leerServicio para obtener los datos de la API.
    leerServicio();
  });

  // Definimos una función llamada leerServicio que realiza la solicitud a la API y actualiza el estado listaProveedores con los datos obtenidos.
  const leerServicio = () => {
    const rutaServicio = ApiWebURL + "categorias.php";
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        setListaCategorias(data);
      });
  };

  const seleccionarCategoria = (event, item) => {

    setCategoriaSeleccionada(item);

    let itemLista = document.querySelectorAll("#lista-categorias li")
    
    itemLista.forEach(item => {
      item.classList  .remove("active");
    })

    event.currentTarget.classList.add("active");

    //event.currecnt hace referncia al objeto que recibio el evento
  };

  const dibujarLista = () => {
    return (
      <ul className="list-group" id="lista-categorias">
        {listaCategorias.map((item) => (
          <li
            className="list-group-item"
            key={item.idcategoria}
            title={item.descripcion}
            onClick={(event) => seleccionarCategoria(event, item)}
          >
            {item.nombre}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className="paddi">
      <div className="container">
        <h2>Tienda</h2>
        <div className="row">
          <div className="col-md-3 col-xl-2  col-sm-12">{dibujarLista()}</div>
          <div className="col-md-9 col-xl-10 col-sm-12">
            <h3>{categoriaSeleccionada.nombre}</h3>
            <small>{categoriaSeleccionada.descripcion}</small>
            <Productos categoriaProductos ={categoriaSeleccionada.idcategoria} />
          </div>
        </div>
      </div>
    </section>
  );
}
