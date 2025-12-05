export default defineEventHandler(async (_event) => {
  const { app, nitro, ...env } = useRuntimeConfig()

  return env
})
