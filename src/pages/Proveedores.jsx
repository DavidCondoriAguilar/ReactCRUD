import { useState, useEffect } from "react";
import "../style/Proveedores.css";
import { ApiWebURL } from "../utils";

export default function Proveedores() {
  // Estados para manejar el estado de carga, la lista original, la lista actual, el orden y el texto de búsqueda
  const [cargando, setCargando] = useState(true);
  const [listaProveedoresOriginal, setListaProveedoresOriginal] = useState([]);
  const [listaProveedores, setListaProveedores] = useState([]);
  const [ascendente, setAscendente] = useState(1);
  const [textoBuscar, setTextoBuscar] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Efecto de montaje que llama a leerServicio después de 3 segundos
  useEffect(() => {
    setTimeout(() => {
      leerServicio();
    }, 3000);
  }, []);

  // Función asincrónica para obtener datos del servicio y actualizar los estados
  const leerServicio = async () => {
    const rutaServicio = ApiWebURL + "proveedores.php";
    const response = await fetch(rutaServicio);
    const data = await response.json();
    setListaProveedoresOriginal(data);
    setListaProveedores(data);
    setCargando(false);
  };

    // Función para manejar el cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Función que devuelve el componente de carga
  const dibujarPreCarga = () => {
    return (
      <div className="lds-ripple text-center">
        <div></div>
        <div></div>
      </div>
    );
  };

  // Función que verifica si un valor es numérico
  const isNumeric = (value) => {
    return /^\d+$/.test(value);
  };

  // Función para manejar el clic en las columnas para ordenar la lista
  const seleccionarColumna = (event) => {
    const columnaSeleccionada = event.target.getAttribute("columna");
    setAscendente((prevAscendente) => -prevAscendente);

    // Ordena la lista de proveedores según la columna seleccionada y el orden ascendente/descendente
    const sortedProveedores = listaProveedores.slice().sort((a, b) => {
      const valorA = a[columnaSeleccionada];
      const valorB = b[columnaSeleccionada];

      if (isNumeric(valorA) && isNumeric(valorB)) {
        const numeroA = parseInt(valorA);
        const numeroB = parseInt(valorB);

        if (numeroA < numeroB) {
          return ascendente;
        } else if (numeroA > numeroB) {
          return -ascendente;
        }
      } else {
        if (valorA < valorB) {
          return ascendente;
        } else if (valorA > valorB) {
          return -ascendente;
        }
      }
      return 0;
    });

    // Actualiza la lista de proveedores con la nueva ordenación
    setListaProveedores(sortedProveedores);
  };

  // Función para manejar el cambio en el texto de búsqueda
  const buscarTexto = (event) => {
    let textoB = event.target.value;
    setTextoBuscar(textoB);

    // Filtra la lista original basada en el texto de búsqueda (coincidencia de inicio)
    const resultado = listaProveedoresOriginal.filter((item) =>
      item["nombreempresa"].toLowerCase().startsWith(textoB.toLowerCase())
    );

    // Actualiza la lista de proveedores con el resultado de la búsqueda
    setListaProveedores(resultado);
  };

  // Función que devuelve el componente de la tabla
  const dibujarTabla = () => {
    // Calcula los índices de inicio y fin para la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = listaProveedores.slice(indexOfFirstItem, indexOfLastItem);
  
    return (
      <div>
        <table className="table table-striped table-hover">
          {/* ... (tu encabezado de tabla aquí) */}
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.idproveedor}>
                <td>{item.idproveedor}</td>
                <td>{item.nombreempresa}</td>
                <td>{item.nombrecontacto}</td>
                <td>{item.cargocontacto}</td>
                <td>{item.ciudad}</td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {/* Agrega la paginación */}
        <ul className="pagination">
          {Array(Math.ceil(listaProveedores.length / itemsPerPage)).fill().map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button onClick={() => handlePageChange(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Componente principal que renderiza la sección de proveedores
  return (
    <section className="paddi">
      <div className="container">
        <h2 className="py-4">Proveedores</h2>
        {/* Input para ingresar el texto de búsqueda */}
        <input
          value={textoBuscar}
          onChange={(event) => buscarTexto(event)}
          type="text"
          className="form-control my-4"
          placeholder="Indique expresión a buscar por empresa"
        />
        {/* Condicional para mostrar la carga o la tabla según el estado 'cargando' */}
        {cargando === true ? dibujarPreCarga() : dibujarTabla()}
      </div>
    </section>
  );
}
