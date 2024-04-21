import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ko'>
      <Head>
        {/* <link rel='preload' href='images\mainCarousel1.png' as='image' /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src={`/kakaomap`} />
      </body>
    </Html>
  );
}
