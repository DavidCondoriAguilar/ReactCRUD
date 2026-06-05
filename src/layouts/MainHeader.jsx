import "./MainHeader.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MainHeader() {
  const [date, setDate] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      setDate(now.toLocaleDateString(undefined, options));
    };

    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/tienda?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header id="main-header" className="border-bottom">
      <div className="d-flex align-items-center justify-content-between px-3 px-lg-4" style={{ height: 56 }}>
        <div className="d-flex align-items-center gap-3">
          <span className="status-indicator d-none d-sm-flex align-items-center gap-2" style={{
            padding: "4px 12px",
            background: "rgba(16, 185, 129, 0.1)",
            borderRadius: "20px",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            fontSize: "0.8rem",
            fontWeight: 500,
            letterSpacing: "0.02em",
            color: "var(--text-secondary)"
          }}>
            <i className="bi bi-circle text-success" style={{ fontSize: "0.65rem" }}></i>
            Sistema Operativo
          </span>
        </div>

        <div className="d-flex align-items-center gap-2 w-100 d-lg-none mx-3">
          <div className="position-relative w-100" style={{ maxWidth: 320 }}>
            <i className="bi bi-search position-absolute text-muted" style={{ left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: '0.85rem', pointerEvents: 'none' }}></i>
            <input
              type="text"
              placeholder="Buscar productos..."
              className="form-control border-0 bg-light rounded-pill"
              style={{ paddingLeft: 30, fontSize: '0.85rem', height: 34 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              aria-label="Buscar productos"
            />
          </div>
        </div>

        <div className="d-flex align-items-center gap-4">
          <span className="text-secondary d-none d-md-inline" style={{
            fontSize: "0.8rem",
            letterSpacing: "0.02em"
          }}>
            <i className="bi bi-calendar3 me-1"></i>
            <span id="current-date" style={{ fontFamily: "'Outfit', sans-serif" }}>{date}</span>
          </span>
        </div>
      </div>
    </header>
  );
}

export default MainHeader;
