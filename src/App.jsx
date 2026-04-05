import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { ContactModal } from './components/ContactModal.jsx';
import { SearchOverlay } from './components/SearchOverlay.jsx';
import { NavHero } from './parts/NavHero.jsx';
import { MainSections } from './parts/MainSections.jsx';
import { SiteFooter } from './parts/SiteFooter.jsx';

export default function App() {
  const lenisRef = useRef(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const reduceMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const lockUi = searchOpen || contactOpen;

  useEffect(() => {
    document.body.classList.toggle('ui-scroll-lock', lockUi);
    if (lockUi) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [lockUi]);

  useEffect(() => {
    if (reduceMotion.current) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.15,
    });
    lenisRef.current = lenis;

    const root = document.documentElement;
    root.classList.add('lenis', 'lenis-smooth');

    let rafId = 0;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const heroLayer = document.getElementById('hero-parallax');
    function onLenisScroll({ scroll }) {
      if (!heroLayer) return;
      const max = Math.min(scroll * 0.32, 160);
      heroLayer.style.transform = `translate3d(0, ${max}px, 0) scale(1.04)`;
    }
    lenis.on('scroll', onLenisScroll);

    const onClickNav = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -72, lerp: 0.12 });
    };
    document.addEventListener('click', onClickNav);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', onClickNav);
      lenis.off('scroll', onLenisScroll);
      lenis.destroy();
      lenisRef.current = null;
      root.classList.remove('lenis', 'lenis-smooth');
    };
  }, []);

  useEffect(() => {
    if (reduceMotion.current) return undefined;
    const heroLayer = document.getElementById('hero-parallax');
    if (!heroLayer) return undefined;
    const t0 = performance.now();
    let rafHue = 0;
    function hueShift(now) {
      const elapsed = (now - t0) / 1000;
      const hue = (elapsed * 5) % 360;
      heroLayer.style.filter = `saturate(1.02) hue-rotate(${hue}deg)`;
      rafHue = requestAnimationFrame(hueShift);
    }
    rafHue = requestAnimationFrame(hueShift);
    return () => cancelAnimationFrame(rafHue);
  }, []);

  useEffect(() => {
    if (reduceMotion.current) return undefined;
    const trailRoot = document.getElementById('cursor-trail');
    if (!trailRoot) return undefined;
    const last = { x: 0, y: 0 };
    const throttleMs = 24;
    let lastT = 0;
    function spawnDot(x, y) {
      const d = document.createElement('span');
      d.className = 'cursor-dot';
      const size = 5 + Math.random() * 5;
      d.style.width = `${size}px`;
      d.style.height = `${size}px`;
      d.style.left = `${x}px`;
      d.style.top = `${y}px`;
      trailRoot.appendChild(d);
      setTimeout(() => {
        d.remove();
      }, 600);
    }
    function onMove(e) {
      const now = performance.now();
      if (now - lastT < throttleMs) return;
      lastT = now;
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      if (Math.hypot(dx, dy) < 4) return;
      last.x = e.clientX;
      last.y = e.clientY;
      spawnDot(e.clientX - 3, e.clientY - 3);
    }
    document.addEventListener('mousemove', onMove, { passive: true });
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const onSearchNavigate = useCallback(
    (sectionId) => {
      closeSearch();
      const el = document.getElementById(sectionId);
      if (el && lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: -72, lerp: 0.12 });
      } else if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      window.history.replaceState(null, '', `#${sectionId}`);
    },
    [closeSearch],
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

  return (
    <div className="apple-ds overflow-x-hidden bg-[#fbfbfd] font-normal text-[#1d1d1f] antialiased selection:bg-[#0071e3]/15 selection:text-[#1d1d1f]">
      <NavHero
        searchOpen={searchOpen}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenContact={() => setContactOpen(true)}
      />
      <MainSections />
      <SiteFooter onOpenContact={() => setContactOpen(true)} />
      <SearchOverlay open={searchOpen} onClose={closeSearch} onNavigate={onSearchNavigate} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
