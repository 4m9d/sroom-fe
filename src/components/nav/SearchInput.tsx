'use client';
import getQueryURL from '@/src/util/http/getQueryURL';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchInput() {
  const [keyword, setKeyword] = useState<string>('');
  const router = useRouter();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const encodedQuery = encodeURI(keyword.trim().replaceAll(' ', '+'));

    if (encodedQuery === '') {
      return;
    } else {
      const url = getQueryURL('/search', { keyword: encodedQuery });
      router.push(url);
    }
  };

  return (
    <form className='relative w-full' onSubmit={submitHandler}>
      <input
        type='text'
        value={keyword}
        onChange={changeHandler}
        placeholder='강의 검색'
        className='w-full rounded-none bg-sroom-gray-400 form-control input'
      />
      <button
        type='button'
        onClick={() => setKeyword('')}
        className={`absolute rounded-none justify-center items-center p-2 h-6 shrink-0 text-xs right-2 top-3 hidden opacity-0 ${
          keyword.length > 0 ? '!inline-flex !opacity-100 transition-all' : ''
        }`}
      >
        ✕
      </button>
    </form>
  );
}
