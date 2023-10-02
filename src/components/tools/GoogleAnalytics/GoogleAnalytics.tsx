import Script from 'next/script';

export default function GoogleAnalytics({}) {
  return (
    <>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script
        async
        src='https://www.googletagmanager.com/gtag/js?id=G-E941MLDWFF'
      ></Script>
      <Script
        id='gtag-init'
        dangerouslySetInnerHTML={{
          __html: ` window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-E941MLDWFF');
                  `
        }}
      ></Script>
    </>
  );
}
