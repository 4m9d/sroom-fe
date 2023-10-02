export default function getPageTitle(pageTitle: string) {
  if (!pageTitle) return '스룸';
  return `${pageTitle} | 스룸`;
}
