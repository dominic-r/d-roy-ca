FROM mirror.gcr.io/oven/bun:1.3.5-alpine@sha256:7156fcc0cee0194d390bfaf7f0eeda9a5e383e70cc90f31aad3a2440a033d7dc AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM mirror.gcr.io/oven/bun:1.3.5-alpine@sha256:7156fcc0cee0194d390bfaf7f0eeda9a5e383e70cc90f31aad3a2440a033d7dc
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=80

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/VERSIONFILE /app/VERSIONFILE
COPY --from=builder /app/package.json /app/package.json

EXPOSE 80
CMD ["bun", "dist/server.js"]
