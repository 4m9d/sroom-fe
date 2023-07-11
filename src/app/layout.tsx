import QueryProvider from '../providers/QueryProvider';
import NavBar from '../components/nav/NavBar';
import AuthSessionProvider from '../providers/AuthSessionProvider';
import './globals.css';
import { Inter } from 'next/font/google';
import ToastProvider from '../providers/ToastProvider';
import Toast from '../components/ui/Toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '스룸',
  description: '나만을 위한 유튜브 강의 관리 플랫폼 스룸'
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div id='toast'></div>
        <ToastProvider>
          <AuthSessionProvider>
            <QueryProvider>
              <NavBar
                logo='스룸'
                profileDropdown={[
                  { id: 1, menuTitle: '내 강의실', menuRoute: '/' },
                  { id: 2, menuTitle: '강의 자료', menuRoute: '/' }
                ]}
              />
              {children}
            </QueryProvider>
          </AuthSessionProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
