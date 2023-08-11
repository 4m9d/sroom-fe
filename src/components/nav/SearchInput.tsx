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
        className='w-full rounded-none bg-zinc-100 form-control input input-bordered'
      />
      <button
        type='button'
        onClick={() => setKeyword('')}
        className='absolute rounded-none btn btn-xs btn-ghost btn-circle right-2 top-3'
      >
        ✕
      </button>
    </form>
  );
}
