import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document<{ locale?: string }> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const locale = ctx?.locale || 'uz';
    return { ...initialProps, locale };
  }

  render() {
    const locale = (this.props as any).locale || 'uz';
    return (
      <Html lang={locale === 'ru' ? 'ru' : 'uz'}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&family=Volkhov:wght@700&display=swap"
            rel="stylesheet"
          />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link rel="alternate" hrefLang="uz" href="https://oasis-tour.uz/" />
          <link rel="alternate" hrefLang="ru" href="https://oasis-tour.uz/ru" />
          <link rel="alternate" hrefLang="x-default" href="https://oasis-tour.uz/" />
          <meta property="og:locale" content="uz_UZ" />
          <meta property="og:locale:alternate" content="ru_RU" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
