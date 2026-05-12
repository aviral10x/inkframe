import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'WORK', path: '/', external: false },
    { name: 'STUDIO', path: '/about', external: false },
    { name: 'SERVICES', path: '/services', external: false },
    { name: 'REEL', path: '/reel', external: false },
    { name: 'CONTACT', path: '/contact', external: false },
    { name: 'AURA', path: 'https://www.instagram.com/aurakidzzz/', external: true },
  ];

  function closeMenu() { setMenuOpen(false); }

  return (
    <div className="page-container">
      <div className="film-grain"></div>

        <header
          className="glass-panel nav-header"
        >
        <div className="nav-logo">
          <Link to="/" onClick={closeMenu}>INKFRAME FILMS</Link>
        </div>

        {/* Desktop nav */}
        <nav className="nav-links">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.name}
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link nav-link-external"
              >
                {link.name} ↗
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'nav-link-active' : ''}`}
              >
                {link.name}
              </Link>
            )
          )}
        </nav>

        {/* Hamburger button (mobile only) */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`ham-line ${menuOpen ? 'ham-open-1' : ''}`} />
          <span className={`ham-line ${menuOpen ? 'ham-open-2' : ''}`} />
          <span className={`ham-line ${menuOpen ? 'ham-open-3' : ''}`} />
        </button>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="mobile-menu glass-panel"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {navLinks.map((link, i) =>
              link.external ? (
                <motion.a
                  key={link.name}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-nav-link"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={closeMenu}
                >
                  {link.name} ↗
                </motion.a>
              ) : (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={link.path}
                    className={`mobile-nav-link ${location.pathname === link.path ? 'mobile-nav-link-active' : ''}`}
                    onClick={closeMenu}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content with Transitions */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
}
