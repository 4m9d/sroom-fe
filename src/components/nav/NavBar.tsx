'use client';
import Link from 'next/link';
import SearchInput from './SearchInput';
import useAuth from '@/src/hook/useAuth';
import Button from '../ui/Button';
import { signOut } from 'next-auth/react';

type Props = {
  logo: string;
  profileDropdown?: ProfileDropdown[];
};

export default function NavBar({ logo, profileDropdown }: Props) {
  const { session } = useAuth();

  const name = session?.name;
  const bio = session?.bio;

  return (
    <nav className='flex justify-between px-10 navbar'>
      <h1 className=''>
        <Link href='/' className='text-lg font-bold'>
          {logo}
        </Link>
      </h1>
      <div className={`${name ? '' : 'hidden'}`}>
        <SearchInput />
      </div>
      <div className='flex gap-4'>
        <Button
          onClick={() => signOut()}
          className={`${name ? '' : 'hidden'} g_id_signout`}
        >
          <p>로그아웃</p>
        </Button>
        <button className={`${name ? '' : 'hidden'} dropdown dropdown-hover`}>
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
