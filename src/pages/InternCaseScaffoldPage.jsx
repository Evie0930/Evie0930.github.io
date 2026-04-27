import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { INTERN_BRANDS } from '../data/internBrands.js';

const assetBase = import.meta.env.BASE_URL;

const PAGE_CONTENT = {
  bytedance: {
    headline: '从互联网到快消，用数据逻辑讲好品牌叙事。',
    accent: '#3370FF',
    cards: [
      {
        id: 'overview',
        title: 'Payroll PM',
        metric: '2024.12-2025.05',
        description:
          '围绕用户续约率与用户满意度，进行功能迭代与宣讲支持，以产品体验为核心构筑客户的长期留存价值。',
        image: `${assetBase}work/bytedance-payroll-cover.png`,
      },
      {
        id: 'risk-insight',
        title: '针对行业特性进行需求分析，沉淀产品通用能力',
        metric: '沉淀 10 + 行业薪酬业务方案，防范客户流失风险',
        description:
          '联动实施团队跟进客户场景，吃透不同行业算薪 / 算税逻辑，将零散反馈归纳为产品发展方向的有效建议。',
        image: `${assetBase}work/bytedance-card2-main.png`,
        detailSections: [
          {
            heading: '',
            paragraphs: [
              '【业务背景】',
              '作为产品运营实习生，我每天需要面对 CRM 系统中涌入的实施需求工单，以及飞书群聊里海量的客户反馈。由于实施侧直接对接大客户，任何关于“功能不会用”或“现有能力做不到”的反馈如果处理不及时，都会直接转化为客户的流失风险。',
              '【核心目标】',
              '打破实施与研发、产品之间的信息差，将需求识别前置化。通过深度介入业务场景，将零散反馈沉淀为产品通用能力，提升大客户续约信心。',
              '【行动】',
              '1. 通过自研 CRM 系统抓取工单，并深入飞书群聊通过关键词捞取模块需求。将需求精准划分为三类：客户认知缺失类（标记后同步给运营侧培训实施）、存量功能优化类（直接挂载至项目管理平台追踪）、以及新场景诉求类。',
              '2. 针对新需求，我不只做文字记录，而是主动拉实施拉会，通过还原大客户的具体业务场景，搞清楚是底层“算薪逻辑”不通还是前端交互阻碍，从而给出有效的排期建议。',
              '3. 高危客户风险干预： 在整理中，我特意建立了“未跟进标记”机制。发现实施侧对某些大客户需求响应迟缓时，我会重点拉会对齐解决方案，确保每一个可能导致流失的隐患都有闭环处理。',
              '【复盘沉淀】',
              '我深刻意识到，产品运营必须具备“翻译官”能力。只有在吃透不同行业的薪酬业务逻辑、防范流失风险的基础上，才能将零散反馈归类为有价值的产品迭代方案。',
            ],
          },
        ],
      },
      {
        id: 'sop-efficiency',
        title: '优化灰度功能推全SOP',
        metric: '实现开灰准确率100%，交付确定性显著提升业务价值',
        description:
          '把实习生 “人肉支持” 的零散服务经验，转化为公司可复用的流程资产，大幅降低服务边际成本。',
        image: `${assetBase}work/bytedance-card3-main.png`,
        detailSections: [
          {
            heading: '',
            paragraphs: [
              '【业务背景】',
              '在一次紧急任务中，由于客户无法按时提交申报面临逾期罚款，急需开通灰度功能。由于我刚接触自动报税模块，且带教老师也是中途接手，在不熟悉后台配置逻辑的情况下，我盲目按流程操作导致二次故障，最终只能由带教老师在繁忙中抽身救火，增加了团队内耗。',
              '【核心目标】',
              '将“人肉支持”的零散经验转化为可复用的流程资产，通过建立标准化的故障排查路径，大幅降低服务边际成本，保障业务的确定性。',
              '【行动】',
              '1. 我复盘了带教的操作细节，学会了通过后台接口日志和规则配置数据进行多维锁定。最终定位出报错根源并非灰度未开，而是客户未打通“税局 API”与“薪福通”权限，属于外部环境问题。',
              '2. 我优化了《灰度上线 SOP》，强制增加了前置校验环节，并输出了一份《外部接口核查清单》。这让实施人员在报障前可以快速自查分流，将误判率显著降低。',
              '3. 面对实施催促与研发忙碌的矛盾，我改变了以往私聊沟通的模式，通过建立可视化看板与bot提醒来同步进度。在遇到 Bug 阻塞时及时同步团队调拨人手，既安抚了各方情绪，也保证了算薪率的稳定。',
              '【复盘沉淀】',
              '这次经历让我学到，实习生不应只是“螺丝钉”，而应主动通过 SOP 优化来解决各方痛点。最终实现实施重复咨询减少约 40%，问题定位时效得到了量级提升。',
            ],
          },
        ],
      },
      {
        id: 'ai-enablement',
        title: '搭建基于 RAG 的 AI 智能问答 Agent',
        metric: '高频问题自助解决率提升至80%，沉淀数万字业务语料',
        description:
          '验证 AI 替代人工答疑重复问题的可行性，构建可持续迭代的数智化服务资产，大幅减轻工单压力。',
        image: `${assetBase}work/bytedance-card4-main.png`,
        detailSections: [
          {
            heading: '',
            paragraphs: [
              '【业务背景】',
              '实习生长期需要处理高频、重复问题答疑。过去半年，飞书群和工单里充斥着大量如“飞书 Payroll 算薪规则如何配置”、“成本分摊报表如何导出”以及“算薪率低的原因排查”等咨询。这些答案虽然散落在 SOP 手册中，但查询成本极高。',
              '【核心目标】',
              '利用大模型工具搭建一个直接嵌入飞书的轻量化 Agent。通过 RAG 技术，将内部高频问题转化为自助式问答，释放人力带宽。',
              '【行动策略】',
              '1. 我拉取了过去半年的工单和日志，将知识提炼为：产品功能配置类、内部审批流程类、客户异常处理类。确保每个问题都能对应到最新的官方文档或历史成熟方案。',
              '2. 无需自行训练模型，我直接接入豆包 API，结合向量检索技术，将结构化语料喂给模型。系统在飞书对话框内直接运行，能根据员工提问，实时检索并生成通顺、精准的阶梯式回答。',
              '3. 将 Agent 直接做在飞书工作流中，员工无需跳出系统去查阅繁琐的手册，极大地优化了内部办公一站式体验。',
              '【复盘沉淀】',
              '这个原型上线后，约 80% 的基础操作类问题实现了自助化解决。它验证了利用 AI 替代人工答疑的可行性，通过构建可持续迭代的数字化服务资产，大幅度减轻了人工单压力。',
            ],
          },
        ],
      },
    ],
  },
  lvmh: {
    headline: '从互联网到快消，用数据逻辑讲好品牌叙事。',
    accent: '#2f2f35',
    cards: [
      {
        id: 'overview',
        title: '产品营销',
        metric: '2024.04-2024.09',
        description: '负责香氛线的季度行业研究、竞品追踪及全渠道销售复盘。',
        image: `${assetBase}intern/logos/lvmh.png`,
      },
      {
        id: 'industry-insight',
        title: '行业趋势分析与消费者洞察',
        metric: '调研 12 城刻画 4 类高净值客群，锁定东方美学差异化叙事',
        description: '输出行业白皮书，对比分析主流竞品动态，精准识别高端香氛市场的空白点与机会',
        image: `${assetBase}work/lvmh-card2-main.png`,
        detailSections: [
          {
            heading: '全球及中国香氛市场整体增长态势如何？',
            paragraphs: [
              '中国量级在高速增加、且高潜力——渗透率低、教育成本高、但是成长空间大。',
              '香氛是疫情后唯一保持双位数增长的美妆品类，2024年全球增速达11%，远超护肤、彩妆(均不足5%)。从市场份额来看，中国仅占5%。尽管中国市场规模尚小，但增速亮眼。2025年中国高端香氛零售规模预计达207亿元，是极具潜力的增长赛道。',
            ],
          },
          {
            heading: '香氛品类的延伸趋势的是什么?',
            paragraphs: [
              '生活方式：衣食住行每个阶段都会用到的”仪式感““情绪价值”。',
              '香氛已渗透生活方方面面，不再局限于传统香水。家居香氛(香薰蜡烛、香氛机、扩香棒、喷雾)洗护香氛(香氛沐浴露、身体乳、洗发水)、车载香氛的消费占比显著提升，香氛已升级为一种全方位的生活方式。',
            ],
          },
          {
            heading: '香氛的使用场景发生了哪些变化?香氛市场的细分领域及消费者认知是怎样的?',
            paragraphs: [
              '过往使用香氛多为社交需求，或为感受文化底蕴彰显身份品位。如今，“取悦自我”成为核心需求，香氛不再是解决问题的品类，而是营造美好想象、提供情绪价值的载体，需要通过情感共鸣打动消费者。',
            ],
          },
          {
            heading: '在中国市场，香氛品类目前存在哪些待解决的需求或挑战?',
            paragraphs: [
              '体验层面：需要兼具探索感与品牌特色的零售空间，同时解决线上试香难的痛点;',
              '叙事层面：如何用视觉和语言讲好能打动中国消费者的品牌故事与气味描述',
              '产品层面：在气味、产品形式等方面需要更具创意的突破，满足消费者对“惊喜感“和“探索欲“的期待。',
            ],
          },
          {
            heading: '创新机会点？',
            paragraphs: [
              '通过对竞品分析可得，在文化内涵上均未深度绑定「东方文化」，而LVMH「墨韵」「茶瀑」的书法、茶道灵感是核心差异点，将这一洞察写入内部白皮书，最终白皮书里的「聚焦东方文化、主打高净值文化客群」的建议，被团队采纳，直接指导了后续七门门店书法活动的策划。',
            ],
          },
        ],
      },
      {
        id: 'offline-ip',
        title: '线下IP活动整合营销',
        metric: '单门店销量 +200%，私域绑定 90%，复购率 +30%',
        description: '全流程参与“墨香雅韵”书法活动从物料筹备、活动流程把控至后期销售复盘，保障品牌极致调性',
        image: `${assetBase}work/lvmh-card4-main.png`,
        thumbImage: `${assetBase}work/lvmh-card4-thumb.png`,
        detailSections: [
          {
            heading: '线下IP活动 整合营销',
            paragraphs: [
              '操盘七城书法品鉴会，定向邀约VVIP，全流程执行。',
              '单门店销量+200%，用户私域绑定率90%，复购率+30%。',
            ],
          },
        ],
      },
      {
        id: 'hit-product',
        title: '菲董新品 LOVERS 全案营销',
        metric: '话题 8000W+，销量超目标 150%，年度 TOP3',
        description: '统筹明星视觉引爆、KOL 深度内容种草与 KOC 场景化铺量，实现公域声量爆发',
        image: `${assetBase}work/lvmh-card5-main.png`,
        thumbImage: `${assetBase}work/lvmh-card5-thumb.png`,
        detailSections: [
          {
            heading: '爆款新品 全周期营销',
            paragraphs: [
              '负责菲董联名新品，搭建金字塔KOL策略，全链路闭环。',
              '话题8000W+，销量超目标150%，私域预售占比35%，年度TOP3。',
            ],
          },
        ],
      },
    ],
  },
  maoyan: {
    headline: '从互联网到快消，用数据逻辑讲好品牌叙事。',
    cards: [
      {
        id: 'overview',
        title: '商业分析实习生',
        metric: '时间段待补充',
        description: '核心职责待补充：请在此填写你在猫眼的业务分析相关工作内容。',
      },
      {
        id: 'project-a',
        title: '业务专题A（占位）',
        metric: '关键结果待补充',
        description: '分析框架与核心结论待补充。',
      },
      {
        id: 'project-b',
        title: '业务专题B（占位）',
        metric: '关键结果待补充',
        description: '策略建议与落地动作待补充。',
      },
      {
        id: 'project-c',
        title: '业务专题C（占位）',
        metric: '关键结果待补充',
        description: '复盘指标与后续计划待补充。',
      },
    ],
  },
};

