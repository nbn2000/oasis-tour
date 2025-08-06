import React from 'react';
import { useTranslation } from 'react-i18next';

const LegalInfoSection = () => {
  const { t } = useTranslation('common');
  return (
    <section className="relative z-30 my-20 flex w-full items-center justify-center">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center rounded-2xl bg-gray-100 py-10 px-4 text-center shadow-lg">
        <div className="mb-1 font-serif text-xl font-semibold tracking-wide text-accent-1 md:text-2xl">
          {t('footer_legal_info')}
        </div>
        <div className="text-sm tracking-wide text-gray-700/80 md:text-base">{t('footer_legal_info_hint')}</div>
      </div>
    </section>
  );
};

export default LegalInfoSection;
