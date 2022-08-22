# syntax=docker/dockerfile:1
FROM node:alpine as builder
WORKDIR /app
ADD . /app
RUN yarn install --production && \ 
    yarn build --production

FROM node:alpine
COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/build/ build
COPY --from=builder --chown=node:node /app/node_modules/ node_modules
COPY --from=builder --chown=node:node /app/public/ public
CMD yarn serve -s build
