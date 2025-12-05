# Monorepo Env

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Automatically merge/share env files between monorepo root and project.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/monorepo-env?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- 🌍 Supports both Nuxt & Vite
- 📦 Zero config. Get started without any hassle
- ⚙️ Automatic Nuxt runtime env handling
- 🔗 Loads env from Nuxt layers
- 📃 Auto generated types for env variables

## Nuxt Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add monorepo-env
```

That's it! You can now use monorepo-env in your Nuxt app ✨

### Nuxt Runtime

Only `NUXT_` prefixed variables are exposed to nuxt runtime (when enabled).

```bash
NUXT_KEY=my-private-key
NUXT_PUBLIC_KEY=my-public-key
```

The above env variables will become this in nuxt runtime:

```ts
$config.key
$config.public.key
```

## Vite Setup

Add the dependency

```bash
pnpm add -D monorepo-env
```

Setup `vite.config.ts`

```ts
import MonorepoENV from 'monorepo-env/vite'
import { defineConfig } from 'vite'

defineConfig({
  plugins: [
    MonorepoENV()
  ]
})
```

## Contribution

<details>
  <summary>Local development</summary>

  ```bash
  # Install dependencies
  npm install

  # Generate type stubs
  npm run dev:prepare

  # Develop with the playground
  npm run dev

  # Build the playground
  npm run dev:build

  # Run ESLint
  npm run lint

  # Run Vitest
  npm run test
  npm run test:watch

  # Release new version
  npm run release
  ```

</details>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/monorepo-env/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/monorepo-env

[npm-downloads-src]: https://img.shields.io/npm/dm/monorepo-env.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/monorepo-env

[license-src]: https://img.shields.io/npm/l/monorepo-env.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/monorepo-env

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
