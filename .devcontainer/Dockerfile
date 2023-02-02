FROM blog-dev:2.1.0

RUN apt-get update \
  && apt-get install --no-install-recommends -y git ca-certificates fish \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
