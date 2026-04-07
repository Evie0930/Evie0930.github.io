import { motion, useReducedMotion } from 'framer-motion';
import { ProjectCases } from '../components/ProjectCases.jsx';
import { InternLogoMatrix } from '../components/InternLogoMatrix.jsx';
import { ExploreModuleCards } from '../components/explore/ExploreModuleCards.jsx';
import { HobbyCapsules } from '../components/HobbyCapsules.jsx';
import { SkillsMatrix } from '../components/SkillsMatrix.jsx';
import { sectionMotion } from '../motionPresets.js';

const assetBase = import.meta.env.BASE_URL;

/** 与 public/about-me-collage 源文件一致；若更换为 4K/8K 导出请同步修改宽高，利于高清缩放 */
const ABOUT_ME_COLLAGE = { src: `${assetBase}about-me-collage.png`, w: 1024, h: 674 };

/** Apple 式：主标题黑粗 + 全角句号；副句灰、比主标题略小一号 */
function SectionHeading({ id, lead, rest, className = '' }) {
  return (
    <h2
      id={id}
      className={`text-[1.75rem] font-normal leading-[1.35] transition-all duration-300 md:text-[1.875rem] lg:text-[2rem] ${className}`}
    >
      <span className="font-semibold text-[#1d1d1f]">{lead}</span>
      <span className="text-[1.5rem] font-normal leading-[1.35] text-[#6e6e73] md:text-[1.625rem] lg:text-[1.75rem]">
        {rest}
      </span>
    </h2>
  );
}

