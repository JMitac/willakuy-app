import type { Route } from '../types';

// TODO: reemplazar por el cliente HTTP de shared/api cuando exista el backend
// (GET /routes y GET /routes/:id) y validar la respuesta con Zod.
const MOCK_ROUTES: Route[] = [
  {
    id: 'centro-historico',
    title: 'Centro Histórico de Lima',
    summary: 'De la Plaza de Armas a la Plaza San Martín entre virreyes y leyendas.',
    durationMin: 60,
    distanceKm: 2.4,
    places: [
      {
        id: 'plaza-de-armas',
        name: 'Plaza de Armas',
        description: 'Punto de fundación de Lima en 1535.',
        latitude: -12.04318,
        longitude: -77.02824,
        radiusM: 30,
      },
      {
        id: 'catedral-de-lima',
        name: 'Catedral de Lima',
        description: 'Guarda los restos de Francisco Pizarro.',
        latitude: -12.04629,
        longitude: -77.02978,
        radiusM: 30,
      },
    ],
  },
  {
    id: 'barranco-bohemio',
    title: 'Barranco bohemio',
    summary: 'Puentes, casonas y el distrito de los artistas.',
    durationMin: 45,
    distanceKm: 1.8,
    places: [
      {
        id: 'puente-de-los-suspiros',
        name: 'Puente de los Suspiros',
        description: 'Leyenda de enamorados sobre la Bajada de los Baños.',
        latitude: -12.14956,
        longitude: -77.02224,
        radiusM: 30,
      },
    ],
  },
];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchRoutes(): Promise<Route[]> {
  await wait(300);
  return MOCK_ROUTES;
}

export async function fetchRoute(routeId: string): Promise<Route | null> {
  await wait(300);
  return MOCK_ROUTES.find((route) => route.id === routeId) ?? null;
}
