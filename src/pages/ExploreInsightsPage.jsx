import { Canvas } from '@react-three/fiber';
import { Suspense, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { InsightStarFieldScene, makeStarRecord } from '../components/explore/InsightStarField.jsx';
import { analyzeInspiration } from '../lib/inspirationAnalyze.js';

export function ExploreInsightsPage() {
  const reduceMotion = useReducedMotion();
  const [input, setInput] = useState('');
  const [stars, setStars] = useState([]);
  const [message, setMessage] = useState('');
  const [selected, setSelected] = useState(null);
  const [pending, setPending] = useState(false);

  const submit = useCallback(async () => {
    const t = input.trim();
    if (!t || pending) return;
    setPending(true);
    setMessage('');
    try {
      const params = await analyzeInspiration(t);
      const star = makeStarRecord(t, params);
      setStars((prev) => [...prev, star]);
      setInput('');
      setMessage('灵感已注入，请查收。');
      window.setTimeout(() => setMessage(''), 4200);
    } finally {
      setPending(false);
    }
  }, [input, pending]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] overflow-hidden bg-[#02040c] text-[#f5f5f7]"
      initial={{ opacity: reduceMotion ? 1 : 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0">
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center text-sm font-light tracking-wide text-white/40">
              加载星野…
            </div>
          }
        >
          <Canvas
            camera={{ position: [0, 1.2, 20], fov: 50, near: 0.1, far: 320 }}
            gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            dpr={[1, 2]}
          >
            <InsightStarFieldScene stars={stars} onStarSelect={setSelected} />
          </Canvas>
        </Suspense>
      </div>

      <header className="pointer-events-none absolute left-0 right-0 top-0 z-30 flex items-start justify-between gap-4 px-4 pb-2 pt-4 md:px-8 md:pt-5">
        <Link
          to="/explore"
          className="pointer-events-auto text-[0.875rem] font-normal tracking-wide text-[#8ec8ff]/95 transition-opacity hover:opacity-80"
        >
          ‹ 返回探索
        </Link>
        <div className="pointer-events-auto flex flex-col items-end gap-2 text-right">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-[0.7rem] text-white/25 transition-colors hover:border-white/15 hover:bg-white/[0.07] hover:text-white/40"
            aria-label="点赞（占位）"
            title="点赞（占位）"
          >
            ♥
          </button>
          <span className="max-w-[10rem] text-[0.5625rem] font-extralight leading-snug tracking-[0.12em] text-white/28">
            点击星尘查看原文
          </span>
        </div>
      </header>

      <AnimatePresence>
        {selected ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="pointer-events-auto absolute left-1/2 top-24 z-40 w-[min(90vw,22rem)] -translate-x-1/2 rounded-2xl border border-white/10 bg-black/55 px-5 py-4 text-[0.875rem] leading-relaxed text-white/95 backdrop-blur-xl md:top-28"
            role="dialog"
            aria-label="灵感原文"
          >
            <p className="text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[#8ec8ff]/90">
              灵感原文
            </p>
            <p className="mt-2 font-light">{selected.text}</p>
            <button
              type="button"
              className="mt-3 text-[0.75rem] font-normal text-[#8ec8ff]/90 underline-offset-4 hover:underline"
              onClick={() => setSelected(null)}
            >
              关闭
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col items-center px-4 pb-8 pt-16 md:pb-10">
        <div className="pointer-events-auto w-full max-w-xl">
          <div className="nebula-glass-panel relative overflow-hidden rounded-[28px] border border-white/[0.08] p-[1px] shadow-[0_32px_100px_rgba(0,0,0,0.55)]">
            <div className="nebula-glass-inner relative rounded-[26px] bg-gradient-to-b from-black/25 via-black/40 to-black/55 px-5 py-4 backdrop-blur-[20px]">
              <div className="pointer-events-none absolute inset-0 rounded-[26px] opacity-90">
                <div className="nebula-drift absolute -left-1/4 -top-1/2 h-[140%] w-[80%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(120,170,255,0.14)_0%,transparent_55%)] blur-2xl" />
                <div className="nebula-drift-slow absolute -bottom-1/3 right-0 h-[90%] w-[70%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(180,140,255,0.08)_0%,transparent_60%)] blur-3xl" />
              </div>
              <div className="relative flex flex-col gap-3 md:flex-row md:items-end md:gap-4">
                <label className="sr-only" htmlFor="insight-input">
                  灵感输入
                </label>
                <textarea
                  id="insight-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      submit();
                    }
                  }}
                  rows={2}
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="输入一句观点、关键词或灵感..."
                  className="insight-textarea min-h-[3.5rem] flex-1 resize-none rounded-2xl border border-white/[0.06] bg-transparent px-1 py-2 text-[0.9375rem] font-light leading-relaxed text-white/95 placeholder:text-white/35 focus:border-[#7ecbff]/25 focus:outline-none focus:ring-0"
                />
                <button
                  type="button"
                  disabled={pending || !input.trim()}
                  onClick={submit}
                  className="inject-glow-btn shrink-0 rounded-2xl bg-[#0a3d8a]/90 px-7 py-3.5 text-[0.875rem] font-medium tracking-wide text-white/95 shadow-[0_0_24px_rgba(30,120,255,0.35)] transition-all duration-300 hover:shadow-[0_0_36px_rgba(80,160,255,0.55)] disabled:cursor-not-allowed disabled:opacity-35"
                >
                  {pending ? '注入中…' : '注入星空'}
                </button>
              </div>
            </div>
          </div>
          {message ? (
            <p className="mt-3 text-center text-[0.8125rem] font-extralight tracking-wide text-[#a8d4ff]/90">
              {message}
            </p>
          ) : (
            <p className="mt-3 text-center text-[0.6875rem] font-extralight tracking-[0.08em] text-white/28">
              滚轮缩放 · 拖拽旋转视角 · 平移探索
            </p>
          )}
        </div>
      </div>

      <style>{`
        .nebula-drift { animation: nebulaDrift 22s ease-in-out infinite alternate; }
        .nebula-drift-slow { animation: nebulaDrift 38s ease-in-out infinite alternate-reverse; }
        @keyframes nebulaDrift {
          0% { transform: translate(0, 0) scale(1); opacity: 0.85; }
          100% { transform: translate(12%, 8%) scale(1.08); opacity: 1; }
        }
        .insight-textarea {
          appearance: none;
          -webkit-appearance: none;
        }
      `}</style>
    </motion.div>
  );
}
