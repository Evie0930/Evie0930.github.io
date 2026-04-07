/**
 * 沉浸页（星空 / 足迹）与 App 根容器背景对齐，避免浅色壳在视口边缘露出。
 * @param {string} pathname
 * @returns {string | null} Tailwind 类名字符串，非沉浸路由返回 null
 */
export function getImmersiveShellClass(pathname) {
  if (pathname === '/explore/insights') {
    return 'min-h-[100dvh] overflow-x-hidden bg-[#02040c] antialiased';
  }
  if (pathname === '/explore/footprints') {
    return 'min-h-[100dvh] overflow-x-hidden bg-[#0b0d12] antialiased';
  }
  return null;
}
