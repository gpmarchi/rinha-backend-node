FROM node:18-alpine AS stage

RUN mkdir app
WORKDIR /app
COPY . .

RUN npm ci && \
  npm run prisma:generate && \
  npm run build && \
  cp -R node_modules/.prisma . && \
  rm -rf node_modules && \
  rm -rf src && \
  rm -rf test && \
  rm tsconfig.json && \
  rm .env

FROM node:18-alpine

RUN mkdir app
WORKDIR /app
COPY --from=stage /app .

RUN npm ci --omit=dev && \
  apk add --no-cache bash && \
  cp -R .prisma node_modules && \
  rm -rf .prisma

CMD [ "npm", "run", "start" ]