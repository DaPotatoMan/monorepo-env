import type { Plugin } from 'vite'
import type { EnvGeneratorConfig } from './logic'
import process from 'node:process'
import { generateENV } from './logic'

export default function (config: EnvGeneratorConfig = {}): Plugin {
  return {
    name: 'monorepo-env',
    enforce: 'pre',

    config(viteConfig, { mode }) {
      const env = generateENV(mode, config)
      Object.assign(process.env, env.data)
    },
  }
}
