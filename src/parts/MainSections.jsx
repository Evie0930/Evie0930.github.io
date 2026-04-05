import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { sectionMotion } from '../motionPresets.js';

export function MainSections() {
  const reduce = useReducedMotion();
  const sm = sectionMotion(reduce);

  return (
    <main className="relative z-20 mx-auto max-w-6xl space-y-20 px-5 pb-20 sm:px-8 md:space-y-28 md:px-10 md:pb-28 lg:space-y-32 lg:px-12">
      <motion.section
        id="sec-brand"
        className="scroll-mt-24 md:scroll-mt-28"
        aria-labelledby="sec-brand-title"
        data-search-title="个人品牌"
        data-search-keywords="品牌 探索 自我 成长 journey 双语"
        data-search-text="世界纷繁复杂 探索自我 THE WORLD IS COMPLEX Brand Exploration me"
        {...sm}
      >
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between md:mb-8">
          <div>
            <h2
              id="sec-brand-title"
              className="text-[1.75rem] text-[#1d1d1f] transition-all duration-300 md:text-[1.875rem] lg:text-[2rem]"
            >
              个人品牌
            </h2>
            <p className="mt-2 text-[0.6875rem] font-medium uppercase leading-[1.3] tracking-[0.12em] text-[#86868b] transition-all duration-300 md:text-xs">
              Brand Exploration
            </p>
          </div>
          <div className="mb-2 ml-6 hidden h-px max-w-[min(100%,12rem)] flex-1 bg-[#1d1d1f]/15 sm:block" />
        </div>
        <div className="ds-card ds-card-hover relative overflow-hidden border border-white/[0.06] bg-[#0d0d0d] p-4 sm:p-5 md:p-7">
          <div className="relative mx-auto max-w-4xl">
            <div className="grid grid-cols-3 grid-rows-2 gap-1.5 sm:gap-2 md:gap-2.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-[12px] bg-[#262626] ring-1 ring-white/[0.06] transition-all duration-300"
                  aria-hidden="true"
                />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <div className="flex flex-col items-center bg-[#1a5d36]/95 px-4 py-10 text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)] sm:px-5 sm:py-12">
                <span className="text-[2rem] font-semibold lowercase leading-none tracking-[-0.02em] sm:text-[2.25rem]">
                  me
                </span>
                <div className="mt-4 h-12 w-px bg-white/35 sm:h-14" />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-3xl px-1 text-center md:mt-12">
          <p className="text-[0.9375rem] font-normal leading-[1.5] text-[#424245] transition-all duration-300 md:text-[1rem]">
            世界纷繁复杂，瞬息万变。探索自我是一场旅行，再挖掘、再成长。
          </p>
          <p className="mt-5 text-[0.625rem] font-normal uppercase leading-[1.45] tracking-[0.08em] text-[#6e6e73] transition-all duration-300 sm:mt-6 sm:text-[0.6875rem] sm:tracking-[0.1em] md:text-xs">
            THE WORLD IS COMPLEX AND CONSTANTLY CHANGING. EXPLORING ONESELF IS LIKE A JOURNEY THAT INVOLVES CONSTANT SELF
            DISCOVERY AND GROWTH.
          </p>
        </div>
      </motion.section>

      <motion.section
        id="sec-intern"
        className="scroll-mt-24 md:scroll-mt-28"
        aria-labelledby="sec-intern-title"
        data-search-title="实习经历"
        data-search-keywords="霸王茶姬 字节跳动 Payroll 猫眼 LVMH 实习 SOP 业务场景"
        data-search-text="霸王茶姬 字节 Payroll PM 猫眼文娱 票务 LVMH 奢侈品 业务场景覆盖 SOP 能力沉淀"
        {...sm}
      >
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between md:mb-8 lg:mb-10">
          <div>
            <h2
              id="sec-intern-title"
              className="text-[1.75rem] text-[#1d1d1f] transition-all duration-300 md:text-[1.875rem] lg:text-[2rem]"
            >
              实习经历
            </h2>
            <p className="mt-2 text-[0.6875rem] font-medium uppercase leading-[1.3] tracking-[0.12em] text-[#86868b] transition-all duration-300 md:text-xs">
              Work
            </p>
          </div>
          <div className="mb-2 ml-6 hidden h-px max-w-[min(100%,14rem)] flex-1 bg-[#1d1d1f]/12 sm:block" />
        </div>
        <div className="space-y-5 md:space-y-6 lg:space-y-8">
          <InternCard1 />
          <InternCard2 />
          <InternCard3 />
          <InternCard4 />
        </div>
      </motion.section>

      <motion.section
        id="sec-projects"
        className="scroll-mt-24 md:scroll-mt-28"
        aria-labelledby="sec-projects-title"
        data-search-title="项目经历"
        data-search-keywords="市调大赛 SPSS Python 学生电视台 台长 调研 报告"
        data-search-text="全国大学生市场调研与分析大赛 学生电视台 台长 数据分析 视频 宣传"
        {...sm}
      >
        <h2
          id="sec-projects-title"
          className="mb-6 text-[1.75rem] text-[#1d1d1f] transition-all duration-300 md:mb-8 md:text-[1.875rem] lg:mb-10 lg:text-[2rem]"
        >
          项目经历
        </h2>
        <div className="space-y-5 md:space-y-6 lg:space-y-8">
          <article className="ds-card ds-card-hover overflow-hidden border border-[rgba(0,0,0,0.06)] bg-white transition-all duration-300">
            <div className="p-6 sm:p-8 md:p-10 lg:p-11">
              <h3 className="text-[1.125rem] text-[#1d1d1f] transition-all duration-300 md:text-[1.1875rem] lg:text-[1.25rem]">
                全国大学生市场调研与分析大赛
              </h3>
              <p className="mt-1 text-[0.8125rem] font-normal text-[#86868b] transition-all duration-300 md:text-sm">
                团队负责人 · 2021-05 — 2022-05
              </p>
              <p className="mt-3 text-[0.9375rem] font-normal leading-[1.47059] text-[#6e6e73] transition-all duration-300 md:mt-4 md:text-[1rem]">
                针对大学生消费与行为选题，运用 SPSS、Python 完成数据分析与建模，输出约 7 万字研究报告与经营建议。
              </p>
              <ul className="mt-5 list-disc space-y-2 pl-5 text-[0.875rem] font-normal leading-[1.47059] text-[#424245] transition-all duration-300 md:mt-6 md:text-[1rem]">
                <li>负责调研设计、数据清洗、统计分析与报告撰写全流程。</li>
                <li>获国家三等奖，并获云南省产业研究省级立项。</li>
              </ul>
              <div className="mt-6 overflow-hidden rounded-xl border border-[rgba(0,0,0,0.06)] shadow-sm transition-all duration-300 md:mt-8 md:rounded-2xl">
                <img
                  src="https://via.placeholder.com/960x360/6e6e73/ffffff?text=Market+Research+Report"
                  alt="市调大赛报告配图占位"
                  width={960}
                  height={360}
                  className="h-auto w-full object-cover transition-all duration-300"
                  loading="lazy"
                />
              </div>
            </div>
          </article>
          <article className="ds-card ds-card-hover overflow-hidden border border-[rgba(0,0,0,0.06)] bg-white transition-all duration-300">
            <div className="p-6 sm:p-8 md:p-10 lg:p-11">
              <h3 className="text-[1.125rem] text-[#1d1d1f] transition-all duration-300 md:text-[1.1875rem] lg:text-[1.25rem]">
                校党委宣传部 · 学生电视台
              </h3>
              <p className="mt-1 text-[0.8125rem] font-normal text-[#86868b] transition-all duration-300 md:text-sm">
                台长 · 2020-08 — 2023-06
              </p>
              <p className="mt-3 text-[0.9375rem] font-normal leading-[1.47059] text-[#6e6e73] transition-all duration-300 md:mt-4 md:text-[1rem]">
                统筹院校级活动拍摄与宣传，负责项目执行、人员排期、预算管理与赞助合作；覆盖开学典礼、晚会直播等大型活动，可在面谈中补充代表作与团队规模。
              </p>
              <div className="mt-6 overflow-hidden rounded-xl border border-[rgba(0,0,0,0.06)] shadow-sm transition-all duration-300 md:mt-8 md:rounded-2xl">
                <img
                  src="https://via.placeholder.com/960x360/0071e3/ffffff?text=TV+Station+Portfolio"
                  alt="学生电视台作品占位"
                  width={960}
                  height={360}
                  className="h-auto w-full object-cover transition-all duration-300"
                  loading="lazy"
                />
              </div>
            </div>
          </article>
        </div>
      </motion.section>

      <motion.section
        id="sec-skills"
        className="scroll-mt-24 md:scroll-mt-28"
        aria-labelledby="sec-skills-title"
        data-search-title="技能矩阵"
        data-search-keywords="英语 六级 SPSS Python SQL Office PR PS 剪映 飞书 AIGC 初级会计 计算机二级"
        data-search-text="技能 语言 工具 证书 MS Office 阿里云 AIGC 训练营"
        {...sm}
      >
        <h2
          id="sec-skills-title"
          className="mb-6 text-[1.75rem] text-[#1d1d1f] transition-all duration-300 md:mb-8 md:text-[1.875rem] lg:mb-10 lg:text-[2rem]"
        >
          技能矩阵
        </h2>
        <div className="ds-card ds-card-hover border border-[rgba(0,0,0,0.06)] bg-white p-6 transition-all duration-300 sm:p-8 md:p-10 lg:p-11">
          <div className="grid gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-12">
            <div className="transition-all duration-300">
              <h3 className="mb-3 text-[0.6875rem] font-medium uppercase leading-[1.3] tracking-[0.08em] text-[#86868b] transition-all duration-300 md:mb-4 md:text-xs">
                语言
              </h3>
              <p className="text-[0.875rem] font-normal leading-[1.47059] text-[#424245] transition-all duration-300 md:text-[1rem]">
                英语六级 581；全国大学生英语竞赛三等奖；英语可作为工作语言。
              </p>
            </div>
            <div className="transition-all duration-300">
              <h3 className="mb-3 text-[0.6875rem] font-medium uppercase leading-[1.3] tracking-[0.08em] text-[#86868b] transition-all duration-300 md:mb-4 md:text-xs">
                工具
              </h3>
              <p className="text-[0.875rem] font-normal leading-[1.47059] text-[#424245] transition-all duration-300 md:text-[1rem]">
                熟练使用 MS Office、SPSS、Python、SQL、PR、PS、剪映、飞书。
              </p>
            </div>
            <div className="transition-all duration-300">
              <h3 className="mb-3 text-[0.6875rem] font-medium uppercase leading-[1.3] tracking-[0.08em] text-[#86868b] transition-all duration-300 md:mb-4 md:text-xs">
                证书
              </h3>
              <p className="text-[0.875rem] font-normal leading-[1.47059] text-[#424245] transition-all duration-300 md:text-[1rem]">
                阿里云 × 教育部 AIGC 训练营、初级会计、计算机二级。
              </p>
            </div>
          </div>
          <div className="mt-8 overflow-hidden rounded-xl border border-[rgba(0,0,0,0.06)] transition-all duration-300 md:mt-10 md:rounded-2xl">
            <img
              src="https://via.placeholder.com/1120x280/f5f5f7/86868b?text=Skills+Matrix+Visual"
              alt="技能矩阵示意占位"
              width={1120}
              height={280}
              className="h-auto w-full object-cover transition-all duration-300"
              loading="lazy"
            />
          </div>
        </div>
      </motion.section>

      <motion.section
        id="sec-explore"
        className="scroll-mt-24 md:scroll-mt-28"
        aria-labelledby="sec-explore-title"
        data-search-title="探索世界"
        data-search-keywords="阅读 行走 城市 展览 认知 边界"
        data-search-text="探索世界 阅读与行走 认知边界 城市与展览"
        {...sm}
      >
        <h2
          id="sec-explore-title"
          className="mb-4 text-[1.75rem] text-[#1d1d1f] transition-all duration-300 md:mb-5 md:text-[1.875rem] lg:text-[2rem]"
        >
          探索世界
        </h2>
        <p className="max-w-2xl text-[0.9375rem] font-normal leading-[1.47059] text-[#6e6e73] transition-all duration-300 md:text-[1rem]">
          用阅读与行走扩容认知边界：关注城市空间、消费文化与品牌叙事，把路上的问题带回产品与策略里。
        </p>
      </motion.section>

      <motion.section
        id="sec-entertain"
        className="scroll-mt-24 md:scroll-mt-28"
        aria-labelledby="sec-entertain-title"
        data-search-title="娱乐"
        data-search-keywords="影像 音乐 播客 电影 灵感"
        data-search-text="娱乐 影像 音乐 手感 灵感回血"
        {...sm}
      >
        <h2
          id="sec-entertain-title"
          className="mb-4 text-[1.75rem] text-[#1d1d1f] transition-all duration-300 md:mb-5 md:text-[1.875rem] lg:text-[2rem]"
        >
          娱乐
        </h2>
        <p className="max-w-2xl text-[0.9375rem] font-normal leading-[1.47059] text-[#6e6e73] transition-all duration-300 md:text-[1rem]">
          影像、音乐与播客里的微小兴奋，是审美与创意的补给站；欢迎在面谈时交换各自的「回血清单」。
        </p>
      </motion.section>
    </main>
  );
}

