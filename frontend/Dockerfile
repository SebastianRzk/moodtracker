# Stage 1
FROM node:17-slim as build-step-angular
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build --prod

# Assembly
FROM nginx:alpine
RUN mkdir -p /www
COPY site.conf /etc/nginx/conf.d/default.conf
COPY --from=build-step-angular /app/dist/moodtracker-frontend/ /www

