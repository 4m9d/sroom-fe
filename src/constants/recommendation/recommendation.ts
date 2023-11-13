export const RecommendationSectionHeading = {
  CHANNEL: '이런 강의는 어때요?',
  GENERAL: '스룸에서 인기 폭발한🔥 강의를 만나보세요!',
  SOCIETY: '복잡한 시사 상식📚, 스룸에서 끝내는 걸로 해요 :)',
  ECONOMIC: '어렵기만 한 경제💸, 쉽게 공부해 보세요',
  TECH: '빠르게 변하는 기술 소식🚀, 놓치지 마세요',
  SCIENCE: '신비로운 과학의 세계🧪, 지금 만나보세요'
} as const;

export type RecommendationSectionHeading =
  (typeof RecommendationSectionHeading)[keyof typeof RecommendationSectionHeading];
