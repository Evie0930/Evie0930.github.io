import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const base = import.meta.env.BASE_URL;

const PROJECTS = [
  {
    id: 'superpowers',
    tag: 'AI 编程标准化',
    title: 'Superpowers',
    summary: '从需求到交付，一站式构建 AI 编程标准化工作流。',
    fine: '内置常用提示词模板，让团队协作告别低效返工。',
    image: `${base}projects/case-superpowers.png`,
    detail:
      '从需求澄清、编码规范到测试与验收，将 AI 辅助编程纳入可复制的团队流程。内置常用提示词模板与检查清单，降低沟通成本，减少返工与风格不一致问题。',
  },
  {
    id: 'pm-portfolio-generator',
    tag: 'AI 驱动的产品思维复盘',
    title: 'PM Portfolio Generator',
    summary: '别让你的产品在 GitHub 上吃灰。一键将代码仓库转化为专业的产品经理作品集。',
    fine: '自动提取 Problem Statement、User Journey 与技术架构，用 AI 讲好你的产品故事。',
    image: `${base}projects/case-pm-portfolio.png`,
    detail:
      '面向产品经理与独立开发者：连接代码仓库，自动梳理 Problem Statement、User Journey 与技术架构要点，用 AI 生成可读性强的产品叙事与作品集页面，让仓库里的工作被看见、被理解。',
  },
  {
    id: 'crush-skill',
    tag: 'AI 驱动的社交心理建模',
    title: 'crush.skill',
    summary: '把暧昧期的忐忑交给 AI，在发送前先彩排一遍。预测 TA 的回应，或者让 TA 直接与你对话。',
    fine: '通过提取聊天记录与社交媒体数据，生成 TA 的精准沟通画像，让每一条消息都恰到好处。',
    image: `${base}projects/case-crush-skill.png`,
    detail:
      '从代码与数据到可执行的沟通策略：自动解析聊天与社交痕迹，构建对方沟通画像，在发送前用 AI 预演对话路径，降低「发错一句就冷场」的心智成本，强调一键生成、可反复试错的便捷体验。',
  },
  {
    id: 'case-4',
    tag: '内容与传播',
    title: '项目案例 · 四',
    summary: '简介与成果可在此一句话概括，点击卡片查看详情。',
    fine: '副文案待补充。',
    image: null,
    detail: '详情内容待撰写。',
  },
];

/** Apple Store 配件卡：默认浅灰融底；悬停白底 + 柔影抬升 */
const caseCardArticleBase =
  'project-case-card group w-[min(85vw,20.5rem)] shrink-0 cursor-pointer snap-center overflow-hidden rounded-[20px] border border-transparent bg-[#f5f5f7] shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out will-change-transform hover:-translate-y-1.5 hover:border-black/[0.06] hover:bg-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.04)] sm:w-[22.5rem] md:w-[24rem]';

/** 全卡略矮；底图上移；文案叠于图上 */
const CASE_CARD_H = 'h-[540px]';
const CASE_IMG_BOX = 'h-[268px]';

function ProjectCaseCard({ p, onSelect }) {
  const imageBgClass = p.imageAreaBg === 'dark' ? 'bg-black' : 'bg-[#f5f5f7]';

  return (
    <article
      className={`relative ${CASE_CARD_H} ${caseCardArticleBase}`}
      role="button"
      tabIndex={0}
      aria-label={`查看 ${p.title} 详情`}
      onClick={() => onSelect(p)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(p);
        }
      }}
    >
      <div className="pointer-events-none absolute bottom-10 left-9 right-9 z-10 overflow-hidden rounded-xl">
        <div className={`relative ${CASE_IMG_BOX} w-full ${imageBgClass}`}>
          {p.image ? (
            <img
              src={p.image}
              alt={`${p.title} — ${p.tag}示意`}
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-4 text-center text-[12px] font-normal text-[#75757a]">
              封面图待替换
            </div>
          )}
        </div>
      </div>

      <div className="relative z-20 px-9 pb-8 pt-11">
        <div className="bg-gradient-to-b from-[#f5f5f7] from-0% via-[#f5f5f7]/96 via-50% to-transparent to-100% pb-1 transition-colors duration-300 group-hover:from-white group-hover:via-white/96">
          <p className="text-[13px] font-medium leading-snug tracking-[-0.01em] text-[#0071E3]">
            {p.tag}
          </p>
          <h3 className="mt-2.5 text-[2rem] font-black leading-[1.08] tracking-[-0.03em] text-[#1d1d1f]">
            {p.title}
          </h3>
          <p className="mt-2.5 text-[15px] font-medium leading-[1.7] text-[#3c3c43]">{p.summary}</p>
          {p.fine ? (
            <p className="mt-2 text-[10px] font-normal leading-[1.5] text-[#6e6e73] sm:text-[11px]">
              {p.fine}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function ProjectCases() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!selected) return;
    document.body.classList.add('ui-scroll-lock');
    const onKey = (e) => {
      if (e.key === 'Escape') setSelected(null);
    };
    document.addEventListener('keydown', onKey);
    const t = window.setTimeout(() => document.getElementById('project-detail-close')?.focus(), 10);
    return () => {
      window.clearTimeout(t);
      document.body.classList.remove('ui-scroll-lock');
      document.removeEventListener('keydown', onKey);
    };
  }, [selected]);

  return (
    <>
      <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 px-3 sm:px-4 md:px-5">
        <div className="overflow-hidden rounded-[28px] border border-black/[0.04] bg-[#f5f5f7] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_3px_rgba(0,0,0,0.04)]">
          <div
            className="project-cases-scroll flex gap-5 overflow-x-auto overflow-y-visible pb-4 pl-[max(0.75rem,calc(50vw-10.5rem))] pr-[max(0.75rem,calc(50vw-10.5rem))] pt-4 sm:gap-6 sm:pl-[max(1rem,calc(50vw-11.5rem))] sm:pr-[max(1rem,calc(50vw-11.5rem))] md:gap-6 md:pl-[max(1.25rem,calc(50vw-12.25rem))] md:pr-[max(1.25rem,calc(50vw-12.25rem))]"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {PROJECTS.map((p) => (
              <ProjectCaseCard key={p.id} p={p} onSelect={setSelected} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected ? (
          <motion.div
            key="project-detail"
            className="fixed inset-0 z-[205] flex items-end justify-center p-0 sm:items-center sm:p-5"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <motion.button
              type="button"
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              aria-label="关闭"
              onClick={() => setSelected(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative z-10 flex max-h-[min(90vh,40rem)] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-black/[0.06] bg-[#fbfbfd] shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:rounded-3xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-start justify-between gap-3 border-b border-black/[0.06] px-8 py-5">
                <div className="min-w-0">
                  <p className="text-[14px] font-normal text-[#0071E3]">{selected.tag}</p>
                  <h2
                    id="project-detail-title"
                    className="mt-1 text-2xl font-black tracking-tight text-[#1d1d1f]"
                  >
                    {selected.title}
                  </h2>
                </div>
                <button
                  type="button"
                  id="project-detail-close"
                  className="shrink-0 rounded-full p-2 text-[#86868b] hover:bg-black/[0.05]"
                  aria-label="关闭"
                  onClick={() => setSelected(null)}
                >
                  ×
                </button>
              </div>
              <div className="overflow-y-auto px-8 py-6">
                <p className="text-[0.9375rem] leading-relaxed text-[#424245]">{selected.detail}</p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
