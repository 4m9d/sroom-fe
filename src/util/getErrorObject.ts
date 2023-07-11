export default function getErrorObject(description: string) {
  return {
    type: 'error',
    title: '에러 발생',
    description
  } as ErrorToast;
}
