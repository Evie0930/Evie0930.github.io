const STORAGE_KEY = 'barrage_viewer_token';

function randomUuidV4() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** 用于「仅自己可见」测试弹幕；持久化在同一浏览器 */
export function getOrCreateBarrageViewerToken() {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing && /^[0-9a-f-]{36}$/i.test(existing)) return existing;
    const next = randomUuidV4();
    localStorage.setItem(STORAGE_KEY, next);
    return next;
  } catch {
    return randomUuidV4();
  }
}

export const BARRAGE_VIEWER_HEADER = 'x-barrage-viewer';
