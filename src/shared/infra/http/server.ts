import { env } from '@/env'
import { app } from './app'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('🚀 HTTP Server Running!')
  })

enum Signals {
  SIGHUP = 1,
  SIGINT = 2,
  SIGTERM = 15,
}

const shutdown = (signal: string, value: number) => {
  console.log('Shutdown!')

  app.close(() => {
    console.log(`Server stopped by ${signal} with value ${value}`)
    process.exit(128 + value)
  })
}

Object.keys(Signals).forEach((signal) => {
  process.on(signal, () => {
    console.log(`Process received a ${signal} signal`)
    shutdown(signal, Signals[signal as keyof typeof Signals])
  })
})
