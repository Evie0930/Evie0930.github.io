import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const qrSrc = `${import.meta.env.BASE_URL}wechat-qr.jpg`;

export function ContactModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      document.getElementById('contact-modal-close-btn')?.focus();
    }, 10);
    return () => window.clearTimeout(t);
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="contact-modal"
          className="fixed inset-0 z-[210] flex items-center justify-center p-5"
          role="dialog"
          aria-modal="true"
          aria-hidden="false"
          aria-labelledby="contact-modal-heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 z-0 h-full w-full cursor-default border-0 bg-black/35 backdrop-blur-md"
            aria-label="关闭"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="relative z-10 w-full max-w-[320px] rounded-3xl border border-white/40 bg-white/55 p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.16)] backdrop-blur-2xl backdrop-saturate-150 md:p-9 supports-[backdrop-filter]:bg-white/45"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <button
              type="button"
              id="contact-modal-close-btn"
              className="absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full text-xl leading-none text-[#86868b] transition-all duration-300 hover:bg-black/[0.05]"
              aria-label="关闭"
              onClick={onClose}
            >
              ×
            </button>
            <h2 id="contact-modal-heading" className="sr-only">
              微信联系
            </h2>
            <img
              src={qrSrc}
              alt="微信二维码"
              width={280}
              height={380}
              className="mx-auto h-auto w-full max-w-[240px] rounded-xl border border-[rgba(0,0,0,0.06)] transition-all duration-300"
            />
            <p className="mt-5 text-[0.8125rem] leading-[1.47059] text-[#6e6e73] transition-all duration-300 md:text-sm">
              扫一扫添加我的微信二维码
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
