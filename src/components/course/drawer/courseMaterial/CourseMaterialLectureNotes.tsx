'use client';
import PencilSVG from '@/public/icon/Pencil';
import Button from '@/src/components/ui/button/Button';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useCallback, useMemo, useState } from 'react';
import { SimpleMdeReact } from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/src/api/queryKeys';
import { updateCourseLectureNotes } from '@/src/api/materials/materials';

const MarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
);

type Props = {
  lectureNotes: LectureNote;
  courseVideoId: number;
};

export default function CourseMaterialLectureNotes({
  lectureNotes,
  courseVideoId
}: Props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [content, setContent] = useState(lectureNotes.content);
  const queryClient = useQueryClient();

  const onContentChange = useCallback((value: string) => {
    setContent(() => value);
  }, []);

  const editorOptions = useMemo(() => {
    return {
      spellChecker: false,
      autoDownloadFontAwesome: true
    };
  }, []);

  const { mutate } = useMutation(
    [QueryKeys.LECTURENOTE, courseVideoId.toString()],
    () => updateCourseLectureNotes(courseVideoId, content),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          QueryKeys.COURSE_MATERIAL,
          courseVideoId.toString()
        ]);
      }
    }
  );

  const copyButtonClickHandler = useCallback(() => {
    setIsCopied(() => true);
    navigator.clipboard.writeText(content);

    setTimeout(() => {
      setIsCopied(() => false);
    }, 2000);
  }, [content]);

  const toggleButtonClickHandler = useCallback(() => {
    if (isEditMode) {
      mutate();
    }
    setIsEditMode((prev) => !prev);
  }, [isEditMode, mutate]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full my-10 flex flex-col justify-center items-center gap-10`}
      >
        {isEditMode ? (
          <SimpleMdeReact
            options={editorOptions}
            value={content}
            style={{ position: 'static' }}
            onChange={onContentChange}
          />
        ) : (
          <div className='w-full h-full p-5 border rounded-md border-sroom-gray-500'>
            <MarkdownPreview
              source={content}
              wrapperElement={{ 'data-color-mode': 'light' }}
            />
          </div>
        )}
        <div className='w-full'>
          <Button
            onClick={copyButtonClickHandler}
            className='w-full mb-1 border py-7 bg-sroom-black-400 text-sroom-white'
          >
            복사하기
          </Button>
          <AnimatePresence>
            {isCopied && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='text-xs font-medium text-sroom-green'
              >
                클립보드에 복사되었어요!
              </motion.span>
            )}
          </AnimatePresence>
          <Button
            onClick={toggleButtonClickHandler}
            className='w-full mt-2 border py-7 border-sroom-black-400 bg-sroom-white'
          >
            <span className='mr-5 stroke-sroom-black-400'>
              <PencilSVG />
            </span>
            {isEditMode ? '저장하기' : '수정하기'}
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
