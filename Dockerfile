FROM node:18-alpine AS stage

RUN mkdir app
WORKDIR /app
COPY . .

# install all dependencies
# generate prisma client
# run migrations on production database (maybe this step should be configured in a CI environment)
# build app from ts files
# remove node_modules content (except the .prisma folder containing the prisma client files)
# remove other unneeded files as well as the source ts files
# remove .env file as env variables should be configured through docker env parameters
RUN npm ci && \
  npm run prisma:generate && \
  # npm run prisma:migrate-deploy && \
  npm run build && \
  cp -R node_modules/.prisma . && \
  rm -rf node_modules && \
  rm -rf src && \
  rm -rf prisma && \
  rm -rf test && \
  rm tsconfig.json && \
  rm docker.env && \
  rm .env

# CMD [ "npm", "prisma:migrate-deploy" ]

# create a new stage coping all the needed generated files from the previous one
FROM node:18-alpine

# now the working directory is under the build folder
RUN mkdir app
WORKDIR /app
COPY --from=stage /app .

# run npm ci to install other needed production dependencies only
RUN npm ci --omit=dev && \
  apk add --no-cache bash && \
  cp -R .prisma node_modules && \
  rm -rf .prisma

# start the application
# EXPOSE 3333
# CMD [ "node", "./build/shared/infra/http/server.js" ]
CMD [ "npm", "start" ]