FROM node:10.16.0-alpine
RUN mkdir /app
ADD . /app
WORKDIR /app
EXPOSE 9000
RUN npm install
RUN npm run build
WORKDIR /app/server
RUN npm install
CMD npm start