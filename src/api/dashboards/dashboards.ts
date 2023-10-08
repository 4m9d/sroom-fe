import { getAuthorizedHeaders } from '@/src/util/http/getAuthorizedHeaders';
import { Endpoints } from '../Endpoints';
import { API_FETCH_ERROR, ErrorMessage } from '../ErrorMessage';

export async function fetchDashboardInfo() {
  const headers = await getAuthorizedHeaders();
  return await fetch(`${Endpoints.DASHBOARDS}`, {
    method: 'GET',
    headers
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<DashboardInfo>;
    } else {
      return Promise.reject(
        new Error(ErrorMessage.DASHBOARDS, { cause: API_FETCH_ERROR })
      );
    }
  });
}
