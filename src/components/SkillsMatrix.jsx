/** 与 InternLogoMatrix 小方块一致的尺寸与阴影 */
const skillTileBase =
  'flex aspect-square w-full max-w-[14.5rem] flex-col rounded-[28px] border border-transparent bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out will-change-transform md:max-w-[16.5rem] md:p-5';

const skillTileHover =
  'hover:-translate-y-1 hover:border-black/[0.06] hover:shadow-[0_16px_48px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.04)]';

const SKILL_MODULES = [
  {
    id: 'language',
    tag: '语言',
    items: ['英语六级581分', '全国大学生英语竞赛三等奖', '英语可作为工作语言'],
  },
  {
    id: 'tools',
    tag: '工具',
    items: [
      'Cursor、Claude Code全栈开发',
      'MS Office',
      'SPSS、Python、SQL',
      'PR、PS、Ai等多媒体工具',
    ],
  },
  {
    id: 'certificates',
    tag: '证书',
    items: [
      '阿里云 × 教育部 AIGC 训练营',
      '初级会计证书',
      '计算机二级证书',
      '国际人才证书（英语）',
    ],
  },
];

function SkillModuleCard({ module }) {
  return (
    <article
      className={`${skillTileBase} ${skillTileHover}`}
      aria-labelledby={`skill-${module.id}-label`}
    >
      <p
        id={`skill-${module.id}-label`}
        className="mb-2 shrink-0 text-center text-[0.8125rem] font-semibold leading-tight text-[#0071e3] md:text-[0.875rem]"
      >
        {module.tag}
      </p>
      <ul className="flex min-h-0 flex-1 flex-col justify-center gap-1.5 text-[0.6875rem] font-normal leading-[1.45] text-[#424245] md:gap-2 md:text-[0.75rem]">
        {module.items.map((line) => (
          <li key={line} className="flex gap-1.5">
            <span
              className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-[#86868b]"
              aria-hidden="true"
            />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function SkillsMatrix() {
  return (
    <div className="mx-auto max-w-4xl">
      <ul className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-3 sm:gap-5 md:gap-6">
        {SKILL_MODULES.map((m) => (
          <li key={m.id} className="flex w-full justify-center">
            <SkillModuleCard module={m} />
          </li>
        ))}
      </ul>
    </div>
  );
}
