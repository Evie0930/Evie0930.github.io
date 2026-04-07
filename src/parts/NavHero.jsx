import { useCallback, useEffect, useId, useLayoutEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { sectionMotion } from '../motionPresets.js';

const NAV_LINKS = [
  { href: '#sec-about', label: '关于我' },
  { href: '#internship-section', label: '实习经历' },
  { href: '#sec-cases', label: '项目案例' },
  { href: '#sec-skills', label: '技能矩阵' },
  { href: '#sec-explore', label: '探索世界' },
  { href: '#sec-hobbies', label: '一些爱好' },
];

/** 叠在氛围色上：左侧长时间贴近实色白，中段缓降，尾段多档微透明消掉硬边 */
const HERO_VIGNETTE_STOPS =
  'rgba(251, 251, 253, 1) 0%, rgba(251, 251, 253, 0.998) 2%, rgba(251, 251, 253, 0.993) 5%, rgba(251, 251, 253, 0.985) 9%, rgba(251, 251, 253, 0.972) 14%, rgba(251, 251, 253, 0.955) 19%, rgba(251, 251, 253, 0.93) 25%, rgba(251, 251, 253, 0.895) 31%, rgba(251, 251, 253, 0.85) 37%, rgba(251, 251, 253, 0.79) 43%, rgba(251, 251, 253, 0.71) 49%, rgba(251, 251, 253, 0.62) 55%, rgba(251, 251, 253, 0.52) 61%, rgba(251, 251, 253, 0.42) 67%, rgba(251, 251, 253, 0.32) 72%, rgba(251, 251, 253, 0.23) 77%, rgba(251, 251, 253, 0.15) 82%, rgba(251, 251, 253, 0.09) 86%, rgba(251, 251, 253, 0.05) 90%, rgba(251, 251, 253, 0.028) 93%, rgba(251, 251, 253, 0.014) 96%, rgba(251, 251, 253, 0.006) 98%, rgba(251, 251, 253, 0) 100%';

const HERO_VIGNETTE_WIDTH_VW = 88;

export function NavHero({ onOpenSearch, onOpenContact, searchOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [heroAmbienceVisible, setHeroAmbienceVisible] = useState(false);
  const menuId = useId();
  const reduce = useReducedMotion();
  const heroIntroMotion = sectionMotion(reduce);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  /* 首帧先见 #fbfbfd 实底，再淡入氛围层，避免闪色。若日后首屏使用 background-image，宜在 img/onLoad 完成后再 setHeroAmbienceVisible(true)，与同一策略对齐。 */
  useLayoutEffect(() => {
    if (reduce) {
      setHeroAmbienceVisible(true);
      return;
    }
    let cancelled = false;
    let innerRaf = 0;
    const outerRaf = requestAnimationFrame(() => {
      innerRaf = requestAnimationFrame(() => {
        if (!cancelled) setHeroAmbienceVisible(true);
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(outerRaf);
      cancelAnimationFrame(innerRaf);
    };
  }, [reduce]);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.classList.add('ui-scroll-lock');
    return () => document.body.classList.remove('ui-scroll-lock');
  }, [mobileOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => {
      if (mq.matches) setMobileOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  return (
    <>
      <div
        id="cursor-trail"
        className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
        aria-hidden="true"
      />

      <nav
        className="global-nav fixed inset-x-0 top-0 z-[120] isolate overflow-visible border-b border-black/[0.06] bg-[#fbfbfd]/58 backdrop-blur-2xl backdrop-saturate-[1.75] transition-[background-color,backdrop-filter] duration-300 supports-[backdrop-filter]:bg-[#fbfbfd]/48"
        aria-label="页面导航"
        style={{ WebkitBackdropFilter: 'blur(24px) saturate(1.75)' }}
      >
        <div className="global-nav-inner mx-auto flex h-11 max-w-[1024px] items-center gap-2 px-4 md:h-12 md:gap-3 md:px-6 xl:max-w-[1200px]">
          {/* 移动端：汉堡 + 占位 + 搜索 */}
          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#1d1d1f] transition-colors duration-300 hover:bg-black/[0.06] md:hidden"
            aria-label={mobileOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="relative block h-3.5 w-[1.125rem]" aria-hidden="true">
              <motion.span
                className="absolute left-0 top-0 h-[1.5px] w-full origin-center rounded-full bg-current"
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="absolute left-0 top-[6px] h-[1.5px] w-full rounded-full bg-current"
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="absolute left-0 top-[12px] h-[1.5px] w-full origin-center rounded-full bg-current"
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
          </button>

          <div className="hidden min-w-0 flex-1 items-center justify-center gap-5 md:flex lg:gap-6">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="nav-link whitespace-nowrap py-2 transition-all duration-300"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex flex-1 md:flex-none" aria-hidden={!mobileOpen ? true : undefined} />

          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#1d1d1f] transition-all duration-300 hover:bg-black/[0.04] md:h-10 md:w-10"
            aria-label="搜索全站"
            aria-expanded={searchOpen ? 'true' : 'false'}
            aria-controls="search-panel"
            onClick={onOpenSearch}
          >
            <svg
              className="h-[1.05rem] w-[1.05rem] md:h-[1.125rem] md:w-[1.125rem]"
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
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen ? (
            <>
              <motion.button
                key="nav-mobile-backdrop"
                type="button"
                aria-label="关闭菜单"
                className="fixed inset-0 top-11 z-[118] bg-black/20 backdrop-blur-sm md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={closeMobile}
              />
              <motion.div
                key="nav-mobile-panel"
                id={menuId}
                className="absolute left-0 right-0 top-full z-[119] border-b border-black/[0.06] bg-[#fbfbfd]/72 px-4 py-4 shadow-[0_16px_48px_rgba(0,0,0,0.08)] backdrop-blur-2xl backdrop-saturate-[1.75] md:hidden"
                style={{ WebkitBackdropFilter: 'blur(24px) saturate(1.75)' }}
                role="navigation"
                aria-label="主导航"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <ul className="flex flex-col gap-0.5">
                  {NAV_LINKS.map(({ href, label }) => (
                    <li key={href}>
                      <a
                        href={href}
                        className="nav-mobile-link block rounded-xl px-3 py-3 text-[0.9375rem] text-[#1d1d1f] transition-colors duration-200 hover:bg-black/[0.04]"
                        onClick={closeMobile}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>
      </nav>

      <header
        id="hero"
        className="relative flex min-h-screen flex-col items-stretch overflow-hidden pt-11 md:pt-12 lg:flex-row"
      >
        <div
          id="sec-insights"
          className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-stretch transition-all duration-300 xl:max-w-[1280px] lg:flex-row lg:items-stretch"
          data-search-title="开篇"
          data-search-keywords="赵欣宇 Hi 中国传媒大学 模摄 ESTJ 产品经理 品牌 市场 商业分析"
          data-search-text="很高兴认识你 很难定义我 创意改变世界 字节跳动 霸王茶姬 猫眼 LVMH"
        >
          <motion.div
            className="relative z-[3] flex min-w-0 flex-1 flex-col justify-center px-5 py-14 sm:px-8 md:px-10 md:py-16 lg:py-24 lg:pl-14 lg:pr-6 xl:pl-20"
            {...heroIntroMotion}
          >
            <h1 className="text-[2.65rem] text-[#1d1d1f] transition-all duration-300 sm:text-[3.1rem] md:text-[3.75rem] lg:text-[4.25rem] xl:text-[5rem]">
              赵欣宇
            </h1>
            <div className="mt-6 flex flex-wrap gap-2 transition-all duration-300 md:mt-8 md:gap-2.5">
              <span className="rounded-full border border-[rgba(0,0,0,0.08)] bg-white/80 px-3 py-1 text-[0.75rem] text-[#424245] backdrop-blur-sm transition-all duration-300 md:px-3.5 md:py-1.5 md:text-[0.8125rem]">
                产品经理
              </span>
              <span className="rounded-full border border-[rgba(0,0,0,0.08)] bg-white/80 px-3 py-1 text-[0.75rem] text-[#424245] backdrop-blur-sm transition-all duration-300 md:px-3.5 md:py-1.5 md:text-[0.8125rem]">
                品牌
              </span>
              <span className="rounded-full border border-[rgba(0,0,0,0.08)] bg-white/80 px-3 py-1 text-[0.75rem] text-[#424245] backdrop-blur-sm transition-all duration-300 md:px-3.5 md:py-1.5 md:text-[0.8125rem]">
                市场
              </span>
              <span className="rounded-full border border-[rgba(0,0,0,0.08)] bg-white/80 px-3 py-1 text-[0.75rem] text-[#424245] backdrop-blur-sm transition-all duration-300 md:px-3.5 md:py-1.5 md:text-[0.8125rem]">
                商业分析
              </span>
            </div>
            <div
              id="hero-bio"
              className="mt-6 max-w-xl space-y-2.5 transition-all duration-300 md:mt-8 md:space-y-3"
            >
              <p className="text-[1rem] font-medium text-[#1d1d1f] md:text-[1.0625rem]">
                👋Hi，很高兴认识你
              </p>
              <p className="text-[0.8125rem] font-normal leading-[1.5] text-[#86868b] md:text-[0.875rem]">
                中国传媒大学在读，很难定义我，所以请接着看下去吧
              </p>
              <p className="text-[0.8125rem] font-normal leading-[1.55] text-[#6e6e73] md:text-[0.875rem]">
                02年模摄双修📷|非典型ESTJ♎|好的创意改变世界🌏
              </p>
            </div>
          </motion.div>
          <motion.div
            className="relative z-[2] flex max-w-xl flex-1 flex-col justify-center px-5 pb-14 pt-0 sm:px-8 md:px-10 lg:max-w-md lg:pb-24 lg:pl-4 lg:pr-16 lg:pt-24 xl:max-w-lg xl:pr-24"
            {...heroIntroMotion}
            transition={
              reduce ? undefined : { duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: 0.08 }
            }
          >
            <p className="text-[1.2rem] font-semibold leading-[1.25] tracking-[-0.015em] text-[#1d1d1f] transition-all duration-300 sm:text-[1.35rem] lg:text-[1.35rem] xl:text-[1.75rem]">
              一点审美，
              <br />
              和一点商业 sense。
            </p>
            <button
              type="button"
              className="mt-4 text-left text-[0.9375rem] font-normal text-[#0071e3] transition-all duration-300 hover:opacity-80 md:mt-5 md:text-base"
              onClick={onOpenContact}
            >
              点击联系我
            </button>
          </motion.div>
        </div>
        <div className="relative min-h-[34vh] flex-1 overflow-hidden pointer-events-none lg:overflow-visible lg:absolute lg:inset-y-0 lg:right-0 lg:flex-none lg:min-h-0 lg:w-[calc(46%+1cm)] xl:w-[calc(48%+1cm)]">
          <div
            className={`absolute inset-0 transition-opacity duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
              heroAmbienceVisible ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden="true"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div
                id="hero-parallax"
                className="hero-parallax-layer absolute inset-[-18%] bg-gradient-to-br from-[#c9dbf4] via-[#e2e8f6] to-[#ebe7f1] opacity-100 transition-transform duration-300 ease-out saturate-[1.03]"
                style={{ willChange: 'transform' }}
              />
            </div>
            {/* 窄屏：自下而上；桌面：自左向右；褪晕跨 HERO_VIGNETTE_WIDTH_VW vw，色阶加密以弱化分界 */}
            <div
              className="absolute inset-0 bg-no-repeat lg:hidden"
              style={{
                backgroundImage: `linear-gradient(to top, ${HERO_VIGNETTE_STOPS})`,
                backgroundSize: `100% ${HERO_VIGNETTE_WIDTH_VW}vw`,
                backgroundPosition: 'center bottom',
              }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 hidden lg:block"
              style={{
                width: `${HERO_VIGNETTE_WIDTH_VW}vw`,
                backgroundImage: `linear-gradient(to right, ${HERO_VIGNETTE_STOPS})`,
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </header>
    </>
  );
}
