import { fetchLectureDetail } from '@/src/api/lectures/search';
import dynamic from 'next/dynamic';

const DynamicLectureDetailModal = dynamic(
  () => import('@/src/components/lectureDetail/LectureDetailModal'),
  { ssr: false }
);

export default async function LectureDetail({
  params: { lecture_code }
}: LectureDetailModalParams) {
  const lectureDetail = await fetchLectureDetail(lecture_code).then(
    (res) => res
  );

  return (
    <DynamicLectureDetailModal
      lectureDetail={lectureDetail}
      navigationType='hard'
    />
  );
}
//NOTE: 수정하면, @modal/(.)search/[lectureCode]/page 에서도 수정해야함
