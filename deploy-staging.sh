#!/bin/sh
git fetch origin && git reset --hard origin/dev && git clean -f -d && \
docker compose -f docker-compose.production.yml down && \
docker compose -f docker-compose.production.yml pull && \
docker compose -f docker-compose.production.yml --env-file .env.staging up -d;