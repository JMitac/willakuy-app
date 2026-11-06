import { Stack } from 'expo-router';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';

import { Spacing } from '@/shared/theme/theme';
import { ThemedText } from '@/shared/ui/themed-text';
import { ThemedView } from '@/shared/ui/themed-view';

import { useRoute } from '../hooks/use-route';

type RouteDetailScreenProps = {
  routeId: string;
};

export function RouteDetailScreen({ routeId }: RouteDetailScreenProps) {
  const route = useRoute(routeId);

  if (route.status === 'loading') {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  if (route.status === 'error' || route.data === null) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>No encontramos esta ruta.</ThemedText>
      </ThemedView>
    );
  }

  const { title, summary, durationMin, distanceKm, places } = route.data;

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title }} />
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="subtitle">{title}</ThemedText>
        <ThemedText themeColor="textSecondary">{summary}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {durationMin} min · {distanceKm} km
        </ThemedText>

        <ThemedText type="smallBold" style={styles.sectionTitle}>
          Lugares de la ruta
        </ThemedText>
        {places.map((place, index) => (
          <ThemedView key={place.id} type="backgroundElement" style={styles.place}>
            <ThemedText type="smallBold">
              {index + 1}. {place.name}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {place.description}
            </ThemedText>
          </ThemedView>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { padding: Spacing.three, gap: Spacing.two },
  sectionTitle: { marginTop: Spacing.three },
  place: { padding: Spacing.three, borderRadius: Spacing.three, gap: Spacing.one },
});
