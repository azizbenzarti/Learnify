FROM node:18

WORKDIR /app

COPY Backend/ai-service/package*.json ./
RUN npm install

COPY Backend/ai-service ./

EXPOSE 5002
CMD ["node", "server.js"]
