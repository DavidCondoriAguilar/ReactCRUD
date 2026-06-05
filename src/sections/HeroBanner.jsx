import firstSlide from '../assets/image/banner-1.svg'
import twoSlide from '../assets/image/banner-2.svg'
import thirdSlide from '../assets/image/banner-3.svg'
import "./HeroBanner.css";
import { useEffect, useState, useRef } from "react";

export default function MainBanner() {
  const slides = [
    {
      image: firstSlide,
      title: "AETHER ENTERTAINMENT",
      subtitle: "PRODUCCIÓN CINEMATOGRÁFICA & VFX",
      description: "Creando historias inmersivas que redefinen el futuro del cine y el entretenimiento digital."
    },
    {
      image: twoSlide,
      title: "BOUTIQUE OFICIAL",
      subtitle: "MERCHANDISING & EDICIONES LIMITADAS",
      description: "Coleccionables de alta gama, props originales de rodaje y Blu-Rays 4K de nuestras producciones."
    },
    {
      image: thirdSlide,
      title: "BOX OFFICE & INVERSIONES",
      subtitle: "FINANZAS DE PRODUCCIÓN",
      description: "Transparencia total en el rendimiento de taquilla y presupuestos de nuestros últimos lanzamientos."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!sliderRef.current) return;

    // Set initial transform
    updateSliderPosition();

    // Auto play
    const interval = setInterval(() => {
      if (isAutoPlay) {
        nextSlide();
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const updateSliderPosition = () => {
    if (sliderRef.current) {
      const offset = -currentIndex * (100 / slides.length);
      sliderRef.current.style.transform = `translateX(${offset}%)`;
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="main-banner">
      <div className="banner-slider" ref={sliderRef}>
        {slides.map((slide, idx) => (
          <div 
            key={idx} 
            className={`banner-slide ${idx === currentIndex ? "active" : ""}`}
            style={{ 
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="banner-overlay"></div>
            <div className="banner-content">
              <div className="banner-tag">
                {slide.subtitle}
              </div>
              <h1 className="banner-title">
                {slide.title}
              </h1>
              <p className="banner-description">
                {slide.description}
              </p>
              <a href="#features" className="banner-button">
                Explorar Servicios
                <span className="button-arrow">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <div className="banner-navigation">
        <button 
          className="banner-nav-button prev" 
          aria-label="Anterior"
          onClick={() => {
            setIsAutoPlay(false);
            prevSlide();
          }}
        >
          <span className="nav-icon">‹</span>
        </button>
        <div className="banner-dots">
          {slides.map((_, idx) => (
            <button 
              key={idx} 
              className={`banner-dot ${idx === currentIndex ? "active" : ""}`}
              aria-label={`Diapositiva ${idx + 1}`}
              onClick={() => {
                setIsAutoPlay(false);
                goToSlide(idx);
              }}
            ></button>
          ))}
        </div>
        <button 
          className="banner-nav-button next" 
          aria-label="Siguiente"
          onClick={() => {
            setIsAutoPlay(false);
            nextSlide();
          }}
        >
          <span className="nav-icon">›</span>
        </button>
      </div>
    </div>
  );
}
