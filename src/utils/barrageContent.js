/** 客户端与展示层：过滤脏数据（与 api/message.js 规则对齐，防御性二次过滤） */

const MAX_LEN = 20;

export function countBarrageChars(text) {
  return Array.from(String(text || '')).length;
}

export function shouldDisplayBarrageContent(content) {
  const t = String(content ?? '').trim();
  if (!t) return false;
  if (/^verify-rls-/i.test(t)) return false;
  if (/^\d+$/.test(t)) return false;
  // 无可见语义字符（纯符号/空白）
  if (!/[\p{Script=Han}A-Za-z\p{Extended_Pictographic}]/u.test(t)) return false;
  return true;
}

export function filterBarrageRecordsForDisplay(records) {
  if (!Array.isArray(records)) return [];
  return records.filter((r) => r && shouldDisplayBarrageContent(r.content));
}

export function isBarrageInputOverLimit(text) {
  return countBarrageChars(text) > MAX_LEN;
}
