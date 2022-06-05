FROM node:18-alpine3.14

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3001

CMD ["npm","start"]