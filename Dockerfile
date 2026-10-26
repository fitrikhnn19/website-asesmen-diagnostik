# syntax=docker/dockerfile:1
# ==============================================================================
# SiDag — Sistem Informasi Asesmen Diagnostik Tiga Tingkat (Matematika)
# Production Multi-Stage Dockerfile
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Dependency Resolver
# ------------------------------------------------------------------------------
FROM node:22-alpine AS dependencies

WORKDIR /app

# Install native dependencies and compatibility libraries if required
RUN apk add --no-cache libc6-compat

# Copy dependency manifests for optimal layer caching
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --omit=dev --ignore-scripts

# ------------------------------------------------------------------------------
# Stage 2: Production Runtime
# ------------------------------------------------------------------------------
FROM node:22-alpine AS runner

# Open Container Initiative (OCI) Metadata
LABEL org.opencontainers.image.title="SiDag - Platform Asesmen Diagnostik Matematika" \
      org.opencontainers.image.description="Platform Asesmen Diagnostik Tiga Tingkat (Three-Tier Diagnostic Assessment) Khusus Matematika" \
      org.opencontainers.image.version="1.0.0" \
      org.opencontainers.image.authors="FKIP ULM & SMAN 7 Banjarmasin" \
      org.opencontainers.image.vendor="Universitas Lambung Mangkurat" \
      org.opencontainers.image.licenses="ISC"

WORKDIR /app

# Install security libraries and timezone data
RUN apk add --no-cache libc6-compat tzdata

# Production Environment Variables with Sensible Defaults
ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0 \
    DATA_DIR=/app/data \
    DATA_FILE=/app/data/database.json \
    TZ=Asia/Makassar

# Create data directory and assign ownership to non-root 'node' user
RUN mkdir -p /app/data && chown -R node:node /app

# Copy production dependencies from Stage 1
COPY --chown=node:node --from=dependencies /app/node_modules ./node_modules

# Copy application manifests and source code
COPY --chown=node:node package.json ./
COPY --chown=node:node serve.js ./
COPY --chown=node:node index.html styles.css app.js ./
COPY --chown=node:node admin-dashboard.html admin.js dashboard.css ./
COPY --chown=node:node teacher-dashboard.html teacher.js ./
COPY --chown=node:node student-exam.html student-exam.js student-exam.css ./
COPY --chown=node:node api ./api
COPY --chown=node:node data ./data
COPY --chown=node:node scripts ./scripts
COPY --chown=node:node drizzle ./drizzle
COPY --chown=node:node drizzle.config.js ./

# Switch to non-root user for security compliance (Principle of Least Privilege)
USER node

# Expose default HTTP application port
EXPOSE 3000

# Container Healthcheck probe using internal Node.js runtime script
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node scripts/healthcheck.js || exit 1

# Persistent storage volume for diagnostic data, audit logs, and SQLite databases
VOLUME ["/app/data"]

# Run the production server directly with PID 1 signal forwarding
CMD ["node", "serve.js"]
