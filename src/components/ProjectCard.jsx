export function ProjectCard({ title, metric, subtitle, imageUrl, onClick }) {
  return (
    <article
      className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
      onClick={onClick}
    >
      {imageUrl ? <img src={imageUrl} alt="" className="mb-4 h-44 w-full rounded-xl object-cover" /> : null}
      <h3 className="text-lg font-semibold text-[#1d1d1f]">{title}</h3>
      {metric ? <p className="mt-2 text-xl font-semibold text-[#d4380d]">{metric}</p> : null}
      {subtitle ? <p className="mt-2 text-sm leading-relaxed text-[#6e6e73]">{subtitle}</p> : null}
    </article>
  );
}
