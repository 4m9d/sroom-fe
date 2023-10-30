'use client';
import ArrowRightSVG from '@/public/icon/ArrowRight';
import LectureSVG from '@/public/icon/Lecture';
import Button from '../ui/button/Button';
import { showModalHandler } from '@/src/util/modal/modalHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  enrollLectureInExistingCourse,
  enrollLectureInNewCourse
} from '@/src/api/courses/courses';
import { ErrorMessage } from '@/src/api/ErrorMessage';
import setErrorToast from '@/src/util/toast/setErrorToast';
import LoadingSpinner from '../ui/LoadingSpinner';
import setLectureEnrollToast from '@/src/util/toast/setLectureEnrollToast';
import { useRouter } from 'next/navigation';
import { QueryKeys } from '@/src/api/queryKeys';

type Props = {
  is_playlist: boolean;
  courses: EnrolledCourse[];
  lecture_code: string;
  onEnrollSuccess: () => void;
  disabled?: boolean;
};

export default function LectureEnrollmentButton({
  is_playlist,
  courses,
  lecture_code,
  onEnrollSuccess,
  disabled
}: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const enrollLecture = async (course_id?: number) => {
    if (course_id !== undefined) {
      const enrollLectureInExistingCourseParams: EnrollLectureInExistingCourseParams =
        {
          lecture_code: lecture_code
        };
      return await enrollLectureInExistingCourse(
        course_id,
        enrollLectureInExistingCourseParams
      ).catch(() => {
        setErrorToast(new Error(ErrorMessage.SEARCH));
        return null;
      });
    }
    if (course_id === undefined) {
      const enrollLectureInNewCourseParams: EnrollLectureInNewCourseParams = {
        query: {
          use_schedule: false
        },
        body: {
          lecture_code: lecture_code
        }
      };
      return await enrollLectureInNewCourse(
        enrollLectureInNewCourseParams
      ).catch(() => {
        setErrorToast(new Error(ErrorMessage.SEARCH));
        return null;
      });
    }
  };

  const { mutate, isLoading } = useMutation(enrollLecture, {
    onSuccess: (response) => {
      onEnrollSuccess();
      response &&
        setLectureEnrollToast(() =>
          router.push(`/course/${response.course_id}`)
        );
      queryClient.invalidateQueries([QueryKeys.DETAIL, lecture_code]);
    }
  });

  const buttonTitle = is_playlist ? '등록하기' : '코스에 추가하기';

  const LIST__LI =
    'px-3 border-b cursor-pointer border-b-sroom-gray-500 last-of-type:border-b-0';
  const LIST__SUB__LI =
    'px-3 border-b cursor-pointer border-b-sroom-gray-500 last-of-type:border-b-0 hover:bg-sroom-brand peer';
  const LIST__DIV =
    'flex items-center justify-center h-10 text-sm font-semibold rounded-none text-sroom-black-100 stroke-sroom-black-100 hover:text-sroom-black-400 focus:text-sroom-black-400 hover:stroke-sroom-black-400 focus:stroke-sroom-black-400 cursor-pointer w-full';
  const LIST__SUB__DIV =
    'flex items-center justify-center h-10 text-sm font-semibold rounded-none text-sroom-black-100 stroke-sroom-black-100 hover:text-sroom-white focus:text-sroom-white hover:stroke-sroom-white focus:stroke-sroom-white cursor-pointer w-full';

  const EnrolledCoursesList = ({
    courses,
    isSubList
  }: {
    courses: EnrolledCourse[];
    isSubList: boolean;
  }) => {
    return (
      <>
        {courses?.map((course) => (
          <li
            className={`${isSubList ? LIST__SUB__LI : LIST__LI} w-full`}
            key={course.course_id}
          >
            <button
              type='button'
              onClick={() => mutate(course.course_id)}
              className={`${
                isSubList ? LIST__SUB__DIV : LIST__DIV
              } px-2 justify-between gap-2`}
            >
              <div className='flex items-center justify-start flex-1'>
                <span className='!text-xs whitespace-normal line-clamp-1 break-all'>
                  {course.course_title}
                </span>
              </div>
              <div className='flex items-center justify-start w-14'>
                <span className='w-3 mr-1'>
                  <LectureSVG />
                </span>
                <span className='!text-xs'>{course.total_video_count}개</span>
              </div>
            </button>
          </li>
        ))}
      </>
    );
  };

  const PlaylistEnrollment = ({ courses }: { courses: EnrolledCourse[] }) => {
    return (
      <>
        <li className={LIST__LI}>
          <button
            type='button'
            onClick={() => showModalHandler('LECTURE_ENROLLMENT')}
            className={LIST__DIV}
          >
            새 강의 코스 등록하기
          </button>
        </li>
        {courses.length > 0 && (
          <li className={`${LIST__LI} group`}>
            <button
              type='button'
              className={`${LIST__DIV} w-full peer relative`}
            >
              기존 강의 코스에 추가하기
              <span className='w-3 ml-2 transition-all group-hover:rotate-90 group-focus-within:rotate-90 stroke-sroom-black-100'>
                <ArrowRightSVG />
              </span>
            </button>
            <div className='absolute right-0 hidden w-4/5 pt-5 bg-transparent top-full group-hover:block hover:block peer-focus-within:block'>
              <ul className='relative border bg-sroom-white border-sroom-gray-500'>
                <EnrolledCoursesList isSubList={true} courses={courses} />
                <span className='peer-first-of-type:peer-hover:bg-sroom-brand absolute -top-[0.3px] w-3 h-3 rotate-45 -translate-x-1/2 -translate-y-1/2 border-t bg-sroom-white border-l left-10 border-l-sroom-gray-500 border-t-sroom-gray-500' />
              </ul>
            </div>
          </li>
        )}
      </>
    );
  };

  const VideoEnrollment = ({ courses }: { courses: EnrolledCourse[] }) => {
    return (
      <>
        <EnrolledCoursesList isSubList={false} courses={courses} />
        <li
          className={`${LIST__LI} ${
            courses.length === 0 ? 'peer' : ''
          } hover:bg-sroom-brand`}
        >
          <button
            type='button'
            onClick={() => mutate(undefined)}
            className='flex items-center justify-center w-full gap-2 hover:text-sroom-white'
          >
            <div className='flex items-center justify-center w-5 h-5 rounded-full shrink-0 bg-sroom-black-400 text-sroom-white'>
              +
            </div>
            <div className='flex items-center justify-center h-12 text-sm font-semibold rounded-none'>
              새로운 코스 생성하기
            </div>
          </button>
        </li>
      </>
    );
  };

  return (
    <>
      <div className='w-full dropdown dropdown-hover !z-[60]'>
        {is_playlist && disabled ? (
          <div className='flex items-center justify-center w-full h-11 bg-sroom-black-400'>
            <LoadingSpinner className='text-sroom-brand loading-sm' />
          </div>
        ) : (
          <>
            <Button
              onClick={() => {}}
              className='w-full h-11 peer text-sroom-white bg-sroom-black-400 md:text-base'
            >
              {isLoading ? (
                <LoadingSpinner className='text-sroom-brand loading-sm' />
              ) : (
                buttonTitle
              )}
            </Button>
            <div className='w-full pt-5 dropdown-content'>
              <ul className='relative border bg-sroom-white border-sroom-gray-500'>
                {is_playlist ? (
                  <PlaylistEnrollment courses={courses} />
                ) : (
                  <VideoEnrollment courses={courses} />
                )}
                <span className='absolute -top-[0.3px] w-3 h-3 rotate-45 -translate-x-1/2 -translate-y-1/2 border-t bg-sroom-white border-l left-10 border-l-gray-200 border-t-sroom-gray-500 peer-first-of-type:peer-hover:bg-sroom-brand' />
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
}
