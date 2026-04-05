/** @param {boolean} reduce */
export function sectionMotion(reduce) {
  if (reduce) {
    return {};
  }
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-48px' },
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  };
}
