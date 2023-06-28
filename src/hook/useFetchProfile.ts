import { useEffect, useState } from 'react';

export default function useFetchProfile(): Profile {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    bio: ''
  });
/* 
  useEffect(() => {
    if (status === 'authenticated') {
      //TODO: fetch profile
      setProfile({
        name: '손경식',
        bio: '안녕하세요. 손경식입니다.'
      });
    }
    console.log(data);
  }, [status]); */

  return profile;
}
