'use client';
import getQueryURL from '@/src/util/getQueryURL';
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

    if (keyword.trim() === '') {
      return;
    } else {
      const url = getQueryURL('/search', { keyword });
      router.push(url);
      setKeyword('');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type='text'
        value={keyword}
        onChange={changeHandler}
        placeholder='강의 검색'
        className='form-control w-96 input input-bordered'
      />
    </form>
  );
}
