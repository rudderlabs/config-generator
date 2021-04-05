FROM node:10.16.0-alpine
RUN mkdir /app
ADD . /app
WORKDIR /app
EXPOSE 9000
RUN npm install
RUN REACT_APP_IS_SAVE_TO_FILE_ENABLED=true npm run build
WORKDIR /app/server
RUN npm install
CMD npm start
