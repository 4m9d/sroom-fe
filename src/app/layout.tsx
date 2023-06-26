import NavBar from '../components/ui/NavBar';
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '스룸',
  description: '나만을 위한 유튜브 강의 관리 플랫폼 스룸',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NavBar
          logo='스룸'
          searchBarVisible={true}
          profileVisible={true}
          profile={{name: '사용자 명', bio: '프로필 한 줄 소개'}}
          profileDropdown={[
            { id: 1, menuTitle: '내 강의실', menuRoute: '/' },
            { id: 2, menuTitle: '강의 자료', menuRoute: '/' }
          ]}
        />
        {children}
      </body>
    </html>
  );
}
