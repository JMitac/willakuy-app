import { Pressable, StyleSheet } from 'react-native';

import { Spacing } from '@/shared/theme/theme';
import { ThemedText } from '@/shared/ui/themed-text';
import { ThemedView } from '@/shared/ui/themed-view';

import type { Route } from '../types';

type RouteCardProps = {
  route: Route;
  onPress: (route: Route) => void;
};

export function RouteCard({ route, onPress }: RouteCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={route.title}
      onPress={() => onPress(route)}>
      <ThemedView type="backgroundElement" style={styles.card}>
        <ThemedText type="subtitle" style={styles.title}>
          {route.title}
        </ThemedText>
        <ThemedText themeColor="textSecondary">{route.summary}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {route.durationMin} min · {route.distanceKm} km · {route.places.length} lugares
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  title: {
    fontSize: 22,
    lineHeight: 28,
  },
});
