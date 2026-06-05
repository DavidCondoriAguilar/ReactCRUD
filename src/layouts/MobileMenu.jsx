import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from "../context/CartContext";

const navSections = [
  {
    label: 'Tienda',
    items: [
      { to: '/', label: 'Inicio', icon: 'bi-house-door', end: true },
      { to: '/tienda', label: 'Tienda', icon: 'bi-shop' },
      { to: '/carrito', label: 'Carrito', icon: 'bi-cart' },
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

function MobileMenu({ isOpen, onToggle }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/tienda?q=${encodeURIComponent(searchQuery.trim())}`);
      onToggle();
    }
  };

  return (
    <div className="mobile-menu">
      <div className="mobile-menu-content">
        <div className="mobile-menu-header">
          <NavLink to="/" className="sidebar-logo" onClick={onToggle}>
            <span className="sidebar-logo-symbol">Æ</span>
            <span className="sidebar-logo-text">AETHER</span>
          </NavLink>
          <button
            className="mobile-menu-close"
            onClick={onToggle}
            aria-label="Cerrar menú"
          >
            <i className="bi bi-x-lg"></i>
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

        <nav className="sidebar-nav" style={{ padding: '0.5rem 0' }}>
          {navSections.map((section) => (
            <div key={section.label} className="sidebar-section">
              <span className="sidebar-section-label">{section.label}</span>
              <ul className="sidebar-list">
                {section.items.map((item) => (
                  <li key={item.to} className="sidebar-item">
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        `sidebar-link ${isActive ? 'active' : ''}`
                      }
                      onClick={onToggle}
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

        <div className="sidebar-footer" style={{ padding: '0.75rem 0' }}>
          <NavLink to="/login" className="sidebar-link sidebar-user" onClick={onToggle}>
            <i className="bi bi-person-circle sidebar-link-icon"></i>
            <span className="sidebar-link-text">Iniciar Sesión</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
