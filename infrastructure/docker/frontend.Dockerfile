# Build stage: compile the Vite application.
FROM node:20-alpine AS build

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
WORKDIR /workspace

COPY package.json pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/frontend/package.json apps/frontend/package.json
COPY packages/shared/ts/package.json packages/shared/ts/package.json
COPY packages/ui/package.json packages/ui/package.json
RUN pnpm install --no-frozen-lockfile

COPY apps/frontend apps/frontend
COPY packages/shared/ts packages/shared/ts
COPY packages/ui packages/ui
RUN pnpm --filter @coding-ai/frontend build

# Runtime stage: serve immutable frontend assets.
FROM nginx:1.27-alpine AS runtime
COPY infrastructure/docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /workspace/apps/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
