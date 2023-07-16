import { fetchLectureDetail } from '@/src/api/lectures/search';
import LectureDetailModal from '@/src/components/lectureDetail/LectureDetailModal';

export default async function LectureDetail({
  params: { lecture_code }
}: LectureDetailModalParams) {
  const lectureDetailData = fetchLectureDetail(lecture_code)
    .then((res) => res)
    .catch(() => null);

  const lectureDetail = await lectureDetailData;

  return (
    <LectureDetailModal lectureDetail={lectureDetail} navigationType='hard' />
  );
}
//NOTE: 수정하면, @modal/(.)search/[lectureCode]/page 에서도 수정해야함
