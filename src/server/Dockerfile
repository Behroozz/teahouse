FROM node:11-alpine

LABEL author="Behrooz Tabesh"

WORKDIR /server

COPY package.json ./
COPY package-lock.json ./

RUN npm install

EXPOSE 8000

CMD [ "node", "app.js" ]
