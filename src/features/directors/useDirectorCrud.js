import { useState, useCallback } from "react";
import { apiClient } from "../../services/api";
import { toast } from "react-toastify";

export function useDirectorCrud() {
  const [listaDirectores, setDirectores] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [iddirector, setIddirector] = useState("");
  const [nombres, setNombres] = useState("");
  const [peliculas, setPeliculas] = useState("");

  const leerServicio = useCallback(async () => {
    try {
      setCargando(true);
      const data = await apiClient.get("directores.php");
      setDirectores(data);
    } catch (error) {
      console.error("Error al obtener los directores:", error);
      toast.error("Error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  }, []);

  const form = { iddirector, setIddirector, nombres, setNombres, peliculas, setPeliculas };

  const modal = { modalInsert, setModalInsert, modalUpdate, setModalUpdate, modalDelete, setModalDelete };

  const prepararInsertar = () => {
    setIddirector("");
    setNombres("");
    setPeliculas("");
    setModalInsert(true);
  };

  const prepararEditar = (item) => {
    setIddirector(item.iddirector);
    setNombres(item.nombres);
    setPeliculas(item.peliculas);
    setModalUpdate(true);
  };

  const prepararEliminar = (item) => {
    setIddirector(item.iddirector);
    setNombres(item.nombres);
    setModalDelete(true);
  };

  const handleInsert = async (event) => {
    event.preventDefault();
    if (!nombres.trim() || !peliculas.trim()) {
      toast.warning("Por favor completa todos los campos.");
      return;
    }

    const formData = new FormData();
    formData.append("nombres", nombres);
    formData.append("peliculas", peliculas);

    try {
      const response = await apiClient.post("directoresinsert.php", formData);
      if (response) {
        toast.success("Director agregado exitosamente");
        setModalInsert(false);
        leerServicio();
      } else {
        toast.error("No se pudo agregar el director.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al agregar el director.");
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!nombres.trim() || !peliculas.trim()) {
      toast.warning("Por favor completa todos los campos.");
      return;
    }

    const formData = new FormData();
    formData.append("iddirector", iddirector);
    formData.append("nombres", nombres);
    formData.append("peliculas", peliculas);

    try {
      const response = await apiClient.post("directoresupdate.php", formData);
      if (response) {
        toast.success("Director actualizado exitosamente");
        setModalUpdate(false);
        leerServicio();
      } else {
        toast.error("No se pudo actualizar el director.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al actualizar el director.");
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("iddirector", iddirector);

    try {
      const response = await apiClient.post("directoresdelete.php", formData);
      if (response) {
        toast.success("Director eliminado exitosamente");
        setModalDelete(false);
        leerServicio();
      } else {
        toast.error("No se pudo eliminar el director.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al eliminar el director.");
    }
  };

  return {
    listaDirectores, cargando,
    form, modal,
    prepararInsertar, prepararEditar, prepararEliminar,
    handleInsert, handleUpdate, handleDelete,
    leerServicio,
  };
}
