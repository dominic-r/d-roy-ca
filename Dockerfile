FROM mirror.gcr.io/oven/bun:1.3.6-alpine@sha256:819f91180e721ba09e0e5d3eb7fb985832fd23f516e18ddad7e55aaba8100be7 AS builder
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
