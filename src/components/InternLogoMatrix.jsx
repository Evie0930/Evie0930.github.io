import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { INTERN_BRANDS } from '../data/internBrands.js';

const logoTileBase =
  'flex aspect-square w-full max-w-[11.5rem] flex-col items-center justify-center rounded-[28px] border border-transparent bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out will-change-transform md:max-w-[13rem] md:p-6';

const logoTileHover =
  'hover:-translate-y-1 hover:border-black/[0.06] hover:shadow-[0_16px_48px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.04)]';

const logoTileDisabled =
  'cursor-not-allowed opacity-[0.42] hover:translate-y-0 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]';

export function InternLogoMatrix() {
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto max-w-4xl">
      <p className="mb-8 text-center text-[0.9375rem] font-normal leading-relaxed text-[#6e6e73] md:mb-10 md:text-[1rem]">
        点选品牌进入故事线；更多品牌页面陆续开放。
      </p>
      <ul className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4 md:gap-6">
        {INTERN_BRANDS.map((brand, i) => {
          const isChagee = brand.id === 'chagee';
          const inner = (
            <>
              <div className="relative flex h-[52%] w-full items-center justify-center md:h-[55%]">
                {isChagee ? (
                  <motion.div
                    layoutId="work-chagee-logo"
                    className="flex h-full max-h-[5.5rem] w-full items-center justify-center md:max-h-[6.25rem]"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  >
                    <img
                      src={brand.logo}
                      alt=""
                      className="max-h-full max-w-[88%] object-contain"
                      loading="lazy"
                    />
                  </motion.div>
                ) : (
                  <img
                    src={brand.logo}
                    alt=""
                    className="max-h-[5.5rem] max-w-[88%] object-contain md:max-h-[6.25rem]"
                    loading="lazy"
                  />
                )}
              </div>
              <span className="mt-3 text-center text-[0.8125rem] font-semibold leading-tight text-[#1d1d1f] md:text-[0.875rem]">
                {brand.name}
              </span>
            </>
          );

          if (brand.href) {
            return (
              <li key={brand.id} className="flex justify-center">
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-[11.5rem] md:max-w-[13rem]"
                >
                  <Link
                    to={brand.href}
                    className={`${logoTileBase} ${logoTileHover} block outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#0071e3]`}
                    aria-label={`查看 ${brand.name} 实习故事线`}
                  >
                    {inner}
                  </Link>
                </motion.div>
              </li>
            );
          }

          return (
            <li key={brand.id} className="flex justify-center">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[11.5rem] md:max-w-[13rem]"
              >
                <div
                  className={`${logoTileBase} ${logoTileDisabled}`}
                  role="group"
                  aria-label={`${brand.name}，敬请期待`}
                >
                  {inner}
                  <span className="mt-1 text-[0.6875rem] font-medium text-[#86868b]">敬请期待</span>
                </div>
              </motion.div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
