import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Lenis 平滑滚动、首屏视差、色相循环、鼠标拖尾（无首屏 DOM 时内部逻辑会提前 return）。
 * @param {{ current: boolean }} reduceMotionRef 挂载时读取 prefers-reduced-motion
 */
export function useGlobalScrollEffects(reduceMotionRef) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (reduceMotionRef.current) return undefined;

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
  }, [reduceMotionRef]);

  useEffect(() => {
    if (reduceMotionRef.current) return undefined;
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
  }, [reduceMotionRef]);

  useEffect(() => {
    if (reduceMotionRef.current) return undefined;
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
  }, [reduceMotionRef]);

  return lenisRef;
}
