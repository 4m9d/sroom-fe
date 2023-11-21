import { ModalIDs } from '@/src/constants/modal/modal';
import Modal from '../../ui/Modal';
import { closeModalHandler } from '@/src/util/modal/modalHandler';
import MaterialPDFRenderer from './MaterialPDFRenderer';
import { Font } from '@react-pdf/renderer';

type Props = {
  courseId: number | null;
  courseTitle: string | null;
};
Font.register({
  family: 'MonoplexKR',
  fonts: [
    {
      src: '/fonts/MonoplexKR-Regular.ttf',
      fontWeight: 'normal',
      fontStyle: 'normal'
    },
    {
      src: '/fonts/MonoplexKR-Italic.ttf',
      fontWeight: 'normal',
      fontStyle: 'italic'
    },
    {
      src: '/fonts/MonoplexKR-Bold.ttf',
      fontWeight: 'bold',
      fontStyle: 'normal'
    },
    {
      src: '/fonts/MonoplexKR-BoldItalic.ttf',
      fontWeight: 'bold',
      fontStyle: 'italic'
    }
  ]
});

Font.register({
  family: 'Pretendard',
  fonts: [
    {
      fontWeight: 'normal',
      src: '/fonts/Pretendard-Regular.woff'
    },
    {
      fontWeight: 'medium',
      src: '/fonts/Pretendard-Medium.woff'
    },
    {
      fontWeight: 'semibold',
      src: '/fonts/Pretendard-SemiBold.woff'
    },
    {
      fontWeight: 'bold',
      src: '/fonts/Pretendard-Bold.woff'
    }
  ]
});

Font.registerEmojiSource({
  format: 'png',
  url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/'
});

export default function MaterialExportModal({ courseId, courseTitle }: Props) {
  return (
    <Modal
      id={ModalIDs.MATERIAL_EXPORT}
      className='w-[85vw] max-w-6xl px-12 py-16 rounded-none h-full'
      onClose={() => closeModalHandler('MATERIAL_EXPORT')}
    >
      <div className='flex flex-col items-center justify-between w-full h-full gap-10'>
        <div className='flex flex-col items-center justify-center h-16 gap-4'>
          <p className='text-xl font-bold'>강의 자료 내보내기</p>
          <p className='text-base font-medium'>
            {'강의 노트와 퀴즈를 PDF로 저장할 수 있어요!'}
          </p>
        </div>
        {courseId && courseTitle && (
          <MaterialPDFRenderer
            courseId={courseId.toString()}
            courseTitle={courseTitle}
          />
        )}
      </div>
    </Modal>
  );
}
