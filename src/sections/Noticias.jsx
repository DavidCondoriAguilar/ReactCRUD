import one from '../assets/image/news-1.svg'
import two from '../assets/image/news-2.svg'
import three from '../assets/image/news-3.svg'

export default function Noticias() {
  const articles = [
    {
      id: 1,
      title: "Expansión en Producción Virtual y CGI 2026",
      image: one,
      summary: "Iniciamos el año fiscal anunciando una transición completa hacia ecosistemas de producción virtual en volumen (Volume Led).",
      content: "Este hito responde a nuestro plan estratégico. Los nuevos estudios de rodaje, desarrollados en alianza con laboratorios tecnológicos de Munich, reducen los tiempos de postproducción VFX en un 42%, garantizando estrenos más rápidos con fotorrealismo absoluto."
    },
    {
      id: 2,
      title: "Nuevo Récord de Taquilla Global (Box Office)",
      image: two,
      summary: "Nuestra última superproducción de ciencia ficción ha superado la marca de los mil millones en su segundo fin de semana.",
      content: "Dirigida por uno de nuestros talentos exclusivos, la película no solo es un éxito comercial rotundo en Asia y Europa, sino que ha agotado instantáneamente el inventario de Props y Blu-Rays de colección en nuestra Boutique Oficial."
    },
    {
      id: 3,
      title: "Alianza Estratégica para Distribución IMAX",
      image: three,
      summary: "Anunciamos un acuerdo exclusivo para asegurar el formato de 70mm en nuestras próximas tres franquicias.",
      content: "Esta alianza logística nos permite elevar el estándar de exhibición teatral. Las producciones contarán con soporte nativo IMAX y distribución prioritaria en salas de gran formato, asegurando una experiencia inmersiva para el espectador."
    }
  ];

  return (
    <section id="noticias" className="paddi bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="text-primary fw-semibold text-uppercase tracking-wider fs-7">Actualidad & Rodajes</span>
          <h2 className="mt-1 mb-2 fw-bold text-dark h1">Noticias del Estudio</h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: "580px", fontSize: "0.95rem" }}>
            Mantente al día con los últimos lanzamientos de taquilla, adquisiciones de directores y estrategias de producción del universo AETHER Entertainment.
          </p>
        </div>

        <div className="row g-4">
          {articles.map((art) => (
            <article className="col-lg-4" key={art.id}>
              <div className="card h-100 border-0 shadow-sm overflow-hidden bg-white">
                <div className="position-relative" style={{ height: "240px", overflow: "hidden" }}>
                  <img 
                    src={art.image} 
                    className="w-100 h-100" 
                    alt={art.title} 
                    style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                    onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                    onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                  />
                </div>
                <div className="card-body p-4 d-flex flex-column justify-content-between">
                  <div>
                    <h4 className="card-title text-dark fs-5 fw-semibold mb-3" style={{ lineHeight: "1.4" }}>
                      {art.title}
                    </h4>
                    <p className="card-text text-secondary mb-3 fs-7 fw-medium" style={{ lineHeight: "1.6" }}>
                      {art.summary}
                    </p>
                    <p className="card-text text-muted fs-8 mb-0" style={{ fontSize: "0.82rem", lineHeight: "1.6" }}>
                      {art.content}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
