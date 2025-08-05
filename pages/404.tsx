import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';

const NotFound = dynamic(() => import('components/NotFound'), { ssr: false });

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default function Custom404() {
  return <NotFound />;
}
