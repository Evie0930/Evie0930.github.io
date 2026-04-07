import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { CAPSULE_PILL_CLASS } from '../capsuleStyles.js';

const MODULES = [
  { id: 'insights', to: '/explore/insights', label: '灵感洞察' },
  { id: 'footprints', to: '/explore/footprints', label: '旅行足迹' },
];

/**
 * 探索世界入口：极简胶囊按钮（首页区块与 /explore 共用）
 */
export function ExploreModuleCards({ className = '', animateEntrance = false }) {
  const reduceMotion = useReducedMotion();

  return (
    <nav
      className={`flex flex-wrap items-center justify-start gap-3 md:gap-4 ${className}`}
      aria-label="探索世界子页面"
    >
      {MODULES.map((m, i) => {
        if (!animateEntrance || reduceMotion) {
          return (
            <Link key={m.id} to={m.to} className={`${CAPSULE_PILL_CLASS} no-underline`}>
              {m.label}
            </Link>
          );
        }

        return (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.08 + i * 0.07,
              duration: 0.42,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Link to={m.to} className={`${CAPSULE_PILL_CLASS} no-underline`}>
              {m.label}
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );
}
