FROM node:20.10.0-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

CMD [ "node", "dist/main.js" ]
