import { fetchLectureDetail } from '@/src/api/lectures/search';
import LectureDetailModal from '@/src/components/lectureDetail/LectureDetailModal';

export default async function LectureDetailModalIntercepter({
  params: { lecture_code }
}: LectureDetailModalParams) {
  const lectureDetail = await fetchLectureDetail(lecture_code);

  return (
    <LectureDetailModal lectureDetail={lectureDetail} navigationType='soft' />
  );
}
//NOTE: 수정하면, search/[lectureCode]/page 에서도 수정해야함
