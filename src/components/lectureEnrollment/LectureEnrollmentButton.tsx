'use cleint';
import Button from '../ui/button/Button';
import { showModalHandler } from '@/src/util/modal/modalHandler';

type Props = {
  is_enrolled: boolean;
  is_playlist: boolean;
  courses: EnrolledCourse[];
};

export default function LectureEnrollmentButton({
  is_enrolled,
  is_playlist,
  courses
}: Props) {
  const buttonTitle = is_enrolled
    ? '수강하러 가기'
    : is_playlist
    ? '등록하기'
    : '코스에 추가하기';

  const LIST__LI =
    'px-3 border-b cursor-pointer border-b-gray-200 last-of-type:border-b-0';
  const LIST__DIV =
    'flex items-center justify-center h-12 text-sm font-semibold rounded-none text-zinc-500 hover:text-inherit focus:text-inherit';

  const EnrolledCoursesList = ({
    courses,
    className
  }: {
    courses: EnrolledCourse[];
    className?: string;
  }) => {
    return (
      <>
        {courses.map((course) => (
          <li
            className={`${className} ${LIST__LI} w-full`}
            key={course.course_id}
          >
            <div role='button' className={`${LIST__DIV} px-2`}>
              <span className='whitespace-normal line-clamp-1'>
                {course.course_title}
              </span>
            </div>
          </li>
        ))}
      </>
    );
  };

  const PlaylistEnrollment = ({ courses }: { courses: EnrolledCourse[] }) => {
    return (
      <>
        <li className={LIST__LI}>
          <div
            role='button'
            onClick={() => showModalHandler('LECTURE_ENROLLMENT')}
            className={LIST__DIV}
          >
            새 강의 코스 등록하기
          </div>
        </li>
        <li className={`${LIST__LI} group`}>
          <button type='button' className={`${LIST__DIV} w-full peer relative`}>
            기존 강의 코스에 추가하기{' '}
            <span className='ml-2 transition-all group-hover:rotate-90 group-focus-within:rotate-90'>
              〉
            </span>
          </button>
          <div className='absolute right-0 hidden w-4/5 pt-5 bg-transparent top-full group-hover:block hover:block peer-focus-within:block'>
            <ul className='relative bg-white border border-gray-200'>
              <EnrolledCoursesList
                courses={courses}
                className={'peer hover:bg-orange-500 hover:text-zinc-100'}
              />
              <span className='peer-first-of-type:peer-hover:bg-orange-500 absolute -top-[0.3px] w-3 h-3 rotate-45 -translate-x-1/2 -translate-y-1/2 border-t bg-white border-l left-10 border-l-gray-200 border-t-gray-200' />
            </ul>
          </div>
        </li>
      </>
    );
  };

  const VideoEnrollment = ({ courses }: { courses: EnrolledCourse[] }) => {
    return (
      <>
        <EnrolledCoursesList courses={courses} />
        <li className={`${LIST__LI} hover:bg-orange-500`}>
          <div
            role='button'
            onClick={() => showModalHandler('LECTURE_ENROLLMENT')}
            className='flex items-center justify-center gap-2 hover:text-zinc-100'
          >
            <div className='flex items-center justify-center w-5 h-5 rounded-full shrink-0 bg-zinc-700 text-zinc-100'>
              +
            </div>
            <div className='flex items-center justify-center h-12 text-sm font-semibold rounded-none'>
              새로운 코스 생성하기
            </div>
          </div>
        </li>
      </>
    );
  };

  return (
    <>
      <div className='w-full dropdown dropdown-hover !z-[60]'>
        <Button
          onClick={() => {}}
          className='w-full !h-[3rem] font-semibold peer text-zinc-200 bg-zinc-800'
        >
          {buttonTitle}
        </Button>
        {is_enrolled === false && (
          <div className='w-full pt-5 dropdown-content'>
            <ul className='relative bg-white border border-gray-200'>
              <span className='absolute -top-[0.3px] w-3 h-3 rotate-45 -translate-x-1/2 -translate-y-1/2 border-t bg-white border-l left-10 border-l-gray-200 border-t-gray-200' />
              {is_playlist ? (
                <PlaylistEnrollment courses={courses} />
              ) : (
                <VideoEnrollment courses={courses} />
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
