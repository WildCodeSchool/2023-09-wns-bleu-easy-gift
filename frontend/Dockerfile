FROM node:20.9.0-alpine3.17

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY tsconfig.json tsconfig.json
COPY tailwind.config.ts tailwind.config.ts
COPY next-env.d.ts next-env.d.ts
COPY postcss.config.js postcss.config.js
COPY next.config.mjs next.config.mjs
COPY components.json components.json
COPY src src

CMD npm run dev