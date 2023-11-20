import QueryProvider from '../providers/QueryProvider';
import NavBar from '../components/gnb/NavBar';
import AuthSessionProvider from '../providers/AuthSessionProvider';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import localFont from 'next/font/local';
import ResolutionCheck from '../components/ui/ResolutionCheck';
import Footer from '../components/fnb/Footer';
import ChannelTalk from '../components/tools/ChannelTalk/ChannelTalk';
import ChannelTalkManager from '../components/tools/ChannelTalk/ChannelTalkManager';
import GoogleAnalytics from '../components/tools/GoogleAnalytics/GoogleAnalytics';
import NaverAnalytics from '../components/tools/NaverAnalytics/NaverAnalytics';

export const metadata = {
  metadataBase: new URL('https://sroom.kr'),
  title: {
    template: '%s | 스룸',
    default: '스룸'
  },
  description: '나만을 위한 유튜브 강의 관리 플랫폼 스룸',
  openGraph: {
    title: '스룸',
    description: '나만을 위한 유튜브 강의 관리 플랫폼 스룸',
    type: 'website',
    images: {
      url: '/image/opengraph/opengraph-image.jpg',
      width: 1200,
      height: 630,
      alt: '나만을 위한 유튜브 강의 관리 플랫폼, 스룸'
    }
  }
};

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

const Pretendard = localFont({
  src: './Pretendard.woff2',
  display: 'swap'
})

export default function RootLayout({ children, modal }: Props) {
  return (
    <html lang='ko' className={Pretendard.className}>
      <GoogleAnalytics />
      <NaverAnalytics />
      <ChannelTalk />
      <body>
        <AuthSessionProvider>
          <QueryProvider>
            <NavBar
              logo='스룸'
              profileDropdown={[
                { id: 1, menuTitle: '내 강의실', menuRoute: '/classroom' },
                {
                  id: 2,
                  menuTitle: '로그아웃',
                  menuRoute: '/auth/signout'
                }
              ]}
            />
            <ChannelTalkManager>
              <ResolutionCheck>
                <Toaster containerStyle={{ zIndex: 9999 }} />
                {children}
                {modal}
              </ResolutionCheck>
            </ChannelTalkManager>
          </QueryProvider>
        </AuthSessionProvider>
        <Footer />
      </body>
    </html>
  );
}
