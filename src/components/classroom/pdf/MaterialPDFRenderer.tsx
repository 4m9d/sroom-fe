'use client';
import DownloadSVG from '@/public/icon/Download';
import Button from '../../ui/button/Button';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/src/api/queryKeys';
import { fetchCourseMaterialWorkbook } from '@/src/api/courses/courses';
import { ONE_SECOND_IN_MS } from '@/src/constants/time/time';
import CourseMaterialLoading from '../../course/drawer/courseMaterial/CourseMaterialLoading';
import { useEffect, useState } from 'react';
import { wrap } from 'comlink';
import { GeneratePDF } from '@/src/util/pdf/pdfWorker';

type Props = {
  courseId: string;
  courseTitle: string;
};

const STATUS = {
  PENDING: 0,
  SUCCESS: 1
} as const;

const REFETCH_INTERVAL = 10 * ONE_SECOND_IN_MS;

export default function MaterialPDFRenderer({ courseId, courseTitle }: Props) {
  const [url, setUrl] = useState<string>();
  const [loading, setLoading] = useState(false);

  const { data, status } = useQuery(
    [QueryKeys.MATERIAL_EXPORT, courseId],
    () => fetchCourseMaterialWorkbook(parseInt(courseId)),
    {
      refetchInterval(data) {
        return data?.status === STATUS.PENDING ? REFETCH_INTERVAL : false;
      }
    }
  );

  useEffect(() => {
    if (data && data.status === STATUS.SUCCESS) {
      const worker = new Worker(
        new URL('@/src/util/pdf/pdfWorker.ts', import.meta.url)
      );
      const generatePDF = wrap<GeneratePDF>(worker);

      setLoading(true);
      generatePDF(data as CourseMaterialWorkbook)
        .then(setUrl)
        .finally(() => setLoading(false));

      return () => {
        if (url) {
          URL.revokeObjectURL(url);
          worker.terminate();
        }
      };
    }
  }, [data]);

  return (
    <div className='flex flex-col items-center justify-center w-full h-full gap-10'>
      {status === 'loading' || loading ? (
        <CourseMaterialLoading
          title='강의 자료를 PDF로 변환 중이에요!'
          description='강의 자료가 너무 많을 경우, 시간이 오래 걸릴 수 있어요'
        />
      ) : (
        <>
          {url ? (
            <>
              <a href={url} download={`${courseTitle}.pdf`}>
                <Button className='flex text-sroom-brand' hoverEffect={true}>
                  <p className='text-base font-semibold'>저장하기</p>
                  <span className='w-6 h-6'>
                    <DownloadSVG />
                  </span>
                </Button>
              </a>
              <iframe src={url} width='100%' height='100%' />
            </>
          ) : (
            <CourseMaterialLoading />
          )}
        </>
      )}
    </div>
  );
}
