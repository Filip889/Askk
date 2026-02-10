FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV APP_ENV=docker
ENV PORT=3000

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

COPY --from=builder /app /app

EXPOSE 3000
HEALTHCHECK CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "index.js"]
