FROM node:22-alpine AS base

WORKDIR /app

RUN apk add --no-cache openssl libc6-compat

COPY package.json ./
COPY package-lock.json ./
COPY apps/backend/api/package.json ./apps/backend/api/
COPY apps/backend/api/prisma ./apps/backend/api/prisma/

RUN npm ci --workspace=apps/backend/api --ignore-scripts
RUN npx prisma generate --schema=./apps/backend/api/prisma/schema.prisma

COPY . .

FROM base AS development

EXPOSE 3000 5555

CMD ["npm", "run", "start:dev", "--workspace=apps/backend/api"] 

FROM base AS builder

RUN npm run build --workspace=apps/backend/api


FROM node:22-alpine AS production

WORKDIR /app

RUN apk add --no-cache openssl libc6-compat

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma

RUN npx prisma generate --schema=./prisma/schema.prisma

EXPOSE 3000

CMD ["node", "dist/main.js"]