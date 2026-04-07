import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ProjectCardSkeleton } from '../components/ProjectCardSkeleton.jsx';
import { LOCAL_BACKUP_PROJECTS } from '../constants/localBackupProjects.js';
import { INTERN_BRANDS } from '../data/internBrands.js';

const chageeBrand = INTERN_BRANDS.find((b) => b.id === 'chagee');

const CHAGEE_MODAL_BG = `${import.meta.env.BASE_URL}work/chagee-modal-bg.png`;
const assetBase = import.meta.env.BASE_URL;
const CHAGEE_GUIYUNNAN_MAIN = `${import.meta.env.BASE_URL}work/chagee-guiyunnan-main.png`;
const CHAGEE_GUIYUNNAN_CUPS = `${import.meta.env.BASE_URL}work/chagee-guiyunnan-cups.png`;
const SKELETON_COUNT = 4;

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function paragraphize(text) {
  return `<p>${escapeHtml(text).replaceAll('\n', '<br/>')}</p>`;
}

function contentBlocksToHtml(contentBlocks) {
  if (!Array.isArray(contentBlocks) || contentBlocks.length === 0) return '';
  return contentBlocks
    .map((block) => {
      if (typeof block === 'string') {
        return `<section>${paragraphize(block)}</section>`;
      }
      if (!block || typeof block !== 'object') return '';
      const heading = block.heading ? `<h3>${escapeHtml(block.heading)}</h3>` : '';
      const bodyList = Array.isArray(block.body)
        ? block.body.map((line) => paragraphize(line)).join('')
        : block.text
          ? paragraphize(block.text)
          : '';
      return `<section>${heading}${bodyList}</section>`;
    })
    .join('');
}

function normalizeProjectRecord(row, index) {
  const payload = row?.content && typeof row.content === 'object' ? row.content : row || {};
  const title = payload.title || row?.title || '未命名项目';
  const tagline = payload.tagline || row?.tagline || '';
  const mainMetrics = payload.main_metrics || row?.main_metrics || '';
  const contentBlocks = payload.content_blocks || row?.content_blocks || [];
  const detailHtml =
    payload.detail_html ||
    row?.detail_html ||
    contentBlocksToHtml(contentBlocks) ||
    (tagline ? `<section>${paragraphize(tagline)}</section>` : '');

  return {
    id: String(row?.id ?? payload.id ?? `project-${index + 1}`),
    visualHint: payload.visual_hint || row?.visual_hint || (row?.company === 'chagee' ? 'logo-slogan' : undefined),
    title,
    metric: mainMetrics,
    subtitle: tagline,
    subtitleTone: payload.subtitle_tone || row?.subtitle_tone || 'muted',
    metricTone: mainMetrics ? 'accent' : 'neutral',
    detailHtml,
    mainImage: payload.main_image || row?.main_image || null,
    thumbImage: payload.thumb_image || row?.thumb_image || null,
    image_url: payload.image_url || row?.image_url || null,
    orderIndex: Number(payload.order_index ?? row?.order_index ?? index + 1),
    placeholderLabel: payload.placeholder_label || row?.placeholder_label || '项目示意图',
  };
}

