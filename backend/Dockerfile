FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

EXPOSE 3030

CMD ["npm", "run", "start:prod"]
