# 🐳 Docker Guide for Developers

---

## 📌 What Is Docker?

Docker is a **containerization platform** that allows you to package your application and its dependencies into a **single unit** (called a container) that runs reliably across different environments.

Think of it as a **lightweight virtual machine**, but faster, easier to distribute, and share.

---

## ✅ Why Use Docker?

- 🚀 **Consistency**: Runs the same everywhere (local, staging, production).
- 🛠️ **Environment Isolation**: Avoid "it works on my machine" bugs.
- 📦 **Portable and Shareable**: Easy to share full app environments.
- 🐳 **Lightweight**: Faster than VMs with less resource overhead.

---

## 💾 How to Install Docker

### 🔵 Windows + macOS

1. Go to [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. Download Docker Desktop.
3. Follow the installer.
4. After installation, open Terminal (macOS) or PowerShell (Windows) and verify:

```bash
docker -v
docker compose version
```

---

### 🟢 Linux (Ubuntu/Debian)

```bash
# Install Docker
sudo apt update
sudo apt install docker.io -y

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Check versions
docker -v
docker compose version
```

> 🧠 You may need to add your user to the `docker` group:
>
> ```bash
> sudo usermod -aG docker $USER
> ```

---

## 📄 Dockerfile Explained (Line by Line)

```dockerfile
# Build stage: compiles the Next.js app
FROM node:18-alpine AS builder
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install pnpm -g
RUN npm install --loglevel=verbose

# Copy source and build
COPY . .
RUN pnpm run build
```

- 🧱 This stage builds the app using `pnpm` and saves it for the next stage.

```dockerfile
# Runtime stage: light production image
FROM node:18-alpine AS runtime
WORKDIR /app

# Copy minimal dependencies
COPY --from=builder /app/package.json ./
RUN npm install pnpm -g
RUN pnpm install --prod --filter

# Copy built app files
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/styles ./styles

# Set environment and expose port
ENV NODE_ENV=production
EXPOSE 3000
```

- 🪶 This is a smaller, optimized container used in production.

---

## 🛠️ docker-compose.yaml Explained

```yaml
services:
  web:
    build:
      context: .
      dockerfile: ./Dockerfile
    restart: unless-stopped
    ports:
      - "${PORT}:${PORT}"
    environment:
      DATABASE_URL: ${DATABASE_URL}
    command: "node ./server.js"
```

- 🧑‍💻 **web** service builds the app using the Dockerfile and starts it using `node ./server.js`.
- 🛑 `restart: unless-stopped` ensures it auto-restarts unless manually stopped.

```yaml
db:
  image: postgres:15.6-bullseye
  restart: always
  environment:
    POSTGRES_USER: ${POSTGRES_USER}
    POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    POSTGRES_DB: ${POSTGRES_DB}
  volumes:
    - postgres-data:/var/lib/postgresql/data
  ports:
    - "${LOCAL_PORT}:${LOCAL_PORT}"
```

- 🐘 **db** uses the official PostgreSQL image with volume for persistent data.

```yaml
volumes:
  postgres-data:
```

- 🗃️ Volume for storing database data outside of the container lifecycle.

---

## 🔧 Essential Docker Commands for Developers

### 🧾 View All Running Containers

```bash
docker ps
```

### 📦 View All Docker Images

```bash
docker images
```

### 🧹 Free Disk Space

```bash
# Remove stopped containers, networks, build cache
docker system prune

# Remove dangling images
docker image prune

# Remove all unused volumes
docker volume prune
```

---

### ▶️ Start Docker Containers

```bash
docker compose up
# or in detached mode:
docker compose up -d
```

### 🛑 Stop Docker Containers

```bash
docker compose down
```

### 📌 Start/Stop Specific Container

```bash
docker start <container_name>
docker stop <container_name>
```

### ❌ Remove an Image

```bash
docker rmi <image_id_or_name>
```

### 🐛 Check Container Logs

```bash
docker logs <container_name>
```

---

## 🧪 Docker Build & Run Manually

```bash
docker build -t my-app .
docker run -p 3000:3000 my-app
```

---

## ✅ Common .env Variables Used

Ensure you define these in your `.env` file:

```dotenv
PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/mydb
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=mydb
LOCAL_PORT=5432
```

---

## 📌 Final Tip

Always test your full app by running:

```bash
docker compose up --build
```

This ensures that everything works together — Next.js app + database — just like in production.
