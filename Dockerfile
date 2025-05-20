FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

COPY . ./

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env* ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 1211

ARG SCRIPT

ENV SCRIPT=${SCRIPT}

CMD npm run ${SCRIPT}
