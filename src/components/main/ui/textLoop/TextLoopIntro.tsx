'use client';
import {
  MOTIVATION_GENERAL,
  MOTIVATION_SPECIFIC
} from '@/src/constants/motivation/motivation';
import Marquee from './Marquee';

export default function TextLoopIntro({}) {
  return (
    <div className='flex-col justify-around col-start-1 col-end-2 row-start-5 row-end-6 overflow-hidden bg-sroom-black-300'>
      <div className='flex items-center flex-1 gap-3 h-1/2'>
        <Marquee type='main'>
          {MOTIVATION_GENERAL.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </Marquee>
        <Marquee type='back-up'>
          {MOTIVATION_GENERAL.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </Marquee>
      </div>
      <div className='flex items-center flex-1 gap-3 h-1/2'>
        <Marquee type='main'>
          {MOTIVATION_SPECIFIC.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </Marquee>
        <Marquee type='back-up'>
          {MOTIVATION_SPECIFIC.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
