import Link from 'next/link';
import SearchInput from './SearchInput';

type Props = {
  logo: string;
  searchBarVisible: boolean;
  profileVisible: boolean;
  profile: Profile;
  profileDropdown?: ProfileDropdown[];
};

export default function NavBar({
  logo,
  searchBarVisible = true,
  profileVisible = true,
  profile,
  profileDropdown
}: Props) {
  return (
    <nav className='flex justify-between px-10 navbar'>
      <h1 className=''>
        <Link href='/' className='text-lg font-bold'>
          {logo}
        </Link>
      </h1>
      <div className={`${searchBarVisible ? '' : 'hidden'}`}>
        <SearchInput />
      </div>
      <div
        className={`${
          profileVisible ? '' : 'hidden'
        } dropdown dropdown-hover pr-10`}
      >
        <div tabIndex={0} className='flex flex-col btn btn-ghost rounded-btn'>
          <div>
            <p>{profile.name}</p>
          </div>
          <div>
            <p>{profile.bio}</p>
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
