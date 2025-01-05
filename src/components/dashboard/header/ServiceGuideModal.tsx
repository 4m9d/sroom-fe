'use client';
import { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css';
import { ModalIDs } from '@/src/constants/modal/modal';
import { closeModalHandler } from '@/src/util/modal/modalHandler';
import Modal from '../../ui/Modal';

type Props = {
  recordMap: ExtendedRecordMap;
};

export default function ServiceGuideModal({ recordMap }: Props) {
  return (
    <Modal
      id={ModalIDs.SERVICE_GUIDE}
      className='min-w-[80vw] rounded-none'
      onClose={() => closeModalHandler('SERVICE_GUIDE', () => {})}
    >
      <NotionRenderer
        className='w-full'
        recordMap={recordMap}
        fullPage={true}
        darkMode={false}
        disableHeader
        isImageZoomable={false}
      />
    </Modal>
  );
}
