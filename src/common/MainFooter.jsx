import "./MainFooter.css";

export default function MainFooter() {
  return (
    <footer id="main-footer" className=" bg-dark text-white pb-2">
      <div className="container text-center py-3">
        <div className="row">
          {/* Texto para pantallas pequeñas */}
          <div className="col-12 col-md-6">
            <p className="mb-1">2023 Todos los derechos reservados</p>
          </div>
          {/* Enlace hecho por David para pantallas grandes */}
          <div className="col-12 col-md-6">
            <p className="mb-1">
              Hecho con <span role="img" aria-label="heart">❤️</span> por{" "}
              <a
                className="text-decoration-none text-white"
                href="https://davidcondoriaguilar.github.io/David-dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                David
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
