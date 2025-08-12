import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next'; // ✅ use next-i18next here
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import Head from 'next/head';

const Header = dynamic(() => import('components/Header'), { ssr: false });
const Hero = dynamic(() => import('sections/Hero'), { ssr: false });
const Category = dynamic(() => import('sections/Category'), { ssr: false });
const EasyinFast = dynamic(() => import('sections/EasyinFast'), { ssr: false });
const Testimonials = dynamic(() => import('components/Testimonials'), { ssr: false });
const Clients = dynamic(() => import('sections/Clients'), { ssr: false });
const Contact = dynamic(() => import('sections/ContactSection'), { ssr: false });
const Footer = dynamic(() => import('sections/Footer'), { ssr: false });
const LegalInfoSection = dynamic(() => import('sections/LegalInfoSection'), { ssr: false });
const InternalTourismSection = dynamic(() => import('sections/InternalTourismSection'), { ssr: false });
const ExternalTourismSection = dynamic(() => import('sections/ExternalTourismSection'), { ssr: false });
const PackagesGrid = dynamic(() => import('sections/PackagesGrid'), { ssr: false });

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

const Home: NextPage = () => {
  const { t, i18n } = useTranslation('common');

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TravelAgency',
              name: 'Oasis Tour',
              url: 'https://oasis-tour.uz',
              logo: 'https://oasis-tour.uz/favicon.ico',
              image: 'https://oasis-tour.uz/jadoo-travel-agency.jpg',
              description:
                'Sayohat va bron qilish ilovasi — vizalar, aviabiletlar, mehmonxonalar va ekskursiyalar bir joyda. Namangandan dunyoning istalgan nuqtasiga.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'B.Mashrab 32',
                addressLocality: 'Namangan',
                addressRegion: 'Namangan',
                postalCode: '160100',
                addressCountry: 'UZ',
              },
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: '+998-90-123-45-67',
                  contactType: 'customer service',
                  areaServed: 'UZ',
                  availableLanguage: ['Uzbek', 'Russian', 'English'],
                },
              ],
              sameAs: [
                'https://www.instagram.com/oasis_tour',
                'https://t.me/oasis_tour',
                'https://www.facebook.com/oasis_tour',
              ],
            }),
          }}
        />
      </Head>
      <NextSeo
        title={t('siteTitle')}
        description={t('siteDescription')}
        canonical="https://oasis-tour.uz/"
        openGraph={{
          url: 'https://oasis-tour.uz/',
          title: t('ogTitle'),
          description: t('ogDescription'),
          locale: i18n.language === 'ru' ? 'ru_RU' : 'uz_UZ',
          images: [
            {
              url: 'https://oasis-tour.uz/jadoo-travel-agency.jpg',
              width: 1200,
              height: 630,
              alt: t('ogTitle'),
            },
          ],
          siteName: 'Oasis Tour',
        }}
      />

      <div className="absolute z-20 w-full py-6 lg:z-10 lg:py-12">
        <Header />
      </div>
      <Hero />
      <LegalInfoSection />
      <InternalTourismSection />
      <ExternalTourismSection />
      <Category />
      <PackagesGrid />
      <EasyinFast />
      <Testimonials />
      <Contact />
      <Clients />
      <Footer />
    </>
  );
};

export default Home;
