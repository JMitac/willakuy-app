# Willakuy App

App móvil de turismo "manos libres" para Lima: detecta por GPS los lugares cercanos y reproduce relatos en audio. Construida con React Native + Expo (SDK 58) y Expo Router.

## Requisitos

| Herramienta    | Versión                                     |
| -------------- | ------------------------------------------- |
| Node.js        | 24.11.0                                     |
| Expo SDK       | 58 (`expo ~58.0.23`)                        |
| Expo Go en iOS | client-version 58.0.5, supported SDK 58.0.0 |

Este proyecto está configurado para que corra sin problemas en Expo Go de iOS con esos valores. No cambies la versión de `expo` sin validar que Expo Go siga siendo compatible.

## Cómo levantar el proyecto

```bash
npm install
```

### Con Expo Go en iPhone (recomendado)

1. Instala **Expo Go** desde la App Store e inicia sesión con tu cuenta de Expo.
2. Genera un token en [expo.dev](https://expo.dev) → Account settings → Access tokens.
3. En **PowerShell** (no en Git Bash), dentro de `willakuy-app`:

```powershell
$env:EXPO_TOKEN="TOKENCITO"
npx expo whoami
npx expo start
```

1. Escanea el QR de la terminal con la cámara del iPhone, que abre Expo Go.

Notas:

- `npx expo whoami` debe mostrar tu usuario. Si dice que no hay sesión, el token no se aplicó.
- Usa PowerShell: en Git Bash/mintty el CLI entra en modo no interactivo y no muestra el QR.
- El `EXPO_TOKEN` solo vive en esa ventana de PowerShell; hay que definirlo de nuevo en cada terminal nueva.
- El token es secreto: no lo subas al repositorio.
- iPhone y PC deben estar en la misma red. Si no conecta, usa `npx expo start --tunnel`.

### Otras plataformas

```bash
npx expo start --android   # emulador Android (o presiona "a")
npx expo start --web       # navegador
```

El simulador de iOS solo existe en Mac.

> Expo Go sirve para la interfaz, la navegación y los datos mock. Las geovallas en segundo plano, el audio en segundo plano y `react-native-maps` con Google Maps necesitan un _development build_.

## Estructura del proyecto

### Estructura objetivo

```
willakuy-app/
├── src/
│   ├── app/                  # rutas (la plantilla SDK 58 ya usa src/app)
│   │   ├── _layout.tsx       # providers: QueryClient, i18n, tema
│   │   ├── index.tsx         # redirige a onboarding o inicio
│   │   ├── onboarding.tsx
│   │   ├── permissions.tsx
│   │   ├── (tabs)/           # index (rutas) y settings
│   │   ├── routes/[routeId].tsx
│   │   ├── tour/[routeId].tsx
│   │   ├── tour/summary.tsx
│   │   ├── places/[poiId].tsx
│   │   └── player.tsx        # modal
│   ├── features/
│   │   ├── onboarding/
│   │   ├── routes/           # components, hooks, api (+Zod), index.ts
│   │   ├── tour/             # components, store (Zustand), tasks/geofence.task.ts
│   │   ├── places/
│   │   ├── player/
│   │   └── settings/
│   └── shared/
│       ├── ui/               # Button, Card, BottomSheet, map/WillakuyMap.tsx
│       ├── theme/  api/  location/  audio/  i18n/  config/  lib/
├── assets/
├── e2e/                      # Maestro
├── app.config.ts             # variantes dev/qa/prod
└── eas.json
```

Reglas de dependencia: `app/` usa `features` y `shared`; una feature no importa el interior de otra (solo su `index.ts`); `shared` nunca importa de `features`.

### Estructura actual (implementada)

```
src/
├── app/                          # rutas delgadas (solo componen pantallas)
│   ├── _layout.tsx               # Stack + tema claro/oscuro
│   ├── index.tsx                 # → RoutesListScreen
│   └── routes/[routeId].tsx      # → RouteDetailScreen
├── features/routes/
│   ├── api/routes.api.ts         # datos mock (2 rutas de Lima)
│   ├── components/route-card.tsx
│   ├── hooks/                    # use-routes, use-route, use-async
│   ├── screens/                  # lista y detalle
│   ├── types.ts
│   └── index.ts                  # API pública de la feature
├── shared/
|   |
|   ├── ui/ (themed-text, themed-view)   theme/
|   └── api, location, audio, i18n, config, lib   # vacías con .gitkeep
├── e2e/                             # vacía, para Maestro
```
