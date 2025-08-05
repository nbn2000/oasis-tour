import React, { useState } from 'react';
import LanguageSwitcher from 'components/LanguageSwitcher';
import ContactModal from './ContactModal';
import Logo from 'assets/images/logo.svg';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation('common');

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <header className="mx-auto mb-6 max-w-full px-4 lg:max-w-7xl">
      <div className="flex w-full items-center justify-between ">
        <div className="w-28">
          <Logo className="logo-style-1" />
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button
            onClick={openModal}
            className=" cursor-pointer rounded-xl bg-accent-1 px-5 py-2 font-semibold text-white shadow transition hover:bg-accent-2"
          >
            {t('contact_button')}
          </button>
        </div>
      </div>
      <ContactModal open={modalOpen} onClose={closeModal} />
    </header>
  );
}
