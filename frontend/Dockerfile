FROM node:lts-alpine3.14
COPY public /app/public
COPY src /app/src
COPY package.json /app
COPY package-lock.json /app
WORKDIR /app
RUN npm install -g npm@8.11.0
RUN npm install
CMD npm start
