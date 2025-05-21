FROM node:latest AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . . 
RUN npx nx build api

FROM node:latest AS runner

WORKDIR /app

COPY --from=builder /app/apps/api/dist/ .
RUN npm ci

ENV SESSION_SECRET=GUqWb/05pElEMvqRBcwErjrpmRXtc7Dd1bBqaHx/4zc=

EXPOSE 3333

CMD ["node", "main.js"]

