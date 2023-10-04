FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
RUN rm -rf ./.next/cache

# Build the source code
FROM base AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY=APP_NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY
RUN NEXT_PUBLIC_GOOGLE_CLIENT_ID=APP_NEXT_PUBLIC_GOOGLE_CLIENT_ID
RUN npm run build

# Run the source code
FROM base AS runner

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/entrypoint.sh ./entrypoint.sh

USER nextjs

EXPOSE 3000
ENV PORT 3000

RUN ["chmod", "+x", "./entrypoint.sh"]
ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["node", "server.js"]