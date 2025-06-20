# Build Stage: use Node.js 20
FROM node:20-alpine3.19 AS build-stage
WORKDIR /app

# Install dependencies first to leverage Docker cache
COPY package.json yarn.lock ./
RUN --mount=type=cache,target=/root/.cache \
    # Use cache for yarn's global cache but persist node_modules in the image
    corepack prepare yarn@1.22.19 --activate \
    && yarn config set network-timeout 300000 \
    && apk add --no-cache g++ make python3 \
    && yarn global add node-gyp \
    && yarn install --frozen-lockfile

# Copy source code
COPY . .
RUN yarn run build

# Production Stage: nginx to serve built files
FROM nginx:alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
