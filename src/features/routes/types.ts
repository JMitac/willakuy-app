export type Place = {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  /** Radio de activación de la geovalla, en metros. */
  radiusM: number;
};

export type Route = {
  id: string;
  title: string;
  summary: string;
  durationMin: number;
  distanceKm: number;
  places: Place[];
};