function ExpandableIntern({ id, title, period, summary, children }) {
  const [open, setOpen] = useState(false);
  return (
    <article
      className="intern-card ds-card ds-card-hover overflow-hidden border border-[rgba(0,0,0,0.06)] bg-white transition-all duration-300"
      data-intern-expandable
    >
      <div className="p-6 sm:p-8 md:p-10 lg:p-11">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h3 className="text-[1.125rem] text-[#1d1d1f] transition-all duration-300 md:text-[1.1875rem] lg:text-[1.25rem]">{title}</h3>
            <p className="mt-1 tabular-nums text-[0.8125rem] font-normal text-[#86868b] transition-all duration-300 md:text-sm">{period}</p>
          </div>
          <button
            type="button"
            className="expand-trigger shrink-0 self-start text-[0.8125rem] font-medium text-[#0071e3] transition-all duration-300 hover:opacity-80 sm:self-auto md:text-sm"
            aria-expanded={open}
            aria-controls={id}
            onClick={(e) => {
              e.stopPropagation();
              setOpen((v) => !v);
            }}
          >
            <span className="expand-hint-text">{open ? '收起' : '查看详情'}</span>
          </button>
        </div>
        <p className="mt-3 text-[0.9375rem] font-normal leading-[1.47059] text-[#6e6e73] transition-all duration-300 md:mt-4 md:text-[1rem]">
          {summary}
        </p>
      </div>
      <div className={`expand-outer border-t border-[rgba(0,0,0,0.06)] bg-[#fafafc]${open ? ' is-open' : ''}`} id={id}>
        <div className="expand-panel">
          <div className="expand-panel-inner px-6 pb-8 pt-0 sm:px-8 md:px-10 md:pb-10 lg:px-11 lg:pb-11">
            <div className="space-y-6 pt-6 md:space-y-8 md:pt-8">{children}</div>
          </div>
        </div>
      </div>
    </article>
  );
}