function ChageeDetailModal({ card, onClose }) {
  useEffect(() => {
    if (!card) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('ui-scroll-lock');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('ui-scroll-lock');
    };
  }, [card, onClose]);

  return (
    <div
      id="chagee-gallery-modal"
      role="dialog"
      aria-modal={Boolean(card)}
      aria-hidden={!card}
      aria-labelledby="chagee-detail-title"
      className="fixed inset-0 overflow-y-auto"
      style={{
        display: card ? 'block' : 'none',
        position: 'fixed',
        zIndex: 999,
      }}
    >
      {card ? (
        <>
          <button
            type="button"
            className="absolute inset-0 min-h-full w-full cursor-default border-0 bg-black/35 backdrop-blur-[2px]"
            aria-label="关闭"
            onClick={onClose}
          />
          <div
            className="relative z-10 mx-auto flex w-[80vw] flex-col overflow-hidden rounded-t-[24px] border border-black/[0.06] shadow-[0_-8px_48px_rgba(0,0,0,0.12)] sm:my-10 sm:rounded-[28px] sm:shadow-[0_24px_80px_rgba(0,0,0,0.14)]"
            style={{
              backgroundImage: `linear-gradient(rgba(251, 251, 253, 0.86), rgba(251, 251, 253, 0.86)), url(${CHAGEE_MODAL_BG})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-black/[0.08] bg-[#fbfbfd]/55 px-5 py-3.5 text-[#1d1d1f] backdrop-blur-[1px] sm:px-6 sm:py-4">
              <h2
                id="chagee-detail-title"
                className="pr-8 text-[0.9375rem] font-semibold leading-snug tracking-[-0.02em] text-[#1d1d1f] md:text-[1.0625rem]"
              >
                {card.title}
              </h2>
              <button
                type="button"
                className="absolute right-3 top-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#86868b] transition-colors hover:bg-black/[0.05]"
                onClick={onClose}
                aria-label="关闭"
              >
                <span aria-hidden="true" className="text-xl leading-none">
                  ×
                </span>
              </button>
            </div>
            <div
              className="px-5 pb-6 pt-3 text-[0.8125rem] text-[#1d1d1f] sm:px-6 sm:pb-8 sm:pt-4 [&_h3]:mb-1.5 [&_h3]:mt-4 [&_h3]:first:mt-0 [&_h3]:text-[0.8125rem] [&_h3]:font-semibold [&_h3]:text-[#1d1d1f] [&_h3]:leading-snug [&_p]:mb-2.5 [&_p]:leading-[1.58] [&_section]:space-y-2.5 [&_strong]:font-semibold [&_strong]:text-[#1d1d1f]"
              dangerouslySetInnerHTML={{ __html: card.detailHtml }}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}

function VisualTop({ card, logoSrc }) {
  const cornerPlaceholder = (
    <div
      className="pointer-events-none absolute bottom-2 right-2 flex h-14 w-14 items-center justify-center rounded-lg border border-dashed border-[rgba(0,0,0,0.14)] bg-white/80 text-[0.625rem] leading-tight text-[#86868b]"
      aria-hidden="true"
    >
      图
    </div>
  );

  if (card.visualHint === 'logo-slogan') {
    return (
      <div className="relative flex h-full min-h-0 flex-col items-center justify-center gap-3 bg-gradient-to-b from-[#fafafa] to-[#f0f0f3] px-4">
        <img
          src={logoSrc}
          alt=""
          className="max-h-[42%] max-w-[72%] object-contain"
          loading="eager"
        />
        <p className="text-center text-[0.8125rem] font-medium tracking-wide text-[#6e6e73]">
          以东方茶，会世界友
        </p>
      </div>
    );
  }

  if (card.visualHint === 'cup-sunset') {
    return (
      <div className="relative flex h-full min-h-0 flex-col bg-[#f5f5f7] p-3">
        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[#ececf0] bg-white">
          <img
            src={CHAGEE_GUIYUNNAN_CUPS}
            alt="归云南系列杯身"
            className="h-full w-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="pointer-events-none absolute bottom-4 right-4 h-[5.25rem] w-[5.25rem] overflow-hidden rounded-lg border border-white/70 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
          <img
            src={CHAGEE_GUIYUNNAN_MAIN}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    );
  }

  if (card.mainImage) {
    return (
      <div className="relative flex h-full min-h-0 flex-col bg-[#f5f5f7] p-3">
        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[#ececf0] bg-white">
          <img
            src={`${assetBase}${card.mainImage}`}
            alt={card.title}
            className="h-full w-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
        </div>
        {card.thumbImage ? (
          <div className="pointer-events-none absolute bottom-4 right-4 h-[5.25rem] w-[5.25rem] overflow-hidden rounded-lg border border-white/70 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
            <img
              src={`${assetBase}${card.thumbImage}`}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : null}
      </div>
    );
  }

  if (card.image_url) {
    return (
      <div className="relative flex h-full min-h-0 flex-col bg-[#f5f5f7] p-3">
        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[#ececf0] bg-white">
          <img
            src={card.image_url}
            alt={card.title}
            className="h-full w-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col items-center justify-center bg-[#f5f5f7] px-3">
      <div className="flex h-[78%] w-full max-w-[13rem] flex-col items-center justify-center rounded-2xl border border-dashed border-[rgba(0,0,0,0.12)] bg-white/90">
        <svg
          className="mb-2 h-8 w-8 text-[#c7c7cc]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <circle cx="9" cy="10" r="1.5" fill="currentColor" stroke="none" />
          <path d="M4 15l4-4 3 3 5-6 4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="px-2 text-center text-[0.6875rem] leading-snug text-[#86868b] md:text-[0.75rem]">
          {card.placeholderLabel}
        </p>
      </div>
      {cornerPlaceholder}
    </div>
  );
}

function GalleryCard({ card, logoSrc, onOpenDetail }) {
  const hasDetail = Boolean(card.detailHtml && String(card.detailHtml).trim());
  const metricClass =
    card.metricTone === 'accent'
      ? 'text-[1.375rem] font-semibold tabular-nums tracking-tight text-[#d4380d] md:text-[1.5rem]'
      : 'text-[1.0625rem] font-semibold tabular-nums tracking-tight text-[#1d1d1f] md:text-[1.125rem]';
  const subtitleClass =
    card.id === 'overview'
      ? 'text-[0.75rem] leading-relaxed text-[#1d1d1f] md:text-[0.8125rem]'
      : card.subtitleTone === 'dark'
        ? 'text-[0.8125rem] leading-relaxed text-[#1d1d1f] md:text-[0.875rem]'
      : card.subtitleTone === 'muted'
        ? 'text-[0.8125rem] leading-relaxed text-[#86868b] md:text-[0.875rem]'
        : 'text-[0.8125rem] leading-relaxed text-[#6e6e73] md:text-[0.875rem]';

  const open = () => {
    if (hasDetail && onOpenDetail) onOpenDetail(card);
  };

  const stopDrag = (e) => {
    e.stopPropagation();
  };

  const visualBlock = <VisualTop card={card} logoSrc={logoSrc} />;

  return (
    <article
      className="flex h-[min(85vh,36rem)] w-[min(82vw,21rem)] shrink-0 snap-center snap-always flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_6px_28px_rgba(0,0,0,0.07),0_2px_8px_rgba(0,0,0,0.04)] md:w-[22rem]"
      aria-label={card.title}
    >
      <div className="relative min-h-0 flex-[0_0_60%] overflow-hidden">
        {hasDetail ? (
          <button
            type="button"
            className="block h-full min-h-0 w-full cursor-pointer border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2"
            onClick={open}
            onPointerDown={stopDrag}
            aria-label={`查看「${card.title}」全文`}
          >
            {visualBlock}
          </button>
        ) : (
          visualBlock
        )}
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-between px-5 pb-5 pt-4">
        {hasDetail ? (
          <button
            type="button"
            className="w-full cursor-pointer border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2"
            onClick={open}
            onPointerDown={stopDrag}
            aria-label={`查看「${card.title}」全文`}
          >
            <h2 className="text-[1.0625rem] font-semibold leading-snug tracking-[-0.02em] text-[#1d1d1f] md:text-[1.125rem]">
              {card.title}
            </h2>
          </button>
        ) : (
          <h2 className="text-[1.0625rem] font-semibold leading-snug tracking-[-0.02em] text-[#1d1d1f] md:text-[1.125rem]">
            {card.title}
          </h2>
        )}
        <div className="mt-3 space-y-1.5">
          {card.metric ? <p className={metricClass}>{card.metric}</p> : null}
          {card.subtitle ? <p className={subtitleClass}>{card.subtitle}</p> : null}
        </div>
      </div>
    </article>
  );
}

export function WorkChageePage() {
  const reduce = useReducedMotion();
  const scrollRef = useRef(null);
  const [active, setActive] = useState(0);
  const [detailCard, setDetailCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');
  const drag = useRef({ down: false, startX: 0, scrollLeft: 0 });

  const logoSrc = chageeBrand?.logo ?? '';

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 3000);

    (async () => {
      try {
        const res = await fetch('/api/projects', { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const records = Array.isArray(json?.data) ? json.data : [];
        if (!records.length) throw new Error('empty projects');
        const normalized = records
          .map((row, index) => normalizeProjectRecord(row, index))
          .sort((a, b) => (a.orderIndex || 999) - (b.orderIndex || 999));
        if (cancelled) return;
        setCards(normalized);
        setLoading(false);
      } catch {
        if (cancelled) return;
        setCards(LOCAL_BACKUP_PROJECTS);
        setLoading(false);
        setToast('已加载本地备份数据');
      } finally {
        window.clearTimeout(timeout);
      }
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const t = window.setTimeout(() => setToast(''), 2400);
    return () => window.clearTimeout(t);
  }, [toast]);

  const updateActiveFromScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, clientWidth } = el;
    const mid = scrollLeft + clientWidth / 2;
    const children = [...el.children];
    let best = 0;
    let bestDist = Infinity;
    children.forEach((child, i) => {
      const cMid = child.offsetLeft + child.offsetWidth / 2;
      const d = Math.abs(cMid - mid);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return undefined;
    el.addEventListener('scroll', updateActiveFromScroll, { passive: true });
    updateActiveFromScroll();
    return () => el.removeEventListener('scroll', updateActiveFromScroll);
  }, [updateActiveFromScroll]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return undefined;

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    const el = scrollRef.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, scrollLeft: el.scrollLeft };
    el.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!drag.current.down) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = drag.current.scrollLeft - (e.clientX - drag.current.startX);
  };

  const onPointerUp = (e) => {
    drag.current.down = false;
    scrollRef.current?.releasePointerCapture?.(e.pointerId);
  };

  const scrollToIndex = (idx) => {
    const el = scrollRef.current;
    const child = el?.children[idx];
    child?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <motion.main
      className="min-h-screen bg-[#fbfbfd] pb-28 pt-[4.5rem] text-[#1d1d1f] antialiased"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <header className="fixed inset-x-0 top-0 z-[130] border-b border-black/[0.06] bg-[#fbfbfd]/80 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 md:h-[3.75rem] md:gap-4 md:px-8">
          <Link
            to={{ pathname: '/', hash: 'internship-section' }}
            className="group flex items-center gap-0.5 text-[0.9375rem] font-medium text-[#0071e3] transition-opacity hover:opacity-80"
            aria-label="返回实习经历"
          >
            <span className="text-[1.125rem] leading-none" aria-hidden="true">
              ‹
            </span>
            返回
          </Link>
          <div className="ml-1 flex min-w-0 flex-1 items-center gap-2.5 md:ml-2">
            <motion.div
              layoutId="work-chagee-logo"
              className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)] md:h-10 md:w-10"
              transition={{ type: 'spring', stiffness: 380, damping: 34 }}
            >
              <img src={logoSrc} alt="" className="h-[72%] w-[72%] object-contain" />
            </motion.div>
            <span className="truncate text-[0.875rem] font-semibold tracking-tight md:text-[0.9375rem]">
              霸王茶姬 · CHAGEE
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pt-2 md:px-8 md:pt-4">
        <h1 className="text-center text-[1.375rem] font-normal leading-snug tracking-[-0.02em] md:text-[1.625rem] lg:text-[1.75rem]">
          <span className="font-semibold text-[#1d1d1f]">实习经历。</span>
          <span className="text-[1.25rem] font-normal text-[#6e6e73] md:text-[1.5rem] lg:text-[1.625rem]">
            从金融到互联网到快消，用数据逻辑讲好品牌叙事。
          </span>
        </h1>
      </div>

      <motion.div
        className="relative mt-6 md:mt-8"
        initial={reduce ? false : { opacity: 0, x: 56 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
      >
        <div
          ref={scrollRef}
          data-lenis-prevent
          className="intern-gallery-scroll flex cursor-grab touch-pan-x select-none gap-6 overflow-x-auto px-4 pb-4 active:cursor-grabbing md:gap-7 md:px-10 md:pb-6"
          style={{
            scrollSnapType: 'x mandatory',
            scrollPaddingLeft: 'max(1rem, env(safe-area-inset-left))',
            scrollPaddingRight: 'max(1rem, env(safe-area-inset-right))',
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onPointerCancel={onPointerUp}
          role="region"
          aria-roledescription="carousel"
          aria-label="霸王茶姬实习故事线卡片"
        >
          {loading
            ? Array.from({ length: SKELETON_COUNT }).map((_, i) => <ProjectCardSkeleton key={`skeleton-${i}`} />)
            : cards.map((card) => (
                <GalleryCard key={card.id} card={card} logoSrc={logoSrc} onOpenDetail={setDetailCard} />
              ))}
        </div>
      </motion.div>

      <ChageeDetailModal card={detailCard} onClose={() => setDetailCard(null)} />

      <div
        className="fixed bottom-6 left-0 right-0 z-[130] flex justify-center md:bottom-8"
        role="tablist"
        aria-label="卡片位置"
      >
        <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 shadow-[0_4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md">
          {(loading ? Array.from({ length: SKELETON_COUNT }) : cards).map((card, i) => (
            <button
              key={card?.id || `dot-${i}`}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`第 ${i + 1} 张${card?.title ? `：${card.title}` : ''}`}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                active === i ? 'w-6 bg-[#1d1d1f]' : 'bg-[#d2d2d7] hover:bg-[#aeaeb2]'
              }`}
              onClick={() => scrollToIndex(i)}
            />
          ))}
        </div>
      </div>
      {toast ? (
        <div className="pointer-events-none fixed bottom-20 left-1/2 z-[220] -translate-x-1/2 rounded-full bg-black/70 px-3 py-1.5 text-[0.6875rem] text-white/90 backdrop-blur-sm">
          {toast}
        </div>
      ) : null}
    </motion.main>
  );
}
