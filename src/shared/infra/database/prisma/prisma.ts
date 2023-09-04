import { env } from '@/env'
import { PrismaClient } from '@prisma/client'

// export const prisma = new PrismaClient({
//   log: env.NODE_ENV === 'dev' ? ['query'] : [],
// })

export const prisma = new PrismaClient({
  log:
    env.NODE_ENV === 'dev'
      ? [
          {
            emit: 'event',
            level: 'query',
          },
        ]
      : [],
})

prisma.$on('query', async (e) => {
  console.dir(`${e.query} ${e.params}`, { depth: null, colors: true })
})
