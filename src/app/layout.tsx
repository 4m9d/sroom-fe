import QueryProvider from '../providers/QueryProvider';
import NavBar from '../components/gnb/NavBar';
import AuthSessionProvider from '../providers/AuthSessionProvider';
import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import ResolutionCheck from '../components/ui/ResolutionCheck';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '스룸',
  description: '나만을 위한 유튜브 강의 관리 플랫폼 스룸'
};

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function RootLayout({ children, modal }: Props) {
  return (
    <html lang='ko'>
      <body className={inter.className}>
        <AuthSessionProvider>
          <QueryProvider>
            <NavBar
              logo='스룸'
              profileDropdown={[
                { id: 1, menuTitle: '내 강의실', menuRoute: '/classroom' },
                { id: 2, menuTitle: '강의 자료', menuRoute: '/' }
              ]}
            />
            <ResolutionCheck>
              <Toaster containerStyle={{ zIndex: 9999 }} />
              {children}
              {modal}
            </ResolutionCheck>
          </QueryProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
