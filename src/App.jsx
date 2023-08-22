import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainFooter from "./common/MainFooter";
import MainHeader from "./common/MainHeader";
import MainNav from "./common/MainNav";
import Inicio from "./pages/Inicio";
import Inversiones from "./pages/Inversiones";
import Proveedores from "./pages/Proveedores";
import Tienda from "./pages/Tienda";
import Empleados from "./pages/Empleados";
import ProductoDetalles from "./pages/ProductoDetalles";
import Carrito from "./pages/Carrito";

function App() {
  return (
    <>
      {/*ASI SE EJECUTA COMENTARIO*/}

      <BrowserRouter>
        <MainHeader />
        <MainNav />
        <Routes>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/inversiones" element={<Inversiones />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route
            path="/productoDetalles/:idproducto"
            element={<ProductoDetalles />}
          />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>

        <MainFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
