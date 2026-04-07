import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { LayoutGroup } from 'framer-motion';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ContactModal } from './components/ContactModal.jsx';
import { SearchOverlay } from './components/SearchOverlay.jsx';
import { useGlobalScrollEffects } from './hooks/useGlobalScrollEffects.js';
import { getImmersiveShellClass } from './lib/immersiveShell.js';
import { ExploreFootprintsPage } from './pages/ExploreFootprintsPage.jsx';
import { ExploreHubPage } from './pages/ExploreHubPage.jsx';
import { ExploreInsightsPage } from './pages/ExploreInsightsPage.jsx';
import { WorkChageePage } from './pages/WorkChageePage.jsx';
import { NavHero } from './parts/NavHero.jsx';
import { MainSections } from './parts/MainSections.jsx';
import { SiteFooter } from './parts/SiteFooter.jsx';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const reduceMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const lenisRef = useGlobalScrollEffects(reduceMotion);

  useLayoutEffect(() => {
    if (location.pathname !== '/') return;
    if (location.hash !== '#internship-section') return;
    const el = document.getElementById('internship-section');
    if (!el) return;
    const run = () => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: -72, lerp: 0.12 });
      } else {
        el.scrollIntoView({ behavior: reduceMotion.current ? 'auto' : 'smooth', block: 'start' });
      }
    };
    const t = window.setTimeout(run, 80);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.hash]);

  const lockUi = searchOpen || contactOpen;

  useEffect(() => {
    document.body.classList.toggle('ui-scroll-lock', lockUi);
    if (lockUi) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [lockUi]);

  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const onSearchNavigate = useCallback(
    (sectionId) => {
      closeSearch();
      const scrollToSection = () => {
        const el = document.getElementById(sectionId);
        if (el && lenisRef.current) {
          lenisRef.current.scrollTo(el, { offset: -72, lerp: 0.12 });
        } else if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        window.history.replaceState(null, '', `#${sectionId}`);
      };
      if (location.pathname !== '/') {
        navigate('/');
        window.setTimeout(scrollToSection, 100);
      } else {
        scrollToSection();
      }
    },
    [closeSearch, navigate, location.pathname],
  );

  useEffect(() => {
    function onKey(e) {
      if (e.key !== 'Escape') return;
      if (contactOpen) {
        setContactOpen(false);
        return;
      }
      if (searchOpen) closeSearch();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [contactOpen, searchOpen, closeSearch]);

  const immersive = getImmersiveShellClass(location.pathname);
  const rootClass = immersive
    ? `apple-ds ${immersive}`
    : 'apple-ds min-h-screen overflow-x-hidden bg-[#fbfbfd] font-normal text-[#1d1d1f] antialiased selection:bg-[#0071e3]/15 selection:text-[#1d1d1f]';

  return (
    <div className={rootClass}>
      <LayoutGroup>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavHero
                  searchOpen={searchOpen}
                  onOpenSearch={() => setSearchOpen(true)}
                  onOpenContact={() => setContactOpen(true)}
                />
                <MainSections />
                <SiteFooter onOpenContact={() => setContactOpen(true)} />
              </>
            }
          />
          <Route path="/work/chagee" element={<WorkChageePage />} />
          <Route path="/explore" element={<ExploreHubPage />} />
          <Route path="/explore/insights" element={<ExploreInsightsPage />} />
          <Route path="/explore/footprints" element={<ExploreFootprintsPage />} />
        </Routes>
      </LayoutGroup>
      <SearchOverlay open={searchOpen} onClose={closeSearch} onNavigate={onSearchNavigate} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}

export default App;
