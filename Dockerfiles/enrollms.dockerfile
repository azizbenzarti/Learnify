FROM node:18

WORKDIR /app

COPY Backend/enrollment-service/package*.json ./
RUN npm install

COPY Backend/enrollment-service ./

COPY Backend/user-service/middlewares/auth.js ./middlewares/auth.js


EXPOSE 5001
CMD ["node", "index.js"]
