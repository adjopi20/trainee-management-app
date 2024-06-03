#stage 0: compile anggular frontend
FROM node:alpine as build
WORKDIR /app
COPY package*.json package-lock*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build --prod

#stage 1: serve app
FROM nginx:alpine
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80

