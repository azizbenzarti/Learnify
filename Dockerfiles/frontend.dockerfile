# build with node serve with nginx

FROM node:18 as build

WORKDIR /app
COPY Frontend/package*.json ./
RUN npm install

COPY Frontend/ ./

RUN npm run build

FROM nginx:alpine
# Copies the built static files into the Nginx default directory
COPY --from=build /app/build /usr/share/nginx/html 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# build with node serve with nginx
