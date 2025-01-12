import process from 'node:process'
import { addTypeTemplate, defineNuxtModule } from '@nuxt/kit'
import { type EnvGeneratorConfig, generateENV, getNuxtRuntimeEnvMap, getRootDir } from './logic'

interface Config extends Omit<EnvGeneratorConfig, 'dts'> {
  /** Expose env variables to nuxt runtime */
  runtime?: boolean
}

export default defineNuxtModule<Config>({
  meta: {
    name: 'monorepo-env',
    configKey: 'monorepoENV',
    compatibility: {
      nuxt: '>=3',
    },
  },

  defaults: {
    runtime: true,
  },

  setup(config, nuxt) {
    const mode = nuxt.options.vite.mode!
    const layers = nuxt.options._layers.map(e => e.cwd)

    const env = generateENV(mode, {
      ...config,
      dts: false,

      cwd: layers[0],
      dirs: [
        getRootDir(),
        ...layers.reverse(),
      ],
    })

    if (config.runtime) {
      const runtimeEnv = getNuxtRuntimeEnvMap(env.data)

      // Update runtime env
      Object.assign(nuxt.options.runtimeConfig, runtimeEnv.private)
      Object.assign(nuxt.options.runtimeConfig.public, runtimeEnv.public)
    }

    // Add vite types
    addTypeTemplate({
      filename: 'types/env.d.ts',
      getContents: () => env.dtsContent,
    })

    Object.assign(process.env, env.data)
  },
})
