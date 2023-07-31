import { fetchDashboardInfo } from '@/src/api/dashboards/dashboards';
import { fetchLectureRecommendations } from '@/src/api/lectures/search';
import DashboardHeader from '@/src/components/dashboard/header/DashboardHeader';
import LatestLearningLecturesList from '@/src/components/dashboard/latestLearning/LatestLearningLecturesList';
import MainDashboard from '@/src/components/dashboard/main/MainDashboard';
import LectureRecommendationsList from '@/src/components/recommendations/LectureRecommendationsList';

export default async function Dashboard() {
  //const dashboardInfo = await fetchDashboardInfo();
  //const recommendations = await fetchLectureRecommendations();

  const dashboardInfo = {
    correctness_rate: 30,
    completion_rate: 57,
    total_learning_time: 1000,
    motivation: '13일 연속으로 학습 중이에요!',
    latest_lectures: [
      {
        course_id: 'k23ks2',
        channels: '경식손',
        thumbnail:
          'https://i.ytimg.com/vi/05uFo_-SGXU/mqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAcDInNl1_dnjgtKO7RvKnx7ezQYw',
        course_title:
          '오늘부터 나도 리액트 마스터! 혹시... 나랑 같이 TODO 리스트 만들어보지 않을래? ^^ 두 줄이 넘어가나요?',
        duration: 71,
        last_view_time: '2023-07-27 10:30:21',
        total_video_count: 10,
        completed_video_count: 9,
        progress: 90
      },
      {
        course_id: 'dnvoi23409n',
        channels:
          '나는야 천하 무적 경식용사, 손경식 개인 비서, 손경식 개인 비서 2, 손경식 컴퍼니, 손경식 컴퍼니 에이전시, 정두원, 이종준',
        thumbnail:
          'https://i.ytimg.com/vi/IDjZO6WPFzs/mqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAcDInNl1_dnjgtKO7RvKnx7ezQYw',
        course_title: '메이플 아란 육성 가이드',
        duration: 35,
        last_view_time: '2023-04-13 13:20:22',
        total_video_count: 9,
        completed_video_count: 2,
        progress: 22
      }
    ],
    learning_histories: [
      {
        date: '2023-07-12',
        learning_time: 23,
        quiz_count: 4,
        lecture_count: 2
      },
      {
        date: '2023-07-10',
        learning_time: 15,
        quiz_count: 1,
        lecture_count: 1
      }
    ]
  };
  const recommendations = {
    recommendations: [
      {
        lecture_title: '독일어 회화 표현 50가지 / 초심자용',
        description:
          '저번 라이브 때 반응 폭발했던 독일어 회화 문장 익히기!!😆 그런데 독일어 초심자 분들께는 좀 어려운 내용이었던 것같아서, 이번에는 진짜진짜 쉽고 짧은 딱 한 두마디짜리 표현들로만 엄선했습니다. 응용할 필요조차도 없어요. 그냥 이대로 연습해서 이대로 써먹으시면 됩니다!',
        channel: '독일 유학파 경식 용사',
        lecture_code: 'IDtHxkzhXGg',
        is_playlist: true,
        rating: 4.5,
        review_count: 234,
        thumbnail: 'https://i.ytimg.com/vi/IDtHxkzhXGg/mqdefault.jpg'
      },
      {
        lecture_title:
          '딥러닝 모델의 강건성(Robustness) 향상시키기: AugMix, AugMax, Adversarial Training (데이터의 손상에 대응하는 방법)',
        description:
          '현실 세계에서 딥러닝 모델을 배포할 때는 사용자로부터 다양한 손상된 데이터를 입력으로 받게 됩니다. 따라서, 딥러닝 모델은 현실 세계의 다양한 테스트 데이터에 대하여 강건성(robustness)을 가질 필요가 있습니다. 본 영상에서는 손상된 데이터(corrupted data) 및 적대적 예제(adversarial example)에 대하여 딥러닝 모델이 강건하게 동작하도록 만드는 방법을 설명합니다. 구체적으로 FGSM (ICLR 2015), Adversarial Training (ICLR 2018), AugMix (ICLR 2020), AugMax (NeurIPS 2021)에 대해 차례대로 소개합니다.',
        channel: '경식손',
        lecture_code: 'TPujPAtsH8A',
        is_playlist: false,
        rating: 2.7,
        review_count: 120,
        thumbnail: 'https://i.ytimg.com/vi/TPujPAtsH8A/mqdefault.jpg'
      },
      {
        lecture_title: '진짜 대한민국 평균 인생에 대해 알아보자',
        description:
          '. 업로드 일정 : 매주 토요일 오전 11시. 영상 편집 툴 : Premiere Pro, After Effect. Ending BGM : Feeling Alright - Gavin Luke. 비즈니스 문의 : scopepublic@naver.com. 욕설, 혐오 및 차별 표현, 타인에 대한 공격, 가짜 뉴스, 링크 등이 포함된 댓글은 삭제됩니다.',
        channel: '손경식의 지식 한입',
        lecture_code: 'wVGJmZaB6q0',
        is_playlist: true,
        rating: 2.5,
        review_count: 4,
        thumbnail: 'https://i.ytimg.com/vi/wVGJmZaB6q0/mqdefault.jpg'
      },
      {
        lecture_title: "SonJeans (손진스) 'ETA'Dance Practice",
        description:
          "SonJeans (손진스) 'ETA'Dance Practice ⓒ 2023 4M9D. All Rights Reserved.",
        channel: '손진스',
        lecture_code: 'zzwWzLY7kEo',
        is_playlist: false,
        rating: 0,
        review_count: 0,
        thumbnail: 'https://i.ytimg.com/vi/zzwWzLY7kEo/mqdefault.jpg'
      },
      {
        lecture_title:
          "한살이라도 어릴 때 '이 운동' 반드시 시작해야 합니다. (벌크업/린매스업/상승다이어트/식단)",
        description: '🔥 머슬부스터🔥 시트루 아르기닌 5+3 특가 혜택',
        channel: '헬트 손경식',
        lecture_code: 'TaU1pKMDESQ',
        is_playlist: false,
        rating: 0,
        review_count: 0,
        thumbnail: 'https://i.ytimg.com/vi/TaU1pKMDESQ/mqdefault.jpg'
      }
    ]
  };
  const latestLearningLectures = dashboardInfo.latest_lectures;
  const recommendedLectures = recommendations.recommendations;
  const isEnrolled = latestLearningLectures.length > 0;

  return (
    <div>
      <DashboardHeader isEnrolled={isEnrolled} />
      <MainDashboard dashboardInfo={dashboardInfo} />
      {isEnrolled && (
        <LatestLearningLecturesList
          latestLearningLectures={latestLearningLectures}
        />
      )}
      <LectureRecommendationsList recommendations={recommendedLectures} />
    </div>
  );
}
