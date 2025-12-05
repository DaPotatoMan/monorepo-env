import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/vite'],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
})
