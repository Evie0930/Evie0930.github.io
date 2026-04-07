import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const base = import.meta.env.BASE_URL;

export function ExploreFootprintsPage() {
  const hostRef = useRef(null);
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [hover, setHover] = useState(null);

  const hideTip = useCallback(() => setHover(null), []);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return undefined;

    let disposed = false;
    let chart;
    let resizeHandler;

    (async () => {
      try {
        const echarts = (await import('echarts')).default;
        await import('echarts-gl');

        const [geoRes, metaRes] = await Promise.all([
          fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'),
          fetch(`${base}explore/footprints/travelData.json`),
        ]);

        if (!geoRes.ok) throw new Error('地图数据加载失败');
        if (!metaRes.ok) throw new Error('旅行配置加载失败');

        const geoJson = await geoRes.json();
        const travel = await metaRes.json();
        if (disposed) return;

        echarts.registerMap('china', geoJson);
        const exclude = new Set(travel.excludeNames || []);
        const entries = travel.entries || {};
        const defaultPhoto = travel.defaultPhoto || '';

        const litColor = '#9cc8f0';
        const dimColor = '#2e323c';

        const data = geoJson.features
          .filter((f) => f.properties?.name)
          .map((f) => {
            const name = f.properties.name;
            const lit = !exclude.has(name);
            return {
              name,
              value: lit ? 1 : 0,
              itemStyle: {
                color: lit ? litColor : dimColor,
                opacity: 1,
              },
            };
          });

        chart = echarts.init(el, null, { renderer: 'webgl' });
        chartRef.current = chart;

        chart.setOption({
          backgroundColor: 'transparent',
          tooltip: { show: false },
          series: [
            {
              type: 'map3D',
              map: 'china',
              roam: true,
              shading: 'lambert',
              light: {
                main: { intensity: 1.05, shadow: true },
                ambient: { intensity: 0.42 },
              },
              viewControl: {
                distance: 92,
                minDistance: 42,
                maxDistance: 220,
                alpha: 38,
                beta: 8,
                minAlpha: 5,
                maxAlpha: 90,
                rotateSensitivity: 0.65,
                zoomSensitivity: 0.55,
                panSensitivity: 0,
                autoRotate: false,
              },
              itemStyle: {
                borderColor: '#1a1f2e',
                borderWidth: 0.5,
              },
              emphasis: {
                itemStyle: {
                  color: '#c5e0ff',
                },
                label: {
                  show: true,
                  textStyle: { color: '#fff', fontSize: 11 },
                },
              },
              data,
            },
          ],
        });

        if (disposed) {
          chart.dispose();
          return;
        }

        const onOver = (params) => {
          const name = params.name;
          if (!name || exclude.has(name)) {
            setHover(null);
            return;
          }
          const ev = params.event?.event;
          const entry = entries[name] || {};
          const photo = entry.photo || defaultPhoto;
          const quote = entry.quote && entry.quote.trim() ? entry.quote : '（一句话待补充）';
          setHover({
            name,
            photo,
            quote,
            x: ev ? ev.clientX : 0,
            y: ev ? ev.clientY : 0,
          });
        };

        const onMove = (params) => {
          if (!params.name || exclude.has(params.name)) return;
          const ev = params.event?.event;
          if (!ev) return;
          setHover((h) =>
            h
              ? {
                  ...h,
                  x: ev.clientX,
                  y: ev.clientY,
                }
              : h,
          );
        };

        chart.on('mouseover', onOver);
        chart.on('mousemove', onMove);
        chart.on('globalout', hideTip);

        resizeHandler = () => chart?.resize();
        window.addEventListener('resize', resizeHandler);
        setLoading(false);
      } catch (e) {
        if (!disposed) {
          setErr(e?.message || '加载失败');
          setLoading(false);
        }
      }
    })();

    return () => {
      disposed = true;
      if (resizeHandler) window.removeEventListener('resize', resizeHandler);
      if (chartRef.current) {
        chartRef.current.dispose();
        chartRef.current = null;
      }
    };
  }, [hideTip]);

  return (
    <div className="relative min-h-screen bg-[#0b0d12] pb-16 pt-14 text-[#f5f5f7] md:pt-16">
      <header className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-4 py-3 md:px-8">
        <Link
          to="/explore"
          className="text-[0.9375rem] font-medium text-[#7ecbff] transition-opacity hover:opacity-80"
        >
          ‹ 返回探索
        </Link>
        <span className="text-[0.75rem] text-white/35">拖拽旋转 · 滚轮缩放</span>
      </header>

      <div className="relative mt-10 h-[min(78vh,640px)] w-full md:mt-12">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-white/45">
            加载 3D 地图…
          </div>
        ) : null}
        {err ? (
          <div className="flex h-full items-center justify-center px-6 text-center text-sm text-red-300/90">
            {err}
          </div>
        ) : null}
        <div ref={hostRef} className="h-full w-full" style={{ opacity: loading || err ? 0 : 1 }} />
      </div>

      {hover ? (
        <div
          className="pointer-events-none fixed z-[200] w-[min(92vw,18rem)] -translate-x-1/2 -translate-y-full rounded-2xl border border-white/12 bg-black/70 p-3 shadow-2xl backdrop-blur-xl"
          style={{
            left: hover.x,
            top: hover.y - 12,
          }}
        >
          <div className="overflow-hidden rounded-xl bg-black/30">
            <img
              src={hover.photo}
              alt=""
              className="h-[5.5rem] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="mt-2 text-[0.9375rem] font-semibold text-white">{hover.name}</p>
          <p className="mt-1 text-[0.8125rem] leading-relaxed text-white/75">{hover.quote}</p>
        </div>
      ) : null}
    </div>
  );
}
