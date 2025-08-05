import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DecorEllipse1 from 'assets/images/decor-ellipse-style-1.svg';
import DecorPlus1 from 'assets/images/decor-plus-style-1.svg';

const ContactSection = () => {
  const { t } = useTranslation('common');
  const [fields, setFields] = useState({ name: '', phone: '', message: '' });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { [k: string]: string } = {};
    if (!fields.name.trim()) errs.name = t('contact_required');
    if (!fields.phone.trim()) errs.phone = t('contact_required');
    if (!fields.message.trim()) errs.message = t('contact_required');
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 1500);
    }
  };

  const handleSendAgain = () => {
    setFields({ name: '', phone: '', message: '' });
    setErrors({});
    setLoading(false);
    setSubmitted(false);
  };

  return (
    <section className="relative mb-32" id="contact">
      <div className="relative mx-auto max-w-full px-4 lg:max-w-7xl">
        {/* Top right decor */}
        <div className="absolute -top-10 right-0 z-0 h-36 w-36">
          <DecorPlus1 className="decor-plus-style-1" />
        </div>
        {/* Left bottom decor */}
        <div className="absolute -bottom-16 left-0 z-0 h-56 w-56 opacity-10">
          <DecorEllipse1 className="stroke-accent-6/10" />
        </div>

        <div className="relative z-10 mx-auto max-w-2xl rounded-3xl bg-white px-6 py-14 shadow-great lg:px-16">
          <h2 className="mb-6 text-center font-serif text-4xl font-bold text-gray-900 lg:text-5xl">
            {t('contact_title')}
          </h2>
          <p className="mb-10 text-center text-lg text-gray-500">{t('contact_subtitle')}</p>

          {/* FORM */}
          {!submitted && (
            <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-900">
                  {t('contact_name')}
                </label>
                <input
                  type="text"
                  id="name"
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
                <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-gray-900">
                  {t('contact_phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
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
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-gray-900">
                  {t('contact_message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
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
                className={`mt-2 flex items-center justify-center gap-3 rounded-xl bg-accent-1 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-accent-2 ${
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
          )}

          {/* THANK YOU MESSAGE + SEND AGAIN BUTTON */}
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
                  d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5.293 7.293a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 1.414-1.414L11 13.586l5.293-5.293a1 1 0 0 1 1.414 0z"
                />
              </svg>
              <div className="mb-4 text-center text-lg font-semibold text-gray-700">{t('contact_thanks')}</div>
              <button
                onClick={handleSendAgain}
                className="rounded-xl bg-accent-1 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-accent-2"
              >
                {t('contact_send_again')}
              </button>
            </div>
          )}

          {/* Contact info */}
          <div className="mt-12 flex flex-col items-center gap-2 text-center text-sm text-gray-400">
            <div>
              {t('contact_info_phone')}:{' '}
              <a href="tel:+998881067770" className="text-accent-2 hover:underline">
                +998 88 106-77-70
              </a>
            </div>
            <div>
              {t('contact_info_phone')}:{' '}
              <a href="tel:+998692277770" className="text-accent-2 hover:underline">
                +998 69 227-77-70
              </a>
            </div>
            <div>
              {t('contact_info_phone')}:{' '}
              <a href="tel:+998972515555" className="text-accent-2 hover:underline">
                +998 97 251-55-55
              </a>
            </div>
            <div>{t('contact_info_address')}</div>
            <div>{t('contact_info_hours')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
