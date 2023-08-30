'use client';
import Link from 'next/link';
import SearchInput from './SearchInput';
import useAuth from '@/src/hooks/useAuth';
import Button from '../ui/button/Button';
import Image from 'next/image';
import useWindowSize from '@/src/hooks/useWindowSize';

type Props = {
  logo: string;
  profileDropdown?: ProfileDropdown[];
};
const WIDTH_SM = 640;

export default function NavBar({ logo, profileDropdown }: Props) {
  const { session, logout } = useAuth();
  const { width } = useWindowSize();

  const name = session?.name;
  const bio = session?.bio;
  const hidden = name ? '' : 'hidden';

  return (
    <nav className='flex justify-between gap-4 lg:gap-8 px-4 lg:px-24 mx-auto max-h-[4rem] navbar max-w-screen-2xl'>
      <h1 className='w-6 sm:w-20 lg:w-36 shrink-0'>
        <Link href='/' className='shrink-0 mr-14'>
          {width && width < WIDTH_SM ? (
            <Image
              className='w-6'
              src={'/logo/logo.svg'}
              alt={logo}
              width={25}
              height={25}
            />
          ) : (
            <Image
              className='w-20 lg:w-36'
              src={'/logo/logo_en.svg'}
              alt={logo}
              width={150}
              height={40}
            />
          )}
        </Link>
      </h1>
      <div className={`${hidden} flex-1`}>
        <SearchInput />
      </div>
      <Button
        onClick={logout}
        className={`${hidden} g_id_signout w-20 lg:w-24 bg-sroom-brand`}
      >
        <p className='text-xs font-semibold lg:text-sm text-sroom-white'>
          로그아웃
        </p>
      </Button>
      <button
        type='button'
        className={`${hidden} dropdown dropdown-hover w-36 lg:w-52 text-sroom-black-400`}
      >
        <div
          tabIndex={0}
          className='flex flex-col items-start justify-between h-full rounded-none w-36 lg:w-52 btn btn-ghost hover:bg-sroom-gray-300'
        >
          <p className='text-xs font-semibold text-left lg:text-sm'>{name}</p>
          <p className='text-xs font-normal text-left whitespace-normal text-sroom-black-100 line-clamp-1'>
            {bio}
          </p>
        </div>
        <ul
          tabIndex={0}
          className='menu dropdown-content z-[1] p-1 w-36 lg:w-52 shadow rounded-none text-xs font-medium text-sroom-black-400 bg-sroom-white'
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
    </nav>
  );
}
