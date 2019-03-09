FROM node:carbon AS base
WORKDIR /app
FROM base AS dependencies
COPY package*.json ./
RUN npm install
FROM dependencies AS build
WORKDIR /app
COPY . /app
RUN npm run build

FROM node:8.9-alpine AS release
WORKDIR /app
RUN npm -g install serve
COPY --from=dependencies /app/package.json ./
RUN npm install --only=production
COPY --from=build /app ./

CMD ["serve", "-s", "public", "-p", "3000"]
