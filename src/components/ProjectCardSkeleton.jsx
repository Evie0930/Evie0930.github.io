export function ProjectCardSkeleton() {
  return (
    <article
      className="flex h-[min(85vh,36rem)] w-[min(82vw,21rem)] shrink-0 snap-center snap-always flex-col overflow-hidden rounded-[24px] bg-[#f5f5f7] shadow-[0_6px_28px_rgba(0,0,0,0.07),0_2px_8px_rgba(0,0,0,0.04)] md:w-[22rem]"
      aria-hidden="true"
    >
      <div className="h-[60%] animate-pulse bg-[#eceef2]" />
      <div className="flex flex-1 flex-col justify-between px-5 pb-5 pt-4">
        <div className="space-y-3">
          <div className="h-6 w-3/5 animate-pulse rounded-md bg-[#e4e7ec]" />
          <div className="h-6 w-2/5 animate-pulse rounded-md bg-[#e1e4ea]" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded-md bg-[#e8ebef]" />
          <div className="h-4 w-4/5 animate-pulse rounded-md bg-[#e8ebef]" />
        </div>
      </div>
    </article>
  );
}
