import { useEffect, useState, useCallback } from "react";
import ProductGrid from "../features/products/ProductGrid";
import { apiClient } from "../services/api";
import PageTransition from "../components/ui/PageTransition";
import PageHeader from "../components/ui/PageHeader";

export default function Tienda() {
  const [listaCategorias, setListaCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Obtener categorías del servicio
  const leerServicio = useCallback(async () => {
    try {
      setCargando(true);
      const data = await apiClient.get("categorias.php");
      setListaCategorias(data);
      if (data && data.length > 0) {
        // Auto-seleccionar la primera categoría por defecto
        setCategoriaSeleccionada(data[0]);
      }
    } catch (error) {
      console.error("Error al cargar las categorías de la tienda:", error);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    leerServicio();
  }, [leerServicio]);

  const dibujarLista = () => {
    return (
      <ul className="list-group" id="lista-categorias">
        {listaCategorias.map((item) => {
          const isActive = categoriaSeleccionada?.idcategoria === item.idcategoria;
          return (
            <li
              className={`list-group-item ${isActive ? "active" : ""}`}
              style={{ cursor: "pointer", transition: "all 0.2s" }}
              key={item.idcategoria}
              title={item.descripcion}
              onClick={() => setCategoriaSeleccionada(item)}
            >
              {item.nombre}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <PageTransition>
      <section className="paddi">
        <div className="container">
          <PageHeader
            badge="Merchandising Oficial"
            title="AETHER Boutique"
            description="Explora nuestra cuidada selección de props originales, Blu-Rays de colección y merchandising exclusivo de nuestras franquicias."
          />

          <div className="row g-4">
            <div className="col-md-3 col-xl-2 col-sm-12">
              <h5 className="mb-3 fs-6 fw-bold text-secondary text-uppercase tracking-wide">Categorías</h5>
              {cargando ? (
                <div className="text-center py-3">
                  <div className="spinner-border spinner-border-sm text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                </div>
              ) : (
                dibujarLista()
              )}
            </div>
            <div className="col-md-9 col-xl-10 col-sm-12">
              {categoriaSeleccionada && (
                <div className="mb-4">
                  <h3 className="fw-semibold text-dark">{categoriaSeleccionada.nombre}</h3>
                  <p className="text-muted">{categoriaSeleccionada.descripcion}</p>
                </div>
              )}
              
              {categoriaSeleccionada ? (
                <ProductGrid categoriaProductos={categoriaSeleccionada.idcategoria} />
              ) : (
                !cargando && <div className="alert alert-info">Selecciona una categoría para ver los productos.</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
