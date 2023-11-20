'use client';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import MaterialPDFDocument from './MaterialPDFDocument';
import LoadingSpinner from '../../ui/LoadingSpinner';
import DownloadSVG from '@/public/icon/Download';
import Button from '../../ui/button/Button';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/src/api/queryKeys';
import { fetchCourseMaterialWorkbook } from '@/src/api/courses/courses';
import { ONE_SECOND_IN_MS } from '@/src/constants/time/time';
import CourseMaterialLoading from '../../course/drawer/courseMaterial/CourseMaterialLoading';

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
  const { data, status } = useQuery(
    [QueryKeys.MATERIAL_EXPORT, courseId],
    () => fetchCourseMaterialWorkbook(parseInt(courseId)),
    {
      refetchInterval(data) {
        return data?.status === STATUS.PENDING ? REFETCH_INTERVAL : false;
      },
      refetchIntervalInBackground: true
    }
  );
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      {status === 'loading' ? (
        <LoadingSpinner className='text-sroom-brand' />
      ) : (
        <>
          {data && data.status === STATUS.SUCCESS ? (
            <>
              <PDFDownloadLink
                document={<MaterialPDFDocument materials={data} />}
                fileName={`${courseTitle}.pdf`}
                className='flex w-full'
              >
                {({ loading }) =>
                  loading ? (
                    <LoadingSpinner className='text-sroom-brand' />
                  ) : (
                    <div className='flex flex-col items-center justify-center w-full h-full gap-10'>
                      <Button
                        className='flex text-sroom-brand'
                        hoverEffect={true}
                      >
                        <p className='text-base font-semibold'>저장하기</p>
                        <span className='w-6 h-6'>
                          <DownloadSVG />
                        </span>
                      </Button>
                    </div>
                  )
                }
              </PDFDownloadLink>
              <PDFViewer width={100} height={100} className='w-full h-full'>
                <MaterialPDFDocument materials={data} />
              </PDFViewer>
            </>
          ) : (
            <CourseMaterialLoading />
          )}
        </>
      )}
    </div>
  );
}
