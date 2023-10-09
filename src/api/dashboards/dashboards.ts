import { getAuthorizedHeaders } from '@/src/util/http/getAuthorizedHeaders';
import { Endpoints } from '../Endpoints';
import { ErrorMessage } from '../ErrorMessage';
import { fetchErrorHandling } from '@/src/util/http/fetchErrorHandling';

export async function fetchDashboardInfo() {
  const headers = await getAuthorizedHeaders();
  return await fetch(`${Endpoints.DASHBOARDS}`, {
    method: 'GET',
    headers
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<DashboardInfo>;
    } else {
      return fetchErrorHandling(res, ErrorMessage.DASHBOARDS);
    }
  });
}
