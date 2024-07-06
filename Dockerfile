FROM node:21-alpine

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install

COPY . .

EXPOSE 6000

