'use client';
import Link from 'next/link';
import SearchInput from './SearchInput';
import useAuth from '@/src/hooks/useAuth';
import Button from '../ui/button/Button';
import Image from 'next/image';

type Props = {
  logo: string;
  profileDropdown?: ProfileDropdown[];
};

export default function NavBar({ logo, profileDropdown }: Props) {
  const { session, logout } = useAuth();

  const name = session?.name;
  const bio = session?.bio;
  const hidden = name ? '' : 'hidden';

  return (
    <nav className='flex justify-between px-20 mx-auto gap-14 max-w-screen-2xl navbar'>
      <h1 className='shrink-0 w-14'>
        <span className='sr-only'>스룸</span>
        <Link href='/' className='text-lg font-bold'>
          <Image
            className='w-14 h-14'
            src={'/icon.svg'}
            alt='스룸'
            width={56}
            height={56}
          />
        </Link>
      </h1>
      <div className={`${hidden} flex-1`}>
        <SearchInput />
      </div>
      <div className='flex gap-4 w-72'>
        <Button onClick={logout} className={`${hidden} g_id_signout w-24`}>
          <p>로그아웃</p>
        </Button>
        <button type='button' className={`${hidden} dropdown dropdown-hover w-44`}>
          <div
            tabIndex={0}
            className='flex flex-col items-start w-44 btn btn-ghost rounded-btn'
          >
            <p>{name}</p>
            <p>{bio}</p>
          </div>
          <ul
            tabIndex={0}
            className='menu dropdown-content z-[1] p-2 shadow rounded-box w-44'
          >
            {profileDropdown?.map((menu) => {
              return (
                <li key={menu.id}>
                  <Link href={menu.menuRoute}>{menu.menuTitle}</Link>
                </li>
              );
            })}
          </ul>
        </button>
      </div>
    </nav>
  );
}
