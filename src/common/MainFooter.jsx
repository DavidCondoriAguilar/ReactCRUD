import "./MainFooter.css";

export default function MainFooter() {
  return (
    <footer id="main-footer">
      <div className="container  text-center py-3">
        <div className="row">
          <div className="col-12">
            <p>2023 Todos los derechos Reservados</p>
          </div>
          <div className="col-12">
            <p>
              Hecho con por{" "}
              <a
                className="text-decoration-none text-white"
                href="https://davidcondoriaguilar.github.io/David-dev/"
                target="_blank"
              >
                {" "}
                ❤️ David
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
