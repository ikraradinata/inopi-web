# DOCKER SETUP — INOPI Website

> Panduan setup lengkap untuk development dengan Docker Desktop dan AntiGravity.

---

## Prerequisites

- Docker Desktop ≥ 4.x (Windows/Mac/Linux)
- Node.js ≥ 20 (untuk local tooling saja, bukan wajib jika full Docker)
- Git

---

## File-file yang Dibutuhkan

### `Dockerfile`

```dockerfile
# syntax=docker/dockerfile:1

FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

---

### `Dockerfile.dev` (Development — Hot Reload)

```dockerfile
FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

EXPOSE 3000
EXPOSE 3333

ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

CMD ["npm", "run", "dev"]
```

---

### `docker-compose.yml` (Main — Development)

```yaml
version: '3.9'

services:

  # ─── Next.js App ───────────────────────────────────────────────
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    container_name: inopi-app
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    environment:
      - NODE_ENV=development
      - NEXT_PUBLIC_SITE_URL=http://localhost:3000
      - NEXT_PUBLIC_SANITY_PROJECT_ID=${NEXT_PUBLIC_SANITY_PROJECT_ID}
      - NEXT_PUBLIC_SANITY_DATASET=${NEXT_PUBLIC_SANITY_DATASET}
      - SANITY_API_TOKEN=${SANITY_API_TOKEN}
      - RESEND_API_KEY=${RESEND_API_KEY}
      - NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID}
      - NEXT_PUBLIC_RECAPTCHA_SITE_KEY=${NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      - RECAPTCHA_SECRET_KEY=${RECAPTCHA_SECRET_KEY}
    env_file:
      - .env.local
    depends_on:
      - redis
    networks:
      - inopi-network
    restart: unless-stopped

  # ─── Redis (session / rate limiting) ──────────────────────────
  redis:
    image: redis:7-alpine
    container_name: inopi-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - inopi-network
    restart: unless-stopped

  # ─── Nginx (local reverse proxy) ──────────────────────────────
  nginx:
    image: nginx:alpine
    container_name: inopi-nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx/dev.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - app
    networks:
      - inopi-network
    restart: unless-stopped
    profiles:
      - proxy  # Optional: docker compose --profile proxy up

volumes:
  redis_data:

networks:
  inopi-network:
    driver: bridge
```

---

### `docker-compose.prod.yml` (Production)

```yaml
version: '3.9'

services:

  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: runner
    container_name: inopi-app-prod
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production
    restart: always
    networks:
      - inopi-network
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  redis:
    image: redis:7-alpine
    container_name: inopi-redis-prod
    volumes:
      - redis_data:/data
    networks:
      - inopi-network
    restart: always
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}

volumes:
  redis_data:

networks:
  inopi-network:
    driver: bridge
```

---

### `nginx/dev.conf`

```nginx
server {
  listen 80;
  server_name localhost;

  client_max_body_size 10M;

  location / {
    proxy_pass http://app:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  # WebSocket untuk HMR Next.js
  location /_next/webpack-hmr {
    proxy_pass http://app:3000/_next/webpack-hmr;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```

---

### `.env.example`

```bash
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token
SANITY_WEBHOOK_SECRET=random_secret_string

# Email
RESEND_API_KEY=re_xxxxxxxxxxxx
NOTIFICATION_EMAIL=info@inopi.id

# Google
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lxxxxxxxxxx
RECAPTCHA_SECRET_KEY=6Lxxxxxxxxxx

# Redis
REDIS_URL=redis://redis:6379

# Feature flags
NEXT_PUBLIC_ENABLE_MEMBERSHIP_FORM=true
NEXT_PUBLIC_ENABLE_NEWSLETTER=true
```

---

## Commands

### Development

```bash
# Start semua services (dev)
docker compose up -d

# Lihat logs
docker compose logs -f app
docker compose logs -f nginx

# Stop semua
docker compose down

# Rebuild setelah perubahan package.json
docker compose build app --no-cache
docker compose up -d

# Masuk ke container
docker exec -it inopi-app sh

# Install package baru (dari dalam container)
docker exec inopi-app npm install framer-motion
```

### Production

```bash
# Build & deploy production
docker compose -f docker-compose.prod.yml up -d --build

# Update tanpa downtime
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d --no-deps app

# Cek health
docker compose -f docker-compose.prod.yml ps
docker inspect inopi-app-prod | grep Health
```

### Maintenance

```bash
# Hapus semua containers + volumes (HATI-HATI di prod)
docker compose down -v

# Prune images tidak terpakai
docker image prune -f

# Cek resource usage
docker stats

# Backup Redis data
docker exec inopi-redis redis-cli save
docker cp inopi-redis:/data/dump.rdb ./backup/redis-$(date +%Y%m%d).rdb
```

---

## AntiGravity Configuration

> AntiGravity adalah deployment platform untuk containerized apps.

### `antigravity.yml`

```yaml
name: inopi-website
version: "1.0"

build:
  dockerfile: Dockerfile
  context: .
  args:
    - NEXT_TELEMETRY_DISABLED=1

deploy:
  strategy: rolling
  replicas: 2
  health_check:
    path: /api/health
    interval: 30s
    timeout: 10s
    retries: 3

env:
  from_secrets:
    - NEXT_PUBLIC_SANITY_PROJECT_ID
    - NEXT_PUBLIC_SANITY_DATASET
    - SANITY_API_TOKEN
    - RESEND_API_KEY
    - NEXT_PUBLIC_GA_ID
    - REDIS_URL

resources:
  cpu: "0.5"
  memory: "512Mi"
  storage: "1Gi"

domains:
  - www.inopi.id
  - inopi.id

ssl: auto   # Auto Let's Encrypt

scaling:
  min: 1
  max: 4
  cpu_threshold: 70
```

### Deploy ke AntiGravity

```bash
# Install AntiGravity CLI
npm install -g @antigravity/cli

# Login
ag login

# Init project (sekali)
ag init --name inopi-website

# Set secrets
ag secrets set SANITY_API_TOKEN=...
ag secrets set RESEND_API_KEY=...
ag secrets set NEXT_PUBLIC_SANITY_PROJECT_ID=...

# Deploy
ag deploy

# Lihat logs
ag logs --follow

# Rollback
ag rollback --version v1.0.2
```

---

## next.config.ts

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',   // Required for Docker
  
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.google.com *.googletagmanager.com *.gstatic.com",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              "font-src 'self' fonts.gstatic.com",
              "img-src 'self' data: blob: cdn.sanity.io *.googleusercontent.com",
              "connect-src 'self' *.sanity.io *.google-analytics.com",
            ].join('; ')
          },
        ],
      },
    ]
  },
  
  // Redirects
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
    ]
  },
}

export default nextConfig
```

---

## Health Check Endpoint

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
  })
}
```

---

## Troubleshooting

| Problem | Solusi |
|---------|--------|
| Port 3000 sudah terpakai | `lsof -ti:3000 \| xargs kill -9` |
| Hot reload tidak bekerja di Docker | Tambahkan `WATCHPACK_POLLING=true` di env |
| node_modules tidak sync | `docker compose build app --no-cache` |
| Build gagal di M1/M2 Mac | Tambahkan `platform: linux/amd64` di service |
| Redis connection refused | Pastikan `redis` service sudah running |

### WATCHPACK_POLLING fix (Windows/WSL2)

```yaml
# docker-compose.yml — tambahkan di environment app:
environment:
  - WATCHPACK_POLLING=true
  - CHOKIDAR_USEPOLLING=true
```
