FROM node:20.9.0-alpine3.17

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY tsconfig.json tsconfig.json
# COPY next-env.d.ts next-env.d.ts
COPY next.config.mjs next.config.mjs
COPY src src

CMD npm run dev