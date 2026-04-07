import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

function tokenize(q) {
  return q
    .toLowerCase()
    .split(/[\s\u3000]+/)
    .map((t) => t.trim())
    .filter(Boolean);
}

function collectSearchIndex() {
  const nodes = document.querySelectorAll('#sec-insights, section[id^="sec-"]');
  const list = [];
  nodes.forEach((el) => {
    const id = el.id;
    if (!id) return;
    const title = el.getAttribute('data-search-title') || id;
    const extra = `${el.getAttribute('data-search-keywords') || ''} ${el.getAttribute('data-search-text') || ''}`;
    const body = (el.textContent || '').replace(/\s+/g, ' ').trim();
    const snippetSource = el.getAttribute('data-search-text') || body;
    let snippet = snippetSource.slice(0, 96).trim();
    if (snippetSource.length > 96) snippet += '…';
    list.push({
      id,
      title,
      haystack: `${title} ${extra} ${body}`.toLowerCase(),
      snippet,
    });
  });
  return list;
}

export function SearchOverlay({ open, onClose, onNavigate }) {
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const index = useMemo(() => (open ? collectSearchIndex() : []), [open]);

  const runSearch = useCallback(
    (q) => {
      const tokens = tokenize(q);
      return index.filter((item) => {
        if (!tokens.length) return true;
        return tokens.every((t) => item.haystack.includes(t));
      });
    },
    [index],
  );

  const matched = useMemo(() => runSearch(query), [query, runSearch]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      return;
    }
    const t = window.setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 10);
    return () => window.clearTimeout(t);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] block overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-hidden="false"
      aria-labelledby="search-panel-label"
    >
      <p id="search-panel-label" className="sr-only">
        全站搜索
      </p>
      <button
        type="button"
        className="fixed inset-0 z-0 min-h-full w-full cursor-default border-0 bg-black/35 backdrop-blur-sm transition-opacity duration-300"
        aria-label="关闭搜索"
        onClick={onClose}
      />
      <div className="pointer-events-none relative z-10 mx-auto max-w-xl px-4 pb-20 pt-16 md:pt-24">
        <div className="pointer-events-auto overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white/95 shadow-[0_24px_80px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-300">
          <div className="flex items-center gap-3 border-b border-[rgba(0,0,0,0.06)] px-4 py-3">
            <svg
              className="h-[1.125rem] w-[1.125rem] shrink-0 text-[#86868b]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3-3" />
            </svg>
            <input
              ref={inputRef}
              type="search"
              className="min-w-0 flex-1 bg-transparent text-[0.9375rem] text-[#1d1d1f] outline-none transition-all duration-300 placeholder:text-[#86868b]"
              placeholder="搜索关键词…"
              autoComplete="off"
              spellCheck={false}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="button"
              className="shrink-0 rounded-lg px-2 py-1 text-[0.8125rem] text-[#0071e3] transition-all duration-300 hover:opacity-80"
              onClick={onClose}
            >
              关闭
            </button>
          </div>
          <ul className="max-h-[min(60vh,28rem)] divide-y divide-[rgba(0,0,0,0.06)] overflow-y-auto">
            {matched.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="w-full px-4 py-3.5 text-left transition-all duration-300 hover:bg-black/[0.03] active:bg-black/[0.05]"
                  onClick={() => onNavigate(item.id)}
                >
                  <span className="block text-[0.9375rem] font-semibold leading-[1.28] tracking-[-0.015em] text-[#1d1d1f]">
                    {item.title}
                  </span>
                  <span className="mt-1 line-clamp-2 block text-[0.75rem] font-normal leading-[1.47] text-[#6e6e73]">
                    {item.snippet}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {matched.length === 0 ? (
            <p className="py-8 text-center text-[0.8125rem] text-[#86868b] transition-all duration-300">
              未找到匹配内容
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