function DetailModal({ detail, onClose }) {
  useEffect(() => {
    if (!detail) return undefined;
    const onKeydown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [detail, onClose]);

  if (!detail) return null;

  return (
    <div className="fixed inset-0 z-[220] overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="placeholder-detail-title">
      <button type="button" className="absolute inset-0 bg-black/42 backdrop-blur-[4px]" aria-label="关闭弹窗" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto my-8 w-[min(94vw,980px)] rounded-[20px] border border-black/10 bg-[#fbfbf8]/96 shadow-[0_22px_64px_rgba(0,0,0,0.28)]"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10 bg-[#fbfbf8]/95 px-6 py-3 backdrop-blur-md">
          <h3 id="placeholder-detail-title" className="text-xl font-bold text-[#1f1b19]">
            {detail.title}
          </h3>
          <button
            type="button"
            className="rounded-full px-2 py-1 text-2xl text-[#8a8581] transition-colors hover:bg-black/5"
            onClick={onClose}
            aria-label="关闭"
          >
            ×
          </button>
        </div>
        <div className="max-h-[min(80vh,44rem)] space-y-6 overflow-y-auto px-6 py-5 pr-4 text-[13px] leading-6 text-[#1f1b19]">
          {(detail.detailSections || []).length ? (
            detail.detailSections.map((section) => (
              <section
                key={section.heading}
                className="space-y-4 rounded-2xl border border-black/[0.06] bg-white/55 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]"
              >
                {section.heading ? <h4 className="text-base font-bold text-[#1f1b19]">{section.heading}</h4> : null}
                {section.paragraphs.map((paragraph, index) => (
                  <p key={`${section.heading}-${index}`}>{paragraph}</p>
                ))}
              </section>
            ))
          ) : (
            <>
              <p>【项目背景】待补充</p>
              <p>【策略与执行】待补充</p>
              <p>【项目结果】待补充</p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function CardShell({ children }) {
  return (
    <article className="group flex w-[min(84vw,22rem)] shrink-0 snap-center flex-col overflow-hidden rounded-[20px] border border-black/5 bg-white shadow-[0_8px_24px_rgba(32,24,24,0.08)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_18px_34px_rgba(32,24,24,0.14)] md:w-[21rem]">
      {children}
    </article>
  );
}

export function InternCaseScaffoldPage({ brandId }) {
  const reduce = useReducedMotion();
  const [activeDetail, setActiveDetail] = useState(null);
  const brand = INTERN_BRANDS.find((item) => item.id === brandId);
  const content = PAGE_CONTENT[brandId];
  const accent = content?.accent || '#C8102E';

  if (!brand || !content) return null;

  return (
    <motion.main
      className="min-h-screen bg-[#F5F5F0] pb-14 pt-[4.5rem] text-[#1f1b19] antialiased"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <header className="fixed inset-x-0 top-0 z-[130] border-b border-black/[0.06] bg-[#F5F5F0]/92 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 md:h-[3.75rem] md:px-8">
          <Link to={{ pathname: '/', hash: 'internship-section' }} className="flex items-center gap-0.5 text-[0.9375rem] font-medium text-[#0869cc]">
            <span className="text-[1.125rem] leading-none" aria-hidden="true">
              ‹
            </span>
            返回
          </Link>
          <div className="ml-1 flex min-w-0 flex-1 items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-[0_1px_6px_rgba(0,0,0,0.1)]">
              <img src={brand.logo} alt="" className="h-[72%] w-[72%] object-contain" />
            </div>
            <span className="truncate text-[0.875rem] font-semibold tracking-tight md:text-[0.95rem]">{brand.name}</span>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pt-4 md:px-8">
        <h1 className="text-center text-2xl font-bold tracking-tight text-[#1f1b19] md:text-3xl">
          实习经历
          <span className="ml-2 text-xl font-medium text-[#6d6662] md:text-2xl">{content.headline}</span>
        </h1>

        <div data-lenis-prevent className="mt-7 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {content.cards.map((card, index) => (
            <CardShell key={card.id}>
              {index === 0 ? (
                <>
                  <div className="aspect-square overflow-hidden bg-gradient-to-b from-[#f6f9ff] to-white p-6">
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white">
                      {card.image ? (
                        <img src={card.image} alt={`${brand.name}主视觉`} className="h-[86%] w-[86%] object-contain object-center" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-2xl border border-dashed border-[#d8d2cd] bg-white text-sm text-[#8d8681]">
                          图片占位
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-3 px-5 pb-6 pt-5">
                    <h2 className="min-h-[3.5rem] text-xl font-bold">{card.title}</h2>
                    <p className="text-base font-semibold" style={{ color: accent }}>
                      {card.metric}
                    </p>
                    <p className="min-h-[4.5rem] text-sm leading-6 text-[#554f4b]">{card.description}</p>
                  </div>
                </>
              ) : (
                <button type="button" className="text-left" onClick={() => setActiveDetail(card)} aria-label={`查看${card.title}详情`}>
                  <div className="relative aspect-square overflow-hidden bg-[#f6f9ff] p-3">
                    {card.image ? (
                      <>
                        <img
                          src={card.image}
                          alt={card.title}
                          className={`h-full w-full rounded-2xl object-center ${
                            card.id === 'industry-insight' ? 'bg-white p-2 object-contain' : 'object-cover'
                          }`}
                        />
                        {card.thumbImage ? (
                          <img
                            src={card.thumbImage}
                            alt=""
                            className="absolute bottom-5 right-5 h-[5.25rem] w-[5.25rem] rounded-xl border border-white/80 object-cover object-center shadow-md"
                          />
                        ) : null}
                      </>
                    ) : (
                      <>
                        <div className="flex h-full w-full items-center justify-center rounded-2xl border border-dashed border-[#c9d7ff] bg-white text-sm text-[#7e8db2]">
                          {brandId === 'bytedance' ? '飞书蓝主题占位图' : '图片占位'}
                        </div>
                        <div className="absolute bottom-5 right-5 h-[5.25rem] w-[5.25rem] rounded-xl border border-[#c9d7ff] bg-white/90" />
                      </>
                    )}
                  </div>
                  <div className="space-y-3 px-5 pb-6 pt-5">
                    <h2 className="min-h-[3.5rem] text-xl font-bold">{card.title}</h2>
                    <p className="text-base font-semibold" style={{ color: accent }}>
                      {card.metric}
                    </p>
                    <p className="min-h-[4.5rem] text-sm leading-6 text-[#554f4b]">{card.description}</p>
                  </div>
                </button>
              )}
            </CardShell>
          ))}
        </div>
      </section>
      <DetailModal detail={activeDetail} onClose={() => setActiveDetail(null)} />
    </motion.main>
  );
}
