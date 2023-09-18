'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ClassroomCourseCard from './ClassroomCourseCard';
import CourseReviewModal from './review/CourseReviewModal';
import CourseDeleteModal from './delete/CourseDeleteModal';

type Props = {
  courses: Course[];
};

export default function ClassroomCourseList({ courses }: Props) {
  const [reviewCourseId, setReviewCourseId] = useState<number | null>(null);
  const [deleteCourseId, setDeleteCourseId] = useState<number | null>(null);

  return (
    <>
      <ul className='grid grid-cols-1 gap-5 lg:grid-cols-2 shrink-0'>
        {courses.map((course: Course) => (
          <motion.li layout key={course.course_id}>
            <ClassroomCourseCard
              course={course}
              setReviewCourseId={setReviewCourseId}
              setDeleteCourseId={setDeleteCourseId}
            />
          </motion.li>
        ))}
      </ul>
      {courses.length === 0 && (
        <div className='flex flex-col items-center justify-center w-full gap-6 mt-32 text-sroom-black-400'>
          <p className='text-2xl font-bold text-left md:text-3xl lg:text-4xl'>
            {'수강 중인 강의가 없어요 😅'}
          </p>
          <div className='flex flex-col items-center justify-center text-base font-medium text-left md:text-lg lg:text-xl text-sroom-black-100'>
            <p>{'듣고 싶은 강의를 마음껏 검색해 보세요!'}</p>
            <p>{'스룸이 찾아드릴게요 :)'}</p>
          </div>
        </div>
      )}
      <CourseReviewModal courseId={reviewCourseId} />
      <CourseDeleteModal
        courseId={deleteCourseId}
        courseTitle={
          courses.find((course) => course.course_id === deleteCourseId)
            ?.course_title
        }
      />
    </>
  );
}
