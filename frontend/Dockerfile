FROM node:16-alpine

RUN mkdir -p /srv

WORKDIR /srv

COPY package*.json ./

RUN npm install --production
COPY . .

EXPOSE 3000

CMD "npm" "run" "dev"
