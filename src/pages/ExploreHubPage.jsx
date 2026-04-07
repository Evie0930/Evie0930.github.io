import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ExploreModuleCards } from '../components/explore/ExploreModuleCards.jsx';

export function ExploreHubPage() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="min-h-screen bg-[#fbfbfd] pb-24 pt-[4.5rem] text-[#1d1d1f]"
      initial={{ opacity: reduceMotion ? 1 : 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] }}
    >
      <header className="fixed inset-x-0 top-0 z-[130] border-b border-black/[0.06] bg-[#fbfbfd]/88 backdrop-blur-xl">
        <div className="flex items-start px-4 pt-4 pb-3 md:px-8 md:pt-5 md:pb-3.5">
          <Link
            to="/"
            className="text-[0.875rem] font-normal tracking-wide text-[#8ec8ff]/95 transition-opacity hover:opacity-80"
            aria-label="返回首页"
          >
            ‹ 返回首页
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pt-6 md:px-8 md:pt-10">
        <h1 className="max-w-3xl text-left text-[1.375rem] font-normal leading-[1.45] tracking-[-0.02em] md:text-[1.625rem] lg:text-[1.75rem]">
          <span className="font-semibold text-[#1d1d1f]">探索世界。</span>
          <span className="mt-1 block text-[1.125rem] font-normal leading-snug text-[#6e6e73] md:mt-1.5 md:text-[1.375rem] lg:text-[1.5rem]">
            我的灵魂先抵达，肉体才慢慢跟上。
          </span>
        </h1>
        <div className="mt-8 md:mt-10">
          <ExploreModuleCards animateEntrance />
        </div>
      </div>
    </motion.div>
  );
}