function InternCard1() {
  return (
    <ExpandableIntern
      id="intern-panel-1"
      title="霸王茶姬"
      period="2025.05 — 2026.03"
      summary="东方茶产品线实习：商品 SP、包材与上新节奏、详情页与传播协同，推动多 SKU 从规划到上线的流程闭环。"
    >
      <ul className="list-disc space-y-2 pl-5 text-[0.875rem] font-normal leading-[1.47059] text-[#424245] transition-all duration-300 md:text-[1rem]">
        <li>规范商品 SP 与自动化流程，支持多款产品从规划、包材打样到上线，新品节奏与详情页指标持续优化。</li>
        <li>输出 MRD / 产品一页纸，搭建茶学智能能力，降低推广中的专业知识门槛。</li>
        <li>参与营销节点与渠道协同，联动供应商与内部项目工具，沉淀可复用的交付与协作方式。</li>
      </ul>
      <div className="overflow-hidden rounded-[16px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300">
        <img
          src="https://via.placeholder.com/960x400/0071e3/ffffff?text=%E9%9C%B8%E7%8E%8B%E8%8C%B6%E5%A7%AC"
          alt="霸王茶姬实习配图占位"
          width={960}
          height={400}
          className="h-auto w-full object-cover transition-all duration-300"
          loading="lazy"
        />
      </div>
    </ExpandableIntern>
  );
}

