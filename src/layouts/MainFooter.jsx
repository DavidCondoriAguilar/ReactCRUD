import "./MainFooter.css";

export default function MainFooter() {
  return (
    <footer id="main-footer">
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
              <span className="fw-light" style={{ fontFamily: "'Outfit', serif", fontSize: "1.2rem", color: "#000" }}>
                AETHER
              </span>
            </div>
            <p className="mb-0" style={{ letterSpacing: "0.15em" }}>
              &copy; {new Date().getFullYear()} ALL RIGHTS RESERVED
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="mb-0" style={{ letterSpacing: "0.1em" }}>
              DEVELOPED BY{" "}
              <a
                href="https://davidcondoriaguilar.github.io/David-dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                DAVID CONDORI AGUILAR
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
