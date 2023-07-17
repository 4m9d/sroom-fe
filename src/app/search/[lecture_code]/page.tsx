import { fetchLectureDetail } from '@/src/api/lectures/search';
import LectureDetailModal from '@/src/components/lectureDetail/LectureDetailModal';

export default async function LectureDetail({
  params: { lecture_code }
}: LectureDetailModalParams) {
  const lectureDetail = await fetchLectureDetail(lecture_code)
    .then((res) => res)

  return (
    <LectureDetailModal lectureDetail={lectureDetail} navigationType='hard' />
  );
}
//NOTE: 수정하면, @modal/(.)search/[lectureCode]/page 에서도 수정해야함
