FROM node:carbon AS base
WORKDIR /app
FROM base AS dependencies
COPY package*.json ./
RUN npm install
FROM dependencies AS build
WORKDIR /app
COPY src /app
FROM node:8.9-alpine AS release
WORKDIR /app
COPY --from=dependencies /app/package.json ./
RUN npm install --only=production
COPY --from=build /app ./
CMD ["node", "index.js"]
