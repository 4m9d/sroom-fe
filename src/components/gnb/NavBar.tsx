'use client';
import Link from 'next/link';
import SearchInput from './SearchInput';
import useAuth from '@/src/hooks/useAuth';
import Button from '../ui/button/Button';
import Image from 'next/image';
import useWindowSize from '@/src/hooks/useWindowSize';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { updateUserProfile } from '@/src/api/members/members';
import ProfileDropdown from './ProfileDropdown';

type Props = {
  logo: string;
  profileDropdown?: ProfileDropdown[];
};
const WIDTH_SM = 640;

export default function NavBar({ logo, profileDropdown }: Props) {
  const { logout } = useAuth();
  const { data: session, update } = useSession();
  const { width: windowWidth } = useWindowSize();
  const [isEditMode, setIsEditMode] = useState(false);

  const [name, setName] = useState(session?.name ?? '');
  const profile = session?.profile;

  const navBarHidden = session ? '' : 'hidden';

  const profileButtonClickHandler = async () => {
    if (isEditMode) {
      mutate();
      await update({ ...session, name });
    }
    setIsEditMode(!isEditMode);
  };

  const { mutate } = useMutation(() => updateUserProfile(name), {
    onSuccess: (data) => {
      setIsEditMode(false);
      setName(data.name);
    }
  });

  useEffect(() => {
    setName(() => session?.name ?? '');
  }, [session?.name]);

  return (
    <nav className='z-20 h-12 shadow-sm navbar'>
      <div className='flex justify-between gap-4 px-4 mx-auto lg:gap-8 lg:px-24 navbar max-w-screen-2xl'>
        <h1 className='w-10 sm:w-28 lg:w-36 shrink-0'>
          <Link href='/' className='shrink-0 mr-14'>
            {windowWidth < WIDTH_SM ? (
              <Image
                className='w-10 h-10'
                src={'/logo/logo.svg'}
                alt={logo}
                width={40}
                height={40}
              />
            ) : (
              <Image
                className='w-28 lg:w-36'
                src={'/logo/logo_en.svg'}
                alt={logo}
                width={150}
                height={40}
              />
            )}
          </Link>
        </h1>
        <div className={`${navBarHidden} flex-1`}>
          <SearchInput />
        </div>
        <Button
          onClick={logout}
          className={`${navBarHidden} g_id_signout w-20 lg:w-24 bg-sroom-brand`}
        >
          <p className='text-xs lg:text-sm text-sroom-white'>로그아웃</p>
        </Button>
        <button
          type='button'
          className={`${navBarHidden} dropdown dropdown-end md:dropdown-hover text-sroom-black-400`}
        >
          {profile && (
            <ProfileDropdown
              profile={profile}
              name={name}
              profileDropdown={profileDropdown}
              isEditMode={isEditMode}
              setName={setName}
              profileButtonClickHandler={profileButtonClickHandler}
            />
          )}
        </button>
      </div>
    </nav>
  );
}
