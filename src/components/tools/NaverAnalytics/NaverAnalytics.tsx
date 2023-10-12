import Script from 'next/script';

export default function NaverAnalytics({}) {
  return (
    <>
      <Script type='text/javascript' src='//wcs.naver.net/wcslog.js'></Script>
      <Script
        id='naver-analytics-init'
        type='text/javascript'
        dangerouslySetInnerHTML={{
          __html: `
          if(!wcs_add) var wcs_add = {};
          wcs_add["wa"] = "2a95c9953db4ac";
          if(window.wcs) {
            wcs_do();
          }
          `
        }}
      ></Script>
    </>
  );
}
