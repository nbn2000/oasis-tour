import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_FORM_TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_FORM_TELEGRAM_CHAT_ID!;

const ContactModal = ({ open, onClose }) => {
  const { t } = useTranslation('common');
  const modalRef = useRef<HTMLDivElement>(null);

  // Form state
  const [fields, setFields] = useState({ name: '', phone: '', message: '' });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Reset state on open
  useEffect(() => {
    if (open) {
      setFields({ name: '', phone: '', message: '' });
      setErrors({});
      setLoading(false);
      setSubmitted(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [open, onClose]);

  const handleBackdrop = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate
    const errs: { [k: string]: string } = {};
    if (!fields.name.trim()) errs.name = t('contact_required');
    if (!fields.phone.trim()) errs.phone = t('contact_required');
    if (!fields.message.trim()) errs.message = t('contact_required');
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setLoading(true);

      const text = `
📩 *Yangi xabar!*
👤 Ism: ${fields.name}
📞 Telefon: ${fields.phone}
💬 Xabar: ${fields.message}
      `;

      try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text,
            parse_mode: 'Markdown',
          }),
        });

        if (!response.ok) throw new Error('Telegram API error');

        setSubmitted(true);
      } catch (err) {
        console.error(err);
        alert(t('contact_error') || 'Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (!open) return null;

  return (
    <Fragment>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        onMouseDown={handleBackdrop}
      >
        <div
          ref={modalRef}
          className="relative mx-2 w-full max-w-lg rounded-3xl bg-white px-6 py-10 shadow-great"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            aria-label={t('contact_close')}
            className="absolute right-4 top-4 text-2xl text-gray-400 hover:text-accent-2"
          >
            &times;
          </button>

          {!submitted && (
            <>
              <h2 className="mb-4 text-center font-serif text-3xl font-bold text-gray-900">{t('contact_title')}</h2>
              <p className="mb-8 text-center text-base text-gray-500">{t('contact_subtitle')}</p>
              <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
                <div>
                  <label htmlFor="modal_name" className="mb-2 block text-sm font-semibold text-gray-900">
                    {t('contact_name')}
                  </label>
                  <input
                    type="text"
                    id="modal_name"
                    name="name"
                    placeholder={t('contact_name_placeholder')}
                    className={`w-full rounded-xl border ${
                      errors.name ? 'border-red-500' : 'border-gray-200'
                    } bg-gray-50 px-5 py-4 text-base transition focus:border-accent-6 focus:ring-accent-6`}
                    autoComplete="name"
                    value={fields.name}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  {errors.name && <div className="mt-1 text-xs text-red-500">{errors.name}</div>}
                </div>
                <div>
                  <label htmlFor="modal_phone" className="mb-2 block text-sm font-semibold text-gray-900">
                    {t('contact_phone')}
                  </label>
                  <input
                    type="tel"
                    id="modal_phone"
                    name="phone"
                    placeholder={t('contact_phone_placeholder')}
                    className={`w-full rounded-xl border ${
                      errors.phone ? 'border-red-500' : 'border-gray-200'
                    } bg-gray-50 px-5 py-4 text-base transition focus:border-accent-6 focus:ring-accent-6`}
                    autoComplete="tel"
                    value={fields.phone}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  {errors.phone && <div className="mt-1 text-xs text-red-500">{errors.phone}</div>}
                </div>
                <div>
                  <label htmlFor="modal_message" className="mb-2 block text-sm font-semibold text-gray-900">
                    {t('contact_message')}
                  </label>
                  <textarea
                    id="modal_message"
                    name="message"
                    rows={4}
                    placeholder={t('contact_message_placeholder')}
                    className={`w-full resize-none rounded-xl border ${
                      errors.message ? 'border-red-500' : 'border-gray-200'
                    } bg-gray-50 px-5 py-4 text-base transition focus:border-accent-6 focus:ring-accent-6`}
                    value={fields.message}
                    onChange={handleChange}
                    disabled={loading}
                  ></textarea>
                  {errors.message && <div className="mt-1 text-xs text-red-500">{errors.message}</div>}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`mt-2 flex items-center justify-center gap-2 rounded-xl bg-accent-1 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-accent-2 ${
                    loading ? 'cursor-not-allowed opacity-70' : ''
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="mr-2 h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      {t('contact_send')}
                    </span>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        className="h-6 w-6 text-white"
                        fill="currentColor"
                      >
                        <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
                      </svg>
                      {t('contact_send')}
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {submitted && (
            <div className="flex flex-col items-center py-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                fill="none"
                viewBox="0 0 24 24"
                className="mb-4 text-accent-2"
              >
                <path
                  fill="currentColor"
                  d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5.293 7.293a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L11 13.586l5.293-5.293a1 1 0 0 1 1.414 0z"
                />
              </svg>
              <div className="mb-4 text-center text-lg font-semibold text-gray-700">{t('contact_thanks')}</div>
              <button
                onClick={onClose}
                className="rounded-xl bg-accent-1 px-6 py-3 font-semibold text-white shadow transition hover:bg-accent-2"
              >
                {t('contact_close')}
              </button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ContactModal;
