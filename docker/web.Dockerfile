# Build stage
FROM node:18-alpine AS builder
WORKDIR /monorepo
COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install --frozen-lockfile --ignore-scripts

#RUN pnpm run test --filter @webapp
RUN cd apps/web && pnpm run build 
 
# Runtime stage
FROM node:18-alpine AS runtime
WORKDIR /app

# Copy all the required web folders
COPY --from=builder /monorepo/apps/web/.next/standalone ./
COPY --from=builder /monorepo/apps/web/public ./apps/web/public
COPY --from=builder /monorepo/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /monorepo/apps/web/next.config.mjs ./apps/web/next.config.mjs
COPY --from=builder /monorepo/apps/web/styles ./apps/web/styles
COPY --from=builder /monorepo/package.json ./apps/web/package.json

# Install all the production dependencies
WORKDIR /app/apps/web
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --prod --filter @webapp

# Set enviroment mode to production for optimization
ENV NODE_ENV=production
EXPOSE 3000
