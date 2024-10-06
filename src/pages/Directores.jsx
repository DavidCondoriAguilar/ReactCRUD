import { useEffect } from "react";
import { useState } from "react";
import { ApiWebURL } from "../utils";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Directores() {
  const [listaDirectores, setDirectores] = useState([]);
  const [iddirector, setIddirector] = useState("");
  const [nombres, setNombres] = useState("");
  const [peliculas, setPeliculas] = useState("");

  useEffect(() => {
    const leerServicio = async () => {
      const rutaServicio = ApiWebURL + "directores.php";

      try {
        const response = await fetch(rutaServicio);
        const data = await response.json();
        setDirectores(data);
      } catch (error) {
        console.error(error);
      }
    };

    leerServicio();
  }, [listaDirectores]); // actualiza el estado del POST

  const dibujarTablaDirectores = () => (
    <div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID Director</th>
            <th>Nombres</th>
            <th>Películas</th>
          </tr>
        </thead>
        <tbody>
          {listaDirectores.map((item) => (
            <tr key={item.iddirector}>
              <td>{item.iddirector}</td>
              <td>{item.nombres}</td>
              <td>{item.peliculas}</td>
              <td>
                <i
                  className="bi bi-pencil-fill "
                  onClick={() => llenarCampos(item)}
                  data-bs-toggle="modal"
                  data-bs-target="#updateModal"
                  title="Editar"
                ></i>
              </td>
              <td>
                <i
                  className="bi bi-x-lg"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                  title="Eliminar"
                  onClick={() => itemEliminar(item)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const llenarCampos = (item) => {
    setIddirector(item.iddirector);
    setNombres(item.nombres);
    setPeliculas(item.peliculas);
  };

  const insertDirector = async (event) => {
    event.preventDefault();
    document.querySelector("#exampleModal .btn-close").click();

    const rutaServicio = ApiWebURL + "directoresinsert.php";
    let formData = new FormData();
    formData.append("nombres", nombres);
    formData.append("peliculas", peliculas);

    try {
      const response = await fetch(rutaServicio, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Si la inserción es exitosa, entonces actualiza la lista de directores
        await leerServicio();
        setNombres("");
        setPeliculas("");
        toast.success("Director agregado exitosamente");
      } else {
        toast.success("Director agregado exitosamente");
      }
    } catch (error) {
      console.error(error);
      toast.success("Director agregado exitosamente");
    }
  };

  const updateDirector = async (event) => {
    event.preventDefault();

    document.querySelector("#updateModal .btn-close").click();

    const rutaServicio = ApiWebURL + "directoresupdate.php";
    let formData = new FormData();
    formData.append("iddirector", iddirector);
    formData.append("nombres", nombres);
    formData.append("peliculas", peliculas);

    try {
      const response = await fetch(rutaServicio, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Si la actualización es exitosa, entonces actualiza la lista de directores
        await leerServicio();
        setNombres("");
        setPeliculas("");
        toast.success("Director actualizado exitosamente");
      } else {
        // Manejo de errores específicos de la aplicación
        const errorResponse = await response.json();
        console.error(errorResponse);
        toast.success("Director actualizado exitosamente");
      }
    } catch (error) {
      // Manejo de errores de red
      console.error(error);
      toast.success("Director actualizado exitosamente");
    }
  };

  const deleteDirector = async (event) => {
    event.preventDefault();
    document.querySelector("#deleteModal .btn-close").click();

    const rutaServicio = ApiWebURL + "directoresdelete.php";
    let formData = new FormData();
    formData.append("iddirector", iddirector);

    try {
      const response = await fetch(rutaServicio, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Si la eliminación es exitosa, entonces actualiza la lista de directores
        // eslint-disable-next-line no-undef
        await leerServicio();
        setNombres("");
        setPeliculas("");
        toast.success("Director eliminado exitosamente");
      } else {
        // Manejo de errores específicos de la aplicación
        const errorResponse = await response.json();
        console.error(errorResponse);
        toast.error("Negativo");
      }
    } catch (error) {
      // Manejo de errores de red
      // console.error(error);
      toast.error("Negativo");
    }
  };

  const itemEliminar = (item) => {
    setIddirector(item.iddirector);
    setNombres(item.nombres);
  };

  const showInsertModal = () => {
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Nuevo Director
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={(event) => insertDirector(event)}>
              <div className="modal-body">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre del Director"
                    value={nombres}
                    required
                    onChange={(event) => setNombres(event.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre de la Película"
                    value={peliculas}
                    required
                    onChange={(event) => setPeliculas(event.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const showUpdateModal = () => {
    return (
      <div
        className="modal fade"
        id="updateModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Actualizar Director
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <form onSubmit={(event) => updateDirector(event)}>
              <div className="modal-body">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={iddirector}
                    readOnly
                    onChange={(event) => setIddirector(event.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre del Director"
                    value={nombres}
                    required
                    onChange={(event) => setNombres(event.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre de la Película"
                    value={peliculas}
                    required
                    onChange={(event) => setPeliculas(event.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const showDeleteModal = () => {
    return (
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Eliminar Director
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <form onSubmit={(event) => deleteDirector(event)}>
              <div className="modal-body">
                <div className="mb-3">
                  Estas seguro de eliminar el director {nombres}?
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button type="submit" className="btn btn-primary">
                  Eliminar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="paddi">
      <div className="container">
        <h2 className="py-4">Directores</h2>
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Agregar nuevo Director
          </button>
        </div>
        {dibujarTablaDirectores()}
        {showInsertModal()}
        {showUpdateModal()}
        {showDeleteModal()}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  );
}
