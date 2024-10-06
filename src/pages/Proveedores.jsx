import { useState, useEffect, useMemo, useCallback } from "react";
import "../style/Proveedores.css"; // Usando CSS regular
import { ApiWebURL } from "../utils";

// Componente principal
export default function Proveedores() {
  const [cargando, setCargando] = useState(true);
  const [listaProveedoresOriginal, setListaProveedoresOriginal] = useState([]);
  const [textoBuscar, setTextoBuscar] = useState("");
  const [ascendente, setAscendente] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Obtener datos del servicio
  useEffect(() => {
    const leerServicio = async () => {
      try {
        const response = await fetch(`${ApiWebURL}proveedores.php`);
        const data = await response.json();
        setListaProveedoresOriginal(data);
      } catch (error) {
        console.error("Error al cargar los proveedores:", error);
      } finally {
        setCargando(false);
      }
    };
    leerServicio();
  }, []);

  // Manejo del cambio en el texto de búsqueda
  const handleSearchChange = useCallback((event) => {
    setTextoBuscar(event.target.value.toLowerCase());
    setCurrentPage(1); // Reinicia la página al cambiar el filtro de búsqueda
  }, []);

  // Ordenación y filtrado de la lista de proveedores
  const listaFiltradaYOrdenada = useMemo(() => {
    const filtrada = listaProveedoresOriginal.filter((item) =>
      item.nombreempresa.toLowerCase().startsWith(textoBuscar)
    );

    const ordenada = filtrada.sort((a, b) => {
      const valorA = a.nombreempresa;
      const valorB = b.nombreempresa;
      return ascendente ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
    });

    return ordenada;
  }, [listaProveedoresOriginal, textoBuscar, ascendente]);

  // Obtener los proveedores de la página actual
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return listaFiltradaYOrdenada.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, listaFiltradaYOrdenada]);

  // Manejo del cambio de página
  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  // Alternar el orden ascendente/descendente
  const toggleAscendente = useCallback(() => {
    setAscendente((prev) => !prev);
  }, []);

  // Componente de la tabla de proveedores
  const TablaProveedores = () => (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th onClick={toggleAscendente} style={{ cursor: "pointer" }}>
            Empresa {ascendente ? "↑" : "↓"}
          </th>
          <th>Contacto</th>
          <th>Cargo</th>
          <th>Ciudad</th>
        </tr>
      </thead>
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
  );

  // Componente de paginación
  const Paginacion = () => {
    const totalPages = Math.ceil(listaFiltradaYOrdenada.length / itemsPerPage);
    return (
      <ul className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
            <button onClick={() => handlePageChange(index + 1)} className="page-link">
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className="proveedores-section">
      <div className="container">
        <h2 className="py-4">Proveedores</h2>
        <input
          value={textoBuscar}
          onChange={handleSearchChange}
          type="text"
          className="form-control my-4"
          placeholder="Buscar empresa"
        />
        {cargando ? (
          <div className="lds-ripple text-center py-5">
            <div></div>
            <div></div>
          </div>
        ) : (
          <>
            <TablaProveedores />
            <Paginacion />
          </>
        )}
      </div>
    </section>
  );
}
