/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "../style/Proveedores.css";
import { ApiWebURL } from "../utils";

export default function Proveedores() {
  const [cargando, setCargando] = useState(true);
  const [listaProveedores, setListaProveedores] = useState([]);
  const [ascendente, setAscendente] = useState(1);
  const [textoBuscar, setTextoBuscar] = useState("");

  useEffect(() => {
    setTimeout(() => {
      leerServicio();
    }, 3000);
  }, []);

  const leerServicio = async () => {
    const rutaServicio = ApiWebURL + "proveedores.php";
    const response = await fetch(rutaServicio);
    const data = await response.json();
    setListaProveedores(data);
    setCargando(false);

    // fetch(rutaServicio)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setListaProveedores(data);
    //     setCargando(false);
    //   });
  };

  const dibujarPreCarga = () => {
    return (
      <div className="lds-ripple text-center">
        <div></div>
        <div></div>
      </div>
    );
  };

  // const seleccionarColumna = (event) => {
  //   let columnaSeleccionada = event.target.getAttribute("columna");
  //   setListaProveedores([...listaProveedores].sort((a,b) =>{

  //     const codigoMenor = "return a." + columnaSeleccionada + "< b." + columnaSeleccionada + "? true :false";
  //     const funcionMenor = new Function('a', 'b', codigoMenor)

  //     if(funcionMenor(a,b)){
  //       return -ascendente
  //     }

  //     const codigoMayor = "return a." + columnaSeleccionada + " > b." + columnaSeleccionada + "? true :false";
  //     const funcionMayor = new Function('a', 'b', codigoMayor)

  //     if(funcionMayor(a,b)){
  //       return ascendente;
  //     }
  //     return 0
  //   }))
  //     //! WITH EVAL
  //     //   if (eval("a." + columnaSeleccionada < b. + columnaSeleccionada)) {
  //     //     return -1;
  //     //   }
  //     //   if (eval("a." + columnaSeleccionada < b. + columnaSeleccionada)) {
  //     //     return 1;
  //     //   }
  //     //   return 0
  //     // })
  // };

  // ...
  // ...

  const isNumeric = (value) => {
    return /^\d+$/.test(value);
  };

  const seleccionarColumna = (event) => {
    const columnaSeleccionada = event.target.getAttribute("columna");

    // Cambia el estado de 'ascendente' cuando seleccionas la columna para alternar el orden
    setAscendente((prevAscendente) => -prevAscendente);

    // Ordena la lista de proveedores en función de la columna seleccionada y el orden ascendente/descendente
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

  // ...

  // ...

  const buscarTexto = (event) => {
    let textoB = event.target.value;
    setTextoBuscar(textoB);
    const resultado = listaProveedores.filter((item) => item["nombreempresa"].includes(textoB));
    setListaProveedores(resultado);

  }


  const dibujarTabla = () => {
    return (
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th
              columna="idproveedor"
              onClick={(event) => seleccionarColumna(event)}
            >
              Código
            </th>
            <th
              columna="nombreempresa"
              onClick={(event) => seleccionarColumna(event)}
            >
              Empresa
            </th>
            <th
              columna="nombrecontacto"
              onClick={(event) => seleccionarColumna(event)}
            >
              Contacto
            </th>
            <th
              columna="cargocontacto"
              onClick={(event) => seleccionarColumna(event)}
            >
              Cargo
            </th>
            <th columna="ciudad" onClick={(event) => seleccionarColumna(event)}>
              Ciudad
            </th>
          </tr>
        </thead>
        <tbody>
          {listaProveedores.map((item) => (
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
  };

  return (
    <section className="paddi">
      <div className="container">
        <h2 className="py-4">Proveedores</h2>
        <input
          value={textoBuscar}
          onChange={(event) => buscarTexto(event)}
          type="text"
          className="form-control my-4"
          placeholder="Indique explresión a buscar"
        />
        {cargando === true ? dibujarPreCarga() : dibujarTabla()}
      </div>
    </section>
  );
}
