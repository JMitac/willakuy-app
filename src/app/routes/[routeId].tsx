import { useLocalSearchParams } from 'expo-router';

import { RouteDetailScreen } from '@/features/routes';

export default function RouteDetail() {
  const { routeId } = useLocalSearchParams<{ routeId: string }>();
  return <RouteDetailScreen routeId={routeId} />;
}
