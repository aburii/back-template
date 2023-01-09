# Base image
FROM node:18 as builder
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY ./ ./


FROM builder AS production
RUN yarn build
CMD [ "yarn", "start:prod" ]


FROM builder AS development
CMD [ "yarn", "start:dev" ]