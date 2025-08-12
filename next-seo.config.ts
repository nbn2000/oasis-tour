import type { DefaultSeoProps } from 'next-seo';

const url = 'https://your-domain.com';

const config: DefaultSeoProps = {
  titleTemplate: '%s | Oasis Tour',
  defaultTitle: 'Oasis Tour',
  description:
    'Oasis Tour — sayohat paketlari, shahar turlari va maxsus takliflar. Выберите тур мечты с удобной оплатой и поддержкой.',
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url,
    siteName: 'Oasis Tour',
  },
  twitter: {
    cardType: 'summary_large_image',
  },
  additionalLinkTags: [{ rel: 'icon', href: '/favicon.ico' }],
};

export default config;
