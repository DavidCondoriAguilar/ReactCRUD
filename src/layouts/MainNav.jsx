import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import MobileMenu from "./MobileMenu";
import "./MainNav.css";

const navSections = [
  {
    label: 'Tienda',
    items: [
      { to: '/', label: 'Inicio', icon: 'bi-house-door', end: true },
      { to: '/tienda', label: 'Tienda', icon: 'bi-shop' },
      { to: '/carrito', label: 'Carrito', icon: 'bi-cart3' },
    ],
  },
  {
    label: 'Gestión',
    items: [
      { to: '/directores', label: 'Directores', icon: 'bi-camera-reels' },
      { to: '/empleados', label: 'Empleados', icon: 'bi-people' },
      { to: '/proveedores', label: 'Proveedores', icon: 'bi-truck' },
      { to: '/inversiones', label: 'Inversiones', icon: 'bi-graph-up-arrow' },
    ],
  },
];

function MainNav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/tienda?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'show' : ''}`}>
        <MobileMenu isOpen={isMobileMenuOpen} onToggle={setIsMobileMenuOpen} />
      </div>

      {/* Desktop sidebar */}
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} aria-label="Navegación principal">
        <div className="sidebar-header">
          <NavLink to="/" className="sidebar-logo">
            <span className="sidebar-logo-symbol">Æ</span>
            <span className="sidebar-logo-text">AETHER</span>
          </NavLink>
          <button
            className="sidebar-collapse-btn d-none d-lg-flex"
            onClick={toggleCollapse}
            aria-label={isCollapsed ? 'Expandir menú' : 'Colapsar menú'}
          >
            <i className={`bi bi-chevron-${isCollapsed ? 'right' : 'left'}`}></i>
          </button>
        </div>

        <div className="sidebar-search">
          <i className="bi bi-search sidebar-search-icon"></i>
          <input
            type="text"
            placeholder="Buscar productos..."
            className="sidebar-search-input"
            aria-label="Buscar productos"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        <nav className="sidebar-nav">
          {navSections.map((section) => (
            <div key={section.label} className="sidebar-section">
              <span className="sidebar-section-label">{section.label}</span>
              <ul className="sidebar-list">
                {section.items.map((item) => (
                  <li key={item.to} className="sidebar-item">
                    <NavLink
                      to={item.to}
                      end={item.end}
                      title={item.label}
                      className={({ isActive }) =>
                        `sidebar-link ${isActive ? 'active' : ''}`
                      }
                    >
                      <i className={`bi ${item.icon} sidebar-link-icon`}></i>
                      <span className="sidebar-link-text">{item.label}</span>
                      {item.to === '/carrito' && cartCount > 0 && (
                        <span className="sidebar-badge">{cartCount}</span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <NavLink to="/login" className="sidebar-link sidebar-user">
            <i className="bi bi-person-circle sidebar-link-icon"></i>
            <span className="sidebar-link-text">Iniciar Sesión</span>
          </NavLink>
        </div>
      </aside>

      {/* Mobile toggle button */}
      <button
        className="mobile-nav-toggle d-lg-none"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Abrir menú"
        aria-expanded={isMobileMenuOpen}
      >
        <i className={`bi bi-${isMobileMenuOpen ? 'x-lg' : 'list'}`}></i>
      </button>
    </>
  );
}

export default MainNav;
