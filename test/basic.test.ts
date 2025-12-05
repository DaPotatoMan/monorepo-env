import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
  })

  it('renders the index page', async () => {
    const html = await $fetch('/api/get-env')
    expect(html).toContain('VITE_APP_MODE = local-dev')
    expect(html).toContain('VITE_APP_IS_LOCAL = true')

    const runtimeEnv = await $fetch('/api/get-runtime-env')
    expect(runtimeEnv).toMatchSnapshot()
  })
})
