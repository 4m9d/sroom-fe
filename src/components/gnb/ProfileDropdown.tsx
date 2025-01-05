'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef } from 'react';
import { ArrowTopRightSVG } from '@/public/icons/icons';
import { PencilSVG } from '@/public/icons/icons';
import { SaveSVG } from '@/public/icons/icons';
import FeedbackMessage from '../ui/feedback/FeedbackMessage';

type Props = {
  profileImage: string;
  isEditMode: boolean;
  isNameModified: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  profileDropdown?: ProfileDropdown[];
  name: string;
  profileButtonClickHandler: (name: string) => Promise<void>;
};

export default function ProfileDropdown({
  profileImage,
  isEditMode,
  isNameModified,
  setIsEditMode,
  profileDropdown,
  name,
  profileButtonClickHandler
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const enterKeyDownHandler = useCallback(
    (e: string) => {
      if (inputRef.current && e === 'Enter') {
        inputRef.current.value =
          inputRef.current.value.trim().slice(0, 10) ?? '';

        const name = inputRef.current.value;

        if (name === '') return;
        profileButtonClickHandler(inputRef.current.value);
      }
    },
    [profileButtonClickHandler]
  );

  const onBlurHandler = useCallback(() => {
    setIsEditMode(false);
    if (inputRef.current) {
      inputRef.current.value = name;
    }
  }, [setIsEditMode, name]);

  const saveProfileButtonClickHandler = useCallback(async () => {
    if (inputRef.current && isEditMode) {
      inputRef.current.value = inputRef.current.value.trim().slice(0, 10) ?? '';
      const name = inputRef.current.value;

      if (name === '') return;

      await profileButtonClickHandler(name);
    } else {
      setIsEditMode((prev) => !prev);
    }
  }, [isEditMode, setIsEditMode, profileButtonClickHandler]);

  useEffect(() => {
    if (inputRef.current && isEditMode) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [isEditMode]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = name;
    }
  }, [name]);

  return (
    <>
      <div
        tabIndex={0}
        className='z-20 flex items-center justify-between h-full gap-3 rounded-none btn btn-ghost hover:bg-sroom-gray-300'
      >
        {profileImage && (
          <div className='w-9 h-9 lg:w-10 lg:h-10'>
            <Image
              src={profileImage}
              className='rounded-full'
              alt='프로필'
              width={40}
              height={40}
            />
          </div>
        )}
        <div className='flex flex-col'>
          <input
            ref={inputRef}
            type='text'
            onBlur={onBlurHandler}
            defaultValue={name}
            disabled={isEditMode === false}
            spellCheck='false'
            onKeyDown={(e) => enterKeyDownHandler(e.key)}
            maxLength={10}
            className='hidden w-32 p-1 text-xs font-semibold text-left resize-none h- sm:block md:text-sm disabled:bg-sroom-white'
          />
          {isNameModified && (
            <FeedbackMessage type='success' message='닉네임이 변경되었어요!' />
          )}
        </div>
      </div>
      <ul
        tabIndex={0}
        className='z-20 w-40 text-xs font-medium bg-transparent rounded-none sm:text-sm sm:w-full menu dropdown-content text-sroom-black-400'
      >
        <div className='w-full h-full pt-3 bg-inherit'>
          <div className='p-2 shadow bg-sroom-white'>
            <li className='flex justify-center mb-2 border-b border-sroom-gray-400'>
              <div
                onClick={saveProfileButtonClickHandler}
                className='rounded-none active:!text-sroom-black-400 hover:bg-sroom-gray-300 active:!bg-sroom-gray-400 focus:!bg-sroom-gray-300 flex justify-between items-center'
              >
                {isEditMode ? '저장하기' : '닉네임 수정'}
                <span className='flex items-center w-4 h-4 sm:w-5 sm:h-5 stroke-sroom-black-200'>
                  {isEditMode ? <SaveSVG /> : <PencilSVG />}
                </span>
              </div>
            </li>
            {profileDropdown &&
              profileDropdown.map((menu) => {
                return (
                  <li className='flex justify-center' key={menu.id}>
                    <Link
                      className='flex justify-between items-center rounded-none active:!text-sroom-black-400 hover:bg-sroom-gray-300 active:!bg-sroom-gray-400 focus:!bg-sroom-gray-300'
                      href={menu.menuRoute}
                    >
                      {menu.menuTitle}
                      <span className='flex items-center w-3 h-3 sm:w-4 sm:h-4 fill-sroom-black-200'>
                        <ArrowTopRightSVG />
                      </span>
                    </Link>
                  </li>
                );
              })}
          </div>
        </div>
      </ul>
    </>
  );
}
