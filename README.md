# Student Life Monorepo

## Commands

```bash
npm run dev      # starts web + mobile + api in parallel
npm run build    # builds apps in the correct order
npm run lint     # runs lint across all apps
```

## Monorepo Structure

```text
student-life/                          <- monorepo root (git)
|
|-- package.json                       <- npm workspaces + turbo scripts
|-- package-lock.json
|-- turbo.json
|-- README.md
|
|-- apps/
|   |-- backend/
|   |   |-- api/                       <- NestJS REST API
|   |   |   |-- src/
|   |   |   |   |-- main.ts            <- entry point (port 3000)
|   |   |   |   |-- app.module.ts
|   |   |   |   |-- app.controller.ts
|   |   |   |   `-- app.service.ts
|   |   |   |-- test/
|   |   |   |-- package.json
|   |   |   |-- eslint.config.mjs
|   |   |   `-- tsconfig.json
|   |   |-- db/                        <- empty (planned: migrations, seeds)
|   |   `-- lib/                       <- empty (planned: shared backend utils)
|   |
|   |-- mobile/                        <- Expo React Native (iOS / Android)
|   |   |-- App.tsx
|   |   |-- app.json
|   |   |-- index.ts
|   |   |-- tsconfig.json
|   |   |-- package.json
|   |   `-- assets/
|   |
|   `-- web/                           <- Next.js (App Router)
|       |-- app/
|       |   |-- layout.tsx             <- root layout
|       |   |-- page.tsx               <- home page
|       |   `-- globals.css
|       |-- public/
|       |-- package.json
|       |-- eslint.config.mjs
|       |-- next.config.ts
|       `-- tsconfig.json
|
`-- packages/
    |-- eslint-config/                 <- empty (shared config package scaffold)
    |-- types/
    |   |-- src/
    |   |   |-- index.ts
    |   |   `-- user.ts
    |   |-- package.json
    |   `-- tsconfig.json
    `-- typescript-config/
        |-- base.json
        |-- nestjs.json
        |-- nextjs.json
        |-- react-native.json
        `-- package.json

Note: generated folders like `node_modules/` and `.next/` are intentionally omitted.
```

## Data Flow

```text
+-------------+      HTTP/REST      +------------------------+
|  web (Next) | ------------------->|                        |
+-------------+                     |   api (NestJS)         |
                                    |   apps/backend/api     |
+-------------+      HTTP/REST      |                        |
| mobile      | ------------------->|                        |
| (Expo RN)   |                     +-----------+------------+
+-------------+                                 |
                                                v
                                      apps/backend/db/
                                      (database to connect)
```
