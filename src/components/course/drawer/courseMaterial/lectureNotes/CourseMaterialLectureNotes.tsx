'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import EasyMDE from 'easymde';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState
} from 'react';
import { SimpleMdeReact } from 'react-simplemde-editor';
import { PencilSVG } from '@/public/icons/icons';
import { ClipboardSVG } from '@/public/icons/icons';
import { updateCourseLectureNotes } from '@/src/api/materials/materials';
import { QueryKeys } from '@/src/api/queryKeys';
import Button from '@/src/components/ui/button/Button';
import 'easymde/dist/easymde.min.css';
import FeedbackMessage from '@/src/components/ui/feedback/FeedbackMessage';
import { SessionStorageKeys } from '@/src/constants/courseTaking/courseTaking';
import { ONE_SECOND_IN_MS } from '@/src/constants/time/time';
import getRelativeTime from '@/src/util/time/getRelativeTime';
import CourseMaterialFeedback from '../CourseMaterialFeedback';

const MarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
);

type Props = {
  lectureNotes: LectureNote;
  courseVideoId: number;
  handleTimestampClick: (formattedTimestamp: string) => void;
};
const DEBOUNCE_TIME = ONE_SECOND_IN_MS / 2;

export default function CourseMaterialLectureNotes({
  lectureNotes,
  courseVideoId,
  handleTimestampClick
}: Props) {
  const sessionStorageContentKey = `${SessionStorageKeys.LECTURE_NOTES}-${courseVideoId}`;
  const sessionStorageIsEditModeKey = `${SessionStorageKeys.LECTURE_NOTES_IS_EDIT_MODE}-${courseVideoId}`;

  const [isEditMode, setIsEditMode] = useState(
    sessionStorage.getItem(sessionStorageIsEditModeKey) === 'true'
      ? true
      : false
  );
  const [isCopied, setIsCopied] = useState(false);
  const [content, setContent] = useState(lectureNotes.content);
  const queryClient = useQueryClient();

  const onContentChange = useCallback((value: string) => {
    setContent(() => value);
  }, []);

  const editorOptions: EasyMDE.Options = useMemo(() => {
    return {
      spellChecker: false,
      autoDownloadFontAwesome: true,
      uploadImage: false
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

  const copyTextExcludingButtons = useCallback(() => {
    const buttonRegex = /<button[^>]*class="timestamp"[^>]*>.*?<\/button>/g;

    navigator.clipboard.writeText(content.replace(buttonRegex, ''));
  }, [content]);

  const copyButtonClickHandler = useCallback(() => {
    setIsCopied(() => true);
    copyTextExcludingButtons();

    setTimeout(() => {
      setIsCopied(() => false);
    }, 2000);
  }, [copyTextExcludingButtons]);

  const toggleButtonClickHandler = useCallback(() => {
    if (isEditMode) {
      mutate();
    }
    setIsEditMode((prev) => !prev);
  }, [isEditMode, mutate]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      sessionStorage.setItem(sessionStorageContentKey, content);
      sessionStorage.setItem(
        sessionStorageIsEditModeKey,
        isEditMode.toString()
      );
    }, DEBOUNCE_TIME);
    return () => {
      clearTimeout(debounceTimer);
      if (!isEditMode) {
        sessionStorage.removeItem(sessionStorageContentKey);
      }
    };
  }, [
    isEditMode,
    content,
    sessionStorageContentKey,
    sessionStorageIsEditModeKey
  ]);

  useEffect(() => {
    const listeners: { [key: string]: () => void } = {};

    setTimeout(() => {
      const timestampButtons = document.querySelectorAll('button.timestamp');
      timestampButtons.forEach((timestampButton) => {
        const clickHandler = () => {
          handleTimestampClick(timestampButton.innerHTML);
        };

        listeners[timestampButton.innerHTML] = clickHandler;

        timestampButton.addEventListener('click', clickHandler);
      });
    }, 500);

    return () => {
      const timestampButtons = document.querySelectorAll('button.timestamp');
      timestampButtons.forEach((timestampButton) => {
        const clickHandler = listeners[timestampButton.id];
        if (clickHandler) {
          timestampButton.removeEventListener('click', clickHandler);
        }
      });
    };
  });

  useLayoutEffect(() => {
    setContent(
      () =>
        sessionStorage.getItem(sessionStorageContentKey) ?? lectureNotes.content
    );
  }, [lectureNotes.content, sessionStorageContentKey]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`min-w-full max-w-full my-10 flex flex-col justify-center items-center gap-10 text-sroom-black-400`}
      >
        <div className='w-full mx-2'>
          {isEditMode ? (
            <SimpleMdeReact
              options={editorOptions}
              value={content}
              style={{ width: '100%', height: '100%' }}
              onChange={onContentChange}
            />
          ) : (
            <div className='h-full max-w-full min-w-full p-5 border rounded-md border-sroom-gray-500'>
              <MarkdownPreview
                source={content}
                wrapperElement={{ 'data-color-mode': 'light' }}
                className='max-w-full min-w-full markdown-preview'
              />
            </div>
          )}
          <div className='flex flex-col items-end justify-between w-full gap-1 mt-2'>
            <span className='text-sm font-normal text-sroom-black-200'>
              {`${getRelativeTime(lectureNotes.modified_at)}${
                lectureNotes.is_modified ? ' (수정됨)' : ''
              }`}
            </span>
            {lectureNotes.feedback_info.available === true &&
              lectureNotes.feedback_info.has_feedback === false && (
                <CourseMaterialFeedback
                  courseVideoId={courseVideoId}
                  materialId={lectureNotes.id}
                  materialType='summary'
                />
              )}
          </div>
        </div>
        <div className='w-full'>
          <Button
            onClick={copyButtonClickHandler}
            className='w-full mb-1 border py-7 border-sroom-black-400 bg-sroom-white'
          >
            <span className='w-5 mr-3 stroke-sroom-black-400'>
              <ClipboardSVG />
            </span>
            복사하기
          </Button>
          {isCopied && (
            <FeedbackMessage
              type='success'
              message='클립보드에 복사되었어요!'
            />
          )}
          <Button
            onClick={toggleButtonClickHandler}
            className='w-full mt-2 border py-7 border-sroom-black-400 bg-sroom-white'
          >
            <span className='w-5 mr-3 stroke-sroom-black-400'>
              <PencilSVG />
            </span>
            {isEditMode ? '저장하기' : '수정하기'}
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
