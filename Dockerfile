FROM node:14-alpine
RUN apk add g++ make python
WORKDIR /app 
COPY package.json ./package.json
RUN npm install 
EXPOSE 3000
COPY . .
CMD node server.js