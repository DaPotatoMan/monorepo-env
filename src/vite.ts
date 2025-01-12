import process from 'node:process'
import type { Plugin } from 'vite'
import { type EnvGeneratorConfig, generateENV } from './logic'

export default function (config: EnvGeneratorConfig = {}): Plugin {
  return {
    name: 'monorepo-env',
    enforce: 'pre',

    config(viteConfig, { mode }) {
      const env = generateENV(mode, config)

      Object.assign(process.env, env.data)
      return viteConfig
    },
  }
}
