'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Thumbs } from '@/public/icons/icons';
import { submitCourseMaterialFeedback } from '@/src/api/materials/materials';
import { QueryKeys } from '@/src/api/queryKeys';
import Button from '@/src/components/ui/button/Button';
import FeedbackMessage from '@/src/components/ui/feedback/FeedbackMessage';
import { ONE_SECOND_IN_MS } from '@/src/constants/time/time';

type Props = {
  courseVideoId: number;
  materialType: CourseMaterialType;
  materialId: number;
};

export default function CourseMaterialFeedback({
  courseVideoId,
  materialType,
  materialId
}: Props) {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (feedback: SubmitFeedbackParams) =>
      submitCourseMaterialFeedback(materialType, materialId, feedback),
    {
      onSuccess: () => {
        setIsEnrolled(() => true);
        setTimeout(() => {
          queryClient.invalidateQueries([
            QueryKeys.COURSE_MATERIAL,
            courseVideoId.toString()
          ]);
        }, ONE_SECOND_IN_MS);
      }
    }
  );

  return (
    <div className='flex items-center justify-end w-full gap-1'>
      {isEnrolled === false ? (
        <>
          <Button
            onClick={() => mutate({ is_satisfactory: true })}
            className='!rounded-md cursor-pointer stroke-sroom-black-100 hover:stroke-sroom-brand hover:bg-sroom-brand hover:bg-opacity-20 !p-0 !w-7 !h-7'
          >
            <Thumbs direction='up' />
          </Button>
          <Button
            onClick={() => mutate({ is_satisfactory: false })}
            className='!rounded-md cursor-pointer stroke-sroom-black-100 hover:stroke-sroom-brand hover:bg-sroom-brand hover:bg-opacity-20 !p-0 !w-7 !h-7'
          >
            <Thumbs direction='down' />
          </Button>
        </>
      ) : (
        <FeedbackMessage message='의견을 제출했어요!' type='normal' />
      )}
    </div>
  );
}
