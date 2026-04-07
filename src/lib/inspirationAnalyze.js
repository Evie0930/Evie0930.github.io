/**
 * 将用户输入转为星星视觉参数。可接入后端 LLM：设置 VITE_INSIGHTS_API_URL 指向 POST JSON { text } → { brightness, speed, negativity, pulseFreq }。
 */
const NEG_HINTS = [
  '难过',
  '失败',
  '焦虑',
  '痛苦',
  '绝望',
  '糟糕',
  '不行',
  '放弃',
  '难',
  '累',
  '烦',
  '讨厌',
  '差',
  '输',
];

function mockNegativity(text) {
  const t = text || '';
  let score = 0;
  for (const w of NEG_HINTS) {
    if (t.includes(w)) score += 0.12;
  }
  return Math.min(1, score + (t.length > 80 ? 0.05 : 0));
}

export async function analyzeInspiration(text) {
  const trimmed = (text || '').trim();
  const api = import.meta.env.VITE_INSIGHTS_API_URL;
  if (api) {
    try {
      const res = await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: trimmed }),
      });
      if (res.ok) {
        const j = await res.json();
        const b = Number(j.brightness);
        const s = Number(j.speed);
        const n = Number(j.negativity);
        const pf = Number(j.pulseFreq);
        if (Number.isFinite(b) && Number.isFinite(s)) {
          return {
            brightness: Math.min(1, Math.max(0.12, b)),
            speed: Math.min(2.2, Math.max(0.08, s)),
            negativity: Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : mockNegativity(trimmed),
            pulseFreq: Number.isFinite(pf) ? Math.max(0.4, pf) : 0.8 + Math.random() * 1.6,
          };
        }
      }
    } catch {
      /* fallback */
    }
  }
  const len = Math.min(trimmed.length, 240);
  const negativity = mockNegativity(trimmed);
  const brightness = 0.22 + (len / 240) * 0.78;
  const speed = (0.45 + Math.random() * 0.55) * (1 - negativity * 0.55);
  const pulseFreq = 0.7 + (1 - negativity) * 2.2 + Math.random() * 0.6;
  return { brightness, speed, negativity, pulseFreq };
}
