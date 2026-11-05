# Runs the Playwright test suite (e2e/) against the "web" service from
# docker-compose.playwright.yml. Image version is pinned to match the
# @playwright/test version in e2e/package.json - keep both in sync.
FROM mcr.microsoft.com/playwright:v1.64.0-noble
WORKDIR /e2e

COPY e2e/package.json e2e/package-lock.json* ./
RUN npm ci --no-audit --no-fund || npm install --no-audit --no-fund

COPY e2e/ .

CMD ["npx", "playwright", "test"]
