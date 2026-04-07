/**
 * 霸王茶姬 /work/chagee 横向画廊卡片（文案、占位说明、弹窗 HTML）
 */

export const CHAGEE_GALLERY_CARDS = [
  {
    id: 'overview',
    visualHint: 'logo-slogan',
    placeholderLabel: '品牌 Logo 与 Slogan',
    title: '东方茶产品经理',
    metric: '2025.05 – 2026.03',
    subtitle:
      '规范东方茶商品开发SOP，协调10+款产品从产品规划、包材打样到上市的全生命周期管理',
    metricTone: 'neutral',
    detailHtml: `
<section>
<p>实习期间深度参与东方茶产品线从策略到落地的全链路建设：从用户洞察、产品定义到上市节奏与渠道协同，在「茶」这一文化载体上，尝试用数据与叙事把品牌讲清楚、把闭环跑通。</p>
<p>这段经历让我习惯在快节奏里对齐多方目标，也把「从 0 到 1」拆解成可执行、可复盘、可迭代的里程碑。</p>
</section>`,
  },
  {
    id: 'brand',
    visualHint: 'cup-sunset',
    placeholderLabel: '「归云南」杯身 + 勐海落日氛围',
    title: '归云南，慢慢来。',
    metric: '到仓时间6周→2周',
    subtitle: '供应链统筹奇迹，守住三千年的茶山赤诚。',
    subtitleTone: 'dark',
    metricTone: 'accent',
    detailHtml: `
<section>
<h3>【冰岛甜，勐海醇，一口归云南】</h3>
<p>这杯茶的灵魂，是一场关于云南一南一北的对话。</p>
<p>我们选用65%的勐海熟普，就像它傣语美好寓意一样，勇敢者居住的地区，为这杯「归云南」提供醇厚感、滋味感；35%的冰岛熟普，来自茶王之乡临沧冰岛产区，如老寨山泉清甜温润，让整支茶的甜润感和协调性更好。找回茶与土地之间的路径，也是一种不慌不忙的从容。</p>
</section>
<section>
<h3>【难：被落日卡住的视觉】</h3>
<p>但浪漫往往是有代价的。为了还原生命最原始的张力，设计师带着色卡和草图，回到云南找颜色。站在勐海的山坡上，看着太阳西沉，大地染上一种温暖、厚重、带着赭石色调的红，这片被黄昏浸透的红土，我们意识到：这就是「归云南」的颜色。为了一段萦绕在山间的晨雾、一行来自千年前的、无声的古老笔迹，视觉定稿比预定晚了三周。</p>
</section>
<section>
<h3>【讲一个&ldquo;抢时间&rdquo;的故事】</h3>
<p>为了守护这份&ldquo;慢&rdquo;，我负责生产全链路的极限压缩，将供应周期从 6 周强行压缩2周：</p>
<p>① 首先，以&ldquo;统配收量&rdquo;为锚点，倒推设计稿打样、工厂备料、生产周期的时间线，将原本串联的流程改为并联，优先向门店统配数量，工厂同步备料、供应链下订单。</p>
<p>② 其次，消除信息冗余。 我牵头完成了物料明细、价格红线、对接信息、责任人的梳理。在收量前锁定包材成本范围，确保所有协作方拿到的是唯一事实，从根源上砍掉了 30% 的沟通内耗，也保证内部审批线一路绿灯，当天下合同，当天工厂开工。</p>
<p>③ 我带着设计师、QA老师飞到云南和研发老师汇合，直接在生产线上调整样稿，彻底消除异地寄样的时间成本。一边前置备料，一边核对采购价，实现了环环相扣的衔接。</p>
<p>最终，12月19日如期上线，茶汤初沸，一盏澄红映照着来路与归途。</p>
</section>`,
  },
  {
    id: 'supply',
    visualHint: 'feishu',
    placeholderLabel: '营销全案现场',
    title: '全案营销：让产品被看见。',
    metric: '单月累计 GMV 9000w+',
    subtitle: '统一卖点培训与区域触达，打通产品落地与品牌心智闭环。',
    subtitleTone: 'dark',
    metricTone: 'accent',
    mainImage: 'work/chagee-marketing-main.png',
    thumbImage: 'work/chagee-marketing-thumb.png',
    detailHtml: `
<section>
<p>围绕入仓与履约效率，我在飞书多维表格里搭建可协作的「单一事实源」看板：把关键节点、责任人与异常口径对齐到同一张表上，减少反复确认与信息断层。</p>
<p>通过流程并联与前置锁价，将供应周期从 <strong>6 周压缩到 2 周</strong>，入仓周期压缩约 <strong>66%</strong>，让一线与工厂在同一套数据上决策，把「快」变成可复制的机制，而不是一次性加班。</p>
</section>`,
  },
  {
    id: 'agent',
    visualHint: 'coze',
    placeholderLabel: 'Agent 工作流示意',
    title: 'Agent自动抓取茶饮资讯与茶学前沿研究',
    metric: 'MRD由月报改为日报',
    subtitle: '将感性调研转成数据洞察，不再依赖第三方咨询机构。',
    subtitleTone: 'dark',
    metricTone: 'accent',
    mainImage: 'work/chagee-agent-thumb.png',
    thumbImage: 'work/chagee-agent-main.png',
    detailHtml: `
<section>
<p>搭建基于 Coze 的竞品情报 Agent：把检索、摘要与结构化输出串成可对话的工作流，让团队用自然语言就能拉取对比维度与结论草稿。</p>
<p>累计沉淀 <strong>10+ 份</strong>可复用报告模板与数据源配置，减少重复劳动，把分析时间还给判断与策略。</p>
</section>`,
  },
];
