import type { NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('components/Header'), { ssr: false });
const Hero = dynamic(() => import('sections/Hero'), { ssr: false });
const Category = dynamic(() => import('sections/Category'), { ssr: false });
const TopDestinations = dynamic(() => import('sections/TopDestinations'), { ssr: false });
const EasyinFast = dynamic(() => import('sections/EasyinFast'), { ssr: false });
const Testimonials = dynamic(() => import('components/Testimonials'), { ssr: false });
const Clients = dynamic(() => import('sections/Clients'), { ssr: false });
const NewsLetter = dynamic(() => import('sections/NewsLetter'), { ssr: false });
const Contact = dynamic(() => import('sections/ContactSection'), { ssr: false });
const Footer = dynamic(() => import('sections/Footer'), { ssr: false });
const LegalInfoSection = dynamic(() => import('sections/LegalInfoSection'), { ssr: false });
const InternalTourismSection = dynamic(() => import('sections/InternalTourismSection'), { ssr: false });

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

const Home: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <Head
        children={
          <>
            <title>{t('siteTitle')}</title>
            <meta name="description" content={t('siteDescription')} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" href="/favicon.ico" />

            <meta property="og:url" content="https://oasis-tour.uz/" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={t('ogTitle')} />
            <meta property="og:description" content={t('ogDescription')} />
            <meta property="og:image" content="https://oasis-tour.uz/jadoo-travel-agency.jpg" />
          </>
        }
      />
      <div className="absolute z-20 w-full py-6 lg:z-10 lg:py-12">
        <Header />
      </div>
      <Hero />
      <LegalInfoSection />
      <InternalTourismSection />
      <Category />
      <TopDestinations />
      <EasyinFast />
      <Testimonials />
      <Contact />
      <Clients />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
