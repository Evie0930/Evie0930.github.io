export function SiteFooter({ onOpenContact, views, viewsError = false }) {
  return (
    <footer className="border-t border-[rgba(0,0,0,0.06)] bg-[#fbfbfd] px-5 py-8 transition-all duration-300 md:px-8 md:py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 md:gap-6">
        <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <p className="text-[0.6875rem] font-normal text-[#86868b] transition-all duration-300 md:text-xs">
            © 2026 赵欣宇. All rights reserved.
          </p>
          <p className="text-[0.75rem] font-normal tracking-[0.01em] text-[#86868b] md:text-[0.8125rem]">
            {typeof views === 'number' ? (
              <>
                这个页面已经被目光停留过{' '}
                <span className="font-medium text-[#6e6e73]">{views.toLocaleString()}</span> 次
              </>
            ) : viewsError ? (
              '访问统计暂时不可用。'
            ) : (
              '正在同步访问统计...'
            )}
          </p>
        </div>
        <div className="flex items-center gap-4 transition-all duration-300 md:gap-5">
          <a
            href="mailto:15368170930@163.com"
            className="text-[#424245] transition-all duration-300 hover:text-[#0071e3]"
            aria-label="邮箱"
          >
            <svg
              className="h-[1.125rem] w-[1.125rem] md:h-5 md:w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>
          <a
            href="tel:15368170930"
            className="text-[#424245] transition-all duration-300 hover:text-[#0071e3]"
            aria-label="电话"
          >
            <svg
              className="h-[1.125rem] w-[1.125rem] md:h-5 md:w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
          </a>
          <button
            type="button"
            className="rounded-full p-1 text-[#424245] transition-all duration-300 hover:bg-black/[0.04] hover:text-[#0071e3]"
            aria-label="微信二维码"
            onClick={onOpenContact}
          >
            <svg
              className="h-[1.125rem] w-[1.125rem] md:h-5 md:w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8.5 9.5a1 1 0 100-2 1 1 0 000 2zm5 0a1 1 0 100-2 1 1 0 000 2zm4.5 3.5c0 3.31-3.58 6-8 6-.78 0-1.54-.07-2.26-.2L6 21l1.39-3.12C5.67 16.5 5 14.57 5 12.5 5 9.19 8.58 6.5 13 6.5s8 2.69 8 6z" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
