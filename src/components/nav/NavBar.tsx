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
    <nav className='flex justify-between gap-8 px-20 mx-auto max-h-[4rem] navbar'>
      <h1 className='shrink-0 w-[calc(2.5rem*2.57)] h-14'>
        <Link href='/' className='text-lg font-bold shrink-0 mr-14'>
          <Image
            className='w-[calc(2.5rem*2.57)] h-14'
            src={'/logo/logo_en.svg'}
            alt={logo}
            width={102}
            height={56}
          />
        </Link>
      </h1>
      <div className={`${hidden} flex-1`}>
        <SearchInput />
      </div>
      <div className='flex gap-4 w-72'>
        <Button onClick={logout} className={`${hidden} g_id_signout w-24 bg-sroom-brand`}>
          <p className='text-sm font-semibold text-sroom-white'>로그아웃</p>
        </Button>
        <button
          type='button'
          className={`${hidden} dropdown dropdown-hover w-44 text-sroom-black-400`}
        >
          <div
            tabIndex={0}
            className='flex flex-col items-start justify-between h-full rounded-none w-52 btn btn-ghost hover:bg-sroom-gray-300'
          >
            <p className='text-sm font-semibold text-left'>{name}</p>
            <p className='text-xs font-normal text-left whitespace-normal text-sroom-black-100 line-clamp-1'>{bio}</p>
          </div>
          <ul
            tabIndex={0}
            className='menu dropdown-content z-[1] p-2 w-52 shadow rounded-none'
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
