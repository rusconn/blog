FROM node:16.9.1-bullseye-slim

RUN apt-get update \
  && apt-get install --no-install-recommends -y \
    git=1:2.30.2-1 \
    ca-certificates=20210119 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
