import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { AssignmentsPage, AssignmentPage } from './pages/AssignmentsPage';
import { AboutPage, CvPage, StagePage, MorePage, ColophonPage } from './pages/SupportingPages';

const navigation = [
  ['/', 'Home'], ['/over-mij', 'Over mij'], ['/talentontwikkeling', 'Talentontwikkeling'],
  ['/snuffelstage', 'Snuffelstage'], ['/meer', 'Meer van mij'],
];

function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const titles: Record<string, string> = { '/': 'Een ondernemende toekomst', '/over-mij': 'Over mij', '/cv': 'Mijn CV', '/talentontwikkeling': 'Talentontwikkeling', '/snuffelstage': 'Snuffelstage', '/meer': 'Meer van mij', '/colofon': 'Over dit portfolio' };
    document.title = `${titles[pathname] || 'Mijn TOW-opdracht'} — Mats de Roon`;
    document.getElementById('main-content')?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);
  return <>
    <a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); document.getElementById('main-content')?.focus(); }}>Direct naar inhoud</a>
    <header className="site-header">
      <div className="header-inner container">
        <Link to="/" className="brand" aria-label="Mats de Roon, naar home"><span className="brand-symbol" aria-hidden="true">m<span>.</span></span><span>Mats de Roon<span className="orange">.</span></span></Link>
        <nav className="desktop-nav" aria-label="Hoofdnavigatie">{navigation.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}</nav>
        <Link className="header-cv" to="/cv">Mijn CV<ArrowUpRight size={16} aria-hidden="true" /></Link>
        <button className="menu-toggle" aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      {menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobiele navigatie">{[...navigation, ['/cv', 'Mijn CV']].map(([to, label]) => <NavLink key={to} end={to === '/'} to={to}>{label}<ArrowUpRight size={18} /></NavLink>)}</nav>}
    </header>
    <RouteEffects />
    <main id="main-content" tabIndex={-1}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/over-mij" element={<AboutPage />} />
        <Route path="/cv" element={<CvPage />} />
        <Route path="/talentontwikkeling" element={<AssignmentsPage />} />
        <Route path="/talentontwikkeling/:id" element={<AssignmentPage />} />
        <Route path="/snuffelstage" element={<StagePage />} />
        <Route path="/meer" element={<MorePage />} />
        <Route path="/colofon" element={<ColophonPage />} />
        <Route path="*" element={<section className="container not-found"><p className="eyebrow">404 / EVEN DE WEG KWIJT</p><h1>Een andere afslag.</h1><p>Deze pagina bestaat niet. Mijn portfolio vind je hier.</p><Link className="button button-primary" to="/">Terug naar home<ArrowUpRight size={18} /></Link></section>} />
      </Routes>
    </main>
    <footer className="site-footer"><div className="container"><div className="footer-top"><Link to="/" className="brand footer-brand"><span className="brand-symbol" aria-hidden="true">m<span>.</span></span><span>Mats de Roon<span className="orange">.</span></span></Link><p>Een eigen koers. Stap voor stap.</p><Link className="footer-top-link" to="/over-mij">Even kennismaken <ArrowUpRight size={17} /></Link></div><div className="footer-bottom"><span>© 2026 Mats de Roon</span><span>Hogeschool Rotterdam · Portfolio 2026–2027</span><Link to="/colofon">Over dit portfolio<ArrowUpRight size={13} /></Link></div></div></footer>
  </>;
}
