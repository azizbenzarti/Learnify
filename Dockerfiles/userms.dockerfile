FROM node:18

WORKDIR /app

COPY Backend/user-service/package*.json ./
RUN npm install

COPY Backend/user-service ./

EXPOSE 3000
CMD ["node", "server.js"]
