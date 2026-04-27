import { createContext, useContext } from 'react';

const LenisContext = createContext(null);

export function LenisProvider({ lenisRef, children }) {
  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}

export function useLenisRef() {
  return useContext(LenisContext);
}

// Keep the hook name aligned with your requested implementation.
export function useLenis() {
  const lenisRef = useLenisRef();
  return lenisRef?.current ?? null;
}

