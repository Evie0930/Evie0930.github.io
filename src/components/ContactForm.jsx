import { useState } from 'react';
import { postMessage } from '../api/message.js';

export function ContactForm() {
  const [form, setForm] = useState({ name: '', contact: '', content: '' });
  const [status, setStatus] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('提交中...');
    try {
      await postMessage(form);
      setStatus('灵感已送达');
      setForm({ name: '', contact: '', content: '' });
    } catch {
      setStatus('提交失败，请稍后重试');
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-3xl border border-black/5 bg-white p-6">
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="姓名"
        className="w-full rounded-xl border border-black/10 px-3 py-2"
        required
      />
      <input
        value={form.contact}
        onChange={(e) => setForm({ ...form, contact: e.target.value })}
        placeholder="邮箱 / 微信 / 手机"
        className="w-full rounded-xl border border-black/10 px-3 py-2"
        required
      />
      <textarea
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        placeholder="留言内容（500字内）"
        maxLength={500}
        className="h-32 w-full rounded-xl border border-black/10 px-3 py-2"
      />
      <button type="submit" className="rounded-xl bg-[#0071e3] px-4 py-2 text-white">
        提交
      </button>
      {status ? <p className="text-sm text-[#6e6e73]">{status}</p> : null}
    </form>
  );
}
