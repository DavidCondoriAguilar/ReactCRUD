import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainFooter from "./layouts/MainFooter";
import MainHeader from "./layouts/MainHeader";
import MainNav from "./layouts/MainNav";
import Inicio from "./pages/Inicio";
import Inversiones from "./pages/Inversiones";
import Proveedores from "./pages/Proveedores";
import Tienda from "./pages/Tienda";
import Empleados from "./pages/Empleados";
import ProductoDetalles from "./pages/ProductoDetalles";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import Directores from "./pages/Directores";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import { CartProvider } from "./context/CartContext";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <BrowserRouter>
          <div className="app-shell">
            <MainNav />
            <div className="app-main">
              <MainHeader />
              <Routes>
                <Route index element={<Inicio />} />
                <Route path="inicio" element={<Inicio />} />
                <Route path="inversiones" element={<Inversiones />} />
                <Route path="directores" element={<Directores />} />
                <Route path="proveedores" element={<Proveedores />} />
                <Route path="tienda" element={<Tienda />} />
                <Route path="empleados" element={<Empleados />} />
                <Route path="productoDetalles/:idproducto" element={<ProductoDetalles />} />
            <Route path="carrito" element={<Carrito />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="login" element={<Login />} />
            <Route path="registro" element={<Registro />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <MainFooter />
            </div>
          </div>
        </BrowserRouter>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
