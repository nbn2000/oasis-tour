import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DecorPlus1 from 'assets/images/decor-plus-style-1.svg';
import DecorEllipse1 from 'assets/images/decor-ellipse-style-1.svg';
import Image from 'next/image';
import ContactModal from 'components/Header/ContactModal';

const InternalTourismSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation('common');

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <section className="relative my-28 px-4 lg:px-0" id="internal">
      <div className="absolute -top-10 left-0 z-0 h-32 w-32 opacity-30">
        <DecorPlus1 className="decor-plus-style-1" />
      </div>
      <div className="absolute -bottom-12 right-0 z-0 h-48 w-48 opacity-10">
        <DecorEllipse1 className="stroke-accent-6/10" />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col-reverse rounded-3xl bg-white px-0 py-0 shadow-great lg:flex-row lg:px-0">
        <div className="flex flex-1 flex-col justify-center px-6 py-10 lg:px-12">
          <h2 className="mb-4 font-serif text-4xl font-bold text-gray-900 lg:text-5xl">
            {t('internal_tourism_title')}
          </h2>
          <p className="mb-4 text-lg text-gray-600">{t('internal_tourism_subtitle')}</p>
          <div className="mb-8 text-base leading-relaxed text-gray-500">{t('internal_tourism_body')}</div>
          <button
            onClick={openModal}
            className="inline-block rounded-xl bg-accent-1 px-8 py-4 text-center text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-accent-2"
          >
            {t('internal_tourism_cta')}
          </button>
        </div>
        <div className="relative min-h-[240px] w-full flex-1 overflow-hidden rounded-t-3xl lg:min-h-[420px] lg:rounded-r-3xl lg:rounded-t-none">
          <Image
            src="/images/samarkand.jpg"
            alt="Samarkand"
            layout="fill"
            objectFit="cover"
            className="rounded-t-3xl lg:rounded-r-3xl lg:rounded-t-none"
            priority
          />
          <div className="absolute inset-0 rounded-t-3xl bg-gradient-to-tr from-black/20 to-transparent lg:rounded-r-3xl lg:rounded-t-none"></div>
        </div>
      </div>
      <ContactModal open={modalOpen} onClose={closeModal} />
    </section>
  );
};

export default InternalTourismSection;
