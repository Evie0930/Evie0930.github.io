import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { INTERN_BRANDS } from '../data/internBrands.js';

const chageeBrand = INTERN_BRANDS.find((b) => b.id === 'chagee');
const assetBase = import.meta.env.BASE_URL;

const CHAGEE_GUIYUNNAN_MAIN = `${assetBase}work/chagee-guiyunnan-main.png`;
const CHAGEE_GUIYUNNAN_CUPS = `${assetBase}work/chagee-guiyunnan-cups.png`;
const CHAGEE_SUMMER_MAIN = `${assetBase}work/chagee-summer-main.png`;
const CHAGEE_SUMMER_THUMB = `${assetBase}work/chagee-summer-thumb.png`;
const CHAGEE_MARKETING_MAIN = `${assetBase}work/chagee-marketing-main.png`;
const CHAGEE_MARKETING_THUMB = `${assetBase}work/chagee-marketing-thumb.png`;
const CHAGEE_AGENT_MAIN = `${assetBase}work/chagee-agent-main.png`;
const CHAGEE_AGENT_WORKFLOW_MAIN = `${assetBase}work/chagee-agent-workflow-main.png`;

const CARD_DETAILS = {
  summer: {
    title: '夏梦玫珑回归营销策划',
    sections: [
      {
        heading: '一、项目背景',
        paragraphs: [
          '夏日旺季，通过多款产品口味测试，往期销售数据对比，消费者用户反馈，产品复购率等维度，敲定夏梦玫珑全国回归：',
          '人和：蜜瓜回归呼声第一，回应茶友们的呼声，以人为本；',
          '地利：蜜瓜复购率高，调研反馈优，好喝为价值牵引；',
          '天时：盛夏将至，果味奶茶的趋势上升，顺势而为。',
        ],
      },
      {
        heading: '二、创意策略｜产品SLOGAN：蜜瓜白日梦，解暑小绿杯。',
        paragraphs: [
          '（一）上新概念',
          '【回应茶友，诚挚回归】——回应茶友呼声，为茶友而归，是上新主脉络；',
          '【延续概念，持续造梦】——延续性打造“夏梦”的产品概念，不断深化“小绿杯”。',
          '夏梦的概念延续：每年夏季持续“造梦”，从清凉感、静谧感到梦幻感不断深化；',
          '“解暑小绿杯”的再强调：绿色包材、绿色视觉、绿色周边的视觉持续；',
          '加强产品自身的物质宣传（好茶、好喝）。',
          '（二）文化线索',
          '与梦相关的东方文化中，庄周梦蝶的故事最为普世与绮丽，蕴含哲学与道家思想：',
          '文化上，以蝶为线索，如梦如幻的情景表达；',
          '物质上，以蝶表达香，香引蝶来的直观感受。',
        ],
      },
      {
        heading: '三、项目结果',
        paragraphs: ['首月销量900w+，杯量占比13%。'],
      },
    ],
  },
  guiYunnan: {
    title: '归云南，慢慢来。',
    sections: [
      {
        heading: '【冰岛甜，勐海醇，一口归云南】',
        paragraphs: [
          '这杯茶的灵魂，是一场关于云南一南一北的对话。',
          '我们选用65%的勐海熟普，就像它傣语美好寓意一样，勇敢者居住的地区，为这杯「归云南」提供醇厚感、滋味感；35%的冰岛熟普，来自茶王之乡临沧冰岛产区，如老寨山泉清甜温润，让整支茶的甜润感和协调性更好。找回茶与土地之间的路径，也是一种不慌不忙的从容。',
        ],
      },
      {
        heading: '【难：被落日卡住的视觉】',
        paragraphs: [
          '但浪漫往往是有代价的。为了还原生命最原始的张力，设计师带着色卡和草图，回到云南找颜色。站在勐海的山坡上，看着太阳西沉，大地染上一种温暖、厚重、带着赭石色调的红，这片被黄昏浸透的红土，我们意识到：这就是「归云南」的颜色。为了一段萦绕在山间的晨雾、一行来自千年前的、无声的古老笔迹，视觉定稿比预定晚了三周。',
        ],
      },
      {
        heading: '【讲一个“抢时间”的故事】',
        paragraphs: [
          '为了守护这份“慢”，我负责生产全链路的极限压缩，将供应周期从 6 周强行压缩2周：',
          '① 首先，以“统配收量”为锚点，倒推设计稿打样、工厂备料、生产周期的时间线，将原本串联的流程改为并联，优先向门店统配数量，工厂同步备料、供应链下订单。',
          '② 其次，消除信息冗余。我牵头完成了物料明细、价格红线、对接信息、责任人的梳理。在收量前锁定包材成本范围，确保所有协作方拿到的是唯一事实，从根源上砍掉了 30% 的沟通内耗，也保证内部审批线一路绿灯，当天下合同，当天工厂开工。',
          '③ 我带着设计师、QA老师飞到云南和研发老师汇合，直接在生产线上调整样稿，彻底消除异地寄样的时间成本。一边前置备料，一边核对采购价，实现了环环相扣的衔接。',
          '最终，12月19日如期上线，茶汤初沸，一盏澄红映照着来路与归途。',
        ],
      },
    ],
  },
  expo: {
    title: '茶博会全案营销',
    sections: [
      {
        heading: '一、展会目标',
        paragraphs: [
          '传播目标：借助官方媒体资源全方位曝光，主办方测算预计媒体曝光800w次。',
          '销售目标：本次活动以公关向展示为主，不设立销售目标。',
        ],
      },
      {
        heading: '二、执行拆解',
        paragraphs: [
          '【内容：年轻人懂茶，茶才有未来】',
          '在我入职第三天，我就直奔杭州现场。为了更好地传播品牌的好茶心智，我连夜背诵茶学知识，但突然我意识到：讲深度不如讲体感，于是将复杂的窨制工艺量化为便于秒懂的概念——“每一斤伯牙绝弦原料茶，需消耗3000朵茉莉花”。通过这个记忆点，让年轻人不再觉得茶学枯燥，而是感受到了具体的“重工”诚意。',
          '【渠道：卡准节奏，让声量不停】',
          '将复杂的全案执行拆解为三个阶段：',
          '预热期：线上释放#猜姬姐在哪和大家见面#话题，同时提前联系核心媒体，让受众在踏入展馆前就留下心锚。',
          '爆发期：现场主控试饮互动，并引导用户自发在小红书/朋友圈进行UGC传播。同时担任讲解员，向媒体直播讲述从云南出发的品牌叙事，将现场热度引流至云端。',
          '沉淀期：展后24小时内极速统计多渠道高质量视觉素材库，利用长尾流量持续渗透未到场的潜在客群。',
          '【转化：用数据思维，把“路人”变品牌的“数据资产”】',
          '虽然没有硬性销售指标，但我主动从商务分析视角设计了用户留存：通过现场领取天猫优惠券、扫码入社群等触点，将数万名现场观众从过客转化为“可触达”的私域资产。即使展会谢幕，我们依然拥有了持续唤醒这些用户的品牌阵地。',
        ],
      },
      {
        heading: '三、项目结果',
        paragraphs: [
          '被央视、人民日报、中新社等中央媒体，浙江卫视、浙江日报、浙江之声、浙江农业农村官微等省级媒体，杭州市媒体、新媒体平台、茶行业垂直媒体曝光1000w+次，进一步提升CHAGEE作为东方文化茶代表品牌的公众认知度与行业影响力。',
        ],
      },
    ],
  },
  agent: {
    title: 'Agent工作流提效',
    sections: [
      {
        heading: '【核心工作流模块】',
        paragraphs: [
          '1. 最新资讯收集',
          '收集小红书精选账号、微博热榜、新闻、电商评论区等可爬数据来源，实现资讯自动抓取与每日推送，既涵盖宏观茶饮行业热点、政策动态，也同步收集用户真实痛点、产品使用反馈，为后续竞品分析和策划撰写提供真实、及时的数据支撑，解决人工检索分散、时效不足的问题。',
          '2. 竞品分析',
          '从每日收集的多渠道资讯中，自动提取茶饮行业核心竞品，严格按照原料信息、定价、核心卖点、创新点四个维度信息进行横向对比，清晰梳理竞品优劣势及差异化亮点，精准定位可借鉴方向与规避点，为霸王茶姬产品策划提供针对性参考。',
          '3. 策划案撰写',
          '整合资讯收集的行业数据、用户反馈及竞品分析结果，按照品类洞察、人群分析、核心数据指标参考三大核心板块，组装成结构化、规范化的产品一页纸，逻辑清晰、重点突出，可直接用于后续修改与落地推进。',
          '4. 专业知识兜底校验与检索增强',
          '一是通过茶学专业知识agent进行兜底校验，精准修正茶学相关专业表述错误；二是设置负面限定词库，规避违规、不实及绝对化表述。同时搭建飞书文档库插件，可快速检索内部资料、过往策划案，实现检索增强，进一步提升内容准确性。',
        ],
      },
      {
        heading: '【适用场景】',
        paragraphs: [
          '1. 日常产品策划（新品构思、现有产品优化），为策划提供数据支撑与专业保障；',
          '2. 高频经营判断，通过每日资讯推送，快速掌握行业动态与用户需求，辅助决策；',
          '3. 标准化工作落地，替代人工零散操作，规范产品策划全流程，适配实习及日常工作场景，提升团队协同效率。',
        ],
      },
    ],
  },
};

