import { fetchRoutes } from '../api/routes.api';
import { useAsync } from './use-async';

export function useRoutes() {
  return useAsync(fetchRoutes, []);
}
