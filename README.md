# Dashboard sample app
Tutorial as per: https://nextjs.org/learn/dashboard-app/getting-started

Final completed project available at: https://github.com/vercel/next-learn/tree/main/dashboard/final-example

## Run dev
```bash
pnpm dev
```

## Local database
See: https://medium.com/@dekadekadeka/next-js-tutorial-with-local-database-quick-start-guide-394d48a0aada

Code and config have been addapted to cater for a local non-vercel Postgres db.

Postgres can be started in docker using docker compose file in ./database

Config for the postgres running in Docker (can be specified in .env file):
```bash
POSTGRES_URL="postgres://postgres:password@localhost:5432/postgres"
POSTGRES_URL_NON_POOLING="postgres://postgres:password@localhost:5432/postgres"
POSTGRES_USER=postgres
POSTGRES_HOST="localhost"
POSTGRES_PASSWORD=password
POSTGRES_DATABASE=postgres
```

## Auth
NOTE: if AUTH_URL is set in environment variables, it will override values from .env file

## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.