function InternCard2() {
  return (
    <ExpandableIntern
      id="intern-panel-2"
      title="字节跳动"
      period="2024.12 — 2025.05"
      summary="抖音集团人力薪酬产品线实习：参与需求梳理、跨团队迭代与数据化验收。"
    >
      <ul className="list-disc space-y-2 pl-5 text-[0.875rem] font-normal leading-[1.47059] text-[#424245] transition-all duration-300 md:text-[1rem]">
        <li>
          <strong className="font-semibold text-[#1d1d1f]">Payroll PM：</strong>
          负责薪酬人力链路中的产品需求澄清、方案评审与上线节奏管理，对齐业务、研发与运营多方预期。
        </li>
        <li>
          <strong className="font-semibold text-[#1d1d1f]">业务场景覆盖：</strong>
          支撑 600+ 细分业务场景梳理与归类，推动关键路径标准化，降低异常与返工。
        </li>
        <li>
          <strong className="font-semibold text-[#1d1d1f]">SOP 能力沉淀：</strong>
          参与沉淀 30+ 条 SP / 流程能力说明与模板，结合 LLM 等能力探索自动化填单、校验与知识问答，提升人效。
        </li>
        <li>0–1 搭建约 2 万规模相关模块，效率提升约 50%；跟进 100+ 需求，业绩达成率约 110%。</li>
      </ul>
      <div className="overflow-hidden rounded-[16px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300">
        <img
          src="https://via.placeholder.com/960x400/1d1d1f/ffffff?text=ByteDance+Payroll+PM"
          alt="字节跳动实习配图占位"
          width={960}
          height={400}
          className="h-auto w-full object-cover transition-all duration-300"
          loading="lazy"
        />
      </div>
    </ExpandableIntern>
  );
}

