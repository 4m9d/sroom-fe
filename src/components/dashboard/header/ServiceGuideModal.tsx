'use client';
import { NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css';
import Modal from '../../ui/Modal';
import { ModalIDs } from '@/src/constants/modal/modal';
import { closeModalHandler } from '@/src/util/modal/modalHandler';
import { ExtendedRecordMap } from 'notion-types';

type Props = {
  recordMap: ExtendedRecordMap;
};

export default function ServiceGuideModal({ recordMap }: Props) {
  return (
    <Modal
      id={ModalIDs.SERVICE_GUIDE}
      className='min-w-[60vw]'
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