function CardShell({ children, className = '' }) {
  return (
    <article
      className={`group flex w-[min(84vw,22rem)] shrink-0 snap-center flex-col overflow-hidden rounded-[20px] border border-black/5 bg-white shadow-[0_8px_24px_rgba(32,24,24,0.08)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_18px_34px_rgba(32,24,24,0.14)] md:w-[21rem] ${className}`}
    >
      {children}
    </article>
  );
}

function ChageeDetailModal({ detail, onClose }) {
  const isExpo = detail?.title === '茶博会全案营销';
  const bodyTypographyClass = isExpo
    ? 'space-y-5 px-6 pb-6 pt-4 text-[0.84rem] leading-[1.45] text-[#1f1b19]'
    : 'space-y-5 px-6 pb-6 pt-4 text-[0.9rem] leading-[1.5] text-[#1f1b19]';
  const sectionTypographyClass = 'space-y-1.5';
  const sectionTitleClass = 'text-[1rem] font-bold text-[#1f1b19]';

  useEffect(() => {
    if (!detail) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('ui-scroll-lock');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('ui-scroll-lock');
    };
  }, [detail, onClose]);

  if (!detail) return null;

  return (
    <div className="fixed inset-0 z-[220] overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="chagee-detail-title">
      <button
        type="button"
        className="absolute inset-0 h-full w-full bg-black/35 backdrop-blur-[2px]"
        aria-label="关闭弹窗"
        onClick={onClose}
      />
      <div className="relative mx-auto my-5 w-[min(94vw,1120px)] overflow-hidden rounded-[24px] border border-black/10 bg-[#fbfbf8] shadow-[0_18px_54px_rgba(0,0,0,0.24)]">
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-3">
          <h3 id="chagee-detail-title" className="text-[1.4rem] font-bold text-[#1f1b19]">
            {detail.title}
          </h3>
          <button type="button" className="text-2xl leading-none text-[#8a8581]" onClick={onClose} aria-label="关闭">
            ×
          </button>
        </div>
        <div className={bodyTypographyClass}>
          {detail.sections.map((section) => (
            <section key={section.heading} className={sectionTypographyClass}>
              <h4 className={sectionTitleClass}>{section.heading}</h4>
              {section.paragraphs.map((paragraph, index) => (
                <p key={`${section.heading}-${index}`}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WorkChageePage() {
  const reduce = useReducedMotion();
  const logoSrc = chageeBrand?.logo ?? '';
  const [activeDetailKey, setActiveDetailKey] = useState(null);

  return (
    <motion.main
      className="min-h-screen bg-[#F5F5F0] pb-14 pt-[4.5rem] text-[#1f1b19] antialiased"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
    >
      <header className="fixed inset-x-0 top-0 z-[130] border-b border-black/[0.06] bg-[#F5F5F0]/92 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 md:h-[3.75rem] md:px-8">
          <Link
            to={{ pathname: '/', hash: 'internship-section' }}
            className="group flex items-center gap-0.5 text-[0.9375rem] font-medium text-[#0869cc] transition-opacity hover:opacity-80"
            aria-label="返回实习经历"
          >
            <span className="text-[1.125rem] leading-none" aria-hidden="true">
              ‹
            </span>
            返回
          </Link>
          <div className="ml-1 flex min-w-0 flex-1 items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-[0_1px_6px_rgba(0,0,0,0.1)]">
              <img src={logoSrc} alt="" className="h-[72%] w-[72%] object-contain" />
            </div>
            <span className="truncate text-[0.875rem] font-semibold tracking-tight md:text-[0.95rem]">
              霸王茶姬 · CHAGEE
            </span>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pt-4 md:px-8">
        <h1 className="text-center text-2xl font-bold tracking-tight text-[#1f1b19] md:text-3xl">
          实习经历
          <span className="ml-2 text-xl font-medium text-[#6d6662] md:text-2xl">
            从互联网到快消，用数据逻辑讲好品牌叙事。
          </span>
        </h1>

        <div
          data-lenis-prevent
          className="mt-7 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <CardShell>
            <div className="aspect-square overflow-hidden bg-gradient-to-b from-[#fff9f5] to-white p-6">
              <div className="flex h-full w-full items-center justify-center">
                <img src={logoSrc} alt="霸王茶姬 Logo" className="h-[86%] w-[86%] object-contain object-center" />
              </div>
            </div>
            <div className="space-y-3 px-5 pb-6 pt-5">
              <p className="min-h-[3.5rem] text-lg font-bold">东方茶产品经理</p>
              <p className="text-base font-semibold text-[#C8102E]">2025.05 - 2026.03</p>
              <p className="min-h-[4.5rem] text-sm leading-6 text-[#554f4b]">
                规范东方茶商品开发 SOP，协同 10+ 款产品从规划、打样到上市的全生命周期管理。
              </p>
            </div>
          </CardShell>

          <CardShell>
            <button type="button" className="text-left" onClick={() => setActiveDetailKey('summer')} aria-label="查看夏梦玫珑详情">
            <div className="relative aspect-square overflow-hidden bg-[#f2f4ec] p-3">
              <img
                src={CHAGEE_SUMMER_MAIN}
                alt="夏梦玫珑海报"
                className="h-full w-full rounded-2xl object-cover object-center"
              />
              <img
                src={CHAGEE_SUMMER_THUMB}
                alt=""
                className="absolute bottom-5 right-5 h-[5.25rem] w-[5.25rem] rounded-xl border border-white/80 object-cover object-center shadow-md"
              />
            </div>
            <div className="space-y-3 px-5 pb-6 pt-5">
              <h2 className="min-h-[3.5rem] text-xl font-bold">夏梦玫珑回归营销策划</h2>
              <p className="text-base font-semibold text-[#C8102E]">奶茶品类6月声量排名第一</p>
              <p className="min-h-[4.5rem] text-sm leading-6 text-[#554f4b]">品牌升级：从奢侈感转向东方美学</p>
            </div>
            </button>
          </CardShell>

          <CardShell>
            <button type="button" className="text-left" onClick={() => setActiveDetailKey('guiYunnan')} aria-label="查看茶拿铁详情">
            <div className="relative aspect-square overflow-hidden bg-[#f7f3ef] p-3">
              <img
                src={CHAGEE_GUIYUNNAN_CUPS}
                alt="归云南主题杯身"
                className="h-full w-full rounded-2xl object-cover object-center"
              />
              <img
                src={CHAGEE_GUIYUNNAN_MAIN}
                alt=""
                className="absolute bottom-5 right-5 h-[5.25rem] w-[5.25rem] rounded-xl border border-white/80 object-cover object-center shadow-md"
              />
            </div>
            <div className="space-y-3 px-5 pb-6 pt-5">
              <h2 className="min-h-[3.5rem] text-xl font-bold">茶拿铁品类落地</h2>
              <p className="text-base font-semibold text-[#C8102E]">到仓时间6周→2周</p>
              <p className="min-h-[4.5rem] text-sm leading-6 text-[#554f4b]">供应链统筹奇迹，守住茶山赤诚</p>
            </div>
            </button>
          </CardShell>

          <CardShell>
            <button type="button" className="text-left" onClick={() => setActiveDetailKey('expo')} aria-label="查看茶博会详情">
            <div className="relative aspect-square overflow-hidden bg-[#f7f3ef] p-3">
              <img
                src={CHAGEE_MARKETING_MAIN}
                alt="全案营销现场"
                className="h-full w-full rounded-2xl object-cover object-center"
              />
              <img
                src={CHAGEE_MARKETING_THUMB}
                alt=""
                className="absolute bottom-5 right-5 h-[5.25rem] w-[5.25rem] rounded-xl border border-white/80 object-cover object-center shadow-md"
              />
            </div>
            <div className="space-y-3 px-5 pb-6 pt-5">
              <h2 className="min-h-[3.5rem] text-xl font-bold">茶博会全案营销</h2>
              <p className="text-base font-semibold text-[#C8102E]">30+家权威媒体曝光1000w次</p>
              <p className="min-h-[4.5rem] text-sm leading-6 text-[#554f4b]">提升品牌的公众认知度与行业影响力</p>
            </div>
            </button>
          </CardShell>

          <CardShell>
            <button type="button" className="text-left" onClick={() => setActiveDetailKey('agent')} aria-label="查看Agent详情">
            <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-[#f0efef] to-[#f7f7f7] p-3">
              <img
                src={CHAGEE_AGENT_WORKFLOW_MAIN}
                alt="Agent工作流大图"
                className="h-full w-full rounded-2xl object-cover object-center"
              />
              <img
                src={CHAGEE_AGENT_MAIN}
                alt=""
                className="absolute bottom-5 right-5 h-[5.25rem] w-[5.25rem] rounded-xl border border-white/80 object-cover object-center shadow-md"
              />
            </div>
            <div className="space-y-3 px-5 pb-6 pt-5">
              <h2 className="min-h-[3.5rem] text-xl font-bold">Agent工作流提效</h2>
              <p className="text-base font-semibold text-[#C8102E]">每日产出资讯报告</p>
              <p className="min-h-[4.5rem] text-sm leading-6 text-[#554f4b]">生产力提效，标准化MRD产出</p>
            </div>
            </button>
          </CardShell>
        </div>
      </section>
      <ChageeDetailModal detail={activeDetailKey ? CARD_DETAILS[activeDetailKey] : null} onClose={() => setActiveDetailKey(null)} />
    </motion.main>
  );
}