export function MainSections() {
  const reduce = useReducedMotion();
  const sm = sectionMotion(reduce);

  return (
    <main className="relative z-20 mx-auto max-w-6xl space-y-20 px-5 pb-20 sm:px-8 md:space-y-28 md:px-10 md:pb-28 lg:space-y-32 lg:px-12">
      <motion.section
        id="sec-about"
        className="scroll-mt-24 md:scroll-mt-28"
        aria-labelledby="sec-about-title"
        data-search-title="关于我"
        data-search-keywords="关于我 About me 品牌 探索 自我 成长 journey 双语"
        data-search-text="关于我 我走了很远的路 才来到你面前 About me"
        {...sm}
      >
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between md:mb-8">
          <div>
            <SectionHeading
              id="sec-about-title"
              lead="关于我。"
              rest="我走了很远的路，才来到你面前。"
            />
          </div>
          <div className="mb-2 ml-6 hidden h-px max-w-[min(100%,12rem)] flex-1 bg-[#1d1d1f]/15 sm:block" />
        </div>
        <div className="relative mx-auto w-full max-w-[calc(min(100%,56rem)-1cm)] overflow-hidden rounded-[24px]">
          <img
            src={ABOUT_ME_COLLAGE.src}
            width={ABOUT_ME_COLLAGE.w}
            height={ABOUT_ME_COLLAGE.h}
            alt="关于我 — 影像拼贴"
            className="block h-auto w-full max-w-none object-contain object-center"
            sizes="(max-width: 1024px) calc(100vw - 2.5rem), min(calc(56rem - 1cm), 100%)"
            srcSet={`${ABOUT_ME_COLLAGE.src} ${ABOUT_ME_COLLAGE.w}w`}
            fetchPriority="high"
            decoding="async"
          />
        </div>

        <div className="mx-auto mt-8 max-w-[calc(min(100%,56rem)-1cm)] text-center md:mt-10">
          <p className="text-[0.9375rem] font-normal leading-[1.5] text-[#424245] md:text-[1rem]">
            世界纷繁复杂、瞬息万变。探索自我是一场旅行，再挖掘、再成长
          </p>
          <p className="mt-4 text-[0.4375rem] font-normal uppercase leading-[1.28] tracking-[0.06em] text-[#6e6e73] sm:text-[0.46875rem]">
            THE WORLD IS COMPLEX AND CONSTANTLY CHANGING.
          </p>
          <p className="mt-1.5 text-[0.4375rem] font-normal uppercase leading-[1.28] tracking-[0.06em] text-[#6e6e73] sm:text-[0.46875rem]">
            EXPLORING ONESELF IS LIKE A JOURNEY THAT INVOLVES CONSTANT SELF DISCOVERY AND GROWTH.
          </p>
        </div>
      </motion.section>

      <motion.section
        id="internship-section"
        className="scroll-mt-24 md:scroll-mt-28"
        aria-labelledby="sec-intern-title"
        data-search-title="实习经历"
        data-search-keywords="霸王茶姬 字节跳动 Payroll 猫眼 LVMH 实习 SOP 业务场景"
        data-search-text="实习经历 金融 互联网 快消 品牌叙事 霸王茶姬 字节跳动 Payroll LVMH 猫眼"
        {...sm}
      >
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between md:mb-8 lg:mb-10">
          <div>
            <SectionHeading
              id="sec-intern-title"
              lead="实习经历。"
              rest="从金融到互联网到快消，用数据逻辑讲好品牌叙事。"
            />
          </div>
          <div className="mb-2 ml-6 hidden h-px max-w-[min(100%,14rem)] flex-1 bg-[#1d1d1f]/12 sm:block" />
        </div>
        <InternLogoMatrix />
      </motion.section>

      <motion.section
        id="sec-cases"
        className="scroll-mt-24 md:scroll-mt-28"
        aria-labelledby="sec-cases-title"
        data-search-title="项目案例"
        data-search-keywords="Superpowers PM Portfolio crush.skill 社交心理 GitHub 作品集 AI 编程标准化 案例"
        data-search-text="项目案例 最近在探索AI Superpowers PM Portfolio crush.skill AI 编程标准化"
        {...sm}
      >
        <div className="mb-6 md:mb-8 lg:mb-10">
          <SectionHeading id="sec-cases-title" lead="项目案例。" rest="最近在探索AI+。" />
        </div>
        <ProjectCases />
      </motion.section>

      <motion.section
        id="sec-skills"
        className="scroll-mt-24 md:scroll-mt-28"
        aria-labelledby="sec-skills-title"
        data-search-title="技能矩阵"
        data-search-keywords="英语 六级 Cursor Claude Code Python SQL Office PR PS 阿里云 AIGC 初级会计 计算机二级 国际人才"
        data-search-text="技能矩阵 语言 工具 证书 英语六级 Cursor Claude Code MS Office SPSS Python SQL PR PS 阿里云 AIGC 初级会计 计算机二级 国际人才"
        {...sm}
      >
        <div className="mb-6 md:mb-8 lg:mb-10">
          <SectionHeading id="sec-skills-title" lead="技能矩阵。" rest="什么有用，我接着学。" />
        </div>
        <SkillsMatrix />
      </motion.section>

      <motion.section
        id="sec-explore"
        className="scroll-mt-24 md:scroll-mt-28"
        aria-labelledby="sec-explore-title"
        data-search-title="探索世界"
        data-search-keywords="探索 灵感洞察 旅行足迹 地图 星空 灵魂"
        data-search-text="探索世界 灵感洞察 旅行足迹 我的灵魂先抵达 肉体才慢慢跟上"
        {...sm}
      >
        <div className="mb-6 md:mb-8 lg:mb-10">
          <SectionHeading
            id="sec-explore-title"
            lead="探索世界。"
            rest="我的灵魂先抵达，肉体才慢慢跟上。"
          />
        </div>
        <ExploreModuleCards className="mt-1" />
      </motion.section>

      <motion.section
        id="sec-hobbies"
        className="scroll-mt-24 md:scroll-mt-28"
        aria-labelledby="sec-hobbies-title"
        data-search-title="一些爱好"
        data-search-keywords="爱好 运动 输出 体验 学习 影像 音乐 播客"
        data-search-text="一些爱好 Play hard work harder 运动 输出 体验 学习"
        {...sm}
      >
        <div className="mb-6 md:mb-8 lg:mb-10">
          <SectionHeading
            id="sec-hobbies-title"
            lead="一些爱好。"
            rest="Play hard, work harder。"
          />
        </div>
        <HobbyCapsules className="mt-1" />
      </motion.section>
    </main>
  );
}
