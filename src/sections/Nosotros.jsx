import "./Nosotros.css";

export default function Nosotros() {
  return (
    <section id="nosotros" className="nosotros-section">
      <div className="nosotros-content">
        <div className="nosotros-header">
          <div className="nosotros-badge">
            <span className="badge-dot"></span>
            Nuestra Esencia
          </div>
          <h1 className="nosotros-title">Nuestra Historia</h1>
        </div>
        
        <div className="nosotros-body">
          <div className="nosotros-text">
            <p className="nosotros-intro">
              Fundada en 2021, <strong className="highlight-text">AETHER Entertainment</strong> nació con una visión clara: 
            </p>
            <p className="nosotros-detail">
              redefinir la narrativa audiovisual a través de superproducciones que desafían los límites del arte y la tecnología.
            </p>
            <p className="nosotros-detail">
              Lo que comenzó como una productora de efectos visuales (VFX) independiente se ha consolidado hoy como un holding de entretenimiento global. Colaboramos con los directores más visionarios, operamos canales de merchandising exclusivo y gestionamos fondos de inversión de taquilla internacional.
            </p>
            <p className="nosotros-detail">
              Nos impulsa la creencia de que el cine no es solo un medio, sino la experiencia inmersiva definitiva de nuestra era.
            </p>
          </div>
          
          <div className="nosotros-values">
            <div className="value-card">
              <div className="value-icon">
                <i className="bi bi-camera-reels"></i>
              </div>
              <div className="value-content">
                <h3 className="value-title">Cine de Autor</h3>
                <p className="value-description">
                  Financiamos y producimos películas que otorgan total libertad creativa a nuestros directores exclusivos.
                </p>
              </div>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <i className="bi bi-cpu"></i>
              </div>
              <div className="value-content">
                <h3 className="value-title">Tecnología VFX</h3>
                <p className="value-description">
                  Desarrollamos motores gráficos propios y tecnología de captura de movimiento de última generación.
                </p>
              </div>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <i className="bi bi-star"></i>
              </div>
              <div className="value-content">
                <h3 className="value-title">Gestión de Talento</h3>
                <p className="value-description">
                  Un ecosistema de soporte completo para actores, guionistas y equipo técnico de primer nivel mundial.
                </p>
              </div>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <i className="bi bi-graph-up-arrow"></i>
              </div>
              <div className="value-content">
                <h3 className="value-title">Box Office ROI</h3>
                <p className="value-description">
                  Nuestras inversiones cinematográficas garantizan un rendimiento transparente para nuestros socios.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="nosotros-divider"></div>
      </div>
    </section>
  );
}
