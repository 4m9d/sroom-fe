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
RUN npm run build

# Run the source code
FROM base AS runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXTAUTH_SECRET default
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID default
ENV NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY default

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]