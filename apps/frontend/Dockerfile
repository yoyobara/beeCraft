FROM node:latest AS builder

WORKDIR /app

ARG NX_PUBLIC_API_URL

COPY package.json package-lock.json ./
RUN npm ci

COPY . . 
RUN npx nx build frontend

FROM nginx:stable

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]