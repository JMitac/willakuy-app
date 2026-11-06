import { fetchRoute } from '../api/routes.api';
import { useAsync } from './use-async';

export function useRoute(routeId: string) {
  return useAsync(() => fetchRoute(routeId), [routeId]);
}
