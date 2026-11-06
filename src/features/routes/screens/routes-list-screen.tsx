import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Spacing } from '@/shared/theme/theme';
import { ThemedText } from '@/shared/ui/themed-text';
import { ThemedView } from '@/shared/ui/themed-view';

import { RouteCard } from '../components/route-card';
import { useRoutes } from '../hooks/use-routes';

export function RoutesListScreen() {
  const router = useRouter();
  const routes = useRoutes();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          Willakuy
        </ThemedText>
        <ThemedText themeColor="textSecondary">Elige una ruta y empieza a caminar.</ThemedText>

        {routes.status === 'loading' && <ActivityIndicator style={styles.feedback} />}
        {routes.status === 'error' && (
          <ThemedText style={styles.feedback}>No pudimos cargar las rutas.</ThemedText>
        )}
        {routes.status === 'success' && (
          <FlatList
            data={routes.data}
            keyExtractor={(route) => route.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <RouteCard
                route={item}
                onPress={(route) =>
                  router.push({ pathname: '/routes/[routeId]', params: { routeId: route.id } })
                }
              />
            )}
          />
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, paddingHorizontal: Spacing.three, gap: Spacing.two },
  title: { fontSize: 36, lineHeight: 40 },
  list: { gap: Spacing.three, paddingVertical: Spacing.three },
  feedback: { marginTop: Spacing.four },
});
