import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Frame } from './components/Frame';
import { TopBar } from './components/TopBar';
import { Home } from './pages/Home';
import { FilmPage } from './pages/FilmPage';
import { AuraPage } from './pages/AuraPage';

/* Scroll to hash targets after cross-route navigation, top otherwise */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <>
      <ScrollManager />
      <Frame />
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/film/:slug" element={<FilmPage />} />
        <Route path="/aurakidzzz" element={<AuraPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
