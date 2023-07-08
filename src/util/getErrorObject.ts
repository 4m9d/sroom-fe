export default function getErrorObject(message: string) {
  return {
    type: 'error',
    title: '에러 발생',
    description: message
  } as ErrorToast;
}
