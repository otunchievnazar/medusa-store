#!/bin/sh

# Run migrations and start server
echo "Running database migrations..."
npx medusa db:migrate

echo "Seeding database..."
pnpm seed || echo "Seeding failed, continuing..."

echo "Starting Medusa development server..."
pnpm dev

