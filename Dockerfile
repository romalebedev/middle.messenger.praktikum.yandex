FROM node:14-alpine
RUN apk add g++ make python
WORKDIR /app 
COPY package.json ./package.json
RUN npm install
COPY . .
RUN npm run build 
EXPOSE 3000
CMD node server.js