function InternCard3() {
  return (
    <ExpandableIntern
      id="intern-panel-3"
      title="猫眼文娱"
      period="2024.04 — 2024.09"
      summary="文娱票务与宣发场景下的产品与运营支持：活动配置、数据看板与跨部门协同，理解 C 端转化与 B 端合作节奏。"
    >
      <ul className="list-disc space-y-2 pl-5 text-[0.875rem] font-normal leading-[1.47059] text-[#424245] transition-all duration-300 md:text-[1rem]">
        <li>参与演出 / 影片档期的线上展示与购票链路相关需求整理，协助优化关键页面与规则说明。</li>
        <li>配合市场与商务侧宣发物料、专题页迭代，跟踪核心转化与流量结构（可按实际项目替换指标）。</li>
        <li>使用数据与文档沉淀常见配置与问题清单，减少重复沟通成本。</li>
      </ul>
      <div className="overflow-hidden rounded-[16px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300">
        <img
          src="https://via.placeholder.com/960x400/424245/ffffff?text=%E7%8C%AB%E7%9C%BC%E6%96%87%E5%A8%B1"
          alt="猫眼文娱实习配图占位"
          width={960}
          height={400}
          className="h-auto w-full object-cover transition-all duration-300"
          loading="lazy"
        />
      </div>
    </ExpandableIntern>
  );
}

function InternCard4() {
  return (
    <ExpandableIntern
      id="intern-panel-4"
      title="LVMH"
      period="2023.06 — 2023.09"
      summary="奢侈品集团语境下的营销与零售支持：品牌素材、SKU 信息与门店视觉相关协调，建立对高端节奏与合规要求的体感。"
    >
      <ul className="list-disc space-y-2 pl-5 text-[0.875rem] font-normal leading-[1.47059] text-[#424245] transition-all duration-300 md:text-[1rem]">
        <li>协助产品营销与零售沟通，整理 SKU、系列故事与本地化物料需求。</li>
        <li>参与竞品与行业信息搜集，输出简要洞察供内部讨论（可替换为具体品牌线）。</li>
        <li>理解奢侈品视觉与文案规范，支持多部门对齐节奏与版本管理。</li>
      </ul>
      <div className="overflow-hidden rounded-[16px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300">
        <img
          src="https://via.placeholder.com/960x400/1a1a1a/ffffff?text=LVMH"
          alt="LVMH 实习配图占位"
          width={960}
          height={400}
          className="h-auto w-full object-cover transition-all duration-300"
          loading="lazy"
        />
      </div>
    </ExpandableIntern>
  );
}
