/**
 * Apple 官网风格：轻量上滑 + 柔和淡入
 * @param {boolean} reduce
 */
export function sectionMotion(reduce) {
  if (reduce) {
    return {};
  }
  return {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-56px', amount: 0.12 },
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  };
}
