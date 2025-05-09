# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install pnpm -g
RUN npm install --loglevel=verbose
COPY . .
RUN pnpm run build

# Runtime stage
FROM node:18-alpine AS runtime
WORKDIR /app

# Install all the production dependencies
COPY --from=builder /app/package.json ./
RUN npm install pnpm -g
RUN pnpm install --prod --filter

# Copy all the required web folders
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/styles ./styles

# Set enviroment mode to production for optimization
ENV NODE_ENV=production
EXPOSE 3000
