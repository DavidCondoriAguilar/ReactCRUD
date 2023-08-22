// Importamos los hooks necesarios de React
import { useEffect } from "react";
import { useState } from "react";
import { ApiWebURL } from "../utils";

// Definimos el componente Empleados
export default function Empleados() {
  // Creamos un estado llamado listaEmpleados y una función setEmpleados para actualizarlo.
  const [listaEmpleados, setEmpleados] = useState([]);

  // Utilizamos el hook useEffect para hacer una llamada a una API al cargar el componente.
  useEffect(() => {
    // Definimos una función asincrónica llamada leerServicio.
    const leerServicio = async () => {
      // URL del servicio que contiene los datos de los empleados.
      const rutaServicio = ApiWebURL + "empleados.php";

      try {
        // Hacemos una solicitud a la API usando fetch.
        const response = await fetch(rutaServicio);
        // Convertimos la respuesta a formato JSON.
        const data = await response.json();
        // Actualizamos el estado listaEmpleados con los datos obtenidos.
        setEmpleados(data);
      } catch (error) {
        console.error(error);
      }
    };

    // Llamamos a la función leerServicio para obtener los datos de la API.
    leerServicio();
  }, []); // El segundo argumento (un array vacío) asegura que useEffect solo se ejecute una vez al cargar el componente.

  // Definimos una función llamada dibujarCuadricula que renderiza la información de los empleados en una cuadrícula.
  const dibujarCuadricula = () => {
    return (
      <div className="row row-cols-1 row-cols-md-5 align-items-center ">
        {/* Iteramos a través de la lista de empleados y generamos una tarjeta para cada uno. */}
        {listaEmpleados.map((item) => (
          <div className="col py-2" key={item.idempleado}>
            <div className="card h-100 ">
              <img
                src={ApiWebURL +"fotos/" + item.foto}
                className="card-img-top img-fluid text-center"
                alt={`Foto de ${item.nombres} ${item.apellidos}`}
                style={{ width: "350px", height: "300px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.cargo}</h5>
                <p className="card-text">
                  {item.nombres} {item.apellidos}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="paddi">
      <div className="container">
        <h2 className="py-4">Empleados</h2>
        {dibujarCuadricula()}
      </div>
    </section>
  );
}
