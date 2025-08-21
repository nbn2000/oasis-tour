'use client';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_FORM_TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_FORM_TELEGRAM_CHAT_ID!;

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  packageName: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ open, onClose, packageName }) => {
  const { t } = useTranslation('common');
  const [fields, setFields] = useState({
    name: '',
    phone: '',
    date: '',
    people: 1,
    message: '',
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Reset state on open
  useEffect(() => {
    if (open) {
      setFields({ name: '', phone: '', date: '', people: 1, message: '' });
      setErrors({});
      setLoading(false);
      setSubmitted(false);
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { [k: string]: string } = {};
    if (!fields.name.trim()) errs.name = t('contact_required');
    if (!fields.phone.trim()) errs.phone = t('contact_required');
    if (!fields.date.trim()) errs.date = t('contact_required');
    if (!fields.people || Number(fields.people) < 1) errs.people = t('contact_required');
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setLoading(true);

      const text = `
📦 *Paketni bron qilish*
🏝 Paket: ${packageName}
👤 ${t('contact_name')}: ${fields.name}
📞 ${t('contact_phone')}: ${fields.phone}
📅 ${t('contact_date')}: ${fields.date}
👥 ${t('number_of_people')}: ${fields.people}
💬 ${t('contact_message')}: ${fields.message || '-'}
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
        alert(t('contact_error'));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl">
        {/* Close btn */}
        <button onClick={onClose} className="absolute right-3 top-3 rounded-full p-2 text-gray-500 hover:bg-gray-100">
          ✕
        </button>

        {/* Form or success */}
        {!submitted ? (
          <>
            <h2 className="mb-4 text-center font-serif text-2xl font-bold text-gray-900">
              {t('book_package')} — {packageName}
            </h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {/* Name */}
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700">{t('contact_name')}</span>
                <input
                  type="text"
                  name="name"
                  placeholder={t('contact_name_placeholder')}
                  className={`w-full rounded-xl border px-4 py-3 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  value={fields.name}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
              </label>

              {/* Phone */}
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700">{t('contact_phone')}</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder={t('contact_phone_placeholder')}
                  className={`w-full rounded-xl border px-4 py-3 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={fields.phone}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.phone && <span className="text-xs text-red-500">{errors.phone}</span>}
              </label>

              {/* Date */}
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700">{t('contact_date')}</span>
                <input
                  type="date"
                  name="date"
                  className={`w-full rounded-xl border px-4 py-3 ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
                  value={fields.date}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.date && <span className="text-xs text-red-500">{errors.date}</span>}
              </label>

              {/* People */}
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700">{t('number_of_people')}</span>
                <input
                  type="number"
                  name="people"
                  min={1}
                  placeholder="2"
                  className={`w-full rounded-xl border px-4 py-3 ${
                    errors.people ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={fields.people}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.people && <span className="text-xs text-red-500">{errors.people}</span>}
              </label>

              {/* Message */}
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700">{t('contact_message')}</span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder={t('contact_message_placeholder')}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                  value={fields.message}
                  onChange={handleChange}
                  disabled={loading}
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 rounded-xl bg-accent-1 px-6 py-3 font-semibold text-white shadow hover:bg-accent-2"
              >
                {loading ? t('contact_sending') : t('contact_send')}
              </button>
            </form>
          </>
        ) : (
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
            <div className="mb-4 text-center text-lg font-semibold text-gray-700">
              {t('contact_thanks')} <br />
              {t('booking_contact_soon')}
            </div>
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
  );
};

export default BookingModal;
