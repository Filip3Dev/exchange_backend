FROM node:18-alpine as builder

ENV NODE_ENV build

USER node

WORKDIR /home/node

COPY --chown=node:node package.json ./

RUN npm config set unsafe-perm true

RUN npm install --legacy-peer-deps

COPY --chown=node:node . .

RUN npm run build --prod

FROM node:18-alpine

ENV NODE_ENV production

RUN npm cache clean --force

RUN apk add git
RUN apk update && apk add bash

USER node

WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/ .

RUN ls -la 

RUN mkdir -p ./log

EXPOSE 8181

RUN git clone https://github.com/vishnubob/wait-for-it.git

