export function NavHero({ onOpenSearch, onOpenContact, searchOpen }) {
  return (
    <>
      <div id="cursor-trail" className="pointer-events-none fixed inset-0 z-[100] overflow-hidden" aria-hidden="true" />

      <nav
        className="global-nav fixed inset-x-0 top-0 z-[120] border-b border-[rgba(0,0,0,0.08)] bg-[#fbfbfd]/76 backdrop-blur-xl transition-all duration-300 supports-[backdrop-filter]:bg-[#fbfbfd]/64"
        aria-label="页面导航"
      >
        <div className="global-nav-inner mx-auto flex h-11 max-w-[1024px] items-center gap-2 px-4 md:h-12 md:gap-4 md:px-6 xl:max-w-[1200px]">
          <a
            href="#sec-insights"
            className="shrink-0 py-2 text-[0.78rem] font-medium tracking-tight text-[#1d1d1f] transition-opacity duration-300 hover:opacity-65 md:text-xs"
          >
            赵欣宇
          </a>
          <div className="nav-menu-scroll scrollbar-hide flex min-w-0 flex-1 items-center justify-start gap-4 overflow-x-auto px-1 md:justify-center md:gap-5 lg:gap-6">
            <a href="#sec-insights" className="nav-link whitespace-nowrap py-2 transition-all duration-300">
              灵感洞察
            </a>
            <a href="#sec-brand" className="nav-link whitespace-nowrap py-2 transition-all duration-300">
              个人品牌
            </a>
            <a href="#sec-projects" className="nav-link whitespace-nowrap py-2 transition-all duration-300">
              项目经历
            </a>
            <a href="#sec-intern" className="nav-link whitespace-nowrap py-2 transition-all duration-300">
              实习经历
            </a>
            <a href="#sec-explore" className="nav-link whitespace-nowrap py-2 transition-all duration-300">
              探索世界
            </a>
            <a href="#sec-entertain" className="nav-link whitespace-nowrap py-2 transition-all duration-300">
              娱乐
            </a>
          </div>
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
      </nav>

      <header
        id="hero"
        className="relative flex min-h-screen flex-col items-stretch overflow-hidden pt-11 md:pt-12 lg:flex-row"
      >
        <div
          id="sec-insights"
          className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-stretch transition-all duration-300 xl:max-w-[1280px] lg:flex-row"
          data-search-title="灵感洞察"
          data-search-keywords="赵欣宇 审美 商业 sense 品牌 市场 产品经理 大数据 商务分析"
          data-search-text="赵欣宇 中国传媒大学 字节跳动 霸王茶姬 猫眼 LVMH 产品经理 审美 商业 sense"
        >
          <div className="flex min-w-0 flex-1 flex-col justify-center px-5 py-14 sm:px-8 md:px-10 md:py-16 lg:py-24 lg:pl-14 lg:pr-6 xl:pl-20">
            <h1 className="text-[2.65rem] text-[#1d1d1f] transition-all duration-300 sm:text-[3.1rem] md:text-[3.75rem] lg:text-[4.25rem] xl:text-[5rem]">
              赵欣宇
            </h1>
            <div className="mt-6 flex flex-wrap gap-2 transition-all duration-300 md:mt-8 md:gap-2.5">
              <span className="rounded-full border border-[rgba(0,0,0,0.08)] bg-white/80 px-3 py-1 text-[0.75rem] text-[#424245] backdrop-blur-sm transition-all duration-300 md:px-3.5 md:py-1.5 md:text-[0.8125rem]">
                大数据与商务分析
              </span>
              <span className="rounded-full border border-[rgba(0,0,0,0.08)] bg-white/80 px-3 py-1 text-[0.75rem] text-[#424245] backdrop-blur-sm transition-all duration-300 md:px-3.5 md:py-1.5 md:text-[0.8125rem]">
                品牌
              </span>
              <span className="rounded-full border border-[rgba(0,0,0,0.08)] bg-white/80 px-3 py-1 text-[0.75rem] text-[#424245] backdrop-blur-sm transition-all duration-300 md:px-3.5 md:py-1.5 md:text-[0.8125rem]">
                市场
              </span>
              <span className="rounded-full border border-[rgba(0,0,0,0.08)] bg-white/80 px-3 py-1 text-[0.75rem] text-[#424245] backdrop-blur-sm transition-all duration-300 md:px-3.5 md:py-1.5 md:text-[0.8125rem]">
                产品经理
              </span>
            </div>
            <p
              id="hero-bio"
              className="type-prose mt-6 max-w-xl text-[0.9375rem] transition-all duration-300 md:mt-8 md:text-[1rem]"
            >
              中国传媒大学硕士在读，专业前 5%；曾在字节跳动、霸王茶姬、猫眼文娱与 LVMH 等积累产品 / 营销实习经验，擅长 0–1 推进、数据化运营与跨部门协同。
            </p>
          </div>
          <div className="flex max-w-xl flex-1 flex-col justify-center px-5 pb-14 pt-0 sm:px-8 md:px-10 lg:max-w-md lg:pb-24 lg:pl-4 lg:pr-16 lg:pt-24 xl:max-w-lg xl:pr-24">
            <p className="text-[1.2rem] font-semibold leading-[1.25] tracking-[-0.015em] text-[#1d1d1f] transition-all duration-300 sm:text-[1.35rem] lg:text-[1.35rem] xl:text-[1.75rem]">
              一点审美，和一点商业 sense。
            </p>
            <button
              type="button"
              className="mt-4 text-left text-[0.9375rem] font-normal text-[#0071e3] transition-all duration-300 hover:opacity-80 md:mt-5 md:text-base"
              onClick={onOpenContact}
            >
              点击联系我
            </button>
          </div>
        </div>
        <div className="relative min-h-[34vh] flex-1 pointer-events-none lg:absolute lg:inset-y-0 lg:right-0 lg:flex-none lg:min-h-0 lg:w-[42%] xl:w-[44%]">
          <div
            id="hero-parallax"
            className="hero-parallax-layer absolute inset-[-18%] bg-gradient-to-br from-[#d4e4f7] via-[#e8ecf2] to-[#ebe4f2] opacity-[0.9] transition-transform duration-300 ease-out"
            style={{ willChange: 'transform' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fbfbfd] via-transparent to-transparent transition-opacity duration-300 lg:bg-gradient-to-l" />
        </div>
      </header>
    </>
  );
}
