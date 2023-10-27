'use client';
import getQueryURL from '@/src/util/http/getQueryURL';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

type Props = {
  className?: string;
  submitButtonId?: string;
};
export default function SearchInput({ className, submitButtonId }: Props) {
  const [keyword, setKeyword] = useState<string>('');
  const router = useRouter();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(() => e.target.value);
  };

  const navigateToSearchPage = useCallback(() => {
    const encodedQuery = encodeURIComponent(keyword.trim());

    if (encodedQuery === '') {
      return;
    } else {
      const url = getQueryURL('/search', { keyword: encodedQuery });
      router.push(url);
    }
  }, [keyword, router]);

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigateToSearchPage();
  };

  useEffect(() => {
    if (submitButtonId) {
      const submitButton = document.getElementById(submitButtonId);
      submitButton?.addEventListener('click', navigateToSearchPage);
    }
    return () => {
      if (submitButtonId) {
        const submitButton = document.getElementById(submitButtonId);
        submitButton?.removeEventListener('click', navigateToSearchPage);
      }
    };
  }, [submitButtonId, navigateToSearchPage]);

  return (
    <form className='relative w-full' onSubmit={submitHandler}>
      <input
        type='text'
        value={keyword}
        onChange={changeHandler}
        placeholder='듣고 싶은 강의를 검색해보세요!'
        maxLength={100}
        className={`${className} w-full form-control input`}
      />
      <button
        type='button'
        onClick={() => setKeyword('')}
        className={`absolute rounded-none justify-center items-center shrink-0 text-xs right-[5%] top-1/2 -translate-y-1/2 hidden opacity-0 ${
          keyword.length > 0 ? '!inline-flex !opacity-100 transition-all' : ''
        }`}
      >
        ✕
      </button>
    </form>
  );
}
