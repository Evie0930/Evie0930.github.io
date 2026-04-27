import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { useLenisRef } from '../context/LenisContext.tsx';

const DEBUG_SCROLL_RESTORATION = import.meta.env.DEV;

export const ScrollRestoration = () => {
  const { pathname, search, hash } = useLocation();
  const navigationType = useNavigationType();
  const lenisRef = useLenisRef();

  const storageKey = `scroll:${pathname}${search}${hash}`;

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const { history } = window;
    const prev = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    return () => {
      history.scrollRestoration = prev;
    };
  }, []);

  // 1) Save position before leaving current route.
  useEffect(() => {
    return () => {
      const lenis = lenisRef?.current;
      const y = lenis ? lenis.actualScroll : window.scrollY;
      const savedY = Math.max(0, Number(y) || 0);
      sessionStorage.setItem(storageKey, String(savedY));
      if (DEBUG_SCROLL_RESTORATION) {
        console.info('[ScrollRestoration] save', {
          storageKey,
          y: savedY,
        });
      }
    };
  }, [lenisRef, storageKey]);

  // 2) Restore only on POP (back/forward).
  useEffect(() => {
    if (navigationType !== 'POP') return undefined;

    const savedPosition = sessionStorage.getItem(storageKey);
    if (!savedPosition) {
      if (DEBUG_SCROLL_RESTORATION) {
        console.info('[ScrollRestoration] skip restore: no saved position', {
          storageKey,
          navigationType,
        });
      }
      return undefined;
    }

    const targetY = parseFloat(savedPosition);
    if (!Number.isFinite(targetY)) {
      if (DEBUG_SCROLL_RESTORATION) {
        console.info('[ScrollRestoration] skip restore: invalid saved value', {
          storageKey,
          savedPosition,
        });
      }
      return undefined;
    }

    let retryCount = 0;
    const maxRetries = 30;

    const tryScroll = window.setInterval(() => {
      const currentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const lenis = lenisRef?.current;

      if (currentHeight >= targetY + windowHeight || retryCount >= maxRetries) {
        const maxScrollable = Math.max(0, currentHeight - windowHeight);
        const finalY = Math.min(targetY, maxScrollable);
        if (lenis) {
          lenis.scrollTo(finalY, { immediate: true });
        } else {
          window.scrollTo({ top: finalY, behavior: 'auto' });
        }
        if (DEBUG_SCROLL_RESTORATION) {
          console.info('[ScrollRestoration] restore', {
            storageKey,
            targetY,
            finalY,
            retryCount,
            currentHeight,
            windowHeight,
          });
        }
        window.clearInterval(tryScroll);
      }

      retryCount++;
    }, 50);

    return () => window.clearInterval(tryScroll);
  }, [lenisRef, navigationType, storageKey, hash]);

  return null;
};

