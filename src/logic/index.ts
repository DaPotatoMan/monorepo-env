import type { EnvMap, NuxtRuntimeEnvMap } from './types'
import fs from 'node:fs'
import process from 'node:process'
import { monorepoRootSync } from 'monorepo-root'
import { camelCase } from 'scule'
import { loadEnv } from 'vite'
import { createViteTypes } from './types'
import { resolvePath } from './utils'

export interface EnvGeneratorConfig {
  /**
   * Current project path
   * @default ```ts
   * process.cwd()
   * ```
   */
  cwd?: string

  /** Monorepo project root path */
  root?: string

  /**
   * List of directories to scan in low to high priority
   * @default [root,cwd]
   */
  dirs?: string[]

  /**
   * Path of env types
   * @default {cwd}/env.d.ts
   */
  dts?: boolean | `${string}.d.ts`

  /**
   * Prefixed env variables to load
   * @default ```ts
   * ['NUXT', 'VITE']
   * ```
   */
  prefixes?: string[]
}

export function getRootDir() {
  const path = monorepoRootSync()

  if (!path)
    throw new Error('Unable to determine project root.')

  return path
}

export function generateENV(mode: string, {
  cwd = process.cwd(),
  root = getRootDir(),
  dirs = [root, cwd],
  dts = true,
  prefixes = ['NUXT_', 'VITE_'],
}: Partial<EnvGeneratorConfig> = {}) {
  /** Parsed env map */
  const data = dirs.reduce(
    (map, path) => ({ ...map, ...loadEnv(mode, path, prefixes) }),
    {},
  )

  const dtsContent = createViteTypes(mode, data)

  // Generate dts file
  if (dts) {
    const dtsPath = resolvePath(typeof dts === 'string' ? dts : 'env.d.ts')
    fs.writeFileSync(dtsPath, dtsContent)
  }

  return { data, dtsContent }
}

export function getNuxtRuntimeEnvMap(baseENV: EnvMap) {
  const data: NuxtRuntimeEnvMap = {
    public: {},
    private: {},
  }

  for (const key in baseENV) {
    // Only handle NUXT_* keys
    if (!key.startsWith('NUXT_'))
      continue

    const isPublic = key.startsWith('NUXT_PUBLIC')
    const name = camelCase(
      key.replace(/NUXT_PUBLIC_|NUXT_/g, ''),
      { normalize: true },
    )

    // Add env to record
    data[isPublic ? 'public' : 'private'][name] = baseENV[key]
  }

  return data
}
