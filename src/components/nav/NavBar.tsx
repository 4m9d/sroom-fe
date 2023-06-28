'use client';
import Link from 'next/link';
import SearchInput from './SearchInput';

type Props = {
  logo: string;
  profileDropdown?: ProfileDropdown[];
};

export default function NavBar({ logo, profileDropdown }: Props) {
  const name = '';
  const bio = '';
  //TODO: 변경 필요
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
      <div className={`${name ? '' : 'hidden'} dropdown dropdown-hover pr-10`}>
        <div tabIndex={0} className='flex flex-col btn btn-ghost rounded-btn'>
          <div>
            <p>{name}</p>
          </div>
          <div>
            <p>{bio}</p>
          </div>
        </div>
        <ul
          tabIndex={0}
          className='menu dropdown-content z-[1] p-2 shadow rounded-box w-52'
        >
          {profileDropdown?.map((menu) => {
            return (
              <li key={menu.id}>
                <Link href={menu.menuRoute}>{menu.menuTitle}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
