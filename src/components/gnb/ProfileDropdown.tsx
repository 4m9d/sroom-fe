import ArrowTopRightSVG from '@/public/icon/ArrowTopRight';
import PencilSVG from '@/public/icon/Pencil';
import SaveSVG from '@/public/icon/Save';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  profile: string;
  name: string;
  isEditMode: boolean;
  profileDropdown?: ProfileDropdown[];
  setName: React.Dispatch<React.SetStateAction<string>>;
  profileButtonClickHandler: () => void;
};

export default function ProfileDropdown({
  profile,
  name,
  isEditMode,
  profileDropdown,
  setName,
  profileButtonClickHandler
}: Props) {
  return (
    <>
      <div
        tabIndex={0}
        className='flex items-center justify-between h-full gap-3 rounded-none btn btn-ghost hover:bg-sroom-gray-300'
      >
        {profile && (
          <Image
            className='rounded-full'
            src={profile}
            alt='프로필'
            width={40}
            height={40}
          />
        )}
        <input
          defaultValue={name}
          disabled={isEditMode === false}
          spellCheck='false'
          onChange={(e) => setName(e.target.value)}
          maxLength={10}
          className={`hidden w-32 p-1 text-xs font-semibold leading-9 text-left resize-none sm:block md:text-sm lg:text-base disabled:bg-sroom-white ${
            isEditMode ? 'border-2 rounded-sm border-sroom-brand' : ''
          }`}
        />
      </div>
      <ul
        tabIndex={0}
        className='w-40 p-2 text-sm font-medium rounded-none shadow sm:w-full menu dropdown-content text-sroom-black-400 bg-sroom-white'
      >
        <li className='flex justify-center border-b h-11 border-sroom-gray-400'>
          <div
            onClick={profileButtonClickHandler}
            className='rounded-none active:!text-sroom-black-400 hover:bg-gray-100 active:!bg-sroom-gray-400 focus:!bg-sroom-gray-300 flex justify-between items-center'
          >
            {isEditMode ? '저장하기' : '프로필 수정'}
            <span className='w-5 h-5 stroke-sroom-black-200'>
              {isEditMode ? <SaveSVG /> : <PencilSVG />}
            </span>
          </div>
        </li>
        {profileDropdown &&
          profileDropdown.map((menu) => {
            return (
              <li className='flex justify-center h-11' key={menu.id}>
                <Link
                  className='flex justify-between items-center rounded-none active:!text-sroom-black-400 hover:bg-gray-100 active:!bg-sroom-gray-400 focus:!bg-sroom-gray-300'
                  href={menu.menuRoute}
                >
                  {menu.menuTitle}
                  <span className='w-4 h-4 fill-sroom-black-200'>
                    <ArrowTopRightSVG />
                  </span>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
}
