import QueryProvider from '../providers/QueryProvider';
import NavBar from '../components/gnb/NavBar';
import AuthSessionProvider from '../providers/AuthSessionProvider';
import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import ResolutionCheck from '../components/ui/ResolutionCheck';
import Footer from '../components/fnb/Footer';
import ChannelTalk from '../components/tools/ChannelTalk/ChannelTalk';
import ChannelTalkManager from '../components/tools/ChannelTalk/ChannelTalkManager';
import GoogleAnalytics from '../components/tools/GoogleAnalytics/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    template: '%s | 스룸',
    default: '스룸'
  },
  description: '나만을 위한 유튜브 강의 관리 플랫폼 스룸',
  openGraph: {
    images: '/image/opengraph/opengraph-image.jpg'
  }
};

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function RootLayout({ children, modal }: Props) {
  return (
    <html lang='ko'>
      <GoogleAnalytics />
      <ChannelTalk />
      <body className={inter.className}>
        <AuthSessionProvider>
          <QueryProvider>
            <NavBar
              logo='스룸'
              profileDropdown={[
                { id: 1, menuTitle: '내 강의실', menuRoute: '/classroom' }
              ]}
            />
            <ChannelTalkManager>
              <ResolutionCheck>
                <Toaster containerStyle={{ zIndex: 9999 }} />
                {children}
                {modal}
              </ResolutionCheck>
              <Footer />
            </ChannelTalkManager>
          </QueryProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
