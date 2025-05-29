FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY Backend/course-service/package*.json ./
RUN npm install

COPY Backend/course-service ./

EXPOSE 5000
CMD ["node", "index.js"]
